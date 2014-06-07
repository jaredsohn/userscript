// ==UserScript==
// @name           Web Storage to Greasemonkey
// @namespace      http://tothimre.dyndns-home.com/svn
// @description    Save HTML5 Web Storage values to Greasemonkey and load it back (eg. in private browsing)
// @author         Tóth Imre
// @copyright      (C) 2014  Tóth Imre
// @include        http*://*
// @grant          GM_getValue
// @grant          GM_listValues
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @version        1.0
// ==/UserScript==

/** Web Storage to Greasemonkey
 *  Copyright (C) 2014  Tóth Imre (ti00652 at gmail)
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


var host = location.hostname;

function web_storage_to_gm() {
	var data = {};
	if (typeof(localStorage) !== "undefined") {
		for (var i in localStorage)
			data[i] = localStorage[i];
		if (data.length)
			GM_setValue("data_" + host, JSON.stringify(data));
	}
}

function gm_to_web_storage() {
	var data;
	var value = GM_getValue("data_" + host);
	if (value.length) {
		data = JSON.parse(value);
		for (var i in data)
			localStorage[i] = data[i];
	}
}

GM_registerMenuCommand("Web Storage to Greasemonkey", web_storage_to_gm);
GM_registerMenuCommand("Greasemonkey to Web Storage", gm_to_web_storage);
