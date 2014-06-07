// DGWeb Persian (Jalali) Persian (Farsi) user script
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
// select "DGWeb.Persian.FA", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          DGWeb.Persian.FA
// @namespace     http://dgweb.rezaie.info
// @description   Persian (Farsi) language pack for the Persian (Jalali) DGWeb extension
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

unsafeWindow.DGWeb.Lang.Jalali.NAME = "هجری شمسی";

// full month names
unsafeWindow.DGWeb.Lang.Jalali._MN = new Array
("فروردین",
 "اردیبهشت",
 "خرداد",
 "تیر",
 "مرداد",
 "شهریور",
 "مهر",
 "آبان",
 "آذر",
 "دی",
 "بهمن",
 "اسفند");

unsafeWindow.DGWeb.Lang.Jalali.MM_FORMAT = "<span dir='rtl'>%M1 – %M2</span>";
unsafeWindow.DGWeb.Lang.Jalali.YY_FORMAT = "<span dir='ltr'>%Y1 – %Y2</span>";
unsafeWindow.DGWeb.Lang.Jalali.DM_FORMAT = "<span dir='rtl'>%D %M</span>";
unsafeWindow.DGWeb.Lang.Jalali.DMY_FORMAT = "<span dir='rtl'>%D %M <span dir='ltr'>%Y</span></span>";
unsafeWindow.DGWeb.Lang.Jalali.MMY_FORMAT = "<span dir='rtl'>%M1 – %M2 %Y</span>";
unsafeWindow.DGWeb.Lang.Jalali.MMYY_FORMAT = "<span dir='rtl'>%M1 <span dir='ltr'>%Y1</span> – %M2 <span dir='ltr'>%Y2</span></span>";

unsafeWindow.DGWeb.Lang.Jalali.LocaleNumber = function(num) {
	var localeDigit = new Array("۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹");
	var result = "";
	
	if (num < 0) {
		num = -num;
		result = "-"
	}
	
	num += ""; // cast to String

	for(i=0; i<num.length; i++) {
		result = result.concat(localeDigit[num.charAt(i)]);
	}
	
	return result;
}

