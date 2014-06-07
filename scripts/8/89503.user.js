// ==UserScript==
// @name           Neopets : All Site Themes
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Allows you use any theme to view neopets.com
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        3.0.0
// @language       en
// @include        http://www.neopets.com/*
// @icon           http://gm.wesley.eti.br/icon.php?desc=89503
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       meta http://userscripts.org/scripts/source/89503.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://pastebin.com/download.php?i=sin7DHJi
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @history        3.0.0 Fixed some bugs
// @history        2.3.0 Added "Battleground: Awakened" Theme
// @history        2.3.0 Added "Battleground: Brute Squad" Theme
// @history        2.3.0 Added "Battleground: Order of the Red Erisim" Theme
// @history        2.3.0 Added "Battleground: Thieves Guild" Theme
// @history        2.2.0 Added Includes Checker (due to the recent problems with userscripts.org)
// @history        2.1.0 Added "Battleground: The Sway" Theme
// @history        2.1.0 Added "Tyrannia: Mysterious Obelisk" Theme
// @history        2.0.0.0 Updated @require#87942
// @history        1.0.4.1 updated i18n
// @history        1.0.4.0 added "Treasure Keepers" theme
// @history        1.0.3.0 added "Krawk Island" theme
// @history        1.0.2.0 added "Festival of Neggs" theme
// @history        bug from fx 3.x to 4.x
// @history        1.0.1.0 added "The Faeries' Ruin" theme
// @history        1.0.0.1 made code a little cleaner
// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

(function () {	// script scope
	var css_link = xpath(".//head/link[contains(@href, '/css/themes/')]")[0],
	username = xpath("string(id('header')//a[contains(@href, '/userlookup.phtml?user=')]/text())");

	if (css_link && username) {
		var themes = { // value : [css, name, random_images]
			"10"	: ["010_acp_6ffcb", "Altador Cup", 16],
			"11"	: ["011_alc_c1d1c", "Altadorian Constellations", 12],
			"24"	: ["024_aota_3db1f", "Atlas of the Ancients", 10],
			"29"	: ["029_awk_15364", "Battleground: Awakened", 6],
			"30"	: ["030_brt_19821", "Battleground: Brute Squad", 6],
			"32"	: ["032_ord_635af", "Battleground: Order of the Red Erisim", 6],
			"34"	: ["034_tvg_yg724", "Battleground: Thieves Guild", 6],
			"33"	: ["033_swy_82090", "Battleground: The Sway", 6],
			"8"		: ["008_com_e529a", "Curse of Maraqua", 10],
			"12"	: ["012_tcg_d977a", "Cyodrake's Gaze", 8],
			"23"	: ["023_dyd_c470b", "Daily Dare", 10],
			"26"	: ["026_fon_f2c70", "Festival of Neggs", 7],
			"4"		: ["004_bir_a2e60", "Happy Birthday", 7],
			"3"		: ["003_hws_9bde9", "Haunted Woods", 11],
			"28"	: ["028_kri_306cb", "Krawk Island", 7],
			"0"		: ["000_def_f65b1", "Neopets Basic", 15],
			"16"	: ["016_blu_e56fc", "Neopets Blue", 15],
			"17"	: ["017_grn_f0c1a", "Neopets Green", 15],
			"18"	: ["018_prpl_f65b1", "Neopets Purple", 9],
			"15"	: ["015_red_062bf", "Neopets Red", 15],
			"14"	: ["014_yel_d187b", "Neopets Yellow", 15],
			"20"	: ["020_ppl_3c22d", "Petpet Protection League", 15],
			"21"	: ["021_cpa_5ce03", "Puzzle Adventure", 19],
			"9"		: ["009_qas_93707", "Qasalan", 9],
			"22"	: ["022_lqc_d2d1a", "Quizara's Curse", 9],
			"7"		: ["007_sfp_273a8", "Space Faerie Premium", 4],
			"13"	: ["013_tow_4b54b", "Tale of Woe", 10],
			"25"	: ["025_tfr_5ce03", "The Faeries' Ruin", 8],
			"19"	: ["019_sloth1_7f914", "The Return of Dr. Sloth", 13],
			"27"	: ["027_tkg_69097", "Treasure Keepers", 11],
			"35"	: ["035_tmo_we6g3", "Tyrannia: Mysterious Obelisk", 14],
			"6"		: ["006_val_d85a0", "Valentine's Day", 9],
			"5"		: ["005_win_57061", "Winter Holiday", 11]
		},
		def_theme = /\/(\w+)\.css/.test(css_link.href) && RegExp.$1,
		css_value = GM_getValue(username + "-css", def_theme).split(","),
		thm_images = xpath(".//img[contains(@src, '/themes/') and not(contains(@src, '/rotations/'))]"),
		rnd_image = xpath("id('footer')/img[contains(@src, '/themes/') and contains(@src, '/rotations/')]")[0];
		
		function changeTheme(theme) {
			css_link.href = css_link.href.replace(/\w+\.css/, theme[0] + ".css");
			rnd_image.src = rnd_image.src.replace(/\w+\/rotations\/\d+/, theme[0] + "/rotations/" + Math.floor(1 + (theme[1] || 4) * Math.random()));
			
			for each (var img in thm_images) {
				img.src = img.src.replace(/themes\/\w+/, "themes/" + theme[0]);
			}
		}

		if (def_theme != css_value[0]) {
			changeTheme(css_value);
		}

		if (location.pathname == "/preferences.phtml") {
			var user_theme = xpath("id('content')//form//select[@name='user_theme']")[0],
			selected = user_theme.options[user_theme.selectedIndex].value || "0";

			for (var ai = 0, at = user_theme.options.length; ai < at; ++ai) {	// remove themes that are already in list
				var opt = user_theme.options[ai],
				bi = opt.value;

				if (themes[bi]) {
					opt.setAttribute("css", themes[bi][0] + "," + themes[bi][2]);
					
					delete themes[bi];
				}
			}

			for each (var t in themes) {	// add the new ones at the end of the list
				var opt = new Option(t[1], selected);

				opt.style.backgroundColor = "#FFDFDF";
				opt.setAttribute("css", t[0] + "," + t[2]);

				if (css_value[0] == t[0]) {
					opt.selected = true;
				}

				user_theme.appendChild(opt);
			}

			user_theme.addEventListener("change", function(e) {	// automatically changes the theme
				var css = e.target.options[e.target.selectedIndex].getAttribute("css");

				if (css) {
					changeTheme(css.split(","));
				} else {
					GM_deleteValue(username + "-css");
					e.target.form.submit();
				}
			}, false);

			// stores the selected theme
			xpath(".//td[@class = 'content']/div/form//input[@type = 'submit']")[0].form.addEventListener("submit", function (e) {
				var css = user_theme.options[user_theme.selectedIndex].getAttribute("css");

				if (css) {
					GM_setValue(username + "-css", css);
				} else {
					GM_deleteValue(username + "-css");
				}
			}, false);
		}
	}
}());