// ==UserScript==
// @name           Ikariam CR Converter
// @namespace      holyschmidt
// @author         holyschmidt (http://userscripts.org/users/50784)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/50784
// @description    Easily Convert Combat Reports for forum viewing.
// @include        http://s*.ikariam.*/index.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/62718.user.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Highscore.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_CombatReport.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_Ships.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLang_Units.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguage_Resources.js
// @version        3.08
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
//
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
// @history        2.8.5 Bugfix: Images not being shown properly in game messages.
// @history        2.8.4 Feature: Put back in functionality of formatted/colored CR reports within game messages (thanks to Martynius).
// @history        2.8.3 Feature Removal: Some idiots on the German server were abusing the nice coloring used in circular messages (now removed).
// @history        2.8.2 Feature: Initial support for v.0.3.4
// @history        2.8.1 Bugfix: Victors line was not removing excess white space, which was causing DOM error(s) in the ajaxchat option.
// @history        2.8.0 Feature: Initial support for v.0.3.3
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

// ==/UserScript==

ScriptUpdater.check(50784, "3.08");

Language = { 
	init:function() {
		var lang = getLang();
		var language = getLanguage();
		Language.highscore = language_highscore[language];
		Language.report    = language_crconverter[lang];
		Language.resources = language_resources[language];
		Language.ships     = language_ships[lang];
		Language.units     = language_units[lang];
	}
}

Config.prefix = document.domain;
Config.reloadOnSave = true;
Config.scriptName = "Ikariam CR Converter";
Config.tabs = {
	"Converter":{
		html:'<p>Combat Report Converter configuration settings.</p>',
		fields:{
			convertFormat:{
				type:"select",
				label:"Format",
				options:{
					"ajaxchat":"ajaxchat",
					"bbcode":"bbcode",
					"circular":"circular",
					"html":"html",
					"plaintext":"plaintext",
				},
				text:'output format of the converter combat report?',
				value:"plaintext",
			},
			enableColor:{
				type:'checkbox',
				label:'Color',
				text:'should colors be displayed in the report?',
				value:true,
			},
			enableEvents:{
				type:'checkbox',
				label:'Events',
				text:'should events be displayed in the report?',
				value:true,
			},
			enableImages:{
				type:'checkbox',
				label:'Images',
				text:'should images be displayed in the report?',
				value:true,
			},
			crColorsScene:{
				type:"text",
				label:"Scene > Color",
				text:'what color is the scene?',
				value:"0000CC",
			},
			crColorsAttackers:{
				type:"text",
				label:"Attackers > Color",
				text:'what color is the units attacking?',
				value:"C00000",
			},
			crColorsDefenders:{
				type:"text",
				label:"Defenders > Color",
				text:'what color is the units defending?',
				value:"00CC00",
			},
			crColorsLeft:{
				type:"text",
				label:"Units Left > Color",
				text:'what color is the units left?',
				value:"000000",
			},
			crColorsLost:{
				type:"text",
				label:"Units Lost > Color",
				text:'what color is the units lost?',
				value:"FF0000",
			},
			crColorsVictor:{
				type:"text",
				label:"Victor > Color",
				text:'what color is the victor(s)?',
				value:"0000CC",
			},
			crColorsEvents:{
				type:"text",
				label:"Events > Color",
				text:'what color is the events?',
				value:"444444",
			},
		}
	},
	"Miscellaneous":{
		html:'<p>Miscellaneous configuration settings.</p>',
		fields:{
			convertDetailed:{
				type:'checkbox',
				label:'Convert Detailed',
				text:'automatically convert the detailed combat report?',
				value:true,
			},
			convertSummary:{
				type:'checkbox',
				label:'Convert Summary',
				text:'automatically convert the summary combat report?',
				value:true,
			},
			showPreview:{
				type:'checkbox',
				label:'Show Preview',
				text:'show a sample preview of the converted report?',
				value:true,
			},
			hideEmptyRows:{
				type:'checkbox',
				label:'Empty Rows',
				text:'hide empty moral rows in the detailed report view?',
				value:true,
			},
			nameEventUnits:{
				type:'checkbox',
				label:'Event Unit Names',
				text:'insert unit names in event actions?',
				value:true,
			},
			armyOverview:{
				type:'checkbox',
				label:'Army Overview',
				text:'show overview link in breadcrumbs?',
				value:false,
			},
			navyOverview:{
				type:'checkbox',
				label:'Navy Overview',
				text:'show overview link in breadcrumbs?',
				value:false,
			},
		}
	},
	"About":{
		html:'	<p><a href="http://userscripts.org/scripts/show/' + ScriptUpdater.scriptId + '" target="_blank" style="font-weight:bold !important;">' +
				Config.scriptName + ' v' + ScriptUpdater.scriptCurrentVersion +
				'</a> by <a href="http://userscripts.org/users/holyschmidt" target="_blank">holyschmidt</a>\
				<p>This script parses combat report details (units remaining/lost, resources, winners, etc) and converts report into a format for display </p>',
	}
};

Settings = {
	get:function(key) { 
		return Config.get(key); 
	},
	set:function(key, value) { 
		Config.set(key, value); 
	},
}

Styles = {
	add:function(css) {
		GM_addStyle(css);
	},
	addCustomEvents:function() {
		// Setup events to change color of input box for CR colors, if adjustment is made
		$("input[id*='crColors']").live('click', function() { Styles.colorShow(this); });
		$("input[id*='crColors']").live('keyup', function() { Styles.colorShow(this); });
	},
	addPlayPen:function(id) {
		if($('#ikcrcPlayPen').size() == 0) {
			// Add required styles 
			Styles.add(
				"#ikcrcPlayPen { margin-left:auto; margin-right:auto; margin-top:25px; }" +
				"#ikcrcForceUpdate:hover { cursor:pointer; text-decoration:underline; }" +
				"#ikcrcSettings { margin:auto 5px; position:relative; float:right; color:#FF0000; }" +
				"#ikcrcSettings:hover { text-decoration:underline; cursor:pointer; }" +
				"#ikcrcVersion { position:relative; float:left; margin-left:5px;}" +
				"#ikcrcEnables { position:relative; float:right; margin-top:6px; }" +
				"#ikcrcPlayPen span.ikcrcFormats { position:relative; float:left; margin:5px; }" +
				"#ikcrcPlayPen textarea { font-family: courier; width:97%; margin:7px; }");
			// Build intial playpen 
			$('#' + id).after(	
			'<div id="ikcrcPlayPen" class="contentBox01h">' +
				'<h3 class="header">' +
					'<span id="ikcrcVersion">' +
						'<span id="ikcrcForceUpdate" title="Click to force-check version">v.' + ScriptUpdater.scriptCurrentVersion + '</span>' +
					'</span>' +
					'<span id="ikcrcSettings" title="Show/Hide Settings Window">Settings</span>Ikariam Combat Report Converter' + '</h3>' + 
				'<div class="content"><span id="ikcrcOptions"></span><textarea rows="5" readonly></textarea><div class="footer"></div></div>' +
			'</div>');	
			// Listen for force update
			$('#ikcrcForceUpdate').click(function() { ScriptUpdater.forceNotice(ScriptUpdater.scriptId, ScriptUpdater.scriptCurrentVersion); });
			// Add format options 
			for (var format in Formatter.Defaults.Formats) {
				var checked = format == Settings.get('convertFormat') ? ' checked="checked"' : ''; 
				$("#ikcrcOptions").append(
					'<span class="ikcrcFormats"><input type="radio" name="ikcrcFormat" value="' + format + '"' + checked + '> ' + format + ' </span>'
				);
			}
			// Add converter enables
			var ena_color = Settings.get('enableColor') ? 'checked="checked"' : '';
			var ena_events = Settings.get('enableEvents') ? 'checked="checked"' : '';
			var ena_preview = Settings.get('enableImages') ? 'checked="checked"' : '';
			var ena_preview = Settings.get('showPreview') ? 'checked="checked"' : '';
			$("#ikcrcOptions").append('<span id="ikcrcEnables">' +
				'<input name="enableColor" type="checkbox" ' + ena_color + '/>&nbsp;Color&nbsp;&nbsp;' +
				'<input name="enableEvents" type="checkbox" ' + ena_events + '/>&nbsp;Events&nbsp;&nbsp;' +
				'<input name="enableImages" type="checkbox" ' + ena_events + '/>&nbsp;Images&nbsp;&nbsp;' +
				'<input name="showPreview" type="checkbox" ' + ena_preview + '/>&nbsp;Preview&nbsp;&nbsp;' +
			'</span>');
			// Listen for format changes
			$("span.ikcrcFormats input").click(function() {
				Settings.set('convertFormat', this.value); 
				Converter.displayReport(Settings.get('convertFormat'));
			});	
			// Listen for event changes
			$("#ikcrcEnables input").click(function() {
				Settings.set(this.name, this.checked ? "1" : "0"); 
				Converter.displayReport(Settings.get('convertFormat'));
			});
			// Setup event to open settings dialog.
			$("#ikcrcSettings").click(function() {
				Config.show();
				Config.activateTab('configTabConverter');
			});
		}
	},
	colorShow:function(obj) {
		var bg = obj.value.toUpperCase();
		var fg = Converter.colorReverse(bg);
		$(obj).attr('style', 'color:#' + fg + '; background-color:#' + bg);
	},
	colorReverse:function(c) {
		var result=''; var ch=''; var list1='0123456789ABCDEF'; var list2='FEDCBA9876543210';
		for(var i=0;i<c.length;i++) { ch=c.charAt(i); for(var n=0;n<list1.length;n++){ if(ch==list1.charAt(n)) result += list2.charAt(n); } }
		return result;		
	},
}

PlunderUtils = {
	init:function() { 
		PlunderUtils.showQuickLinks();
		switch ($('body').attr('id'))
		{
			case "militaryAdvisorDetailedReportView" : 
				PlunderUtils.hideEmptyMoralLines();
			break;				
		}
	},
	hideEmptyMoralLines:function() {
		if (Settings.get('hideEmptyRows')) {
			$('td.militarySize').each(function() { 
				if (this.innerHTML == "0 (-)") {
					$(this).parent().attr('style', 'display:none;');
				}
			});
		}
	},
	showQuickLinks:function() {
		try
		{
			// Add Styling.
			Styles.add(
				".PlunderQuickLink { margin-right:5px; }" +
				".PlunderQuickLink img { width:20px; height:15px; }" 
			);
			// Add quick links.
			var cityId = $("#citySelect option[selected='selected']")[0].value;
			if (Settings.get('navyOverview')) { 
				$('#breadcrumbs').prepend(
					'<a class="PlunderQuickLink" href="?view=cityMilitary-fleet&id=' + cityId + '" title="View Fleet In Town">' +
						'<img src="' + PlunderUtils.Images.shipyard + '"/>' +
					'</a>'
				);
			}
			if (Settings.get('armyOverview')) { 
				$('#breadcrumbs').prepend(
					'<a class="PlunderQuickLink" href="?view=cityMilitary-army&id=' + cityId + '" title="View Troops In Town">' +
						'<img src="' + PlunderUtils.Images.barracks + '"/>' +
					'</a>'
				);
			}
		}
		catch(e) { };
	},
	Images:{
		garrison: 
			'data:image/gif;base64,R0lGODlhDwAPAPcPAPv03M+acqyJYtGzkm1HLJ9xTI5gM1IwIvPeuCQRCe3GknRgTNrKsd+hIOm4YgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAA8ALAAAAAAPAA8AAAihAB8IFLgggQEBBRAAGMhwAIEDBxIkYABAAcMHDAQ8hEhAAYAAFwUcIECSpMIACBgWICmR5McDCwcKMGBgwcgFIhfEFFigwE0DBRggcJByIAOfI0kKSDDAIkORSTseGDAgJEcCC2wOAGnUZlIFCAwoENCwQIIDCwo4CLDAQQGCIxuYNQi0gAEAb0UScNCAgMQEPQdUxDigQAAFbR14BCAYQEAAOw%3D%3D',
		barracks: 
			'data:image/gif;base64,R0lGODlhGQATAOclALSIWelZKdCqkfySZv7xNvzZk8e5svUnAHhlV/zIdPGyl/yHW/x3R5iCdYRpV9CldhYQC3ZrY4h1ZvcEEf3kpcptTP3rtK2KH/v256w0DvhmNXRZSJZ5ZrGjmq0cAaeJeNPEr2pWR9JHGJp0Wf73yv///6WDa8UKCOpkN6eWi/9vdbSIZFVEN/+srv6Jj8WXaGFIOJcSAqV9ZP/92frYpdZVKaWmpah6SJmZmfvTiZmus/7zu+i1KJaLgcabdIZlTMiSUrySZ+9RF/3gm/7p5bm5t/0UJv3ct/pIUbhJJ6RyPplmM72Ucq6CVfvm2FVWSuNvbv8zM6J6XdwhAEw8LdOrKvjVL8VJIv45RrFAGpEpCtvd25JuV5ORVWtoWGWWDo5MD//Z26qdlf/98uJ9VLSmaMjJxbaqpLyUgpBZNe92SsbT1fzrxPnLgjonGL+bIquuUttcMc7FjtdlPP2hdeXu7ffPlIaHisOcidrl5YhxXnIQB+vo1r2xpHgrFHlWO81QJ4xgGrSDTvrFXefDmdgyM/G9dsceAV0yHurb06WESf/z85FrTLCLdY43LIuTmvO1WOvmxoJeRf9TYvXz7/a1aurNs+OrbqqRfZ+Rh9BuFmhPPfl+UO/39v/DyfvHs+PWxuyKHefbratwHZChnuLDq9ibdLRUT6CMfcyZZu/Ssf+ZmcGHZPNuQNuuVMVWMJWkOd5JJF0PA4Z7cbF3QtLGwdTQzrCzsntJM8qLJcU1CsTCbpiNj2pcUZp3P/ddKdyzhmtkTfT8/ImNkn1hUMM+F3ttXunYneVtQehyFrWRQs/a3WJNPmlCJf/s8Md8ZOSzZZlmZp6XW+PkvPf49ffTubCcjf1sPLuNXXk+JItqX/LLo7XFvF1fUnd6ebd2XP7uq3JfUP/N0//f4mRwZOE6CZB+cGpMMuekKT1EPeq+icPAu3+Tj6I6Ft7lqv9mZpKRkdgcK///OsBmZP+6wPLw5m1RQZmZZtPjjeeNZt/LvZMaHZkzM6BjS////////yH5BAEAAP8ALAAAAAAZABMAAAj+AP8JHDjQ1r8Mh6Z4IMiwIUFeHqZYIRAjosOLAnnFmCLkgqYDhzBehDgl155QB2KIdPgo4SuBC1cyFPLo2gIUjmQ2LCFmWKs5Gq7U0/nv1zU6V+pQApHvio0UOjUsEDEAxbUSJcbgMMFBgUghQgbEAcRpQCt71sRgMjbCjZGLj9bhAFQMBaA5mCR8CBGBUQgiSKJRcAivSIkMQZ/1YGEsnCR7HIxAeJfNFENYkhAY4+WAU4AzLDZwYSYjCAQBE8R1m2BkhcBSzSQY8+KAzJYRIzbZW4EtiCAfP8ZNnmBM2j8Jkrgg6KFHVgcpMDYIYgIgCJACVGJNcEHjhyCBVBBMCcikhxizDQ5e+AAgqhI4CxQgAIBASAYARQONCdhEbANkDjcYUgAFdgxBwg6GsJHcCA0hYI4AIWCzRBCpWFAJUQNJ8EAgN0CCjkwBAQA7',
		shipyard: 
			'data:image/gif;base64,R0lGODlhGQATAMY3APBqOCklI61IJQpspvB7RubRt9CWZFyVtG1HLNSra6qbj5SMiNTEtZeCc2dbV/Syc+nNi/OlW45WMPXPblA4KVlMR6p5VPGRT7i1rdvW0pQ5HW8qFf775v7989FnPLiFT/3trkMoF+rcy6aQfFpWVydSaIh6deVdLpl3WsFQK1VjZrOlmnNVQP/+y/noxr6Xduvi2d3Dlf702dBDGbWmetW3i/nck////1xQTGNTTUA+QVZBMpR5Z4twXddbMGZmZnlkVYp0aG08HoNtYJR9cXZoYYVpVXl2edRWLKOJdcdZMKiFZklLUYdjSZ9wSbKNcWZpcIRdQbuMYse1ncy7qMGqmJVtUnJtcKxnONi5m31za/r18MWmic2CTZdoRp9fNNKulfTp2+zq5GxyeTZ/qMBFIO/AWNKsh+HCpfXx6+/w7tikV4ZIJNVMIQZ/v0FWWo12TOK+ds2fe/b+/uq7lZKzwazF0KmWZNzm53uis2qAjeZMHbybXMayhYuor////yH5BAEAAH8ALAAAAAAZABMAAAf+gH+Cg4RyYDeEiYqJCSkAACkyi5OCBkoEGkhKPgAJlIkFMGknnAAaYDyeZWWIlChcChkpJy8NLywnjikarYtSCDs1Fz0lbw8eBD66AH2LWQjQEtA7FA5USScnZVloihN/ThJACCEoSUYNFENJGQVEPGhDiRQoFB5OESE9I0ENIUQBRuBw8mAEDUJQbgh58KDLgwJgGIRQUAFHgCIBGDQooiCRFigduoCwcQMLlRw5KlSgQKGBjhArFlDh0ArKnzEiOAi54SAHjp8HBkCxYKLCFylx4vRwMSjDjQ49HeCoEHRAmiZAjHyQAkHNgkQIWHwJYaWCnwED5FBRcGQBgg9LHTBUUBTiy1ghaAtYoFKBhA4dGWAsqJBF0csvAULY2QLjh9QKOvz2MEKpbgAhEkz80OHAhCAFOoJ8+oMgQAAER36QGf0pwBXWgwIBADs%3D',
	},
};

Units = {
	Details: {
	/* Sea */
		/* ram   */ "210" : { wood:220, wine:0,   sulfur:50,   glass:0,   key:"ram" },
		/* bal   */ "213" : { wood:180, wine:0,   sulfur:160,  glass:0,   key:"ballista" },
		/* fire  */ "211" : { wood:80,  wine:0,   sulfur:230,  glass:0,   key:"flame" },
		/* cat   */ "214" : { wood:180, wine:0,   sulfur:140,  glass:0,   key:"catapult" },
		/* pad   */ "216" : { wood:300, wine:0,   sulfur:1500, glass:0,   key:"paddle" },
		/* mort  */ "215" : { wood:220, wine:0,   sulfur:900,  glass:0,   key:"mortar" },
		/* div   */ "212" : { wood:160, wine:0,   sulfur:0,    glass:750, key:"diving" },
	/* Land */
		/* sling */ "301" : { wood:20,  wine:0,   sulfur:0,    glass:0,   key:"slinger" },
		/* sword */ "302" : { wood:30,  wine:0,   sulfur:30,   glass:0,   key:"swordsman" },
		/* hop   */ "303" : { wood:40,  wine:0,   sulfur:30,   glass:0,   key:"phalanx" },
		/* arch  */ "313" : { wood:30,  wine:0,   sulfur:25,   glass:0,   key:"archer" },
		/* guns  */ "304" : { wood:50,  wine:0,   sulfur:150,  glass:0,   key:"marksman" },
		/* gyro  */ "312" : { wood:25,  wine:0,   sulfur:100,  glass:0,   key:"gyrocopter" },
		/* steam */ "308" : { wood:130, wine:0,   sulfur:180,  glass:0,   key:"steam giant" },
		/* bomb  */ "309" : { wood:40,  wine:0,   sulfur:250,  glass:0,   key:"bombardier" },
		/* ram   */ "307" : { wood:220, wine:0,   sulfur:0,    glass:0,   key:"ram" },
		/* cat   */ "306" : { wood:260, wine:0,   sulfur:300,  glass:0,   key:"catapult" },
		/* mort  */ "305" : { wood:300, wine:0,   sulfur:1250, glass:0,   key:"mortar" },
		/* doc   */ "311" : { wood:50,  wine:0,   sulfur:0,    glass:450, key:"doctor" },
		/* cook  */ "310" : { wood:50,  wine:150, sulfur:0,    glass:0,   key:"cook" },
		/* spear */ "315" : { wood:30,  wine:0,   sulfur:0,    glass:0,   key:"spearmen" },
		/* barb  */ "316" : { wood:0,   wine:0,   sulfur:0,    glass:0,   key:"barbarian" },
		/* wall  */ "314" : { wood:0,   wine:0,   sulfur:0,    glass:0,   key:"wall" },
	},
	Damage:function(unit) {
		if (Units.Details[unit] == undefined) 
			throw "Units::Damage() - unit undefined!";
		return Units.Details[unit].wood + Units.Details[unit].wine + Units.Details[unit].sulfur + Units.Details[unit].glass;
	},
};

Converter = {
	root:undefined,
	previewOn:false,
	ResourceImages: [
		'http://img196.imageshack.us/img196/1127/woodsmall.gif',	// wood 
		'http://img193.imageshack.us/img193/2796/winesmall.gif',	// wine 
		'http://img194.imageshack.us/img194/421/iconmarble.gif',	// marb  
		'http://img190.imageshack.us/img190/5090/glasssmall.gif',	// glas  
		'http://img195.imageshack.us/img195/2010/sulfursmall.gif'	// sulf  
	],
	init:function(id, root) {
		Converter.root = root;
		switch (id)
		{
			case "militaryAdvisorReportView":
				Converter.listenForManualChanges();
				Converter.convertSummaryReport();
			break;
			case "militaryAdvisorDetailedReportView" : 
				Converter.convertDetailedReport();
			break;				
		}
		Styles.addCustomEvents();
	},
	convertDetailedReport:function() {
		if (Settings.get('convertDetailed')) {
			// Build PlayPen
			Styles.addPlayPen('mainview');
			// Get the CR details 
			var cr = { info:{}, attacker:{}, defender:{}, results:{} };
			cr.info.time     = $('#rounds li.roundTime', Converter.root).text();
			cr.info.place    = $('#mainview div.buildingDescription h1', Converter.root).text();
			cr.info.round    = $('#rounds ul li.roundNo', Converter.root).text();
			cr.info.type     = $("#battlefield[class*='land'],#battlefield[class*='city']", Converter.root).size() > 0 ? "army" : "fleet";  
			try { cr.info.attacker = $('#attacker', Converter.root).text().match(/:\n\s+(.+)/)[1]; } catch(e) {}
			try { cr.info.defender = $('#defender', Converter.root).text().match(/:(.+)/)[1]; } catch(e) {}
			// Attacker field units 
			$("#fieldAttacker ul li", Converter.root).each(function() {
				var unit = $('div:eq(0)', this).attr('class'); try { unit = unit.match(/\d+/)[0] } catch(e) { };
				if (Units.Details[unit] != undefined) { 
					var left = parseInt($('div.number', this).text().match(/(\d+)/)[1]); 
					var lost = parseInt($('div.number', this).text().match(/\(-(\d+)\)/)[1]); 
					if (cr.attacker[unit] == undefined) {
						cr.attacker[unit] = { "left":left, "lost":lost, "reserve":0 };
					} else {
						cr.attacker[unit].left += left; 
						cr.attacker[unit].lost += lost;
					}
				}
			});
			// Defender field units 
			$("#fieldDefender ul li", Converter.root).each(function() {
				var unit = $('div:eq(0)', this).attr('class'); try { unit = unit.match(/\d+/)[0] } catch(e) { };
				if (Units.Details[unit] != undefined) { 
					var left = parseInt($('div.number', this).text().match(/(\d+)/)[1]); 
					var lost = parseInt($('div.number', this).text().match(/\(-(\d+)\)/)[1]); 
					if (cr.defender[unit] == undefined) {
						cr.defender[unit] = { "left":left, "lost":lost, "reserve":0 };
					} else {
						cr.defender[unit].left += left; 
						cr.defender[unit].lost += lost;
					}
				}
			});
			// Attacker reserve units 
			$("#resAttacker div.units ul li", Converter.root).each(function() {
				var unit = $("div", this).attr('class'); try { unit = unit.match(/\d+/)[0] } catch(e) { };
				if (Units.Details[unit] != undefined) { 
					if (cr.attacker[unit] == undefined) { cr.attacker[unit] = {}; }
					cr.attacker[unit].reserve = parseInt($(this).text().match(/(\d+)/));
				}
			});
			// Defender reserve units 
			$("#resDefender div.units ul li", Converter.root).each(function() {
				var unit = $("div", this).attr('class'); try { unit = unit.match(/\d+/)[0] } catch(e) { };
				if (Units.Details[unit] != undefined) { 
					if (cr.defender[unit] == undefined) { cr.defender[unit] = {}; }
					cr.defender[unit].reserve = parseInt($(this).text().match(/(\d+)/));
				}
			});
			// Results 
			var events = {}; var count = 0;
			$("#events div span", Converter.root).each(function() {
				if (Settings.get('nameEventUnits')) {
					var html = $(this).html();
					$("ul.unitlist", this).before('\n');
					$("ul.unitlist li", this).each(function() {
						var unit = $(this).attr('class').match(/\d+/)[0];
						if (Units.Details[unit] != undefined) { 
							var key = Units.Details[unit].key;
							var unitName = cr.info.type == "army" ? Language.units[key] : Language.ships[key];
							$(this).text(unitName + ':' + $(this).text() + ' ');
						}
					});
				}
				events[count++] = $(this).text().replace(/^\s+|\s+$/g, '');
				$(this).html(html);
			});
			if (events != '') cr.events = events;
			// Loot
			cr.results.loot = { total:0 };
			// Save & display the report 
			Converter.cr = cr;
			Converter.displayReport(Settings.get('convertFormat'));
		}
	},
	convertSummaryReport:function() {
		if (Settings.get('convertDetailed')) {
			// Build PlayPen
			Styles.addPlayPen('troopsReport');
			// Get the CR details 
			var cr = { info:{}, attacker:{}, defender:{}, results:{} };
			cr.info.time     = $('#troopsReport span.date', Converter.root).text(); 
			cr.info.place    = $('#troopsReport h3.header:eq(0)', Converter.root).html().match(/(.+)\s\</)[1];
			cr.info.attacker = $('#troopsReport div.attacker span', Converter.root).text();
			cr.info.defender = $('#troopsReport div.defender span', Converter.root).text();
			cr.info.type     = $("#troopsReport table.overview tr th div[class^='army']", Converter.root).size() > 0 ? "army" : "fleet"; 
			// Remaining Totals / Units - This is the tricky part to parse 
			var unitSide = null;
			var unitKeys = new Array();
			$("#troopsReport table.overview tr", Converter.root).each(function() {
				// re-define units that are being parsed 
				if ($(this).find("th div").size() > 0) {
					unitSide = cr.attacker;
					unitKeys = []; 
					$(this).find("th div").each(function() { unitKeys.push($(this).attr("class")); });
				}
				else
				if ($(this).find("td[colspan='8'][class^='col1 nobg']").size() == 1) { 
					unitSide = cr.defender;
				}
				else
				if ($(this).find("td.numbers").size() == unitKeys.length) {
					unitCount = 0; 
					$(this).find("td.numbers").each(function() {
						var unit = unitKeys[unitCount++].match(/\d+/)[0];
						var details = $(this).text();
						if (unit != null && details.indexOf("(") != -1) {
							if (unitSide[unit] == null || unitSide[unit] == null) { unitSide[unit] = { left: 0, lost: 0 } }
							unitSide[unit].left += parseInt(details.substr(0, details.indexOf('(')).replace(/\s+/, ''));
							unitSide[unit].lost += parseInt(details.substr(details.indexOf('(') + 2).replace(/\s+/, '').replace(/\)/, ''));
						}
					});
				}
			}); 
			// Victors 
			cr.results.victors = $("#troopsReport div.result div.winners", Converter.root).text().replace(/^\s*/, '').replace(/\s*$/, ''); 
			// Results 
			var events = {}; var count = 0;
			$("#troopsReport div.result div", Converter.root).not("div.winners,div.losers").each(function() {
				if ($(this).find("ul.resources").size() == 0) {
					events[count++] = $(this).text(); 
				}
			});
			if (events != '') cr.events = events;
			// Loot, If Available 
			cr.results.loot = {total:0};
			$("div.result ul.resources li", Converter.root).each(function() {
				var type = $(this)[0].className;
				var amount = parseInt($(this).contents()[1].nodeValue.replace(/,/,''));
				cr.results.loot[type] = cr.results.loot[type] == null ? amount : cr.results.loot[type] + amount;
				cr.results.loot.total += amount;
			});
			// Save & display the report 
			Converter.cr = cr;
			Converter.displayReport(Settings.get('convertFormat'));
		}
	},
	displayReport:function(format) { 
		var cr = Converter.cr; 
		// Initialize Formatter 
		Formatter.init(format);
		Formatter.colorize = Settings.get('enableColor');
		Formatter.images = Settings.get('enableImages');
		// Add Place & Time of Attack 
		output = Formatter.AddColor(cr.info.place + '\n' + cr.info.time + '\n\n', 'HEADER');		
		// Add Attackers + Defenders Involved 
		output += Formatter.AddColor(cr.info.attacker, 'ATTACKING');
		output += cr.info.defender != undefined ? '\nvs\n' + Formatter.AddColor(cr.info.defender, 'DEFENDING') + '\n\n' : '\n\n';
		// Some magic numbers to help align the report
		var nName = 19;
		var nLeft = 5;
		var nLost = 8;
		var nReserve = 8;
		var nTotal = cr.info.round == undefined ? nName + nLeft + nLost : nName + nLeft + nLost + nReserve; 
		// Display each unit (if present)
		attackersLosses = 0; defendersLosses = 0; 
		output += Formatter.AddSeparator(nTotal * 2 + 3) + '\n'; 
		for (var unit in Units.Details) {
			if (cr.attacker[unit] != null || cr.defender[unit] != null) {
				key = Units.Details[unit].key; 
				unitName = cr.info.type == "army" ? Language.units[key] : Language.ships[key];
				if (cr.attacker[unit] != null) {
					lost = cr.attacker[unit].lost == null ? 0 : cr.attacker[unit].lost;
					output += Formatter.PadString('right', unitName, nName, '.', 'ATTACKING');
					output += Formatter.PadString('left', cr.attacker[unit].left == null ? '' : cr.attacker[unit].left, nLeft, '.', 'UNITLEFT');
					output += Formatter.PadString('right', cr.attacker[unit].lost == null ? '' : '(-' + Formatter.AddColor(cr.attacker[unit].lost, 'UNITLOST') + ')', nLost, '.', '');
					output += cr.info.round == undefined ? '' : (cr.attacker[unit].reserve == undefined 
						? Formatter.PadString('left', '', nReserve, '.', '')
						: Formatter.PadString('left', '{' + Formatter.AddColor(cr.attacker[unit].reserve, 'UNITRESERVE') + '}', nReserve, '.', '')
						);
					output += ' - ';
					attackersLosses += lost * Units.Damage(unit); 
				} else {
					output += Formatter.PadString('right', '', nTotal, '.', '') + ' - ';
				}
				if (cr.defender[unit] != null) {
					var lost = cr.defender[unit].lost == null ? 0 : cr.defender[unit].lost;
					output += Formatter.PadString('right', unitName, nName, '.', 'DEFENDING');
					output += Formatter.PadString('left', cr.defender[unit].left == null ? '' : cr.defender[unit].left, nLeft, '.', 'UNITLEFT');
					output += Formatter.PadString('right', cr.defender[unit].lost == null ? '' : '(-' + Formatter.AddColor(cr.defender[unit].lost, 'UNITLOST') + ')', nLost, '.', '');
					output += cr.info.round == undefined ? '' : (cr.defender[unit].reserve == undefined 
						? Formatter.PadString('left', '', nReserve, '.', '')
						: Formatter.PadString('left', '{' + Formatter.AddColor(cr.defender[unit].reserve, 'UNITRESERVE') + '}', nReserve, '.', '')
						);
					defendersLosses += lost * Units.Damage(unit);

				} else {
					output += Formatter.PadString('right', '', nTotal, '.', '');
				}
				output += '\n';
			}
		}		
		// Add Table to display Net Losses/Gains + Loot 
		output += Formatter.AddSeparator(nTotal * 2 + 3) + '\n';
		var metricTranslations = [Language.highscore.army_score_main, Language.report.damage];
		var metricAttackers = [ parseInt(attackersLosses*-1*.02), parseInt(attackersLosses) ];
		var metricDefenders = [ parseInt(defendersLosses*-1*.02), parseInt(defendersLosses + cr.results.loot.total) ];
		for (var m = 0; m < metricTranslations.length; m++) {
			output += Formatter.PadString('right', metricTranslations[m], nTotal - 10, '.', 'ATTACKING');
			output += Formatter.PadString('left', IkaTools.addCommas(metricAttackers[m]) + '', 10, '.', 'ATTACKING') + ' - ';
			output += Formatter.PadString('right', metricTranslations[m], nTotal - 10, '.', 'DEFENDING'); 
			output += Formatter.PadString('left', IkaTools.addCommas(metricDefenders[m]) + '', 10, '.', 'DEFENDING') + '\n';
		}
		output += Formatter.AddSeparator(nTotal * 2 + 3) + '\n';
		// Add Victor(s) 
		if (cr.results.victors != null) {
			output += '\n' + Formatter.AddColor(cr.results.victors, 'VICTOR') + '\n';
		}
		else if (cr.info.round != null) {
			output += '\n' + Formatter.AddColor(cr.info.round, 'VICTOR') + '\n';
		}
		// Add Loot 
		if (cr.results.loot.total > 0) {
			results = '\n';
			results += Language.report.loot + ': ';
			var lootTotals = [
				cr.results.loot.wood, cr.results.loot.wine, cr.results.loot.marble, cr.results.loot.glass, cr.results.loot.sulfur 
			];
			var lootString = [
				Language.resources.wood, 
				Language.resources.wine, 
				Language.resources.marble, 
				Language.resources.glass, 
				Language.resources.sulfur
			];
			for (var r = 0; r < lootTotals.length; r++) {
				if (lootTotals[r] > 0 ) {
					var imageString = Formatter.AddImage(Converter.ResourceImages[r]);
					if (imageString == '') imageString = '\n' + lootString[r];
					results += imageString + " " + IkaTools.addCommas(lootTotals[r]) + ' ';
				}
			}
			output += results + '\n';
		}
		// Add Event(s)
		if (Settings.get('enableEvents') && cr.events != null) {
			output += '\n'; events = '';
			for (var e in cr.events){
				events += cr.events[e] + '\n';
			}
			output += Formatter.AddColor(events, 'EVENTS');
		}
		// Add Homepage Link
		output += "\nCreated using ";
		output += Formatter.AddLink("Ikariam CR Converter", "http://board.ikariam.org/index.php?page=Thread&threadID=56204") + ' (';
		output += Formatter.AddLink('v' + ScriptUpdater.scriptCurrentVersion, "http://userscripts.org/scripts/show/50784") + ')';
		// Add Size, Font, Bold-Styling, Alignment & Coloring
		output = Formatter.AddSize(output, 85);
		output = Formatter.AddFont(output, 'Courier New');
		output = Formatter.AddBold(output);
		output = Formatter.AddAlignment(output, 'center');
		output = Formatter.ReplaceColors(output);
		output = format == 'html' ? output.replace(/\n/g, '<br>') : output;
		if (Converter.previewOn && format == 'html')
		{
			if($('#ikcrcPlayPenPreview').size() == 0)
   	            $('#ikcrcPlayPen textarea').after('<div style="margin:1em;" id="ikcrcPlayPenPreview"></div>');
			$('#ikcrcPlayPenPreview').html(output);
			$('#ikcrcPlayPenPreview').show();
		}
		else
		{
			// Add <MessageFormatter>, if circular
			output = format == 'circular' ? MessageFormatter.format(output) : output;
			// Dump into report textarea
			$('#ikcrcPlayPen textarea')[0].value = output;
			// Does the user want a preview of the report?
			if (Settings.get('showPreview'))
			{
				Converter.previewOn = true;
				Converter.displayReport('html');
				Converter.previewOn = false;
			}
			else
			{
				if($('#ikcrcPlayPenPreview').size() != 0) 
					$('#ikcrcPlayPenPreview').hide();
			}
		}
	},
	listenForManualChanges:function() {
		/* Allow for a little editting, in case the CR is bugged */
		$('td.numbers', Converter.root).bind("dblclick", function() {
			var cell = this;
			var numbers = $(this).text().replace(/^\s+|\s+$/g,"");
			$(this).html('<input type="text" style="width:90%; font-size:0.9em; text-align:center;" value="' + numbers + '">');
			$('input', this)[0].focus();
			$('input', this).blur(function() {
				cell.innerHTML = this.value;
				Converter.convertSummaryReport();
			});			
		});		
	},
}

Formatter = {
	colorize:true,
	images:true,
	format:'bbcode',
	get:function() { return Formatter.Formats[Formatter.format]; },
	init:function(format, colors, tags, colorize) 
	{
		if (colorize != null) {
			Formatter.colorize = colorize;
		}
		if (format != null) {
			Formatter.format = format;
		}

		colors = colors != null ? colors : Formatter.Defaults.Colors;
		for (var c in colors) {
			Formatter.Colors[c] = Formatter.Defaults.Colors[c]
		}

		tags = tags != null ? tags : Formatter.Defaults.Formats;
		for (var f in Formatter.Defaults.Formats) {
			if (Formatter.Formats[f] == null) Formatter.Formats[f] = {};
			for (var t in Formatter.Defaults.Formats[f]) {
				Formatter.Formats[f][t] = Formatter.Defaults.Formats[f][t];
			}
		}
	},
	defaultColors:function() 
	{
		Formatter.Colors = {};
		for (var c in Formatter.Defaults.Colors) {
			Formatter.Colors[c] = Formatter.Defaults.Colors[c]
		}
	},
	defaultFormat:function(format) {
		if (format != null) {
			Formatter.Formats[format] = {};
			for (var t in Formatter.Defaults.Formats[format]) {
				Formatter.Formats[format][t] = Formatter.Defaults.Formats[format][t];
			}
		}
		else {
			for (var f in Formatter.Defaults.Formats) {
				Formatter.Formats[f] = {};
				for (var t in Formatter.Defaults.Formats[f]) {
					Formatter.Formats[f][t] = Formatter.Defaults.Formats[f][t];
				}
			}
		}
	},
	updateTag:function(tag, value) { Formatter.get()[tag] = value; },
	Colors: {},
	Formats: {},
	Defaults: {
		Colors: {
			"scene"     : '0000CC',
			"attacking" : 'C00000',
			"defending" : '00CC00',
			"left"      : '000000',
			"lost"      : 'FF0000',
			"victor"    : '0000CC',
			"events"    : '444444'
		},
		Formats: {
			"ajaxchat" : { 
				open	: '[', 		close	: ']', 			separator	: '─', 
				center	: '{TEXT}',
				color	: '[color={COLOR}]{TEXT}[/color]', 	
				bold	: '{TEXT}', 
				font	: '[code]{TEXT}[/code]', 
				link	: '[url={LINK}]{TEXT}[/url]',
		 		image	: '[img]{IMAGE}[/img]', 
				size 	: '{TEXT}' 
			},
			"bbcode"  : {  
				open	: '[', 		close	: ']', 			separator	: '─', 
				center	: '[align=center]{TEXT}[/align]',
				color	: '[color=#{COLOR}]{TEXT}[/color]', 
				bold	: '[b]{TEXT}[/b]', 
				font	: '[font={FONT}]{TEXT}[/font]', 
				link	: '[url={LINK}]{TEXT}[/url]', 
				image	: '[img]{IMAGE}[/img]', 
				size	: '{TEXT}' 
			},
			"circular" : { 
				open	: '&lt;',	close 	: '&gt;',		separator	: '─', 
				center	: '&lt;div style="text-align: center"&gt;{TEXT}&lt;/div&gt;', 
				color	: '&lt;span style="color: #{COLOR}"&gt;{TEXT}&lt;/span&gt;', 
				bold	: '&lt;b&gt;{TEXT}&lt;/b&gt;', 
				font	: '&lt;span style="font-family: {FONT}"&gt;{TEXT}&lt;/span&gt;', 
				link	: '&lt;a href="{LINK}"&gt;{TEXT}&lt;/a&gt;', 
				image	: '&lt;img src="{IMAGE}" /&gt;', 
				size	: '{TEXT}' 
			},
			"html" : { 
				open	: '<',	close 	: '>',		separator	: '─', 
				center	: '<div style="text-align: center">{TEXT}</div>', 
				color	: '<span style="color: #{COLOR}">{TEXT}</span>', 
				bold	: '<b>{TEXT}</b>', 
				font	: '<span style="font-family: {FONT}">{TEXT}</span>', 
				link	: '<a href="{LINK}">{TEXT}</a>', 
				image	: '<img src="{IMAGE}" />', 
				size	: '{TEXT}' 
			},
			"plaintext" : {  
				open	: '[', 		close	: ']', 			separator	: '-', 
				center	: '{TEXT}', 
				color	: '{TEXT}', 
				bold	: '{TEXT}', 
				font	: '{TEXT}', 
				link	: '{TEXT}: {LINK} ', 
				image	: '', 
				size	: '{TEXT}' 
			}
		}
	},
	AddAlignment:function(text)  		{ return Formatter.get().center.replace(/{TEXT}/g, text); },
	AddBold     :function(text) 		{ return Formatter.get().bold.replace(/{TEXT}/g, text); },
	AddFont     :function(text, font) 	{ return Formatter.get().font.replace(/{FONT}/g, font).replace(/{TEXT}/g, text); },
	AddLink     :function(text, link) 	{ return Formatter.get().link.replace(/{LINK}/g, link).replace(/{TEXT}/g, text); },
	AddSize     :function(text, size) 	{ return Formatter.get().size.replace(/{SIZE}/g, size).replace(/{TEXT}/g, text); },
	AddColor:function(text, color) { 
		if (Formatter.colorize && color != '') 
			return Formatter.get().color.replace(/{COLOR}/g, color).replace(/{TEXT}/g, text); 
		return text; 
	},
	AddImage:function(image) { 
		if (Formatter.images)
			return Formatter.get().image.replace(/{IMAGE}/g, image); 
		return '';
	},
	AddSeparator:function(count) {
		var text = "";
		for (var c = 0; c < count; c++)
			text += Formatter.get().separator;
		return text;
	},
	PadString:function(dir, str, len, c, color) {
		str += "";
		var pad = '';
		var numChars = 0;
		var count = true;
		for(i = 0; i < str.length; i++) 
		{
			if (str.substr(i, Formatter.get().open.length) == Formatter.get().open )   
			{ 
				count = false; 
				i += Formatter.get().open.length - 1; 
			}
			if (count == true) numChars++;
			if (str.substr(i, Formatter.get().close.length) == Formatter.get().close ) 
			{ 
				count = true;  
				i += Formatter.get().close.length - 1; 
			}
		}
		for(i = 0; i < len - numChars; i++) 
		{ 
			pad += c; 
		}
		if (str != '') str = Formatter.AddColor(str, color);
		return (dir == "left") ? pad + str : str + pad;
	},
	ReplaceColors:function(report) { 
		if (this.format == "ajaxchat") {
			report = report.replace(/UNITLOST/g,    'red');
			report = report.replace(/ATTACKING/g,   'red');
			report = report.replace(/DEFENDING/g,   'green');
			report = report.replace(/UNITRESERVE/g, 'gray');
		}
		else {
			report = report.replace(/UNITLEFT/g,    Settings.get('crColorsLeft'));		//Formatter.Colors["left"]);
			report = report.replace(/UNITLOST/g,    Settings.get('crColorsLost'));		//Formatter.Colors["lost"]);
			report = report.replace(/UNITRESERVE/g, Settings.get('crColorsLeft'));		//Formatter.Colors["left"]);
			report = report.replace(/ATTACKING/g,   Settings.get('crColorsAttackers'));	//Formatter.Colors["attacking"]);
			report = report.replace(/DEFENDING/g,   Settings.get('crColorsDefenders'));	//Formatter.Colors["defending"]);
			report = report.replace(/HEADER/g,      Settings.get('crColorsScene'));		//Formatter.Colors["scene"]);
			report = report.replace(/VICTOR/g,      Settings.get('crColorsVictor'));	//Formatter.Colors["victor"]);
			report = report.replace(/EVENTS/g,      Settings.get('crColorsScene'));		//Formatter.Colors["events"]);
		}
		return report;
	}
}

MessageFormatter = {
	init:function() 
	{
		switch($('body').attr('id'))
		{
			case 'diplomacyAdvisor':
			case 'diplomacyAdvisorOutBox':
				MessageFormatter.parseMessages();
			break;
			default: break;
		}
	},
	format:function(html)
	{
		return '&lt;MessageFormatter&gt;' + html + '&lt;/MessageFormatter&gt;';
	},
	validHTML: [
		/&lt;div style=([\'"])text-align:\s*(center|left|right)\1&gt;/i,
		/&lt;\/div&gt;/i,
		/&lt;b&gt;/i,
		/&lt;\/b&gt;/i,
		/&lt;strong&gt;/i,
		/&lt;\/strong&gt;/i,
		/&lt;i&gt;/i,
		/&lt;\/i&gt;/i,
		/&lt;em&gt;/i,
		/&lt;\/em&gt;/i,
		/&lt;br\s*\/?&gt;/i,
		/&lt;span\s+style=([\'"])font-family:[a-z0-9 \-]*\1&gt;/i,
		/&lt;\/span&gt;/i,
		/&lt;span\s+style=([\'"])color: #[a-f0-9]{6}\1&gt;/i,
		/&lt;span\s+style=([\'"])color: #UNITRESERVE\1&gt;/i,	// temporary, leave in for a few weeks to clear out old report errors
		/&lt;a\s+href=([\'"])(http|ftp|https):\/\/[\w-_]+(\.[\w-_]+)+([\w-\.,@?^=%&amp;:/~\+#]*[\w-\@?^=%&amp;/~\+#])?\1&gt;/i,
		/&lt;\/a&gt;/i,
		/&lt;img(?:\s+(?:src|width|height)=([\'"])(?:(?:http|ftp|https):\/\/[\w-_]+(?:\.[\w-_]+)+(?:[\w-\.,@?^=%&amp;:/~\+#]*[\w-\@?^=%&amp;/~\+#])?|\d+px)\1)*\s*\/?&gt;/i,
		/&lt;xmp&gt;/i,
		/&lt;\/xmp&gt;/i
	],
	parseMessages:function() 
	{
		$("td.msgText div").each(function() {
			var that = $(this);
			that.html(that.html().replace(/&amp;/g, '&')
						.replace(/&lt;MessageFormatter&gt;/g, '<MessageFormatter>')
						.replace(/&lt;\/MessageFormatter&gt;/g, '</MessageFormatter>')); 
			$("MessageFormatter", this).each(function() {
				var that = $(this);
				var html = that.html();
				for (var i = 0; i < MessageFormatter.validHTML.length; i++) {
					var regex = MessageFormatter.validHTML[i];
					while ((text = html.match(regex)) !== null)
						html = html.replace(text[0], '<' + text[0].replace(/^&lt;|&gt;$/g, '') + '>');
				}
				that.html(html);
			});
		});
	}
}

IkaTools.addOptionsLink(Config.scriptName);
Language.init();
Converter.init($("body").attr("id"), $("body"));
MessageFormatter.init();
PlunderUtils.init();
