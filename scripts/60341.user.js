// JavaScript Document
// ==UserScript==
// @name           Convertisseur de RC GTA
// @autor          Original by holyschmidt
//                 adapted by IshW to fit GTA alliance needs + compatibility v0.3.2
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/57590
// @description    Convertion des Rapports de Combats pour affichage sur forums.
//
// @include        http://s*.ikariam.fr/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_CombatReport.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_Ships.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_Units.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Resources.js
// @version        GTA
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==
//
// Version GTA - Adaptation par GTA
// Version 0.6b.fr - Bugfix
// Version 0.5b.fr - Version Beta basée sur les modifs de holyschmidt v1.8.3
// Version 0.4.fr - Feature by Lemon: better size for ikariam forum (again)
// Version 0.3.fr - Feature by Lemon: better size for ikariam forum
// Version 0.2.fr - Feature by Lemon: new "FFF Forum" format rules
// Version 0.1.fr - Modified by Titi: changing colors and format to match the usual converter http://s1.convertisseur-ikariam.fr.nf/
//                   and to be used on our Ally's forum. Also taken out ikariam/ajax/html/plain text (not used)
//                   apply a multiply by 2, for the losses, to correspond to the official convertisseur (problem on ikariam.fr ??)
//                 Version changed to 0.1 because considered at BETA.
// Version 1.7.0 - Feature: Added wall bonus to combat report.
// Version 1.6.6 - Bugfix: Marble icon was somehow moved from previous location.
// Version 1.6.5 - Bugfix: Possible smiley problem with date/time of battle.
// Version 1.6.4 - Bugfix: Region-specific language file now used for combat report translations.
// Version 1.6.3 - Bugfix: Answering in-game PM's (by default) adds ">" to each line.  Added code to remove these in combat reports.
//                 Bugfix: Moved report into area with in-game report.
// Version 1.6.2 - Bugfix: Compability issue between .com/.org worlds (pending verification).
//                 Bugfix: Unit values for a couple units were incorrect (thanks bagaco).
// Version 1.6.1 - Bugfix: Alignment issues in html/circular formats.
// Version 1.6 -   Feature: Added support for an additional output format: html, which can be now used (in conjunction with this script) to pass along CR's within in-game circulars
//                 Feature: Links created for both the DLR forum topic where created, and userscripts.org page hosted.
//                 Bugfix: Resources images now referenced at imageshack.
// Version 1.5 -   Bugfix: Changed highlighting so smilies are "less" likely to be inserted by mistake.
//                 Bugfix: Version string missing from footer.
// Version 1.4 -   Feature: Added support for "plaintext" view (void of coloring, images, links, etc).
// Version 1.3 -   Bugfix: Script disabled if language pack not found.
// Version 1.2 -   Implentation: Added link to forum homepage.
// Version 1.1 -   Implentation: Changed "Generals" string to come from generic "IkariamLanguage_Highscore.js" script
//                 Bugfix: Issue with multiple worlds saving "Last Report" id.
// Version 1.0 -   Re-wrote with jQuery
//                 Feature: Support for various formats, including phpbb (with added bbcodes) and ajaxchat
//                 Feature: Navigating to detailed report will grab all loot resources
 

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
	"Forum Ikariam"  : {  open: '[', close: ']', center: '[align=center]{TEXT}[/align]', color: '[color=#{COLOR}]{TEXT}[/color]', bold: '[b]{TEXT}[/b]', font: '[font={FONT}]{TEXT}[/font]', link: '[url={LINK}]{TEXT}[/url]', image: '[img]{IMAGE}[/img]', size: '{TEXT}' },
	"GTA"  : {  open: '[', close: ']', center: '[center]{TEXT}[/center]', color: '[color=#{COLOR}]{TEXT}[/color]', bold: '[b]{TEXT}[/b]', font: '[font={FONT}]{TEXT}[/font]', link: '[url={LINK}]{TEXT}[/url]', image: '[img]{IMAGE}[/img]', size: '{TEXT}' },
};

const GAME_VERSION = $("li.version span").text().substr(0, 7);
const VERSION = "GTA";

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
	name: { slinger: "army s301", swordsman: "army s302", phalanx: "army s303", archer: "army s313", marksman: "army s304", gyrocopter: "army s312", "steam giant": "army s308", bombardier: "army s309", ram: "army s307", catapult: "army s306", mortar: "army s305", doctor: "army s311", cook: "army s310" },
	clas: { "army s301": "slinger", "army s302": "swordsman", "army s303": "phalanx", "army s313": "archer", "army s304": "marksman", "army s312": "gyrocopter", "army s308": "steam giant", "army s309": "bombardier", "army s307": "ram", "army s306": "catapult", "army s305": "mortar", "army s311": "doctor", "army s310": "cook", "army s315": "spearmen", "army s316": "barbarian" }
};
const S_MAP = {
	name: { cargo: "fleet s201", ram: "fleet s210", ballista: "fleet s213", flame: "fleet s211", catapult: "fleet s214", paddle: "fleet s216", mortar: "fleet s215", diving: "fleet s212" },
	clas: { "fleet s201": "cargo", "fleet s210": "ram", "fleet s213": "ballista", "fleet s211": "flame", "fleet s214": "catapult", "fleet s216": "paddle", "fleet s215": "mortar", "fleet s212": "diving" }
};


/* Check for a later version of the script */
new IkariamUserScriptUpdater( 57590, "Convertisseur de RC Ikariam FFF" );

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
	}
}
else
if (PAGE_ID == 'inbox') {
	$("td.msgText div").each(function() {
		if ($(this).html().indexOf("DLR") != -1 && $(this).html().indexOf("Convertisseur de RC Ikariam FFF") != -1 ) {
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
		"#ikcrcPlayPen textarea { font-family: courier; }" +
		"#ikcrcPlayPen h3 { font: bold 14px arial; }" +
		"#ikcrcPlayPen h4 { font: bold 12px arial; }"
	);

	$("#troopsReport").append('<div id="ikcrcPlayPen"><h3>Convertisseur de RC Ikariam FFF (Version ' + VERSION + ')</h3></div>');

	$("div#ikcrcPlayPen").append('<table><tr><td align="left"></td><td align="right"></td></tr></table>');
	for (var i in IKCRC_FORMATTERS) {
		$("div#ikcrcPlayPen table tr td[align='left']").append(
		 '<input type="radio" name="ikcrcFormat" value="' + i + '">&nbsp;' + i + '&nbsp;');
	}
	var modes = [ "standard"/*, "deluxe"*/ ];
	for (var m = 0; m < modes.length; m++) {
		var mode = modes[m];
		$("div#ikcrcPlayPen table tr td[align='right']").append(
		 '&nbsp;/ Mode : ' + mode + '&nbsp;<input type="radio" name="ikcrcPrntMode" value="' + mode + '">');
	}

	$("div#ikcrcPlayPen").append(
		 '<textarea rows="5" style="width: 100%" readonly></textarea>' +
		 '<p><b>Source cr&eacute;&eacute; par <a href="http://betawarriors.com/forum/">DLR</a>, adapt&eacute; pour les serveur FR par <a href="http://fight-for-fun.com/profil-de-lemonhead-1.html">Lemon</a> & <a href="http://fight-for-fun.com/profil-de-titi-fr-646.html">Titi</a></b></p>');

	$("div#ikcrcPlayPen").find("input").each(function() {
		if (this.name == "ikcrcFormat") 
		{
			if (this.value == IKCRC_FORMAT)
				this.checked = "checked";
			$(this).click(function() {
				GM_setValue(cache_variables.FORMAT, this.value); IKCRC_FORMAT = this.value;
				BuildReport();
			});
		}
		else if (this.name == "ikcrcPrntMode")
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

	/* Loot, If Available */
	$("div.result ul.resources li").each(function() {
		var type = $(this)[0].className;
		var amount = parseInt($(this).contents()[1].nodeValue.replace(/,/,''));
		IKCRC_REPORT.loot.resource[type] = amount;
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
		$("div#ikcrcPlayPen textarea").empty();

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

		/* Fill Textarea */
		$("div#ikcrcPlayPen textarea").append(formatter.ReplaceColors(report));
	}
}

function BuildStandardReport(formatter)
{
	if (formatter == null) return "NullReferenceException: formatter";

	/* Add Place & Time of Attack */
	report = formatter.AddColor(IKCRC_REPORT.info.place + '\n' + IKCRC_REPORT.info.time + '\n', 'HEADER');

	/* Add Attackers + Defenders Involved */
	report += '\n';
	report += formatter.AddColor(IKCRC_REPORT.info.attackers, 'ATTACKING') + '\n';
	report += 'vs' + '\n';
	report += formatter.AddColor(IKCRC_REPORT.info.defenders, 'DEFENDING') + '\n';

	/* Add Attacking / Defending Unit(s) */
	report += '\n';
	report += '---------------------------------------------------------------\n';
	var allUnitCosts = IKCRC_REPORT.info.type == "army"
			? [ 20, 60, 70, 55,  200, 125, 310, 290, 220, 560, 1550, 500, 200, 30, 0]
			: [ 270, 340, 310, 320, 1800, 1120, 910 ];
	var allUnits = IKCRC_REPORT.info.type == "army"
			? ["slinger", "swordsman", "phalanx", "archer", "marksman", "gyrocopter", "steam giant", "bombardier", "ram", 
			   "catapult", "mortar", "doctor", "cook", "spearmen", "barbarian"]
			: ["ram", "ballista", "flame", "catapult", "paddle", "mortar", "diving"];
	var UNIT = IKCRC_REPORT.info.type == "army" ? L_UNITS : L_SHIPS;
	var attackersLosses = 0, defendersLosses = 0; 
	for (var unit = 0; unit < allUnits.length; unit++) {
		var unitName = UNIT[allUnits[unit]]; 
		if (unitName != null) {
			var attacker = IKCRC_REPORT.battle.attackers[GAME_VERSION == "v.0.3.1" ? unitName : allUnits[unit]]; 
			var defender = IKCRC_REPORT.battle.defenders[GAME_VERSION == "v.0.3.1" ? unitName : allUnits[unit]];
			if (attacker != null || defender != null) {
				if (attacker != null) {
					report += formatter.PadString('right', unitName, 17, '.', 'ATTACKING');
					report += formatter.PadString('left',  attacker.left, 5, '.', 'UNITLEFT');
					report += formatter.PadString('right', '(-' + formatter.AddColor(attacker.lost, 'UNITLOST') + ')', 8, '.', '') + ' - ';
					attackersLosses += attacker.lost * allUnitCosts[unit];
				}
				else {	report += formatter.PadString('right', '', 30, '.', '') + ' - '; }
				if (defender != null) {
					report += formatter.PadString('right', unitName, 17, '.', 'DEFENDING');
					report += formatter.PadString('left',  defender.left, 5, '.', 'UNITLEFT');
					report += formatter.PadString('right', '(-' + formatter.AddColor(defender.lost, 'UNITLOST') + ')', 8, '.', '');
					defendersLosses += defender.lost * allUnitCosts[unit];
				}
				else {	report += formatter.PadString('right', '', 30, '.'); }
				report += '\n';
			}
		}
	}

	/* Add Table to display Net Losses/Gains + Loot */
	var results = '---------------------------------------------------------------\n';
	var metricTranslations = [L_HIGHSCORE.army_score_main, L_REPORT.damage];
	//var metricAttackers = [addCommas(parseInt(attackersLosses*-1*.02)), addCommas(attackersLosses)];
	var metricAttackers = [addCommas(parseInt(attackersLosses*-1*.02)), addCommas(2*attackersLosses)];
	//var metricDefenders = [addCommas(parseInt(defendersLosses*-1*.02)), addCommas(defendersLosses+IKCRC_REPORT.loot.total)];
	var metricDefenders = [addCommas(parseInt(defendersLosses*-1*.02)), addCommas(2*defendersLosses)];
	for (var m = 0; m < metricTranslations.length; m++) {
		results += ' ' + formatter.PadString('right', metricTranslations[m], 20, '.', 'ATTACKING');
		results += formatter.PadString('left', metricAttackers[m]+'', 10, '.', 'ATTACKING') + ' - ';
		results += formatter.PadString('right', metricTranslations[m], 20, '.', 'DEFENDING'); 
		results += formatter.PadString('left', metricDefenders[m]+'', 10, '.', 'DEFENDING') + '\n';
	}
	results += '---------------------------------------------------------------\n';
	report += results;

	/* Add Loot */
	if (IKCRC_REPORT.loot.total > 0) {
		results = '\n';
		results += L_REPORT.loot + ': ';
		var lootTotals = [IKCRC_REPORT.loot.resource["wood"], IKCRC_REPORT.loot.resource["wine"], IKCRC_REPORT.loot.resource["marble"], IKCRC_REPORT.loot.resource["glass"], IKCRC_REPORT.loot.resource["sulfur"]];
		var lootString = [L_RESOURCES.wood, L_RESOURCES.wine, L_RESOURCES.marble, L_RESOURCES.glass, L_RESOURCES.sulfur];
		for (var r = 0; r < lootTotals.length; r++) {
			if (lootTotals[r] > 0 ) {
				var imageString = formatter.AddImage(I_RESOURCES[r]);
				if (imageString == '') imageString = '\n' + lootString[r];
				results += imageString + " " + addCommas(lootTotals[r]) + ' ';
			}
		}
		report += results + '\n';
	}

	/* Add Victor(s) */
	report += '\n' + formatter.AddColor(IKCRC_REPORT.battle.victors, 'VICTOR') + '\n';

	/* Add Homepage Link */
//lien modifié vers la page du forum français
	report += "\nEdit&eacute; avec le " + 
		formatter.AddLink("Convertisseur de RC GTA", "http://userscripts.org/scripts/show/60341") + ' \nCr&eacute;&eacute; par ' +
		formatter.AddLink("DLR","http://betawarriors.com/forum/") + ', modifi&eacute; par ' +
		formatter.AddLink("IshW","http://godteamalliance.forumdeouf.com/forum.htm");

	/* Add Size, Font, Bold-Styling and Alignment */
	report = formatter.AddSize(report, 85);
	report = formatter.AddFont(report, 'Courier New');
	report = formatter.AddBold(report);
	report = formatter.AddAlignment(report, 'center');

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
	if (details.indexOf("(") != -1) {
		if (list[unit] == null || list[unit] == undefined) { list[unit] = { left: 0, lost: 0 } }
		list[unit].left += parseInt(details.substr(0, details.indexOf('(')).replace(/\s+/, ''));
		list[unit].lost += parseInt(details.substr(details.indexOf('-') + 1).replace(/\s+/, '').replace(/\)/, ''));
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
			report = report.replace(/UNITLOST/g, 'FF0000');
			report = report.replace(/ATTACKING/g, '08a664');
			report = report.replace(/DEFENDING/g, '6408a6');
			report = report.replace(/HEADER|VICTOR/g, '3F3CD9');
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