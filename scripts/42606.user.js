// ==UserScript==
// @name                        Configuracion de Tabla
// @namespace                   Lord Script
// @description                 Based on Overview and old Alarm And Overview Table.
// @author                      Lord1982
// ==/UserScript==

var server				= /\/\/([a-z._0-9]+)\//.exec(document.URL)[1];
var config				= getConfig();
var players				= getPlayers();
var _startTime			= new Date().getTime();

var scriptversion 		= "v1";
var scriptname    		= "Lord1982 Overview Table";
var scriptinstall 		= "http://userscripts.org/scripts/source/42618.user.js";
var scriptsource  		= "http://userscripts.org/scripts/review/42618?format=txt";
var scriptsite			= "http://userscripts.org/scripts/show/42618";

var ALERT_SOUNDS		= getCfgValue("ALERT_SOUNDS", false); 
var WARNING_VOLUME		= getCfgValue("WARNING_VOLUME", "50");        // "0" = silent "100" = full volume
var ALERT_VOLUME		= getCfgValue("ALERT_VOLUME", "100");         // "0" = silent "100" = full volume

var AUTO_REFRESH		= getCfgValue("AUTO_REFRESH", false); 
var AUTO_R_MIN			= getCfgValue("AUTO_REFRESH_MIN_SECS", 300);  // seconds
var AUTO_R_MAX			= getCfgValue("AUTO_REFRESH_MAX_SECS", 600);  // seconds

var DEBUG_LOG          	= getCfgValue("DEBUG_LOG", false); 
var PROGRESS_BAR_MODE  	= getCfgValue("PROGRESS_BAR_MODE", "time");
var SETTING_EXPANDED   	= getCfgValue("SETTING_EXPANDED", true);
var PREMIUM_VIEW       	= getCfgValue("PREMIUM_VIEW", true);
var INLINESCORE        	= getCfgValue("INLINESCORE", true);
var RESOURCE_COUNTER   	= getCfgValue("RESOURCE_COUNTER", true);

var TECH_LETTERCHUTE   	= getCfgValue("TECH_LETTERCHUTE", true);
var TECH_PULLEY       	= getCfgValue("TECH_PULLEY", true);
var TECH_GEOMETRY     	= getCfgValue("TECH_GEOMETRY", true);
var TECH_SPIRITLEVEL   	= getCfgValue("TECH_SPIRITLEVEL", true);

var TABLE_CITIES       	= getCfgValue("TABLE_CITIES", true);
var TABLE_RESOURCES    	= getCfgValue("TABLE_RESOURCES", true);
var TABLE_BUILDINGS    	= getCfgValue("TABLE_BUILDINGS", true);
var TABLE_ARMYFLEET    	= getCfgValue("TABLE_ARMYFLEET", true);
var TABLE_RESEARCH     	= getCfgValue("TABLE_RESEARCH", false);
var TABLE_TRANSPORTERS 	= getCfgValue("TABLE_TRANSPORTERS", false);
var TABLE_PLAYERS      	= getCfgValue("TABLE_PLAYERS", false);

var PLAYERS_NORMAL     	= getCfgValue("PLAYERS_NORMAL", false);
var PLAYERS_INACTIVITY 	= getCfgValue("PLAYERS_INACTIVITY", false);
var PLAYERS_BANNED     	= getCfgValue("PLAYERS_BANNED", false);
var PLAYERS_VACATION   	= getCfgValue("PLAYERS_VACATION", false);

var alertSound         	= [GM_getResourceURL("sound_alarm").replace(/undefined/, "audio/wav")];
var warningSound       	= [GM_getResourceURL("sound_warning").replace(/undefined/, "audio/wav")];


function getVar(varname, vardefault) {
	var res = GM_getValue(server+"."+varname);
	if (res == undefined) {
		return vardefault;
	}
	return res;
}

function setVar(varname, varvalue) {
	GM_setValue(server+"."+varname, varvalue);
}

function getConfig() {
	var config = unserialize(getVar("config", ""));
	if (config == null || config == undefined || config == "" || ("".config == "ND")) {
		config = new Object();
	}
	if (config.cfg == undefined) {
		config.cfg = new Object();
	}
	return config;
}

function saveConfig() {
	setVar("config", serialize(config));
}

function getPlayers() {
	var players;
	try {
		players = eval(getVar("players", "({})"));
	} catch (e) {
		log("Error while unserializing 'players': "+e);
		log("Stored data: "+getVar("players", ""));
	}
	if (players == null || players == undefined || ("".players == "NaN")) {
		players = new Object();
	}
	if (players.cities == undefined) {
		players.cities = new Object();
	}
	if (players.playersCities == undefined) {
		players.playersCities = new Object();
	}
	if (players.islands == undefined) {
		players.islands = new Object();
	}
	return players;
}

function savePlayers() {
	setVar("players", uneval(players));
}

function getCfgValue(key, defaultValue) {
	return ((config.cfg != undefined && config.cfg[key] != undefined) ? config.cfg[key] : defaultValue);
}

function getCfgValueNonEmpty(key, defaultValue) {
	return ((config.cfg != undefined && config.cfg[key] != undefined && config.cfg[key] != "") ? config.cfg[key] : defaultValue);
}

function setCfgValue(key, value) {
	config.cfg[key] = value;
	setVar("config", serialize(config));
}

function Resource() {
	this.city_id = city_id;
	this.city_coord = city_coord;
	this.type = "";
	this.gold = "?";
	this.corruption = "?";
	this.wood = 0;
	this.wine = 0;
	this.marble = 0;
	this.glass = 0;
	this.sulfur = 0;
	this.underConstruction = "-";
	this.underConstructionName = "?";
	this.underConstructionLevel = "?";
	this.underConstructionTime = "?";
	this.actions = "?";
	this.population = "?";
	this.freeworkers = "?";
	this.woodworkers = "?";
	this.specialworkers = "?";
	this.spy = "?";
	this.scientists = "?";
	this.efficiency = "?";
	this.happiness = "?";
	this.bonusspace = "?";
	this.woodlevel = "?";
	this.tradegoodlevel = "?";
	this.buildings = {};
	this.units = {};
}