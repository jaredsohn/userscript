// ==UserScript==
// @name           Dj Hlásznyik (djhlasznyik.hu) letöltés javítás
// @namespace      http://tothimre.homelinux.net/svn
// @description    A djhlasznyik.hu oldalon közvetlen letöltés linkeket helyez el, a PHP-s letöltést megkerülve
// @author         Tóth Imre
// @copyright      (C) 2011-2012  Tóth Imre
// @include        http://djhlasznyik.hu/letoltes.html*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version        1.1
// @svn-id         $Id: DjHlásznyik_download_fix.user.js 5 2012-03-22 12:31:48Z tothimre $
// ==/UserScript==

/** Dj Hlásznyik (djhlasznyik.hu) letöltés javítás
 *  Copyright (C) 2011-2012  Tóth Imre (ti00652 at gmail)
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

// TODO:
// ajax on demand
var tracks = 0;
// a "közvetlen letöltés"-re kattintva megjelenő parancs
// pl. wget {url} -O "{file_name}"
//     curl {url} -o "{file_name}"
var download_command = 'wget {url} -O "{file_name}"';

function init() {
	// kinézet beállítása 
	GM_addStyle("#dhdf_info { color: #FFFFFF; display: none; position: fixed; top: 0px; left: 0px; padding: 3px; font-size: 8pt; font-weight: bold; background-color: blue; z-index: 9999; }" +
		"#dhdf_check_cancel { color: #FFFFFF; }");
	$("body").append('<div id="dhdf_info"></div>');

	$.ajaxSetup({
		type: "GET",
		dataType: "text",
		url: "/modules/player.php",
	});

	// egybe tarzozó div-ek megjelölése
	x = y = 1;
	$("div[id^=x_] > div").each(function() {
		$(this).addClass("dhdf_track_" + y);
		if (x % 2 == 0)
			y++;
		x++;
	});

	$("div[id^=letoltes]").each(function() {
		if ($(this).attr("id").match(/letoltes_ertekeles/))
			return;
		$(this).addClass("dhdf_get_details");
		tracks++;
	});
	get_track_data();

	// firebug konzol alól is legyen jQuery
	unsafeWindow.ß=jQuery;
}

function get_track_data() {
	track = $(".dhdf_get_details:first");
	if (track.length) {
		get_track_data.count = ++get_track_data.count || 1;
		$("#dhdf_info").html('Szám adatainak letöltése (' + get_track_data.count + '/' + tracks + ')').show();
		id = track.attr("id").match(/letoltes(\d+)/)[1];
		target = track.attr("class").match(/dhdf_track_(\d+)/)[1];
		$.ajax({
			data: { trackid: id },
			success: function(data) {
				x = data.match(/&cim=(.+)&track=(.+)&/);
				title = x[1];
				url = x[2];
				$("div[class=dhdf_track_" + target + "]:first > a").after(' <a id="dhdf_dl_' + id + '" href="' + url +'" title="' + title +'"><small>[közvetlen letöltés]</small></a> ');
				$("#dhdf_dl_" + id).click(get_command);
				$(track).removeClass("dhdf_get_details");
				if (get_track_data.count <= tracks)
					get_track_data();
			}
		});
	} else
		setTimeout(function(){ $("#dhdf_info").hide(); }, 2000);
}

function get_command() {
	url = $(this).attr("href");
	title = $(this).attr("title");
	ext = url.match(/\.(\w+)$/)[1];
	command = download_command.replace("{url}", url).replace("{file_name}", title + "." + ext);
	prompt("Másold ki a letöltési parancsot innen (CTRL+C):", command);
	return false;
}


init();
