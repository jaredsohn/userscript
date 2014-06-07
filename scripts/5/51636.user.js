// ==UserScript==
// @name          Войска в Икариам
// @version       1.2a
// @copyright     2009, Yoshi Toranaga, перевод на Русский язык by Vit'OS (hakergtr@yandex.ru) 
// @license       GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @namespace     http://www.home.org/ikariam/military
// @description   Показывает характеристики ваших войск/кораблей
// @include       http://s*.ikariam.*/*
// @exclude       http://board.ikariam.*/*
// @require       http://www.JSON.org/json2.js
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

// globals
var CACHE = {};
var SCORES = {};

// constants
var CACHE_KEY = "Cache";
var DEBUG = false;
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
function readCache() {
	var json = GM_getValue(CACHE_KEY);
	if (json) {
		CACHE = JSON.parse(json);
	}
}

function writeCache() {
	var json = JSON.stringify(CACHE);
	log("JSON: " + json);
	GM_setValue(CACHE_KEY, json);
}

function updateCache(serverName, townName, unitType, units) {
	readCache();
	if (!CACHE[serverName]) {
		CACHE[serverName] = {};
	}
	
	if (!CACHE[serverName][townName]) {
		CACHE[serverName][townName] = {};
	}
	
	if (!CACHE[serverName][townName][unitType]) {
		CACHE[serverName][townName][unitType] = {};
	}

	CACHE[serverName][townName][unitType] = units;
	writeCache();
}

function getFromCache(serverName, townName) {
	readCache();
	log("Looking for town " + townName + ", server: " + serverName);
	if (!CACHE[serverName]) {
		log("Server not found!");
		return undefined;
	}
	
	if (!CACHE[serverName][townName]) {
		log("Town not found!");
		return undefined;
	}
	
	log("Found!");
	return CACHE[serverName][townName];
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

function calculateScore(cacheData, wallLevel) {
	var score = makeMilitaryScore(0, 0, 0);
	for (var i=0; i<cacheData.length; i++) {
		var unit = cacheData[i];
		score[ATT] += getScore(unit[UNIT_TYPE], unit[QTY], unit[ATT], ATT, wallLevel);
		score[DEF] += getScore(unit[UNIT_TYPE], unit[QTY], unit[DEF], DEF, wallLevel);
		score[STA] += getScore(unit[UNIT_TYPE], unit[QTY], 0, STA, wallLevel);
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

function extractUnits() {
	var units = [];

	$('ul#units > li').each(
		function () {
			var unitType = $(this).attr('class').split(' ')[1];
			var quantity = parseInt($.trim( $('.unitcount', $(this)).html().replace(/<span.*?\/span>/, "") ));
			var upgrades = extractUpgrades($(this));

			var unit = {};
			unit[UNIT_TYPE] = unitType;
			unit[QTY] = quantity;
			unit[ATT] = upgrades[ATT];
			unit[DEF] = upgrades[DEF];
			
			units.push(unit);
		}
	);

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

	var cacheData = getFromCache(serverName, townName);
	
	if (cacheData && cacheData[TROOP]) {
		applyScore(TROOP, calculateScore(cacheData[TROOP], wallLevel));
	} else {
		applyScore(TROOP, zeroScore);
	}	

	if (cacheData && cacheData[SHIP]) {
		applyScore(SHIP, calculateScore(cacheData[SHIP], wallLevel));
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
				'<li class="militaryInfo"><span class="hdr">Войсковые части:</span><br/>' +
					'<ul>' +
						'<li class="data"><span class="textLabel">Атака: </span><div class="trpAttScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Защита: </span><div class="trpDefScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Стойкость: </span><div class="trpStaScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Бонус стены: </span><div class="wallBonus">0</div></li>' +
					'</ul>' +
				'</li>' +
				'<li class="militaryInfo"><span class="hdr">Корабли:</span><br/>' +
					'<ul>' +
						'<li class="data"><span class="textLabel">Атака: </span><div class="shpAttScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Защита: </span><div class="shpDefScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Стойкость: </span><div class="shpStaScore">0</div></li>' +
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
			updateCache(serverName, townName, TROOP, extractUnits());
		} else
		if (page == "shipyard") {
			updateCache(serverName, townName, SHIP, extractUnits());
		}
	} catch (e) {
		log("Error: " + e);
	}
});