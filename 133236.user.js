// ==UserScript==
// @name           Ikariam CR Converter
// @namespace      holyschmidt
// @author         holyschmidt (http://userscripts.org/users/50784)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/50784
// @description    Easily Convert Combat Reports for forum viewing.
// @downloadURL    https://userscripts.org/scripts/source/133236.user.js
// @updateURL      https://userscripts.org/scripts/source/133236.meta.js
// @version        4.04
// @include        http://s*.ikariam.*/index.php*
// @include        http://m*.ikariam.*/index.php*
// @require        http://board.lv.ikariam.com/index.php?page=Attachment&attachmentID=2321
// @require        http://board.lv.ikariam.com/index.php?page=Attachment&attachmentID=2316
// @require        http://board.lv.ikariam.com/index.php?page=Attachment&attachmentID=2317
// @require        http://board.lv.ikariam.com/index.php?page=Attachment&attachmentID=2322 
// @require        http://board.lv.ikariam.com/index.php?page=Attachment&attachmentID=2320
// @require        http://board.lv.ikariam.com/index.php?page=Attachment&attachmentID=2319
// @require        http://board.lv.ikariam.com/index.php?page=Attachment&attachmentID=2318
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
//
// ==/UserScript==

VERSION = "4.04";

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
	"Opcijas":{
		html:'<p>Kaujas atskaites konvertēšanas iestatījumi.</p>',
		fields:{
			convertFormat:{
				type:"select",
				label:"Formāts",
				options:{
					"ajaxchat":"ajaxchat",
					"bbcode":"bbcode",
					"html":"html",
					"plaintext":"plaintext",
				},
				text:'Izejas formāts konvertētajai kaujas atskaitei',
				value:"plaintext",
			},
			enableColor: { type:'checkbox', label:'Krāsa', text:'vai atskaitē izmantot krāsas?', value:true },
			enableEvents: { type:'checkbox', label:'Notikumi', text:'vai atskaitē rādīt notikumus?', value:true },
			enableImages: { type:'checkbox', label:'Attēli', text:'vai atskaitē rādīt attēlus?', value:true },
			enableSpoiler: { type:'checkbox', label:'Spoilera tagi', text:'vai ievietot atskaiti spoilera tagos?', value:true },
			crColorsScene: { type:"text", label:"Kaujas vieta", text:'kaujas vietas krāsa', value:"000070" },
			crColorsAttackers: { type:"text", label:"Uzbrucēji", text:'uzbrūkošo vienību krāsa', value:"700000" },
			crColorsDefenders: { type:"text", label:"Aizsargātāji", text:'aizsargājoši vienību krāsa', value:"007000" },
			crColorsLeft: { type:"text", label:"Palikušās vienības", text:'atlikušo vienību krāsa', value:"000000" },
			crColorsLost: { type:"text", label:"Zaudētās vienības", text:'zaudēto vienību krāsa', value:"A00000" },
			crColorsVictor: { type:"text", label:"Uzvarētājs", text:'uzvarētāja krāsa', value:"000070" },
			crColorsEvents: { type:"text", label:"Notikumi", text:'notikumu krāsa', value:"444444" },
		},
	},
	"Par...":{
		html:'	<p>' +
				'<a href="http://userscripts.org/scripts/show/133236" target="_blank" style="font-weight:bold !important;">' + 
				Config.scriptName + ' v' + VERSION + '</a> by <a href="http://userscripts.org/users/holyschmidt" target="_blank">holyschmidt</a>\
				<p>Skripts analzē kaujas atskaites detaļas (atlikušās / zaudētās vienības, resursus, uzvarētājus u.c.) un konvertē atskaiti attēlojamā formātā.</p>',
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
					'<span id="ikcrcSettings" title="Rādīt / Slēpt iestatījumu logu">Iestatījumi</span>Ikariam kaujas atskaišu konvertētājs' + '</h3>' + 
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
			'<input name="enableColor" id="check_colors" type="checkbox" ' + ena_color + '/>&nbsp;Krāsa&nbsp;&nbsp;' +
			'<input name="enableEvents" id="check_events" type="checkbox" ' + ena_events + '/>&nbsp;Notikumi&nbsp;&nbsp;' +
			'<input name="enableImages" id="check_images" type="checkbox" ' + ena_images + '/>&nbsp;Attēli&nbsp;&nbsp;' +
			'<input name="enableSpoiler" id="check_spoiler" type="checkbox" ' + ena_spoiler + '/>&nbsp;Spoileri&nbsp;&nbsp;' +
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
		report = report.replace(/UNITLOST/g,    'red');
		report = report.replace(/ATTACKING/g,   'red');
		report = report.replace(/DEFENDING/g,   'green');
		report = report.replace(/UNITRESERVE/g, 'gray');
	}
	else {
		report = report.replace(/UNITLEFT/g,    Settings.get('crColorsLeft'));
		report = report.replace(/UNITLOST/g,    Settings.get('crColorsLost'));
		report = report.replace(/UNITRESERVE/g, Settings.get('crColorsLeft'));
		report = report.replace(/ATTACKING/g,   Settings.get('crColorsAttackers'));
		report = report.replace(/DEFENDING/g,   Settings.get('crColorsDefenders'));
		report = report.replace(/HEADER/g,      Settings.get('crColorsScene'));
		report = report.replace(/VICTOR/g,      Settings.get('crColorsVictor'));
		report = report.replace(/EVENTS/g,      Settings.get('crColorsScene'));
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
					AjaxWatchdog('militaryAdvisorDetailedReportView', function() { 
						CrcConverter.createReport();
					});
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