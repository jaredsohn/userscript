/********************** LICENSE NOTES *****************************
Travian Map Analyser - the lightweight aplication for the game Travian (C)
Copyright (C) 2008 - 2009 Booboo <scripts.booboo@gmail.com>

This program is Free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
******************************************************************/

var headers = parseHeaders(<><![CDATA[
// ==UserScript==
// @name 			Travian Map Analyser
// @description		Térkép elemző és sokbúzás völgy kereső. | Map analyser and multicrop finder.
// @namespace		http://booboo.cwi.hu
// @version			1.11.13
// @versionmodification		SQL-Export added by blablubbb
// @author			Booboo
// @copyright		Booboo
// @e-mail			scripts.booboo@gmail.com
// @include	http://*.travian.*/*.php*
// @exclude	http://*.travian.*/hilfe.php*
// @exclude	http://*.travian.*/log*.php*
// @exclude	http://*.travian.*/index.php*
// @exclude	http://*.travian.*/anleitung.php*
// @exclude	http://*.travian.*/impressum.php*
// @exclude	http://*.travian.*/anmelden.php*
// @exclude	http://*.travian.*/gutscheine.php*
// @exclude	http://*.travian.*/spielregeln.php*
// @exclude	http://*.travian.*/links.php*
// @exclude	http://*.travian.*/geschichte.php*
// @exclude	http://*.travian.*/karte2.php*
// @exclude	http://*.travian.*/tutorial.php*
// @exclude	http://*.travian.*/manual.php*
// @exclude	http://*.travian.*/ajax.php*
// @exclude	http://*.travian.*/ad/*
// @exclude	http://*.travian.*/chat/*
// @exclude	http://ads.travian.*
// @exclude	http://forum.travian*.*
// @exclude	http://board.travian*.*
// @exclude	http://shop.travian*.*

// @news !News in this release:
// @news The background functions of this script have moved to another host, please update for proper functioning!
// @news A few modification was made to the GUI.
// @news !To translaters - the following languages need to be updated:
// @news Italian
// @news Russian
// @news Dutch
// @news French
// @news Brazilian and Portuguese
// @news Romanian
// @news Turkish
// @news Serbian
// @news Chinese
// @news Indonesian
// @news <a href='http://userscripts.org/scripts/discuss/28846' target='_blank'>Click here for the langpacks</a>
/* *******SQL-Mod*******
This is a slightly modded Version of the original Script from Booboo to have a methode to import the results 
into a SQL-Database like MySQL and MySQLi. I didn't check the compability of other SQL-Databases,
but probably it will also work. If not, please report, how the SQL syntax have to be changed and 
I will make an additional export function. To minimize the ammount of space used up, I used a tiny integer
instead of a string. That must be translated back when making a querry, either by a LEFT JOIN querry with a 
small table connecting the type_id with a type_string, or you can do it within the interface, like a switch
in the php-Code. I used this funktion to do it:
function MkTypTxt($typeid){ switch($typeid){
case 0:
return'3-3-3-9';
break;
case 1:
return '3-4-5-6';
break;
case 2:
return '4-4-4-6';
break;
case 3:
return '4-5-3-6';
break;
case 4:
return '5-3-4-6';
break;
case 5:
return '1-1-1-15';
break;
case 6:
return '4-4-3-7';
break;
case 7:
return '3-4-4-7';
break;
case 8:
return '4-3-4-7';
break;
case 9:
return '3-5-4-6';
break;
case 10:
return '4-3-5-6';
break;
case 11:
return '5-4-3-6';
break;
case 12:
return 'Lumber-Oasis';
break;
case 13:
return 'Lumber+Crops-Oasis';
break;
case 14:
return 'Clay-Oasis';
break;
case 15:
return 'Clay+Crops-Oasis';
break;
case 16:
return 'Iron-Oasis';
break;
case 17:
return 'Iron+Crops-Oasis';
break;
case 18:
return '25% Crops-Oasis';
break;
case 19:
return '50% Crops-Oasis';
break;
default: 
return '';
break;
}}
********************* */
// ==/UserScript==
]]></>.toXMLString().split(/[\r\n]+/).filter(/\/\/ @/));
/******************************************** init  begin ***************************************************/

/* XPath result types */
const XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
const XPList = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

var server = window.location.host;
var verUrl = "http://userscripts.org/scripts/show/28846";
var hostUrl = "http://tma.hungariahost.0lx.net/script/travian/tma/";
var fileHost = hostUrl;
var imgHost = "http://dd_forum.extra.hu/home/img/";
var zonaUrl = "http://" + server + "/karte.php?z=";	// URL a térkép zónákhoz. ehhez jön hozzá a zóna száma. :)
var unitSpeed = parseInt(GM_getValue("unitSpeed_" + server, 5), 10); 	// Telepes | Settler
var timeDifference = timeCounter();
var textDirection = GM_getValue("TEXTDIR", "ltr");	// Írás iránya
var defLang = navigator.appVersion.match(/\(.*;\s+(\w+)[)-]/)[1].toLowerCase();
var langpack = GM_getValue("langpackver");	// Az aktuális nyelvi csomag és verziója
var countryflag = GM_getValue("countryflag", "");
var t35 = (xpath("//div[@id='header']", XPFirst)) ? true : false;	// Travian 3.5

if (!langpack)
{	get(hostUrl + "timestamps.php?lang=" + defLang + "&ver=1.0", function(html)
	{	var lang = xpath("//span[@id='tma_msg']", XPFirst, $elem("div", html)).textContent;
		if (lang == "error")	// There isn't such langpack available.... :'(
		{	langpack = "en|0";
			GM_setValue("langpackver", langpack);
			GM_getValue("countryflag", "en");
			return;
		}
		GM_setValue("langpackver", lang);
		get(hostUrl + "newlang.php?lang=" + lang.split("|")[0] + "&ver=1.0", langLoad);
	});
}

/** A program futási állapota **
recovery =
{	wins:
	{	main:
		{	x: 0,
			y: 0,
			state: "mini"
		},
		search:
		{	x: 0,
			y: 0,
			state: null	// nem fut a funkció
		},
		saveAndLoad:
		{	x: 0,
			y: 0,
			state: "windowed"
		},
		setup:
		{	x: 0,
			y: 0,
			state: "fullscreen"
		},
		hits:
		{	x: 0,
			y: 0,
			state: null
		},
		bonusSearch:
		{	x: 0,
			y: 0,
			state: null
		},
		update:
		{	x: 0,
			y: 0,
			state: null
		},
		dist:
		{	x: 0,
			y: 0,
			state: null
		}
	},
	datas:
	{	main:
		{
		},
		search:
		{	phase: null, 1, 2 / null - nem aktív, 1 - keresési adatok(mit keres), 2 - keresés közben /
			centerOfSearch: 320801, /zónaponttal /
			r: 5, /rádiusz /
			switches: {}, /keresési kapcsolók/
			zpm: 25, /az aktuális zonapont mutató, -1 ha már végetért /
			areas: [], / egy tömbben az area címek /
			amm: 28, /0 és 48 közötti érték, az area mező mutató, -1 ha már körbeért/
			hits: []  /a találatokat itt tároljuk amik már készen vannak; Ha a teljes eredmény lista elkészült akkor azt áthelyezzük a hits adataiba./
			in_search: true - false / ha egy kiértékelést megkezdünk true-ra állítjuk és mikor végeztünk false-ra.
		},
		saveAndLoad:
		{	phase: null, 1, 2, 3 /null - nem aktív, 1 - betöltés, 2 - folytatás, 3 - mentés/
			data: String(),  /az adatok betömörítve vagy éppen tömörítésre várva/
			saved:	/ ha van mentett adat, akkor az alábbi adatokat mentjük ki ide, máskülönben az értéke FALSE.
			{	centerOfSearch: 0,
				r: 0,
				switches: {},
				zpm: -1,
				amm: -1,
				hits: [],
				max_fields: 0,
				fields_done: 0
			}
		},
		setup:
		{	phase: null, 1, 2, 3, /null - nem aktív, 1 - alapértékek, 2 - nyelvek, 3 - színek/
		},
		hits:
		{	data: String() /mint a search hits adata/
			pagers: {}, /a lapozók állaotát ide mentjük ki/
			sdcr: / server, date, center, radius/
			[	"s1.travian.hu",
				Date(),
				321801,
				5
			],
			idx: [],
			winNumber: false,  / Az ablak elérési kódja, hogy kívülről is bezárható legyen.
			unitSpeed: false,  / Átmenetileg megváltoztatott érték
			sortby: ["times", false] , / Az utolsó rendezési elv jelzésére.
			zones: [],
			zpm: -1,
			bonus: false,
			in_search: false
		},
		stat:
		{	max_fields: 0,
			fields_done: 0
		},
		igm: "",	/ Az üzenetben küldött adatokat tárolja.
		update:
		{	phase: null,
			newver: "",
			news: [],
			bugfix: []
		},
		dist:
		{	phase: null,
			koords: [0, 0, 0, 0],
			unitSpeed: unitSpeed
		}
	}
}
**/
var defObj = {
	wins:
	{	main:
		{	x: null,
			y: null,
			state: null
		},
		search:
		{	x: null,
			y: null,
			state: null
		},
		saveAndLoad:
		{	x: null,
			y: null,
			state: null
		},
		setup:
		{	x: null,
			y: null,
			state: null
		},
		hits:
		{	x: null,
			y: null,
			state: null
		},
		bonusSearch:
		{	x: null,
			y: null,
			state: null
		},
		update:
		{	x: null,
			y: null,
			state: null
		},
		dist:
		{	x: null,
			y: null,
			state: null
		}
	},
	datas:
	{	main:
		{
		},
		search:
		{	phase: null,
			centerOfSearch: null,
			r: null,
			switches:
			{	normal: false,
				crop7: false,	// Travian 3.5
				crop: true,
				lumber: false,
				clay: false,
				iron: false,
				o50cr: false,
				o25cr: false,
				o25l: false,
				o25c: false,
				o25i: false
			},
			zpm: -1,
			areas: [],
			amm: -1,
			hits: [],
			in_search: false
		},
		saveAndLoad:
		{	phase: null,
			data: "",
			saved: false
		},
		setup:
		{	phase: null
		},
		hits:
		{	data: [],
			pagers: null,
			sdcr: [],
			idx: null,
			winNumber: false,
			unitSpeed: false,
			sortby: ["times", false],
			zones: [],
			zpm: -1,
			bonus: false,
			in_search: false
		},
		stat:
		{	max_fields: 0,
			fields_done: 0
		},
		igm: "",
		update:
		{	phase: null,
			newver: "",
			news: [],
			bugfix: []
		},
		dist:
		{	phase: null,
			koords: [0, 0, 0, 0],
			unitSpeed: unitSpeed
		}
	}
},
recovery = inherit(defObj),
savedObj = getObj("recovery_" + server), i;
objCopy (recovery, savedObj);

var anim =
{	x: Math.round(Math.random()*280),
	y: Math.round(Math.random()*200),
	top: -4,
	left: 2,
	node: null
}

/** Alapértelmezett szín sablon **/
const DEF_COLOR_STYLE = <><![CDATA[
.tma_f6 {color:#FC0 !important}
.tma_f1 {color:#F90 !important}
.tma_f7, .tma_f8, .tma_f9 {color:#D80 !important}
.tma_f3 {color:#808080 !important}
.tma_f5, .tma_f12 {color:#960 !important}
.tma_f4, .tma_f10 {color:#960 !important}
.tma_f2, .tma_f11 {color:#960 !important}
.tma_o12 {color:#F60 !important}
.tma_o3 {color:#090 !important}
.tma_o6 {color:#090 !important}
.tma_o9 {color:#090 !important}
.tma_o10, .tma_o11 {color:#9C0 !important}
.tma_o1, .tma_o2 {color:#7A0 !important}
.tma_o4, .tma_o5 {color:#7A0 !important}
.tma_o7, .tma_o8 {color:#7A0 !important}
.tma_f6n {color:#DA1 !important}
.tma_f1n {color:#DA1 !important}
.tma_f7n, .tma_f8n, .tma_f9n {color:#D80 !important}
.tma_f3n {color:#000 !important}
.tma_f5n, .tma_f12n {color:#000 !important}
.tma_f4n, .tma_f10n {color:#000 !important}
.tma_f2n, .tma_f11n {color:#000 !important}
.tma_o12n {color:#F00 !important}
.tma_o3n {color:#066 !important}
.tma_o6n {color:#066 !important}
.tma_o9n {color:#066 !important}
.tma_o10n, .tma_o11n {color:#066 !important}
.tma_o1n, .tma_o2n {color:#066 !important}
.tma_o4n, .tma_o5n {color:#066 !important}
.tma_o7n, .tma_o8n {color:#066 !important}
]]></>.toXMLString();

var colorStyle = GM_getValue("colorStyle", DEF_COLOR_STYLE);
GM_addStyle(colorStyle);

// button
var style = "div.tma_button {-moz-user-select:none; cursor:default; display:block; text-align:center; min-height:22px; min-width:35px; width:-moz-fit-content; background-color:#ed6; color:#a24; border:2px outset orange; -moz-border-radius:20px; margin:2px 3px;}";
style += "div.tma_button:active {border:2px inset orange;}";
style += "div.tma_button:hover {background-color:#fe7; color:#b35;}";
// hitlist
style += "table.hitlist {border-collapse:collapse; font-size:10px; margin:5px 5px 3px; text-align:" + (textDirection == "ltr" ? "left" : "right") + ";}";
style += "table.hitlist > tr > td {padding:1px 3px; border:1px solid #ddec94; font-size:10px;}";
style += "table.hitlist > tr > td > div {display:inline-table; margin:0px 1px; font-size:10px;}";
style += "a[lapozo] {color:#0f8339; !important}";
style += "a[lapozo]:hover {color:#0b5d2b; !important}";
// lang selection
style += "select.tma {background-color: ivory;}";
style += "select.tma option {background-repeat:no-repeat; background-position:" + (textDirection == "rtl" ? "left" : "right") + "; min-width:150px; color:darkGoldenRod;}";

/** Képek **/
var IMG = {
// Alap képek
fa: "http://" + server + "/img/un/r/1.gif",
vas: "http://" + server + "/img/un/r/3.gif",
agyag: "http://" + server + "/img/un/r/2.gif",
gabona: "http://" + server + "/img/un/r/4.gif",
// Ablak képek
winBGImage: "",
bodyBGImage: "data:image/gif;base64,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",
normalButtons: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAPCAIAAABBSomtAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAFpJREFUGFc1xUEKQEAAheHnhAZNmCSKWGFWcwhcAHusSIbreRt/X/3O81ow+1j6d5wHYdtXwrxMhGHsCbGKYhVCeK7nCwRSEkKVENKsSPMSVd0QOm1abXBeN33imi1BxxqkZAAAAABJRU5ErkJggg==",
activeButtons: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAPCAIAAABBSomtAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAHFJREFUGFdjXHfx5b8//xnWX3q55uwLGLXszNMlp58wLDj2cO6RewyT99+esOcWQ/3GSzXrLzLoVa/TrFjDoFi8QqZgGYNqxXr5whUMWvWb1SvWMeh37tJr2MpgNeWQRcdeBqcFZ+0nH2GofP15wpMPAKytOJv1t+PyAAAAAElFTkSuQmCC",
fullscreenButtons: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAPCAIAAABBSomtAAAAB3RJTUUH2AsQDwoHeqdoeAAAAAlwSFlzAAAOwgAADsIBFShKgAAAAARnQU1BAACxjwv8YQUAAAAzSURBVHjaY2xoaGBgYGAWFRQUk5BgAjKvXrwIooCA5cuPH0CK6fv37yAKiCEs0gAjxAYA71QOtHY+LFYAAAAASUVORK5CYII=",
closeButton: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAPCAIAAABBSomtAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAHJJREFUGFdjPD97EgMQnJ3We356L8OpiW1nJ7UxHOuqO9Vdx3CoqexYUxnD3rLs/eXZDNsyYnZkxjDMM1ZZaKrCMEtHep6uNMMcU+V5ZsoM8+x0FznoMiz0sVzma8mwPNJzZZQnw9rU8A2poQwn504BIgAQTipdp7AooAAAAABJRU5ErkJggg==",
activeCloseButton: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAPCAIAAABBSomtAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAGpJREFUGFdj/DG3l5GBgQFI/ZzbC6O+TWn6PqWJ4XN3xdfuCoYPNelAxPAyOxiIGC7o8l3S5WM4q8JyXoWF4Zwh10UjLoaLzoKXnQQZrkdI34yUZribp3q/UI3hUb/B44n6DF/vVH69VwkAHGUvZgAw22cAAAAASUVORK5CYII=",
minimize: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAFCAIAAAD+GJp4AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAD1JREFUGFdjDA2P//efnQEf+M4QHJb29+/ff7hBSHg6SNHt23fwgJDwNJCia9eu4wEgReGRKUAKDwqLSAYAyjdn73t67xgAAAAASUVORK5CYII=",
restore: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAAB3RJTUUH2AoCCh42xGzLWAAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAABzSURBVHjaYwwNj///7z87A3HgOwMLSPGq5dMZGBkZCSoPi8xkYAEx7t27z0CEeiD4D9Hw+/dvghpYWVnBNAtMoKa+H6+GzrYyhv//kTSAwJqVM7HaExKe/h/GZiIyeOCABZdJBDWA3EgMYAwOSyNoKjIAAKfXH3xOJLQgAAAAAElFTkSuQmCC",
full: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAMAAAC38k/IAAAAB3RJTUUH2AoCDAQ16cUciwAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAA8UExURf///1daZFRXZlhbZFNWZtbW19fX19vb3Nzc3OHh4uLi4ujo6Onp6VRXZ/v7+/z8/FVYaPr6+n1/h3x+hi1F99gAAAABdFJOUwBA5thmAAAAQ0lEQVR42j3KWw6AMAhE0ZGixQdU6/73KiXS8zO5yaDr9EIfSwq1liLuONmI81K4WP4jlveDePAFV6lBxGPdEmGhqXxcHgRBVV1qsgAAAABJRU5ErkJggg==",
windowed: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAB3RJTUUH2AoCCy4uCYQPygAAAAlwSFlzAAALEgAACxIB0t1+/AAAAARnQU1BAACxjwv8YQUAAADUSURBVHjaY/z//z8DCOTklf1/8fIjAz4gIc7PwALjvHz1iWH5kikMjIyMODVExuQwMKZnFv5/++4bA8gmXIpdnW0ZkpMiGCKisxlY3rz9SpTJSYnhYDbYSSDF+DSAwNu3bxEakE2CBQIIYLOZBaYbJAFSvGzxZDAbpBkmDgI/f/4Ckv8ZmNCtxuW8X79+IWwA6Yao+Q82GcwC2oYs/vv3b4QGkG6QRHtLGYqpv3//grPrGvsZHj+6C9EA0k0gkBhWr5gJVsHy5s1zhtqGfryKQWpgAABv3mHaPfIq5QAAAABJRU5ErkJggg==",
close: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAB3RJTUUH2AoCBxUaHZjtIwAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAEBSURBVHjabVHBSsNAEH2zlyb+nmJBTZqLiYgoIhSEQlUKQsGDogd7qi0Fv9Dd7jYZd4YYg/hgM8ybtzNvJ5SNSv6y6JAmjPXHgrKiYtvj99L42T8sua5rbppGz8Gw4pPRKf/HmzRlDI/OEQkwMz43b3DOaBQIJ3WZSJLkRck2CjarFxCRCiQKjvNLDAYN1st3UrFAPDpHeH2+74QXV1MkUbiKQsnNzwOoHdnH37y1UelGnuYTGNMXAzfjWfQL7W6yVvg4G2O38/Deq2C79QjBK28dtKGRXT7cXaOuQywG3E7m0Sc0eh9ig6B1uUBZ3Kl11I1O5KcsF5QXZ5H/9Syr+wbCdKxVckAYggAAAABJRU5ErkJggg==",
// Folyamatjelző képei
fjBG: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAPCAYAAAAlH6X5AAAAKnRFWHRDcmVhdGlvbiBUaW1lAEsgNyBva3QuIDIwMDggMTU6NDk6MDcgKzAxMDAIypIuAAAAB3RJTUUH2AoHDTMjuwqT6wAAAAlwSFlzAAAOwgAADsIBFShKgAAAAARnQU1BAACxjwv8YQUAAABASURBVHjaDcHBDYAgEEVBeCYsHIzF2ATafy3C4pr4Z9LV707OKZOEIphVYxcO4RSa8MUK4vXA13TGfCZDtlqs/O8bFmx8kfixAAAAAElFTkSuQmCC",
fjFG: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAPCAIAAABSnclZAAAAB3RJTUUH2AoHCDoPXtuGqgAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAEdSURBVHjaZVBLSgVBDMyvfzODWy/jPb2B4EFEcOvGvRsFN8+FY/8SMw9B1CzShKpUqgtvHp4JkQgJGAUFcILpMMWpagR/CxF/BvoH/hplH92Fz2XUobPonGqmc0wDqftghm8Gk7CjNo+moCbvn/WwJuTWQkAnHNg8r6vK2+nDURZfl+DeQxhjuLr649u3d0+HakCRGIVyyq21PrW35iw5fVRHxeEEQYOba/UM196HiogbYonMJeKW/WvinrT6MWOQ5ARmKgmXwlsIHbV7GjYBaXbJMXKKsiZbkwu4eVUPl6Z3YVlLxhJly7gk23LuhoZqrADNb69lwRxwibBlu0i5eqw8bVeE0AZeP75QoRllz+E10D3BVdPLOmMf2PQLZtmdSOnXhpAAAAAASUVORK5CYII=",
// plusz képek
map: "data:image/png;base64,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",
mag48: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAJvElEQVR42u2ZCWwU5xXHv5k9vL73sNfHrtd4DT4XO7bBuEB8gXFjm5QgEkFoG45QGhFQi0SVhhRUlCL1wIp6RITQApEQKgTVjlLUChASl2g5xBHA2LFdwMYHxsb23sdM/28801pRG6l0HTYSn/TY9ezM7P/3ru/NwrGv+eKetoBnAE9bwDOAJ7gmKjY2NqugoKDCbrfn4X0Kx3HRdC9RFL0+n2/o7t27HW1tbReHhobacNwVEQBRUVG2JUuWvN7Q0PBKenp67ujoKFOpVEyr1UqvgiCwYDDI/H6/9KrX69n4+HjP8ePHPzl69OjuR48e3XhaADHLli3bsnr16h9AkH5kZETU6XQsKytLTEpK4qOjowWe5xm8z8P7gsfjIeF8X1+f4Ha7OXzOJSQk+FpbWz/au3fvOwAd/MoA1Gp1enNz86HMzMzKS5cuidnZ2dz06dMF8q5Go+FiYmI4REBEClEEOHheBATzer04xAkUicePH/M9PT0ifRei1rF169blw8PDV6YcAAIzDh8+fAyCHFeuXGGVlZXMaDROThkR3vaGQiE30saHS4IwHaB1uBZsMWq80n2k8wcHB1lXVxcLBAKDW7ZsaUJKXZxKgNgDBw58ajabq2/evCmgYHkIE0kIRA9A/F0Ub398fLwTQH4cFygKlEbwuhrQOqSRCedZAWJNTU2NRg0xp9PJXbt2jUF898aNG+fh/L6pAODq6+u/v2vXrvfPnDkjUNpANKVHb2Ji4jVA9cXFxXkgzAfxQYBRDYgyAIeIKBBaXBczNjaWgNSxI+0KAaLDewHpyKMmdiPCb+L7QuEGSGhpaTkHIQ5KGXgtCLFXLBZLGwBGId4Fb/7L62STFyCk+1I0cA8Nro9++PBhIvI+GcfK0HpT0GK5O3fujK5fv74E53aHFQDiiq9evXqxo6ODEjmATnMJXu9Eugyj+7ggPIDTBNIK8bxA/ROLpzCIogQF76sGBgaiIJxSKQrH1ICJxXEDznEkJydbkJrcjh07VnR3d/+R7hUWgLy8PBW+dNHJkyePuVwuwWAw3ExJSemE1x+iGJ0Q4oPeoBx2EZo5ApAjwaFAufb29li00CjlGIEBml41EB8HCBNgZgHMsHPnzrfQIJpxr0A4AZpOnz7dglwdRq//zGQyDUD8GD52w7zyl4WUKNB16Peq+/fv69AuSTjdU4Hi6ZWfWNSVtIBIQFpZ8HfFO1jnz5//Fc73hQtA3d/f33TixIk/IV3a0WkG8UUufPE4inUc6eWmKEBECI4PQTiP3NYAWi2nEYmmopb2ASUKMoiaooBoRKPIjbhf9YYNG969cOHCrrACoF837t+/vwWt8w4BINx+pIYPvd5L/R7v/RAQJAAyCKMoUD1IRqUAE+T3Ehf9A2g1TINjOvxpgjWuWbOGUui9sAJgAHsBAJ/A2yOzZ8/+DFrBEAqQeBnGC+EBHA9QJKhw5ZQRZPEi7RmkmfYNWtRaYSpcSymkxbnl2AsKNm/e/KPLly//OpwAVAP1Z8+e/fOpU6fExsbGNrTSAXw51WqAQAgC76VihhiloEOy15U9QVReqcYJAOJVKGAq5BTsDQ3oUqrt27f/EHvC+7jeHxaA/Px8Nbb70tu3b59BG9Xeu3cvtHTp0htopyNEIOc+ed4vi1csJOe8oKSSnFrSlEoAiCBFQI8I16PgY2kkwW78MvaDVhauLgQAHuIzMP62lpaW0n4g0gyDEbodu2gvMZAmApE9r0SA0igoF21Ivq+0P8i7M22IaXDKPKSOFinGEIXh5cuXV+KUjrAByMtYW1u7dt++fb/AKCBev36doT2ykpKS0bKysm4U9vCELlFpowL7d0tV6kHZoUVMpvG3bt3Kw8ZlJa+npaUJgOExa+0+cuTINpzzSIENFwA9XWXt2bPnd5hAq3t7exlSiSH0NImKOTk5LtggRosR/D0me1ycZLShxSFyBng8FSlioGcEv9fDvK4xVjSrgt2/d69j06ZNr+Dcz2HOJxX/3wDomBHCHPDSe/DYcyReHhkol0XsotKTFwqcw4gRxE7to5zH7h0Fo32BPhfJ43Hx8dz1cyeE2387yYzmVD6nZB7b//GxVQ96e47hfsNsCoY5WrQxmdFJ8rdhFRYWVsKrovx0JcgbFoNQHt2EhNNjJA1w1DpFpBkPE1D8rL/vAX/+ULOgVvFMo9bwabZpYqKtoO9nv91f6XI6O/8f8V8GQEsLS4LZampqXn4NCx43AYKe1CQAPF5KhjyXnoMpSNT7STgZnduJh5hTH/+e5RpE5vf5USAqlmbLZgmZhT3bmj+ciye2+1MFoERCT9EgEHSj+sWLF9cVFRXNgGgtiaf8lgdSZZSQAJFaIdTBPzCanz/2l792N1XkrSgwCDOcbg9hMnNGFp+SU9r39i8/qEaKtk8VgKSLTRR2ogyjh3fN2PSmp6enZ2JO0gNARxMnzUmIxOMHDx70oIA74N1eNjEAxjCON75UVfxugT5U5PJ4hRBwzZZpYlJ2sWtm1eKq+fPnP9Fz8v/yuxCBREliJkwnR4iTTZnpKRxUmDQeKBMsJ0WR4zOb5jl+Wmxm810uL07iWVK6jaXlznLNbXq11uFw/H0qAb4Io5KNn3QfpZWGJpmyCDgNZl1YXrBtjlWz0OXyCCGR401pNtGSV+ad/61v1+UXOM59FQBPuqJkCEtdeeH2cqu6zu32sKDACabUDC7DMcdXsuClutKyWWcjFUCBSIHZassdW+dmqL+JSAACM3aqlVnzZ3szy2qa6hbVn4xUAFpaGcJaNdvx9vM2TZPb5RYCAuMNZotoc5Rz9lm1r9YuXHQoUgEUCGrP1rnP5W6qzY5d4Xa7WCDEBIM5nZs2cw5nL697rbpmwUeRCkBLo0CU5tvXNRTq1yISYiAkiHqzhbcXVYjT5yx6/fmqmj9EKgDt2Go8WxOEpTjXvvbFIsN6D0YTH/JJb05n9uIKNq1swfdqFtR9GJEAtHQ6nRo7e7IMsaapyPiGz+VkvqAoJJhSuayiOVy0tWDTyu+s+k1EAkyCoNnL6sixf3dJsWmjxznOXL4gU8UamMmWy+ylVT9ftXbdWxEJQAvDnwqzlQQxIytjyYszk348ODTEa4wZ3MjouBAaG+BfWPeTujfe3HgiIgFoIRIqRIJ+drFaU5MbGitytz9+2K/2O0dZQJvY8enFz7/BJp7iIhOAlt1uV3V1dRkJIstmbSrOSFjaOTh+41Z33wehYJD+q2osogFoZWdn852dnRIELIFN/IAwAOthk35HilgAWogEj0jE4228LHqMfeFHsIgGUNbKlSu5gwcP/sef4L8WAF+2ngE87fVPsoc8fGAfJH4AAAAASUVORK5CYII=",
mag128: "data:image/png;base64,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",
config48: "data:image/png;base64,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",
floppy48: "data:image/png;base64,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",
letter48: "data:image/png;base64,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",
chip48: "data:image/png;base64,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",
flags48: "data:image/png;base64,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",
palette48: "data:image/gif;base64,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",
flower48: "data:image/gif;base64,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",
arrowUp: "data:image/gif;base64,R0lGODlhDgAMANUFAK7B6sPT9ay/6Lm/1c3P4Oro77/E2bHD66q854+gyr/P8rbI7vPv9YeWu4WUufHt873O8bTE7IOSuKSuyuDg6tTV5JKfwcHR852oxubk7Y6bvrK50qCx17vM75am0LDA5LLE7LTG7ZSlz6u96Ke55ai65p+y36a45Z+x3rrM8K+30I6fyJKjzK7A6q2/6am75pip06m756O14p2t0sbW9paly5+w27nK74KRuPby9gAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAUALAAAAAAOAAwAAAZgwIJwWKkMj0iLBck0JBIG5rFhQjWkwo2ndBKpsBKXAEGSSDGcyAEwgmGQhNrttgABECvCUfNRQFILBwI2GkMDMxcBFxA3ES0vLANCDh0BNAEKNyEAMTIOBRM4oqOkohNBADs=",
arrowDwn: "data:image/gif;base64,R0lGODlhDgAMANUFAKW35KSuyq7A6sbK3Jijw/Pv9dvb57/E2bnK76m75vXx9YuYvJKfwYeWu67B6tTV5Ku0zqO25IWUuebk7ero75+y4Y2cw5Chyp2u15KizLbI7qO146Gz3rLE7LHD66a45b3O8Zyu27m/1Z6u0o+exbrK7Ke55p2t06y/6JGizLbH66S25LTG7ba905ys0am755+y4O7r8e/s8qGy1qi65qKy2brM8JSkzKq857TE7KG04oKRuPby9gAAAAAAAAAAACH5BAEAAAUALAAAAAAOAAwAAAZfwMBuSCwOAwUJTMdsMiuSQkGUiQCukQ0z1ZIWFpzEK0H7rEILb2FwEzgEKJzpMlAXCDVWzuPAEOwFBiQICBodFgaABRAzIDYnEIpSDSUqDZJSByMuB5hSDAyeUg8PgEEAOw==",
cross: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABDlBMVEX4X2LqLzH/d3r3XWD/cHP/en36YmXuQEL0TVD7bXD/cHL7aWz6am3sPD79cXT2WFrkIiTuPT/2WVv2Vln+dnn6ZGf/VFf2VVj3W139dHf/eXv+cXTxP0H3VVf/bG7/fH7/bnD3X2HzUVTpLS/4YmT4YWT6YWP3XF72Skz0SEr/h4r/Vln/WFv/Z2j9eXzwRkn/eXzuQUP/eX3+foH+en32WFv4XmH8a27/dHb2Wl32WlztP0H/cXT5aGrmKiz6Y2b5Y2bvQ0b8c3b/cnT/YmPwRkj/foD7bW/rNDb/d3n/dnn/W17vRUjyRUfyTE/6bG71TlDtPkD/cHH/gobvREf1VljpMjX/e37/foEAAAD5XHQxAAAAWnRSTlP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wDR1opvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJBJREFUKM9jiEQDDNgEmEQgbFVbJbAAU4QxH1jOXZ4BLCBtoqXHHRlp5s+qqA/RYi4Z7KTCzCPF7AMz1IHTLdzAUz0EYYulkbeOhSOStRJe2mJcrggBK1FnFgU5WUGYgJC9Db8hL4dugAdEwJQtSJg9MjLM10VTGSwQqiZuDVJsJ6PBCNHiFwhxugAjLs+hAAAFn0f+m31spAAAAABJRU5ErkJggg==",
tick: "data:image/gif;base64,R0lGODlhFAAUAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwMDcwKbK8MbetXO1Qnu9UoS9WpTGa5TGc6XOhKXOjK3WlL3ercbetc7extbnzt7n3ufv3ufv5/8QnP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////78KCgpICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAEAABoALAAAAAAUABQAAAhfADUIHEiwoMGDCBMqXMiwYcEMDgdeaKAgooYKDCZYVLBAY0SOFT8ugLBxQQOGFQZWWMDggkILDBZI0HAhZkqFFx4sWHDBwciGNRfo5Olwws6OFncysKghwgOXTKNaDAgAOw==",
buza48: "data:image/png;base64,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",
radar48: "data:image/png;base64,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"
}


/** Az ablak kinézete **/
var winBGColor;				// color value
var winFullBGColor;			// color value
var winTitleFontColor;		// color value
var winTitleBGColor;		// color value
var bodyBGColor;			// color value
// Win styles
style += "div.window {font-family:Verdana,Arial,Helvetica,sans-serif; font-size:10pt; display:block; opacity:0.9; background-color:"+(winBGColor ? winBGColor+";" : "grey;")+(IMG.winBGImage ? "background-image:url("+IMG.winBGImage+");}" : "}");
style += ".window:hover {opacity:1}";
style += "div.fullscreen {position:fixed; width:100%; height:100%; background-color:"+ (winFullBGColor ? winFullBGColor+";}" : "#000;}");
style += "div.windowed {position:absolute; width:-moz-fit-content; border:2px solid #000; -moz-border-top-colors:#000 #fef; -moz-border-left-colors:#000 #eee; -moz-border-bottom-colors:#000 #90e4f0; -moz-border-right-colors:#000 #90e4f0; -moz-border-radius:3px;}";
style += "div.titlebar {display:block; white-space:nowrap; height:20px; padding:0px 4px; cursor:default; -moz-user-select:none;}";
style += "div.title-container {max-width:-moz-fit-content; min-width:80px; padding:3px 0px; float:left; overflow:hidden;}";
style += "span.titlebar-text {float:left; font-style:italic; font-weight:bold; color:"+(winTitleFontColor ? winTitleFontColor+";" : "#000;")+"background-color:"+(winTitleBGColor ? winTitleBGColor+";" : "#eee;")+"padding:0px 5px; -moz-border-radius:10px 2px; margin-right:5px;}";
style += "div.buttons-container {display:inline-block; float:right; height:15px; width:-moz-fit-content; border:1px solid #bbb; border-top-width:0px; -moz-border-radius:0px 0px 5px 5px;}";
style += "div.gomb {height:16px; width:20px; float:left; text-align:center; background-repeat:repeat-x; border:1px solid #bbb; border-width:0px 1px 0px 0px;}";
style += "div.gomb:hover {background-image:url("+IMG.activeButtons+");}";
style += "div.gomb img {vertical-align:baseline;}";
style += "div.close {width:25px;}";
style += "div.red {background-image:url("+IMG.closeButton+");}";
style += "div.close:hover {background-image:url("+IMG.activeCloseButton+");}";
style += "div.normal {background-image:url("+IMG.normalButtons+");}";
style += "div.fullscr {background-image:url("+IMG.fullscreenButtons+");}";
style += "div.body {direction:"+ textDirection +"; text-align:"+ (textDirection == "ltr" ? "left" : "right") +"; overflow:auto; cursor:auto; margin:3px; background-repeat:repeat; background-color:"+(bodyBGColor ? bodyBGColor+";" : "#ddd;") + (IMG.bodyBGImage ? "background-image:url("+IMG.bodyBGImage+");}" : "}");
style += "div.body table {width:-moz-fit-content; border:none; margin:1px; background-color: transparent; border-collapse: collapse;}";
style += "div.body td {width:-moz-fit-content; border:none; padding:1px; margin:1px;}";
style += "div.b_win {min-width:-moz-fit-content; border:2px solid #000; -moz-border-top-colors:#eee #000; -moz-border-left-colors:#eee #000; -moz-border-bottom-colors:#eee #000; -moz-border-right-colors:#eee #000;}";
style += "div.b_full {height:97%; border-top-width:2px; border-top-style:solid; border-top-color:#000; -moz-border-top-colors:#eee #000; padding:0px 3px;}";
style += "textarea.tma {font-family: monospace; font-size:13px; border:0px; padding:0px; text-align:center; width:354px; background-color:ivory;}";
// input fields
style += "input.tma[type=text] {color:brown; background-image:url("+IMG.bodyBGImage+"); border:1px solid transparent; -moz-border-radius:4px;}";
style += "input.tma[type=text]:hover {border:1px dashed brown;}";
style += "input.tma[type=text]:focus {color:#00BC00; border:1px solid #8E0; background-image: none; background-color:ivory;}";
GM_addStyle (style);

var stopAndSaveFlag = false;	// A keresési állapot megszakításához és mentéséhez
var at;							// Az animáció időzítésére
var ashc;						// Auto Server-Hanging Check

/** Nyelvi rész :)  Language Dependent words **/
var LD = {};
LD['STARTCOOR'] = decodeURIComponent(GM_getValue('STARTCOOR', 'Starting Co-ordinates'));
LD['RADIUS'] = decodeURIComponent(GM_getValue('RADIUS', 'Searching radius:'));
LD['RAD_TITLE'] = decodeURIComponent(GM_getValue('RAD_TITLE', '0 to 56. Zero searches in the actual 7x7.'));
LD['SEARCHFOR'] = decodeURIComponent(GM_getValue('SEARCHFOR', 'Search for'));
LD['OASIS'] = decodeURIComponent(GM_getValue('OASIS', 'Oasis'));
LD['SEARCH'] = decodeURIComponent(GM_getValue('SEARCH', 'Searching'));
LD['SEARCH_BTN'] = decodeURIComponent(GM_getValue('SEARCH_BTN', 'Search'));
LD['CLOSE'] = decodeURIComponent(GM_getValue('CLOSE', 'Close'));
LD['LOAD_BTN'] = decodeURIComponent(GM_getValue('LOAD_BTN', 'Load'));
LD['CH_LANG'] = decodeURIComponent(GM_getValue('CH_LANG', 'Change Language'));
LD['PLAYER'] = decodeURIComponent(GM_getValue('PLAYER', 'Player:'));
LD['ALLIANCE'] = decodeURIComponent(GM_getValue('ALLIANCE', 'Alliance:'));
LD['AVAIL_LANGS'] = decodeURIComponent(GM_getValue('AVAIL_LANGS', 'Available languages:'));
LD['SAVE'] = decodeURIComponent(GM_getValue('SAVE', 'Save'));
LD['CANCEL'] = decodeURIComponent(GM_getValue('CANCEL', 'Cancel'));
LD['SERVER'] = decodeURIComponent(GM_getValue('SERVER', 'Server:'));
LD['DATE'] = decodeURIComponent(GM_getValue('DATE', 'Date:'));
LD['CENTER'] = decodeURIComponent(GM_getValue('CENTER', 'Center of the search:'));
LD['HITS'] = decodeURIComponent(GM_getValue('HITS', 'Hits:'));
LD['NEWVER'] = decodeURIComponent(GM_getValue('NEWVER', "There's a newer version available."));
LD['UPDATENOW'] = decodeURIComponent(GM_getValue('UPDATENOW', 'Update now?'));
LD['TRAV_TIME'] = decodeURIComponent(GM_getValue('TRAV_TIME', 'Travel time:'));
LD['NOHITS'] = decodeURIComponent(GM_getValue('NOHITS', 'There was no result.'));
LD['LOAD_TITLE'] = decodeURIComponent(GM_getValue('LOAD_TITLE', 'Copy/paste here your saved data'));
LD['SAVE_TITLE'] = decodeURIComponent(GM_getValue('SAVE_TITLE', 'Now you can save this text and close the window'));
LD['ERROR_DATA'] = decodeURIComponent(GM_getValue('ERROR_DATA', "There's an error in the given datas."));
LD['IGM'] = decodeURIComponent(GM_getValue('IGM', 'Send as a message'));
LD['LOAD_CONFIRM'] = decodeURIComponent(GM_getValue('LOAD_CONFIRM', 'This is a TMA message, do you want to use it now?'));
LD['TIME_REMAINS'] = decodeURIComponent(GM_getValue('TIME_REMAINS', 'Time remains:'));
LD['DB_FORMAT'] = decodeURIComponent(GM_getValue('DB_FORMAT', 'Database format'));
LD['ERR_IGM_LENGTH'] = decodeURIComponent(GM_getValue('ERR_IGM_LENGTH', "It doesn't fit in a message!"));
LD['SETUP'] = decodeURIComponent(GM_getValue('SETUP', "Setup"));
LD['WIN_MINIMIZE'] = decodeURIComponent(GM_getValue('WIN_MINIMIZE', "Minimize"));
LD['WIN_RESTORE'] = decodeURIComponent(GM_getValue('WIN_RESTORE', "Restore"));
LD['WIN_FULLSIZE'] = decodeURIComponent(GM_getValue('WIN_FULLSIZE', "Fullscreen"));
LD['WIN_PREV_SIZE'] = decodeURIComponent(GM_getValue('WIN_PREV_SIZE', "Pevious size"));
LD['WIN_CLOSE'] = decodeURIComponent(GM_getValue('WIN_CLOSE', "Close"));
LD['LOAD-CONTINUE'] = decodeURIComponent(GM_getValue('LOAD-CONTINUE', "Load or Continue"));
LD["HOMEPAGE"] = decodeURIComponent(GM_getValue('HOMEPAGE', "Go to TMA's hompage"));
LD["ALERT"] = decodeURIComponent(GM_getValue('ALERT', "Alert!"));
LD["MAPSIZE"] = decodeURIComponent(GM_getValue('MAPSIZE', "Map size:"));
LD["YES"] = decodeURIComponent(GM_getValue('YES', "Yes"));
LD["NO"] = decodeURIComponent(GM_getValue('NO', "No"));
LD["OK"] = decodeURIComponent(GM_getValue('OK', "Ok"));
LD["COLORS"] = decodeURIComponent(GM_getValue('COLORS', "Colors:"));
LD["NEW_COLOR_CODE"] = decodeURIComponent(GM_getValue('NEW_COLOR_CODE', "Code of the new color:"));
LD["SAMPLE_TEXT"] = decodeURIComponent(GM_getValue('SAMPLE_TEXT', "Sample text"));
LD["CROP"] = decodeURIComponent(GM_getValue('CROP', "crop"));
LD["IRON"] = decodeURIComponent(GM_getValue('IRON', "iron"));
LD["CLAY"] = decodeURIComponent(GM_getValue('CLAY', "clay"));
LD["LUMBER"] = decodeURIComponent(GM_getValue('LUMBER', "lumber"));
LD["LINK"] = decodeURIComponent(GM_getValue('LINK', "The link"));
LD["NUMBER"] = decodeURIComponent(GM_getValue('NUMBER', "The number"));
LD["ALREADYRUNNING"] = decodeURIComponent(GM_getValue('ALREADYRUNNING', "This function is already running!"));
LD["SEARCHSETTINGS"] = decodeURIComponent(GM_getValue('SEARCHSETTINGS', "Search settings"));
LD["ABORT_QUESTION"] = decodeURIComponent(GM_getValue('ABORT_QUESTION', "Do you want to abort the searching?"));
LD["STOP_SAVE"] = decodeURIComponent(GM_getValue('STOP_SAVE', "Stop and save"));
LD["NO_GOALS"] = decodeURIComponent(GM_getValue('NO_GOALS', "There's nothing selected to search for!"));
LD["SAVED_SEARCH"] = decodeURIComponent(GM_getValue('SAVED_SEARCH', "There's a saved searching process!"));
LD["SAVED_CONT"] = decodeURIComponent(GM_getValue('SAVED_CONT', "Do you want to continue the searching?"));
LD["CLICK_TO_SORT"] = decodeURIComponent(GM_getValue('CLICK_TO_SORT', "Click to sort"));
LD["UNITSPEED"] = decodeURIComponent(GM_getValue('UNITSPEED', "Unit speed:"));
LD["DEFAULT_TAB"] = decodeURIComponent(GM_getValue('DEFAULT_TAB', "Defaults"));
LD["LANGUAGE_TAB"] = decodeURIComponent(GM_getValue('LANGUAGE_TAB', "Languages"));
LD["COLORS_TAB"] = decodeURIComponent(GM_getValue('COLORS_TAB', "Colors"));
LD["RESET_DEFAULT"] = decodeURIComponent(GM_getValue('RESET_DEFAULT', "Reset to default"));
LD["UNKNOWN_FORMAT"] = decodeURIComponent(GM_getValue('UNKNOWN_FORMAT', "It's in an unknown format!"));
LD["HITSPERPAGE"] = decodeURIComponent(GM_getValue('HITSPERPAGE', "Hits per page:"));
LD["SAVE_FORMAT"] = decodeURIComponent(GM_getValue('SAVE_FORMAT', "Save format"));
LD["NORMAL"] = decodeURIComponent(GM_getValue('NORMAL', "normal"));
LD["DATABASE"] = decodeURIComponent(GM_getValue('DATABASE', "database"));
LD["COLOR_SETUP_TEXT"] = decodeURIComponent(GM_getValue('COLOR_SETUP_TEXT', "Click on the links and numbers to change their colors."));
LD["SEARCH_ANIMATION"] = decodeURIComponent(GM_getValue('SEARCH_ANIMATION', "Search animation"));
LD["ASHC"] = decodeURIComponent(GM_getValue('ASHC', "Time interval of the Automatic Server-Hang Check"));
LD["SIMPLE"] = decodeURIComponent(GM_getValue('SIMPLE', "simple"));
LD["HOUR"] = decodeURIComponent(GM_getValue('HOUR', "hour(s)"));
LD["DAY"] = decodeURIComponent(GM_getValue('DAY', "day(s)"));
LD["UPDATE_INTERVAL"] = decodeURIComponent(GM_getValue('UPDATE_INTERVAL', "Looking for updates in every"));
LD["CROP_BONUS"] = decodeURIComponent(GM_getValue('CROP_BONUS', "Calculating crop bonuses"));
LD["DIST"] = decodeURIComponent(GM_getValue('DIST', "Distance"));
LD["BONUS"] = decodeURIComponent(GM_getValue('BONUS', "Bonus"));
LD["TYPE"] = decodeURIComponent(GM_getValue('TYPE', "Type"));
LD["NOT_LOGGED_IN"] = decodeURIComponent(GM_getValue('NOT_LOGGED_IN', "You are not logged in to that server!"));
LD["CONTACT"] = decodeURIComponent(GM_getValue('CONTACT', "Contact"));
LD["DIST_CALC"] = decodeURIComponent(GM_getValue('DIST_CALC', "Distance calculator"));
LD["FROM"] = decodeURIComponent(GM_getValue('FROM', "From"));
LD["TO"] = decodeURIComponent(GM_getValue('TO', "To"));
LD["QUICK_MODE"] = decodeURIComponent(GM_getValue('QUICK_MODE', "Quick search*"));
LD["ONLY_T35"] = decodeURIComponent(GM_getValue('ONLY_T35', "It works only in Travian 3.5"));

function parseHeaders(all)
{	var entities =  [[/&amp;/g, "&"], [/&lt;/g, "<"], [/&gt;/g, ">"]];
	var headers = {}, name, value;
	for each (var line in all)
	{	for (var i in entities)
			line = line.replace(entities[i][0], entities[i][1]);
		[line, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);
		if (headers[name])
		{	if (typeof headers[name] == 'string')
			{	var temp = headers[name];
				headers[name] = new Array;
				headers[name].push(temp, value);
			}
			else
				headers[name].push(value);
		}
		else
			headers[name] = value;
	}
	return headers;
}
/******************************************** init  end *****************************************************/

/******************************************** aux functions begin *******************************************/
/** Node functions **/
function $elem(tag, content, attribs, styleRules, parent)	// A megadott paraméterekkel rendelkező elemet adja vissza.
{	var node = document.createElement(tag);
	if (content)
		node.innerHTML = content;
	if (attribs)
		for (var a in attribs)
			node.setAttribute(a, attribs[a]);
	if (styleRules)
		for (var a in styleRules)
			node.style[a] = styleRules[a];
	if (parent)
	{	var parent = typeof parent == 'string' ? $(parent) : parent;
		parent.appendChild(node);
	}
	return node;
}
function remove(elem)	// Törli a megadott elemet.
{	var elem = typeof elem == 'string' ? $(elem) : elem;
	elem.parentNode.removeChild(elem);
}
function $(id)
{	return document.getElementById(id);
}
function $tags(tagname, doc)
{	var doc = doc ? doc : document;
	return doc.getElementsByTagName(tagname);
}
function $names(name)
{	return document.getElementsByName(name);
}
function xpath(path, results, doc)
{	var doc = doc ? doc : document;
	var res = document.evaluate(path, doc, null, results, null);
	return results == XPFirst ? res.singleNodeValue : res;
}
function inherit(o)
{	var F = new Function;
	F.prototype = o;
	return new F;
}
function objCopy (gObj, sObj){
	for (var i in sObj){
		if (sObj[i] && typeof sObj[i] === "object" && sObj[i].constructor !== Array){
			if (!gObj[i])
				gObj[i] = {};
			objCopy(gObj[i], sObj[i]);
		}
		else
			gObj[i] = sObj[i];
	}
}

/** Converters **/
function coordFixer(coord)	// Hibásan megadott koordinátákat pontosítja.
{	var k = parseInt(coord, 10);
	do
		k = (k > 400) ? k-801 : (k < -400) ? k+801 : k;
	while (k < -400 || k > 400);
	return k;
}
function xyzona(xy)	// Koordinátákból zóna pontot számol.
{	return -801*coordFixer(xy.y)+320801+coordFixer(xy.x);
}
function zonaxy(z)	// Zónapontból koordináta pontokat ad vissza egy object-ben.
{	var y = Math.floor(401-z/801);	// Y koordináta
	var x = z-320801+801*y;			// X koordináta
	return {x:x, y:y};
}
function utido(tav)	// Az út megtételéhez szükséges időt adja vissza
{	var us = recovery.datas.hits.unitSpeed || unitSpeed;
	var ido = (tav/us) * 1000 * 3600;
	return timeToString(ido);
}
function distance(xy1, xy2)	// A koordináták közti tényleges távolságot adja vissza.
{	var x = Math.abs(xy1.x - xy2.x);
	var y = Math.abs(xy1.y - xy2.y);
	x += -801*(x > 400);
	y += -801*(y > 400);
	return Math.sqrt(x * x + y * y);
}
function zonapontok(center, radius)	// A kezdőpontból és a sugárból kiszámítja a zónapontokat.
{	var kk = {x: coordFixer(center.x - 7 * radius), y: coordFixer(center.y + 7 * radius)};
	var zonak = new Array;	// Zóna pontokat tárolja.
	for (var iy = 0; iy <= 2 * radius; iy++)
		for (var ix = 0; ix <= 2 * radius; ix++)
			zonak.push(zonaUrl + xyzona({x:kk.x + 7 * ix, y:kk.y - 7 * iy}));
	return zonak;
}
function timeToString(ms)	// Emészthető formát ad az egységnyi időnek : )
{	var s = ms/1000;
	var h = Math.floor(s/3600);
	var m = Math.floor(s/60)%60;
	s = parseInt(s%60, 10);
	m = (m > 9) ? m : "0" + m;
	s = (s > 9) ? s : "0" + s;
	return h + ":" + m + ":" + s;
}
/* A 'távolság-tömb' elemeit sorbarendezi. Az eredmény egy olyan tömb, aminek az elemei az eredeti tömb indexeire mutatnak rendezve.
*  Ha a down paramétert is megadjuk, akkor fordított sorrendben rendez.
*  A 'távolság-tömb' ha 2 dimenziós, akkor mindkét elemet figyelembe veszi a rendezésnél.
*/
function rendez(tt, down)
{	function sortFn(a, b)
	{	if (a[0] > b[0]) return 1;
		if (a[0] < b[0]) return -1;
		return a[1] - b[1];
	}
	var a = [];
	if (typeof tt[0] != "object")
		for (var i in tt)
			a[i] = ["a", tt[i], i];
	else
		for (var i in tt)
			a[i] = [tt[i][0], tt[i][1], i];
	a = a.sort(sortFn);
	for (var i in a)
		a[i] = a[i][2];
	if (down)
		a = a.reverse();
	return a;
}
function dec_b64(dec)	// 10-es számrendszerből 64-esbe vált
{	var base64 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
	var txt = "";
	do
	{	txt = base64[dec%64] + txt;
		dec = parseInt(dec/64, 10);
	}
	while (dec != 0)
	return txt;
}
function b64_dec(b64)	//64-es számrendszerből 10-esbe vált
{	var base64 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
	var dec = 0;
	for (var i = 0; i < b64.length; i++)
		dec += Math.pow(64, i)*base64.indexOf(b64[b64.length-i-1]);
	return dec;
}
function dataSize(size)	// Olvasható formában adja vissza az adatok közelítő méretét
{	var me = [" B", " KB", " MB"];
	var i = 0;
	while (size > 1024)
	{	i++;
		size = size/1024;
	}
	return "~" + (parseInt(size, 10) != size ? size.toFixed(1) : size) + me[i];
}

/** Data saving/loading **/
function dataSave(mode)	// A változók adataiból egy Stringet csinál
{	switch (mode)
	{	case "normal":
			var field = recovery.datas.hits.data;
			var c = dec_b64(recovery.datas.hits.sdcr[2]);
			var text = "ver2.0" + (recovery.datas.hits.bonus ? "g" : "") + "\n" + recovery.datas.hits.sdcr.join("\n").replace(/([^\n]+\n[^\n]+\n)([\d]+)/, "$1" + c) + "\n" + field.length;
			for each (var f in field)
				text += "\n" + f.type + "\n" + f.url.replace(/[\d]+/, dec_b64(f.url.split("|")[0])) + "\n" + f.name + "\n" + (f.player !== null ? f.player : "") + "\n" + (f.uid !== null ? dec_b64(f.uid) : "") + "\n" + (f.ally !== null ? f.ally : "") + "\n" + (f.aid !== null ? dec_b64(f.aid) : "");
			return text.replace(/&/g, "\t");
		break;

		case "csv":
			// CSV - fájl
			var fields = recovery.datas.hits.data;
			var dist = []; // Kiszámoljuk a találatok távolságait a keresés középpontjához képest. dist tömbben vannak az eredmények
			var center = zonaxy(recovery.datas.hits.sdcr[2]);
			for each (var f in fields)
				dist.push(distance(center, zonaxy(f.url.split("|")[0])));
			var idx = rendez(dist);
			var text = LD["DIST"]+";"+LD["TYPE"]+";"+LD["HITS"]+";X;Y;"+LD["PLAYER"]+";"+LD["ALLIANCE"]+";"+LD["BONUS"]+"\n";
			for (var i in idx)
			{	text += String(parseInt(dist[idx[i]], 10) != dist[idx[i]] ? dist[idx[i]].toFixed(3) : dist[idx[i]]).replace(".", ",") + ";";
				var f = fields[idx[i]];
				switch (f.type.split("g")[0])
				{	case "f1": text += "9 " + LD["CROP"]; break;
					case "f2": text += "5 " + LD["IRON"]; break;
					case "f3": text += "6 " + LD["CROP"]; break;
					case "f4": text += "5 " + LD["CLAY"]; break;
					case "f5": text += "5 " + LD["LUMBER"]; break;
					case "f6": text += "15 " + LD["CROP"]; break;
					case "f7": text += "7 " + LD["CROP"]; break;
					case "f8": text += "7 " + LD["CROP"]; break;
					case "f9": text += "7 " + LD["CROP"]; break;
					case "f10": text += "5 " + LD["CLAY"]; break;
					case "f11": text += "5 " + LD["IRON"]; break;
					case "f12": text += "5 " + LD["LUMBER"]; break;
					case "o1":
					case "o2": text += "25% " + LD["LUMBER"]; break;
					case "o3": text += "25% " + LD["LUMBER"] + ", " + LD["CROP"]; break;
					case "o4":
					case "o5": text += "25% " + LD["CLAY"]; break;
					case "o6": text += "25% " + LD["CLAY"] + ", " + LD["CROP"]; break;
					case "o7":
					case "o8": text += "25% " + LD["IRON"]; break;
					case "o9": text += "25% " + LD["IRON"] + ", " + LD["CROP"]; break;
					case "o10":
					case "o11": text += "25% " + LD["CROP"]; break;
					case "o12": text += "50% " + LD["CROP"]; break;
				}
				var coord = zonaxy(f.url.split("|")[0]);
				var bonus = f.type.split("g")[1];
				text += ";" + f.name + ";" + coord.x + ";" + coord.y + ";" + (f.player ? f.player : "") + ";" + (f.ally ? f.ally : "") + ";" + (bonus ? bonus + "%" : "") + "\n";
			}
			text = text.replace(/&/g, "\t");
			post(fileHost + "csv.php", "content=" + text, function(html)
			{	var span = xpath("//span[@id='tma_msg']", XPFirst, $elem("div", html)).textContent;
				if (span == "error")
					alertWin($elem("center", "<h3>Debug: CSV - error</h3>", {}, {"margin":"6px"}));
				else
					window.location.href = fileHost + "csv/" + span;
			});
		break;
		case "simple":
			// Simple format
			var text = LD["SERVER"] + " " + recovery.datas.hits.sdcr[0] + "\n" + LD["DATE"] + " " + recovery.datas.hits.sdcr[1] + "\n\n";
			for each (var f in recovery.datas.hits.data)
			{	text += (f.type[0] == "f" ? "1, " : "2, ");
				var coord = zonaxy(f.url.split("|")[0]);
				text += coord.x + ", " + coord.y + ", ";
				switch (f.type.split("g")[0])
				{	case "f1": text += "3, 3, 3, 9, "; break;
					case "f2": text += "3, 4, 5, 6, "; break;
					case "f3": text += "4, 4, 4, 6, "; break;
					case "f4": text += "4, 5, 3, 6, "; break;
					case "f5": text += "5, 3, 4, 6, "; break;
					case "f6": text += "1, 1, 1, 15, "; break;
					case "f7": text += "4, 4, 3, 7, "; break;
					case "f8": text += "3, 4, 4, 7, "; break;
					case "f9": text += "4, 3, 4, 7, "; break;
					case "f10": text += "3, 5, 4, 6, "; break;
					case "f11": text += "4, 3, 5, 6, "; break;
					case "f12": text += "5, 4, 3, 6, "; break;
					case "o1":
					case "o2": text += "25, 0, 0, 0, "; break;
					case "o3": text += "25, 0, 0, 25, "; break;
					case "o4":
					case "o5": text += "0, 25, 0, 0, "; break;
					case "o6": text += "0, 25, 0, 25, "; break;
					case "o7":
					case "o8": text += "0, 0, 25, 0, "; break;
					case "o9": text += "0, 0, 25, 25, "; break;
					case "o10":
					case "o11": text += "0, 0, 0, 25, "; break;
					case "o12": text += "0, 0, 0, 50, "; break;
				}
				var zk = f.url.split("|");
				text += zk[0] + ", " + zk[1] + "\n";
			}
			return text;
		break;
		
		case "sql":
			// sql format
			var tabellennamen = "map_scan";
			var text = "-- " + LD["SERVER"] + " " + recovery.datas.hits.sdcr[0] + "\n" + "-- " + LD["DATE"] + " " + recovery.datas.hits.sdcr[1] + "\n\nCREATE TABLE IF NOT EXISTS `" + tabellennamen + "` (\n  `id` int(9) unsigned NOT NULL default '0',\n  `ad` varchar(2) collate utf8_bin NOT NULL default '00',\n  `type_id` tinyint(2) unsigned NOT NULL default '0',\n `bonus` tinyint(3) unsigned NOT NULL default '0',\n  UNIQUE KEY `id` (`id`)\n);\n\n";

			for each (var f in recovery.datas.hits.data)
			{	var zk = f.url.split("|");
        text += "INSERT IGNORE INTO `map_scan` VALUES (" + zk[0] + ", '" + zk[1] + "', ";



				switch (f.type.split("g")[0])
				{	case "f1": text += "0"; break;
					case "f2": text += "1"; break;
					case "f3": text += "2"; break;
					case "f4": text += "3"; break;
					case "f5": text += "4"; break;
					case "f6": text += "5"; break;
					case "f7": text += "6"; break;
					case "f8": text += "7"; break;
					case "f9": text += "8"; break;
					case "f10": text += "9"; break;
					case "f11": text += "10"; break;
					case "f12": text += "11"; break;
					case "o1":
					case "o2": text += "12"; break;
					case "o3": text += "13"; break;
					case "o4":
					case "o5": text += "14"; break;
					case "o6": text += "15"; break;
					case "o7":
					case "o8": text += "16"; break;
					case "o9": text += "17"; break;
					case "o10":
					case "o11": text += "18"; break;
					case "o12": text += "19"; break;
				} 
        var bonus = f.type.split("g")[1];
				text += ", " +  (bonus ? bonus : " 0") + ");\n";
			}

		return text;
		break;
	}
}
function dataLoad(text)	// A betöltött Stringből feltölti a változókat
{	var r = recovery.datas.hits;
	var arr = [];
	arr = text.split("\n");
	if (/ver[\d.]+/.test(arr[0]))
	{	// Newer versions
		if (arr[0].match(/[\d.]+/) != "2.0")
		{	alertWin($elem("center", "<h3>" + LD["UNKNOWN_FORMAT"] + "</h3>", {}, {"margin":"6px"}));
			return;
		}
		if (arr[0][arr[0].length-1] == "g")
			r.bonus = true;
		else
			r.bonus = false;
		r.sdcr[0] = arr[1];
		r.sdcr[1] = arr[2];
		r.sdcr[2] = b64_dec(arr[3]);
		r.sdcr[3] = parseInt(arr[4], 10);
		for (var i = 0; i < parseInt(arr[5], 10); i++)
		{	var field =
			{	type: null,
				url: null,
				name: null,
				player: null,
				uid: null,
				ally: null,
				aid: null
			}
			field.type = arr[6 + i * 7];
			[z, k] = arr[6 + i * 7 + 1].split("|");
			field.url = b64_dec(z) + "|" + k;
			field.name = arr[6 + i * 7 + 2].replace(/\t/g, "&");
			if (arr[6 + i * 7 + 3]) // Players
			{	field.player = arr[6 + i * 7 + 3].replace(/\t/g, "&");
				field.uid = b64_dec(arr[6 + i * 7 + 4]);
				if (arr[6 + i * 7 + 5]) // Allies
				{	field.ally = arr[6 + i * 7 + 5].replace(/\t/g, "&");
					field.aid = b64_dec(arr[6 + i * 7 + 6]);
				}
			}
			r.data.push(field);
		}
	}
	else
	{	// Old one
		r.sdcr[0] = arr[0];
		r.sdcr[1] = arr[1];
		r.sdcr[2] = xyzona({x:arr[2], y:arr[3]});
		r.sdcr[3] = parseInt(arr[4], 10);
		var db = parseInt(arr[5], 10);
		for (var i = 0; i < db; i++)
		{	var field =
			{	type: null,
				url: null,
				name: null,
				player: null,
				uid: null,
				ally: null,
				aid: null
			}
			field.type = arr[6 + i];
			[, z, k] = arr[db + 6 + i].match(/\?d=(\d+)[\|]+c=(.{2})/);
			field.url = z + "|" + k;
			field.name = arr[db + 6 + i].match(/>(.*)<\/a>/)[1].replace(/\s+\([\d-]+\|[\d-]+\)\s*$/, "").replace(/\|\||\|/g, "&");
			if (arr[2 * db + 6 + i]) // Players
			{	[, uid, plyr] = arr[2 * db + 6 + i].match(/uid=(\d+).+>(.+)<\/a>/);
				field.player = plyr.replace(/\|\|/g, "&");
				field.uid = uid;
				if (arr[3 * db + 6 + i]) // Allies
				{	[, aid, ally] = arr[3 * db + 6 + i].match(/aid=(\d+).+>(.+)<\/a>/);
					field.ally = ally.replace(/\|\|/g, "&");
					field.aid = aid;
				}
			}
			r.data.push(field);
		}
	}
}
function getObj(key, def)	// Kibővített betöltés, teljes objecteket is visszatölthetünk.
{	var obj = GM_getValue(key);
	return obj ? eval(obj) : def ? def : obj;
}
function setObj(key, obj)	// Kibővített mentés, teljes objecteket is menthetünk.
{	GM_setValue(key, obj ? obj.toSource() : obj);
}
function langLoad(html)
{	var temp = xpath("//span[@id='tma_msg']", XPFirst, $elem("div", html)).textContent.split('\n');
	for (var i = 0; i < temp.length; i += 2)
		GM_setValue(temp[i], encodeURIComponent(temp[i + 1]));
	window.location.reload();
}
function langpackUpdateCheck()
{	get(hostUrl + "timestamps.php?lang=" + langpack.split("|")[0] + "&ver=1.0", function(html)
	{	var newver = xpath("//span[@id='tma_msg']", XPFirst, $elem("div", html)).textContent;
		if (newver == "error")	// There isn't such langpack available.... :'(
			return;
		if (parseInt(langpack.split("|")[1], 10) >= parseInt(newver.split("|")[1]), 10)
			return;
		get(hostUrl + "newlang.php?lang=" + langpack.split("|")[0] + "&ver=1.0", langLoad);
		GM_setValue("langpackver", newver);
	});
}

/** AJAX functions **/
function get(url, CBFunction, error)
{	GM_xmlhttpRequest
	({	method: 'GET',
		url: url,
		headers: {'Cache-Control': 'no-cache'},
		onload: function(xhr)
		{	CBFunction(xhr.responseText, xhr.finalUrl);
		},
		onerror: function(xhr)
		{	error(xhr);
		}
	});
}
function post(url, data, CBFunction, error)
{	GM_xmlhttpRequest
	({	method: 'POST',
		url: url,
		headers: {'Content-type': 'application/x-www-form-urlencoded', 'Cache-Control': 'no-cache'},
		data: encodeURI(data),
		onload: function(xhr)
		{	CBFunction(xhr.responseText, xhr.finalUrl)
		},
		onerror: function(xhr)
		{	error(xhr);
		}
	});
}

/** Object constructors **/
function lapozo(hits)	// a megfelelő lapokra helyezi a találatokat
{	var obj = new Object;
	obj.ids = ids;	// a kapcsolók állapotát adja vissza
	obj.clicks = clicks;	// beállítja a kapcsolókat
	obj.page = page;	// Az aktuális oldalt adja vissza
	obj.save = save;	// kimenti a kapcsolók állapotát
	obj.load = load;	// visszatölti a kapcsolókat

	var hits = hits;
	var hitsPerPage = parseInt(GM_getValue("hitsPerPage", 25), 10);	// Egy oldalon megjelenítendő találatok száma.
	var lapok = (hits%hitsPerPage) ? parseInt(hits/hitsPerPage, 10)+1 : hits/hitsPerPage;	// oldalak száma
	var allapot = new Array(6);
	var texts = new Array(6);	// A kapcsolók kimenetét tartalmazza
	var index = new Array(0,1,2,3,4,5);	// Az aktuális oldalakra mutató index
	var lastTextPage = 0;	// A megjelenítendő oldal száma alapból az első (0)
	var txt;

	/* init */
	allapot[0] = "text";
	if (lapok <= 6)
	{	for (var i = 1; i < lapok; i++)
			allapot[i] = "aktiv";
		for (var m = i; m < 6; m++)
			allapot[m] = "inaktiv";
	}
	else
	{	for (var i = 1; i <= 4; i++)
			allapot[i] = "aktiv";
		allapot[i] = "lapozo";
	}
	return obj;

	/* methods */
	function ids()	// Az aktuális kapcsolókat adja vissza egy <SPAN > objektumban.
	{	for (var id = 0; id <= 5; id++)
		{	switch(allapot[id])
			{	case "inaktiv":
					texts[id] = "";
					break;
				case "text":
					texts[id] = index[id]+1 == lapok ? hitsPerPage*index[id]+1 + '-' + hits : hitsPerPage*index[id]+1 + '-' + (hitsPerPage*index[id]+hitsPerPage);
					break;
				case "aktiv":
					txt = index[id]+1 == lapok ? hitsPerPage*index[id]+1 + '-' + hits : hitsPerPage*index[id]+1 + '-' + (hitsPerPage*index[id]+hitsPerPage);
					texts[id] = '<a lapozo="' + id + '" href="javascript:void(0)">' + txt + '</a>';
					break;
				case "lapozo":
					texts[id] = '<a lapozo="' + id + '" href="javascript:void(0)"><...></a>';
					break;
			}
		}
		if (lapok < 6)
		{	txt = "";
			for (var i = 0; i < lapok-1; i++)
				txt += texts[i] + ",&nbsp;";
			txt += texts[i];
		}
		else
			txt = texts.join(",&nbsp;");
		return $elem("span", txt, {'id': 'tma_lapozok'});
	}
	function clicks(id)	//Elvégzi a kapcsolók beállítását attól függően melyik kapcsolón klikkeltek, és visszatérő értékként a megjelenítendő lap oldalszámát adja
	{	var id = parseInt(id, 10);
		switch (allapot[id])
		{	case "aktiv":
				lastTextPage = index[id];
				break;
			case "lapozo":
				if (id == 5)
					var m = ((i = lapok - (index[5] + 4)) > 0) ? 3 : 3+i;
				else
					var m = ((i = index[1] - 4) > 0) ? -3 : -3-i;
				for (var i = 1; i <= 5; i++)
					index[i] += m;
				break;
		}
		if (allapot[5] != "inaktiv")
			allapot[5] = (index[5] == lapok-1) ? "aktiv" : "lapozo";
		for (var i = 0; i <= 5; i++)
			allapot[i] = (index[i] == lastTextPage) ? "text" : (allapot[i] == "text") ? "aktiv" : allapot[i];
		if (allapot[1] != "inaktiv")
			allapot[1] = (index[1] != lastTextPage) ? ((index[1] == 1) ? "aktiv" : "lapozo") : "text";
		return lastTextPage;
	}
	function page()
	{	return lastTextPage;
	}
	function save()
	{	var o =
		{	allapot: allapot,
			index: index,
			lastTextPage: lastTextPage
		}
		return o;
	}
	function load(o)
	{	allapot = o.allapot;
		index = o.index;
		lastTextPage = o.lastTextPage;
	}
}
function timeCounter()	// Átlag időközöket számol
{	var obj = {
			init: init,
			count: count
		},
		avgTime = [], startTime, currentTime;

	return obj;

	function init()	// Az első mérés előtt kell hívni, alaphelyzetbe állítja a változókat
	{	avgTime = [];
		startTime = currentTime = new Date().getTime();
	}
	function count()	// két hívás közti időt méri és az átlagukat adja vissza milliszekundumban
	{	currentTime = new Date().getTime();
		if (avgTime.push(currentTime - startTime) > 60)
			avgTime.shift();
		startTime = currentTime;
		var avg = 0;
		for each (var i in avgTime)
			avg += i;
		return (isNaN(avg/avgTime.length)) ? 0 : avg/avgTime.length;
	}
}

/** Window Object **/
var winObj =
{	wins: [],
	zIndex: 1000,
	active: 0,
	open: function(flags)
	{	var win =
		{	id: undefined,
			welem: undefined,
			belem: undefined,
			telem: undefined,
			posX: (flags.x !== null) ? flags.x : 22*this.wins.length,
			posY: (flags.y !== null) ? flags.y : 25*this.wins.length,
			state: "windowed", // windowed, fullscreen, minimized
			titlebar: flags.title ? flags.title : "Travian Map Analyser",
			buttons: flags.buttons, // mini:, full:, close:  ex.: {mini: function(){alert("mini")},.......
			terminate: (typeof flags.terminate === "function") ? flags.terminate : function(){return;},
			inMove: false,
			mouseOffset:
			{	x: 0,
				y: 0
			},
			set x(pos)
			{	win.posX = parseInt(pos, 10);
				win.welem.style.left = win.posX + "px";
			},
			set y(pos)
			{	win.posY = parseInt(pos, 10);
				win.welem.style.top = win.posY + "px";
			},
			get x()
			{	return win.posX;
			},
			get y()
			{	return win.posY;
			},
			get title()
			{	return win.titlebar;
			},
			set title(text)
			{	win.titlebar = String(text);
				win.telem.innerHTML = win.titlebar;
			},
			get body()
			{	return win.belem;
			},
			buttonHandler: function(event)
			{	var node = event.target;
				if (!node.getAttribute("btn"))
					node = node.parentNode;
				var btn = node.getAttribute("btn");
				if (!btn)
					return;
				var buttons = win.telem.parentNode.nextSibling.firstChild;
				switch (btn)
				{	case "mini":
						if (win.state === "minimized")
						{	win.belem.style.display = "block";
							win.state = "windowed";
							node.innerHTML = "<img src='" + IMG.minimize + "' height='5' width='12' style='margin-top:8px;' />";
							node.title = LD['WIN_MINIMIZE'];
						}
						else
						{	if (win.state === "fullscreen")
							{	win.welem.className = "window windowed";
								// Eredeti helyére állítjuk vissza az ablakot
								win.x = win.x;
								win.y = win.y;
								win.belem.className = "body b_win";
							}
							win.belem.style.display = "none";
							win.state = "minimized";
							node.innerHTML = "<img src='" + IMG.restore + "' height='10' width='12' style='margin-top:3px;' />";
							node.title = LD['WIN_RESTORE'];
							do
							{	buttons.className = buttons.className.replace(/fullscr/, "normal");
							}
							while(buttons = buttons.nextSibling)
						}
						var nextButton = node.nextSibling;
						if (nextButton)
							if (nextButton.getAttribute("btn") === "full")
							{	nextButton.innerHTML = "<img src='" + IMG.full + "' height='10' width='12' style='margin-top:3px;' />";
								nextButton.title = LD['WIN_FULLSIZE'];
							}
						if (typeof win.buttons.mini === "function")
							win.buttons.mini();
						break;
					case "full":
						if (win.state === "fullscreen")
						{	win.welem.className = "window windowed";
							win.state = "windowed";
							// Eredeti helyére állítjuk vissza az ablakot
							win.x = win.x;
							win.y = win.y;
							win.belem.className = "body b_win";
							node.innerHTML = "<img src='" + IMG.full + "' height='10' width='12' style='margin-top:3px;' />"
							node.title = LD['WIN_FULLSIZE'];
							do
							{	buttons.className = buttons.className.replace(/fullscr/, "normal");
							}
							while(buttons = buttons.nextSibling)
						}
						else
						{	win.welem.className = "window fullscreen";
							win.state = "fullscreen";
							// A pozícióját közvetlenül adjuk meg
							win.welem.style.top = "0px";
							win.welem.style.left = "0px";
							win.belem.className = "body b_full";
							win.belem.style.display = "block";
							node.innerHTML = "<img src='" + IMG.windowed + "' height='12' width='12' style='margin-top:1px;' />";
							node.title = LD['WIN_PREV_SIZE'];
							do
							{	buttons.className = buttons.className.replace(/normal/, "fullscr");
							}
							while(buttons = buttons.nextSibling)
						}
						var prevButton = node.previousSibling;
						if (prevButton)
							if (prevButton.getAttribute("btn") === "mini")
							{	prevButton.innerHTML = "<img src='" + IMG.minimize + "' height='5' width='12' style='margin-top:8px;' />";
								prevButton.title = LD['WIN_MINIMIZE'];
							}
						if (typeof win.buttons.full === "function")
							win.buttons.full();
						break;
					case "close":
						if (typeof win.buttons.close === "function")
							if (!win.buttons.close())
								break;
						win.close();
						break;
				}
			},
			mini: function()
			{	win.welem.className = "window windowed";
				win.belem.className = "body b_win";
				win.belem.style.display = "none";
				win.state = "minimized";
				var buttons = win.telem.parentNode.nextSibling;
				if (buttons)
				{	buttons = buttons.firstChild;
					do
					{	if (buttons.getAttribute("btn") === "mini")
						{	buttons.innerHTML = "<img src='" + IMG.restore + "' height='10' width='12' style='margin-top:3px;' />";
							buttons.title = LD['WIN_RESTORE'];
						}
					}
					while(buttons = buttons.nextSibling)
				}
			},
			full: function()
			{	win.welem.className = "window fullscreen";
				win.state = "fullscreen";
				win.welem.style.top = "0px";
				win.welem.style.left = "0px";
				win.belem.className = "body b_full";
				var buttons = win.telem.parentNode.nextSibling;
				if (buttons)
				{	buttons = buttons.firstChild;
					do
					{	if (buttons.getAttribute("btn") == "full")
						{	buttons.innerHTML = "<img src='" + IMG.windowed + "' height='12' width='12' style='margin-top:1px;' />";
							buttons.title = LD['WIN_PREV_SIZE'];
						}
						buttons.className = buttons.className.replace(/normal/, "fullscr");
					}
					while(buttons = buttons.nextSibling)
				}
			},
			close: function()
			{	remove(win.welem);
				winObj.wins[win.id] = undefined;
			},
			makeInactive: function()
			{	win.telem.style.backgroundColor = document.defaultView.getComputedStyle(win.welem, null).getPropertyValue('background-color');
				win.telem.style.color = "#ccc";
				var buttons = win.telem.parentNode.nextSibling;
				if (buttons)
				{	buttons = buttons.firstChild;
					do
						buttons.className = buttons.className.replace(/normal|fullscr|red/, "");
					while(buttons = buttons.nextSibling)
				}
			},
			makeActive: function()
			{	if (win.id === winObj.active)
					return;
				win.telem.style.backgroundColor = "";
				win.telem.style.color = "";
				var buttons = win.telem.parentNode.nextSibling;
				if (buttons)
				{	buttons = buttons.firstChild;
					do
					{	if (win.state === "fullscreen")
							buttons.className = buttons.className.replace(/(gomb) $/, "$1 fullscr");
						else
							buttons.className = buttons.className.replace(/(gomb) $/, "$1 normal");
						buttons.className = buttons.className.replace(/gomb\s+close/, "gomb red close");
					}
					while(buttons = buttons.nextSibling)
				}
				try
				{	winObj.wins[winObj.active].makeInactive();
				}
				catch(e)
				{}
				winObj.active = win.id;
				win.welem.style.zIndex = ++winObj.zIndex;
			},
			moveStart: function(e)
			{	if (win.state === "fullscreen")
					return;
				win.mouseOffset.x = win.welem.offsetLeft - e.pageX;
				win.mouseOffset.y = win.welem.offsetTop - e.pageY;
				document.addEventListener("mousemove", win.moveGo, true);
				document.addEventListener("mouseup", win.moveStop, true);
				win.inMove = true;
				win.makeActive();
				win.welem.style.opacity = 0.6;
			},
			moveGo: function(e)
			{	if (!win.inMove)
					return;
				var x = e.pageX;
				var y = e.pageY;
				e.preventDefault();
				x = x + win.mouseOffset.x;
				y = y + win.mouseOffset.y;
				win.x = (x < 0) ? 0 : x;
				win.y = (y < 0) ? 0 : y;
			},
			moveStop: function(e)
			{	win.inMove = false;
				document.removeEventListener("mousemove", win.moveGo, true);
				document.removeEventListener("mouseup", win.moveStop, true);
				win.welem.style.opacity = "";
			}
		};

		/** fő ablak **/
		var div = $elem("div", "", {"class":"window windowed"}, {"top":win.y + "px", "left":win.x + "px", "zIndex":this.zIndex}, document.body);
		div.addEventListener("click", win.makeActive, false);
		win.welem = div;
		/** címsor **/
		var title = $elem("div", "", {"class":"titlebar"}, {}, div);
		title.addEventListener("mousedown", function(e){e.preventDefault(); win.moveStart(e);}, true);
		var titleContainer = $elem("div", "", {"class":"title-container"}, {}, title);
		var span = $elem("span", win.title, {"class":"titlebar-text"}, {"direction":textDirection}, titleContainer);
		win.telem = span;
		if (win.buttons)
		{	var buttons = $elem("div", "", {"class":"buttons-container"}, {}, title);
			buttons.addEventListener("click", win.buttonHandler, false);
			var tmp = [];
			if (win.buttons.mini) tmp.push("mini");
			if (win.buttons.full) tmp.push("full");
			if (win.buttons.close) tmp.push("close");
			for (var i in tmp)
			{	switch (tmp[i])
				{	case "mini":
						var btn = $elem("div", "<img src='" + IMG.minimize + "' height='5' width='12' style='margin-top:7px;' />", {"btn":"mini", "class":"gomb normal", "title":LD['WIN_MINIMIZE']}, {}, buttons);
						break;
					case "full":
						var btn = $elem("div", "<img src='" + IMG.full + "' height='10' width='12' style='margin-top:2px;' />", {"btn":"full", "class":"gomb normal", "title":LD['WIN_FULLSIZE']}, {}, buttons);
						break;
					case "close":
						var btn = $elem("div", "<img src='" + IMG.close + "' height='10' width='10' style='margin-top:2px;' />", {"btn":"close", "class":"gomb red close", "title":LD['WIN_CLOSE']}, {}, buttons);
						break;
				}
				if (i == 0)
					btn.style.MozBorderRadiusBottomleft = "6px";
			}
			btn.style.MozBorderRadiusBottomright = "6px";
		}
		/** munkaterület **/
		var bodyDiv = $elem("div", "", {"class":"body b_win"}, {}, div);
		win.belem = bodyDiv;
		win.id = this.wins.length;
		this.wins.push(win);
		setTimeout(function(){win.makeActive()}, 1);
		return win.id;
	}
}

/** code snippets **/
function btnMaker(text)	// Button maker
{	var div = $elem("div", "", {"class":"tma_button"});
	$elem("span", text, {"dir":textDirection}, {"margin":"3px", "position":"relative", "top":"2px"}, div);
	return div;
}
function alertWin(content)	// Alert window
{	var x = -130+Math.random()*100;
	var y = -130+Math.random()*100;
	var ablak = winObj.open
	({	buttons:
		{	close: true
		},
		title: LD["ALERT"],
		x: x+parseInt(innerWidth/2, 10),
		y: y+parseInt(innerHeight/2, 10)
	});
	ablak = winObj.wins[ablak];
	var div = $elem("div", "", {}, {"minWidth":"300px", "minHeight":"50px"}, ablak.body);
	div.appendChild(content);
	var button = btnMaker(LD["OK"]);
	button.addEventListener("click", function()
	{	ablak.close();
	}, true);
	var center = $elem("center", "", {}, {}, ablak.body);
	center.appendChild(button);
}
function animation()	// kereső animáció
{	if (GM_getValue("search_animation", true))
	{	at = setInterval(function()
		{	if (!anim.node)
			{	anim.node = $("tma_mag");
				anim.node.style.visibility = "visible";
				return;
			}
			if (anim.top+anim.y > 200 || anim.top+anim.y < 0)
				anim.top = -anim.top;
			if (anim.left+anim.x > 280 || anim.left+anim.x < 0)
				anim.left = -anim.left;
			anim.y += anim.top;
			anim.x += anim.left;
			anim.node.style.top = (anim.y)+"px";
			anim.node.style.left = (anim.x)+"px";
		}, 40);
	}
	else
	{	n = $("tma_mag");
		n.style.visibility = "visible";
		n.style.top = anim.y+"px";
		n.style.left = anim.x+"px";
	}
}
/******************************************** aux functions end *********************************************/

/******************************************** main functions begin *******************************************/

/* üzenet küldésnél megírjuk az üzenetet és a témát, autómatikusan. */
if (window.location.href.indexOf("nachrichten.php?t=1") > -1)
{	if (recovery.datas.igm != "")
	{	$('subject').value = "TMA_IGM v2.0";
		$('copy_subject').value = "TMA_IGM v2.0";
		$('igm').value = recovery.datas.igm;
		$('copy_igm').value = recovery.datas.igm;
		recovery.datas.igm = "";
	}
}

/* Bejövő üzenetek figyelése TMA üzenetek után lesve */
if (window.location.href.indexOf("nachrichten.php?id=") > -1)
{	var td = xpath(t35 ? "id('message')" : "//table[@class='msg_rw']|//td[@colspan='3']", XPFirst);
	text = td.textContent;
	if (/--\/\/TMA begin\/\/--\n((.*\n)+)--\/\/TMA end\/\/--/m.test(text))
	{	if (confirm(LD['LOAD_CONFIRM']))
		{	text = text.substring(text.lastIndexOf('--//TMA begin//--\n') + 18, text.indexOf('--//TMA end//--'));
			post(hostUrl + 'comp.php', 'decomp=' + text, function(html)
			{	var text = xpath("span[@id='tma_msg']", XPFirst, $elem("div", html)).textContent;
				if (text == "error")
				{	alertWin($elem("center", "<h3>" + LD["ERROR_DATA"] + "</h3>", {}, {"margin":"6px"}));
					return;
				}
				if (recovery.datas.hits.winNumber)
				{	var a = recovery.datas.hits.winNumber;
					winObj.wins[a].buttons.close();
					winObj.wins[a].close();
				}
				dataLoad(text);
				hitsWin();
			});
		}
	}
}

// Main window
function mainWin()
{	var ablak = winObj.open(
	{	buttons:
		{	mini:true
		},
		x: recovery.wins.main.x,
		y: recovery.wins.main.y,
		title: "Travian Map Analyser - " + headers["version"],
		terminate: function(winId)
		{	recovery.wins.main.state = winObj.wins[winId].state;
			recovery.wins.main.x = winObj.wins[winId].x;
			recovery.wins.main.y = winObj.wins[winId].y;
		}
	});
	ablak = winObj.wins[ablak];
	if (recovery.wins.main.state == "minimized")
		ablak.mini();

	var center = $elem("center", "", {}, {}, ablak.body);
	var table = $elem("table", "", {"width":"100%", "border":0}, {}, $elem("div", "", {"dir":"ltr"}, {"width":"238px", "height":"57px"}, center));
	var tr = $elem("tr", "", {}, {}, table);

	var search = $elem("img", "", {"title":LD["SEARCH"], "src":IMG.mag48, "width":48, "height":48}, {"cursor":"pointer", "margin":(t35 ? "2px 5px":"0px 3px")}, $elem("td", "", {"align":"center"}, {}, tr));
	var dist = $elem("img", "", {"title":LD["DIST_CALC"], "src":IMG.radar48, "width":48, "height":48}, {"cursor":"pointer", "margin":(t35 ? "2px 4px":"0px 3px")}, $elem("td", "", {"align":"center"}, {}, tr));
	var io = $elem("img", "", {"title":LD["LOAD-CONTINUE"], "src":IMG.floppy48, "width":48, "height":48}, {"cursor":"pointer", "margin":(t35 ? "2px 4px":"0px 3px")}, $elem("td", "", {"align":"center"}, {}, tr));
	var setup = $elem("img", "", {"title":LD["SETUP"], "src":IMG.config48, "width":48, "height":48}, {"cursor":"pointer", "margin":(t35 ? "2px 5px":"0px 3px")}, $elem("td", "", {"align":"center"}, {}, tr));

	search.addEventListener("click", function()
	{	if (recovery.datas.search.phase !== null)
		{	alertWin($elem("center", "<h3>"+ LD["ALREADYRUNNING"] +"</h3>", {}, {"margin":"6px"}));
			return;
		}
		searchWin()
	}, true);

	dist.addEventListener("click", function()
	{	if (recovery.datas.dist.phase !== null)
		{	alertWin($elem("center", "<h3>"+ LD["ALREADYRUNNING"] +"</h3>", {}, {"margin":"6px"}));
			return;
		}
		distWin()
	}, true);

	io.addEventListener("click", function()
	{	if (recovery.datas.saveAndLoad.phase !== null)
		{	alertWin($elem("center", "<h3>"+ LD["ALREADYRUNNING"] +"</h3>", {}, {"margin":"6px"}));
			return;
		}
		recovery.datas.saveAndLoad.phase = 1;
		ioWin();
	}, true);

	setup.addEventListener("click", function()
	{	if (recovery.datas.setup.phase !== null)
		{	alertWin($elem("center", "<h3>"+ LD["ALREADYRUNNING"] +"</h3>", {}, {"margin":"6px"}));
			return;
		}
		setupWin();
	}, true)

	$elem("br", "", {}, {}, ablak.body);
	$elem("a", LD["CONTACT"], {"href":"mailto:" + headers["e-mail"], "title":headers["e-mail"], "target":"_blank"}, {"cssFloat":"left", "color":"#d71", "fontSize":"10px", "margin":"5px"}, ablak.body);
	$elem("a", "v.: " + headers["version"], {"href":verUrl, "title":LD["HOMEPAGE"], "target":"_blank"}, {"cssFloat":"right", "color":"#d71", "fontSize":"10px", "margin":"5px"}, ablak.body);
}

// Search window
function searchWin()
{	/** beállítási felület **/
	function settings()
	{	var body = $elem("div");
		var fieldType = ["normal", "crop", "lumber", "clay", "iron", "crop7"];
		var oasisType = ["o50cr", "o25cr", "o25l", "o25c", "o25i"];

		$elem("b", "<u>" + LD["STARTCOOR"] + "</u>", {}, {"margin":(t35 ? "0px 4px" : "0px 3px")}, body);
		var table = $elem("table", "", {"border":0}, {"margin":(t35 ? "0px 4px" : "0px 3px")}, body);
		var tr =  $elem("tr", "", {"align":"center"}, {}, table);
		$elem("td", "x:", {}, {}, tr);
		$elem("td", '<input id="tma_x" size="2" maxlength="4" />', {}, {}, tr);
		$elem("td", "y:", {}, {}, tr);
		$elem("td", '<input id="tma_y" size="2" maxlength="4" />', {}, {}, tr);
		$elem("td", '<span title="' + LD["RAD_TITLE"] + '">' + LD["RADIUS"] + '</span>', {}, {}, tr);
		$elem("td", '<input id="tma_r" size="1" maxlength="2" />', {"title":LD["RAD_TITLE"]}, {}, tr);

		table = $elem("table", "", {"border":0}, {"margin":(t35 ? "0px 4px" : "1px 3px")}, body);
		tr =  $elem("tr", "", {"align":"center"}, {}, table);
		$elem("td", LD["MAPSIZE"], {}, {}, tr);
		$elem("td", '<span id="tma_mps1">0</span>', {}, {}, tr);
		$elem("td", 'x', {}, {}, tr);
		$elem("td", '<span id="tma_mps2">0</span>', {}, {}, tr);

		$elem("b", "<u>" + LD["SEARCHFOR"] + "</u>", {}, {"margin":(t35 ? "0px 4px" : "0px 3px")}, body);
		$elem("input", "", {"id":"tma_searchAll", "type":"checkbox"}, {"position":"relative", "bottom":"-2px"}, body);
		table = $elem("table", "", {"border":0}, {}, body);
		tr =  $elem("tr", "", {"align":"center"}, {}, table);
		$elem("td", '<input id="tma_crop" type="checkbox"/>', {}, {}, tr);
		$elem("td", '<span>9-15</span>', {}, {}, tr);
		$elem("td", '<img src="' + IMG.gabona + '" title="' + LD["CROP"] + '" width="18" height="12"/>', {}, {}, tr);
		$elem("td", '<input id="tma_normal" type="checkbox"/>', {}, {}, tr);
		$elem("td", '<span>6</span>', {}, {}, tr);
		$elem("td", '<img src="' + IMG.gabona + '" title="' + LD["CROP"] + '" width="18" height="12"/>', {}, {}, tr);
		if (t35)	// Travian 3.5
		{	$elem("td", '<input id="tma_crop7" type="checkbox"/>', {}, {}, tr);
			$elem("td", '<span>7</span>', {}, {}, tr);
			$elem("td", '<img src="' + IMG.gabona + '" title="' + LD["CROP"] + '" width="18" height="12"/>', {}, {}, tr);
		}
		table = $elem("table", "", {"border":0}, {}, body);
		tr =  $elem("tr", "", {"align":"center"}, {}, table);
		$elem("td", '<input id="tma_lumber" type="checkbox"/>', {}, {}, tr);
		$elem("td", '<img src="' + IMG.fa + '" title="' + LD["LUMBER"] + '" width="18" height="12"/>', {}, {}, tr);
		$elem("td", '<input id="tma_clay" type="checkbox"/>', {}, {}, tr);
		$elem("td", '<img src="' + IMG.agyag + '" title="' + LD["CLAY"] + '" width="18" height="12"/>', {}, {}, tr);
		$elem("td", '<input id="tma_iron" type="checkbox"/>', {}, {}, tr);
		$elem("td", '<img src="' + IMG.vas + '" title="' + LD["IRON"] + '" width="18" height="12"/>', {}, {}, tr);

		$elem("b", "<u>" + LD["OASIS"] + "</u>", {}, {"margin":(t35 ? "0px 4px" : "0px 3px")}, body);
		$elem("input", "", {"id":"tma_oasisAll", "type":"checkbox"}, {"position":"relative", "bottom":"-2px"}, body);
		table = $elem("table", "", {"border":0}, {}, body);
		tr =  $elem("tr", "", {"align":"center"}, {}, table);
		$elem("td", '<input id="tma_o50cr" type="checkbox"/>', {}, {}, tr);
		$elem("td", '<span>50%</span>', {}, {}, tr);
		$elem("td", '<img src="' + IMG.gabona + '" title="' + LD["CROP"] + '" width="18" height="12"/>', {}, {}, tr);
		$elem("td", '<input id="tma_o25cr" type="checkbox"/>', {}, {}, tr);
		$elem("td", '<span>25%</span>', {}, {}, tr);
		$elem("td", '<img src="' + IMG.gabona + '" title="' + LD["CROP"] + '" width="18" height="12"/>', {}, {}, tr);
		table = $elem("table", "", {"border":0}, {}, body);
		tr =  $elem("tr", "", {"align":"center"}, {}, table);
		$elem("td", '<input id="tma_o25l" type="checkbox"/>', {}, {}, tr);
		$elem("td", '<span>25%</span>', {}, {}, tr);
		$elem("td", '<img src="' + IMG.fa + '" title="' + LD["LUMBER"] + '" width="18" height="12"/>', {}, {}, tr);
		$elem("td", '<input id="tma_o25c" type="checkbox"/>', {}, {}, tr);
		$elem("td", '<span>25%</span>', {}, {}, tr);
		$elem("td", '<img src="' + IMG.agyag + '" title="' + LD["CLAY"] + '" width="18" height="12"/>', {}, {}, tr);
		$elem("td", '<input id="tma_o25i" type="checkbox"/>', {}, {}, tr);
		$elem("td", '<span>25%</span>', {}, {}, tr);
		$elem("td", '<img src="' + IMG.vas + '" title="' + LD["IRON"] + '" width="18" height="12"/>', {}, {}, tr);
		$elem("td", '&nbsp;&nbsp;', {}, {}, tr);
		var td = $elem("td", '', {}, {}, tr);
		var btn = btnMaker(LD["SEARCH_BTN"]);
		td.appendChild(btn);

		btn.addEventListener("click", function()
		{	recovery.datas.search.centerOfSearch = xyzona({x:$("tma_x").value, y:$("tma_y").value});
			var r = recovery.datas.search.switches;
			if (r.normal || r.crop || r.crop7 || r.lumber || r.clay || r.iron || r.o50cr || r.o25cr || r.o25l || r.o25c || r.o25i)
				searching();
			else
				alertWin($elem("center", "<h3>" + LD["NO_GOALS"] + "</h3>", {}, {"margin":"6px"}));
		}, true);

		body.addEventListener("click", function(e)
		{	var node = e.target;
			if (node.nodeName != "INPUT")
				return;
			if (node.type != "checkbox")
				return;
			switch (node.id)
			{	case "tma_searchAll":
					for (i = 0; i < (t35 ? 6 : 5); i++)
					{	recovery.datas.search.switches[fieldType[i]] = node.checked;
						$("tma_" + fieldType[i]).checked = node.checked;
					}
					break;
				case "tma_oasisAll":
					for (i = 0; i < 5; i++)
					{	recovery.datas.search.switches[oasisType[i]] = node.checked;
						$("tma_" + oasisType[i]).checked = node.checked;
					}
					break;
				default:
					recovery.datas.search.switches[node.id.replace("tma_", "")] = node.checked;
			}
		}, true);
		return body;
	}
	/** kereső animáció **/
	function searcher()
	{	var body = $elem("div", "", {}, {"minHeight":"322px", "width":"400px"});

		var animdiv = $elem("div", "", {"dir":"ltr"}, {"height":"300px", "width":"400px"}, body);
		$elem("div", '<img src="' + IMG.mag128 + '" width="128" height="128"/>', {"id":"tma_mag"}, {"width":"128px", "height":"128px", "zIndex":1, "visibility":"hidden", "position":"relative", "top":anim.y+"px", "left":anim.x+"px"}, animdiv);
		$elem("div", '<img src="' + IMG.map + '" width="400" height="300"/>', {}, {"zIndex":0, "position":"relative", "top":"-128px", "left":"0px"}, animdiv);

		$elem("div", "&nbsp;", {"id":"tma_fj"}, {"backgroundImage":"url(" + IMG.fjFG + ")", "height":"15px", "width":"0%", "backgroundRepeat":"repeat-x", "whiteSpace":"nowrap", "color":"#cbf5f2", "overflow":"hidden", "textAlign":"center", "fontWeight":"bold"}, $elem("div", "", {"dir":"ltr"}, {"backgroundImage":"url(" + IMG.fjBG + ")", "backgroundRepeat":"repeat-x", "width":"398px", "border":"1px inset black"}, body));

		$elem("center", ". . .", {"id":"tma_remain_time"}, {}, body);

		var btn = btnMaker(LD["STOP_SAVE"]);
		body.appendChild(btn);
		btn.addEventListener("click", function()
		{	stopAndSaveFlag = true;
			try
			{	clearInterval(at);	// Itt jön az, hogy megállítjuk az animációt és bezárjuk az ablakot
				clearInterval(ashc);	// Leállítjuk az ellenőrzést.
				anim.node = null;
			}
			catch(e){}
			recovery.datas.search.phase = null;
			recovery.datas.search.areas = [];
			recovery.wins.search.state = null;
			recovery.wins.search.x = ablak.x;
			recovery.wins.search.y = ablak.y;
			ablak.close();
		}, true);

		return body;
	}
	/** A kereső rutin **/
	function searching()
	{	function areasGet(html)
		{	if (GM_getValue("quickmode", false) && t35)
				fieldScanNew(html);
			else
			{	var areas = xpath("//area[starts-with(@id, 'a_') and @href]", XPList, $elem("div", html));
				recovery.datas.search.areas = [];
				for (var i = 0; i < areas.snapshotLength; i++)
					recovery.datas.search.areas.push(areas.snapshotItem(i).href);
				if (recovery.datas.search.amm == -1)
				{	recovery.datas.search.amm = areas.snapshotLength-1;
					recovery.datas.stat.max_fields += areas.snapshotLength-49; // Ha kevesebb mint 49 area van az adott zónában.
				}
				get(recovery.datas.search.areas[recovery.datas.search.amm], fieldScan);	// Betöltjük ellenőrzésre az adott területet.
			}
		}
		function fieldScan(html, u)
		{	if (stopAndSaveFlag)
			{	stopAndSaveFlag = false;
				recovery.datas.search.in_search = false;
				// a jelenlegi állapotot ki kell menteni a folytatáshoz
				recovery.datas.saveAndLoad.saved =
				{	centerOfSearch: recovery.datas.search.centerOfSearch,
					r: recovery.datas.search.r,
					switches: recovery.datas.search.switches.toSource(),
					zpm: recovery.datas.search.zpm,
					amm: recovery.datas.search.amm,
					hits: recovery.datas.search.hits.toSource(),
					max_fields: recovery.datas.stat.max_fields,
					fields_done: recovery.datas.stat.fields_done,
				}
				recovery.datas.search.hits = [];
				recovery.datas.search.zpm = -1;
				recovery.datas.search.amm = -1;
				return;
			}
			if (!recovery.datas.search.in_search)
				return;

			var page = $elem("div", html);
			var r = recovery.datas.search;
			var field =
			{	type: null,
				url: null,
				name: null,
				player: null,
				uid: null,
				ally: null,
				aid: null
			}
			if (t35)
				field.type = xpath("//img[starts-with(@id, 'f')]/@id|//img[starts-with(@class, 'f')]/@class", XPFirst, page);
			else
				field.type = xpath("//div[starts-with(@id, 'f')]/@id", XPFirst, page);
			if (field.type)
				field.type = field.type.value;
			else
			{	if (!t35)
					field.type = "o" + xpath("//img[@id='resfeld']/@src", XPFirst, page).value.match(/w(\d+)\.jpg/)[1];
				else	// Travian 3.5
					field.type = xpath("//img[starts-with(@id, 'w')]/@id|//img[starts-with(@class, 'w')]/@class", XPFirst, page).value.replace("w", "o");
			}
			var u = u.match(/karte\.php\?d=(\d+)&c=(.{2})/);
			field.url = u[1]+"|"+u[2];
			field.name = xpath("//div[@id='content']//h1|//div[@id='lmid2']//h1", XPFirst, page).textContent.replace(/\s+\([\d-]+\|[\d-]+\)\s*$/, "");
			var player = xpath("//div[@id='map_details_info' or @id='map_details_right' or @id='map_details']//a[starts-with(@href, 'spieler.php')]", XPFirst, page);
			if (player)
			{	field.player = player.textContent.replace(/^\s+/, "");
				field.uid = player.href.match(/uid=(\d+)/)[1];
				var ally = xpath("//div[@id='map_details_info' or @id='map_details_right' or @id='map_details']//a[starts-with(@href, 'allianz.php')]", XPFirst, page);
				if (ally && ally.textContent != "")
				{	field.ally = ally.textContent;
					field.aid = ally.href.match(/aid=(\d+)/)[1];
				}
			}
			// Keresési feltételek vizsgálata
			switch (field.type)
			{	case "f1":
				case "f6":
					if (r.switches.crop)
							r.hits.push(field);
					break;
				case "f7":	// Travian 3.5
				case "f8":
				case "f9":
					if (r.switches.crop7)
							r.hits.push(field);
					break;
				case "f3":
					if (r.switches.normal)
							r.hits.push(field);
					break;
				case "f5":
				case "f12":
					if (r.switches.lumber)
							r.hits.push(field);
					break;
				case "f4":
				case "f10":
					if (r.switches.clay)
							r.hits.push(field);
					break;
				case "f2":
				case "f11":
					if (r.switches.iron)
							r.hits.push(field);
					break;
				case "o1":
				case "o2":
					if (r.switches.o25l)
							r.hits.push(field);
					break;
				case "o4":
				case "o5":
					if (r.switches.o25c)
							r.hits.push(field);
					break;
				case "o7":
				case "o8":
					if (r.switches.o25i)
							r.hits.push(field);
					break;
				case "o12":
					if (r.switches.o50cr)
							r.hits.push(field);
					break;
				case "o3":
				case "o6":
				case "o9":
				case "o10":
				case "o11":
					if (r.switches.o25cr)
							r.hits.push(field);
					break;
			}
			// Statisztikai rész
			++recovery.datas.stat.fields_done;
			var percent = recovery.datas.stat.fields_done/(recovery.datas.stat.max_fields/100);
			rt.innerHTML = '<b>' + LD['TIME_REMAINS'] + '&nbsp;</b><span style="color:blue">&nbsp;' + timeToString((recovery.datas.stat.max_fields - recovery.datas.stat.fields_done) * timeDifference.count()) + '</span>';
			fj.style.width = percent + "%"
			fj.innerHTML = parseInt(percent, 10) + "%";
			ablak.title = LD["SEARCH"] + " " + parseInt(percent, 10) + "%";
			// Következő mező vizsgálata
			if (--r.amm > -1)
				get(r.areas[r.amm], fieldScan);
			else
			{	if (--r.zpm > -1)
					get(zp[r.zpm], areasGet);
				else
				{	try
					{	clearInterval(at);
						clearInterval(ashc);	// Leállítjuk az ellenőrzést.
						anim.node = null;
					}
					catch(e){}
					recovery.datas.search.phase = null;
					recovery.wins.search.state = null;
					ablak.close();
					if (recovery.datas.stat.max_fields != recovery.datas.stat.fields_done)
						alert("Debug: The hits may contain errors");	// debug
					if (recovery.datas.hits.winNumber)
					{	var a = recovery.datas.hits.winNumber;
						winObj.wins[a].buttons.close();
						winObj.wins[a].close();
					}
					recovery.datas.hits.data = r.hits;
					recovery.datas.hits.sdcr =
					[	server,
						new Date().toLocaleString(),
						recovery.datas.search.centerOfSearch,
						recovery.datas.search.r
					];
					r.hits = [];
					r.areas = [];
					recovery.datas.hits.bonus = false;
					hitsWin();
				}
			}
		}

		function fieldScanNew(html)
		{	if (stopAndSaveFlag)
			{	stopAndSaveFlag = false;
				recovery.datas.search.in_search = false;
				// a jelenlegi állapotot ki kell menteni a folytatáshoz
				recovery.datas.saveAndLoad.saved =
				{	centerOfSearch: recovery.datas.search.centerOfSearch,
					r: recovery.datas.search.r,
					switches: recovery.datas.search.switches.toSource(),
					zpm: recovery.datas.search.zpm,
					amm: recovery.datas.search.amm,
					hits: recovery.datas.search.hits.toSource(),
					max_fields: recovery.datas.stat.max_fields,
					fields_done: recovery.datas.stat.fields_done,
				}
				recovery.datas.search.hits = [];
				recovery.datas.search.zpm = -1;
				recovery.datas.search.amm = -1;
				return;
			}
			if (!recovery.datas.search.in_search)
				return;

			var page = $elem("div", html);
			var r = recovery.datas.search;
			var scrpt = xpath("//script", XPList, page);
			eval("var text_k={}\n" + scrpt.snapshotItem(4).textContent + "var m_c={}\n" + scrpt.snapshotItem(5).textContent);

			for (i = 0; i < 49; i++)
			{	var col = parseInt(i/7, 10);
				var row = i%7;
				var f = m_c.ad[col][row];
				var field =
				{	type: null,
					url: null,
					name: null,
					player: null,
					uid: null,
					ally: null,
					aid: null
				}

				if (!f[4])	// T. Classic szervereken nincsen oázis
				{   recovery.datas.stat.fields_done++;
					continue;
				}

				var u = f[4].match(/d=(\d+)&c=(.{2})/);
					field.url = u[1] + "|" + u[2];
					field.type = (f[2] ? "f" + f[2] : "o" + f[3]);
					if (f.length > 6)
					{	field.name = (!f[2] ? text_k.besetztes_tal : f[6]);
						field.player = f[7];
						field.ally = f[9];
					}
					else
					   field.name = text_k.verlassenes_tal;

				// Keresési feltételek vizsgálata
				switch (field.type)
				{	case "f1":
					case "f6":
						if (r.switches.crop)
								r.hits.push(field);
						break;
					case "f7":	// Travian 3.5
					case "f8":
					case "f9":
						if (r.switches.crop7)
								r.hits.push(field);
						break;
					case "f3":
						if (r.switches.normal)
								r.hits.push(field);
						break;
					case "f5":
					case "f12":
						if (r.switches.lumber)
								r.hits.push(field);
						break;
					case "f4":
					case "f10":
						if (r.switches.clay)
								r.hits.push(field);
						break;
					case "f2":
					case "f11":
						if (r.switches.iron)
								r.hits.push(field);
						break;
					case "o1":
					case "o2":
						if (r.switches.o25l)
								r.hits.push(field);
						break;
					case "o4":
					case "o5":
						if (r.switches.o25c)
								r.hits.push(field);
						break;
					case "o7":
					case "o8":
						if (r.switches.o25i)
								r.hits.push(field);
						break;
					case "o12":
						if (r.switches.o50cr)
								r.hits.push(field);
						break;
					case "o3":
					case "o6":
					case "o9":
					case "o10":
					case "o11":
						if (r.switches.o25cr)
								r.hits.push(field);
						break;
				}

				// Statisztikai rész
				++recovery.datas.stat.fields_done;
			}
			// Statisztikai rész
			var percent = recovery.datas.stat.fields_done/(recovery.datas.stat.max_fields/100);
			rt.innerHTML = '<b>' + LD['TIME_REMAINS'] + '&nbsp;</b><span style="color:blue">&nbsp;' + timeToString((recovery.datas.stat.max_fields - recovery.datas.stat.fields_done)/49 * timeDifference.count()) + '</span>';
			fj.style.width = percent + "%"
			fj.innerHTML = parseInt(percent, 10) + "%";
			ablak.title = LD["SEARCH"] + " " + parseInt(percent, 10) + "%";

			if (--r.zpm > -1)
				get(zp[r.zpm], fieldScanNew);
			else
			{	try
				{	clearInterval(at);
					clearInterval(ashc);	// Leállítjuk az ellenőrzést.
					anim.node = null;
				}
				catch(e){}
				recovery.datas.search.phase = null;
				recovery.wins.search.state = null;
				ablak.close();
				if (recovery.datas.stat.max_fields != recovery.datas.stat.fields_done)
					alert("Debug: The hits may contain errors");	// debug
				if (recovery.datas.hits.winNumber)
				{	var a = recovery.datas.hits.winNumber;
					winObj.wins[a].buttons.close();
					winObj.wins[a].close();
				}
				recovery.datas.hits.data = r.hits;
				recovery.datas.hits.sdcr =
				[	server,
					new Date().toLocaleString(),
					recovery.datas.search.centerOfSearch,
					recovery.datas.search.r
				];
				r.hits = [];
				recovery.datas.hits.bonus = false;
				hitsWin();
			}
		}

		if (recovery.datas.search.phase == 1)
		{	ablak.body.innerHTML = "";
			ablak.body.appendChild(searcher());
			recovery.datas.search.phase = 2;
			recovery.datas.search.zpm = -1;
			recovery.datas.search.amm = -1;
			recovery.datas.search.hits = [];
			ablak.title = LD["SEARCH"];
		}
		animation();
		// A fő kereső rész
		var zp = zonapontok(zonaxy(recovery.datas.search.centerOfSearch), recovery.datas.search.r);

		if (recovery.datas.search.zpm == -1)	// Inicializáljuk a mutatókat
		{	recovery.datas.search.zpm = zp.length-1;
			recovery.datas.stat.max_fields = zp.length*49;
			recovery.datas.stat.fields_done = 0;
		}

		// Keresés indítása
		var fj = $("tma_fj");	// folyamat jelző
		var rt = $("tma_remain_time");	// A számláló
		recovery.datas.search.in_search = true;
		get(zp[recovery.datas.search.zpm], areasGet);
		timeDifference.init();
		var lastCheck = 0;
		ashc = setInterval(function()
		{	if (lastCheck == recovery.datas.stat.fields_done)
				window.location.reload();
			lastCheck = recovery.datas.stat.fields_done;
		}, GM_getValue("ashc", 30)*1000);
	}
	switch (recovery.datas.search.phase)
	{	case null:
			recovery.datas.search.phase = 1;
			recovery.datas.search.switches =	// Defaults
			{	normal: false,
				crop7: false,	// Travian 3.5
				crop: true,
				lumber: false,
				clay: false,
				iron: false,
				o50cr: false,
				o25cr: false,
				o25l: false,
				o25c: false,
				o25i: false
			}
			recovery.datas.search.r = GM_getValue("default_radius", 0);
		case 1:
			var title = LD["SEARCHSETTINGS"];
			var body = settings();
			break;
		case 2:
			var title = LD['SEARCH'];
			var body = searcher();
			break;
	}

	var ablak = winObj.open(
	{	buttons:
		{	mini: function()
			{	if (recovery.datas.search.phase == 2)
					switch (ablak.state)
					{	case "minimized":
							try
							{	clearInterval(at);
							}
							catch(e){}
							break;
						case "windowed":
							animation();
							break;
					}
			},
			close: function()
			{	if (recovery.datas.search.phase == 2)
				{	if (confirm(LD["ABORT_QUESTION"]))
					{	recovery.datas.search.in_search = false;
						recovery.wins.search.state = null;
						recovery.wins.search.x = ablak.x;
						recovery.wins.search.y = ablak.y;
						recovery.datas.search.phase = null;
						recovery.datas.search.areas = [];
						recovery.datas.search.hits = [];
						try
						{	clearInterval(at);	// Itt jön az, hogy megállítjuk az animációt és bezárjuk az ablakot
							clearInterval(ashc);	// Leállítjuk az ellenőrzést.
							anim.node = null;
						}
						catch(e){}
						return true;
					}
				}
				else
				{	recovery.wins.search.state = null;
					recovery.wins.search.x = ablak.x;
					recovery.wins.search.y = ablak.y;
					recovery.datas.search.phase = null;
					return true;
				}
			}
		},
		x: recovery.wins.search.x,
		y: recovery.wins.search.y,
		title: title,
		terminate: function(winId)
		{	recovery.wins.search.state = winObj.wins[winId].state;
			recovery.wins.search.x = winObj.wins[winId].x;
			recovery.wins.search.y = winObj.wins[winId].y;
		}
	});
	ablak = winObj.wins[ablak];
	if (recovery.wins.search.state == "minimized")
		ablak.mini();
	ablak.body.appendChild(body);
	ablak.body.style.overflow = "hidden";

	switch (recovery.datas.search.phase)
	{	case 1:
			$("tma_crop").checked = recovery.datas.search.switches.crop;
			if (t35) $("tma_crop7").checked = recovery.datas.search.switches.crop7;	// Travian 3.5
			$("tma_normal").checked = recovery.datas.search.switches.normal;
			$("tma_lumber").checked = recovery.datas.search.switches.lumber;
			$("tma_clay").checked = recovery.datas.search.switches.clay;
			$("tma_iron").checked = recovery.datas.search.switches.iron;
			$("tma_o50cr").checked = recovery.datas.search.switches.o50cr;
			$("tma_o25cr").checked = recovery.datas.search.switches.o25cr;
			$("tma_o25l").checked = recovery.datas.search.switches.o25l;
			$("tma_o25c").checked = recovery.datas.search.switches.o25c;
			$("tma_o25i").checked = recovery.datas.search.switches.o25i;
			var r = recovery.datas.search.r;
			$("tma_r").value = r;
			var mapsize = 7 * (2 * r + 1);
			mapsize = (r < 4) ? "<font color='green'>" + mapsize + "</font>" : (r > 10) ? "<font color='red'>" + mapsize + "</font>" : "<font color='#d71'>" + mapsize + "</font>";
			$("tma_mps1").innerHTML = mapsize;
			$("tma_mps2").innerHTML = mapsize;

			var coords = {x:0, y:0}
			try
			{	var ac = t35 ? xpath('//div[@id="sright"]//tr[@class="sel"]|//div[@id="sright" or @id="side_info"]//td[contains(@class, "hl")]/parent::tr/td[@class="aligned_coords"]', XPFirst).textContent : xpath("//a[@class='active_vl']", XPFirst).parentNode.nextSibling.textContent;
				ac = ac.replace(/[^\d-|]/g, "");
				[coords.x, coords.y] = ac.split("|");
			}
			catch(e){}
			if (window.location.pathname.indexOf("karte.php") > -1)
			{	if ($names("xp").length)
				{	coords.x = $names("xp")[0].value;
					coords.y = $names("yp")[0].value;
				}
				else
				{	coords = zonaxy(window.location.href.match(/d=(\d+)&c=/)[1]);
				}
			}
			$("tma_x").value = coords.x;
			$("tma_y").value = coords.y;

			$("tma_r").addEventListener("keyup", function()
			{	var r = parseInt($("tma_r").value, 10);
				r = (isNaN(r)) ? 0 : (r < 0) ? 0 : (r > 56) ? 56 : r;
				$("tma_r").value = r;
				recovery.datas.search.r = r;
				var mapsize = 7 * (2 * r + 1);
				mapsize = (r < 4) ? "<font color='green'>" + mapsize + "</font>" : (r > 10) ? "<font color='red'>" + mapsize + "</font>" : "<font color='#d71'>" + mapsize + "</font>";
				$("tma_mps1").innerHTML = mapsize;
				$("tma_mps2").innerHTML = mapsize;
			}, true);

			break;
		case 2:
			searching();
			break;
	}
}

// I/O window
function ioWin()
{	var ablak = winObj.open(
	{	buttons:
		{	mini: true,
			close: function()
			{	recovery.datas.saveAndLoad.phase = null;
				recovery.datas.saveAndLoad.data = "";
				recovery.wins.saveAndLoad.state = null;
				recovery.wins.saveAndLoad.x = ablak.x;
				recovery.wins.saveAndLoad.y = ablak.y;
				return true;
			}
		},
		x: recovery.wins.saveAndLoad.x,
		y: recovery.wins.saveAndLoad.y,
		title: (recovery.datas.saveAndLoad.phase != 1) ? LD["SAVE"] : LD["LOAD_BTN"],
		terminate: function(winId)
		{	recovery.wins.saveAndLoad.state = winObj.wins[winId].state;
			recovery.wins.saveAndLoad.x = winObj.wins[winId].x;
			recovery.wins.saveAndLoad.y = winObj.wins[winId].y;
		}
	});
	ablak = winObj.wins[ablak];
	if (recovery.wins.saveAndLoad.state == "minimized")
		ablak.mini();

	function messageBox(text, onClck)
	{	var div = $elem("div", text,
		{	"dir": textDirection
		},
		{	"border": "2px outset gray",
			"backgroundColor": "#977",
			"color": "ivory",
			"minHeight": "25px",
			"width": "350px",
			"MozUserSelect": "none",
			"cursor": (onClck) ? "pointer" : "default"
		});
		if (onClck)
		{	div.addEventListener("mouseover", function() {this.style.backgroundColor='#966';}, false);
			div.addEventListener("mouseout", function() {this.style.backgroundColor='#977'; this.style.borderStyle='outset';}, false);
			div.addEventListener("click", function() {this.style.borderStyle='inset'; onClck();}, false);
		}
		return div;
	}

	switch (recovery.datas.saveAndLoad.phase)
	{	case null:
			recovery.datas.saveAndLoad.phase = 1;
		case 1:	// Betöltés
			if (recovery.datas.saveAndLoad.saved)
			{	// Ha van mentett adat, amit folytatni lehet, akkor hozzáadjuk az értesítő fejlécet. :)
				var div = messageBox("<center style=\"font-weight: bold\">" + LD["SAVED_SEARCH"] + "</center>", function()
				{	if (confirm(LD["SAVED_CONT"]))
					{	recovery.datas.search.centerOfSearch = recovery.datas.saveAndLoad.saved.centerOfSearch;
						recovery.datas.search.r = recovery.datas.saveAndLoad.saved.r;
						recovery.datas.search.switches = eval(recovery.datas.saveAndLoad.saved.switches);
						recovery.datas.search.zpm = recovery.datas.saveAndLoad.saved.zpm;
						recovery.datas.search.amm = recovery.datas.saveAndLoad.saved.amm;
						recovery.datas.search.hits = eval(recovery.datas.saveAndLoad.saved.hits);
						recovery.datas.stat.max_fields = recovery.datas.saveAndLoad.saved.max_fields;
						recovery.datas.stat.fields_done = recovery.datas.saveAndLoad.saved.fields_done;
						recovery.datas.search.phase = 2;
						recovery.datas.saveAndLoad.saved = false;

						recovery.wins.saveAndLoad.state = null;
						recovery.datas.saveAndLoad.phase = null;
						ablak.close();

						searchWin();
					}
				});
				ablak.body.appendChild(div);
			}
			ablak.body.appendChild(messageBox("<center style=\"font-weight: bold\">" + LD["LOAD_TITLE"] + "</center>"));
			var textarea = $elem("textarea", "", {"class":"tma", "rows":15, "dir":"ltr"});

			function valueCheck(text)
			{	recovery.datas.saveAndLoad.data = String(textarea.value);
				if (/--\/\/TMA begin\/\/--\n((.*\n)+)--\/\/TMA end\/\/--/m.test(text))
				{	recovery.datas.saveAndLoad.phase = null;
					recovery.wins.saveAndLoad.state = null;
					recovery.wins.saveAndLoad.x = ablak.x;
					recovery.wins.saveAndLoad.y = ablak.y;
					recovery.datas.saveAndLoad.data = "";
					ablak.close();
					var text = text.substring(text.lastIndexOf('--//TMA begin//--\n') + 18, text.indexOf('--//TMA end//--'));
					post(hostUrl + 'comp.php', 'decomp=' + text, function(html)
					{	var text = xpath("//span[@id='tma_msg']", XPFirst, $elem("div", html)).textContent;
						if (text == "error")
						{	alertWin($elem("center", "<h3>" + LD["ERROR_DATA"] + "</h3>", {}, {"margin":"6px"}));
							return;
						}
						if (recovery.datas.hits.winNumber)
						{	var a = recovery.datas.hits.winNumber;
							winObj.wins[a].buttons.close();
							winObj.wins[a].close();
						}
						dataLoad(text);
						hitsWin();
					});
				}
			}
			textarea.addEventListener("keyup", function() { valueCheck(textarea.value); }, true);
			textarea.addEventListener("mouseout", function() { valueCheck(textarea.value); }, true);
			textarea.value = recovery.datas.saveAndLoad.data;
			break;
		case 2:
			var div = messageBox("<center style=\"font-weight: bold\">" + LD["ERR_IGM_LENGTH"] + "</center>");
			ablak.body.appendChild(div);
		case 3:	// Mentés
			ablak.body.appendChild(messageBox("<center style=\"font-weight: bold\">" + LD["SAVE_TITLE"] + "</center>"));
			var textarea = $elem("textarea", recovery.datas.saveAndLoad.data, {"class":"tma", "rows":15, "dir":"ltr", "readonly":"readonly"});
			ablak.title += " - " + dataSize(recovery.datas.saveAndLoad.data.length);
			break;
	}
	ablak.body.appendChild(textarea);
	if (recovery.datas.saveAndLoad.phase > 1)
		textarea.select();
}

// Setup window
function setupWin()
{	var ablak = winObj.open(
	{	buttons:
		{	mini: true,
			full: true,
			close: function()
			{	recovery.datas.setup.phase = null;
				recovery.wins.setup.state = null;
				recovery.wins.setup.x = ablak.x;
				recovery.wins.setup.y = ablak.y;
				return true;
			}
		},
		x: recovery.wins.setup.x,
		y: recovery.wins.setup.y,
		title: LD["SETUP"],
		terminate: function(winId)
		{	recovery.wins.setup.state = winObj.wins[winId].state;
			recovery.wins.setup.x = winObj.wins[winId].x;
			recovery.wins.setup.y = winObj.wins[winId].y;
		}
	});
	ablak = winObj.wins[ablak];
	if (recovery.wins.setup.state == "minimized")
		ablak.mini();
	if (recovery.wins.setup.state == "fullscreen")
		ablak.full();
	var center = $elem("center", "", {}, {}, $elem("div", "", {"dir":"ltr"}, {}, ablak.body));
	var def = $elem("img", "", {"src":IMG.chip48, "title":LD["DEFAULT_TAB"]}, {"margin":"2px 6px", "cursor":"pointer"}, center);
	var lang = $elem("img", "", {"src":IMG.flags48, "title":LD["LANGUAGE_TAB"]}, {"margin":"2px 6px", "cursor":"pointer"}, center);
	var colors = $elem("img", "", {"src":IMG.palette48, "title":LD["COLORS_TAB"]}, {"margin":"2px 6px", "cursor":"pointer"}, center);

	def.addEventListener("click", function()
	{	recovery.datas.setup.phase = 1;
		$("tma_defaults").style.display = "";
		$("tma_languages").style.display = "none";
		$("tma_colors").style.display = "none";
	}, true);
	lang.addEventListener("click", function()
	{	recovery.datas.setup.phase = 2;
		$("tma_defaults").style.display = "none";
		$("tma_languages").style.display = "";
		$("tma_colors").style.display = "none";
	}, true);
	colors.addEventListener("click", function()
	{	recovery.datas.setup.phase = 3;
		$("tma_defaults").style.display = "none";
		$("tma_languages").style.display = "none";
		$("tma_colors").style.display = "";
	}, true);

	var div = $elem("div", "", {}, {"maxHeight":parseInt(0.85 * innerHeight, 10) + "px", "overflow":"auto"}, ablak.body);

	// Defaults
	var def_div = $elem("div", "", {"id":"tma_defaults"}, {"display":"none"}, div);
	var table = $elem("table", "", {}, {}, def_div);

	var tr = $elem("tr", "", {}, {}, table);
	$elem("td", "<b>" + LD["RADIUS"] + "</b>", {}, {}, tr);
	var td = $elem("td", "", {}, {}, tr);
	var inp = $elem("input", "", {"type":"text", "class":"tma", "size":1, "maxlength":2, "value":GM_getValue("default_radius", 0)}, {"width":"18px"}, td);
	inp.addEventListener("change", function()
	{	var val = parseInt(this.value, 10);
		if (isNaN(val))
			val = 0;
		val = val < 0 ? 0 : val > 56 ? 56 : val;
		this.value = val;
		this.blur();
		GM_setValue("default_radius", val);
	},false);

	tr = $elem("tr", "", {}, {}, table);
	$elem("td", "<b>" + LD["UNITSPEED"] + "</b>", {}, {}, tr);
	td = $elem("td", "", {}, {}, tr);
	inp = $elem("input", "", {"type":"text", "class":"tma", "size":1, "maxlength":2, "value":GM_getValue("unitSpeed_" + server, 5)}, {"width":"18px"}, td);
	inp.addEventListener("change", function()
	{	var val = parseInt(this.value, 10);
		if (isNaN(val))
			val = 5;
		val = val < 4 ? 4 : val > 38 ? 38 : val;
		this.value = val;
		this.blur();
		GM_setValue("unitSpeed_" + server, val);
	},false);

	tr = $elem("tr", "", {}, {}, table);
	$elem("td", "<b>" + LD["HITSPERPAGE"] + "</b>", {}, {}, tr);
	td = $elem("td", "", {}, {}, tr);
	inp = $elem("input", "", {"type":"text", "class":"tma", "size":1, "maxlength":3, "value":GM_getValue("hitsPerPage", 25)}, {"width":"24px"}, td);
	inp.addEventListener("change", function()
	{	var val = parseInt(this.value, 10);
		if (isNaN(val))
			val = 25;
		val = val < 5 ? 5 : val > 100 ? 100 : val;
		this.value = val;
		this.blur();
		GM_setValue("hitsPerPage", val);
	},false);

	tr = $elem("tr", "", {}, {}, table);
	$elem("td", "<b>" + LD["SEARCH_ANIMATION"] + "</b>", {}, {}, tr);
	inp = $elem("input", "", {"type":"checkbox"}, {}, $elem("td", "", {}, {}, tr));
	inp.checked = GM_getValue("search_animation", true);
	inp.addEventListener("change", function()
	{	GM_setValue("search_animation", this.checked);
	}, true);

	tr = $elem("tr", "", {}, {}, table);
	$elem("td", "<b>" + LD["QUICK_MODE"] + "</b>", {"title":LD["ONLY_T35"]}, {}, tr);
	inp = $elem("input", "", {"type":"checkbox"}, {}, $elem("td", "", {}, {}, tr));
	inp.checked = GM_getValue("quickmode", false);
	inp.addEventListener("change", function()
	{	GM_setValue("quickmode", this.checked);
	}, true);

	table = $elem("table", "", {}, {}, def_div);
	tr = $elem("tr", "", {}, {}, table);
	$elem("td", "<b>" + LD["ASHC"] + "</b>", {}, {}, tr);
	inp = $elem("input", "", {"type":"text", "class":"tma", "size":1, "maxlength":2, "value":GM_getValue("ashc", 30)}, {"width":"18px"}, $elem("td", "", {}, {}, tr));
	$elem("td", "s", {}, {}, tr);
	inp.addEventListener("change", function()
	{	var val = parseInt(this.value, 10);
		if (isNaN(val))
			val = 30;
		val = val < 4 ? 4 : val > 99 ? 99 : val;
		this.value = val;
		this.blur();
		GM_setValue("ashc", val);
	}, true);

	table = $elem("table", "", {}, {}, def_div);
	tr = $elem("tr", "", {}, {}, table);
	$elem("td", "<b>" + LD["UPDATE_INTERVAL"] + "</b>", {}, {}, tr);
	inp = $elem("input", "", {"type":"text", "class":"tma", "size":1, "maxlength":3, "value":GM_getValue("updateInterval", 8)}, {"width":"24px"}, $elem("td", "", {}, {}, tr));
	td = $elem("td", "", {}, {}, tr);
	var select = $elem("select", "", {}, {}, td);
	var units = GM_getValue("updateUnit", true);
	$elem("option", LD["HOUR"], (units ? {"selected":"selected", "value":true} : {"value":true}), {}, select);
	$elem("option", LD["DAY"], (units ? {"value":false} : {"selected":"selected", "value":false}), {}, select);
	function chnge()
	{	var val;
		switch (this.nodeName)
		{	case "INPUT":
				val = parseInt(this.value, 10);
				if (isNaN(val))
				{	val = 8;
					GM_setValue("updateUnit", true);
				}
				val = val < 2 ? 1 : val;
				this.value = val;
				this.blur();
				GM_setValue("updateInterval", val);
				break;
			case "SELECT":
				val = this.options[this.selectedIndex].value == "true";
				GM_setValue("updateUnit", val);
				break;
		}
	}
	inp.addEventListener("change", chnge, true);
	select.addEventListener("change", chnge, true);

	var dDf = GM_getValue("defaultDataFormat", true);
	$elem("b", "<u>" + LD["SAVE_FORMAT"] + "</u>", {}, {"margin":"1px 3px"}, def_div);
	table = $elem("table", "", {}, {}, def_div);
	tr = $elem("tr", "", {}, {}, table);
	td = $elem("td", "<input type=\"radio\" name=\"tma_sf\" value=\"true\"" + (dDf ? "checked />" : "/>"), {}, {}, tr);
	$elem("td", LD["NORMAL"], {}, {}, tr);
	$elem("td", "&nbsp;", {}, {}, tr);

	tr = $elem("tr", "", {}, {}, table);
	td = $elem("td", "<input type=\"radio\" name=\"tma_sf\" value=\"false\"" + (dDf ? "/>" : "checked />"), {}, {}, tr);
	$elem("td", LD["DATABASE"], {}, {}, tr);
	var select2 = $elem("select", "", (dDf ? {"disabled":"disabled"} : {}), {}, $elem("td", "", {}, {}, tr));
	var dbf = GM_getValue("databaseFormat", "");
	$elem("option", LD["SIMPLE"], (dbf == "" ? {"selected":"selected", "value":""} : {"value":""}), {}, select2);
	$elem("option", "CSV", (dbf == "csv" ? {"selected":"selected", "value":"csv"} : {"value":"csv"}), {}, select2);
	$elem("option", "SQL", (dbf == "sql" ? {"selected":"selected", "value":"sql"} : {"value":"sql"}), {}, select2);
	
	table.addEventListener("click", function(e)
	{	if (e.target.nodeName !== "INPUT")
			return;
		if (e.target.type !== "radio")
			return;
		var val = e.target.value == "true";
		GM_setValue("defaultDataFormat", val);
		if (val)
			select2.disabled = true;
		else
			select2.disabled = false;
	}, false);
	select2.addEventListener("change", function()
	{	var val = this.options[this.selectedIndex].value;
		GM_setValue("databaseFormat", val);
	}, true);

	// Languages
	var lang_div = $elem("div", "", {"id":"tma_languages"}, {"display":"none", "minWidth":"250px"}, div);
	$elem("b", "<i>" + LD["AVAIL_LANGS"] + "</i><br />", {}, {"margin":"1px 3px"}, lang_div);

	table = $elem("table", "", {"border":0}, {}, lang_div);
	tr = $elem("tr", "", {}, {}, table);
	td = $elem("td", "", {"rowspan":2}, {}, tr);
	var select = $elem("select", "", {"id":"tma_langselection", "class":"tma", "size":6}, {}, td);
	get(hostUrl + 'newlang.php?ver=1.0', function(html)
	{	var temp = xpath("//span[@id='tma_msg']", XPFirst, $elem("div", html)).textContent.split("\n");
		for (var i = 0; i < temp.length; i += 3)
			$elem("option", temp[i+2], {"value":temp[i+1], "cc":temp[i]}, {"backgroundImage":"url('" + imgHost + temp[i] + ".gif')"}, select);
	});
	td = $elem("td", "", {}, {"verticalAlign":"top", "padding":"0px 4px"}, tr);
	$elem("img", "", {"src":imgHost + "anim/" + countryflag + ".gif", "id":"tma_flag"}, {}, td);
	select.addEventListener("change", function()
	{	$("tma_flag").src = imgHost + "anim/" + this.options[this.selectedIndex].getAttribute("cc") + ".gif";
	}, true);

	tr = $elem("tr", "", {}, {}, table);
	td = $elem("td", "", {}, {"verticalAlign":"bottom"}, tr);
	var btn = btnMaker(LD["LOAD_BTN"]);
	td.appendChild(btn);
	btn.addEventListener("click", function()
	{	var lang = $("tma_langselection").options[$("tma_langselection").selectedIndex].value;
		countryflag = $("tma_langselection").options[$("tma_langselection").selectedIndex].getAttribute("cc");
		get(hostUrl + "timestamps.php?lang=" + lang + "&ver=1.0", function(html)
		{	var lang = xpath("//span[@id='tma_msg']", XPFirst, $elem("div", html)).textContent;
			if (lang == "error")	// There isn't such langpack available.... :'(
				return;
			GM_setValue("langpackver", lang);
			GM_setValue("countryflag", countryflag);
			get(hostUrl + "newlang.php?lang=" + lang.split("|")[0] + "&ver=1.0", langLoad);
		});
	}, true);

	// Colors
	var col_div = $elem("div", "", {"id":"tma_colors"}, {"display":"none"}, div);
	var center = $elem("center", "", {}, {}, col_div);
	$elem("p", LD["COLOR_SETUP_TEXT"], {}, {"margin":"2px 3px"}, center);
	table = $elem("table", "", {"class":"hitlist"}, {}, center);
	var styles = GM_getValue("colorStyle", DEF_COLOR_STYLE).split("\n");
	var nums =
	[["15", "gabona"],
	["9", "gabona"],
	["7", "gabona"],
	["6", "gabona"],
	["5", "fa"],
	["5", "agyag"],
	["5", "vas"],
	["50%", "gabona"],
	["25%", "gabona", "fa"],
	["25%", "gabona", "agyag"],
	["25%", "gabona", "vas"],
	["25%", "gabona"],
	["25%", "fa"],
	["25%", "agyag"],
	["25%", "vas"]];
	for (var i = 0; i < 15; i++)
	{	tr = $elem("tr", "", {}, {"backgroundColor":(i & 1 ? "#f6f2cc" : "ivory")}, table);
		td = $elem("td", "", {}, {}, tr);
		if (i == 0)
			var defLink = $elem("div", "<a href='javascript:void(0)'>" + LD["RESET_DEFAULT"] + "</a>", {}, {}, $elem("td", "", {"rowspan":15}, {}, tr));
		div = $elem("div", "", {}, {}, td);
		$elem("b", nums[i][0], {"typ":i}, {"cursor":"pointer", "color":styles[i + 15].match(/#[0-9A-F]{3,6}/)}, div);
		div = $elem("div", "", {}, {}, td);
		$elem("img", "", {"height":9, "src":IMG[nums[i][1]]}, {}, div);
		if (nums[i].length == 3)
			$elem("img", "", {"height":9, "src":IMG[nums[i][2]]}, {}, div);
		div = $elem("div", "", {}, {}, td);
		$elem("span", LD["SAMPLE_TEXT"], {"typ":i}, {"cursor":"pointer", "color":styles[i].match(/#[0-9A-F]{3,6}/), "fontWeight":"bold"}, div);
	}
	defLink.addEventListener("click", function()
	{	GM_setValue("colorStyle", DEF_COLOR_STYLE);
		var defs = DEF_COLOR_STYLE.split("\n");
		var table = this.parentNode.parentNode.parentNode;
		var b = $tags("b", table);
		var span = $tags("span", table);
		for (i = 0; i < 15; i++)
		{	b[i].style.color = defs[15 + i].match(/#[0-9A-F]{3,6}/);
			span[i].style.color = defs[i].match(/#[0-9A-F]{3,6}/);
		}
	}, true);
	table.addEventListener("click", function(e)
	{	var node = e.target;
		var good = true;
		if (!node.hasAttribute("typ"))
			return;
		var styles = GM_getValue("colorStyle", DEF_COLOR_STYLE).split("\n");
		var typ = parseInt(node.getAttribute("typ"), 10);
		var colorcode = String(styles[typ + (node.nodeName == "B" ? 15 : 0)].match(/#[0-9A-F]{3,6}/));
		var ablak = winObj.open(
		{	buttons:
			{	close: true
			},
			x: e.pageX + 30,
			y: e.pageY - 40,
			title: LD["COLORS"] + "&nbsp;" + nums[typ][0] + (typ == 8 || typ == 9 || typ == 10 ? "<img height='10' src='" + IMG[nums[typ][1]] + "'/><img height='10' src='" + IMG[nums[typ][2]] + "'/>" : "<img height='10' src='" + IMG[nums[typ][1]] + "'/>") + (node.nodeName != "B" ? LD["LINK"] : LD["NUMBER"])
		});
		ablak = winObj.wins[ablak];

		$elem("b", LD["NEW_COLOR_CODE"], {}, {"margin":"1px 3px"}, $elem("div", "", {}, {"marginBottom":"10px"}, ablak.body));
		var div = $elem("div", "", {"dir":"ltr"}, {}, ablak.body);
		var center = $elem("center", "", {}, {}, div);
		var inp = $elem("input", "", {"type":"text", "maxlength":6, "size":6, "value":colorcode.substr(1)}, {"color":"grey", "fontWeight":"bolder", "marginBottom":(t35 ? "5px" : "0px")}, center);
		var img = $elem("img", "", {"src":IMG.tick, "height":20, "align":"top"}, {}, center);
		$elem("br", "", {}, {"marginBottom":"5px"}, center);
		var span1 = $elem("span", "<b>" + LD["SAMPLE_TEXT"] + "</b>", {}, {"fontSize":"10px", "padding":"1px 3px", "border":"1px solid #ddec94", "backgroundColor":"ivory", "color":colorcode}, center);
		var span2 = $elem("span", "<b>" + LD["SAMPLE_TEXT"] + "</b>", {}, {"fontSize":"10px", "padding":"1px 3px", "border":"1px solid #ddec94", "backgroundColor":"#f6f2cc", "color":colorcode}, center);
		var btn = btnMaker(LD["OK"]);
		btn.style.marginTop = "5px";
		center.appendChild(btn);

		inp.addEventListener("keyup", function()
		{	var val = this.value;
			val = val.toUpperCase().replace(/[^0-9A-F]/g, "");
			this.value = val;
			if (val.length == 3 || val.length == 6)
			{	span1.style.color = "#" + val;
				span2.style.color = "#" + val;
				img.src = IMG.tick;
				good = true;
			}
			else
			{	img.src = IMG.cross;
				good = false;
			}

		}, true);

		btn.addEventListener("click", function()
		{	if (good)
			{	styles[typ + (node.nodeName == "B" ? 15 : 0)] = styles[typ + (node.nodeName == "B" ? 15 : 0)].replace(/#[0-9A-F]{3,6}/, "#" + inp.value);
				GM_setValue("colorStyle", styles.join("\n"));
				ablak.close();
				node.style.color = "#" + inp.value;
			}
		}, true);

	}, true);

	switch (recovery.datas.setup.phase)
	{	case null:
			recovery.datas.setup.phase = 1;
		case 1:
			$("tma_defaults").style.display = "";
			break;
		case 2:
			$("tma_languages").style.display = "";
			break;
		case 3:
			$("tma_colors").style.display = "";
			break;
	}
}

// Hits window
function hitsWin()
{	if (!recovery.datas.hits.data.length)
	{	alertWin($elem("center", "<h3>" + LD["NOHITS"] + "</h3>", {}, {"margin":"6px"}));
		return;
	}
	function sortby(by)
	{	var tmp = [];
		switch (by)
		{	case "hits":
				var ft;
				for (var i in field)
				{	switch (field[i].type.split("g")[0])
					{	case "f6": ft = "a"; break;
						case "f1": ft = "b"; break;
						case "f7":
						case "f8":
						case "f9": ft = "c"; break;
						case "f3": ft = "d"; break;
						case "f5":
						case "f12": ft = "e"; break;
						case "f4":
						case "f10": ft = "f"; break;
						case "f2":
						case "f11": ft = "g"; break;
						case "o12": ft = "h"; break;
						case "o3": ft = "i"; break;
						case "o6": ft = "j"; break;
						case "o9": ft = "k"; break;
						case "o10":
						case "o11": ft = "l"; break;
						default: ft = field[i].type;
					}
					tmp[i] = [ft, dist[i]];
				}
				break;
			case "players":
				for (var i in field)
					tmp[i] = [field[i].player ? field[i].player.toLowerCase() : "\uFFFF", dist[i]];
				break;
			case "allies":
				for (var i in field)
					tmp[i] = [field[i].ally ? field[i].ally.toLowerCase() : "\uFFFF", dist[i]];
				break;
			case "times":
				tmp = dist;
				break;
		}
		return tmp;
	}
	function sortButtons(event)
	{	var node = event.target;
		while (!node.getAttribute("id"))
		{	node = node.parentNode;
		}
		var btn = node.getAttribute("id");
		if (!btn)
			return;
		switch (btn)
		{	case "hits":
				if (recovery.datas.hits.sortby[0] == "hits")
					recovery.datas.hits.sortby[1] = !recovery.datas.hits.sortby[1];
				else
				{	recovery.datas.hits.sortby[0] = "hits";
					recovery.datas.hits.sortby[1] = false;
				}
				idx = rendez(sortby("hits"), recovery.datas.hits.sortby[1]);
				tables();
				$elem("img", "", {"src":(recovery.datas.hits.sortby[1] ? IMG.arrowDwn : IMG.arrowUp), "align":"top"}, {}, "hits");
				break;
			case "players":
				if (recovery.datas.hits.sortby[0] == "players")
					recovery.datas.hits.sortby[1] = !recovery.datas.hits.sortby[1];
				else
				{	recovery.datas.hits.sortby[0] = "players";
					recovery.datas.hits.sortby[1] = false;
				}
				idx = rendez(sortby("players"), recovery.datas.hits.sortby[1]);
				tables();
				$elem("img", "", {"src":(recovery.datas.hits.sortby[1] ? IMG.arrowDwn : IMG.arrowUp), "align":"top"}, {}, "players");
				break;
			case "allies":
				if (recovery.datas.hits.sortby[0] == "allies")
					recovery.datas.hits.sortby[1] = !recovery.datas.hits.sortby[1];
				else
				{	recovery.datas.hits.sortby[0] = "allies";
					recovery.datas.hits.sortby[1] = false;
				}
				idx = rendez(sortby("allies"), recovery.datas.hits.sortby[1]);
				tables();
				$elem("img", "", {"src":(recovery.datas.hits.sortby[1] ? IMG.arrowDwn : IMG.arrowUp), "align":"top"}, {}, "allies");
				break;
			case "times":
				if (recovery.datas.hits.sortby[0] == "times")
					recovery.datas.hits.sortby[1] = !recovery.datas.hits.sortby[1];
				else
				{	recovery.datas.hits.sortby[0] = "times";
					recovery.datas.hits.sortby[1] = false;
				}
				idx = rendez(sortby("times"), recovery.datas.hits.sortby[1]);
				tables();
				$elem("img", "", {"src":(recovery.datas.hits.sortby[1] ? IMG.arrowDwn : IMG.arrowUp), "align":"top"}, {}, "times");
				break;
		}
	}
	function tables()	// Megjeleníti a táblázatokat.
	{	/** A keresés adatai **/
		cent.innerHTML = "";
		var table = $elem("table", "", {"border": 0}, {}, cent);
		var tr = $elem("tr", "", {}, {}, table);
		$elem("td", "<b>" + LD["SERVER"] + "</b>", {}, {}, tr);
		$elem("td", recovery.datas.hits.sdcr[0], {}, {"color": "darkgoldenRod"}, tr);
		$elem("td", "&nbsp;&nbsp;", {}, {}, tr);
		$elem("td", "<b>" + LD["DATE"] + "</b>", {}, {}, tr);
		$elem("td", recovery.datas.hits.sdcr[1], {}, {"color": "darkgoldenRod"}, tr);

		table = $elem("table", "", {"border": 0}, {}, cent);
		tr = $elem("tr", "", {}, {}, table);
		$elem("td", "<b>" + LD["CENTER"] + "</b>&nbsp;", {}, {}, tr);
		$elem("td", "<b>x:</b>", {}, {}, tr);
		$elem("td", String(center.x), {}, {"color": "darkgoldenRod"}, tr);
		$elem("td", "&nbsp;<b>y:</b>", {}, {}, tr);
		$elem("td", String(center.y), {}, {"color": "darkgoldenRod"}, tr);
		$elem("td", "&nbsp;<b>" + LD["RADIUS"] + "</b>", {}, {}, tr);
		$elem("td", String(recovery.datas.hits.sdcr[3]), {}, {"color": "darkgoldenRod"}, tr);
		tr = $elem("tr", "", {}, {"textAlign":(textDirection == "ltr" ? "left" : "right")}, table);
		var inp = $elem("input", "", {"type":"text", "size":1, "maxlength":2, "class":"tma", "value":String(recovery.datas.hits.unitSpeed || unitSpeed)}, {"fontSize":"11px", "width":"16px"}, $elem("td", "<b>" + LD["UNITSPEED"] + "</b>&nbsp;", {"colspan":6}, {"fontSize":"11px"}, tr));
		inp.addEventListener("change", function()
		{	var val = parseInt(this.value, 10);
			val = val < 4 ? 4 : val > 38 ? 38 : val;
			recovery.datas.hits.unitSpeed = val;
			tables();
		}, false);

		/** Találati lista **/
		table = $elem("table", "", {"class":"hitlist"}, {}, cent);
		/* Fejléc */
		tr = $elem("tr", "", {}, {"backgroundColor":"silver", "cursor":"pointer"}, table);
		$elem("td", "&nbsp;", {"id":"dummy"}, {"border":"0px", "cursor":"default"}, tr);
		var hits = $elem("td", "", {"id":"hits", "title":LD["CLICK_TO_SORT"]}, {"border":"1px solid", "borderColor":"#fff #555 #555 #fff"}, tr);
		$elem("td", LD["PLAYER"], {"id":"players", "title":LD["CLICK_TO_SORT"]}, {"border":"1px solid", "borderColor":"#fff #555 #555 #fff"}, tr);
		$elem("td", LD["ALLIANCE"], {"id":"allies", "title":LD["CLICK_TO_SORT"]}, {"border":"1px solid", "borderColor":"#fff #555 #555 #fff"}, tr);
		$elem("td", LD["TRAV_TIME"], {"id":"times", "title":LD["CLICK_TO_SORT"]}, {"border":"1px solid", "borderColor":"#fff #555 #555 #fff"}, tr);
		tr.addEventListener("click", sortButtons, true);
		$elem("span", LD["HITS"], {}, {"display":"inline-table"}, hits);
		$elem("span", "&nbsp;" + field.length, {}, {"display":"inline-table"}, hits);

		var hpp = GM_getValue("hitsPerPage", 25);
		var actualPage = lap.page();
		var pages = idx.length % hpp ? parseInt(idx.length / hpp, 10) + 1 : idx.length / hpp; // oldalak száma
		var sp = hpp * actualPage;	// Kezdő pont
		var ep = actualPage + 1 == pages ? idx.length : sp + hpp;	// Vég pont
		var href = "href='http://" + recovery.datas.hits.sdcr[0] + "/";

		for (var i = sp; i < ep; i++)
		{	tr = $elem("tr", "", {}, {"backgroundColor":(i & 1 ? "#f6f2cc" : "ivory")}, table);
			$elem("td", i + 1, {}, {"textAlign":"center", "backgroundColor":"silver", "borderColor":"#fff #555 #555 #fff"}, tr);
			var td = $elem("td", "", {}, {}, tr);
			var type = field[idx[i]].type.split("g")[0];
			var bonus = field[idx[i]].type.split("g")[1];
			if (type[0] == "f")
			{	/** 1 **/
				switch (type)
				{	case "f1": $elem("div", "<b class='tma_" + type + "n'>9</b>" , {}, {}, td); break;
					case "f6": $elem("div", "<b class='tma_" + type + "n'>15</b>" , {}, {}, td); break;
					case "f3": $elem("div", "<b class='tma_" + type + "n'>6</b>" , {}, {}, td); break;
					case "f7": $elem("div", "<b class='tma_" + type + "n'>7</b>" , {}, {}, td); break;
					case "f8": $elem("div", "<b class='tma_" + type + "n'>7</b>" , {}, {}, td); break;
					case "f9": $elem("div", "<b class='tma_" + type + "n'>7</b>" , {}, {}, td); break;
					default: $elem("div", "<b class='tma_" + type + "n'>5</b>" , {}, {}, td);
				}
				/** 2 **/
				switch (type)
				{	case "f2":
					case "f11":	$elem("div", "<img height='9' src='" + IMG.vas + "'/>", {}, {}, td); break;
					case "f4":
					case "f10": $elem("div", "<img height='9' src='" + IMG.agyag + "'/>", {}, {}, td); break;
					case "f5":
					case "f12": $elem("div", "<img height='9' src='" + IMG.fa + "'/>", {}, {}, td); break;
					default: $elem("div", "<img height='9' src='" + IMG.gabona + "'/>", {}, {}, td);
				}
				/** 3 **/
				var uri = field[idx[i]].url.split("|");
				$elem("div", "<a class='tma_" + type + "' " + href + "karte.php?d=" + uri[0] + "&c=" + uri[1] + "'>" + field[idx[i]].name + "</a>", {}, {}, td);
				/** 4 **/
				var crds = zonaxy(uri[0]);
				$elem("div", "<a class='tma_" + type + "' " + href + "karte.php?z=" + uri[0] + "'>(" + crds.x + "|" + crds.y + ")</a>", {}, {}, td);
				/** 5 bonus **/
				if (bonus)
					$elem("div", "+" + bonus + "%", {}, {"color":"red"}, td);
			}
			else /** 1 **/
			{	if (type == "o12")
					$elem("div", "<b class='tma_" + type + "n'>50%</b>" , {}, {}, td);
				else
					$elem("div", "<b class='tma_" + type + "n'>25%</b>" , {}, {}, td);
				/** 2 **/
				switch (type)
				{	case "o1":
					case "o2": $elem("div", "<img height='9' src='" + IMG.fa + "'/>", {}, {}, td); break;
					case "o3": $elem("div", "<img height='9' src='" + IMG.gabona + "'/><img height='9' src='" + IMG.fa + "'/>", {}, {}, td); break;
					case "o4":
					case "o5": $elem("div", "<img height='9' src='" + IMG.agyag + "'/>", {}, {}, td); break;
					case "o6": $elem("div", "<img height='9' src='" + IMG.gabona + "'/><img height='9' src='" + IMG.agyag + "'/>", {}, {}, td); break;
					case "o7":
					case "o8": $elem("div", "<img height='9' src='" + IMG.vas + "'/>", {}, {}, td); break;
					case "o9": $elem("div", "<img height='9' src='" + IMG.gabona + "'/><img height='9' src='" + IMG.vas + "'/>", {}, {}, td); break;
					default: $elem("div", "<img height='9' src='" + IMG.gabona + "'/>", {}, {}, td);
				}
				/** 3 **/
				var uri = field[idx[i]].url.split("|");
				$elem("div", "<a class='tma_" + type + "' " + href + "karte.php?d=" + uri[0] + "&c=" + uri[1] + "'>" + field[idx[i]].name + "</a>", {}, {}, td);
				/** 4 **/
				var crds = zonaxy(uri[0]);
				$elem("div", "<a class='tma_" + type + "' " + href + "karte.php?z=" + uri[0] + "'>(" + crds.x + "|" + crds.y + ")</a>", {}, {}, td);
			}
			$elem("td", field[idx[i]].player ? "<a "+ href + "spieler.php?uid=" + field[idx[i]].uid +"'>" + field[idx[i]].player + "</a>" : "&nbsp;", {}, {}, tr);
			$elem("td", field[idx[i]].ally ? "<a "+ href + "allianz.php?aid=" + field[idx[i]].aid +"'>" + field[idx[i]].ally + "</a>" : "&nbsp;", {}, {}, tr);
			$elem("td", utido(dist[idx[i]]), {}, {}, tr);
		}
		/** Lapozók **/
		tr = $elem("tr", "", {}, {}, table);
		var td = $elem("td", "", {"colspan":5}, {"textAlign":"center", "backgroundColor":"silver", "borderColor":"#fff #555 #555 #fff"}, tr);
		td.appendChild(lap.ids());
		$("tma_lapozok").addEventListener("click", function(event)
		{	var node = event.target;
			if (node.nodeName != "A")
				return;
			lap.clicks(node.getAttribute("lapozo"));
			tables();
		}, false);
	}

	var dist = []; // Kiszámoljuk a találatok távolságait a keresés középpontjához képest. dist tömbben vannak az eredmények
	var center = zonaxy(recovery.datas.hits.sdcr[2]);
	for each (var field in recovery.datas.hits.data)
		dist.push(distance(center, zonaxy(field.url.split("|")[0])));
	// idx tömbe gyűjtjük a rendezett távolságok mutatóit
	var idx = recovery.datas.hits.idx || rendez(sortby("times"));
	var lap = lapozo(idx.length);
	if (recovery.datas.hits.pagers)
		lap.load(recovery.datas.hits.pagers);
	field = recovery.datas.hits.data;

	var ablak = winObj.open(
	{	buttons:
		{	mini: true,
			full: true,
			close: function()
			{	recovery.wins.hits.state = null;
				recovery.wins.hits.x = ablak.x;
				recovery.wins.hits.y = ablak.y;
				recovery.datas.hits.data = [];
				recovery.datas.hits.pagers = null;
				recovery.datas.hits.sdcr = [];
				recovery.datas.hits.idx = null;
				recovery.datas.hits.winNumber = false;
				recovery.datas.hits.unitSpeed = false;
				recovery.datas.hits.sortby = ["times", false];
				return true;
			}
		},
		x: recovery.wins.hits.x,
		y: recovery.wins.hits.y,
		title: LD["HITS"],
		terminate: function(winId)
		{	recovery.wins.hits.state = winObj.wins[winId].state;
			recovery.wins.hits.x = winObj.wins[winId].x;
			recovery.wins.hits.y = winObj.wins[winId].y;
			recovery.datas.hits.pagers = lap.save();
			recovery.datas.hits.idx = idx;
		}
	});
	recovery.datas.hits.winNumber = ablak;
	ablak = winObj.wins[ablak];
	if (recovery.wins.hits.state == "minimized")
		ablak.mini();
	if (recovery.wins.hits.state == "fullscreen")
		ablak.full();
	ablak.body.style.maxHeight = parseInt(0.96 * innerHeight, 10) + "px";

	var div = $elem("div", "", {"dir":textDirection}, {"maxHeight":parseInt(0.85 * innerHeight, 10) + "px", "overflow":"auto", "minWidth":"550px"}, ablak.body);
	var cent = $elem("center", "" , {}, {"whiteSpace":"nowrap"}, div);
	// Megrajzoljuk a nyitóképet
	tables();

	// A gombok :)
	div = $elem("div", "", {"dir":"ltr"}, {"textAlign":"center"}, ablak.body);
	var floppy = $elem("img", "", {"src": IMG.floppy48, "title": LD["SAVE"]}, {"margin": "0px 5px", "cursor": "pointer"}, div);
	var letter = $elem("img", "", {"src": IMG.letter48, "title": LD["IGM"]}, {"margin": "0px 5px", "cursor": "pointer"}, div);
	var bonus = $elem("img", "", {"src": IMG.buza48, "title": LD["CROP_BONUS"]}, {"margin": "0px 5px", "cursor": "pointer"}, div);
	floppy.addEventListener("click", function()
	{	if (GM_getValue("defaultDataFormat", true))
			post(hostUrl + "comp.php", "comp=" + dataSave("normal"), function(html)
			{	var text = xpath("//span[@id='tma_msg']", XPFirst, $elem("div", html)).textContent;
				recovery.datas.saveAndLoad.phase = 3;
				recovery.datas.saveAndLoad.data = text;
				ioWin();
			});
		else
		{	var dBForm = GM_getValue("databaseFormat", "");
			if (!dBForm)
			{	recovery.datas.saveAndLoad.phase = 3;
				recovery.datas.saveAndLoad.data = dataSave("simple");
				ioWin();
			}
			else
				if (dBForm == "csv")
					dataSave("csv");
			else
				if (dBForm == "sql")
			{	recovery.datas.saveAndLoad.phase = 3;
				recovery.datas.saveAndLoad.data = dataSave("sql");
				ioWin();
			}
		}
	}, false);
	letter.addEventListener("click", function()
	{	post(hostUrl + 'comp.php', 'comp=' + dataSave("normal"), function(html)
		{	var text = xpath("//span[@id='tma_msg']", XPFirst, $elem("div", html)).textContent;
			if (text.length > 8540)
			{	recovery.datas.saveAndLoad.phase = 2;
				recovery.datas.saveAndLoad.data = text;
				ioWin();
				return;
			}
			recovery.datas.igm = text;
			window.location.href = "http://" + server + "/nachrichten.php?t=1";
		});
	}, false);
	bonus.addEventListener("click", function()
	{	if (recovery.datas.hits.in_search || recovery.datas.hits.bonus)
			return;
		var field = recovery.datas.hits.data;
		recovery.datas.hits.zones = [];
		for (var i in field)
			if (field[i].type == "f1" || field[i].type == "f6" || field[i].type == "f7" || field[i].type == "f8" || field[i].type == "f9")
				recovery.datas.hits.zones.push([field[i].url.split("|")[0], i]);
		recovery.datas.hits.zpm = recovery.datas.hits.zones.length -1;
		if (recovery.datas.hits.zpm < 0)
			return;
		bonusSearchWin();
		var wait = setInterval(function()
		{	if (recovery.datas.hits.bonus)
			{	clearInterval(wait);
				tables();
			}
		}, 1000);
	}, false);
}

function bonusSearchWin()
{	function bonusScan(html)
	{	if (!recovery.datas.hits.in_search)
			return;
		if (html.indexOf("map_content") == -1)
		{	alert(LD["NOT_LOGGED_IN"] + "\n\n" + recovery.datas.hits.sdcr[0]);
			recovery.wins.bonusSearch.state = null;
			recovery.datas.hits.zones = [];
			recovery.datas.hits.in_search = false;
			ablak.close();
			return;
		}
		var g25 = g50 = b = 0;
		if (!t35)
			var oases = xpath("//div[@id='map_content']//img[contains(@src, 'un/m/o')]/@src", XPList, $elem("div", html));
		else
			var oases = xpath("//div[@id='map_content']/div[contains(@class, 'o')]/@class", XPList, $elem("div", html));
		for (var i = 0; i < oases.snapshotLength; i++)
		{	var on = Number(oases.snapshotItem(i).value.match(/\d+/));
			if (on == 3 || on == 6 || (on > 8 && on < 12))
				g25++;
			if (on == 12)
				g50++;
		}
		if (g25+g50)
		{	for (i = 1; i <= 3; i++)
			{	if (g50)
				{	b += 50;
					g50--;
					continue;
				}
				if (g25)
					{	b += 25;
						g25--;
						continue;
					}
				else
					break;
			}
			recovery.datas.hits.data[recovery.datas.hits.zones[recovery.datas.hits.zpm][1]].type += "g" + b;
		}

		percent = 100 - recovery.datas.hits.zpm/(recovery.datas.hits.zones.length/100)
		fj.style.width = percent + "%";
		fj.innerHTML = parseInt(percent, 10) + "%";
		if (--recovery.datas.hits.zpm > -1)
			get(zUri + recovery.datas.hits.zones[recovery.datas.hits.zpm][0], bonusScan);
		else
		{	// ha megvolt a keresés
			recovery.wins.bonusSearch.state = null;
			recovery.datas.hits.zones = [];
			recovery.datas.hits.bonus = true;
			recovery.datas.hits.in_search = false;
			ablak.close();
		}
	}
	var ablak = winObj.open(
	{	title: LD["CROP_BONUS"],
		x: recovery.wins.bonusSearch.x,
		y: recovery.wins.bonusSearch.y,
		terminate: function(winId)
		{	recovery.wins.bonusSearch.state = winObj.wins[winId].state;
			recovery.wins.bonusSearch.x = winObj.wins[winId].x;
			recovery.wins.bonusSearch.y = winObj.wins[winId].y;
		}
	});
	ablak = winObj.wins[ablak];
	var fj = $elem("div", "&nbsp;", {}, {"backgroundImage":"url(" + IMG.fjFG + ")", "height":"15px", "width":"0%", "backgroundRepeat":"repeat-x", "whiteSpace":"nowrap", "color":"#cbf5f2", "overflow":"hidden", "textAlign":"center", "fontWeight":"bold"}, $elem("div", "", {"dir":"ltr"}, {"backgroundImage":"url(" + IMG.fjBG + ")", "backgroundRepeat":"repeat-x", "minWidth":"160px", "border":"1px inset black"}, ablak.body));
	var percent = 0;
	recovery.datas.hits.in_search = true;
	var zUri = "http://" + recovery.datas.hits.sdcr[0] + "/karte.php?z=";
	get(zUri + recovery.datas.hits.zones[recovery.datas.hits.zpm][0], bonusScan);
}

function distWin()
{	var ablak = winObj.open(
	{	title: LD.DIST_CALC,
		x: recovery.wins.dist.x,
		y: recovery.wins.dist.y,
		buttons:
		{	mini: true,
			close: function()
			{	recovery.wins.dist.state = null;
				recovery.wins.dist.x = ablak.x;
				recovery.wins.dist.y = ablak.y;
				recovery.datas.dist.phase = null;
				recovery.datas.dist.unitSpeed = unitSpeed;
				recovery.datas.dist.koords = [0, 0, 0, 0];
				return true;
			}
		},
		terminate: function(winId)
		{	recovery.wins.dist.state = winObj.wins[winId].state;
			recovery.wins.dist.x = winObj.wins[winId].x;
			recovery.wins.dist.y = winObj.wins[winId].y;
		}
	});
	ablak = winObj.wins[ablak];
	recovery.datas.dist.phase = 1;
	if (recovery.wins.dist.state == "minimized")
		ablak.mini();

	function draw()
	{	ablak.body.innerHTML = "";
		var r = recovery.datas.dist;
		var div = $elem("div", "", {}, {}, ablak.body);
		var table = $elem("table", "", {}, {}, div);
		var tr = $elem("tr", "", {}, {}, table);
		$elem("td", LD.UNITSPEED, {}, {}, tr);
		var us = $elem("input", "", {"type":"text", "class":"tma", "size":1, "maxlength":2, "value":r.unitSpeed}, {"width":"18px"}, $elem("td", "", {}, {}, tr));
		us.addEventListener("change", function()
		{	var val = parseInt(this.value, 10);
			if (isNaN(val))
				val = 5;
			val = val < 4 ? 4 : val > 38 ? 38 : val;
			this.value = val;
			this.blur();
			r.unitSpeed = val;
			draw();
		},false);

		function koordCheck()
		{	if (this.value.substring(this.value.length-1) == "-")
			{	this.value = "-";
				return;
			}
			var val = parseInt(this.value, 10);
			val = isNaN(val) ? 0 : val > 400 ? 400 : val < -400 ? -400 : val;
			this.value = val;
			r.koords[parseInt(this.getAttribute("k"), 10)] = val;
			var d = distance({x:r.koords[0], y:r.koords[1]}, {x:r.koords[2], y:r.koords[3]});
			td_Dist.innerHTML = (d-parseInt(d, 10) ? d.toFixed(3) : d);
			td_Time.innerHTML = timeToString((d/r.unitSpeed) * 1000 * 3600);
		}

		table = $elem("table", "", {}, {}, div);
		tr = $elem("tr", "", {}, {}, table);
		$elem("td", LD.FROM, {}, {}, tr);
		$elem("td", "x:", {}, {}, tr);
		var x1 = $elem("input", "", {"k":0, "size":2, "maxlength":4, "value":r.koords[0]}, {}, tr);
		$elem("td", "y:", {}, {}, tr);
		var y1 = $elem("input", "", {"k":1, "size":2, "maxlength":4, "value":r.koords[1]}, {}, tr);
		tr = $elem("tr", "", {}, {}, table);
		$elem("td", LD.TO, {}, {}, tr);
		$elem("td", "x:", {}, {}, tr);
		var x2 = $elem("input", "", {"k":2, "size":2, "maxlength":4, "value":r.koords[2]}, {}, tr);
		$elem("td", "y:", {}, {}, tr);
		var y2 = $elem("input", "", {"k":3, "size":2, "maxlength":4, "value":r.koords[3]}, {}, tr);

		x1.addEventListener("keyup", koordCheck, false);
		y1.addEventListener("keyup", koordCheck, false);
		x2.addEventListener("keyup", koordCheck, false);
		y2.addEventListener("keyup", koordCheck, false);

		table = $elem("table", "", {}, {}, div);
		tr = $elem("tr", "", {}, {}, table);
		$elem("td", LD.DIST, {}, {}, tr);
		var d = distance({x:r.koords[0], y:r.koords[1]}, {x:r.koords[2], y:r.koords[3]});
		var td_Dist = $elem("td", String((d-parseInt(d, 10) ? d.toFixed(3) : d)), {}, {"color":"green"}, tr);
		tr = $elem("tr", "", {}, {}, table);
		$elem("td", LD.TRAV_TIME, {}, {}, tr);
		var td_Time = $elem("td", timeToString((d/r.unitSpeed) * 1000 * 3600), {}, {"color":"royalBlue"}, tr);
	}
	var coords1 = {x:0, y:0};
	var coords2 = {x:0, y:0};
	try
	{	var ac = t35 ? xpath('//div[@id="sright"]//tr[@class="sel"]|//div[@id="sright" or @id="side_info"]//td[contains(@class, "hl")]/parent::tr/td[@class="aligned_coords"]', XPFirst).textContent : xpath("//a[@class='active_vl']", XPFirst).parentNode.nextSibling.textContent;
	    ac = ac.replace(/[^\d-|]/g, "");
		[coords1.x, coords1.y] = ac.split("|");
	}
	catch(e){}
	if (window.location.pathname.indexOf("karte.php") > -1)
	{	if ($names("xp").length)
		{	coords2.x = $names("xp")[0].value;
			coords2.y = $names("yp")[0].value;
		}
		else
		{	coords2 = zonaxy(window.location.href.match(/d=(\d+)&c=/)[1]);
		}
	}
	recovery.datas.dist.koords[0] = coords1.x;
	recovery.datas.dist.koords[1] = coords1.y;
	recovery.datas.dist.koords[2] = coords2.x;
	recovery.datas.dist.koords[3] = coords2.y;
	draw();
}

function checkUpdate()
{	var d = new Date().getTime();
	var lastUpdate = parseInt(GM_getValue('lastUpdate', 0), 10);
	if (d - lastUpdate >= 1000 * 60 * 60 * (GM_getValue("updateUnit", true) ? 1 : 24) * GM_getValue("updateInterval", 8))
	{	recovery.datas.update.phase = null;
		get("http://userscripts.org/scripts/review/28846.txt", update);
		GM_setValue('lastUpdate', String(d));
		langpackUpdateCheck();
	}
}
function update(html)
{	switch (recovery.datas.update.phase)
	{	case null:
			var newver = html.match(/@version\s+(.*)\n/)[1];
			var html = html.split("\n");
			var news = html.filter(/\/\/\s+@news/);
			var bugfix = html.filter(/\/\/\s+@bugfix/);
			for (var i in news)
				news[i] = news[i].replace(/\/\/\s+@news\s+/, "");
			for (var i in bugfix)
				bugfix[i] = bugfix[i].replace(/\/\/\s+@bugfix\s+/, "");
			recovery.datas.update.newver = newver;
			recovery.datas.update.news = news;
			recovery.datas.update.bugfix = bugfix;
			recovery.datas.update.phase = 1;
			break;
		case 1:
			var newver = recovery.datas.update.newver;
			var news = recovery.datas.update.news;
			var bugfix = recovery.datas.update.bugfix;
			break;
	}
	var v1 = headers["version"].split("."),
		v2 = newver.split("."), v = 0, i;
	for (i = 0; i < Math.max(v1.length, v2.length); i++){
		v1[i] = v1[i] === undefined ? 0 : v1[i];
		v2[i] = v2[i] === undefined ? 0 : v2[i];
		if (v1[i] !== v2[i]){
			v = v2[i] - v1[i];
			break;
		}
	}
	if (v <= 0) return;
	var ablak = winObj.open(
	{	buttons:
		{	close: function()
			{	recovery.wins.update.state = null;
				recovery.wins.update.x = ablak.x;
				recovery.wins.update.y = ablak.y;
				recovery.datas.update.phase = null;
				recovery.datas.update.news = [];
				recovery.datas.update.bugfix = [];
				return true;
			}
		},
		x: recovery.wins.update.x,
		y: recovery.wins.update.y,
		terminate: function(id)
		{	recovery.wins.update.state = winObj.wins[id].state;
			recovery.wins.update.x = winObj.wins[id].x;
			recovery.wins.update.y = winObj.wins[id].y;
		}
	});
	ablak = winObj.wins[ablak];
	ablak.body.style.maxWidth = "480px";
	$elem("img", "", {"src":IMG.flower48, "align":"top"}, {}, ablak.body);
	$elem("center", "<b>" + LD["NEWVER"] + "&nbsp;&nbsp;(" + newver + ")</b>", {}, {"position":"relative", "top":"-34px", "color":"#e73", "fontSize":"1.1em"}, ablak.body);
	var div = $elem("div", "", {"dir":"ltr"}, {}, ablak.body);
	var flag = true;
	for (var i in news)
	{	if (news[i][0] == "!")
		{	$elem("b", "<u>" + news[i].substr(1) + "</u>", {}, {"margin":"0px 5px", "color":"darkGoldenRod"}, div);
			flag = true;
			continue;
		}
		if (flag)
		{	var ul = $elem("ul", "", {}, {"color":"darkGoldenRod"}, div);
			flag = false;
		}
		$elem("li", news[i], {}, {}, ul);
	}
	flag = true;
	for (var i in bugfix)
	{	if (bugfix[i][0] == "!")
		{	$elem("b", "<u>" + bugfix[i].substr(1) + "</u>", {}, {"margin":"0px 5px", "color":"darkRed"}, div);
			flag = true;
			continue;
		}
		if (flag)
		{	var ul = $elem("ul", "", {}, {}, div);
			flag = false;
		}
		$elem("li", bugfix[i], {}, {"color":"darkRed"}, ul);
	}

	div = $elem("div", "", {}, {}, ablak.body);
	var yes = btnMaker(LD["YES"]);
	var no = btnMaker(LD["NO"]);
	var table = $elem("table", "", {"align":"center", "border":0}, {}, div);
	var tr = $elem("tr", "", {}, {}, table);
	$elem("td", LD["UPDATENOW"], {}, {"fontWeight":"bold", "color":"#353"}, tr);
	var td = $elem("td", "", {}, {}, tr);
	td.appendChild(yes);
	td = $elem("td", "", {}, {}, tr);
	td.appendChild(no);
	no.addEventListener("click", function()
	{	ablak.buttons.close();
		ablak.close();
	}, true);
	yes.addEventListener("click", function()
	{	ablak.close();
		window.removeEventListener("unload", ps, false);
		window.location.href = "http://userscripts.org/scripts/source/28846.user.js";
	}, true);
}

// Kernel
function ps()
{	recovery.datas.search.in_search = false;
	recovery.datas.hits.in_search = false;
	var wins = winObj.wins.length, i;
	if (wins)
	{	for (i = 0; i < wins; i++)
			if (winObj.wins[i])
				winObj.wins[i].terminate(i);
		for (i in recovery){
			recovery[i] = recovery[i];
		}
		setObj("recovery_" + server, recovery);
	}
}

window.addEventListener("unload", ps, false);

function reset()
{	GM_deleteValue("recovery_" + server);
	window.removeEventListener("unload", ps, false);
	window.location.reload();
}
GM_registerMenuCommand("TMA: Reset", reset);

mainWin();
if (recovery.datas.saveAndLoad.phase !== null)
	ioWin();
if (recovery.datas.setup.phase !== null)
	setupWin();
if (recovery.datas.dist.phase !== null)
	distWin();
if (recovery.datas.search.phase !== null)
	searchWin();
if (recovery.wins.hits.state !== null)
	hitsWin();
if (recovery.wins.bonusSearch.state !== null)
	bonusSearchWin();
if (recovery.datas.update.phase !== null)
	update();

checkUpdate();