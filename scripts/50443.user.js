// ==UserScript==
// @name              Languague Spanihs
// @namespace      Languague
// @author         GigeL
// ==/UserScript==

var langtype  = getLangtype();
var language  = setLanguage();
var buildings = getBuildingsTexts();
var texts     = getLocalizedTexts();
var langList  = {"": texts["LANGUAGE_AUTO"], en: "Español"};

function setLanguage() {
   var arr = server.split("\.");
   var lang = arr[arr.length - 1];
   var l = getCfgValueNonEmpty("LANGUAGE", language);
   if (l != undefined) {
      lang = l;
   }
   return lang;
}

function getLangtype() {
   switch (language) {
   default:
      return "lf";
   }
}

function getBuildingsTexts() {
   switch (language) {
   	  case "en" :
      return {
        "townHall" 		: ["Intendencia", "Intendencia"],
        "academy"		: ["Academia", "Academia"],
        "port" 			: ["Puerto", "Puerto"],
        "shipyard" 		: ["Astillero de guerra", "Astillero de guerra"],
        "warehouse" 		: ["Deposito", "Deposito"],
	"wall" 			: ["Muralla", "Muralla"],
	"tavern" 		: ["Taberna", "Taberna"],
	"museum" 		: ["Museo", "Museo"],
	"palace" 		: ["Palacio", "Palacio"],
	"palaceColony" 		: ["Residencia del Gobernador", "Residencia del Gobernador"],
	"embassy" 		: ["Embajada", "Embajada"],
	"branchOffice" 		: ["Tienda", "Tienda"],
	"safehouse" 		: ["Escondite", "Escondite"],
	"barracks" 		: ["Cuartel", "Cuartel"],
	"workshop-army" 	: ["Taller de invenciones", "Taller de invenciones"],
	"workshop" 		: ["Officina", "Officina"],
	"carpentering" 		: ["Carpinteria", "Carpinteria"],
	"forester" 		: ["Guardabosque", "Guardabosque"],
	"stonemason" 		: ["Cantera", "Cantera"],
	"glassblowing" 		: ["sopladores de vidrio", "sopladores de vidrio"],
	"winegrower" 		: ["Vinicultor", "Vinicultor"],
	"alchemist" 		: ["Torre del Alquimista", "Torre del Alquimista"],
	"architect" 		: ["Arquitecto", "Arquitecto"],
	"optician" 		: ["Optica", "Optica"],
	"vineyard" 		: ["prensa de vino", "prensa de vino"],
	"fireworker" 		: ["Pruebas Pirotécnicas", "Pruebas Pirotécnicas"],            
      };
      break;

	  
      default :
      return {
         "townHall"                    : ["Town Hall", "Town Hall"],
         "academy"                     : ["Academy", "Academy"],
         "port"                        : ["Port", "Trading Port"],
         "shipyard"                    : ["Shipyard", "Shipyard"],
         "warehouse"                   : ["Warehouse", "Warehouse"],
         "wall"                        : ["Wall", "Wall"],
         "tavern"                      : ["Tavern", "Tavern"],
         "museum"                      : ["Museum", "Museum"],
         "palace"                      : ["Palace", "Palace"],
         "palaceColony"                : ["Governor's Residence", "Governor"],
         "embassy"                     : ["Embassy", "Embassy"],
         "branchOffice"                : ["Trading Post", "Trading Post"],
         "safehouse"                   : ["Hideout", "Hideout"],
         "barracks"                    : ["Barracks", "Barracks"],
         "workshop-army"               : ["Workshop", "Workshop"],
         "workshop"                    : ["Workshop", "Workshop"],
         "carpentering"                : ["Carpenter", "Carpenter"],
         "forester"                    : ["Forester", "Forester"],
         "stonemason"                  : ["StoneMason", "Stone Mason"],
         "glassblowing"                : ["GlassBlowing", "Glass Blowing"],
         "winegrower"                  : ["WineGrower", "Wine Grower"],
         "alchemist"                   : ["Alchemist", "Alchemist"],
         "architect"                   : ["Architect", "Architect"],
         "optician"                    : ["Optician", "Optician"],
         "vineyard"                    : ["Vineyard", "Vineyard"],
         "fireworker"                  : ["Fireworker", "Fireworker"],
      };
      break;
   }
}

function getLocalizedTexts() {
   switch (language) {
	  case "en":
      return {
      //General
	"cityName" 			: "Nombre de ciudad",
	"m" 				: "m",
	"h" 				: "h",
	"day" 				: "dia",
	"wood" 				: "madera",
	"wine" 				: "vino",
	"marble" 			: "Marmol",
	"crystal" 			: "Cristal",
	"glass" 			: "Cristal",
	"sulfur" 			: "azufre",
	"lastUpdate" 			: "ultima actualizacion: ",
	"summary" 			: "Sumatoria:",
	"Action" 			: "Accion",
	"NewVersion" 			: "Hay una nueva versión de "+scriptname+"\n%s\nClick on OK si usted desea actualizar ahora",
	"unknown" 			: "No Disponible",

      //Tabel Orase
	"Coordinate" 			: "Coordenadas",
	"Resource" 			: "Recursos",
	"ActionPoints" 			: "Puntos de Acción",
	"Population" 			: "Poblacion",
	"FreeWorkers" 			: "Ciudadanos",
	"Woodworkers" 			: "Leñadores",
	"Specialworkers" 		: "Trabajadores",
	"scientists" 			: "Cientificos",
	"Happiness" 			: "Felicidad",
	"Growth" 			: "crecimiento",
	"Incomegold" 			: "oro neto",
	"Corruption" 			: "Corrupción",
	"currentlyBuilding" 		: "actualmente construyendo",
	"wonder1" 			: " La fragua de Hefesto ",
	"wonder2" 			: " Templo de Gea ",
	"wonder3" 			: " Jardín de Dioniso ",
	"wonder4" 			: " Templo de Atenea ",
	"wonder5" 			: " Templo a Hermes ",
	"wonder6" 			: " Fortaleza de Ares ",
	"wonder7" 			: " Templo de Poseidón ",
	"wonder8" 			: "Coloso",

      //Tabel Resurse
	"Remaining" 			: "Restante",
	"hoursToFull" 			: "Tiempo de Llenado",
	"hoursToEmpty" 			: "Tiempo de Vaciado",
	"available" 			: "disponible",
	"fullness" 			: "repleto",
	"full" 				: "lleno",
	"empty" 			: "Vacio",
	"Original" 			: "Original",
	"Saving" 			: "salvar",
	"Transport" 			: "Transporte de materia",
	"DeploymentArmy" 		: "Desplegar tropas",
	"DeploymentFleet" 		: "Estacionar Flotas",
	"Diplomacy" 			: "Enviar mensaje",

      //Tabel Cladiri
	"Upgrade" 			: "Actualizar",
	"UpgradeConfirm" 		: "Esta usted seguro que quiere ampliar el edificio?",
	"Level" 			: "Nivel",
	"ResourceNeeds" 		: "Recursos necesarios",

      //Tabel Armata & Flota
	"unitInfo" 			: "Informacion de la Unidad",
	"Point" 			: "Punto(s)",

      //Tabel Cercetari
	"constructionLevel" 		: "Nivel de construccion",
	"production" 			: "Produccion",
	"costs" 			: "Costos",
	"goTo" 				: "Ir a ",

      //Tabel Transport
	"StartCity" 			: "Ciudad de origen",
	"DestinationCity" 		: "Ciudad de Destino",
	"Mission" 			: "Mision",
	"FinishTime" 			: "tiempo de acabado",
	"FinishResources" 		: "acabado de recursos",
	"Loading" 			: "cargando",

      //Tabel Jucatori
	"Plunder" 			: "Pillage",
	"Blockade" 			: "Bloquear puerto",
	"Espionage" 			: "devolver espia",
	"DefendCity" 			: "Defender puerto",
	"DefendPort" 			: "Defender puerto",
	"DeleteConfirm" 		: "Esta usted seguro que desea borrar %s?",
	"Players" 			: "Jugadores",
	"Alliance" 			: "Alianza",
	"Score" 			: "Puntuacion",

      //Scoruri
	"ScoreInfo" 			: "Puntuacion",
	"GoldScore" 			: "Oro",
	"Military" 			: "Generales",
	"fetch" 			: "Alcanzado ...",

      //Predict
	"PREDICT_FULL" 			: "Lleno",
	"PREDICT_DAYS" 			: "Dias ",
	"PREDICT_HOURS" 		: " h ",
	"PREDICT_MINUTES" 		: " min",
	"PREDICT_NEVER" 		: "Nunca",

      //Tabel Setari
	"show_settings" 		: "Mostrar Opciones",
	"hide_settings" 		: "Ocultar Opciones",

      "SETTINGS_TITLE_STYLE" : "Opciones visuales",
	"INLINESCORE" 			: "Mostrar puntos totales",
	"PREMIUM_VIEW" 			: "asesores dorados (vista primium)",
	"BUILDINGS_IMAGES" 		: "usar imagenes para nombres de edificios",
	"ARMY_IMAGES" 			: " usar imagenes para nombres de unidades",
	"QUICK_UPGRADE" 		: "usar boton actualizacion rapida",
	"DOUBLE_MAP" 			: "Muestra doble mapa mundi (an 840px height map)",
	"RESOURCE_COUNTER" 		: "Mostrar contador de recursos (reduce the CPU utilization)",
	"PROGRESS_BAR_MODE" 		: "Modo de Barra de progreso de Recursos",
	"off" 				: "Off",
	"time" 				: "Basado en el tiempo restante",
	"percent" 			: "Basado en porcentaje pleno",
	"LANGUAGE" 			: "Lenguage",
	"LANGUAGE_AUTO" 		: "Automatico desde el nombre del servidor",

      "SETTINGS_TITLE_TABLE" : "opciones de Tablas",
	"TABLE_RESOURCES" 		: "Muestra la tabla de: Recursos",
	"TABLE_CITIES" 			: "Muestra la tabla de: Ciudades",
	"TABLE_BUILDINGS" 		: "Muestra la tabla de: Construcciones",
	"TABLE_ARMYFLEET" 		: "Muestra la tabla de: Ejercito y Flota ",
	"TABLE_RESEARCH" 		: "Muestra la tabla de: investigación",
	"TABLE_TRANSPORT" 		: "Muestra la tabla de: Transportes",
	"TABLE_PLAYERS" 		: "Muestra la tabla de: Jugadores y Ciudades",

      "SETTINGS_TITLE_TECH" : "Opciones de investigación",
	"TECH_LETTERCHUTE" 		: "Science -> Letter Chute? (Scient -1 gold)",
	"TECH_PULLEY" 			: "Economy -> Pulley? (build price -2%)",
	"TECH_GEOMETRY" 		: "Economy -> Geometry? (build price -4%)",
	"TECH_SPIRITLEVEL" 		: "Economy -> Spirit Level? (build price -8%)",

      "SETTINGS_TITLE_OPTIONS" : "Opciones Generales ",
	"ALERT_SOUNDS" 			: "Sonidos de alerta",
	"ALERT_VOLUME" 			: "Volume alerta",
	"WARNING_VOLUME" 		: "Volume advertencia",
	"AUTO_REFRESH" 			: "Auto refresh",
	"AUTO_REFRESH_MIN_SECS" 	: "Auto refresh (minim seconds)",
	"AUTO_REFRESH_MAX_SECS" 	: "Auto refresh (maxim seconds)",

      "SETTINGS_PLAYERS_OPTIONS" : "Opciones de tabla de Jugadores y Ciudades ",
	"PLAYERS_NORMAL" 		: "Mostrar jugadores normales",
	"PLAYERS_INACTIVITY" 		: "Mostrar jugadores inactivos",
	"PLAYERS_BANNED" 		: "Mostrar jugadores Baneados ",
	"PLAYERS_VACATION" 		: "Mostrar jugadores de vacaciones",
	"ownAlly" 			: "alianza propia (nombre corto)",
	"friendlyAllies" 		: " Alianzas amigas (nombres cortos, separados por coma)",
	"hostileAllies" 		: " Alianzas enemigas (nombres cortos, separados por coma)",
	"DEBUG_LOG" 			: "Log debug messages",
	"Refresh_table" 		: "Save",
	"Reset_all_data" 		: "Reset all data",	
	"Reset_players_data" 		: "Reset players data",
	"Reset_css_data" 		: "Reset CSS",
	"RESET_DATA_CONFIRM" 		: "Esta usted seguro que desea borrar TODO la información?",
	"RESET_PLAYERS_CONFIRM" 	: "Esta usted seguro que desea borrar TODA la información de los jugadores?",
	"RESET_CSS_CONFIRM" 		: "Esta usted seguro que desea resetear CSS data?",
      };
      break;
	
      default:
      return {
         //General
         "cityName"                    : "City Name",
         "m"                           : "m",
         "h"                           : "h",
         "day"                         : "day",
         "wood"                        : "Wood",
         "wine"                        : "Wine",
         "marble"                      : "Marble",
         "crystal"                     : "Crystal",
         "glass"                       : "Crystal",
         "sulfur"                      : "Sulfur",
         "lastUpdate"                  : "Last update: ",
         "summary"                     : "Summary:",
         "Action"                      : "Action",
         "NewVersion"                  : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",
         "unknown"                     : "Unavailable",


         //Tabel Orase
         "Coordinate"                  : "Coordinate",
         "Resource"                    : "Resource",
         "ActionPoints"                : "Action Points",
         "Population"                  : "Population",
         "FreeWorkers"                 : "Citizens",
         "Woodworkers"                 : "Wood Workers",
         "Specialworkers"              : "Special Workers",
         "spy"                         : "Spies",
         "scientists"                  : "Scientists",
         "Happiness"                   : "Happiness",
         "Growth"                      : "Growth",
         "Incomegold"                  : "Net Gold",
         "Corruption"                  : "Corruption",
         "currentlyBuilding"           : "Currently building",
         "wonder1"                     : "Hephaistos Forge",
         "wonder2"                     : "Temple of Gaia",
         "wonder3"                     : "Garden of Dionysus",
         "wonder4"                     : "Temple of Athene",
         "wonder5"                     : "Temple of Hermes",
         "wonder6"                     : "Ares stronghold",
         "wonder7"                     : "Temple of Poseidon",
         "wonder8"                     : "Colossus",


         //Tabel Resurse
         "Remaining"                   : "Remaining",
         "hoursToFull"                 : "hours to full",
         "hoursToEmpty"                : "hours to empty",
         "available"                   : "available",
         "fullness"                    : "fullness",
         "full"                        : "Full",
         "empty"                       : "Empty",
         "Original"                    : "Original",
         "Saving"                      : "Saving",
         "Transport"                   : "Transport goods",
         "DeploymentArmy"              : "Deploy troops",
         "DeploymentFleet"             : "Station fleets",
         "Diplomacy"                   : "Send message",
         

         //Tabel Cladiri
         "Upgrade"                     : "Upgrade",
         "UpgradeConfirm"              : "Are you sure you want to upgrade building?",
         "Level"                       : "Level",
         "ResourceNeeds"               : "Resource Needs",


         //Tabel Armata & Flota
         "unitInfo"                    : "Unit Information",
         "Point"                       : "Point(s)",


         //Tabel Cercetari
         "constructionLevel"           : "Construction Level",
         "production"                  : "Production",
         "costs"                       : "Costs",
         "goTo"                        : "Go to ",


         //Tabel Transport
         "StartCity"                   : "Start City",
         "DestinationCity"             : "Destination City",
         "Mission"                     : "Mission",
         "FinishTime"                  : "Finish Time",
         "FinishResources"             : "",
         "Loading"                     : "Loading",

         //Tabel Jucatori
         "Plunder"                     : "Pillage",
         "Blockade"                    : "Block harbour",
         "Espionage"                   : "Send out spy",
         "DefendCity"                  : "Defend town",
         "DefendPort"                  : "Defend port",
         "DeleteConfirm"               : "Are you sure you want to delete %s?",
         "Players"                     : "Players",
         "Alliance"                    : "Alliance",
         "Score"                       : "Score",

         //Scoruri
         "ScoreInfo"                   : "Score Info",
         "GoldScore"                   : "Gold",
         "Military"                    : "Military",
         "fetch"                       : "Fetching ...",


         //Predict
         "PREDICT_FULL"                : "Full",
         "PREDICT_DAYS"                : " days ",
         "PREDICT_HOURS"               : " h ",
         "PREDICT_MINUTES"             : " min",
         "PREDICT_NEVER"               : ": Never",


         //Tabel Setari
         "show_settings"               : "Show Settings",
         "hide_settings"               : "Hide Settings",
         
         "SETTINGS_TITLE_STYLE"        : "Visual options",
         "INLINESCORE"                 : "Show score information",
         "PREMIUM_VIEW"                : "Golden advisers (premium view)", 
         "BUILDINGS_IMAGES"            : "Use images for buildings names",
         "ARMY_IMAGES"                 : "Use images for units names",   
         "QUICK_UPGRADE"               : "Use quick upgrade button", 
         "DOUBLE_MAP"                  : "Display double world map (an 840px height map)", 
         "RESOURCE_COUNTER"            : "Resources counter switch (reduce the CPU utilization)",
         "PROGRESS_BAR_MODE"           : "Resource progress bar mode",
         "off"                         : "Off",
         "time"                        : "Based on remaining time",
         "percent"                     : "Based on fullness percentage",
         "LANGUAGE"                    : "Language",
         "LANGUAGE_AUTO"               : "Automatic from server name",

         "SETTINGS_TITLE_TABLE"        : "Table options",
         "TABLE_RESOURCES"             : "Show Table: Resources",
         "TABLE_CITIES"                : "Show Table: Cities",
         "TABLE_BUILDINGS"             : "Show Table: Buildings",
         "TABLE_ARMYFLEET"             : "Show Table: Army and Fleet",
         "TABLE_RESEARCH"              : "Show Table: research table",
         "TABLE_TRANSPORT"             : "Show Table: Transports",
         "TABLE_PLAYERS"               : "Show Table: Players and Cities",

         "SETTINGS_TITLE_TECH"         : "Research options",
         "TECH_LETTERCHUTE"            : "Science -> Letter Chute? (Scient -1 gold)",
         "TECH_PULLEY"                 : "Economy -> Pulley? (build price -2%)",
         "TECH_GEOMETRY"               : "Economy -> Geometry? (build price -4%)",
         "TECH_SPIRITLEVEL"            : "Economy -> Spirit Level? (build price -8%)",

         "SETTINGS_TITLE_OPTIONS"      : "General options",
         "ALERT_SOUNDS"                : "Alert sounds",
         "ALERT_VOLUME"                : "Alert volume",
         "WARNING_VOLUME"              : "Warning volume",
         "AUTO_REFRESH"                : "Auto refresh",
         "AUTO_REFRESH_MIN_SECS"       : "Auto refresh (minim seconds)",
         "AUTO_REFRESH_MAX_SECS"       : "Auto refresh (maxim seconds)",

         "SETTINGS_PLAYERS_OPTIONS"    : "Players and Cities table options",  
         "PLAYERS_NORMAL"              : "Show normal players",
         "PLAYERS_INACTIVITY"          : "Show inactivity players",
         "PLAYERS_BANNED"              : "Show banned players",
         "PLAYERS_VACATION"            : "Show vacation players",
         "ownAlly"                     : "Own alliance (short name)",
         "friendlyAllies"              : "Friendly alliances (short names, separated by comma)",
         "hostileAllies"               : "Hostile alliances (short names, separated by comma)",
         "DEBUG_LOG"                   : "Log debug messages",

         "Refresh_table"               : "Save",
         "Reset_all_data"              : "Reset all data",
         "Reset_players_data"          : "Reset players data",
         "Reset_css_data"              : "Reseteaza CSS",
         "RESET_DATA_CONFIRM"          : "Are you sure you want to delete ALL stored data?",
         "RESET_PLAYERS_CONFIRM"       : "Are you sure you want to delete ALL players data?",
         "RESET_CSS_CONFIRM"           : "Are you sure you want to reset CSS data?",
      };
      break;
	}
}