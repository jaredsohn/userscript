// JavaScript Document
// ==UserScript==
// @name           Ikariam CR Converter
// @autor          holyschmidt (http://userscripts.org/users/?????)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/49151
// @description    Easily Convert Combat Reports for forum viewing.
// @include        http://s*.ikariam.*/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_CombatReport.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_Ships.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_Units.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Resources.js
// @version        1.7.0
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

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
 

const cache_key		= getServerDomain() + '.' + getServerWorld();
const cache_variables = {
	FORMAT:		'ikcrc.format',
	LAST_REPORT:	'ikcrc.lastReport' + cache_key
};

var IKCRC_REPORT = {
	info:   { type:null, place:null, time:null, attackers:null, defenders:null, wall:null },
	battle: { attacking_totals: [0, 0, 0], defending_totals: [0, 0, 0], wall: '', walltext: '', attackers: [], defenders: [], victors:null },
	loot:   { total: 0, resource: [] }
};

var IK_CRC_FORMAT = 
	GM_getValue(cache_variables.FORMAT, false) != '' ? GM_getValue(cache_variables.FORMAT, false) : 'ikariam';

const VERSION = "1.7.0";

const PAGE_ID = {
	diplomacyAdvisor:		"inbox",
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

/* Check for a later version of the script */
new IkariamUserScriptUpdater( 50784, "Ikariam CR Converter" );

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
		if (PAGE_TYPE == 'overview') {
			/* Build PlayPen */
			BuildPlayPen();

			/* Parse the Report */
			ParseReport();	

			/* Build the Report */
			BuildReport();
		}
		else
		if (PAGE_TYPE == 'detailed')
		{
			/* Parse the Loot */
			ParseLoot();

			/* Build Jump Link Back to Overview */
			BuildJumpBack();
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
		"#ikcrcPlayPen textarea { font-family: courier; }" +
		"#ikcrcPlayPen h3 { font: bold 14px arial; }" +
		"#ikcrcPlayPen h4 { font: bold 12px arial; }"
	);

	$("#battleReportDetail").append(
		'<div id="ikcrcPlayPen">' +
		 '<h3>Ikariam Combat Report Converter (Version ' + VERSION + ')</h3>' +
		 '<input type="radio" name="ikcrcFormat" value="ajaxchat">&nbsp;ajaxchat&nbsp;' +
		 '<input type="radio" name="ikcrcFormat" value="html">&nbsp;html/circulars&nbsp;' +
		 '<input type="radio" name="ikcrcFormat" value="ikariam">&nbsp;ikariam&nbsp;' +
		 '<input type="radio" name="ikcrcFormat" value="phpbb">&nbsp;phpbb&nbsp;' +
		 '<input type="radio" name="ikcrcFormat" value="plaintext">&nbsp;plaintext&nbsp;<br>' +
		 '<textarea rows="10" cols="75" readonly></textarea>' +
		 '<h4>Source created and maintained by <a href="http://dlralliance.com/forum/">DLR</a></h4>' +
		'</div>');

	$("div#ikcrcPlayPen").find("input").each(function() {
		if( this.value == IK_CRC_FORMAT ) 
			this.checked = "checked";
		$(this).click(function() {
			GM_setValue(cache_variables.FORMAT, this.value); IK_CRC_FORMAT = this.value;
			BuildReport();
		});
	});
}

function ParseReport() { 
	/* Battle Type / Place / Time */
	IKCRC_REPORT.info.type  = $("td.battle")[0].childNodes[2].nodeValue.replace(/^\s*/, '').replace(/\s*$/, '');
	IKCRC_REPORT.info.place = $("td.battle")[0].childNodes[3].lastChild.nodeValue.replace(/^\s*/, '').replace(/\s*$/, '');
	IKCRC_REPORT.info.time  = $("td.battle")[0].childNodes[4].nodeValue.replace(/^\s*/, '').replace(/\s*$/, '').replace(/\(/,'').replace(/\)/, '');
	
	/* Attackers / Defenders */
	$("td[colspan*=3]").each(function() {
		if ($(this).html() != '') {
			if (IKCRC_REPORT.info.attackers == null) 
				IKCRC_REPORT.info.attackers = $(this).html().replace(/^\s+/,'').replace(/\s+$/,'').replace(/<br>/g, ', ').replace(/,\s$/, '');
			else 
				IKCRC_REPORT.info.defenders = $(this).html().replace(/^\s+/,'').replace(/\s+$/,'').replace(/<br>/g, ', ').replace(/,\s$/, '');
		}
	});

	/* Remaining Totals / Units */
	var total = 0;
	$("tr.rep").each(function() {
		if( $(this).find("td.sum")[0] != null && $(this).find("td.own")[0] != null ) {
			IKCRC_REPORT.battle.attacking_totals[total] = $(this).find("td.own").next().html();
			IKCRC_REPORT.battle.defending_totals[total] = $(this).find("td.own:last").next().html();
			total++;
		} 
		else
		if( $(this).find("td.units")[0] != null ) {
			if( $(this).find("td[colspan*=3]")[0] != null ) {
				AddUnit(IKCRC_REPORT.battle.defenders, $(this).find("td.units").html(), $(this).find("td.own").next());
			} 
			else
			if( $(this).find("td[colspan*=4]")[0] != null ) {
				AddUnit(IKCRC_REPORT.battle.attackers, $(this).find("td.units").html(), $(this).find("td.own").next());
			} 
			else {
				AddUnit(IKCRC_REPORT.battle.attackers, $(this).find("td.units").html(), $(this).find("td.own").next());
				AddUnit(IKCRC_REPORT.battle.defenders, $(this).find("td.units:last").html(), $(this).find("td.own:last").next());
			}
		}
		else
		if( $(this).find("td.sum")[0] != null && $(this).find("td.sum").html() == '-')
		{
			IKCRC_REPORT.battle.wall = $(this).find("td:last").html();
			IKCRC_REPORT.battle.walltext = $(this).find("td.sum:last").contents()[1].nodeValue.substr(1);
		}
	});

	/* Victors */
	$("td[colspan*=15]").each(function() {
		IKCRC_REPORT.battle.victors = $(this).html();
	});

	/* Loot, If Available */
	var battleId = document.location.href.substr(document.location.href.indexOf('combatId=') + 9);
	if (battleId.indexOf('&') != -1) {
		battleId = battleId.substr(0, battleId.indexOf('&'));
	}
	if (battleId == GM_getValue(cache_variables.LAST_REPORT, false)) {
		IKCRC_REPORT.loot.resource["wood"]   = GM_getValue(cache_variables.LAST_REPORT + '.wood', false);
		IKCRC_REPORT.loot.resource["wine"]   = GM_getValue(cache_variables.LAST_REPORT + '.wine', false);
		IKCRC_REPORT.loot.resource["marble"] = GM_getValue(cache_variables.LAST_REPORT + '.marble', false);
		IKCRC_REPORT.loot.resource["glass"]  = GM_getValue(cache_variables.LAST_REPORT + '.glass', false);
		IKCRC_REPORT.loot.resource["sulfur"] = GM_getValue(cache_variables.LAST_REPORT + '.sulfur', false);
		IKCRC_REPORT.loot.total = parseInt(IKCRC_REPORT.loot.resource["wood"] + IKCRC_REPORT.loot.resource["wine"] + IKCRC_REPORT.loot.resource["marble"] + IKCRC_REPORT.loot.resource["glass"] + IKCRC_REPORT.loot.resource["sulfur"]);
	}
	else {
		$("td.winner ul.resources li").each(function() {
			var type = $(this)[0].className;
			var amount = parseInt($(this).contents()[1].nodeValue.replace(/,/,''));
			IKCRC_REPORT.loot.resource[type] = amount;
			IKCRC_REPORT.loot.total += amount;
		});
	}
}

function BuildReport() {
	var report = '', formatter = GetFormatter(IK_CRC_FORMAT);
	if (formatter != null) 
	{
		/* Empty Textarea */
		$("div#ikcrcPlayPen textarea").empty();

		/* Add Place & Time of Attack */
		report += formatter.AddColor(IKCRC_REPORT.info.type + ' ' + IKCRC_REPORT.info.place + '\n' + '( ' + IKCRC_REPORT.info.time + ' )' + '\n\n', 'HEADER');

		/* Add Attackers + Defenders Involved */
		report += formatter.AddColor(IKCRC_REPORT.info.attackers, 'ATTACKING') + '\n';
		report += 'vs' + '\n';
		report += formatter.AddColor(IKCRC_REPORT.info.defenders, 'DEFENDING') + '\n';

		/* Add Offensive / Defensive Totals */
		report += '\n';
		var totalsTranslations = [L_REPORT.offense, L_REPORT.defense, L_REPORT.stamina];
		for (var total = 0; total < totalsTranslations.length; total++) {
			report += formatter.PadString('right', totalsTranslations[total], 25, '.', 'ATTACKING'); 
			report += formatter.PadString('left', IKCRC_REPORT.battle.attacking_totals[total], 12, '.', 'ATTACKING') + ' - ';
			report += formatter.PadString('right', totalsTranslations[total], 25, '.', 'DEFENDING'); 
			report += formatter.PadString('left', IKCRC_REPORT.battle.defending_totals[total], 12, '.', 'DEFENDING') + '\n';
		}

		/* Add wall, if applicable */
		if (IKCRC_REPORT.battle.wall != '' && IKCRC_REPORT.battle.walltext != '') {
			report += formatter.PadString('right', '', 37, '.', '') + ' - ';
			report += formatter.PadString('right', IKCRC_REPORT.battle.walltext, 25, '.', 'DEFENDING'); 
			report += formatter.PadString('left', IKCRC_REPORT.battle.wall, 12, '.', 'DEFENDING') + '\n';
		}

		/* Add Attacking / Defending Unit(s) */
		report += '\n';
		var allUnitCosts = [ 40, 64, 98, 131, 196, 256, 289, 960, 210, 456, 1053, 706, 453, 144, 153, 190, 257, 346, 532, 712 ];
		var allUnits = ["slinger", "swordsman", "phalanx", "archer", "marksman", "gyrocopter", "steam giant", "bombardier", "ram", "catapult", "mortar", "doctor", "cook", "ram", "ballista", "flame", "catapult", "paddle", "mortar", "diving"];
		var UNIT = L_UNITS;
		var attackersLosses = 0, defendersLosses = 0;
		for (var unit = 0; unit < allUnits.length; unit++) {
			var unitName = UNIT[allUnits[unit]]; 
			if (unitName != null) {
				var attacker = IKCRC_REPORT.battle.attackers[unitName];
				var defender = IKCRC_REPORT.battle.defenders[unitName];
				if (attacker != null || defender != null) {
					if (attacker != null) {
						report += formatter.PadString('right', unitName, 24, '.', 'ATTACKING');
						report += formatter.PadString('left',  attacker.left, 5, '.', 'UNITLEFT');
						report += formatter.PadString('right', '(-' + formatter.AddColor(attacker.lost, 'UNITLOST') + ')', 8, '.', '') + ' - ';
						attackersLosses += attacker.lost * allUnitCosts[unit];
					}
					else {	report += formatter.PadString('right', '', 37, '.', '') + ' - '; }
					if (defender != null) {
						report += formatter.PadString('right', unitName, 24, '.', 'DEFENDING');
						report += formatter.PadString('left',  defender.left, 5, '.', 'UNITLEFT');
						report += formatter.PadString('right', '(-' + formatter.AddColor(defender.lost, 'UNITLOST') + ')', 8, '.', '');
						defendersLosses += defender.lost * allUnitCosts[unit];
					}
					else {	report += formatter.PadString('right', '', 37, '.'); }
					report += '\n';
				}
			}
			if (allUnits[unit] == "cook") UNIT = L_SHIPS;
		}

		/* Add Table to display Net Losses/Gains + Loot */
		var results = '\n──────────────────────────────────────────────────────────────────────────────\n';
		var metricTranslations = [L_HIGHSCORE.army_score_main, L_REPORT.damage];
		var metricAttackers = [addCommas(parseInt(attackersLosses*-1*.02)), addCommas(attackersLosses)];
		var metricDefenders = [addCommas(parseInt(defendersLosses*-1*.02)), addCommas(defendersLosses+IKCRC_REPORT.loot.total)];
		for (var m = 0; m < metricTranslations.length; m++) {
			results += ' ' + formatter.PadString('right', metricTranslations[m], 25, '.', 'ATTACKING');
			results += formatter.PadString('left', metricAttackers[m]+'', 12, '.', 'ATTACKING') + ' - ';
			results += formatter.PadString('right', metricTranslations[m], 25, '.', 'DEFENDING'); 
			results += formatter.PadString('left', metricDefenders[m]+'', 12, '.', 'DEFENDING') + '\n';
		}
		results += '──────────────────────────────────────────────────────────────────────────────\n';
		if (IKCRC_REPORT.loot.total > 0) {
			results += ' ' + L_REPORT.loot + ': ';
			var lootTotals = [IKCRC_REPORT.loot.resource["wood"], IKCRC_REPORT.loot.resource["wine"], IKCRC_REPORT.loot.resource["marble"], IKCRC_REPORT.loot.resource["glass"], IKCRC_REPORT.loot.resource["sulfur"]];
			var lootString = [L_RESOURCES.wood, L_RESOURCES.wine, L_RESOURCES.marble, L_RESOURCES.glass, L_RESOURCES.sulfur];
			for (var r = 0; r < lootTotals.length; r++) {
				if (lootTotals[r] > 0 ) {
					var imageString = formatter.AddImage(I_RESOURCES[r]);
					if (imageString == '') imageString = '\n' + lootString[r];
					results += imageString + " " + addCommas(lootTotals[r]) + ' ';
				}
			}
		}
		report += results;

		/* Add Victor(s) */
		report += '\n\n' + formatter.AddColor(IKCRC_REPORT.battle.victors, 'VICTOR');

		/* Add Homepage Link 
		report += "\n\nCreated using DLR's " + 
			formatter.AddLink("http://dlralliance.com/forum/viewtopic.php?f=73&t=349", "Ikariam CR Converter") + ' (' +
			formatter.AddLink("http://userscripts.org/scripts/show/50784", 'Version ' + VERSION) + ')';  */

		/* Add Size, Font, Bold-Styling and Alignment */
		report = formatter.AddSize(report, 85);
		report = formatter.AddFont(report, 'Courier New');
		report = formatter.AddBold(report);
		report = formatter.AddAlignment(report, 'center');

		/* Fill Textarea */
		$("div#ikcrcPlayPen textarea").append(formatter.ReplaceColors(report));
	}
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
	list[unit] = { 
		left: $(details).contents()[0].nodeValue.replace(/\s+\(/, ''), 
		lost: $(details).find("span.loss").html().replace(/-/, '')
	};
}

function GetFormatter(type) {
	if (type == 'ajaxchat') {
		return new FormatterAJAX();
	}
	else 
	if (type == 'html') { 
		return new FormatterHTML();
	} 
	else 
	if (type == 'ikariam') { 
		return new FormatterDefault();
	} 
	else
	if (type == 'phpbb') {
		return new FormatterPHPBB();
	}
	else
	if (type == 'plaintext') {
		return new FormatterPlainText();
	}
	return null;
}

/* AJAX Chat Printing Formatter (ajaxchat) */
function FormatterAJAX() { 
	this.AddAlignment = function(str, align) { return str; }
	this.AddColor     = function(str, color) { if (color != '') return '[color='+color+']'+str+'[/color]'; return str; }
	this.AddBold      = function(str)        { return str; }
	this.AddFont      = function(str, font)  { return '[code]' + str + '[/code]'; }
	this.AddLink      = function(url,txt)    { return "[url="+url+"]"+txt+"[/url]"; }
	this.AddImage     = function(img)        { return '[img]' + img + '[/img]'; }
	this.AddSize      = function(str, size)  { return str; }
	this.PadString    = function(dir, str, len, c, color) {
		var pad = '';
		var numChars = 0;
		var count = true;
		for(i = 0; i < str.length; i++) {
			if (str[i] == '[') count = false; 
			if (count == true) numChars++;	
			if (str[i] == ']') count = true;
		}
		for(i = 0; i < len - numChars; i++) { pad += c; }
		if (str != '')
			str = this.AddColor(str, color);
		return (dir == "left") ? pad + str : str + pad;
	}
	this.ReplaceColors = function(report) { 
		report = report.replace(/UNITLOST/g, 'red');
		report = report.replace(/ATTACKING/g, 'red');
		report = report.replace(/DEFENDING/g, 'green');
		return '.\n' + report;
	}
}


/* HTML/Circular Printing Formatter (html/circular) */
function FormatterHTML() {
	this.AddAlignment = function(str, align) { return '&lt;div style="text-align: ' + align + '"&gt;' + str + '&lt;/div&gt;'; }
	this.AddColor     = function(str, color) { if (color != '') return '&lt;span style="color: #' + color + '"&gt;' + str + '&lt;/span&gt;'; return str; }
	this.AddBold      = function(str)        { return '&lt;b&gt;' + str + '&lt;/b&gt;'; }
	this.AddImage     = function(img)        { return '&lt;img src="' + img + '" /&gt;'; }
	this.AddLink      = function(url,txt)    { return '&lt;a href="' + url + '"&gt;' + txt + '&lt;/a&gt;'; }
	this.AddFont      = function(str, font)  { return '&lt;span style="font-family: ' + font + '"&gt;' + str + '&lt;/span&gt;'; }
	this.AddSize      = function(str, size)  { return str; }
	this.PadString    = function(dir, str, len, c, color) {
		var pad = '';
		var numChars = 0;
		var count = true;
		for(i = 0; i < str.length; i++) {
			if (str.substr(i,4) == "&lt;") { count = false; i+=3; }
			if (count == true) numChars++;	
			if (str.substr(i,4) == "&gt;") { count = true; i+=3; }
		}
		for(i = 0; i < len - numChars; i++) { pad += c; }
		if (str != '')
			str = this.AddColor(str, color);
		return (dir == "left") ? pad + str : str + pad;
	}
	this.ReplaceColors = function(report) { 
		report = report.replace(/UNITLEFT/g, '000000');
		report = report.replace(/UNITLOST/g, 'C00000');
		report = report.replace(/ATTACKING/g, 'C00000');
		report = report.replace(/DEFENDING/g, '008000');
		report = report.replace(/HEADER|VICTOR/g, '0000C0');
		return report;
	}
}

/* Default Printing Formatter (ikariam) */
function FormatterDefault() { 
	this.AddAlignment = function(str, align) { return '[align='+align+']'+str+'[/align]'; }
	this.AddColor     = function(str, color) { if (color != '') return '[color=#'+color+']'+str+'[/color]'; return str; }
	this.AddBold      = function(str)        { return '[b]'+str+'[/b]'; }
	this.AddFont      = function(str, font)  { return '[font='+font+']'+str+'[/font]'; }
	this.AddLink      = function(url,txt)    { return "[url='"+url+"']"+txt+"[/url]"; }
	this.AddImage     = function(img)        { return '[img]' + img + '[/img]'; }
	this.AddSize      = function(str, size)  { return str; }
	this.PadString    = function(dir, str, len, c, color) {
		var pad = '';
		var numChars = 0;
		var count = true;
		for(i = 0; i < str.length; i++) {
			if (str[i] == '[') count = false; 
			if (count == true) numChars++;	
			if (str[i] == ']') count = true;
		}
		for(i = 0; i < len - numChars; i++) { pad += c; }
		if (str != '')
			str = this.AddColor(str, color);
		return (dir == "left") ? pad + str : str + pad;
	}
	this.ReplaceColors = function(report) { 
		report = report.replace(/UNITLEFT/g, '000000');
		report = report.replace(/UNITLOST/g, 'C00000');
		report = report.replace(/ATTACKING/g, 'C00000');
		report = report.replace(/DEFENDING/g, '008000');
		report = report.replace(/HEADER|VICTOR/g, '0000C0');
		return report;
	}
}

/* Default Printing Formatter (phpbb) */
function FormatterPHPBB() { 
	this.AddAlignment = function(str, align) { return '[align=' + align + ']' + str + '[/align]'; }
	this.AddColor     = function(str, color) { if (color != '') return '[color=#'+color+']'+str+'[/color]'; return str; }
	this.AddBold      = function(str)        { return '[b]' + str + '[/b]'; }
	this.AddImage     = function(img)        { return '[img]' + img + '[/img]'; }
	this.AddLink      = function(url,txt)    { return "[url="+url+"]"+txt+"[/url]"; }
	this.AddFont      = function(str, font)  { return '[font=' + font + ']' + str + '[/font]'; }
	this.AddSize      = function(str, size)  { return '[size=' + size + ']' + str + '[/size]'; }
	this.PadString    = function(dir, str, len, c, color) {
		var pad = '';
		var numChars = 0;
		var count = true;
		for(i = 0; i < str.length; i++) {
			if (str[i] == '[') count = false; 
			if (count == true) numChars++;	
			if (str[i] == ']') count = true;
		}
		for(i = 0; i < len - numChars; i++) { pad += c; }
		if (str != '')
			str = this.AddColor(str, color);
		return (dir == "left") ? pad + str : str + pad;
	}
	this.ReplaceColors = function(report) { 
		report = report.replace(/UNITLEFT/g, '000000');
		report = report.replace(/UNITLOST/g, 'C00000');
		report = report.replace(/ATTACKING/g, 'C00000');
		report = report.replace(/DEFENDING/g, '008000');
		report = report.replace(/HEADER|VICTOR/g, '0000C0');
		return report;
	}
}

/* Plain Text Formatter (plaintext) */
function FormatterPlainText() { 
	this.AddAlignment = function(str, align) { return str; }
	this.AddColor     = function(str, color) { return str; }
	this.AddBold      = function(str)        { return str; }
	this.AddFont      = function(str, font)  { return str; }
	this.AddLink      = function(url,txt)    { return txt + ":\n" + url; }
	this.AddImage     = function(img)        { return ''; }
	this.AddSize      = function(str, size)  { return str; }
	this.PadString    = function(dir, str, len, c, color) {
		var pad = '';
		var numChars = 0;
		var count = true;
		for(i = 0; i < str.length; i++) {
			if (str[i] == '[') count = false; 
			if (count == true) numChars++;	
			if (str[i] == ']') count = true;
		}
		for(i = 0; i < len - numChars; i++) { pad += c; }
		if (str != '')
			str = this.AddColor(str, color);
		return (dir == "left") ? pad + str : str + pad;
	}
	this.ReplaceColors = function(report) { return report; }
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
