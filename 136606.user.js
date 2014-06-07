/**
// ==UserScript==
// @id             ikariamhighscoreutilities@narulez
// @name           Ikariam Highscore Utilities
// @namespace      Narulez
// @author         Narulez
// @author         holyschmidt
// @contributor    Black Widow
// @translator     Narulez (Italiano, Italian; English, English)
// @translator     holyschmidt (English, English)
// @translator     Black Widow (Русский, Russian)
// @translator     Jojok (انگليسي, Persian)
// @translator     Walking Tombstone (Türkçe, Turkish)
// @translator     Bier Baron (Deutsch, German)
// @translator     MAŁY001 (Polski, Polish)
// @translator     Sracz66 (Magyar, Hungarian)
// @translator     HéliΩGraph (Français, French)
// @translator     Ove (Română, Romanian)
// @translator     G.Callen (Ελληνικά, Greek)
// @translator     IvoAndr (Български, Bulgarian)
// @translator     elm10 (انگليسي, Persian)
// @translator     rada974 (Español, Spanish)
// @description    Collection of Highscore Utilities.
// @run-at         document-idle
// @homepageURL    http://userscripts.org/scripts/show/114431
// @supportURL     http://userscripts.org/topics/89577
// @downloadURL    https://userscripts.org/scripts/source/136606.user.js
// @updateURL      https://userscripts.org/scripts/source/136606.meta.js
// @copyright      2011+, Narulez (http://userscripts.org/users/268539)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include        http://m*.ikariam.*
// @include        http://s*.ikariam.*
// @exclude        http://board*.ikariam.*
// @exclude        http://support*.ikariam.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        https://userscripts.org/scripts/source/136600.user.js
// @require        https://userscripts.org/scripts/source/136604.user.js
// @require        https://userscripts.org/scripts/source/136605.user.js
// @screenshot     http://s3.amazonaws.com/uso_ss/14030/large.png?1317536996
// @screenshot     http://s3.amazonaws.com/uso_ss/14031/large.png?1317537078
// @screenshot     http://s3.amazonaws.com/uso_ss/14032/large.png?1317537106
// @version        0.22
// @history        0.22 Added Spanish translation, thanks to Rada974.
// ==/UserScript==
**/
try {
/*global ScriptUpdater, Config, GM_addStyle, $, IkaTools, top */
var ver = '0.22';
ScriptUpdater.check(136606, ver);
Config.scriptName = "Highscore Utilities v" + ver;
Config.tabs = {
	"Quicklinks": {
		html: '<p>Which highscore types do you want quicklinks created for?</p>',
		fields: {},
	},
	"Opt": {
		fields: {
			separate0: { type: 'html', },
			langd: { type: 'html', },
			lang: {
				type: 'select',
				options: {},
				label: 'Force language',
				value: 'none',
			},
			separate: { type: 'html', },
			defplayerdescr: { type: 'html', },
			defplayer: {
				type: 'select',
				options: {},
				label: 'Player score type',
				value: 'army_score_main',
			},
			lastplayer: {
				type: 'select',
				options: {},
				tip: 'hide_me',
				value: 'none',
			},
			lastplayer2: {
				type: 'checkbox',
				label: 'Save last used',
				value: true,
			},
		},
	},
	"History": {
		fields: {},
		log: {
			'0.22': ["Better languages multi-server management.", "Added Spanish translation, thanks to Rada974."],
			'0.21': ["Added Greek translation, thanks to G.Callen."],
			'0.20': ["Minor changes", "Tweak (FF with Scriptish) for options window that sometimes doesn't open.", "Updated Persian translation, thanks to elm10.", "Added Bulgarian translation, thanks to IvoAndr."],
			'0.19': ["Fixed flyout hovered by windows.", "Improved meta tags for Scriptish compatibility.", "Updated license and dependencies.", "Better and faster way to show the links on island view (FF, Opera and IE 9).", "Changed default showed links on island view.", "Added Romanian translation, thanks to Ove.", "Added French translation, thanks to HéliΩGraph."],
			'0.18': ["Fixed small bug on last selected search type.", "Fixed alliances search.", "Changed default player search: now if you don't type anything, it'll show your position.", "Changed small css, thanks to Black Widow.", "Updated Russian translation, thanks to Black Widow.", "Added Polish translation, thanks to MAŁY001.", "Added Hungarian translation, thanks to Sracz66."],
			'0.17': ["Fixed small css.", "Added German translation, thanks to Bier Baron."],
			'0.16.1': "Removed new tab function (It was buggy with 0.5).",
			'0.16': "Fixed for Ikariam v0.5+",
			'0.15': "Added Persian & Turkish.",
			'0.14': ["Minor improvements and changes.", "Fixed bug deleting last selected highscore type.", "Option for save or not last selected. Default true."],
		},
		version: function (v) {
			return "<span style='font-weight: bold !important;'>" + v + "</span>";
		},
		history: function (c) {
			var r, i;
			r = "<ul style='margin-left: 1.95em !important; margin-top: -0.5em !important;'>";
			if (typeof (c) === 'string') { return r + "<li>" + c + "</li></ul>"; }
			i = c.length;
			while (i--) { r += "<li>" + c[i] + "</li>"; }
			return r + "</ul>";
		},
	},
};
(function () {
	var vers;
	for (vers in Config.tabs.History.log) {
		if (Config.tabs.History.log.hasOwnProperty(vers)) {
			Config.tabs.History.fields[vers] = {type: 'html', value: Config.tabs.History.version(vers), };
			Config.tabs.History.fields[vers + 'a'] = {type: 'html', value: Config.tabs.History.history(Config.tabs.History.log[vers]), };
		}
	}
	delete Config.tabs.History.log;
	delete Config.tabs.History.version;
	delete Config.tabs.History.history;
}());
var HighscoreUtilities = {
	init: function () {
		var is_chrome = /Chrome/i.test(navigator.userAgent),
			is_ff = /Firefox/i.test(navigator.userAgent),
			is_ie = /MSIE/i.test(navigator.userAgent),
			is_o = /Opera/i.test(navigator.userAgent),
			is_safari = /Safari/i.test(navigator.userAgent),
			ieversion;
		if (is_ie && /MSIE (\d+\.\d+);/i.test(navigator.userAgent)) { //test for MSIE x.x;
			ieversion = Number(RegExp.$1);
		}

		GM_addStyle(String() +
			'#GF_toolbar ul li.highscore { position:relative; }' +
			'#GF_toolbar ul li.highscore:hover { padding-bottom:20px; }' +
			'#GF_toolbar ul li.highscore #IkaHighscoreFlyout { display:none !important; }' +
			'#GF_toolbar ul li.highscore:hover #IkaHighscoreFlyout { display:block !important;  }' +
			'#IkaHighscoreFlyout { background-color:#FFF5E1; padding:.5em; padding-bottom:0; border:1px solid #666; position:absolute; right:-80px; margin-top:2px; width:auto; z-index: 4000 !important;}' +
			'#IkaHighscoreFlyout h1.header { font-size:14px; font-weight:bold; margin-left:0; padding-left:.2em; display:block; margin-bottom:.5em; }' +
			'#IkaHighscoreFlyout table { margin:3px; }' +
			'#IkaHighscoreFlyout tr { height:30px; }' +
			'#IkaHighscoreFlyout input { margin-left:2px; }' +
			'.IkaHighscoreLink img { width:15px; height:15px; }' +
			'tr[title="hide_me"] { display: none !important; }' +
			'#configInput_lang .IHU.mmoflag {background: url("http://gameforge.com/img/mmoflags.png") no-repeat scroll 0 0 transparent; height: 14px !important; padding-left: 23px;} .mmo_AE {background-position: left 0 !important;} .mmo_AR {background-position: left -14px !important;} .mmo_BE {background-position: left -28px !important;} .mmo_BG {background-position: left -42px !important;} .mmo_BR {background-position: left -56px !important;} .mmo_BY {background-position: left -70px !important;} .mmo_CA {background-position: left -84px !important;} .mmo_CH {background-position: left -98px !important;} .mmo_CL {background-position: left -112px !important;} .mmo_CN {background-position: left -126px !important;} .mmo_CO {background-position: left -140px !important;} .mmo_CZ {background-position: left -154px !important;} .mmo_DE {background-position: left -168px !important;} .mmo_DK {background-position: left -182px !important;} .mmo_EE {background-position: left -196px !important;} .mmo_EG {background-position: left -210px !important;} .mmo_EN {background-position: left -224px !important;} .mmo_ES {background-position: left -238px !important;} .mmo_EU {background-position: left -252px !important;} .mmo_FI {background-position: left -266px !important;} .mmo_FR {background-position: left -280px !important;} .mmo_GR {background-position: left -294px !important;} .mmo_HK {background-position: left -308px !important;} .mmo_HR {background-position: left -322px !important;} .mmo_HU {background-position: left -336px !important;} .mmo_ID {background-position: left -350px !important;} .mmo_IL {background-position: left -364px !important;} .mmo_IN {background-position: left -378px !important;} .mmo_INTL {background-position: left -392px !important;} .mmo_IR {background-position: left -406px !important;} .mmo_IT {background-position: left -420px !important;} .mmo_JP {background-position: left -434px !important;} .mmo_KE {background-position: left -448px !important;} .mmo_KR {background-position: left -462px !important;} .mmo_LT {background-position: left -476px !important;} .mmo_LV {background-position: left -490px !important;} .mmo_ME {background-position: left -504px !important;} .mmo_MK {background-position: left -518px !important;} .mmo_MX {background-position: left -532px !important;} .mmo_NL {background-position: left -546px !important;} .mmo_NO {background-position: left -560px !important;} .mmo_PE {background-position: left -574px !important;} .mmo_PH {background-position: left -588px !important;} .mmo_PK {background-position: left -602px !important;} .mmo_PL {background-position: left -616px !important;} .mmo_PT {background-position: left -630px !important;} .mmo_RO {background-position: left -644px !important;} .mmo_RS {background-position: left -658px !important;} .mmo_RU {background-position: left -672px !important;} .mmo_SE {background-position: left -686px !important;} .mmo_SI {background-position: left -700px !important;} .mmo_SK {background-position: left -714px !important;} .mmo_TH {background-position: left -728px !important;} .mmo_TR {background-position: left -742px !important;} .mmo_TW {background-position: left -756px !important;} .mmo_UA {background-position: left -770px !important;} .mmo_UK {background-position: left -784px !important;} .mmo_US {background-position: left -798px !important;} .mmo_VE {background-position: left -812px !important;} .mmo_VN {background-position: left -826px !important;} .mmo_YU {background-position: left -840px !important;} .mmo_ZA {background-position: left -854px !important;} .mmo_WW {background-position: left -392px !important;}' +
			String());

		HighscoreUtilities.AddHighscoreOptions();

		Config.preloadData();

		HighscoreUtilities.AddFlyout();

		// Attach island listener(s)
		if ($('body').attr('id') === 'island') {
			if (!document.getElementById('sidebar')) {$('#container').append('<div id="sidebar"></div>'); }
			if (is_ff || (is_ie && ieversion >= 9) || is_o) {
				HighscoreUtilities.loadingMod(function () {HighscoreUtilities.UpdateCityInformationWindow(); });
			} else if (is_chrome || (is_ie && ieversion >= 9) || is_safari) {
				document.getElementById('sidebar').addEventListener("DOMNodeInserted", function () {HighscoreUtilities.UpdateCityInformationWindow(); }, false);
			}
			// Set timeout to exercise update, in case city selection was made during onload
			setTimeout(function () {HighscoreUtilities.UpdateCityInformationWindow(); }, 500);
		}
		// Create options link
		IkaTools.addOptionsLink(Config.scriptName);
	},
	loadingMod: function (func) {
		if (document.getElementById('loadingPreview')) {
			document.getElementById('loadingPreview').addEventListener("DOMAttrModified", function () {
				if (document.getElementById('loadingPreview').style.display == 'none') {
					func();
				}
			}, false);
		}
	},
	AddHighscoreOptions: function () {
		Array.prototype.contains = function (c) { var e = this.length; while (e--) { if (this[e] === c) { return true; } } return false; };
		var type, lang, val, name, domain_hostMatch, domain, ln, force = Config.get('lang');
		domain_hostMatch = /(s\d+)(\.([a-z]+))?\.ikariam(\.[a-z]+)?\.([a-z]+)/i.exec(top.location.host);
		domain = (domain_hostMatch ? (domain_hostMatch[3] || domain_hostMatch[5]) : false) || 'org';
		ln = (HighscoreUtilities.Langs[force]) ? force : domain;
		for (lang in HighscoreUtilities.Langs) {
			if (HighscoreUtilities.Langs.hasOwnProperty(lang) && lang.split(',').contains(ln)) {
				for (type in HighscoreUtilities.Langs[lang]) {
					if (HighscoreUtilities.Langs[lang].hasOwnProperty(type)) {HighscoreUtilities.Text[type] = HighscoreUtilities.Langs[lang][type]; }
				}
				Config.tabs.Quicklinks.html = "<p>" + HighscoreUtilities.Text.desc_quick + "</p>";
				Config.footerHtml = '<span style="font-size:.9em;">' + HighscoreUtilities.Text.note + '</span>';
			}
		}
		// Quicklinks Tab
		Config.tabs.Quicklinks.name = HighscoreUtilities.Text.quicklinks;
		for (type in HighscoreUtilities.Images) {
			if (HighscoreUtilities.Images[type] !== null) {
				val = true;
				switch (type) {
					case 'score':
					case 'building_score_main':
					case 'research_score_main':
					case 'army_score_main':
					case 'trader_score_secondary':
						val = false;
						break;
					default:
						val = true;
						break;
				}
				Config.tabs.Quicklinks.fields[type] = {
					type	: 'checkbox',
					label	: HighscoreUtilities.Text[type],
					value	: val,
				};
			}
		}
		// Options Tab
		Config.tabs.Opt.name = HighscoreUtilities.Text.options;
		//  - Langs
		Config.tabs.Opt.fields.separate0.value = '<div style="margin-left: -2em !important; width: 500px !important;"><p style="text-align: center; font-weight: bold !important; text-decoration: underline !important;">' + HighscoreUtilities.Text.lang + '</p></div>';
		Config.tabs.Opt.fields.langd.value = '<div style="margin-left: -2em !important;">' + HighscoreUtilities.Text.lang_found + ': <span style="font-weight: bold !important; color:green;">' + HighscoreUtilities.Text.lang_name + " (" + HighscoreUtilities.Text.orlang_name + ")" + ((domain !== force) ? (force !== "none") ? '</span> - <span style="font-weight: bold !important;color:red; text-decoration: underline !important;">' + HighscoreUtilities.Text.forced : ' ' : '') + ' (' + domain + ')</span></br>' + HighscoreUtilities.Text.tls + ': <span style="font-weight: bold !important; color:#999;">' + HighscoreUtilities.Text.translator + '</span></div>';
		Config.tabs.Opt.fields.lang.label = HighscoreUtilities.Text.lang_tip;
		Config.tabs.Opt.fields.lang.options[HighscoreUtilities.Text.lang_sel] = 'none';
		for (name in HighscoreUtilities.Langs) {
			if (HighscoreUtilities.Langs.hasOwnProperty(name) && HighscoreUtilities.Langs[name].hasOwnProperty('lang_name') && HighscoreUtilities.Langs[name].lang_name != '' && HighscoreUtilities.Langs[name].hasOwnProperty('orlang_name') && HighscoreUtilities.Langs[name].orlang_name != '') {
				Config.tabs.Opt.fields.lang.options[HighscoreUtilities.Langs[name].lang_name + ' (' + HighscoreUtilities.Langs[name].orlang_name + ')'] = name;
			}
		}
		//  - Default Player Score Selected
		Config.tabs.Opt.fields.separate.value = '<div style="margin-left: -2em !important; width: 500px !important;"><hr style="background: #000000;"/><br/><p style="text-align: center; font-weight: bold !important; text-decoration: underline !important;">' + HighscoreUtilities.Text.dpp + '</p></div>';
		Config.tabs.Opt.fields.defplayerdescr.value = '<div style="margin-left: -2em !important;">' + HighscoreUtilities.Text.pl_st_d + '</div>' +
			((Config.get('lastplayer2')) && (Config.get('lastplayer')) && (Config.get('lastplayer') !== 'none') ? '<div style="margin-left: -2em !important;">' + HighscoreUtilities.Text.pl_st_s + ': <span style="font-weight: bold !important; color:blue;">' + HighscoreUtilities.Text[Config.get('lastplayer')] + '.</span></a></div>' : '');
		Config.tabs.Opt.fields.defplayer.label = HighscoreUtilities.Text.pl_st_l;
		for (type in HighscoreUtilities.Images) {
			if (HighscoreUtilities.Images.hasOwnProperty(type)) {Config.tabs.Opt.fields.defplayer.options[HighscoreUtilities.Text[type]] = type; }
		}
		Config.tabs.Opt.fields.lastplayer2.label = HighscoreUtilities.Text.pl_ls_l;
		// History Tab
		Config.tabs.History.name = HighscoreUtilities.Text.history;
		// About Tab
		Config.tabs.About = {
			html: "<p><a style='font-weight:bold !important;' target='_blank' href='http://userscripts.org/scripts/show/114431'>Ikariam Highscore Utilities v" + ver + "</a>" +
				" by <a target='_blank' href='http://userscripts.org/users/holyschmidt'>holyschmidt</a> and <a target='_blank' href='http://userscripts.org/users/268539'>Narulez</a></p>" +
				"<p>" + HighscoreUtilities.Text.desc + "</p>" +
				"<hr style='background: #000000;'/><br/>" +
				"<p>" + HighscoreUtilities.Text.bug[0] + " <a target='_blank' href='http://userscripts.org/topics/89577'>" + HighscoreUtilities.Text.bug[1] + "</a>" + HighscoreUtilities.Text.bug[2] + "</p>" +
				"<p>" + HighscoreUtilities.Text.sugg[0] + " <a target='_blank' href='http://userscripts.org/topics/89576'>" + HighscoreUtilities.Text.sugg[1] + "</a>" + HighscoreUtilities.Text.sugg[2] + "</p>" +
				"<p>" + HighscoreUtilities.Text.clang[0] + " <a target='_blank' href='http://userscripts.org/topics/89579'>" + HighscoreUtilities.Text.clang[1] + "</a> " + HighscoreUtilities.Text.clang[2] + "</p>",
		};
		Config.tabs.About.name = HighscoreUtilities.Text.about;
	},
	AddFlyout: function () {
		var last = Config.get('lastplayer'), last2 = Config.get('lastplayer2'), def = Config.get('defplayer'), lst, sel, opts, type;
		lst = ((last2) && (last) && (last !== 'none'));
		sel = 'selected="selected"';
		for (type in HighscoreUtilities.Images) {
			if (HighscoreUtilities.Images.hasOwnProperty(type)) {opts += '<option ' + ((lst) ? ((last === type) ? sel : '') : ((def === type) ? sel : '')) + 'value="' + type + '">' + HighscoreUtilities.Text[type] + '</option>'; }
		}
		$('#GF_toolbar ul li.highscore').append(String() +
			'<div id="IkaHighscoreFlyout">' +
				'<h1 class="header" style="line-height: 20px;">' + HighscoreUtilities.Text.high_play + '</h1>' +
				'<form onsubmit="ajaxHandlerCallFromForm(this);return false;" method="POST" id="HighscoreUtilities_Player">' +
					'<input type="hidden" name="view" value="highscore" /><input name="activeTab" type="hidden" value="tab_highscore" /><input name="offset" type="hidden" value="-1" />' +
					'<table>' +
					'<tr><td><select name="highscoreType">' + opts + '</select>' +
					((last2) ? '<img title="' + HighscoreUtilities.Text.dellast + '" id="dellast" style="position: absolute; margin-top: 5px;" src="' + Config.icons.close + '" />' : '') +
					'</td></tr>' +
					'<tr><td>' + HighscoreUtilities.Text.pl_name + ' <input type="text" name="searchUser" value="" /></td></tr>' +
					'<tr><td>' +
						'<input type="checkbox" value="1" name="searchOnlyFriends" id="searchOnlyFriendsFly"><label for="searchOnlyFriendsFly"> ' + HighscoreUtilities.Text.only_friends + '</label><br>' +
						'<input type="checkbox" value="1" name="searchOnlyAllies" id="searchOnlyAlliesFly"><label for="searchOnlyAlliesFly"> ' + HighscoreUtilities.Text.only_ally + '</label>' +
					'</td></tr>' +
					'<tr><td><input class="button" name="sbm" type="submit" value="' + HighscoreUtilities.Text.sub + '" /></td></tr>' +
					'</table>' +
				'</form>' +
				'<hr' + ((last2) ? ' style="padding-right: 125px;"' : '') + '>' +
				'<h1 class="header" style="line-height: 20px;">' + HighscoreUtilities.Text.high_ally + '</h1>' +
				'<form onsubmit="ajaxHandlerCallFromForm(this);return false;" method="POST" id="HighscoreUtilities_Ally">' +
					'<input type="hidden" name="view" value="highscoreAlly" /><input name="activeTab" type="hidden" value="tab_highscoreAlly" /><input name="offset" type="hidden" value="0" />' +
					'<table>' +
					'<tr><td><select name="highscoreType">' +
						'<option value="score">' + HighscoreUtilities.Text.score_ally + '</option>' +
						'<option value="avg_score">' + HighscoreUtilities.Text.av_ally + '</option>' +
					'</select></td></tr>' +
					'<tr><td>' + HighscoreUtilities.Text.name_ally + ': <input type="text" name="searchAlliance" value="" /></td></tr>' +
					'<tr><td>' + HighscoreUtilities.Text.tag_ally + ': <input type="text" name="searchAllianceTag" value="" /></td></tr>' +
					'<tr><td><input class="button" name="smb" type="submit" value="' + HighscoreUtilities.Text.sub + '" /></td></tr>' +
					'</table>' +
				'</form>' +
			'</div>' +
			String());
		$('#GF_toolbar').on('mouseenter', 'li.highscore', function () {
			$('#GF_toolbar').css('z-index', 65536);
		});
		$('#GF_toolbar').on('mouseleave', 'li.highscore', function () {
			$('#GF_toolbar').css('z-index', '');
		});
		if (last2) {
			$('#IkaHighscoreFlyout form')[0].addEventListener('submit', function () {
				var node = $('#IkaHighscoreFlyout form:has(input[value="highscore"]) select option:selected')[0];
				if (node.selected) {
					Config.set('lastplayer', node.value); 
					Config.tabs.Opt.fields.defplayerdescr.value = '<div style="margin-left: -2em !important;">' + HighscoreUtilities.Text.pl_st_d + '</div>' +
						((Config.get('lastplayer2')) && (Config.get('lastplayer')) && (Config.get('lastplayer') !== 'none') ? '<div style="margin-left: -2em !important;">' + HighscoreUtilities.Text.pl_st_s + ': <span style="font-weight: bold !important; color:blue;">' + HighscoreUtilities.Text[Config.get('lastplayer')] + '.</span></a></div>' : '');
				}
			});
			$('#IkaHighscoreFlyout #dellast').click(function () {
				Config.set('lastplayer', 'none');
				Config.tabs.Opt.fields.defplayerdescr.value = '<div style="margin-left: -2em !important;">' + HighscoreUtilities.Text.pl_st_d + '</div>';
				$('#IkaHighscoreFlyout form:has(input[value="highscore"]) select option[value="' + Config.get('defplayer') + '"]')[0].selected = true;
			});
		}
	},
	UpdateCityInformationWindow: function () {
		if ($('#HighscoreUtilities_city_high').size() == 0 && $('table.cityinfo').size() > 0 && $('#js_selectedCityOwnerName').size() > 0) {
			var type, player, links = '';
			player = $('#js_selectedCityOwnerName').text().replace(/\s+$/, '').replace(/^\s+/, '');
			for (type in HighscoreUtilities.Images) {
				if (HighscoreUtilities.Images[type] !== null && Config.get(type)) {
					links += '<a class="IkaHighscoreLink" href="?view=highscore&highscoreType=' + type + '&searchUser=' + player + '" onclick="ajaxHandlerCall(this.href);return false;">' +
						'<img style="display:inline;" src="' + HighscoreUtilities.Images[type] + '" alt="' + HighscoreUtilities.Text[type] + '" title="' + HighscoreUtilities.Text[type] + '"/>' +
						'</a>';
				}
			}
			$('table.cityinfo tbody').append('<tr id="HighscoreUtilities_city_high"><td colspan="5" style="text-align:center;">' + links + '</td></tr>');
		}
	},
	Images: {
		"score"	: null,
		"building_score_main" : 'data:image/gif;base64,R0lGODlhGQAZAMZ/AExuN9+5h9SVYvPMj7ySbMmJWzUsJOqxdVY5J5plRVhUU0o0JqYYGYdWOjYmG2pIMjlUKruyjigbFG5dSaNpR/Lmt3FoVHRNNRcCAhkmFHpVPDRLJubarlxINQAAAN3PpNGkdlQLDHmcVZeNcKZ6WWY1J4dcQGVDLishGnMQEbSGX2SHR7h5USIyGtXLyPfy6IV5dhUUDh0XE0EpHbKop4dlSpRaPC5EImdhYoGjWpt1WHanVqublLN0TkEuImWXSqtvS5lsT83CmyIBAcGAVf79yJeOilt5QF4+K5NgQjgEBD1bLRANCl6DRGpROwcSB1ZUPUhiMqqBYZt9Tqugf2MkHA4BAYR4YEU5LoBQNvzfnyIWEEBiMDMeFgMNBHZELrFtSCo+H4auXwsJB3J9U6FcPE9GOd+faXJuP4dvRVI+L/O/gE8yIqNjP45rT5VHNt/W0nGTUKJxUDBWKFN3PAYHBm+eUI1ELcW8uoqYVjMwHB0PDDw7PmuMS0xKSv///yH5BAEAAH8ALAAAAAAZABkAAAf+gH+Cg4SDER6IV4WLjH+Ijx5YjYIVWlpCg2opKQwMIVYejB8fAxMoFhY+gkFrAwdnD0whEYUqrAcCLLYkKgI+RAIXRBRAHgEBAwGCYDwaSBomJg8ISAgHTg8OUiY9MyoEBSq0QVJITkgnCAhsDihrCcAsAkljHRoXF3J/GndqHQsLZqhRg0KCgxPpCkib4WPBvweCEjBhEoPJmDp1LtZZ8ODBiQsxZIgUyUjGAw0NEiR50KNAAxRAqEwiJAPBgywNshQo08DGBg0FZhKKYDFBARZg7OwoIODAnwgvlAj9k6BljxxJ2AA5o+KFCw8uhNqgwAJAnxMejPKAgccFD6GXDxIk4BJlARMkLGgoUICD1iQhDxqc2AAhjAwhGvj42Ss0AwITXDaEaZEhgYAhJvhMpdxiiWTKWjxYCTp1w4YbYSZneDLgRAEdUytsiLOBC+obLYhcKIBJKJ0bS5aIENEkShgiCNRM/fNjQ+c4xAEoofJheZwdSyDMFtEHAITlgzpwWQJARI4dTQCAF+RADxdMCC48qb4oEAA7',
		"building_score_secondary" : 'data:image/gif;base64,R0lGODlhGQAZAMZ/AGVaSao0DvezVbBvMbVEF+fYxpaRh5aKev74xrO4refVuNrUx9WSVTEaEMQ3EJEuDKSYhde6idS7mOTKqMWoh2luKYR4ZdnGkeytd1EoGMpHF8W6quG4ivbkyfjqvamXerqjhXYqDfNiJbamU9NmPqxUKse0mLepk+VVHNhYI7upb8mmfZSHRf7nqeTEmabFspiEaqeIZunTq9XKt4l1WP//+FFrGYuFeOV3TjNGE+uYcNm0eJOrl+NKFv//5KONdv/+29eleaumlnh0WrGchMSskZZJH7WLZGtWOvnUhrmSZoeCakQZDsCddWRHKJFnQ+fGg8yxjKgBAZSVe/l5Oq6jitupZ2h4HUhCOamXWfN3F/3bktHt6kFZFm9gSqyQbryxn+jQntSugeno4eYAAF9oJXtWKfzIeMi0et3QvNubYlg9KImWeufSisy0aZG6oambQF9URPrEtfbKkfK4p9iyUPHit/bv3J1rUnh9M6i2n9+9YuuAXvbuz8Dh1P///yH5BAEAAH8ALAAAAAAZABkAAAf+gH+Cg4SFGVIBhYqLhIdkUoyRgywDT5KXfwMZmJdmA0icjANmTxkNoYJ1UGZ/dXBmIUxZoTIaIgRODQNOIQ0snCsEwgQwBxkZTHGzlxgpDDgEGjFDcV9eADSXGikaAUYDJWBrSytIH9mMKFQaGsIaYH13Yi5EIBMdD3WFLiIoBA4aHCxZ8kPBhCZrUqDoJyxFIQNCqKCgMcUMgVghMg7gIKJfjwkmIgwaMsJEHC80vtxB0QMFCTNxJoTBkeLOhiOWBNHAsgILEiReDowR8QUJiX4BSKw4ckAIjD9JCiQTEwcLli8gnjjx0s9Bjx4aFujJs8SSigIL+oTAU+LLEyyWE6ikeADQAZ4hQ8p0MRFj0AkIEzjImRBBgIAqMzT0KJHAyxIvXXJ0+fHjDwIEdppseQCFz5koQ36MwVsDJeTIlf/0iecCQQsMZ3zEgBGlCgCURD5U7fJrkI87BVpcRlBH6hAwQ7BQqHKgzBUseQoBAVKjDQd6J4R0iEHZC7UrklYg8AFEggwDN35AoNYblSA0G0bAiRQIADs%3D',
		"research_score_main" : 'data:image/gif;base64,R0lGODlhGAAVANU/AP/dZc/Ks/rIjLixsv/++25naVmPocGvnIVWNtXd0+bYyP/7u7F5UfHYonBGLSxba5FkSEZoc46Ji+Le3GUqD/386857SFAnD2ZZTk01J4R2alFMR69pPCYXD/rszHZsYP21crKVdNXFgeXq4FZ7iKGWhqqqoJuNchU6S7amdOWTWhgFBGc7IRImMTgfEtCLWU0FAH85F76FXjgpJP//2AAbLp+cnuzm0b/Ozu7u4f7tvY1FIptbMuaSZAAAAP///yH5BAEAAD8ALAAAAAAYABUAAAb/wJ9wSCQGBEhQIFFsFgMqUE/F4UluTgKh+VmxWBCIa1VynhgCGrHiwyBamEthQNT+Rp0OjFERVhA8HDIMCHNDFR4NIlt3Pj59CjsfBTEWPBg2fT8ENwIiIn0lATMrBCEFBSU2LJcaOUMjOjqfGxKbPgcBPCwXEAMDBR8TPw0KPwE6CwwaNFsmMwcsDAMOAxMZKyM/Gz5CASkLig1CHQwZGQgsJTgOFK8EPh8EGxMhIg0ADQ0rECwIEBY0SHDBIYQ3Hx22EDChIQUAFnk2uGAhqMUKBjyM/SjhY4eHLco6OMIgocCMci/+cQhwKAOMHQ6wITxAoIWGARIZvIDAg0mdgQA+XGBI4KzGHA1B/7HQSOQGBRYnhBCI0KKAgg0UXPjIcEETEQ0XMgjVguKBBAUo/M3Y2kSAChfYYAhIUOOBiQMoIsSIQQGFtkMgQLiAG4MBDhQoSHyIYIAEhg0PfA4BSKFywgR5I2xgbKAzCpZ1PmjQYGOLgQcPIkQgoVp1iwBBAAA7',
		"research_score_secondary" : 'data:image/gif;base64,R0lGODlhDQATAMQfAP/+RP/lKfPLJ/7JH/7XJo6Idf/rMv/3Ku3oN+zqz//9POrpRv//M6KahrWvluvFKpuTft68MgUGCcC4nt/HNKqiiqakl9vZT+3sVOnWMu7ZL//1NP//UMzFp/r2QAAAACH5BAEAAB8ALAAAAAANABMAAAWN4Cd+hhEExKhunrKZqaoAtGsQw7jRHKAwG1TOMPNwegxGQDAYED0XDGaBQGgizcBGsbgsqAjKo0kwJBGeswY3IAQMh+rhQGHn3AFNxkRh5kRtBA8CD2N/I02FEWMqIxYVFRAFFY0iDRMJHRANlR+RE5KUlQ0OCRMNnJUOEx0TEw6dBRAWDbKdHxK5EiohADs%3D',
		"army_score_main" : 'data:image/gif;base64,R0lGODlhFgAWALMPAPv03M+acqyJYtGzkm1HLJ9xTI5gM1IwIvPeuCQRCe3GknRgTNrKsd+hIOm4Yv///yH5BAEAAA8ALAAAAAAWABYAAATp8MkpVzpGlIAA/ZNwJeTlAB44DQRxjAnBAIqiPozQHvxBBArAIHBj+XotzrCQ+gh8u9avo+CoCtJSawAIXJoUncG38BkCA14CoRIYCIZFmbAQPOXgSaHAIxQWBhsMCAwObCABfGZJCgN1ViAMWDxYUiILAzZtLgeVBAIKPgMDNzo8OnQCc0M3BmMHqJ+qB1UqDICnLUEIGQoCkQNYFwELBQ4OxMYFH2kLCKaJe9ILyAEeAGUxDQ0FCRauflgGAAjLzy8Exw0EJSR7Alw0OAwkcAQNGiXwCA63AAwPCDnaAKrOsSAoRqEAEAEAOw%3D%3D',
		"trader_score_secondary" : 'data:image/gif;base64,R0lGODlhEQATAPfuAP7/X/7/Zv/oQv/RK/7/d/m4Bf30qP/WK//eJP2/B/7/e//BCfy9CPzot//sTvi3B/34jv//gv/5TPu6BP/5Vv//if/IHf/9Zv/dLv7/av2+Bf/tTv7+e/77f//LEP/IC//tS0UjDv/cLf/tSP7/cP7/c/7DFP7/f/7/Wf/kPPvot//mP9mbHf6/Av/ySfrdnf/uTvi4Bv/0Vfe6FP/wS//xUP/aQv/cJ5BSHfu7Bv/9a//rOvvmuf/SKv/SKP/pP//cP7+LOvvmuvrGNv/pV/zurv/8X/u/E//OJPO0E+u+Zv/yXP/gTP/3Wv/lSP/hS///hCcXDL+RQN2dIf7EG/76jvzotf/AAf7/a/3zpf/SI/31oP/VMeipDf/lO/78eP/OEP7/fv3IK6eOa+2vHvTFR//zaf/rRf74mZhqH//3Z/7JL//qTpx2P//aOv/VQfzptv7/ZP74osOsieO5Uv3wqf//i//KCWY0FbGLSq+NTmk1Ff/1TPnjtP/wRf/xRv7BDP/LHP/UMP/eQf/RJ/78hv7/eseNIP76l08oEP/wVv/IJP/rav/LJv7/dfzBF//3Vv/hN5tcIP7/bv/9Y/y8Av/7X//oSf/6ZP7/Y/3zmf/sUv/dMv73nXQ+GIBQGv3yrv75mWZLEv/XJv/3S/u7A//NGu/Jef76j++tD//OKP7EFv/fOP/tRP/iOKByJf74l//9ZN+gJP//lf/EE//1Tv/0U/u+Ef/GE/3ADPvnuP30pv/8UP/cQf/ePP/yU9qfGf/dI/7/YPXfsv/6WvzrtNaXKP/eNHpAGf/2VfHZnv/ZN//6UvrkuvO2GvvNVcu5X///jv/yS//9hvrisv7/Z//hP9vBi/29Av7/af/pMv/VH/zusfzrqfa1CP/XEP/sT/75kv/2XbaKUu+vCuS4NP/mN/7/XPm4Bv/SH/nitP/WPvu8Cf/8WvvluwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAO4ALAAAAAARABMAAAj/AN0JHOiuWJYqHSDUGUaQoC4DHEYcaSSgHbQ5Dd3BCQXuGwJfFAAMsCRqDMEGiFRVWkCpggJHSHqVi3JNoBA5gmJoYGSHwIkKbgbU+KRHIChFVwDZmBUmU4YIQI5dmBLEnZVpYCys04HiHIAAWAZYiCWGjDsDpBZQWRJNQiRmk0DcIkQCwAYVhRDkMKHgjIhNnPwIYPADCoEv3Jq06LLmFzprtrxIC5SLVQRDEHaleECOwbIeFFY88jEBA6YAATSh0fJglYNkTmC4YFcKmyszXPh0Q4VrERFIAp4Y2TEhwQ0CSVI9cxfuwCAmAGQAiDPKm6kSM4zJeuFuS6s7f9g4TuAVoECBC0NwSFIisIg4Dx8OBDMnIYGwMngS5aEmkAesS7Rsk442tWTjzB4htNHHSZ2oQQMx1bzBAjKejKNORu4oQwcwh6TxihSnNNNQQAA7',
		"offense" : 'data:image/gif;base64,R0lGODlhEAAQAOYAAP/bAC0QDf/XAOC4M+GnDv//AOC5M//WANqgDP/lAJ5EGdGaDP/TAHsXBUwAAPm5D9eeDOatD9GZDG0pKfv08+C9MzQAAPe8D/vCAP/oAPr29fPQD6RSJv/5AI1ENv/MBPLKD//IAM2WDOK8M/ft7Oq4DwUAAvS8AAAAAPO8AOewD//hAP/1AP/kAI1FPf/sANugDP/ZAP/OAP/NAPrCAP/VAPy+BN2jDunAWe64AP/SAO/KD//MAN6qFf/FAOG9M/XRGuSgdf/tAOW2Of/QAP/0APGxGeOsD+HBM7JfKv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEoALAAAAAAQABAAAAd5gEYJCSNKhoeIhjYPLRk/iZAfDBdFLEiQiDg1RCAFHRWYhzcHMhsFQgahhggCMzsvK6mqMDE8JQAAA6pKrD4qB7m7ECE0EQLBSaELGClHAkBByconOT0ESRO7IkPXFruGHkkOKNKhSUkNJAEBSRSqGocmARzfhwougQA7',
		"defense" : 'data:image/gif;base64,R0lGODlhEAAQAPcAAPY0It7VzaJ2WJp1XfM3DN3Uzb6rnbiad/Q4Ce6NLufFH/Y8JKV8Zqd+ZcCdRvRKLZ98aKZ5UKaIccOwo9ueDupYDPFSG7mRW+7p5Kp8V9y9E/XpLKuQe+poCaR6YriFSPPDDfnAlu94JfONL6BxUfKFLZ58ZPnQruDYF+5/HceMMOt5E5dxVvH7NKV5XK2MUad9XOZtDv2JaPM8Gd67D6VwPeiQF93SytLGvdvRyfSxPO+IIvNNDNqeH/hrHsmPOeTb1MCHN/dOF7uVc8hsDbeBGbuYe/huavH0T/J+IL6ol7mMc8WhN/PJC9ivhJ53Xv3bl+OHM/WfS6J6X+idGZhyWOa3GNy4E8+tENecC/uxHuC+HMSQR7aAQ/S5ReKqRuzn4trOxb9/IOzVj/b0VPLv7PaSjvqCh++oH8uaDsGPVfYWAK6KTfU5JvldMJl2X7mDSfcvC+fHH+5ZCqWHdL6rn96kE/X4OsKeRN+jEM6yUZ90U/liOe5HB+22bepBIPObLubBH+bVG7yUXf96GO+NFJtvT/TAN6GBa/fAGJ94XeevHuvCHuqEENOeFd+fJ9GRCPbDTaWCbaF4W9ivkLudSrqll+22EtyhDfrUIvfHFfPRJOejFfn/yPsHIve7i7COQOGsEOvxPuS+mufeJKJ+bMaNDauFaPQpGu5PC8WxpJxyU6F2SOiPEqKFb5pzXLyEKfzBPfqQYN21GZ9zWfVOJOhnEfL5Qvj5Z/OxF/n+6ufJG6F0WfjZR9idDNzXEf7QMPRJKuejGpd0V/M9E6t/SLCUgO1QCOunPNu1ivTy7/+BGOrGIfPlLdy3Dah4VOpiI/qYk/C7FbmVfNKZGp91W/HcKfn/cvYzIP88GP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANoALAAAAAAQABAAAAj/ALUJ1IbD1RQGHl7VUTawoQFaQ5yMSjYIBgQMDbVVOTAmlqYmIBIdqsQizEAJS2RouYNEFClBlwj9GAZGW4EGUNY86PRJSgorizwtA1WqDCJKwHqdOHPEDCAEK5hJe7RnQjU/ma7JiqarTQI5BIQx4lRjwDQvG3DxCRGMGDYRhWwpyANHgBEdzci4iTQDwIIdjWJs8aXGxSlkm24JKTEiSS0UqVrNgtRl0psvuVpYi2PjV6gKc7CkoVaMjqULaHxAo8LjWJ8OV/4QYcIrh0Y92SwE2kXDmQZHqKK8UCXwxioHPexQwJTFVBE8bCQ1BKKIVRAVYmBx+RDBWEaBSkyQCcjwzBCHAA0DAgA7',
		"trade" : 'data:image/gif;base64,R0lGODlhIgAUANUAAJhkKHBKHvbbtXg8Fch0L8SCM66Yd3tTIoJDF7h8MalyLCgZCat5NOqKOaSHWJt6ULuEN5JXIcimebloKaWdiVo2FjYgDGNGIYRaJPyXPT8rE49iKKBtN0szF4FWIaFsLHVfRaJZId7EoaxsK5ZpLOCEN3VPIUYnDhoRB4pVIaFkJJ9mK61gJYRdK29WOadpKbJ4MIldJIxfKY5OHKhtKJdRHVAsEZxvL4FPIP/Mmc20jbymg8aGN2VCHYJYIv///yH5BAEAAD8ALAAAAAAiABQAAAb/wN+PwVDQjkakkbR5uEAuoXRK/fGuWGyicIUpSBWTqUoWclZogDq9Gn1lrc6lVybfmJsWRu87+DFiJhoXFVUiZRCJCYuMMFsQDHcdAXRUIYdVXi8qnJudbmgycxdVIQQCVXqBqwEHGB6BHbKlE6dURR9seTFwMX0mhDYDwwMIxTUEJahWPBXOzxU9Pa0pEdYBGhUnxAjdCKYlDagPMFnm5ijpJ8LF3t/JGRk5BgkAfff4+Oko69zdMyzgZZBAb0W+g33SLejX7l/ABhkI/JAQSZrFixcVMnQHcEKDCUJ2QCCB8OCCkxu91ajFQgq9GyXzKbRAs6aFBQEjGHD5JSa+QAUoFtDUoGGoiwkzdkyhuAGjU2knhcoiShQEgp1TRCT44POX0KFTbXSg8ICMDgZdfWCow/aHA18e4sqdO6ZtlSAAOw%3D%3D',
		"resources" : 'data:image/gif;base64,R0lGODlhGQAUAPfeAPfszHtoVb+0pNvSxNPKvOnj2ZOBbbSnmM3Cs4VzYfbrzMS5q4FuW+XayfXw6IdSCV5KN3A6AreMNZtlFBVWt6qbi4Kw83RgTfbqyPbpxoh2Y7yLI4Kt6ePhz8WXJjFxzDNtu3ufxNvq+vfZZqZyJfXUVSdr2DuJ7T161l2U5dS2V5VhEsXd+Clz4uC7QfDny2tWQubz/dq6XMOZQraCIqN7H3tKB415ZKV4JezMZGWHvO/ozUOM7cOaMvbci/Lel9SuRIVOCK97IGum9NauO5q+79fo+vPmwZW58It7ar2WO9KsS/HkvtWsN9OmMe3bgeDBd5WswNi0Pte3TLqiYFmO5Q9p4QhYwMeuZd/DYqCQgAlh2vHpzNiuPPfry+/SZaCwv+7MVOHAXIhnFpViDvfbdK+BK0eG59S8itPl91h+4b/R9bqaQ41/cfzbV5JpFfnVTunlz/zjYWiZ3dOrP86+qluJyvHZk4y27fXqy1iX6QNRvf/9rZ/D8O/cr97s/VKa7Z5xFzV73UyS7B9e3frnevzqn//qlS9sxJh2TTp+6VWF2jh30//oXPzkXgRHsWKQ3BBT2i1XyXGezUyE3xx39VCK4tW1YsabO+fMe+bYrPbw13iZuXSi4kZ+zoCw7/7nbt7JiIp9X+/OWfbuydexQLLA7/znjK3A9fnXWqt7IJu00D2B12VjY+zasIKu8ABJ1TR00ZJmGIJaIq16GKh7HvbafbvO8CBw3q66xtXc1LDO/Ehs2dLUy5eu8FCE6Sllv9rn/P/7jc6/jdTk+cmmXJS11//va3+v8vvhVfjnnfzkcd3s+rnP3fbszJqzy6W42v/4tBxj2///pMK0hunFSKFsDOHi0vDfri163ejSlxNPw+O/T/zsef///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAN4ALAAAAAAZABQAAAj/AL0JHEgQgIICAgIkSJKHoMOH3gwOKLDgAgMNCV4AgPgQwAECBBocgBEAY4AACjgOVIBAAMgBFRgEuHAyAAMAGyEqACkAwYIKAhDeSFDTGIc4HQcM6PnzQAEHBAwYGBpF0a5mKQsOaLnggMsGDhYwkJor0q0/n7g4BLBVwAEECMEeuCBVGqQYIiyQWjtgmMsCAw6A1QLDABhKIowQQ3ZtLTU/rmiQkFBnogEICZ79MhXDiAVda0NtmiZmwgMzE9tAYLCKEC81a17tIIjhjrJooAptiPBgSYEkEOxs81UEVosqHQhmsHVoVCoXTYREACJDEwRWJoIV2QJI0myBAHzkzvDA7QutUl1s1ACShdMiVMz6tEgBzZlADD/KWJMgTEoQOiXUMoEQSuiQwhlIWGACEmn04g1+fPSwwhMjePBAD3IQ8QAms1AAAg9DCEIBC53g4YUPp8hAhgrdOEFDEDWE4cgbOFCByAdDzPGIJSygwEEml0gQiBLHVLPBBDaM4UIjU0Qgygm46AHCFSgwEksH2GCBBhQlJEOEKivgwIYKbsAhSysnUJDNHlYM8oEnOB2RQQbL5DADCcVow8QRhowwQyKT8BBCCJXoAMwL3gQEADs=',
		"donations" : 'data:image/gif;base64,R0lGODlhGQAUAMQfAKuKXZZPB7aQMu7Sk+fLbHxJF7BqF1ctDW44C6x5LN2/XMqpQ7ydPcB0Hdy+jCQYEa1ZBI1lLdGtewoEBpxoEz8sFMSKTtW3T1hBKNGuSYJBB7+lUs+yUkIgBzwxJ+rKnCH5BAEAAB8ALAAAAAAZABQAAAX/4CeOg6MIieSMbOs6BHEJjTW4+AgP/GIYkluu5bjEYhkDxKIasgiKjIzASQQMCaZTpFAsFMYMRXP9WbacU+ZyKhwQGojcssoxvAxGJnHoHN4BckA5Egt5CwsYHQiMBwUJCRARdSQlFBQJFBUdAQ0QARoIBQWgADoOGwICFAgdEx0CUAwUcgFwCKYiEgocGwwNFAUIAgoyCgwQBhYJEQW5HzFgJwkGDAQMFxkLVRAN3hApXLxdsxAZA14cFzMaZAaeSybbHIYBAQtHayeMwhERZADopaE3hliaKBsSaCgQocKDDhADADCEbQGFAxEy5FnDAFQoBH0wVCjgIA+DBQlcND0QsFFBgltw2oEq8AEVg4YTclYwKQDkgQcP/vxhqAtABAwPPACNsCHh0QoePGCYigEAgBAAOw==',
	},
	Text: {
		"score"					    : "Total Score",
		"building_score_main"		: "Master Builders",
		"building_score_secondary"	: "Building Levels",
		"research_score_main"		: "Scientists",
		"research_score_secondary"	: "Levels of Research",
		"army_score_main"			: "Generals",
		"trader_score_secondary"	: "Gold Supply",
		"offense"					: "Offensive Points",
		"defense"					: "Defensive Points",
		"trade"					    : "Trade Score",
		"resources"					: "Resources",
		"donations"					: "Donations",
		"desc_quick"				: "Which highscore types do you want quicklinks created for on island view?",
		"high_play"					: "Players Highscore",
		"pl_name"					: "Player name",
		"sub"						: "Submit",
		"only_friends"				: "Search only friends",
		"only_ally"					: "Search only allies",
		"high_ally"					: "Alliances Highscore",
		"score_ally"				: "Total Score",
		"av_ally"					: "Average Score",
		"name_ally"					: "Alliance name",
		"tag_ally"					: "Alliance tag",
		"lang"					    : "Language",
		"lang_found"				: "Language found",
		"lang_tip"					: "Force language",
		"lang_sel"					: "Select",
		"lang_name"					: "English",
		"orlang_name"				: "English",
		"translator"				: "holyschmidt &amp; Narulez", //your own name and previous translator separated from &
		"tls"						: "Translators", //or if more translators "Translators"
		"note"					    : "Note: You may need to refresh the page to see changes.",
		"desc"					    : "This script adds some functions for ingame highscore search.",
		"bug"						: ["Do you have problems? Did you find a bug? Report any issue", "here", "!"], //it is separated to insert link
		"sugg"					    : ["Do you have any idea for new features? Suggest it", "here", "!"], //it is separated to insert link
		"clang"					    : ["Your language is missing? Translate the pack", "here", "and send it to me!"], //it is separated to insert link
		"forced"					: "forced",
		"pl_st_l"					: "Player score type",
		"pl_st_d"					: "Select default player score type.",
		"pl_st_s"					: "Last selected",
		"pl_ls_l"					: "Save last selected",
		"dellast"					: "Delete last selected",
		"options"					: "Options",
		"history"					: "History",
		"quicklinks"				: "Quicklinks",
		"about"					    : "About",
		"dpp"						: "Default Player Score",
	},
	Langs: {
		"en": {
			"lang_name" : "English",
			"orlang_name" : "English",
		}, //It's default language, so it doesn't have to change anything. lang_name only for listing.
		
        "lv": {
          	
		"score"					    : "Kopējie punkti",
		"building_score_main"		: "Celtnieki",
		"building_score_secondary"	: "Celtniecības līmenis",
		"research_score_main"		: "Zinātnieki",
		"research_score_secondary"	: "Pētniecības līmenis",
		"army_score_main"			: "Ģenerāļi",
		"trader_score_secondary"	: "Zelts",
		"offense"					: "Uzbrukuma punkti",
		"defense"					: "Aizsardzības punkti",
		"trade"					    : "Tirdzniecības punkti",
		"resources"					: "Resursi",
		"donations"					: "Ziedots",
		"desc_quick"				: "Kuriem TOP listes kritērjiem vēlaties izveidot ātrās saites salas skatā?",
		"high_play"					: "Spēlētāu TOP liste",
		"pl_name"					: "Lietotājvārds",
		"sub"						: "Apstiprināt",
		"only_friends"				: "Meklēt tikai draugos",
		"only_ally"					: "Meklēt tikai aliansē",
		"high_ally"					: "Alianšu TOP liste",
		"score_ally"				: "Kopējie punkti",
		"av_ally"					: "Vidējie punkti",
		"name_ally"					: "Nosaukums",
		"tag_ally"					: "Tags",
		"lang"					    : "Valoda",
		"lang_found"				: "Atrasta valoda",
		"lang_tip"					: "Noklusētā valoda",
		"lang_sel"					: "Izvēlēties",
		"lang_name"					: "Latviešu",
		"orlang_name"				: "Latviešu",
		"translator"				: "Draxo", //your own name and previous translator separated from &
		"tls"						: "Tulkotājs", //or if more translators "Translators"
		"note"					    : "Atcerieties - lai redzētu izmaiņas, ir jāpārlādē lapa.",
		"desc"					    : "Šis skripts pievieno dažas papildu funkcijas spēlētāju meklēšanai TOP listē.",
		"bug"						: ["Radās kāda problēma vai atradāt kļūdu? Ziņojiet par to", "šeit", "!"], //it is separated to insert link
		"sugg"					    : ["Ir kādas idejas jauniem uzlabojumiem? Iesakiet tās", "šeit", "!"], //it is separated to insert link
		"clang"					    : ["Jūsu valoda nav pieejama? Iztulkojiet pakotni", "šeit", "un atsūtiet man!"], //it is separated to insert link
		"forced"					: "noklusēti",
		"pl_st_l"					: "Spēlētāja punktu tips",
		"pl_st_d"					: "Izvēlieties noklusēto spēlētāja punktu tipu.",
		"pl_st_s"					: "Pēdējā izvēle",
		"pl_ls_l"					: "Saglabāt pēdējo izvēli",
		"dellast"					: "Dzēst pēdējo izvēli",
		"options"					: "Opcijas",
		"history"					: "Izmaiņu saraksts",
		"quicklinks"				: "Ātrās saites",
		"about"					    : "Par",
		"dpp"						: "Noklusētie spēlētāja punkti",
        }
	},
};
HighscoreUtilities.init();
} catch (e) {
	alert(e);
}