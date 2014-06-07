// JavaScript Document
// ==UserScript==
// @name           Ikariam CR Converter + excel line format
// @autor          holyschmidt (http://userscripts.org/users/50784), modification by Zdenek Smetana
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/50784
// @description    Easily Convert Combat Reports for forum viewing. Added excel line format with tabs to easily paste into excel table with pillaging statistics, currently only for PL language.
// @include        http://s*.ikariam.*/index.php?view=militaryAdvisorReportView&combatId=*
// @include        http://s*.ikariam.*/index.php*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://tools.betawarriors.com/include/uicore.js
// @require        http://tools.betawarriors.com/include/uidraggable.js
// @require        http://tools.betawarriors.com/include/uitabs.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/62003.user.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_CombatReport.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_Ships.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_Units.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Resources.js
// @require        http://tools.betawarriors.com/common/FloatingWindowWithTabs.js
// @require        http://tools.betawarriors.com/ikcrc/ikcrc_formatter.js
// @require        http://tools.betawarriors.com/ikcrc/ikcrc_engines.js
// @version        2.7.2.1
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
//
// @history        2.7.2 Bugfix: jQuery UI files moved.  Archived and moved location temporarily.
// @history        2.7.1 Bugfix: Error found in loot totals during force-edit.
// @history        2.7.0 Feature: Enable(s) now added for turning on/off color and report events.
// @history        2.6.0 Feature: Script now has external message formatter for displaying html in in-game messages.
// @history        2.5.6 Feature: Force-edit of combat report to help account for game defects.
// @history        2.5.5 ForceUpdate: To fix language issues.
// @history        2.5.4 Bugfix: Encoding Issue.
// @history        2.5.3 Bugfix: Fixed in-line errors (not sure how these got in there).
// @history        2.5.2 Bugfix: Problem when format no longer valid.
// @history        2.5.1 Bugfix: Found problem in v.0.3.1 engine.
// @history        2.5.0 Feature: Changed Updater script.
// @history        2.4.1 Bugfix: Situations where "separator" was null.
// @history        2.4.0 Feature: Option to modify "seperator" in combat report.
// @history        2.4.0 Feature: Re-worked report "engines" idea.
// @history        2.4.0 Bugfix: Several fixes related to v.0.3.1.
// @history        2.3.8 Bugfix: Attempt #2 to fix tag update problem.
// @history        2.3.7 Bugfix: Tag settings not updated correctly when opening settings window.
// @history        2.3.6 Bugfix: Added back in support for v.0.3.1.
// @history        2.3.5 Bugfix: Sometimes the value of units lost is parsed incorrect due to an in-game defect.
// @history        2.3.4 Bugfix: Moved I_RESOURCES into parser/formatter file.
// @history        2.3.3 Bugfix: Type found when defining language structure for resources.
// @history        2.3.2 Bugfix: Script version not being displayed correctly.
// @history        2.3.1 Deprecated: Removed v.0.3.1 support.
// @history        2.3.1 Bugfix: Settings window did not "default" properly in some cases.
// @history        2.3.1 Bugfix: "Instant" battles (those resulting in "missing" troops) excluded from conversion.
// @history        2.3.0 Feature: Added ability to modify report "tags" to enter into various formats.
// @history        2.3.0 Feature: Added "remote" feature, to offload combat reports (not currently enabled).
// @history        2.2.1 Tempfix: Removed (confusing) "standard" radio button from converter
// @history        2.2.0 Feature: Battle "results" text (PlayerX's army has fled because...) added to report.
// @history        2.1.3 Bugfix: Settings link did not work properly in FireFox 3.0 (different CSS rules?).
// @history        2.1.2 Bugfix: Report not re-parsed right after changing color settings.
// @history        2.1.1 Bugfix: Broke circular option in last update (thanks Griffin).
// @history        2.1.0 Implementation: New "settings" window added.
// @history        2.1.0 Implementation: Color "tab" constructed and hooked up for use.
// @history        2.1.0 Bugfix: Problem parsing loot for multiple attackers.
// @history        2.0.0 Improvement: Version "engines" are now used to parse and build up reports.
//
// ==/UserScript==

ScriptUpdater.check(50784, "2.7.2");
 
const CACHE_KEY		  = getServerDomain() + '.' + getServerWorld();
const cache_variables = {
	PRNTMODE:    'ikcrc.prntmode',
	LAST_REPORT: 'ikcrc.lastReport' + CACHE_KEY,
	COLORS:      'ikcrc.colors',
	FORMAT:      'ikcrc.format',
	FORMATTERS:  'ikcrc.formatters',
	ENAB_COLOR:  'ikcrc.ena_color',
	ENAB_EVENTS: 'ikcrc.ena_events',
	REMOTE:      'ikcrc.remote',
	LAST_REPORT: 'ikcrc.lastReport' + CACHE_KEY
};
const GAME_VERSION = $("li.version span").text().substr(0, 7);

const DEFAULT_IKCRC_COLORS = { 
	"scene":'0000CC',"attacking":'C00000',"defending":'00CC00',"left":'000000',"lost":'FF0000',"victor":'0000CC',"results":'444444'};
const DEFAULT_IKCRC_COLOR_LANG = {
	"scene":'Scene',"attacking":'Attackers',"defending":'Defenders',"left":'Units Left',"lost":'Units Lost',"victor":'Victor',"results":'Results'};
const DEFAULT_IKCRC_FORMATTERS = {
	"ajaxchat" : { open: '[', close: ']', separator: '─', center: '{TEXT}', color: '[color={COLOR}]{TEXT}[/color]', bold: '{TEXT}', font: '[code]{TEXT}[/code]', link: '[url={LINK}]{TEXT}[/url]', image: '[img]{IMAGE}[/img]', size : '{TEXT}' },
	"bbcode"  : {  open: '[', close: ']', separator: '─', center: '[align=center]{TEXT}[/align]', color: '[color=#{COLOR}]{TEXT}[/color]', bold: '[b]{TEXT}[/b]', font: '[font={FONT}]{TEXT}[/font]', link: '[url={LINK}]{TEXT}[/url]', image: '[img]{IMAGE}[/img]', size: '{TEXT}' },
	"circular" : { open: '&lt;', close: '&gt;', separator: '─', center: '&lt;div style="text-align: center"&gt;{TEXT}&lt;/div&gt;', color: '&lt;span style="color: #{COLOR}"&gt;{TEXT}&lt;/span&gt;', bold: '&lt;b&gt;{TEXT}&lt;/b&gt;', font: '&lt;span style="font-family: {FONT}"&gt;{TEXT}&lt;/span&gt;', link: '&lt;a href="{LINK}"&gt;{TEXT}&lt;/a&gt;', image: '&lt;img src={IMAGE} /&gt;', size: '{TEXT}' },
	"plaintext"  : {  open: '[', close: ']', separator: '-', center: '{TEXT}', color: '{TEXT}', bold: '{TEXT}', font: '{TEXT}', link: '{TEXT}: {LINK} ', image: '', size: '{TEXT}' },
	"excel"  : {  open: '[', close: ']', separator: '-', center: '{TEXT}', color: '{TEXT}', bold: '{TEXT}', font: '{TEXT}', link: '{TEXT}: {LINK} ', image: '', size: '{TEXT}' },
};
const DEFAULT_IKCRC_REMOTE = {
	"autosend":false, "formatter":false, "offload-site":''
};

var IKCRC_REPORT = {
	info:   { id:null, type:null, place:null, time:null, attackers:null, defenders:null, wall:null },
	battle: { attackers:{}, defenders:{}, victors:null, results:null, attacking_totals:[0,0,0], defending_totals:[0,0,0], wall:'', walltext:'' },
	loot:   { total:0, resource:{} },
	getPostData: function() 
	{
		/* version & report info */ 
		postdata = 'gversion=' + GAME_VERSION + '&cversion=' + ScriptUpdater.scriptCurrentVersion + '&cformat=' + IKCRC_FORMAT + '&serverkey=' + CACHE_KEY;

		/* battle info  */ 
		this.info.time = this.info.time.replace(/:/g, ';');
		postdata += '&info=' + this.info.toSource(); 
		this.info.time = this.info.time.replace(/;/g, ':');
	
		/* battle data */
		postdata += '&battle=' + this.battle.toSource();

		/* battle loot */
		postdata += '&loot=' + this.loot.toSource();

		/* what do we have? */
		return postdata;
	}
};

var IKCRC_PRNTMODE = 
	GM_getValue(cache_variables.PRNTMODE, false) != '' ? GM_getValue(cache_variables.PRNTMODE, false) : 'deluxe';

var IKCRC_FORMAT = 
	GM_getValue(cache_variables.FORMAT, false) != '' ? GM_getValue(cache_variables.FORMAT, false) : 'bbcode';

var IKCRC_COLORS =
	GM_getValue(cache_variables.COLORS, false) 
	? eval(GM_getValue(cache_variables.COLORS, false)) || {} 
	: DEFAULT_IKCRC_COLORS;

var IKCRC_FORMATTERS =
	GM_getValue(cache_variables.FORMATTERS, false) 
	? eval(GM_getValue(cache_variables.FORMATTERS, false)) || {} 
	: DEFAULT_IKCRC_FORMATTERS;
if (IKCRC_FORMATTERS[IKCRC_FORMAT] == null) IKCRC_FORMAT = 'bbcode';
if (IKCRC_FORMATTERS[IKCRC_FORMAT].separator == null) IKCRC_FORMATTERS = DEFAULT_IKCRC_FORMATTERS;


var IKCRC_REMOTE =
	GM_getValue(cache_variables.REMOTE, false) 
	? eval(GM_getValue(cache_variables.REMOTE, false)) || {} 
	: DEFAULT_IKCRC_REMOTE;

var IKCRC_LOADED = false;

const PAGE_ID = {
	diplomacyAdvisor:					"inbox",
	diplomacyAdvisorOutBox:				"inbox",
	militaryAdvisorReportView:			"report",
	militaryAdvisorDetailedReportView:	"detailed"
}[ $("body").attr("id") ];

const PAGE_TYPE = document.location.href.indexOf("detailedCombatId") == -1 ? 'overview' : 'detailed';
const BATTLE_INSTANT = $('#troopsReport table.overview,#troopsReport table#ergebnis').size() == 0 ? true : false;

if (PAGE_ID == 'report') {
	/* Set the server language (IkariamLanguageDetection.js) */
	var LANG = getLang();
	var LANGUAGE = getLanguage();
	var TRANSLATIONS = {
		"highscore"		: language_highscore[LANGUAGE],
		"report"		: language_crconverter[LANG],
		"resources"		: language_resources[LANGUAGE],
		"ships"			: language_ships[LANG],
		"units"			: language_units[LANG]
	};

	/* Which page are we on? */
	if (PAGE_TYPE == 'overview' && !BATTLE_INSTANT) 
	{
		BuildPlayPen();						/* Build PlayPen */
		ParseReport();						/* Parse the Report */
		BuildReport();						/* Build the Report */
		IKCRC_LOADED = true;

		/* Allow for a little editting, in case the CR is bugged */
		$('td.numbers').bind("dblclick", function() 
		{
			var cell = this;
			var numbers = $(this).text().replace(/^\s+|\s+$/g,"");
			$(this).html('<input type="text" style="width:90%; font-size:0.9em; text-align:center;" value="' + numbers + '">');
			$('input', this)[0].focus();
			$('input', this).blur(function() {
				cell.innerHTML = this.value;

				ParseReport();				/* Parse the Report */
				BuildReport();				/* Build the Report */
			});			
		});
	}
	else
	if (PAGE_TYPE == 'detailed' && GAME_VERSION == "v.0.3.1")
	{
		V031_ParseDetailedLoot(); 			/* Parse the Loot */
		V031_BuildJumpBack(TRANSLATIONS);	/* Build Jump Link Back to Overview */
	}
}
else
if (PAGE_ID == 'detailed' && GAME_VERSION == "v.0.3.2")
{
	var ConverterEngine = IkariamCRCEngine.Engines[GAME_VERSION];
	if (ConverterEngine != null)
	{
		ConverterEngine.ReadDetailed();
	}
}

/* ################################################################# 
 *
 * Functions / "Classes"
 *
 * ################################################################# */


function BuildPlayPen() 
{
	/* Add required styles */
	GM_addStyle(
		"#ikcrcPlayPen textarea { font-family: courier; width:97%; }" +
		"#ikcrcPlayPen #ikcrcVersion, #ikcrcPlayPen #ikcrcSettings { margin:auto 5px; }" +
		"#ikcrcPlayPen textarea, #ikcrcPlayPen span.ikcrcFormats, #ikcrcUploadStatus { margin:5px; }" +
		"#ikcrcPlayPen span.ikcrcFormats, #ikcrcVersion { position:relative; float:left; }" +
		"#ikcrcPlayPen span.ikcrcEnables { position:relative; float:right; margin-top:6px; }" +
		"#ikcrcPlayPen span.ikcrcEnables input { margin-left:10px; }" +
		"#ikcrcSettings, #ikcrcUploadStatus { position:relative; float:right; }" +
		"#ikcrcSettings { color:#FF0000; }" +
		"#ikcrcSettings:hover, #ikcrcUploadStatus:hover { text-decoration:underline; cursor:pointer; }"
	);

	/* Build intial playpen */
	$("#troopsReport").append(	
		'<div id="ikcrcPlayPen" class="contentBox01h">' +
			'<h3 class="header">' +
				'<span id="ikcrcVersion"><a href="javascript:" id="ikcrcUpdater">v.' + ScriptUpdater.scriptCurrentVersion + '</a></span>' +
				'<span id="ikcrcSettings" title="Show/Hide Settings Window">Settings</span>' +
				'Ikariam Combat Report Converter' +
			'</h3>' + 
			'<div class="content">' +
				'<span id="ikcrcUploadStatus">' +
					'<img src="' + (IKCRC_REMOTE['offload-site'] != '' ? 'http://tools.betawarriors.com/ikcrc/ikcrc-upload.gif' : '') + 
						'" width="16" height="16" title="Offload Report" />' +
				'</span>' +
				'<span id="ikcrcOptions"></span>' +
				'<textarea rows="5" readonly></textarea>' +
				'<div class="footer"></div>' +
			'</div>' +
		'</div>');

	/* Look for force update */
	$('#ikcrcUpdater').click(function() {
		this.blur(); 
		ScriptUpdater.forceNotice(ScriptUpdater.scriptId, ScriptUpdater.scriptCurrentVersion); 
	});

	/* Add format options */
	for (var i in IKCRC_FORMATTERS) {
		$("#ikcrcOptions").append(
		 '<span class="ikcrcFormats"><input type="radio" name="ikcrcFormat" value="' + i + '">&nbsp;' + i + '&nbsp;</span>');
	}

	/* Add report enables */
	var ena_color = GM_getValue(cache_variables.ENAB_COLOR, true) ? 'checked="checked"' : '';
	var ena_events = GM_getValue(cache_variables.ENAB_EVENTS, false) ? 'checked="checked"' : '';
	$("#ikcrcOptions").append('<span class="ikcrcEnables">' +
			'<input id="ikcrcEnableColor" type="checkbox" ' + ena_color + '/>&nbsp;Color' +
			'<input id="ikcrcEnableEvents" type="checkbox" ' + ena_events +'/>&nbsp;Events' +
		'</span>');

	/* Create listeners for changing format / mode of converter */
	$("#ikcrcOptions").find("input").each(function() {
		if (this.name == "ikcrcFormat") 
		{
			if (this.value == IKCRC_FORMAT)
				this.checked = "checked";
			$(this).click(function() {
				GM_setValue(cache_variables.FORMAT, this.value); IKCRC_FORMAT = this.value;
				BuildTagSettings(IKCRC_FORMAT);
				BuildReport();
			});
		}
	});

	/* Create listeners for changing report enables */	
	$('#ikcrcEnableColor').click(function() { GM_setValue(cache_variables.ENAB_COLOR, this.checked); BuildReport(); });
	$('#ikcrcEnableEvents').click(function() { GM_setValue(cache_variables.ENAB_EVENTS, this.checked); BuildReport(); });

	var settingsWindow = null;
	$("#ikcrcSettings").click(function()  {		
		if (settingsWindow == null || document.getElementById(settingsWindow.id) == null)
		{
			var windowID = BuildSettingsWindow();
			settingsWindow = initFloatingWindowWithTabs(windowID,Array('Colors','Tags'/*,'Remote'*/),350,300,50,50,false,true,false,false,false,false); 
		}
		else if (document.getElementById(settingsWindow.id) != null)
		{
			$(settingsWindow).remove(); settingsWindow = null;
		}
	});

	/* Link to upload the report */
	$('#ikcrcUploadStatus img').live('click', function() { SendReport(); });
}

function BuildSettingsWindow()
{
	/* Add containers */
	$("body").append(
	'<div id="ikcrcSettingsWindow">' +
		'<div class="floatingWindowContent" id="ikcrcColorTab">' +
			'<table margin="10px" width="100%" height="90%">' +
				'<tr><td align="center">' +
					'<table border="0" height="100%">' +
						'<tr valign="top" height="50px">' +
							'<td colspan="4" align="center"><input type="button" class="button" id="ikcrcColorDefault" value="Restore Defaults"/></td>' +
						'</tr>' +
					'</table>' +
				'</td></tr>' +
			'</table>' +
		'</div>' +
		'<div class="floatingWindowContent" id="ikcrcTagsTab">' +
			'<table margin="10px" width="100%" height="90%">' +
				'<tr><td align="center">' +
					'<table border="0" height="100%">' +
						'<tr valign="top" height="50px">' +
							'<td colspan="4" align="center"><input type="button" class="button" id="ikcrcTagsDefault" value="Restore Defaults"/></td>' +
						'</tr>' +
					'</table>' +
				'</td></tr>' +
			'</table>' +
		'</div>' +
		'<div class="floatingWindowContent" id="ikcrcRemoteTab">' +
			'<table margin="10px" width="100%" height="90%">' +
				'<tr><td align="center">' +
					'<table border="0" height="100%">' +
						'<tr valign="top" height="50px">' +
							'<td colspan="2" align="center"><input type="button" class="button" id="ikcrcRemoteDefault" value="Restore Defaults"/></td>' +
						'</tr>' +
					'</table>' +
				'</td></tr>' +
			'</table>' +
		'</div>' +
	'</div>');

	/* Build Color Tab */
	for (var c in IKCRC_COLORS) $("#ikcrcColorTab table table").append(
	'<tr height="20px">' +
		'<td width="75px">' + DEFAULT_IKCRC_COLOR_LANG[c] + '</td>' +
		'<td width="50px" class="ikcrcColorExample" bgcolor="#' + IKCRC_COLORS[c] + '" padding="2px"></td>' +
		'<td width="10px">&nbsp;</td>' +
		'<td><input class="textfield" type="text" name="' + c + '" value="' + IKCRC_COLORS[c] + '" size="10"></td>' +
	'</tr>');
	$("#ikcrcColorTab table table").append(
	'<tr valign="bottom">' +
		'<td colspan="4"><p><b>Note:</b><br>Color settings DO NOT apply to the <br>ajaxchat output option.</p></td>' +
	'</tr>');

	/* Add Tags Tab */
	$("#ikcrcTagsTab table table").append(
	'<tr valign="center">' +
//		'<td align="left"><input type="button" class="button" value="Add" /></td>' +
		'<td align="right" colspan="2"><select id="ikcrcCurrentTag"></select></td>' +
	'</tr>');
	for (var f in IKCRC_FORMATTERS) $("#ikcrcTagsTab table table select").append(
		'<option value="' + f + '">' + f + '</option>'
	);
	$("#ikcrcCurrentTag option[value='" + IKCRC_FORMAT + "']").each(function() {
		BuildTagSettings(IKCRC_FORMAT); 
	});

	/* Add Remote Tab */
	$("#ikcrcRemoteTab table table").append(
	'<tr valign="top" height="25px">' +
		'<td>autosend</td>' +
		'<td><input type="checkbox" name="autosend" ' + 
			(IKCRC_REMOTE["formatter"] || IKCRC_REMOTE["autosend"] ? 'checked ' : ' ') + 
			(IKCRC_REMOTE["formatter"] ? 'disabled' : ' ' ) + '/></td>' +
	'</tr>' +
	'<tr valign="top" height="25px">' +
		'<td>formatter</td>' +
		'<td><input type="checkbox" name="formatter" ' + (IKCRC_REMOTE["formatter"] ? 'checked' : '') + '/></td>' +
	'</tr>' +
	'<tr valign="top" height="25px">' +
		'<td width="75px">offload-site</td>' +
		'<td><input class="textfield" type="text" name="offload-site" value="' + IKCRC_REMOTE["offload-site"] + '" size="18"></td>' +
	'</tr>' +
	'<tr valign="top"><td colspan="2"></td></tr>');

	/* Color listeners */
	$("#ikcrcColorTab input[type='text']").blur(function() {
		var color = $(this).attr('name');
		IKCRC_COLORS[color] = $(this).attr('value');
		GM_setValue(cache_variables.COLORS, IKCRC_COLORS.toSource());
		$(this).parent().siblings("td.ikcrcColorExample").attr('bgcolor', '#' + IKCRC_COLORS[color]); //alert(IKCRC_COLORS[color]);
		BuildReport();
	});
	$("#ikcrcColorDefault").click(function() { 
		for (var c in IKCRC_COLORS) IKCRC_COLORS[c] = DEFAULT_IKCRC_COLORS[c]; 
		GM_setValue(cache_variables.COLORS, IKCRC_COLORS.toSource());
		$("#ikcrcColorTab input[type='text']").each(function() {
			var colorkey = $(this).attr('name'); 
			$(this).attr('value', IKCRC_COLORS[colorkey]); 
			$(this).parent().siblings("td.ikcrcColorExample").attr('bgcolor', '#' + IKCRC_COLORS[colorkey]);
		});
		BuildReport();
	});

	/* Tag listeners */
	$('#ikcrcCurrentTag').change(function() {
		BuildTagSettings($(this).attr('value'));
	});
	$("#ikcrcTagsTab input[type='text']").blur(function() {
		var format = $('#ikcrcCurrentTag').attr('value');
		var tag = $(this).attr('name');
		IKCRC_FORMATTERS[format][tag] = $(this).attr('value');
		GM_setValue(cache_variables.FORMATTERS, IKCRC_FORMATTERS.toSource());
		if (IKCRC_FORMAT == format)
			BuildReport();
	});
	$("#ikcrcTagsDefault").click(function() { 
		var format = $('#ikcrcCurrentTag').attr('value');
		for (var t in IKCRC_FORMATTERS[format]) IKCRC_FORMATTERS[format][t] = DEFAULT_IKCRC_FORMATTERS[format][t]; 
		GM_setValue(cache_variables.FORMATTERS, IKCRC_FORMATTERS.toSource());
		BuildTagSettings(format);
		if (IKCRC_FORMAT == format)
			BuildReport();
	});

	/* Remote listeners */
	$('#ikcrcRemoteDefault').click(function() {
		IKCRC_LOADED = false;
		IKCRC_REMOTE = DEFAULT_IKCRC_REMOTE;
		GM_setValue(cache_variables.REMOTE, IKCRC_REMOTE.toSource());
		$("#ikcrcRemoteTab input[name='autosend']").each(function() { 
			if (IKCRC_REMOTE["autosend"]) $(this).attr('checked', 'checked'); else $(this).removeAttr('checked'); });
		$("#ikcrcRemoteTab input[name='formatter']").each(function() { 
			if (IKCRC_REMOTE["formatter"]) $(this).attr('checked', 'checked'); else $(this).removeAttr('checked'); });
		$("#ikcrcRemoteTab input[name='offload-site']").each(function() { $(this).attr('value', IKCRC_REMOTE["offload-site"]); });
		$("#ikcrcRemoteTab input[name='autosend']").removeAttr('disabled');
		BuildReport();
	});
	$("#ikcrcRemoteTab input[name='autosend']").click(function() { 
		IKCRC_REMOTE['autosend'] = $(this).attr('checked');
		GM_setValue(cache_variables.REMOTE, IKCRC_REMOTE.toSource());
		BuildReport();
	});
	$("#ikcrcRemoteTab input[name='formatter']").click(function() { 
		IKCRC_LOADED = false;
		IKCRC_REMOTE['formatter'] = $(this).attr('checked');
		if (IKCRC_REMOTE['formatter']) { 
			IKCRC_REMOTE['autosend'] = true;
			$("#ikcrcRemoteTab input[name='autosend']").attr('checked', 'checked').attr('disabled', 'disabled');
		}
		else {
			$("#ikcrcRemoteTab input[name='autosend']").removeAttr('disabled');
		}
		GM_setValue(cache_variables.REMOTE, IKCRC_REMOTE.toSource());
		BuildReport();
	});
	$("#ikcrcRemoteTab input[name='offload-site']").blur(function() { 
		IKCRC_REMOTE['offload-site'] = $(this).attr('value');
		GM_setValue(cache_variables.REMOTE, IKCRC_REMOTE.toSource());
		if (IKCRC_REMOTE['offload-site'] != '')
		{
			$('#ikcrcUploadStatus img').attr('src', 'http://tools.betawarriors.com/ikcrc/ikcrc-upload.gif');
			BuildReport();
		}
	});	

	return 'ikcrcSettingsWindow';
}

function BuildTagSettings(type)
{
	$("#ikcrcCurrentTag option[value='" + type + "']").attr('selected', 'selected');
	for (var t in IKCRC_FORMATTERS[type])
	{
		if ($("#ikcrcTagsTab table table input[name='" + t + "']").size() == 0)
		{
			$('#ikcrcTagsTab table table').append(
			'<tr>' +
				'<td width="75px">' + t + '</td>' +
				'<td><input class="textfield" type="text" name="' + t + '" value="" size="18"></td>' +
			'</tr>');
		}
		$("#ikcrcTagsTab table table input[name='" + t + "']").attr('value', IKCRC_FORMATTERS[type][t]);
	}
}

function BuildReport() {
	var colorize = GM_getValue(cache_variables.ENAB_COLOR, true);
	var events = GM_getValue(cache_variables.ENAB_EVENTS, false);

	var report = '';
	var formatter = new IKCRCFormatter(IKCRC_FORMAT, IKCRC_FORMATTERS[IKCRC_FORMAT], IKCRC_COLORS, colorize);

	/* Currently, only versions v.0.3.2 / v.0.3.1 are supported */
	if (IKCRC_FORMAT == "excel")
	{
		/* Empty Textarea */
		$("div#ikcrcPlayPen textarea").empty();

		var _time_without_brackets = IKCRC_REPORT.info.time.replace(/\( /, "").replace(/ \)/, "");
		var _date = _time_without_brackets.split(/ /)[0];
		var _time = _time_without_brackets.split(/ /)[1];
		var _datetime = _date.split(/\./)[2] + "-" + _date.split(/\./)[1] + "-" + _date.split(/\./)[0] + " " + _time;
		
		report =
			IKCRC_REPORT.info.id + "\t" +
			_datetime + "\t" +
			IKCRC_REPORT.info.place + "\t" +
			IKCRC_REPORT.info.defenders.split(/ z miasta /)[0] + "\t" +
			IKCRC_REPORT.loot.resource["wood"] + "\t" +
			IKCRC_REPORT.loot.resource["wine"] + "\t" +
			IKCRC_REPORT.loot.resource["marble"] + "\t" +
			IKCRC_REPORT.loot.resource["crystal"] + "\t" +
			IKCRC_REPORT.loot.resource["sulfur"];

		report = report.replace(/undefined/g, "0");
		report = report.replace(/Bitwa pod /g, "");

		/* Fill Textarea */
		$("div#ikcrcPlayPen textarea").append(report);

	}
	else {
		if (GAME_VERSION == "v.0.3.2" || GAME_VERSION == "v.0.3.1")
		{
			var ConverterEngine = IkariamCRCEngine.Engines[GAME_VERSION];
			if (ConverterEngine != null)
			{
				if (!IKCRC_REMOTE['formatter'] || !IKCRC_LOADED)
				{
					/* Empty Textarea */
					$("div#ikcrcPlayPen textarea").empty();

					/* Build up report */
					var report = ConverterEngine.BuildReport(formatter, IKCRC_REPORT, TRANSLATIONS, ScriptUpdater.scriptCurrentVersion, events);

					/* Add formatting text, if mode is html */
					if (IKCRC_FORMAT == 'circular') {
						report = MessageFormatter.format(report); 
					}

					/* Fill Textarea */
					report = report.replace(/\[font=Courier New\]/, "");
					report = report.replace(/\[align=center\]/, "");
					report = report.replace(/\[\/font\]/, "");
					report = report.replace(/\[\/align\]/, "");
					$("div#ikcrcPlayPen textarea").append(formatter.ReplaceColors(report));
				}
				if (IKCRC_REMOTE['formatter'] || (!IKCRC_LOADED && IKCRC_REMOTE['autosend']))
				{
					/* Let the remote client to the work */
					SendReport();
				}
			}
		} 
		else 
		{
			report = "Version not supported: " + GAME_VERSION;
		}
	}

}

function ParseReport() { 
	var ConverterEngine = IkariamCRCEngine.Engines[GAME_VERSION];
	if (ConverterEngine != null)
	{
		IKCRC_REPORT.info = 
			{ id:null, type:null, place:null, time:null, attackers:null, defenders:null, wall:null };
		IKCRC_REPORT.battle = 
			{ attackers:{}, defenders:{}, victors:null, results:null, attacking_totals:[0,0,0], defending_totals:[0,0,0], wall:'', walltext:'' };
		IKCRC_REPORT.loot =
			{ total:0, resource:{} };

		ConverterEngine.ParseReport(IKCRC_REPORT);
	}
}

function SendReport()
{
	if (IKCRC_REMOTE['offload-site'] != '')
	{
		/* Update image to show we are uploading */
		$('#ikcrcUploadStatus img').attr('src', 'http://tools.betawarriors.com/ikcrc/ikcrc-waiting.gif');

		/* Make the request */
		GM_xmlhttpRequest(
		{
			method:				'POST',
			url:				IKCRC_REMOTE['offload-site'],
			data:				IKCRC_REPORT.getPostData(),
			headers: {
				'User-agent'	: 'Mozilla/4.0 (compatible) Greasemonkey',
				'Content-type'	: 'application/x-www-form-urlencoded',
				'Accept'		: 'application/atom+xml,application/xml,text/xml' },
			onload:				function(data) 
			{
				/* Update the image to show we have finished uploading */
				if (data.responseText.indexOf("IKCRC-OFFLOAD-COMPLETE)") == -1 || data.responseText.indexOf("(IKCRC_ERROR)") != -1)
				{
					$('#ikcrcUploadStatus img').attr('src', 'http://tools.betawarriors.com/ikcrc/ikcrc-error.gif');
					alert(data.responseText);
				}
				else
				{
					$('#ikcrcUploadStatus img').attr('src', 'http://tools.betawarriors.com/ikcrc/ikcrc-complete.gif');
				}
				

				/* Use remote webpage as parsing engine? */
				if (IKCRC_REMOTE["formatter"])
				{
					/* Replace escaped characters */
					responseText = data.responseText;
					responseText = responseText.replace(/\\n/g, '\n');
					responseText = responseText.replace(/\\"/g, '\"');
					responseText = responseText.replace(/\\'/g, '\'');

					///* Create formatter (only used to colorize report) */
					//var formatter = new IKCRCFormatter(IKCRC_FORMAT, IKCRC_FORMATTERS[IKCRC_FORMAT], IKCRC_COLORS);

					/* Update report textarea */
					$("div#ikcrcPlayPen textarea").empty();
					$("div#ikcrcPlayPen textarea").append(responseText);
				}
			}
		});
	}
}

function V031_BuildJumpBack() {
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
		var globeImage = 
'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADdElEQVR42m2Te0xbZRiHf4dzeqM9belKWWG04AEUJhuZ1stkhJsOyJYtI3ZRcPESTUQww+jmostisqiJxsQpc3+PuGjcDFumW3Um25TpMsq4xI31lBaBAiull9PDOZRejkfcyDJ9kyd5v3zJk+998/sI3FMfn50pX0wSexe4ZI2wlDQTy8mUXplhaVXW8VvZI8e/czqXcV8Rd5tPzvtfml+M9sxxJk0qrcKSKIGPcxA4HnoqDcaqHkwSvzx/rKP71n8EQ9Ps7j+mv/iGizMwKh9CoUVAmC/ANa8NngkBtwMRKCUR9ZvPeVodrdWbyjbNrwr8fsk4wB8amloYsRcZ6rBWuwOl+YsIxin0ewoQE69geEwAFx3Fg6Un8MyGD758utLZtSrwzI+0/+jZ36vI5KHC0oSqwh0watSIisCNwAQWUj1gg1cRDPvARRJgTM3zLY9+VF6xbt3CiqBvuO/o6NyR103aQpiVr+KJksdhNVCICRJmuUtgI324OdMPkRewyIlQE3lor/16y8N25rcVwaenh08OeC+0ZsmzM7YGOBjAoqMgpYKICm64x7yoKjEjX7MRWRkB0+FRMEXVz5YXlp9cEXzWN9Xj9g12xBIKGHIc8rYJ6EgKBeZz8vU1mFKvwFZUAV32vzOnRQF8aHw815LbaLVaJ4gj3/ufY+fiJ1Tmt+CfbAO/tBVG1TSq1u/DZmsbzEYnfLwKGoWEYCSN6zPLaLJHoOAnXTW1dU3EoV6PPoc2DEWTB4sTxAAGBt+RF2ZHruICeg+0wxOmcd5LIZWWEPYFkKQI1D/5ABLsT2ipfaRuJQc72/Y5a3bt+VZJH8TUTC5G/nwNS7dD+OpAGWYF4AyrQxoknOzncM0W4K/qF1BB3MDOSuXhu0lUNGx/+f2O/VveiyUM5HjgMcx6p9C4XkCRTY2zk3YMh9Q4emU7PrS8C09xDepNPmwtWT5G3EmjSSafKWW27drz4u7iymYGGV12PDAmWbVzpKgthStYBv3vLnCORpjX0NigYdG00di9+gIZyz8SGTtFUcU6vd4sionMtpbmhre7uxxkDoNT7gQiEg2bkUBe7CLruzn4FHHfv1DL6GS0d3qlzNrOzs6uvW++0ZDMQPPzZXfoav+vl10/nDocCoWu3yv4vyJlaJk1JEnaaJrWRqPRoHz2yURkMn8DmSZfefTcGh0AAAAASUVORK5CYII=';
		header.prepend("<div id='reportOverviewLink'><img src='" + globeImage + "' width='16' height='16'><p>" + L_REPORT.back + "</p></div>");
		$("div#reportOverviewLink", header).click( function() {
			GM_setValue(cache_variables.LAST_REPORT, battleId);
			self.location.replace(document.location.href.replace(/detailedCombatId/,'combatId'));
		});
		delete globeImage;
	}
}

function V031_ParseDetailedLoot() {
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

