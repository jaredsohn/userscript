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
// @downloadURL    https://userscripts.org/scripts/source/114431.user.js
// @updateURL      https://userscripts.org/scripts/source/114431.meta.js
// @copyright      2011+, Narulez (http://userscripts.org/users/268539)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include        http://m*.ikariam.*
// @include        http://s*.ikariam.*
// @exclude        http://board*.ikariam.*
// @exclude        http://support*.ikariam.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://userscripts.org/scripts/version/132337/462547.user.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://userscripts.org/scripts/source/115197.user.js
// @oldrequire     http://www.betawarriors.com/bin/gm/57377user.js
// @oldrequire     http://www.betawarriors.com/bin/gm/62718user.js
// @screenshot     http://s3.amazonaws.com/uso_ss/14030/large.png?1317536996
// @screenshot     http://s3.amazonaws.com/uso_ss/14031/large.png?1317537078
// @screenshot     http://s3.amazonaws.com/uso_ss/14032/large.png?1317537106
// @version        0.22
// @history        0.22 Added Spanish translation, thanks to Rada974.
// @history        0.22 Better languages multi-server management.
// @history        0.21 Added Greek translation, thanks to G.Callen.
// @history        0.20 Added Bulgarian translation, thanks to IvoAndr.
// @history        0.20 Updated Persian translation, thanks to elm10.
// @history        0.20 Tweak (FF with Scriptish) for options window that sometimes doesn't open.
// @history        0.20 Minor changes.
// @history        0.19 Added French translation, thanks to HéliΩGraph.
// @history        0.19 Added Romanian translation, thanks to Ove.
// @history        0.19 Changed default showed links on island view.
// @history        0.19 Better and faster way to show the links on island view (FF, Opera and IE 9).
// @history        0.19 Updated license and dependencies.
// @history        0.19 Improved meta tags for Scriptish compatibility.
// @history        0.19 Fixed flyout hovered by windows.
// @history        0.18 Added Hungarian translation, thanks to Sracz66.
// @history        0.18 Added Polish translation, thanks to MAŁY001.
// @history        0.18 Updated Russian translation, thanks to Black Widow.
// @history        0.18 Changed small css, thanks to Black Widow.
// @history        0.18 Changed default player search: now if you don't type anything, it'll show your position.
// @history        0.18 Fixed broken alliances search.
// @history        0.18 Fixed small bug on last selected search type.
// @history        0.17 Added German translation, thanks to Bier Baron.
// @history        0.17 Fixed small css.
// @history        0.16.1 Removed new tab function (It was buggy with 0.5)
// @history        0.16 Fixed for Ikariam v0.5+
// @history        0.15 Added Persian & Turkish.
// @history        0.14 Option for save or not last selected. Default true.
// @history        0.14 Fixed bug deleting last selected highscore type.
// @history        0.14 Minor improvements and changes.
// @history        0.13 Added option to open island quicklinks in new tabs. Idea by -ASLAN- (http://userscripts.org/topics/43035#posts-208886).
// @history        0.13 Added option to search for scores in new tabs. Idea by -ASLAN- (http://userscripts.org/topics/43035#posts-208886).
// @history        0.13 Changed a dependency to my new version of an old script.
// @history        0.13 Some improvements in translating.
// @history        0.12 Added caching last selected highscore type.
// @history        0.12 Added ability to select the default highscore type and delete the last selected.
// @history        0.12 Added indication when language is forced.
// @history        0.12 Some minor underground changes and improvements.
// @history        0.11 Added ability to force languages.
// @history        0.11 Some minor improvements.
// @history        0.11 Probably you'll have to uninstall manually the previous version.
// @history        0.10 Added Russian translation, thanks to Black Widow.
// @history        0.09 Added some new phrases to translate and history in-game.
// @history        0.08 Narulez's Work Begins!
// @history        0.08 Updated to work with Ikariam v0.4.4
// @history        0.08 Updated with all highscore types.
// @history        0.08 Added ally/friends searches.
// @history        0.08 Added ability to add languages.
// @history        0.08 Added alliances highscore search, also this is a workaround for a bug (second post in http://userscripts.org/topics/43034).
// @history        0.07 Fixed small bugs.
// @history        0.06 Fixed bug with other script incompatibility.
// @history        0.05 Options dialog implemented to turn on/off individual score quicklinks.
// @history        0.04 Added links on island view for quick lookup of player highscore values.
// @history        0.03 Fixed include line.
// @history        0.02 Changed default score type selection.
// @history        0.01 Initial Release.
// ==/UserScript==
**/
try {
/*global ScriptUpdater, Config, GM_addStyle, $, IkaTools, top */
var ver = '0.22';
ScriptUpdater.check(114431, ver);
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
		"it": {
			"score" : "Punteggio totale",
			"building_score_main" : "Migliori costruttori",
			"building_score_secondary" : "Livelli degli edifici",
			"research_score_main" : "Scienziati",
			"research_score_secondary" : "Livelli di ricerca",
			"army_score_main" : "Generali",
			"trader_score_secondary" : "Oro",
			"offense" : "Punti d`attacco",
			"defense" : "Punti di difesa",
			"trade" : "Commercio",
			"resources" : "Risorse",
			"donations" : "Donazioni",
			"desc_quick" : "Per quali tipi di classifica vuoi che siano creati dei link nell'isola?",
			"high_play" : "Classifica Giocatori",
			"pl_name" : "Nome giocatore",
			"sub" : "Invia",
			"only_friends" : "Cerca solo amici",
			"only_ally" : "Cerca solo alleati",
			"high_ally" : "Classifica alleanze",
			"score_ally" : "Punteggio totale",
			"av_ally" : "Media punti",
			"name_ally" : "Nome alleanza",
			"tag_ally" : "Tag alleanza",
			"lang" : "Lingua",
			"lang_found" : "Lingua trovata",
			"lang_tip" : "Forza lingua",
			"lang_sel" : "Seleziona",
			"lang_name" : "Italiano",
			"orlang_name" : "Italian",
			"translator" : "Narulez",
			"tls" : "Traduttore",
			"note" : "Nota: Probabilmente devi ricaricare la pagina per visualizzare le modifiche.",
			"desc" : "Questo script aggiunge alcune funzionalità per la ricerca in classifica all'interno del gioco.",
			"bug" : ["Hai qualche problema? Hai trovato un errore? Segnala qualsiasi problema", "qui", "!"],
			"sugg" : ["Hai qualche idea per nuove funzioni? Suggeriscimele", "qui", "!"],
			"clang" : ["Manca la tua lingua? Traduci le frasi", "qui", "e inviamele!"],
			"forced" : "forzato",
			"pl_st_l" : "Punteggio giocatore",
			"pl_st_d" : "Seleziona il punteggio giocatore da selezionare per default.",
			"pl_st_s" : "Ultimo selezionato",
			"pl_ls_l" : "Salva ultimo selezionato",
			"dellast" : "Cancella ultimo selezionato",
			"quicklinks" : "Link",
			"options" : "Opzioni",
			"history" : "Cronologia",
			"about" : "Info",
			"dpp" : "Punteggio Giocatore",
		},
		"ru,by": {
			"score" : "Общий ТОП",
			"building_score_main" : "Строители",
			"building_score_secondary" : "Уровни Построек",
			"research_score_main" : "Ученые",
			"research_score_secondary" : "Баллы Науки",
			"army_score_main" : "Генералы",
			"trader_score_secondary" : "Золото",
			"offense" : "Баллы Атаки",
			"defense" : "Баллы Защиты",
			"trade" : "Баллы Торговли",
			"resources" : "Ресурсы",
			"donations" : "Пожертвования",
			"desc_quick" : "Для каких типов Топ-списка вы хотите создать быстрые ссылки? ( иконки в левом блоке )",
			"high_play" : "Баллы Игроков",
			"pl_name" : "Имя Игрока",
			"sub" : "Поиск",
			"only_friends" : "Искать только друзей",
			"only_ally" : "Искать только альянсы",
			"high_ally" : "Баллы Альянса",
			"score_ally" : "Общие баллы",
			"av_ally" : "Средние Баллы",
			"name_ally" : "Название Альянса",
			"tag_ally" : "Тег Альянса",
			"lang" : "Язык",
			"lang_found" : "Используемый язык интерфейса",
			"lang_tip" : "Переключить Язык",
			"lang_sel" : "Выбрать",
			"lang_name" : "Русский",
			"orlang_name" : "Russian",
			"translator" : "Black Widow",
			"tls" : "Русская локализация ",
			"note" : "Примечание: Чтобы увидеть изменения - обновите страницу.",
			"desc" : "Этот скрипт добавляет некоторые функции для поиска игровых рекордов.",
			"bug" : ["Вы нашли ошибку? Вы можете сообщить о любых проблемах", "здесь", "!"],
			"sugg" : ["У Вас есть идеи для новых возможностей? Вы можете предложить их", "здесь", "!"],
			"clang" : ["Не хватает Вашего языка? Возьмите образец", "здесь", ", переведите и отправьте мне!"],
			"forced" : "принудительно!",
			"pl_st_l" : "тип рейтинга (баллы) ",
			"pl_st_d" : "Выбрать тип рейтинга по умолчанию.",
			"pl_st_s" : "Последний выбор",
			"pl_ls_l" : "Запомнить мой выбор",
			"dellast" : "Удалить последний выбор",
			"options" : "Настройки",
			"history" : "История изменений",
			"quicklinks" : "Быстрые ссылки",
			"about" : "О скрипте",
			"dpp" : "Рейтинг Игрока по умолчанию",
		},
		"tr": {
			"score" : "Toplam Puan",
			"building_score_main" : "Usta İnşaatçılar",
			"building_score_secondary" : "Bina Seviyeleri",
			"research_score_main" : "Bilim Adamları",
			"research_score_secondary" : "Araştırma Seviyeleri",
			"army_score_main" : "Generaller",
			"trader_score_secondary" : "Altın Miktarı",
			"offense" : "Saldırı Puanı",
			"defense" : "Savunma Puanı",
			"trade" : "Tüccar",
			"resources" : "Kaynaklar",
			"donations" : "Bağış Puanı",
			"desc_quick" : "Ada görünüşünde hangi sıralama kıstaslarının olmasını istersiniz?",
			"high_play" : "Oyuncu Sıralaması",
			"pl_name" : "Oyuncu adı",
			"sub" : "Kabul et",
			"only_friends" : "Sadece arkadaşları ara",
			"only_ally" : "Sadece ittifak üyelerini ara",
			"high_ally" : "İttifak Sıralaması",
			"score_ally" : "Toplam Puan",
			"av_ally" : "Ortalama Puan",
			"name_ally" : "İttifak Adı",
			"tag_ally" : "İttifak Kısaltması",
			"lang" : "Dil",
			"lang_found" : "Dil Bulundu",
			"lang_tip" : "Kullanılacak dil",
			"lang_sel" : "Seç",
			"lang_name" : "Türkçe",
			"orlang_name" : "Turkish",
			"translator" : "Walking Tombstone",
			"tls" : "Çevirmen",
			"note" : "Not: Değişiklikleri görebilmek için sayfayı yenilemeniz gerekebilir.",
			"desc" : "Bu betik oyun içi sıralamaya bazı işlevsellikler kazandırmaktadır.",
			"bug" : ["Sorun mu yaşıyorsunuz? Hata mı buldunuz? Herhangi bir konuyu ", "buradan", "ulaştırabilirsiniz!"],
			"sugg" : ["Yeni özellikler için önerileriniz var mı? Önerilerinizi ", "buradan", "yapabilirsiniz!"],
			"clang" : ["Kendi diliniz yok mu? Çeviriyi", "buradan", "yapın ve bana gönderin!"],
			"forced" : "kaydedildi",
			"pl_st_l" : "Oyuncu puanı türü",
			"pl_st_d" : "Varsayılan oyuncu puanı türünü seçin.",
			"pl_st_s" : "Son seçilen",
			"dellast" : "Son seçileni sil",
		},
		"ir": {
			"score" : "جمع امتيازات",
			"building_score_main" : "سازندگان ماهر",
			"building_score_secondary" : "مرحله های ساختمانی",
			"research_score_main" : "دانشمندان",
			"research_score_secondary" : "مراحل تحقيق",
			"army_score_main" : "ژنرال ها",
			"trader_score_secondary" : "موجودی طلا",
			"offense" : "امتيازات حمله",
			"defense" : "امتيازات دفاع",
			"trade" : "تاجر",
			"resources" : "منابع",
			"donations" : "اهدا كردن",
			"desc_quick" : "به كدام امتياز در نمای جزيره لينك داده شود؟",
			"high_play" : "بالاترين امتياز بازيكنان",
			"pl_name" : "نام بازيكن",
			"sub" : "تاييد",
			"only_friends" : "فقط جستجوی دوستان",
			"only_ally" : "فقط جستجوی اعضای اتحاد",
			"high_ally" : "بالاترين امتياز اتحاد ها",
			"score_ally" : "جمع امتيازات",
			"av_ally" : "ميانگين امتيازات",
			"name_ally" : "نام اتحاد",
			"tag_ally" : "نام اختصاری اتحاد",
			"lang" : "زبان",
			"lang_found" : "يافتن زبان",
			"lang_tip" : "نيروی زبان",
			"lang_sel" : "انتخاب",
			"lang_name" : "انگليسي",
			"orlang_name" : "Persian",
			"translator" : "Jojok &amp; elm10",
			"tls" : "مترجمان",
			"note" : "نكته: شما می بايست صفحه را به روز كنيد تا تغييرات را مشاهده كنيد.",
			"desc" : "اين اسكريپت امكاناتی برای قسمت بالاترين امتيازات در داخل بازی ايجاد می كند.",
			"bug" : ["آيا شما مشكلاتی در استفاده از اسكريپت داريد؟ آيا شما خطايی مشاهده كرديد؟ هر خطايی را گزارش كنيد.", "اينجا", "!"],
			"sugg" : ["آيا شما ايده ای برای افزودن ويژگی جديد به اسكريپت داريد؟ ايده تان را ارائه كنيد.", "اينجا", "!"],
			"clang" : ["آيا در زبان اسكريپت ايرادی می بينيد؟ ترجمه كنيد.", "اينجا", "and send it to me!"],
			"forced" : "نيرو",
			"pl_st_l" : "نوع امتياز بازيكن",
			"pl_st_d" : "انتخاب نوع امتياز بازيكن پيشفرض.",
			"pl_st_s" : "زمان اخرین انتخاب",
			"pl_ls_l" : "ذخيره زمان آخرين انتخاب",
			"dellast" : "حذف انتخاب قبلی",
			"options" : "تنظيمات",
			"history" : "تاريخچه",
			"quicklinks" : "لينك داده شده ها",
			"about" : "درباره ما",
			"dpp" : "امتياز پيشفرض بازيكن",
		},
		"de": {
			"score" : "Gesamtpunkte",
			"building_score_main" : "Baumeister",
			"building_score_secondary" : "Gebäudestufen",
			"research_score_main" : "Forscher",
			"research_score_secondary" : "Forschungslevel",
			"army_score_main" : "Generäle",
			"trader_score_secondary" : "Goldbestand",
			"offense" : "Offensivpunkte",
			"defense" : "Defensivpunkte",
			"trade" : "Händler",
			"resources" : "Rohstoffe",
			"donations" : "Spenden",
			"desc_quick" : "Welche Highscoreart willst du als Quicklink für die Inselansicht hinzufügen?",
			"high_play" : "Spieler Highscore",
			"pl_name" : "Spielername",
			"sub" : "Suchen",
			"only_friends" : "nur freunde",
			"only_ally" : "nur Allianzmitglieder",
			"high_ally" : "Allianz Highscore",
			"score_ally" : "Gesamtpunkte",
			"av_ally" : "Durchschnittspunkte",
			"name_ally" : "Allianzname",
			"tag_ally" : "Allianzkürzel",
			"lang" : "Sprache",
			"lang_found" : "Aktuelle Sprache",
			"lang_tip" : "Ändere Sprache",
			"lang_sel" : "Auswählen",
			"lang_name" : "Deutsch",
			"orlang_name" : "German",
			"translator" : "Bier Baron",
			"tls" : "Übersetzer",
			"note" : "Info: Aktualisiere die Seite um Änderungen zu sehen.",
			"desc" : "Dieses Script erstellt Zusatzfunktionen für die Highscoresuche.",
			"bug" : ["Gibt es ein Problem? Hast du einen Fehler gefunden? Um Fehler zu melden klick", "hier", "!"],
			"sugg" : ["Hast du Vorschläge für neue Funktionen? Für Vorschläge klick", "hier", "!"],
			"clang" : ["Fehlt deine Sprache? Übersetze das Sprachpaket", "hier", "und schicke es zurück!"],
			"forced" : "behoben",
			"pl_st_l" : "Highscoreart",
			"pl_st_d" : "Wähle Standard-Highscoreart",
			"pl_st_s" : "Letzte Auswahl",
			"dellast" : "Lösche letzte Auswahl",
		},
		"hu": {
			"score" : "Összes pont",
			"building_score_main" : "Mesteri építők",
			"building_score_secondary" : "Épület szintek",
			"research_score_main" : "Tudósok",
			"research_score_secondary" : "Fejlesztés szintjei",
			"army_score_main" : "Tábornokok",
			"trader_score_secondary" : "Arany kézlet",
			"offense" : "Támadó pontok",
			"defense" : "Védelmi pontok",
			"trade" : "Kereskedő",
			"resources" : "Nyersanyagok",
			"donations" : "Adományozás",
			"desc_quick" : "Milyen toplistákhoz szeretnél gyorslinket rendelni a sziget nézetben?",
			"high_play" : "Játékos statisztika",
			"pl_name" : "Játékos neve",
			"sub" : "Keresés",
			"only_friends" : "Barátok keresése",
			"only_ally" : "Szövetségesek keresése",
			"high_ally" : "Szövetség statisztika",
			"score_ally" : "Összes pont",
			"av_ally" : "Átlag pontszám",
			"name_ally" : "Szövetség neve",
			"tag_ally" : "Név rövidítése",
			"lang" : "Nyelv",
			"lang_found" : "Lehetséges nyelvek",
			"lang_tip" : "Jelenlegi nyelv",
			"lang_sel" : "Kiválaszt",
			"lang_name" : "Magyar",
			"orlang_name" : "Hungarian",
			"translator" : "Sracz66",
			"tls" : "Fordító",
			"note" : "Megjegyzés: frissíteni kell az oldalt, hogy látható legyen a módosítás.",
			"desc" : "Ez a szkript néhány játékbeli toplista kereséssel egészíti ki a játék menetet.",
			"bug" : ["Van valami gond? Esetlek hibát találtál?Jelenteni tudod", "itt", "!"],
			"sugg" : ["Van valami ötleted, vagy újításod? Javasolhatod", "itt", "!"],
			"clang" : ["A Te nyelved nincs meg? Készítsd el a fordítást", "itt", "és küldd el nekem!"],
			"forced" : "Rögzített",
			"pl_st_l" : "Játékos pont típus",
			"pl_st_d" : "Alapértelmezett pont típus kiválasztás.",
			"pl_st_s" : "Legutóbb választott",
			"dellast" : "Legutóbbi törlése",
		},
		"pl": {
			"score" : "Wynik całkowity",
			"building_score_main" : "Mistrzowie budowy",
			"building_score_secondary" : "Poziomy budynków",
			"research_score_main" : "Naukowcy",
			"research_score_secondary" : "Poziom badań",
			"army_score_main" : "Generałowie",
			"trader_score_secondary" : "Zapas złota",
			"offense" : "Punkty ofensywy",
			"defense" : "Punkty obrony",
			"trade" : "Handlarz",
			"resources" : "Surowce",
			"donations" : "Datki",
			"desc_quick" : "Z którymi rodzajami wyników chcesz stworzyć link w podglądzie wyspy?",
			"high_play" : "Ranking graczy",
			"pl_name" : "Nazwa gracza",
			"sub" : "Wyślij",
			"only_friends" : "Szukaj tylko znajomych",
			"only_ally" : "Szukaj tylko sojuszników",
			"high_ally" : "Ranking sojuszy",
			"score_ally" : "Wynik całkowity",
			"av_ally" : "Średnia punktów",
			"name_ally" : "Nazwa sojuszu",
			"tag_ally" : "TAG sojuszu",
			"lang" : "Język",
			"lang_found" : "Odczytany język",
			"lang_tip" : "Wymuś język",
			"lang_sel" : "Wybierz",
			"lang_name" : "Polski",
			"orlang_name" : "Polish",
			"translator" : "MAŁY001",
			"tls" : "Translator",
			"note" : "Uwaga: Odświerz stronę aby zmienić język.",
			"desc" : "Skrypt dodaje pewne funkcje do wyszukiwarki rankingu.",
			"forced" : "wymuszono",
			"pl_st_l" : "Typ wyniku",
			"pl_st_d" : "Wybierz domyślny typ wyniku.",
			"pl_st_s" : "Ostatnio wybrany",
			"dellast" : "Usuń ostatnio wybrany",
		},
		"fr":{
			"score" : "Total des Points",
			"building_score_main" : "Ingénieur",
			"building_score_secondary" : "Niveaux des Bâtiments",
			"research_score_main" : "Chercheur",
			"research_score_secondary" : "Niveau de Recherche",
			"army_score_main" : "Généraux",
			"trader_score_secondary" : "Réserves d'Or",
			"offense" : "Points d'Attaque",
			"defense" : "Points de Défense",
			"trade" : "Marchand",
			"resources" : "Matières Premières",
			"donations" : "Donner",
			"desc_quick" : "Pour quels Classements voulez-vous créer un quicklink pour la vue de l'île?",
			"high_play" : "Classement des Joueurs",
			"pl_name" : "Pseudo du Joueur",
			"sub" : "Soumettre",
			"only_friends" : "Rechercher des Amis",
			"only_ally" : "Rechercher des Alliés",
			"high_ally" : "Classement des Alliances",
			"score_ally" : "Score Total",
			"av_ally" : "Moyenne",
			"name_ally" : "Nom de l'Alliance",
			"tag_ally" : "Tag de l'Alliance",
			"lang" : "Langues",
			"lang_found" : "Langue trouvée",
			"lang_tip" : "Langue",
			"lang_sel" : "Selectionner",
			"lang_name" : "Français",
			"orlang_name" : "French",
			"translator" : "HéliΩGraph",
			"tls" : "Translator",
			"note" : "Note: Vous pourriez avoir à actualiser votre page pour accéder aux informations.",
			"desc" : "Ce script ajoute des fonctions aux recherches dans le classement InGame.",
			"bug" : ["Vous avez des problèmes? Vous avez trouvé un bug? Envoyez vos commentaires", "ici", "!"],
			"sugg" : ["Vous avez de nouvelles idées? Envoyez vos suggestions", "ici", "!"],
			"clang" : ["Votre langue est manquante? Traduisez le pack", "ici", "et envoyez-le !"],
			"pl_st_l" : "Type de Classement",
			"pl_st_d" : "Type de Classement par défaut",
			"pl_st_s" : "Dernière Séléction",
			"pl_ls_l" : "Sauver la dernière Séléction",
			"dellast" : "Supprimer la dernière Séléction",
			"history" : "Historique",
			"about" : "A propos",
		},
		"ro": {
			"score" : "Scor Total",
			"building_score_main" : "Maestrii constructori",
			"building_score_secondary" : "Nivelul clădirilor",
			"research_score_main" : "Cercetători",
			"research_score_secondary" : "Nivelul cercetărilor",
			"army_score_main" : "Generali",
			"trader_score_secondary" : "Stocul de aur",
			"offense" : "Puncte de atac",
			"defense" : "Puncte de apărare",
			"trade" : "Puncte market ",
			"resources" : "Resurse",
			"donations" : "Donații",
			"desc_quick" : "Ce tipuri de scor vrei, link-uri rapide pentru vizualizarea insulei?",
			"high_play" : "Clasament jucători",
			"pl_name" : "Numele jucătorului",
			"sub" : "Trimite",
			"only_friends" : "Caută doar prieteni",
			"only_ally" : "Caută doar aliați",
			"high_ally" : "Clasament alianțe",
			"score_ally" : "Scor Total",
			"av_ally" : "Scor mediu",
			"name_ally" : "Numele alianței",
			"tag_ally" : "Tag-ul alianței",
			"lang" : "Limbă",
			"lang_found" : "Limbă gasită",
			"lang_tip" : "Limbă forțată",
			"lang_sel" : "Selectare",
			"lang_name" : "Română",
			"orlang_name" : "Romanian",
			"translator" : "Ove",
			"tls" : "Traducător",
			"note" : "Notă: Poate fi necesar să reâmprospătaţi pagina pentru a vedea modificările.",
			"desc" : "Acest script adaugă unele funcţii în joc pentru căutarea în clasament.",
			"bug" : ["Aveţi probleme? Aţi găsit un bug? Raportaţi orice problemă", "aici", "!"],
			"sugg" : ["Ai vreo idee pentru noi caracteristici? sugerează-ne", "aici", "!"],
			"clang" : ["Limba dumneavoastră lipseşte? Traduceţi pachetul", "aici", "!"],
			"forced" : "Forţat",
			"pl_st_l" : "Jucătorul si tipul scorului",
			"pl_st_d" : "Selectaţi scor implicit tipul de jucător.",
			"pl_st_s" : "Ultima selecţie",
			"pl_ls_l" : "Salvează ultima selecţie",
			"dellast" : "Sterge ultima selecţie",
			"options" : "Opţiuni",
			"history" : "Istoric",
			"quicklinks" : "Rapide",
			"about" : "Despre",
			"dpp" : "Scor Implicit pentru jucător",
		},
		"gr": {
			"score" : "Συνολικό Αποτέλεσμα",
			"building_score_main" : "Οικοδόμοι",
			"building_score_secondary" : "Επίπεδα Οικοδόμησης",
			"research_score_main" : "Επιστήμονες",
			"research_score_secondary" : "Επίπεδα Έρευνας",
			"army_score_main" : "Στρατηγοί",
			"trader_score_secondary" : "Απόθεμα Χρυσού",
			"offense" : "Επιθετικοί Βαθμοί",
			"defense" : "Αμυντικοί Βαθμοί",
			"trade" : "Έμπορος",
			"resources" : "Πόροι",
			"donations" : "Δωρεές",
			"desc_quick" : "Ποιες βαθμολογίες να εμφανίζονται;",
			"high_play" : "Βαθμολογία Παικτών",
			"pl_name" : "Όνομα παίκτη",
			"sub" : "Υποβολή",
			"only_friends" : "Ερεύνησε μόνο φίλους",
			"only_ally" : "Ερεύνησε μόνο συμμαχίες",
			"high_ally" : "Βαθμολογία Συμμαχιών",
			"score_ally" : "Συνολικό αποτέλεσμα",
			"av_ally" : "Κατά μέσο όρο",
			"name_ally" : "Όνομα συμμαχίας",
			"tag_ally" : "Συντομογραφία συμμαχίας",
			"lang" : "Γλώσσα",
			"lang_found" : "Επιλεγμένη γλώσσα",
			"lang_tip" : "Επέλεξε γλώσσα",
			"lang_sel" : "Επέλεξε",
			"lang_name" : "Ελληνικά",
			"orlang_name" : "Greek",
			"translator" : "G.Callen",
			"tls" : "Μετάφραση",
			"note" : "Σημείωση: Πρέπει να ανανεώσεις την σελίδα για να γίνουν οι αλλαγές.",
			"desc" : "Το script προσθέτει κάποιες λειτουργίες στο παιχνίδι για αναζήτηση βαθμολογίας.",
			"bug" : ["Έχετε προβλήματα; Βρήκατε κάποιο bug; Δηλώστε το", "εδώ", "!"],
			"sugg" : ["Έχετε κάποια ιδέα για βελτίωση του script; Προτείνετε την", "εδώ", "!"],
			"clang" : ["Δεν βρίσκετε την γλώσσα σας; Μεταφράστε την", "εδώ", "και στείλτε την σε μένα!"],
			"forced" : " Επιλογή ",
			"pl_st_l" : "Βαθμολογία",
			"pl_st_d" : "Επιλέξετε τύπο βαθμολογίας.",
			"pl_st_s" : "Τελευταία επιλογή",
			"pl_ls_l" : "Αποθήκευση τελευταίας επιλογής",
			"dellast" : "Διαγραφή τελευταίας επιλογής",
			"options" : "Επιλογές",
			"history" : "Εκδόσεις",
			"quicklinks" : "Σύνδεσμοι",
			"about" : "Πληροφορίες",
			"dpp" : "Προεπιλογή Βαθμολογίας Παίκτη",
		},
		"bg": {
			"score" : "Общ резултат",
			"building_score_main" : "Строители",
			"building_score_secondary" : "Ниво сгради",
			"research_score_main" : "Учени",
			"research_score_secondary" : "Нива на научните изследвания",
			"army_score_main" : "Генерали",
			"trader_score_secondary" : "Злато",
			"offense" : "Точки нападение",
			"defense" : "Точки защита",
			"trade" : "Търговец",
			"resources" : "Ресурси",
			"donations" : "Дари",
			"desc_quick" : "Кои видове точки искате да се показват в островния изглед?",
			"high_play" : "Точки за играч",
			"pl_name" : "Играч",
			"sub" : "Изпрати",
			"only_friends" : "Търси само в приятели",
			"only_ally" : "Търси само в съюзници",
			"high_ally" : "Точки за съюз",
			"score_ally" : "Общ резултат",
			"av_ally" : "Осреднени точки",
			"name_ally" : "Име на съюз",
			"tag_ally" : "Таг на съюз",
			"lang" : "Език",
			"lang_found" : "Намерен език",
			"lang_tip" : "Избран език",
			"lang_sel" : "Избери",
			"lang_name" : "Български",
			"orlang_name" : "Bulgarian",
			"translator" : "IvoAndr",
			"tls" : "Преводачи",
			"note" : "Забележка: Може да се наложи да презаредите страницата, за да видите промените.",
			"desc" : "Този скрипт добавя допълнителни възможности в търсачката по точки на играта.",
			"bug" : ["Имате проблеми? Намерихте бъг? Изпратете го", "тук", "!"],
			"sugg" : ["Имате някаква идея за нови възможности? Изпратете я", "тук", "!"],
			"clang" : ["Вашия език липсва? Преведете го", "тук", "и ми го изпратете!"],
			"forced" : "Принудително",
			"pl_st_l" : "Вид точки за играча",
			"pl_st_d" : "Избери точки за играча по подразбиране.",
			"pl_st_s" : "Последно избран",
			"pl_ls_l" : "Запази последно избран",
			"dellast" : "Изтрий последно избран",
			"options" : "Настойки",
			"history" : "История",
			"quicklinks" : "Бързи връзки",
			"about" : "За ...",
			"dpp" : "Точки за играча по подразбиране",
		},
		"ar,cl,mx,pe,es,ve": {
			"score" : "Puntacion Total",
			"building_score_main" : "Maestro Constructor",
			"building_score_secondary" : "Nivel de Construccion",
			"research_score_main" : "Investigadores",
			"research_score_secondary" : "Nivel de Investigacion",
			"army_score_main" : "Generales",
			"trader_score_secondary" : "Reserva de oro",
			"offense" : "Puntos Ofensivos",
			"defense" : "Puntos Defensivos",
			"trade" : "Mercader",
			"resources" : "Materias Primas",
			"donations" : "Donar",
			"desc_quick" : "¿Que tipo de clasificacion quieres ver en la vista de la Isla?",
			"high_play" : "Calsificacion",
			"pl_name" : "Nombre",
			"sub" : "Introducir",
			"only_friends" : "Buscar solo amigos",
			"only_ally" : "Buscar solo aliados",
			"high_ally" : "Clasificacion de la Alianza",
			"score_ally" : "Puntuacion Total",
			"av_ally" : "Puntuacion Promedio",
			"name_ally" : "Alianza",
			"tag_ally" : " Tag Alianza",
			"lang" : "Idioma",
			"lang_found" : "Idioma Encontrado",
			"lang_tip" : "Idioma Seleccionado",
			"lang_sel" : "Selecciona",
			"lang_name" : "Español",
			"orlang_name" : "Spanish",
			"translator" : "rada974",
			"tls" : "Traductor",
			"note" : "Nota: Refrescar la ventana puede ser necesario para que los cambios tengan efecto.",
			"desc" : "Este script añade funciones para buscar en la clasificacion.",
			"bug" : ["Tienes Problemas? Encontrastes un error? Reportalo", "aqui", "!"],
			"sugg" : ["Tiens alguna idea para nuevas caractericticas? Sugierelast", "aqui", "!"],
			"clang" : ["No aparece tu idioma? Traduce el paquete de idioma", "aqui", "and send it to me!"],
			"forced" : "forzado",
			"pl_st_l" : "Tipo de clasificacion",
			"pl_st_d" : "Selecciona por defecto el tipo de clasificacion.",
			"pl_st_s" : "Ultima selecccionada",
			"pl_ls_l" : "Salvar ultima selecccionada",
			"dellast" : "Eliminar ultima selecccionada",
			"options" : "Opciones",
			"history" : "Historial",
			"quicklinks" : "Acceso directo",
			"about" : "Acerca de",
			"dpp" : "Puntuacion por defecto",
		},
	},
};
HighscoreUtilities.init();
} catch (e) {
	alert(e);
}