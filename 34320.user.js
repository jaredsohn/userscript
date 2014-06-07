// DGWeb Bahai English user script
// version 1.0.0.0
// 2008−09−20
// Copyright (c) 2008, Shamim Rezaie
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "DGWeb.Bahai.EN", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          DGWeb.Bahai.EN
// @namespace     http://dgweb.rezaie.info
// @description   English language pack for the Bahai DGWeb extension
// @include       *
// ==/UserScript==

if (typeof unsafeWindow.DGWeb == "undefined") {
	unsafeWindow.DGWeb = {};
}

if (typeof unsafeWindow.DGWeb.namespace == "undefined") {
	unsafeWindow.DGWeb.namespace = function(a) {
		var o=null, i, d;

		    d=a.split(".");
		    o=unsafeWindow.DGWeb;

		    for (i=0; i<d.length; i=i+1) {
		        o[d[i]]=o[d[i]] || {};
		        o=o[d[i]];
		    }
		return o;
	};
}

unsafeWindow.DGWeb.namespace("Lang.Bahai");

unsafeWindow.DGWeb.Lang.Bahai.NAME = "Bahai";

// full month names
unsafeWindow.DGWeb.Lang.Bahai._MN = new Array
("Bahá",
 "Jalál",
 "Jamál",
 "‘Aẓamat",
 "Núr",
 "Raḥmat",
 "Kalimát",
 "Kamál",
 "Asmá’",
 "‘Izzat",
 "Mashíyyat",
 "‘Ilm",
 "Qudrat",
 "Qawl",
 "Masá’il",
 "Sharaf",
 "Sulṭán",
 "Mulk",
 "Ayyám-i-Há",
 "‘Alá’");

unsafeWindow.DGWeb.Lang.Bahai.MM_FORMAT = "%M1 – %M2";
unsafeWindow.DGWeb.Lang.Bahai.MMM_FORMAT = "%M1 – %M2 – %M3";
unsafeWindow.DGWeb.Lang.Bahai.YY_FORMAT = "%Y1 – %Y2";
unsafeWindow.DGWeb.Lang.Bahai.DM_FORMAT = "%D %M";
unsafeWindow.DGWeb.Lang.Bahai.DMY_FORMAT = "%D %M %Y";
unsafeWindow.DGWeb.Lang.Bahai.MMY_FORMAT = "%M1 – %M2 %Y";
unsafeWindow.DGWeb.Lang.Bahai.MMYY_FORMAT = "%M1 %Y1 – %M2 %Y2";
unsafeWindow.DGWeb.Lang.Bahai.MMMY_FORMAT = "%M1 – %M2 – %M3 %Y";
unsafeWindow.DGWeb.Lang.Bahai.MMMYY_FORMAT = "(%Y1) %M1 – %M2 – %M3 (%Y2)";

unsafeWindow.DGWeb.Lang.Bahai.LocaleNumber = function(num) {
	return num;
}
