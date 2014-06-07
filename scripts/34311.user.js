// DGWeb Persian (Jalali) English user script
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
// select "DGWeb.Persian.EN", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          DGWeb.Persian.EN
// @namespace     http://dgweb.rezaie.info
// @description   English language pack for the Persian (Jalali) DGWeb extension
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


unsafeWindow.DGWeb.namespace("Lang.Jalali");

unsafeWindow.DGWeb.Lang.Jalali.NAME = "Persian";

// full month names
unsafeWindow.DGWeb.Lang.Jalali._MN = new Array
("Farvardin",
 "Ordibehesht",
 "Khordad",
 "Tir",
 "Mordad",
 "Shahrivar",
 "Mehr",
 "Aban",
 "Azar",
 "Dey",
 "Bahman",
 "Esfand");

unsafeWindow.DGWeb.Lang.Jalali.MM_FORMAT = "%M1 – %M2";
unsafeWindow.DGWeb.Lang.Jalali.YY_FORMAT = "%Y1 – %Y2";
unsafeWindow.DGWeb.Lang.Jalali.DM_FORMAT = "%D %M";
unsafeWindow.DGWeb.Lang.Jalali.DMY_FORMAT = "%D %M %Y";
unsafeWindow.DGWeb.Lang.Jalali.MMY_FORMAT = "%M1 – %M2 %Y";
unsafeWindow.DGWeb.Lang.Jalali.MMYY_FORMAT = "%M1 %Y1 – %M2 %Y2";

unsafeWindow.DGWeb.Lang.Jalali.LocaleNumber = function(num) {
	return num;
}

