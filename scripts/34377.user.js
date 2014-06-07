// DGWeb Hebrew Persian (Farsi) user script
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
// select "DGWeb.Hebrew.FA", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          DGWeb.Hebrew.FA
// @namespace     http://dgweb.rezaie.info
// @description   Persian (Farsi) language pack for the Hebrew DGWeb extension
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

unsafeWindow.DGWeb.namespace("Lang.Hebrew");

unsafeWindow.DGWeb.Lang.Hebrew.NAME = "عبری";

// full month names
unsafeWindow.DGWeb.Lang.Hebrew._MN = new Array
("نیسان",
 "ایار",
 "سیوان",
 "تموز",
 "آوْ",
 "الول",
 "تیشری",
 "حشوان",
 "کیسلوْ",
 "طوت",
 "شواط",
 "آدار ریشون",
 "آدار شنی");

unsafeWindow.DGWeb.Lang.Hebrew.MM_FORMAT = "<span dir='rtl'>%M1 – %M2</span>";
unsafeWindow.DGWeb.Lang.Hebrew.YY_FORMAT = "<span dir='ltr'>%Y1 – %Y2</span>";
unsafeWindow.DGWeb.Lang.Hebrew.DM_FORMAT = "<span dir='rtl'>%D %M</span>";
unsafeWindow.DGWeb.Lang.Hebrew.DMY_FORMAT = "<span dir='rtl'>%D %M <span dir='ltr'>%Y</span></span>";
unsafeWindow.DGWeb.Lang.Hebrew.MMY_FORMAT = "<span dir='rtl'>%M1 – %M2 %Y</span>";
unsafeWindow.DGWeb.Lang.Hebrew.MMYY_FORMAT = "<span dir='rtl'>%M1 <span dir='ltr'>%Y1</span> – %M2 <span dir='ltr'>%Y2</span></span>";

unsafeWindow.DGWeb.Lang.Hebrew.LocaleNumber = function(num) {
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

