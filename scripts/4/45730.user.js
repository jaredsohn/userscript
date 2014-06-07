// ==UserScript==
// @name          BYBS Military Attack Calculator
// @version       1.0
// @license       GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @namespace     http://www.home.org/ikariam/military
// @description   Calculates the strength of your troops/ships
// @include       http://s*.ikariam.*/*
// @exclude       http://board.ikariam.*/*
// @require       http://www.JSON.org/json2.js
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==



// cache
var CACHE = {};
var CACHE_KEY = "CachedData";
var CACHE_TIMEOUT_IN_MINUTES = 10;

// options
var DEBUG = GM_getValue('DebugMode', false);

//  constants
var ATT = 'attack';
var DEF = 'defense';
var STA = 'stamina';
var BONUS = 'bonus';
var UNIT_TYPE = 'unit_type';

//  unit types
var SHIP = 'ship';
var TROOP = 'troop';

//  bonus types
var NONE = 'no bonus';
var ASSAULT = 'assault bonus';
var RESISTANCE = 'resistance bonus';
var RAM = 'ram bonus';
var HEALER = 'healer bonus';
var REGENERATION = 'regeneration bonus';

//  points per unit
var SCORES = {};

// default colours
var DEFAULT_TROOPS_BG_COLOUR = '#FFFFFF';
var DEFAULT_SHIPS_BG_COLOUR = '#FFFFFF';
var DEFAULT_TEXT_COLOUR = '#3300cc';

// options
var DISPLAY_TEXT = 'DisplayAsText';

// colour options
var TROOPS_BG_COLOUR = 'TroopsBackgroundColour';
var SHIPS_BG_COLOUR = 'ShipsBackgroundColour';
var TEXT_COLOUR = 'TextColour';
var TRANSPARENT = '';
var TIMESTAMP = 'timestamp';


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

function makeKey(serverName, townName) {
	return escape(serverName + "/" + townName);
}

function addToCache(serverName, townName, troopScore, shipScore) {
	var cachedTown = {};
	cachedTown[TIMESTAMP] = new Date().getTime() + "";
	cachedTown[TROOP] = troopScore;
	cachedTown[SHIP] = shipScore;
	CACHE[makeKey(serverName, townName)] = cachedTown;
	writeCache();
}

function getFromCache(serverName, townName) {
	readCache();
	log("looking for town " + townName + ", server: " + serverName);
	var cachedTown = CACHE[makeKey(serverName, townName)];
	if (!cachedTown) {
		log("not found!");
		return undefined;
	}
	
	var timeoutTime = (new Date().getTime() - (1000*60*CACHE_TIMEOUT_IN_MINUTES));
	if (cachedTown[TIMESTAMP] < timeoutTime) {
		log("Found, but expired!");
		return undefined;
	}
	
	log("Found!");
	return cachedTown;
}

var cachedScores = 0;
var cacheData = {};

function prepareCache(serverName, townName, prefix, score) {

	log("preparing " + prefix + " score for town " + townName + ", server: " + serverName);
	cacheData[prefix] = score;
	cachedScores++;
	
	if (cachedScores == 2) {
		log("Adding to cache...");
		addToCache(serverName, townName, cacheData[TROOP], cacheData[SHIP]);
	}
}

/*
 * Initialize scores table
 */
function initializeData() {
	addUnit('slinger',            TROOP,   7,   8,   9,  10,   6,   7,   8,   9,  7, NONE);
	addUnit('swordsman',          TROOP,  18,  20,  23,  27,  11,  12,  13,  15,  4, ASSAULT);
	addUnit('phalanx',            TROOP,  14,  16,  18,  20,  30,  34,  39,  45,  8, RESISTANCE);
	addUnit('archer',             TROOP,  26,  29,  34,  41,  23,  24,  25,  26,  4, RESISTANCE);
	addUnit('marksman',           TROOP,  42,  47,  55,  66,  21,  23,  25,  27,  5, ASSAULT);
	addUnit('gyrocopter',         TROOP,  35,  39,  44,  50,  30,  33,  37,  42,  3, NONE);
	addUnit('steamgiant',         TROOP,  67,  75,  85,  97,  50,  58,  68,  80,  4, NONE);
	addUnit('bombardier',         TROOP, 184, 206, 234, 268,  54,  60,  68,  78,  3, ASSAULT);
	addUnit('ram',                TROOP,   6,   8,  10,  12,  50,  58,  68,  80,  5, RAM);
	addUnit('catapult',           TROOP,  34,  42,  52,  64,  33,  37,  43,  51,  5, RAM);
	addUnit('mortar',             TROOP, 142, 157, 175, 196,  92, 102, 114, 128,  5, RAM);
	addUnit('medic',              TROOP,   8,   8,   8,   8,  22,  22,  22,  22, 10, HEALER);
	addUnit('cook',               TROOP,  12,  12,  12,  12,  18,  18,  18,  18, 10, REGENERATION);	
	
	addUnit('ship_ram',           SHIP,   16,  18,  21,  24,  13,  14,  15,  17,  5, ASSAULT);
	addUnit('ship_ballista',      SHIP,   15,  16,  18,  20,  17,  20,  23,  27,  6, RESISTANCE);
	addUnit('ship_flamethrower',  SHIP,   39,  44,  50,  57,  17,  19,  22,  26,  5, ASSAULT);
	addUnit('ship_catapult',      SHIP,   26,  29,  33,  38,  38,  43,  49,  56,  6, RESISTANCE);
	addUnit('ship_steamboat',     SHIP,   84,  94, 107, 123,  25,  27,  31,  37,  5, ASSAULT);
	addUnit('ship_mortar',        SHIP,   54,  60,  68,  78, 108, 120, 136, 156,  6, RESISTANCE);
	addUnit('ship_submarine',     SHIP,  142, 160, 181, 205,  56,  62,  70,  80,  3, NONE);
}

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

function extractUpgrade(imgSrc) {
	return imgSrc ? 4 - parseInt(imgSrc.replace(/.*icon(.*)\.gif.*/, "$1")) : 0;
}

function extractUpgrades(node) {
	var result = makeMilitaryScore(0, 0, 0);
	result[ATT] = extractUpgrade($("img[class*=att]", node).attr('src'));
	result[DEF] = extractUpgrade($("img[class*=def]", node).attr('src'));
	return result;
}


function extractScore(prefix, htmlResponse, wallLevel) {
	var divId = prefix + "HiddenDiv";
	var scoreDiv = $('<div id="' + divId + '"></div>').html(htmlResponse).attr('style', 'display: none');
	$('body').append(scoreDiv);
	
	var score = makeMilitaryScore(0, 0, 0);

	$('#' + divId + ' ul#units > li').each(
		function () {
			var unitType = $(this).attr('class').split(' ')[1];
			var quantity = parseInt($.trim( $('.unitcount', $(this)).html().replace(/<span.*?\/span>/, "") ));
			var upgrades = extractUpgrades($(this));

			score[ATT] += getScore(unitType, quantity, upgrades[ATT], ATT, wallLevel);
			score[DEF] += getScore(unitType, quantity, upgrades[DEF], DEF, wallLevel);
			score[STA] += getScore(unitType, quantity, upgrades[STA], STA, wallLevel);
		}
	);

	return score;
}

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

function fetchMilitaryScore(href, wallLevel, prefix, serverName, townName) {

	var gameServer = top.location.host;
	var url = href.replace(/.(.*)/, "$1").replace(/&amp;/, "&");
	
	GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://' + gameServer + '/index.php',
        data: url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php', 
            'Cookie': document.cookie
        },
       
		onload: function(responseDetails) {
			try {
				var score = extractScore(prefix, responseDetails.responseText, wallLevel);
				applyScore(prefix, score);
				prepareCache(serverName, townName, prefix, score);
			} catch (e) {
				log("ERROR: " + e);
			}
		}
	});
}

function findNumber(phrase) {
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

function militaryInformation() {
	var locations = $("locations");

	// zero
	var zeroScore = makeMilitaryScore(0, 0, 0);

	var locations = $("#locations");
	var wallLevel = findNumber($(".wall a", locations).attr("title"));
	$("#wallBonus").text((wallLevel*10) + "%");

	var serverName = top.location.host;

	var crumbs = $("#breadcrumbs");
	var townName = $(".island", crumbs).html() + "/" + $(".city", crumbs).html();	
	log("Town name: " + townName);
	
	var cachedTown = getFromCache(serverName, townName);
	if (cachedTown) {
		applyScore(TROOP, cachedTown[TROOP]);
		applyScore(SHIP, cachedTown[SHIP]);
		return;
	}
	
	// retrieve barracks military score
	var barracks = $(".barracks a", locations).attr("href");
	if (barracks) {
		fetchMilitaryScore(barracks, wallLevel, TROOP, serverName, townName);
	} else {
		applyScore(TROOP, zeroScore);
		prepareCache(serverName, townName, TROOP, zeroScore);
	}
	
	// retrieve shipyard military score
	var shipyard = $(".shipyard a", locations).attr("href");
	if (shipyard) {
		fetchMilitaryScore(shipyard, wallLevel, SHIP, serverName, townName);
	} else {
		applyScore(SHIP, zeroScore);
		prepareCache(serverName, townName, SHIP, zeroScore);
	}	
}

function makeStyle(colourType, colour) {
	return (TRANSPARENT == colour ? TRANSPARENT : (colourType + ": " + colour + ";"));
}

function createDivs() {

	if ($("#ikariamMilitaryDiv").length) {
		return;
	}

	createOptionsDiv();
	createTextDiv();
	createImgDiv();
	
	return GM_getValue(DISPLAY_TEXT, true) ? $('#ikariamMilitaryTxtDiv').slideDown() : $('#ikariamMilitaryImgDiv').slideDown(); 
}

function toggle(id) {
	var div = $(id);
	return div.is(":hidden") ? div.slideDown() : div.slideUp();
}

function createTextDiv() {

	GM_addStyle("#ikariamMilitaryTxtDiv { display:none; } " +
			    "#ikariamMilitaryTxtDiv li { margin: 2px 10px; } " +
				"#ikariamMilitaryTxtDiv .data .textLabel { float: left; width: 80px; } " +
				"#ikariamMilitaryTxtDiv .militaryInfo .hdr { float: left; font-weight: bold; }");
	
	$("#reportInboxLeft .content .centerButton").before( $(
		'<div id="ikariamMilitaryTxtDiv">' +
			'<ul>' +
				'<li class="militaryInfo"><span class="hdr">Troops:</span><br/>' +
					'<ul>' +
						'<li class="data"><span class="textLabel">Attack: </span><div class="troopAttScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Defense: </span><div class="troopDefScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Stamina: </span><div class="troopStaScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Wall bonus: </span><div id="wallBonus">0</div></li>' +
					'</ul>' +
				'</li>' +
				'<li class="militaryInfo"><span class="hdr">Ships:</span><br/>' +
					'<ul>' +
						'<li class="data"><span class="textLabel">Attack: </span><div class="shipAttScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Defense: </span><div class="shipDefScore">0</div></li>' +
						'<li class="data"><span class="textLabel">Stamina: </span><div class="shipStaScore">0</div></li>' +
					'</ul>' +
				'</li>' +
			'</ul>'
	).click( function() { toggle('#imOptions'); } ));
}

function createImgDiv() {
	
	GM_addStyle(
		"#ikariamMilitaryImgDiv { display:none; margin: 5px 10px; " + makeStyle('color', GM_getValue(TEXT_COLOUR, DEFAULT_TEXT_COLOUR)) + " } " +
		"#ikariamMilitaryImgDiv table.tbl { border: 2px; width: 160px; } " +
		"#ikariamMilitaryImgDiv td.troop { padding: 5px 10px; width: 50px; } " +
		"#ikariamMilitaryImgDiv td.icon { padding: 5px 10px; width: 30px; } " +
		"#ikariamMilitaryImgDiv td.score { padding: 5px 10px; width: 100%; text-align: right; } " +
		"#ikariamMilitaryImgDiv tr.troops { " + makeStyle('background-color', GM_getValue(TROOPS_BG_COLOUR, DEFAULT_TROOPS_BG_COLOUR)) + " } " +
		"#ikariamMilitaryImgDiv tr.ships { " + makeStyle('background-color', GM_getValue(SHIPS_BG_COLOUR, DEFAULT_SHIPS_BG_COLOUR)) + " } ");

	$('#reportInboxLeft .content .centerButton').before($(
		'<div id="ikariamMilitaryImgDiv">' +
			'<div align="center">' +
				'<table class="tbl"><tbody>' +
					'<tr class="troops">' +
						'<td rowspan="4" class="troop"><img src="/skin/characters/military/x40_y40/y40_swordsman_faceright.gif" title="Land troops" /></td>' +
						'<td class="icon"><img src="/skin/layout/sword-icon-report.gif" title="Attack score" /></td>' +
						'<td class="score"><div class="troopAttScore">0</div></td></tr>' +
					'<tr class="troops">' +
						'<td class="icon"><img src="/skin/layout/shield-icon-report.gif" title="Defense score" /></td>' +
						'<td class="score"><div class="troopDefScore">0</div></td></tr>' +
					'<tr class="troops">' +
						'<td class="icon"><img src="/skin/layout/icon-endurance2.gif" title="Stamina score" /></td>' +
						'<td class="score"><div class="troopStaScore">0</div></td></tr>' +
					'<tr class="troops">' +
						'<td class="icon"><img src="/skin/layout/icon-wall.gif" title="Wall bonus" /></td>' +
						'<td class="score"><div id="wallBonus">0</div></td></tr>' +
					'<tr class="ships">' +
						'<td rowspan="3" class="troop"><img src="/skin/characters/fleet/40x40/ship_ram_r_40x40.gif" title="Ships" /></td>' +
						'<td class="icon"><img src="/skin/layout/sword-icon-report.gif" title="Attack score" /></td>' +
						'<td class="score"><div class="shipAttScore">0</div></td></tr>' +
					'<tr class="ships">' +
						'<td class="icon"><img src="/skin/layout/shield-icon-report.gif" title="Defense score" /></td>' +
						'<td class="score"><div class="shipDefScore">0</div></td></tr>' +
					'<tr class="ships">' +
						'<td class="icon"><img src="/skin/layout/icon-endurance2.gif" title="Stamina score" /></td>' +
						'<td class="score"><div class="shipStaScore">0</div></td></tr>' +
				'</tbody></table>' +
			'</div>' +
		'</div>'
	).click( function() { toggle('#imOptions'); } ));
}

function validateColour(colour, defaultValue) {
	if (TRANSPARENT == colour) {
		return TRANSPARENT;
	}
	return colour.match(/#[A-Fa-f0-9]{6}/) ? colour : defaultValue;
}

function createOptionsDiv() {
	GM_addStyle(
		'#imOptionsC { position:absolute; z-index:99999; top: 200px; left:50%; width:500px; }' +
		'#imOptions { display:none; position:relative; left: -250px; align:center; width: 250px; margin: 0 auto 0 auto; border:1px solid #612d04; background: #dbbe8c url(/skin/layout/bg_stone.jpg) repeat; }' +
		'#imOptions h3 { padding:10px 6px 0px 6px; margin:0; color:#612d04; font:bold 12px Arial, Helvetica, sans-serif; text-align:center; border-bottom:1px solid #f1d198; }' +
		'#imOptions table { width: 100%; margin:0; }' +
		'#imOptions table td, #options table th { padding:4px 8px; }' +
		'#imOptions table th { text-align:right; font-weight:bold; padding-right:10px; width:40%; }' +
	'');
	
	$('body').append( $(
		'<div id="imOptionsC"><div id="imOptions">' +
			'<h3>Ikariam Military Options</h3>' +
			'<table cellpadding="0" cellspacing="0"><tbody>' +
				'<tr><th>Display format</th>' +
					'<td><input id="imDisplayText" type="radio" name="imDisplayMode" value="Text" />&nbsp;Text&nbsp;&nbsp;&nbsp;' +
					    '<input id="imDisplayImages" type="radio" name="imDisplayMode" value="Images" />&nbsp;Images</td>' +
				'</tr>' +
				'<tr><th>Troops bgcolor</th><td><input id="imTroopsBg" type="textfield" class="textfield" name="imTroopsBg" size="7" /></td></tr>' +
				'<tr><th>Ships bgcolor</th><td><input id="imShipsBg" type="textfield" class="textfield" name="imShipsBg" size="7" /></td></tr>' +
				'<tr><th>Text color</th><td><input id="imText" type="textfield" class="textfield" name="imText" title="Use #rrggbb notation or leave empty for transparent." size="7" /></td></tr>' +
			'</tbody></table>' +
		'</div></div>'
	) );

	if (GM_getValue(DISPLAY_TEXT, true)) {
		$("#imDisplayText").attr("checked", true);
		$("#imTroopsBg").attr("disabled", true);
		$("#imShipsBg").attr("disabled", true);
		$("#imText").attr("disabled", true);
	} else {
		$("#imDisplayImages").attr("checked", true);
	}
	
	$("#imDisplayText").change(
		function() {
			GM_setValue(DISPLAY_TEXT, true);
			toggle('#ikariamMilitaryImgDiv'); toggle('#ikariamMilitaryTxtDiv');
			$("#imTroopsBg").attr("disabled", true);
			$("#imShipsBg").attr("disabled", true);
			$("#imText").attr("disabled", true);
		});
	$("#imDisplayImages").change(
		function() {
			GM_setValue(DISPLAY_TEXT, false);
			toggle('#ikariamMilitaryTxtDiv'); toggle('#ikariamMilitaryImgDiv');
			$("#imTroopsBg").removeAttr("disabled");
			$("#imShipsBg").removeAttr("disabled");
			$("#imText").removeAttr("disabled");
		});
	
	$("#imTroopsBg").val(GM_getValue(TROOPS_BG_COLOUR, DEFAULT_TROOPS_BG_COLOUR));
	$("#imTroopsBg").change( function() { GM_setValue(TROOPS_BG_COLOUR, validateColour($("#imTroopsBg").val(), DEFAULT_TROOPS_BG_COLOUR)); });			

	$("#imShipsBg").val(GM_getValue(SHIPS_BG_COLOUR, DEFAULT_SHIPS_BG_COLOUR));
	$("#imShipsBg").change( function() { GM_setValue(SHIPS_BG_COLOUR, validateColour($("#imShipsBg").val(), DEFAULT_SHIPS_BG_COLOUR)); });			

	$("#imText").val(GM_getValue(TEXT_COLOUR, DEFAULT_TEXT_COLOUR));
	$("#imText").change( function() { GM_setValue(TEXT_COLOUR, validateColour($("#imText").val(), DEFAULT_TEXT_COLOUR)); });			

}

$(function () {
	try {		
		if ($("body").attr("id") == "city" && $("#reportInboxLeft").length) {
			initializeData();
			createDivs();			
			militaryInformation();			
		}
	} catch (e) {
		log("Error: " + e);
	}
});
