// ==UserScript==
// @name          Ikariam Military
// @version       1.3
// @copyright     2009, Yoshi Toranaga
// @license       GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @namespace     http://www.home.org/ikariam/military
// @description   Calculates the strength of your troops/ships
// @include       http://s*.ikariam.*/*
// @exclude       http://board.ikariam.*/*
// @require       http://martinnv.herobo.com/json2.js
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

// globals
var SCORES = {};

// constants
var CACHE_KEY = "Cache";
var UNITS = "un";
var UPGRADES = "up";
var DEBUG = true;
var ATT = 'att';
var DEF = 'def';
var STA = 'sta';
var QTY = 'qty';
var BONUS = 'bns';
var UNIT_TYPE = 'tip';
var SHIP = 'shp';
var TROOP = 'trp';
var NONE = 'no bonus';
var ASSAULT = 'assault bonus';
var RESISTANCE = 'resistance bonus';
var RAM = 'ram bonus';
var HEALER = 'healer bonus';
var REGENERATION = 'regeneration bonus';

//----------- CACHE FUNCTIONS -------------------
function makeCacheKey(server, town) {
	if (town === undefined) {
		return CACHE_KEY + "." + server + "." + UPGRADES;
	}
	return CACHE_KEY + "." + server + "." + town;	
}

function readCache(server, town) {
	var json = GM_getValue(makeCacheKey(server, town));
	var result = {};
	if (json) {
		log("Reading[" + makeCacheKey(server, town) + "] = " + json);
		result = JSON.parse(json);
	}
	return result;
}

function writeCache(cache, server, town) {
	var json = JSON.stringify(cache);
	log("Writing[" + makeCacheKey(server, town) + "] = " + json);
	GM_setValue(makeCacheKey(server, town), json);
}

function updateUnitsCache(serverName, townName, unitType, units) {
	log("Updating units of type " + unitType + " for town " + townName + "@" + serverName);
	var cache = readCache(serverName, townName);
	cache[unitType] = units;
	writeCache(cache, serverName, townName);	
}

function updateUpgradesCache(serverName, unitType, upgrades) {
	log("Updating upgrades for type " + unitType + " for server " + serverName);
	var cache = readCache(serverName);
	cache[unitType] = upgrades;
	writeCache(cache, serverName);	
}

function updateUnitsAndUpgradesCache(serverName, townName, unitType, unitsAndUpgrades) {
	updateUnitsCache(serverName, townName, unitType, unitsAndUpgrades[UNITS]);
	updateUpgradesCache(serverName, unitType, unitsAndUpgrades[UPGRADES]);
}

//----------- UNIT DATA -------------------
function initializeData() {
	//      UNIT NAME             TYPE    --------ATT-------    --------DEF-------   STA   BONUS
	addUnit('slinger',            TROOP,    7,   8,   9,  10,     6,   7,   8,   9,   7,   NONE);
	addUnit('swordsman',          TROOP,   18,  20,  23,  27,    11,  12,  13,  15,   4,   ASSAULT);
	addUnit('phalanx',            TROOP,   14,  16,  18,  20,    30,  34,  39,  45,   8,   RESISTANCE);
	addUnit('archer',             TROOP,   26,  29,  34,  41,    23,  24,  25,  26,   4,   RESISTANCE);
	addUnit('marksman',           TROOP,   42,  47,  55,  66,    21,  23,  25,  27,   5,   ASSAULT);
	addUnit('gyrocopter',         TROOP,   35,  39,  44,  50,    30,  33,  37,  42,   3,   NONE);
	addUnit('steamgiant',         TROOP,   67,  75,  85,  97,    50,  58,  68,  80,   4,   NONE);
	addUnit('bombardier',         TROOP,  184, 206, 234, 268,    54,  60,  68,  78,   3,   ASSAULT);
	addUnit('ram',                TROOP,    6,   8,  10,  12,    50,  58,  68,  80,   5,   RAM);
	addUnit('catapult',           TROOP,   34,  42,  52,  64,    33,  37,  43,  51,   5,   RAM);
	addUnit('mortar',             TROOP,  142, 157, 175, 196,    92, 102, 114, 128,   5,   RAM);
	addUnit('medic',              TROOP,    8,   8,   8,   8,    22,  22,  22,  22,  10,   HEALER);
	addUnit('cook',               TROOP,   12,  12,  12,  12,    18,  18,  18,  18,  10,   REGENERATION);	
	
	addUnit('ship_ram',           SHIP,    16,  18,  21,  24,    13,  14,  15,  17,   5,   ASSAULT);
	addUnit('ship_ballista',      SHIP,    15,  16,  18,  20,    17,  20,  23,  27,   6,   RESISTANCE);
	addUnit('ship_flamethrower',  SHIP,    39,  44,  50,  57,    17,  19,  22,  26,   5,   ASSAULT);
	addUnit('ship_catapult',      SHIP,    26,  29,  33,  38,    38,  43,  49,  56,   6,   RESISTANCE);
	addUnit('ship_steamboat',     SHIP,    84,  94, 107, 123,    25,  27,  31,  37,   5,   ASSAULT);
	addUnit('ship_mortar',        SHIP,    54,  60,  68,  78,   108, 120, 136, 156,   6,   RESISTANCE);
	addUnit('ship_submarine',     SHIP,   142, 160, 181, 205,    56,  62,  70,  80,   3,   NONE);
}

//----------- HELPERS -------------------
function log(msg) {
	if (DEBUG) {
		GM_log(msg);
	}
}

function makeMilitaryScore(att, def, sta) {
	var result = { };
	result[ATT] = att;
	result[DEF] = def;
	result[STA] = sta;
	return result;
}
	
function addUnit(unitName, unitType, att0, att1, att2, att3, def0, def1, def2, def3, sta, bonus) {
	var attack = [ att0, att1, att2, att3 ];
	var defense = [ def0, def1, def2, def3 ];
	var stamina = [ sta ];
	var score = {};
	score[ATT] = attack;
	score[DEF] = defense;
	score[STA] = stamina;
	score[BONUS] = bonus;
	score[UNIT_TYPE] = unitType;
	SCORES[unitName] = score;
}

//----------- COMPUTATION FUNCTIONS -------------------
function getScore(unitType, qty, upgrades, scoreType, wallLevel) {
	
	log("Looking for the " + scoreType + " score of " + qty + " units of type " + unitType + " with " + upgrades + " upgrades");
	var unitData = SCORES[unitType];
	if (!unitData) {
		log("Unknown unit type " + unitType);
		return 0;
	}
	var typeScores = unitData[scoreType];
	var scorePerUnit = typeScores[upgrades];
	
	// apply wall for troops
	if (scoreType == DEF && unitData[UNIT_TYPE] == TROOP) {
		scorePerUnit *= (1 + wallLevel/10);
	}
	
	// apply bonus
	if (scoreType == ATT && unitData[BONUS] == ASSAULT ||
		scoreType == DEF && unitData[BONUS] == RESISTANCE) {
		scorePerUnit *= 1.3;
	}
	
	return Math.round(qty * scorePerUnit);
}

function calculateScore(units, upgrades, wallLevel) {
	var score = makeMilitaryScore(0, 0, 0);
	for (var i=0; i<units.length; i++) {
		var unit = units[i];
		var unitType = unit[UNIT_TYPE];
		var upgrade = upgrades[unitType];
		if (!upgrade) {
			upgrade = makeMilitaryScore(0,0,0);
		}
		score[ATT] += getScore(unitType, unit[QTY], upgrade[ATT], ATT, wallLevel);
		score[DEF] += getScore(unitType, unit[QTY], upgrade[DEF], DEF, wallLevel);
		score[STA] += getScore(unitType, unit[QTY], 0, STA, wallLevel);
	}
	log("Computed ATT: " + score[ATT] + ", DEF: " + score[DEF] + ", STA: " + score[STA]);
	return score;
}

//----------- EXTRACTION FUNCTIONS -------------------
function extractNumber(phrase) {
	if (!phrase) {
		return 0;
	}
	
	var words = phrase.split(" ");
	for (var i = 0; i < words.length; i++) {
		var num = parseInt(words[i], 10);
		if (num) {
			return num;
		}
	}
	return 0;
}

function extractUpgrade(imgSrc) {
	return imgSrc ? 4 - parseInt(imgSrc.replace(/.*icon(.*)\.gif.*/, "$1")) : 0;
}

function extractUpgrades(node) {
	var result = makeMilitaryScore(0, 0, 0);
	result[ATT] = extractUpgrade($("img[class*=att]", node).attr('src'));
	result[DEF] = extractUpgrade($("img[class*=def]", node).attr('src'));
	return result;
}

function makeUnitsAndUpgrades(units, upgrades) {
	var result = {};
	result[UNITS] = units;
	result[UPGRADES] = upgrades;
	return result;
}

function extractUnitsAndUpgrades() {	
	var units = [];
	var upgrades = {};

	$('ul#units > li').each(
		function () {
			var unitType = $(this).attr('class').split(' ')[1];
			var quantity = parseInt($.trim( $('.unitcount', $(this)).html().replace(/<span.*?\/span>/, "") ));
			var unitUpgrades = extractUpgrades($(this));

			var unit = {};
			unit[UNIT_TYPE] = unitType;
			unit[QTY] = quantity;
			units.push(unit);
			
			var upgrade = {};
			upgrade[ATT] = unitUpgrades[ATT];
			upgrade[DEF] = unitUpgrades[DEF];			
			upgrades[unitType] = upgrade;
		}
	);

	return makeUnitsAndUpgrades(units, upgrades);
}

function extractUnitType(url, type) {
	var filter = ".*60_(.*)_faceright.gif";
	if (type == SHIP) {
		filter = ".*60\/(.*)_faceright.gif";
	}
	return url.replace(new RegExp(filter), "$1");
}

function extractCount(text) {
	var txt = text.replace(/-/, "0");
	return parseInt(txt);
}

function extractUnits(tab, type) {
	var units = [];
	
	$("#" + tab + " .contentBox01h:first table tbody").each(
		function() {
			var types = $("tr[class!=count]", this);
			var index = 0;
			$("tr.count td", this).each(
				function() {
					var quantity = extractCount($(this).text());
					var unitType = extractUnitType($("th:eq(" + (index++) + ") img", types).attr("src"), type);
					
					var unit = {};
					unit[UNIT_TYPE] = unitType;
					unit[QTY] = quantity;
					
					units.push(unit);
				}
			);
		}
	);
	
	log("Extracted units: " + JSON.stringify(units));
	return units;
}

//----------- DISPLAY FUNCTIONS -------------------
function formatNumber(num) {
	var numStr = "" + num;
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(numStr)) {
		numStr = numStr.replace(rgx, '$1' + ',' + '$2');
	}
	return numStr;
}

function applyScore(prefix, score) {
	$("." + prefix + "AttScore").html(formatNumber(score[ATT]));
	$("." + prefix + "DefScore").html(formatNumber(score[DEF]));
	$("." + prefix + "StaScore").html(formatNumber(score[STA]));
}

function displayMilitary(serverName, townName) {
	// zero
	var zeroScore = makeMilitaryScore(0, 0, 0);

	var locations = $("#locations");
	var wallLevel = extractNumber($(".wall a", locations).attr("title"));
	$(".wallBonus").text((wallLevel*10) + "%");

	var units = readCache(serverName, townName);
	var upgrades = readCache(serverName);
	
	if (units && units[TROOP] && upgrades && upgrades[TROOP]) {
		applyScore(TROOP, calculateScore(units[TROOP], upgrades[TROOP], wallLevel));
	} else {
		applyScore(TROOP, zeroScore);
	}	

	if (units && units[SHIP] && upgrades && upgrades[SHIP]) {
		applyScore(SHIP, calculateScore(units[SHIP], upgrades[SHIP], wallLevel));
	} else {
		applyScore(SHIP, zeroScore);
	}	
}

function createDiv() {

	GM_addStyle("#ikariamMilitaryDiv { margin-top: 12px; } " +
				"#ikariamMilitaryDiv li { margin: 2px 10px; } " +
				"#ikariamMilitaryDiv .data .textLabel { float: left; width: 80px; } " +
				"#ikariamMilitaryDiv .militaryInfo .hdr { float: left; font-weight: bold; }");
	
	$("#information .content").append( $(
		'<div id="ikariamMilitaryDiv">' +
			'<ul>' +
				'<li class="militaryInfo"><span class="hdr">Tropas:</span><br/>' +
					'<ul>' +
						'<li class="data"><span class="textLabel">Ataque: </span><div class="trpAttScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Defensa: </span><div class="trpDefScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Stamina: </span><div class="trpStaScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Bonus: </span><div class="wallBonus">0</div></li>' +
					'</ul>' +
				'</li>' +
				'<li class="militaryInfo"><span class="hdr">Barcos:</span><br/>' +
					'<ul>' +
						'<li class="data"><span class="textLabel">Ataque: </span><div class="shpAttScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Defensa: </span><div class="shpDefScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Stamina: </span><div class="shpStaScore">0</div></li>' +
					'</ul>' +
				'</li>' +
			'</ul>'
	));
}

//-------------- MAIN FUNCTION --------------------------------------
$(function () {
	try {	
		var page = $("body").attr("id");
		var serverName = top.location.host;
		var townName = $("#changeCityForm div[class*=coords]").text();

		if (page == "city") {
			if ($("#reportInboxLeft").length > 0 || $("#unitConstructionList").length > 0 ) {
				initializeData();
				createDiv();			
				displayMilitary(serverName, townName);
			}
		} else
		if (page == "barracks") {
			updateUnitsAndUpgradesCache(serverName, townName, TROOP, extractUnitsAndUpgrades());
		} else
		if (page == "shipyard") {
			updateUnitsAndUpgradesCache(serverName, townName, SHIP, extractUnitsAndUpgrades());
		} else
		if (page == "cityMilitary-army") {
			updateUnitsCache(serverName, townName, TROOP, extractUnits("tab1", TROOP));
		} else
		if (page == "cityMilitary-fleet") {
			updateUnitsCache(serverName, townName, SHIP, extractUnits("tab2", SHIP));
		}
	} catch (e) {
		log("Error: " + e);
	}
});
