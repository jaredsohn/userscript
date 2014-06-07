// DGWeb Core Arabic user script
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
// select "DGWeb.Core.AR", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          DGWeb.Core.AR
// @namespace     http://dgweb.rezaie.info
// @description   Arabic language pack for DGWeb Core package
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

unsafeWindow.DGWeb.namespace("Lang");

unsafeWindow.DGWeb.Lang.DIRECTION = "rtl";
unsafeWindow.DGWeb.Lang.NAME = "العربية";
unsafeWindow.DGWeb.Lang.INVALID_DATE = "تاريخ غير صحيحة";
/// please do not change/remove the link below
/// Let it spread and others find the opportunity of using it as well as you
unsafeWindow.DGWeb.Lang.POWERED = "Powered by <a href=\"http://dgweb.rezaie.info\" target=\"_blank\">DGWeb</a>";
