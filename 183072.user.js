// ==UserScript==
// @name           rTWi stylish
// @namespace      http://tothimre.dyndns-home.com/svn
// @description    A http://hyena.hu seed szerverén futó rTWi kinézetét módosítja
// @author         Tóth Imre
// @copyright      (C) 2012-2013  Tóth Imre
// @include        http://denber.hu/*
// @include        /https?://(debian\.intra|tothimre\.dyndns-home\.com)/admin/rtwi/.*/
// @include        http://zilla.hu/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        http://tothimre.dyndns-home.com/lib/ColorPicker/js/colorpicker.js
// @resource       colorpicker_css http://tothimre.dyndns-home.com/lib/ColorPicker/css/colorpicker.css
// @resource       colorpicker_background http://tothimre.dyndns-home.com/lib/ColorPicker/images/colorpicker_background.png
// @resource       colorpicker_overlay http://tothimre.dyndns-home.com/lib/ColorPicker/images/colorpicker_overlay.png
// @resource       colorpicker_select http://tothimre.dyndns-home.com/lib/ColorPicker/images/colorpicker_select.gif
// @resource       colorpicker_indic http://tothimre.dyndns-home.com/lib/ColorPicker/images/colorpicker_indic.gif
// @resource       colorpicker_hex http://tothimre.dyndns-home.com/lib/ColorPicker/images/colorpicker_hex.png
// @resource       colorpicker_rgb_r http://tothimre.dyndns-home.com/lib/ColorPicker/images/colorpicker_rgb_r.png
// @resource       colorpicker_rgb_g http://tothimre.dyndns-home.com/lib/ColorPicker/images/colorpicker_rgb_g.png
// @resource       colorpicker_rgb_b http://tothimre.dyndns-home.com/lib/ColorPicker/images/colorpicker_rgb_b.png
// @resource       colorpicker_hsb_h http://tothimre.dyndns-home.com/lib/ColorPicker/images/colorpicker_hsb_h.png
// @resource       colorpicker_hsb_s http://tothimre.dyndns-home.com/lib/ColorPicker/images/colorpicker_hsb_s.png
// @resource       colorpicker_hsb_b http://tothimre.dyndns-home.com/lib/ColorPicker/images/colorpicker_hsb_b.png
// @resource       colorpicker_submit http://tothimre.dyndns-home.com/lib/ColorPicker/images/colorpicker_submit.png
// @version        2.3.2
// @icon           http://denber.hu/favicon.ico
// @svn-id         $Id: rTWi stylish.user.js 14 2012-03-15 08:35:26Z tothimre $
// ==/UserScript==

/** rTWi stylish
 *  Copyright (C) 2012  Tóth Imre (ti00652 at gmail)
 *
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 *  Ez a program szabad szoftver; terjeszthető illetve módosítható a 
 *  Free Software Foundation által kiadott GNU General Public License
 *  dokumentumában leírtak; akár a licenc 3-as, akár (tetszőleges) későbbi 
 *  változata szerint.
 *
 *  Ez a program abban a reményben kerül közreadásra, hogy hasznos lesz, 
 *  de minden egyéb GARANCIA NÉLKÜL, az ELADHATÓSÁGRA vagy VALAMELY CÉLRA 
 *  VALÓ ALKALMAZHATÓSÁGRA való származtatott garanciát is beleértve. 
 *  További részleteket a GNU General Public License tartalmaz.
 *
 *  A felhasználónak a programmal együtt meg kell kapnia a GNU General 
 *  Public License egy példányát; ha mégsem kapta meg, akkor
 *  tekintse meg a <http://www.gnu.org/licenses/> oldalon (nem hivatalos magyar
 *  fordítás: <http://gnu.hu/gplv3.html/>).
 */


// beállítások; v2+: használd az UI-t a beállításhoz!
var settings = {
	background_color: "FFFFFF",		// háttér színe (hexa módban)
	active_speed_color: "FF00FF",	// aktív torrent sebességének színe (hexa módban)
	ratio_limit: 1.000,				// cél arány, ez felett és alatt más színnel lesznek színezve a torrentek
	ratio_color_good: "008000",		// cél arányt elért torrent arányának színe (hexa módban)
	ratio_color_bad: "FF0000"		// cél arányt el nem ért torrent arányának színe (hexa módban)
};

var loc = window.location;

// függvények
function init() {
	// beállítások betöltése
	$.extend(settings, JSON.parse(GM_getValue("settings_" + loc.hostname, "{}")));

	// stílus beállítása
	GM_addStyle("body { background: none repeat scroll 0 0 #" + settings["background_color"] + " !important; }\n" +	// ronda (fos)sárga háttér (#ECE5B6) eltüntetése
		".tline:hover { background-color: #E0E0E0; }\n" +	// torrent sorának kiemelése, ha fölékerül az egér
		".ds_active_speed { color: #" + settings["active_speed_color"] + "; }\n" +	// sebesség kiemelés stílusa
		".ds_ratio_good { color: #" + settings["ratio_color_good"] + "; }\n" +	// arány kiemelés stílusa
		".ds_ratio_bad { color: #" + settings["ratio_color_bad"] + "; }");	// arány kiemelés stílusa


	// sebességek, arány kiemelése (hogy hogyan, azt függvénye válogatja)
	if (loc.pathname.match(/\/(index\.php|$)/)) {
		$("div.trates > span").each(highlight_active_speed);	// torrent lista
		$("div.trates_total > span").each(highlight_active_speed);	// globális sebesség
		$("div.tratio > span:last-child").each(highlight_active_ratio);	// arány
	}

	// beállítások menüpont
	var menu = $("#mainmenu");
	if (menu.length) {
		$("ul", menu).append('<li><a id="ds_settings" href="#">Stylish beállítások</a></li>');
		$("#ds_settings").click(show_settings);
	}

	// tárhely adatok átírása a torrent hozzáadása fülön
	if (loc.search.match(/\?mod=addtorrent/)) {
		var disk_space_div = $("div.tufspace:first");
		var disk_space = disk_space_div.text().match(/(\d+)(\w+) \/ (\d+)(\w+)/);
		// " 45122M / 45056M"
		if (disk_space[2] == disk_space[4])	// ha mások a prefixek, nem csinálunk semmit
			disk_space_div.text(disk_space[0] + " használatban, " + (disk_space[3] - disk_space[1]) + disk_space[2] + " szabad");
		else
			disk_space_div.text(disk_space[0] + " használatban");
	}

	// konzol alól is legyen jQuery
	unsafeWindow.$$=jQuery;
}

// kiemeli a torrent sebességét
function highlight_active_speed() {
	var speed = $(this).text().match(/([\d\.]+)/)[1];
	if (speed > 0)
		$(this).attr("class", "ds_active_speed");
}

// kiemeli a torrent arányát
function highlight_active_ratio() {
	var ratio = $(this).text().match(/([\d\.]+)/)[1];
	if (ratio >= settings["ratio_limit"])
		$(this).attr("class", "ds_ratio_good");
	else
		$(this).attr("class", "ds_ratio_bad");
}

// felépíti és megjeleníti a beállításokat
function show_settings() {
	if ($("#ds_settings_body").length)	// ha már meg van nyitva a menü, kilépünk
		return false;

	// ColorPicker stílus hozzáadása
	GM_addStyle(GM_getResourceText("colorpicker_css") + "\n" +
		".colorpicker { background: url(" + GM_getResourceURL("colorpicker_background") + "); }\n" +	// képek linkjének átírása; a CSS-t is át lehetne írni és úgy feltölteni, viszont akkor nem cache-elné GM a fájlt
		".colorpicker_color div { background: url(" + GM_getResourceURL("colorpicker_overlay") + "); }\n" +
		".colorpicker_color div div { background: url(" + GM_getResourceURL("colorpicker_select") + "); }\n" +
		".colorpicker_hue div { background: url(" + GM_getResourceURL("colorpicker_indic") + ") left top; }\n" +
		".colorpicker_hex { background: url(" + GM_getResourceURL("colorpicker_hex") + ") top; }\n" +
		".colorpicker_rgb_r { background-image: url(" + GM_getResourceURL("colorpicker_rgb_r") + "); }\n" +
		".colorpicker_rgb_g { background-image: url(" + GM_getResourceURL("colorpicker_rgb_g") + "); }\n" +
		".colorpicker_rgb_b { background-image: url(" + GM_getResourceURL("colorpicker_rgb_b") + "); }\n" +
		".colorpicker_hsb_h { background-image: url(" + GM_getResourceURL("colorpicker_hsb_h") + "); }\n" +
		".colorpicker_hsb_s { background-image: url(" + GM_getResourceURL("colorpicker_hsb_s") + "); }\n" +
		".colorpicker_hsb_b { background-image: url(" + GM_getResourceURL("colorpicker_hsb_b") + "); }\n" +
		".colorpicker_submit { background: url(" + GM_getResourceURL("colorpicker_submit") + ") top; }");

/* nem működik
// @resource       layout_js http://denber.hu/images/js/layout.js
// @resource       layout_css http://denber.hu/images/css/layout.css
// @resource       select http://tothimre.dyndns-home.com/lib/ColorPicker//select.png
// @resource       select2 http://tothimre.dyndns-home.com/lib/ColorPicker//select2.png
// @resource       custom_background http://tothimre.dyndns-home.com/lib/ColorPicker//custom_background.png
// @resource       custom_indic http://tothimre.dyndns-home.com/lib/ColorPicker//custom_indic.gif
// @resource       custom_hex http://tothimre.dyndns-home.com/lib/ColorPicker//custom_hex.png
// @resource       custom_rgb_r http://tothimre.dyndns-home.com/lib/ColorPicker//custom_rgb_r.png
// @resource       custom_rgb_g http://tothimre.dyndns-home.com/lib/ColorPicker//custom_rgb_g.png
// @resource       custom_rgb_b http://tothimre.dyndns-home.com/lib/ColorPicker//custom_rgb_b.png
// @resource       custom_hsb_s http://tothimre.dyndns-home.com/lib/ColorPicker//custom_hsb_s.png
// @resource       custom_hsb_h http://tothimre.dyndns-home.com/lib/ColorPicker//custom_hsb_h.png
// @resource       custom_hsb_b http://tothimre.dyndns-home.com/lib/ColorPicker//custom_hsb_b.png
// @resource       custom_submit http://tothimre.dyndns-home.com/lib/ColorPicker//custom_submit.png

	GM_addStyle(GM_getResourceText("layout_css") + "\n" +	// fehér ColorPicker
		"#colorSelector { background: url(" + GM_getResourceURL("select") + "); }\n" +
		"#colorSelector div { background: url(" + GM_getResourceURL("select") + ") center; }\n" +
		"#colorSelector2 { background: url(" + GM_getResourceURL("select2") + "); }\n" +
		"#colorSelector2 div { background: url(" + GM_getResourceURL("select2") + ") center; }\n" +
		"#colorpickerHolder2 .colorpicker { background-image: url(" + GM_getResourceURL("custom_background") + "); }\n" +
		"#colorpickerHolder2 .colorpicker_hue div { background-image: url(" + GM_getResourceURL("custom_indic") + "); }\n" +
		"#colorpickerHolder2 .colorpicker_hex { background-image: url(" + GM_getResourceURL("custom_hex") + "); }\n" +
		"#colorpickerHolder2 .colorpicker_rgb_r { background-image: url(" + GM_getResourceURL("custom_rgb_r") + "); }\n" +
		"#colorpickerHolder2 .colorpicker_rgb_g { background-image: url(" + GM_getResourceURL("custom_rgb_g") + "); }\n" +
		"#colorpickerHolder2 .colorpicker_rgb_b { background-image: url(" + GM_getResourceURL("custom_rgb_b") + "); }\n" +
		"#colorpickerHolder2 .colorpicker_hsb_s { background-image: url(" + GM_getResourceURL("custom_hsb_s") + "); }\n" +
		"#colorpickerHolder2 .colorpicker_hsb_h { background-image: url(" + GM_getResourceURL("custom_hsb_h") + "); }\n" +
		"#colorpickerHolder2 .colorpicker_hsb_b { background-image: url(" + GM_getResourceURL("custom_hsb_b") + "); }\n" +
		"#colorpickerHolder2 .colorpicker_submit { background-image: url(" + GM_getResourceURL("custom_submit") + "); }");
*/

	// beállítások megjelenítése
	GM_addStyle(".ds_bad_field { border: 2px solid red }\n" +	// hibás mező stílusa
		".ds_settings_left { float: left; font-weight: bold; width: 17%; }\n" +	// bal oszlop stílusa
		".ds_settings_right {float: left; width: 83%; }\n" +	// jobb oszlop stílusa
		".ds_formsend { margin: 1em 0 0 17%; }");	// gombsor stílusa
	var html = '<div id="ds_settings_body"><ul class="tuform">\n' +
		'<li><div class="ds_settings_left">Háttér színe:</div><div class="ds_settings_right"><input id="ds_background_color_field" title="Háttér színe (hexa módban)" type="text"></div><div class="clr"></div></li>\n' +
		'<li><div class="ds_settings_left">Aktív sebesség színe:</div><div class="ds_settings_right"><input id="ds_active_speed_color_field" title="Aktív torrent sebességének a színe (hexa módban)" type="text"></div><div class="clr"></div></li>\n' +
		'<li><div class="ds_settings_left">Cél arány:</div><div class="ds_settings_right"><input id="ds_ratio_limit_field" title="Cél arány (pl. 1.00)" type="text"></div><div class="clr"></div></li>\n' +
		'<li><div class="ds_settings_left">Szín a cél arány felett:</div><div class="ds_settings_right"><input id="ds_ratio_color_good_field" title="Torrent arányának a színe a cél arány felett (hexa módban)" type="text"></div><div class="clr"></div></li>\n' +
		'<li><div class="ds_settings_left">Szín a cél arány alatt:</div><div class="ds_settings_right"><input id="ds_ratio_color_bad_field" title="Torrent arányának a színe a cél arány alatt (hexa módban)" type="text"></div><div class="clr"></div></li>\n' +
		'<li class="ds_formsend"><input id="ds_save_settings" class="inputok" title="Beállítások mentése" value="Beállítások mentése" type="button"> <input id="ds_cancel_save" class="inputok" title="Mégsem" value="Mégsem" type="button"> <input id="ds_default_settings" class="inputok" title="Alapértelmezés visszaállítása" value="Alapértelmezés" type="button"></li>\n' +
		'</ul></div>';
	$("#maincol").html(html);

	// mezők feltöltése az értékekkel, eseménykezelés (ciklusban, mert nem szeretem az ismétlődő sorokat :)
	var x = ["background_color", "active_speed_color", "ratio_limit", "ratio_color_good", "ratio_color_bad"];
	for (i in x)
		$("#ds_" + x[i] + "_field").val(settings[x[i]]).change(lock_page);
	$("#ds_background_color_field, #ds_active_speed_color_field, #ds_ratio_color_good_field, #ds_ratio_color_bad_field").ColorPicker({
		onSubmit: function(hsb, hex, rgb, el) {
			lock_page();
			$(el).val(hex.toUpperCase());
			$(el).ColorPickerHide();
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor(this.value);
		}
	}).bind('keyup', function(){
		$(this).ColorPickerSetColor(this.value);
	});
	$("#ds_save_settings").click(save_settings);
	$("#ds_cancel_save").click(reload_page);
	$("#ds_default_settings").click(reset_settings);
	return false;
}

// validálja és menti a beállításokat
function save_settings() {
	// előző üzenet és mező kiemelés törlése
	$("#err").remove();
	$(".ds_bad_field").removeClass("ds_bad_field");

	// color mezők validálása
	var x = ["background_color", "active_speed_color", "ratio_color_good", "ratio_color_bad"];
	var errors = 0;
	var field, val;
	for (i in x) {
		field = $("#ds_" + x[i] + "_field");
		val = $.trim(field.val());
		if (!val.match(/^[\da-f]{3,6}$/i)) {
			errors++;
			field.addClass("ds_bad_field");
		} else
			settings[x[i]] = val.toUpperCase();
	}
	if (errors) {
		show_info("Érvénytelen szín!");
		return false;
	}

	// ratio mező validálása
	field = $("#ds_ratio_limit_field");
	val = $.trim(field.val());
	if (!val.match(/^\d+\.?\d*$/)) {
		field.addClass("ds_bad_field");
		show_info("Érvénytelen szám!");
		return false;
	} else
		settings["ratio_limit"] = parseFloat(val);

	GM_setValue("settings_" + loc.hostname, JSON.stringify(settings));
	show_info("Beállítások elmentve");
	setTimeout(reload_page, 3000);
	return false;
}

// törli a beállításokat és újratölti az oldalt
function reset_settings() {
	GM_setValue("settings_" + loc.hostname, "{}");
	reload_page();
}

// az oldal elhagyásakor figyelmeztető üzenetet jelenít meg (meta refresh ellen)
function lock_page() {
	$(window).bind("beforeunload", function () {
		return "A változások még nincsenek mentve. Ha most elhagyod az oldalt, a módosítások elvesznek!";
	});
}

// törli a figyelmezető üzenetet, és újratölti az oldalt
function reload_page() {
	$(window).unbind("beforeunload");
	loc.reload()
}

// információt jelenít meg a torrentlista felett
function show_info(message) {
	$("#maincol").prepend('<div title="Kattints ide az elrejtéshez" id="err" style="cursor: pointer;"><div>' + message + '</div></div>');
	$("#err").click(function() {
		$(this).slideUp();
		setTimeout(function () { $("#err").remove(); }, 1000);
	});
}


// script aktiválása
init();
