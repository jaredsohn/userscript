// ==UserScript==
// @name           nCore Spooky Maker
// @namespace      http://tothimre.dyndns-home.com/svn
// @description    nCore-on a Spooky Dayz-hez hasonlóan figurákat jelenít meg az oldalon
// @author         Tóth Imre
// @copyright      (C) 2012-2013  Tóth Imre
// @icon           http://ncore.cc/static/images/spooky2.png
// @include        /^https?://ncore\.(cc|nu)\/.*/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @resource       spooky1 http://ncore.cc/static/images/spooky1.png
// @resource       spooky2 http://ncore.cc/static/images/spooky2.png
// @resource       spooky3 http://ncore.cc/static/images/spooky3.png
// @resource       spooky4 http://ncore.cc/static/images/spooky4.png
// @resource       spooky5 http://ncore.cc/static/images/spooky5.png
// @resource       spooky6 http://ncore.cc/static/images/spooky6.png
// @resource       spooky7 http://ncore.cc/static/images/spooky7.png
// @resource       spooky8 http://ncore.cc/static/images/spooky8.png
// @resource       spooky9 http://ncore.cc/static/images/spooky9.png
// @resource       spooky10 http://ncore.cc/static/images/spooky2013_1.png
// @resource       spooky11 http://ncore.cc/static/images/spooky2013_2.png
// @resource       spooky12 http://ncore.cc/static/images/spooky2013_3.png
// @resource       spooky13 http://ncore.cc/static/images/spooky2013_4.png
// @resource       spooky14 http://ncore.cc/static/images/spooky2013_5.png
// @resource       spooky15 http://ncore.cc/static/images/spooky2013_6.png
// @resource       spooky16 http://ncore.cc/static/images/spooky2013_7.png
// @resource       spooky17 http://ncore.cc/static/images/spooky2013_8.png
// @resource       spooky18 http://ncore.cc/static/images/spooky2013_9.png
// @resource       spooky19 http://ncore.cc/static/images/spooky2013_10.png
// @resource       spooky20 http://ncore.cc/static/images/spooky2013_11.png
// @resource       spooky21 http://ncore.cc/static/images/spooky2013_12.png
// @resource       spooky22 http://ncore.cc/static/images/spooky2013_13.png
// @resource       spooky23 http://ncore.cc/static/images/spooky2013_14.png
// @resource       spooky24 http://ncore.cc/static/images/spooky2013_15.png
// @resource       spooky25 http://ncore.cc/static/images/spooky2013_16.png
// @resource       spooky26 http://ncore.cc/static/images/spooky2013_17.png
// @resource       spooky27 http://ncore.cc/static/images/spooky2013_18.png
// @resource       spooky28 http://ncore.cc/static/images/spooky2013_19.png
// @resource       spooky29 http://ncore.cc/static/images/spooky2013_20.png
// @resource       spooky30 http://ncore.cc/static/images/spooky2013_21.png
// @resource       spooky31 http://ncore.cc/static/images/spooky2013_22.png
// @resource       spooky32 http://ncore.cc/static/images/spooky2013_23.png
// @resource       spooky33 http://ncore.cc/static/images/spooky2013_24.png
// @resource       spooky34 http://ncore.cc/static/images/spooky2013_25.png
// @resource       spooky35 http://ncore.cc/static/images/spooky2013_26.png
// @resource       spooky36 http://ncore.cc/static/images/spooky2013_27.png
// @resource       spooky37 http://ncore.cc/static/images/spooky2013_28.png
// @resource       spooky38 http://ncore.cc/static/images/spooky2013_29.png
// @resource       spooky39 http://ncore.cc/static/images/spooky2013_30.png
// @resource       spooky40 http://ncore.cc/static/images/spooky2013_31.png
// @resource       spooky41 http://ncore.cc/static/images/spooky2013_32.png
// @resource       spooky42 http://ncore.cc/static/images/spooky2013_33.png
// @resource       spooky43 http://ncore.cc/static/images/spooky2013_34.png
// @resource       spooky44 http://ncore.cc/static/images/spooky2013_35.png
// @resource       spooky45 http://ncore.cc/static/images/spooky2013_36.png
// @resource       spooky46 http://ncore.cc/static/images/spooky2013_37.png
// @resource       spooky47 http://ncore.cc/static/images/spooky2013_38.png
// @resource       spooky48 http://ncore.cc/static/images/spooky2013_39.png
// @resource       spooky49 http://ncore.cc/static/images/spooky2013_40.png
// @resource       spooky50 http://ncore.cc/static/images/spooky2013_41.png
// @resource       spooky51 http://ncore.cc/static/images/spooky2013_42.png
// @resource       spooky52 http://ncore.cc/static/images/spooky2013_43.png
// @resource       spooky53 http://ncore.cc/static/images/spooky2013_44.png
// @resource       spooky54 http://ncore.cc/static/images/spooky2013_45.png
// @resource       spooky55 http://ncore.cc/static/images/spooky2013_46.png
// @resource       spooky56 http://ncore.cc/static/images/spooky2013_47.png
// @resource       icon http://ncore.cc/static/smilies/jacko.gif
// @version        2013.01
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @grant          GM_getResourceURL
// @grant          GM_addStyle
// @svn-id         $Id: ncore_spooky_maker.user.js 21 2013-11-05 08:22:09Z tothimre $
// ==/UserScript==

/** nCore Spooky Maker
 *  Copyright (C) 2012-2013  Tóth Imre (ti00652 at gmail)
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

var settings = {
	max_interval: 60,	// maximum ennyi időközönként rakja ki a figurákat
}
var autohide_timer;
var count = {};


/*
 *  FÜGGVÉNYEK
 */

 
function init() {
	GM_addStyle("#nsm_spo0ky { z-index: 2001; position: fixed; width: 100px; }\n" +
		"#nsm_spo0ky img { cursor: pointer; }");
	count.all = GM_getValue("count_all", 0);
	count.caught = GM_getValue("count_caught", 0);
	$(window).bind("beforeunload", function() {	// oldal elhagyása előtt a statisztika mentése
		GM_setValue("count_all", count.all);
		GM_setValue("count_caught", count.caught);
	});
	
	var infosav = $("#infosav_extra");
	var menu = $('a[href="spooky.php"]', infosav);
	if (menu.length)
		menu.click(show_stat);
	else {
		infosav.prepend('<div class="i_e_vonal />');
		infosav.prepend('<div style="float: left; height: 18px; width: 18px;"><a title="Spo0ky" href="spooky.php" id="nsm_log"><img class="i_e_link" src="' + GM_getResourceURL("icon") + '"></a></div>');
		$("#nsm_log").click(show_stat);
	}
	start_timer();
}

function start_timer() {
	var interval = random(16, settings.max_interval);	// ne jelenjenek meg túl gyakran
	setTimeout(add_pumpkin, interval * 1000);
}

function add_pumpkin() {
	// [ablak szélessége] - 2x [margó] - [kép mérete]
	var left = random(10, $(window).width() - 119);
	var top = random(10, $(window).height() - 119);
	var div = $("<div>", {
		id: "nsm_spo0ky",
		style: "left: " + left + "px; top: " + top + "px;"
	});
	div.click(function() {
		count.caught++;
		clearTimeout(autohide_timer);
		remove_pumpkin();
	});
	var num = random(1, 56);
	var img = $("<img>").attr("src", GM_getResourceURL("spooky" + num));
	div.append(img);
	$("body").append(div);
	count.all++;
	autohide_timer = setTimeout(remove_pumpkin, 15000);
	start_timer();
}

function remove_pumpkin() {
	$("#nsm_spo0ky").fadeOut("slow", function() { $(this).remove(); });
}


function show_stat() {
	var percent = count.caught / count.all * 100;
	alert("Elkapott tökök: " + count.caught + " (" + percent.toFixed(0) + "%)\nÖsszes tök: " + count.all);
	return false;
}

function reset_stat() {
	count.all = 0;
	count.caught = 0;
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1 )) + min;
}


/*
 *  SCRIPT AKTIVÁLÁSA
 */


init();
GM_registerMenuCommand("[NSM] Statisztika megjelenítése", show_stat);
GM_registerMenuCommand("[NSM] Statisztika törlése", reset_stat);

// firebug konzol alól is legyen jQuery
//unsafeWindow.$$=jQuery;
