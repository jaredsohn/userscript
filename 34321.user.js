// DGWeb Bahai Persian (Farsi) user script
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
// select "DGWeb.Bahai.FA", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          DGWeb.Bahai.FA
// @namespace     http://dgweb.rezaie.info
// @description   Persian (Farsi) language pack for the Bahai DGWeb extension
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

unsafeWindow.DGWeb.Lang.Bahai.NAME = "بدیع";

// full month names
unsafeWindow.DGWeb.Lang.Bahai._MN = new Array
("شهرالبهاء",
 "شهرالجلال",
 "شهرالجمال",
 "شهرالعظمة",
 "شهرالنور",
 "شهرالرحمة",
 "شهرالکلمات",
 "شهرالکمال",
 "شهرالأسماء",
 "شهرالعزة",
 "شهرالمشیة",
 "شهرالعلم",
 "شهرالقدرة",
 "شهرالقول",
 "شهرالمسائل",
 "شهرالشرف",
 "شهرالسلطان",
 "شهرالملک",
 "ایام هاء",
 "شهرالعلاء");

unsafeWindow.DGWeb.Lang.Bahai.MM_FORMAT = "<span dir='rtl'>%M1 – %M2</span>";
unsafeWindow.DGWeb.Lang.Bahai.MMM_FORMAT = "<span dir='rtl'>%M1 – %M2 – %M3</span>";
unsafeWindow.DGWeb.Lang.Bahai.YY_FORMAT = "<span dir='ltr'>%Y1 – %Y2</span>";
unsafeWindow.DGWeb.Lang.Bahai.DM_FORMAT = "<span dir='rtl'>%D %M</span>";
unsafeWindow.DGWeb.Lang.Bahai.DMY_FORMAT = "<span dir='rtl'>%D %M <span dir='ltr'>%Y</span></span>";
unsafeWindow.DGWeb.Lang.Bahai.MMY_FORMAT = "<span dir='rtl'>%M1 – %M2 %Y</span>";
unsafeWindow.DGWeb.Lang.Bahai.MMYY_FORMAT = "<span dir='rtl'>%M1 <span dir='ltr'>%Y1</span> – %M2 <span dir='ltr'>%Y2</span></span>";
unsafeWindow.DGWeb.Lang.Bahai.MMMY_FORMAT = "<span dir='rtl'>%M1 – %M2 – %M3 <span dir='ltr'>%Y</span></span>";
unsafeWindow.DGWeb.Lang.Bahai.MMMYY_FORMAT = "<span dir='rtl'>(<span dir='ltr'>%Y1</span>) %M1 – %M2 – %M3 (<span dir='ltr'>%Y2</span>)</span>";

unsafeWindow.DGWeb.Lang.Bahai.LocaleNumber = function(num) {
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

