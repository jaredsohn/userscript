// DGWeb Hebrew Hebrew user script
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
// select "DGWeb.Hebrew.HE", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          DGWeb.Hebrew.HE
// @namespace     http://dgweb.rezaie.info
// @description   Hebrew language pack for the Hebrew DGWeb extension
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

unsafeWindow.DGWeb.Lang.Hebrew.NAME = "עברית";

// full month names
unsafeWindow.DGWeb.Lang.Hebrew._MN = new Array
("ניסן",
 "אייר",
 "סיוון",
 "תמוז",
 "מנחם-אב",
 "אלול",
 "תשרי",
 "חשוון",
 "כסלו",
 "טבת",
 "שבט",
 "אדר",
 "אדר א'");

unsafeWindow.DGWeb.Lang.Hebrew.MM_FORMAT = "<span dir='rtl'>%M1 – %M2</span>";
unsafeWindow.DGWeb.Lang.Hebrew.YY_FORMAT = "<span dir='ltr'>%Y1 – %Y2</span>";
unsafeWindow.DGWeb.Lang.Hebrew.DM_FORMAT = "<span dir='rtl'>%D %M</span>";
unsafeWindow.DGWeb.Lang.Hebrew.DMY_FORMAT = "<span dir='rtl'>%D %M <span dir='ltr'>%Y</span></span>";
unsafeWindow.DGWeb.Lang.Hebrew.MMY_FORMAT = "<span dir='rtl'>%M1 – %M2 %Y</span>";
unsafeWindow.DGWeb.Lang.Hebrew.MMYY_FORMAT = "<span dir='rtl'>%M1 <span dir='ltr'>%Y1</span> – %M2 <span dir='ltr'>%Y2</span></span>";

unsafeWindow.DGWeb.Lang.Hebrew.LocaleNumber = function(num) {
	return num;
}

