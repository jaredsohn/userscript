// JavaScript Document
// ==UserScript==
// @name           IK Fight Image CR Converter
// @autor          TeKnopolis - holyschmidt (http://userscripts.org/users/?????)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/60738
// @description    Easily Convert Combat Reports for forum viewing.
// @include        http://s*.ikariam.*/index.php?view=militaryAdvisorReportView&combatId=*
// @include        http://s*.ikariam.*/index.php*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_CombatReport.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_Ships.js
// @require        http://ikariamtool.googlecode.com/svn/trunk/IkariamLang_Units.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Resources.js
// @version        1.2.6
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

// Version 1.2.6 - update from 0.3.4 version
// Version 1.2.5 - BugFix: Butin multiple, correction comptage négatif des troupes (création d'unité durant un combat)
// Version 1.2.4 - Rajout du détail de l'issue de combat + nom du serveur
// Version 1.2.3 - Divers correctifs mineurs
// Version 1.2.2 - Traduction fr pour lancier et barbare + image Barbarian
// Version 1.2.1 - Traduction multilangue pour la conclusion
// Version 1.2 - Affichage des perdants lors d'une fuite de l'armée
// Version 1.1 - Correction sur les noms des unités et optimisation du code
// Version 1.0 - New version for 0.3.2.


const cache_key		  = getServerDomain() + '.' + getServerWorld();
const cache_variables = {
	PRNTMODE:		'ikcrc.prntmode',
	FORMAT:			'ikcrc.format',
	LAST_REPORT:	'ikcrc.lastReport' + cache_key
};

var IKCRC_REPORT = {
	info:   { type:null, place:null, time:null, attackers:null, defenders:null, wall:null },
	battle: { attacking_totals: [0, 0, 0], defending_totals: [0, 0, 0], wall: '', walltext: '', attackers: [], defenders: [], victors:null },
	loot:   { total: 0, resource: [] }
};

var IKCRC_PRNTMODE = 
	GM_getValue(cache_variables.PRNTMODE, false) != '' ? GM_getValue(cache_variables.PRNTMODE, false) : 'standard';

var IKCRC_FORMAT = 
	GM_getValue(cache_variables.FORMAT, false) != '' ? GM_getValue(cache_variables.FORMAT, false) : 'ikariam';

var IKCRC_FORMATTERS = {
	"ajaxchat" : { open: '[', close: ']', center: '{TEXT}', color: '[color={COLOR}]{TEXT}[/color]', bold: '{TEXT}', font: '[code]{TEXT}[/code]', link: '[url={LINK}]{TEXT}[/url]', image: '[img]{IMAGE}[/img]', size : '{TEXT}' },
	"bbcode"  : {  open: '[', close: ']', center: '[align=center]{TEXT}[/align]', color: '[color=#{COLOR}]{TEXT}[/color]', bold: '[b]{TEXT}[/b]', font: '[font={FONT}]{TEXT}[/font]', link: '[url={LINK}]{TEXT}[/url]', image: '[img]{IMAGE}[/img]', size: '{TEXT}' },
	"circular" : { open: '&lt;', close: '&gt;', center: '&lt;div style="text-align: center"&gt;{TEXT}&lt;/div&gt;', color: '&lt;span style="color: #{COLOR}"&gt;{TEXT}&lt;/span&gt;', bold: '&lt;b&gt;{TEXT}&lt;/b&gt;', font: '&lt;span style="font-family: {FONT}"&gt;{TEXT}&lt;/span&gt;', link: '&lt;a href="{LINK}"&gt;{TEXT}&lt;/a&gt;', image: '&lt;img src={IMAGE} /&gt;', size: '{TEXT}' },
	"plaintext"  : {  open: '[', close: ']', center: '{TEXT}', color: '{TEXT}', bold: '{TEXT}', font: '{TEXT}', link: '{TEXT}: {LINK} ', image: '', size: '{TEXT}' },
};

GAME_VERSION = $("li.version span").text().substr(0, 7);
GAME_VERSION  = GAME_VERSION == "v.0.3.1" ? "v.0.3.1" : "v.0.3.2";
const VERSION = "1.2.6";
const IKCRC_VERSION = "1.2.6";

const PAGE_ID = {
	diplomacyAdvisor:			"inbox",
	diplomacyAdvisorOutBox:		"inbox",
	militaryAdvisorReportView:	"report"
}[ $("body").attr("id") ];

const PAGE_TYPE = document.location.href.indexOf("detailedCombatId") == -1 ? 'overview' : 'detailed';

const I_RESOURCES = [
/* wood */ 'http://img196.imageshack.us/img196/1127/woodsmall.gif',
/* wine */ 'http://img193.imageshack.us/img193/2796/winesmall.gif',
/* marb */ 'http://img194.imageshack.us/img194/421/iconmarble.gif',
/* glas */ 'http://img190.imageshack.us/img190/5090/glasssmall.gif',
/* sulf */ 'http://img195.imageshack.us/img195/2010/sulfursmall.gif'
];

// TODO
// wall?				314
const U_MAP = {
	name: { 
		slinger: 		"army s301", 
		swordsman: 		"army s302", 
		phalanx: 		"army s303", 
		archer: 		"army s313", 
		marksman: 		"army s304", 
		gyrocopter: 	"army s312", 
		"steam giant": 	"army s308", 
		bombardier: 	"army s309", 
		ram: 			"army s307", 
		catapult: 		"army s306", 
		mortar: 		"army s305", 
		doctor: 		"army s311", 
		cook: 			"army s310", 
		barbarian:		"army s316"
	},
	costs: {
		slinger: 		20, 
		swordsman: 		60, 
		phalanx: 		70, 
		archer: 		55, 
		marksman: 		200, 
		gyrocopter: 	125, 
		"steam giant": 	310, 
		bombardier: 	290, 
		ram: 			220, 
		catapult: 		560, 
		mortar: 		1550, 
		doctor: 		200, 
		cook: 			30,
		barbarian:		0
	},
	clas: { 
		"army s301": "slinger", 
		"army s302": "swordsman", 
		"army s303": "phalanx", 
		"army s313": "archer", 
		"army s304": "marksman", 
		"army s312": "gyrocopter", 
		"army s308": "steam giant", 
		"army s309": "bombardier", 
		"army s307": "ram", 
		"army s306": "catapult", 
		"army s305": "mortar", 	
		"army s311": "doctor", 
		"army s310": "cook", 
		"army s315": "spearmen", 
		"army s316": "barbarian" 
	}
};
const S_MAP = {
	name: { 
		cargo: 		"fleet s201", 
		ram: 		"fleet s210", 
		ballista:	"fleet s213", 
		flame: 		"fleet s211", 
		catapult: 	"fleet s214", 
		paddle: 	"fleet s216", 
		mortar: 	"fleet s215", 
		diving: 	"fleet s212" 
	},
	clas: { 
		"fleet s201": "cargo", 
		"fleet s210": "ram", 
		"fleet s213": "ballista", 
		"fleet s211": "flame", 
		"fleet s214": "catapult", 
		"fleet s216": "paddle", 
		"fleet s215": "mortar", 
		"fleet s212": "diving" 
	}
};


/* Check for a later version of the script */
new IkariamUserScriptUpdater( 60738, "IKariam Fight Image CR Converter" );

if (PAGE_ID == 'report') {
	/* Set the server language (IkariamLanguageDetection.js) */
	var LANG = getLang();
	var LANGUAGE = getLanguage();
	var L_HIGHSCORE = language_highscore[LANGUAGE];
	var L_REPORT = language_crconverter[LANG];
	var L_RESOURCES = language_resources[LANGUAGE];
	var L_SHIPS = language_ships[LANG];
	var L_UNITS = language_units[LANG];

	if (L_REPORT == null || L_UNITS == null || L_SHIPS == null || L_HIGHSCORE == null || L_RESOURCES == null) {
		alert(  "Language Not Support!\n" +
		        "Report:\t\t" + L_REPORT + "\n" +
		        "Units:\t\t" + L_UNITS + "\n" +
		        "Ships:\t\t" + L_SHIPS + "\n" +
		        "Highscore:\t" + L_HIGHSCORE + "\n" +
		        "Resources:\t" + L_RESOURCES
		);
	}
	else {
		/* Which page are we on? */
		if (PAGE_TYPE == 'overview') 
		{
			BuildPlayPen();		/* Build PlayPen */
			ParseReport();		/* Parse the Report */
			BuildReport();		/* Build the Report */
		}
		else
		if (PAGE_TYPE == 'detailed' && GAME_VERSION != "v.0.3.2")
		{
			ParseLoot();		/* Parse the Loot */
			BuildJumpBack();	/* Build Jump Link Back to Overview */
		}
	}
}
else
if (PAGE_ID == 'inbox') {
	$("td.msgText div").each(function() {
		if ($(this).html().indexOf("Created using DLR") != -1 && $(this).html().indexOf("Ikariam CR Converter") != -1 ) {
			$(this).html($(this).html().replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
			var start = $(this).html().indexOf('<div style="text-align: center;"><b>', 0);
			var end = $(this).html().indexOf('</b></div>', 0);
			while (start != -1 && end != -1) {
				//alert(start + ":" + end);
				$(this).html($(this).html().substr(0, start) + $(this).html().substr(start, end).replace(/&gt;/g, '') + $(this).html().substr(end));
				start = $(this).html().indexOf('<div style="text-align: center;"><b>', end + 1);
				end = $(this).html().indexOf('</b></div>', end + 1);
			}
		}
	});
}

function BuildPlayPen() {
	GM_addStyle(
		"#ikfcrcPlayPen textarea { font-family: courier; width:97%; }" +
		"#ikfcrcPlayPen #ikfcrcVersion, #ikfcrcPlayPen #ikfcrcSettings { margin:auto 5px; }" +
		"#ikfcrcPlayPen textarea, #ikfcrcPlayPen span.ikfcrcFormats, #ikfcrcUploadStatus { margin:5px; }" +
		"#ikfcrcPlayPen span.ikfcrcFormats, #ikfcrcVersion { position:relative; float:left; }" +
		"#ikfcrcSettings, #ikfcrcUploadStatus { position:relative; float:right; }" +
		"#ikfcrcSettings { color:#FF0000; }" +
		"#ikfcrcSettings:hover, #ikfcrcUploadStatus:hover { text-decoration:underline; cursor:pointer; }"
	);

	
	$("#troopsReport").append('<div id="ikfcrcPlayPen" class="contentBox01h"><h3 class="header">IK Fight Image Combat Report Converter (Version ' + VERSION + ')</h3></div>');


	
	var modes = [ "standard"/*, "deluxe"*/ ];
	

	$("div#ikfcrcPlayPen").find("input").each(function() {
		if (this.name == "ikfcrcFormat") 
		{
			if (this.value == IKCRC_FORMAT)
				this.checked = "checked";
			$(this).click(function() {
				GM_setValue(cache_variables.FORMAT, this.value); IKCRC_FORMAT = this.value;
				BuildReport();
			});
		}
		else if (this.name == "ikfcrcPrntMode")
		{
			if (this.value == IKCRC_PRNTMODE)
				this.checked = "checked";
			$(this).click(function() {
				GM_setValue(cache_variables.PRNTMODE, this.value); IKCRC_PRNTMODE = this.value;
				BuildReport();
			});
		}
	});
}

function ParseReport() { 
	/* Battle Type / Place / Time */
	
	IKCRC_REPORT.info.type  = $("#troopsReport table.overview tr th div[class^='army']").size() > 0 ? "army" : "fleet"; 
	IKCRC_REPORT.info.place = $("div#troopsReport h3.header")[0].childNodes[0].nodeValue;
	IKCRC_REPORT.info.time  = $("div#troopsReport h3.header span.date").text().replace(/\(/,'( ').replace(/\)/, ' )'); 
	
	
	/* Info Issue du combat */
	IKCRC_REPORT.info.issue = $("div#troopsReport div.content h5").text();
	
	/* Attackers / Defenders */
	
	IKCRC_REPORT.info.attackers = $("div#troopsReport div.content div:eq(0) span").text(); 
	IKCRC_REPORT.info.defenders = $("div#troopsReport div.content div:eq(1) span").text(); 
	 

	/* Remaining Totals / Units - This is the tricky part to parse */
	var unitSide = null;
	var unitKeys = new Array();
	$("#troopsReport table.overview tr").each(function() {
		/* re-define units that are being parsed */
		if ($(this).find("th div").size() > 0) {
			unitSide = "attackers";
			unitKeys = []; 
			$(this).find("th div").each(function() { unitKeys.push($(this).attr("class")); });
		}
		else
		if ($(this).find("td[colspan='8'][class^='col1 nobg']").size() == 1) { 
			unitSide = "defenders";
		}
		else
		if ($(this).find("td.numbers").size() == unitKeys.length) {
			unitCount = 0; 
			$(this).find("td.numbers").each(function() {
				var unitClass = unitKeys[unitCount++];
				var unitName = IKCRC_REPORT.info.type == "army" ? U_MAP.clas[unitClass] : S_MAP.clas[unitClass];
				if (unitName != null) { 
					AddUnit(unitSide == "attackers" ? IKCRC_REPORT.battle.attackers : IKCRC_REPORT.battle.defenders, unitName, $(this).text());
				}
			});
		}
	});
	

	/* Victors */
	IKCRC_REPORT.battle.victors = $("div#troopsReport div.result div.winners").text();
	IKCRC_REPORT.battle.losers = $("div#troopsReport div.result div.losers").text(); 
	
  
  /* Results */
	var results = {}; var count = 0;
	$("#troopsReport div.result div").not("div.winners,div.losers").each(function() {
			if ($(this).find("ul.resources").size() == 0) {
			results[count++] = $(this).text(); 
		}
	});
	if (results != '') IKCRC_REPORT.battle.results = results;

  
	/* Loot, If Available */
	$("div.result ul.resources li").each(function() {
		var type = $(this)[0].className;
		var amount = parseInt($(this).contents()[1].nodeValue.replace(/,/,''));

		IKCRC_REPORT.loot.resource[type] = IKCRC_REPORT.loot.resource[type] == null ? amount : IKCRC_REPORT.loot.resource[type] + amount;

		IKCRC_REPORT.loot.total += amount;
	});
}

function ParseLoot() {
	var resources = ['wood', 'wine', 'marble', 'glass', 'sulfur'];
	for(var r = 0; r < resources.length; r++) {
		GM_setValue(cache_variables.LAST_REPORT + '.' + resources[r], 0);
	}
	$("td[colspan*=15] ul.resources").each(function() {
		$(this).find("li").each(function() {
			var type = $(this)[0].className;
			var amount = parseInt($(this).contents()[1].nodeValue.replace(/,/,''));
			GM_setValue(cache_variables.LAST_REPORT + '.' + type, GM_getValue(cache_variables.LAST_REPORT + '.' + type, false) + amount);
		});
	});
}

function BuildReport() {
	var report = '', formatter = new IKCRCFormatter(IKCRC_FORMATTERS[IKCRC_FORMAT]);
	if (formatter != null) 
	{
		/* Empty Textarea */
		$("div#ikfcrcPlayPen textarea").empty();

		/* What print mode should the report be in? */
		switch (IKCRC_PRNTMODE)
		{
		case "standard":
			report = BuildStandardReport(formatter);
		break;
		case "deluxe":
			report = BuildDeluxeReport(formatter);
		break;
		default:
		break;
		}

		/* Fill Flash */
		report2 = report.replace(/&/, '||');
		$("div#ikfcrcPlayPen").append('<div style="margin-left:190px;margin-top:3px;">' +

'<embed src="http://ikariam.teknopop.com/ik/rapport/script/bt_copy.swf" wmode="transparent" flashvars="report=' + report2 + '" width="301" height="35" /></object></p>' +
'<div><a href="http://ikariam.teknopop.com" target="_blank">ForomTools</a></div></div><div class="footer"></div>');
	}
	

}

function BuildStandardReport(formatter)
{
	if (formatter == null) return "NullReferenceException: formatter";

	/* Add Place & Time of Attack */
	
	report = getServerDomain() + '|' + IKCRC_REPORT.info.place + '\n' + IKCRC_REPORT.info.time + '\n';
	

	/* Add Attackers + Defenders Involved */
	report += '\n';
	report += formatter.AddColor(IKCRC_REPORT.info.attackers, 'ATTACKING') + '\n';
	report += 'vs' + '\n';
	report += formatter.AddColor(IKCRC_REPORT.info.defenders, 'DEFENDING') + '\n';

	

	/* Add Attacking / Defending Unit(s) */
	report += '\n';
	report += '───────────────────────────────────────────────────────────────\n';
	
	
		var allUnitCosts = IKCRC_REPORT.info.type == "army"
			? [ 20, 60, 70, 55,  200, 125, 310, 290, 220, 560, 1550, 500, 200, 30, 0]
			: [ 270, 340, 310, 320, 1800, 1120, 910 ];
		var allUnits = IKCRC_REPORT.info.type == "army"
			? ["slinger", "swordsman", "phalanx", "archer", "marksman", "gyrocopter", "steam giant", "bombardier", "ram", 
			   "catapult", "mortar", "doctor", "cook", "spearmen", "barbarian"]
			: ["ram", "ballista", "flame", "catapult", "paddle", "mortar", "diving"];
		var UNIT = IKCRC_REPORT.info.type == "army" ? L_UNITS : L_SHIPS;
	
	var attackersLosses = 0, defendersLosses = 0;
	var numUnit = "";
	var attackersTot = 0, defendersTot = 0; 
	for (var unit = 0; unit < allUnits.length; unit++) {
		var unitName = UNIT[allUnits[unit]]; 
		if (unitName != null) {
			var attacker = IKCRC_REPORT.battle.attackers[GAME_VERSION == "v.0.3.1" ? unitName : allUnits[unit]]; 
			var defender = IKCRC_REPORT.battle.defenders[GAME_VERSION == "v.0.3.1" ? unitName : allUnits[unit]];
			if (attacker != null || defender != null) {
        numUnit += unit+':';
				if (attacker != null) {
					report += unitName + '|';
					report += attacker.left + '|';
					report += '-' + attacker.lost + '|';
					attackersLosses += attacker.lost * allUnitCosts[unit];
					attackersTot += (attacker.left+attacker.lost) * allUnitCosts[unit];
				}
				else {	report += 'xx|-|-|'; }
				if (defender != null) {
					report += unitName + '|';
					report += defender.left + '|';
					report += '-' + defender.lost;
					defendersLosses += defender.lost * allUnitCosts[unit];
					defendersTot += (defender.left+defender.lost) * allUnitCosts[unit];
				}
				else {	report += 'xx|-|-'; }
				report += '\n';
			}
		}
		
	}

	/* Add Table to display Net Losses/Gains + Loot */
	
	var results = '|───────────────────────────────────────────────────────────────|\n';
	var metricTranslations = [L_HIGHSCORE.army_score_main, L_REPORT.damage];
	var metricAttackers = [addCommas(parseInt(attackersLosses*-1*.02)), addCommas(attackersLosses)];
	var metricAttackersTot = [addCommas(parseInt(attackersTot*.02)), ''];
	var metricDefenders = [addCommas(parseInt(defendersLosses*-1*.02)), addCommas(defendersLosses+IKCRC_REPORT.loot.total)];
	
	for (var m = 0; m < metricTranslations.length; m++) {
		results += metricTranslations[m] + '|';
		results += metricAttackers[m] + '|';
		results += metricTranslations[m] + '|'; 
		results += metricDefenders[m]+'\n';
	}
	results += addCommas(parseInt(attackersTot*.02))+ '|' + addCommas(parseInt(defendersTot*.02)) + '|' + L_HIGHSCORE.score + '|' + IKCRC_REPORT.info.type + '|' + numUnit + '|' + VERSION + '|' + IKCRC_REPORT.info.issue + '|' + getServerDomain() + '|' + getServerWorld() +'\n';
	results += '<───────────────────────────────────────────────────────────────>\n';
	report += results;

	/* Add Loot */
	if (IKCRC_REPORT.loot.total > 0) {
		results = '\n';
		results += L_REPORT.loot + ': ';
		var lootTotals = [IKCRC_REPORT.loot.resource["wood"], IKCRC_REPORT.loot.resource["wine"], IKCRC_REPORT.loot.resource["marble"], IKCRC_REPORT.loot.resource["glass"], IKCRC_REPORT.loot.resource["sulfur"]];
		var lootString = [L_RESOURCES.wood, L_RESOURCES.wine, L_RESOURCES.marble, L_RESOURCES.glass, L_RESOURCES.sulfur];
		var lootNum = [1, 2, 3, 4, 5];
		for (var r = 0; r < lootTotals.length; r++) {
			if (lootTotals[r] > 0 ) {
				var imageString = formatter.AddImage(I_RESOURCES[r]);
				if (imageString == '') imageString = '\n' + lootString[r];
				//results += imageString + " " + addCommas(lootTotals[r]) + ' ';
				results += lootNum[r] + " " + imageString + " " + addCommas(lootTotals[r]) + ' ';
				//results += imageString + " " + AddCommas(lootTotals[r]) + ' ';
			}
		}
		//report += IKCRC_REPORT.loot.total + '\n';
		report += results + '\n';
	} else {report += '\n0\n';}
  	
	/* Add Victor(s) */
	if (IKCRC_REPORT.battle.victors == ""){report += '\n' + formatter.AddColor(IKCRC_REPORT.battle.losers, 'VICTOR') + '\n';}else{
	report += '\n' + formatter.AddColor(IKCRC_REPORT.battle.victors, 'VICTOR') + '\n';}
  
  /* Add Results */
	if (IKCRC_REPORT.battle.results != null)
	{
		var totResults = 0;
		report += '\n';
		for (var r in IKCRC_REPORT.battle.results)
		{
			report += formatter.AddColor(IKCRC_REPORT.battle.results[r], 'RESULTS') + '\n';
			totResults += 1;
		}
		report += '<────>\n'+ totResults + '\n';
	}
  /* Add Version */
  report += '\n' + VERSION;
	return report;
}
function BuildDeluxeReport(formatter)
{
	if (formatter == null) return "NullReferenceException: formatter";

	

		/* Add Place & Time of Attack */
		report = formatter.AddColor(IKCRC_REPORT.info.place + '\n' + IKCRC_REPORT.info.time + '\n', 'HEADER');
	

	return "Game version not supported.";
}

function BuildJumpBack() {
	if (document.location.href.indexOf('detailedCombatId') != -1) {
		var battleId = document.location.href.substr(document.location.href.indexOf('detailedCombatId=') + 17);
		if (battleId.indexOf('&') != -1) {
			battleId = battleId.substr(0, battleId.indexOf('&'));
		}
		GM_setValue(cache_variables.LAST_REPORT, battleId);
		GM_addStyle(
			'div#reportOverviewLink			{ display: block; position: absolute; right: 1px; top: 1px; z-index: 100; cursor: pointer; font-size: 8px; background: #e4b873; border: 1px solid brown; }' +
			'div#reportOverviewLink img		{ float: right; margin-top: 5px; }' +
			'div#reportOverviewLink p		{ float: right; margin: 0px; padding: 2px; }'
		);
		var header = $("div#mainview div.contentBox01h:first h3.header");
		const globeImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADdElEQVR42m2Te0xbZRiHf4dzeqM9belKWWG04AEUJhuZ1stkhJsOyJYtI3ZRcPESTUQww+jmostisqiJxsQpc3+PuGjcDFumW3Um25TpMsq4xI31lBaBAiull9PDOZRejkfcyDJ9kyd5v3zJk+998/sI3FMfn50pX0wSexe4ZI2wlDQTy8mUXplhaVXW8VvZI8e/czqXcV8Rd5tPzvtfml+M9sxxJk0qrcKSKIGPcxA4HnoqDcaqHkwSvzx/rKP71n8EQ9Ps7j+mv/iGizMwKh9CoUVAmC/ANa8NngkBtwMRKCUR9ZvPeVodrdWbyjbNrwr8fsk4wB8amloYsRcZ6rBWuwOl+YsIxin0ewoQE69geEwAFx3Fg6Un8MyGD758utLZtSrwzI+0/+jZ36vI5KHC0oSqwh0watSIisCNwAQWUj1gg1cRDPvARRJgTM3zLY9+VF6xbt3CiqBvuO/o6NyR103aQpiVr+KJksdhNVCICRJmuUtgI324OdMPkRewyIlQE3lor/16y8N25rcVwaenh08OeC+0ZsmzM7YGOBjAoqMgpYKICm64x7yoKjEjX7MRWRkB0+FRMEXVz5YXlp9cEXzWN9Xj9g12xBIKGHIc8rYJ6EgKBeZz8vU1mFKvwFZUAV32vzOnRQF8aHw815LbaLVaJ4gj3/ufY+fiJ1Tmt+CfbAO/tBVG1TSq1u/DZmsbzEYnfLwKGoWEYCSN6zPLaLJHoOAnXTW1dU3EoV6PPoc2DEWTB4sTxAAGBt+RF2ZHruICeg+0wxOmcd5LIZWWEPYFkKQI1D/5ABLsT2ipfaRuJQc72/Y5a3bt+VZJH8TUTC5G/nwNS7dD+OpAGWYF4AyrQxoknOzncM0W4K/qF1BB3MDOSuXhu0lUNGx/+f2O/VveiyUM5HjgMcx6p9C4XkCRTY2zk3YMh9Q4emU7PrS8C09xDepNPmwtWT5G3EmjSSafKWW27drz4u7iymYGGV12PDAmWbVzpKgthStYBv3vLnCORpjX0NigYdG00di9+gIZyz8SGTtFUcU6vd4sionMtpbmhre7uxxkDoNT7gQiEg2bkUBe7CLruzn4FHHfv1DL6GS0d3qlzNrOzs6uvW++0ZDMQPPzZXfoav+vl10/nDocCoWu3yv4vyJlaJk1JEnaaJrWRqPRoHz2yURkMn8DmSZfefTcGh0AAAAASUVORK5CYII=';
		header.prepend("<div id='reportOverviewLink'><img src='" + globeImage + "' width='16' height='16'><p>" + L_REPORT.back + "</p></div>");
		$("div#reportOverviewLink", header).click( function() {
			GM_setValue(cache_variables.LAST_REPORT, battleId);
			self.location.replace(document.location.href.replace(/detailedCombatId/,'combatId'));
		});
		delete globeImage;
	}
}

function AddUnit(list, unit, details) {
	
	//if (details.indexOf("(") != -1) {
	if (unit != null && details.indexOf("(") != -1) {
		if (list[unit] == null || list[unit] == undefined) { list[unit] = { left: 0, lost: 0 } }
		list[unit].left += parseInt(details.substr(0, details.indexOf('(')).replace(/\s+/, ''));
		list[unit].lost += parseInt(details.substr(details.indexOf('(') + 2).replace(/\s+/, '').replace(/\)/, ''));						
    }

	
}

/* Default Printing Formatter (ikariam) */
function IKCRCFormatter(format) { 
	this.format = format != null ? format : IKCRC_FORMATTERS['bbcode'];
	this.AddAlignment = function(text)  { 
		return this.format.center.replace(/{TEXT}/g, text); 
	}
	this.AddColor = function(text, color) { 
		if (color != '') 
			return this.format.color.replace(/{COLOR}/g, color).replace(/{TEXT}/g, text); 
		return text; 
	}
	this.AddBold = function(text) { 
		return this.format.bold.replace(/{TEXT}/g, text); 
	}
	this.AddFont = function(text, font) { 
		return this.format.font.replace(/{FONT}/g, font).replace(/{TEXT}/g, text); 
	}
	this.AddLink = function(text, link) { 
		return this.format.link.replace(/{LINK}/g, link).replace(/{TEXT}/g, text); 
	}
	this.AddImage = function(image) { 
		return this.format.image.replace(/{IMAGE}/g, image); 
	}
	this.AddSize = function(text, size) { 
		return this.format.size.replace(/{SIZE}/g, size).replace(/{TEXT}/g, text); 
	}
	this.PadString = function(dir, str, len, c, color) {
		str += "";
		var pad = '';
		var numChars = 0;
		var count = true;
		for(i = 0; i < str.length; i++) {
			if (str.substr(i, this.format.open.length) == this.format.open )   { count = false; i += this.format.open.length - 1; }
			if (count == true) numChars++;
			if (str.substr(i, this.format.close.length) == this.format.close ) { count = true;  i += this.format.close.length - 1; }
		}
		for(i = 0; i < len - numChars; i++) { pad += c; }
		if (str != '')
			str = this.AddColor(str, color);
		return (dir == "left") ? pad + str : str + pad;
	}
	this.ReplaceColors = function(report) { 
		if (IKCRC_FORMAT == "ajaxchat") {
			report = report.replace(/UNITLOST/g, 'red');
			report = report.replace(/ATTACKING/g, 'red');
			report = report.replace(/DEFENDING/g, 'green');
		}
		else {
			report = report.replace(/UNITLEFT/g, '000000');
			report = report.replace(/UNITLOST/g, 'C00000');
			report = report.replace(/ATTACKING/g, 'C00000');
			report = report.replace(/DEFENDING/g, '00C000');
			report = report.replace(/HEADER|VICTOR/g, '0000C0');
			report = report.replace(/RESULTS/g,    '444444');
		}
		return report;
	}
}

function addCommas(nStr) {
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
