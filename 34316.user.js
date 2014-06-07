// DGWeb Hijri user script
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
// select "DGWeb.Hijri", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          DGWeb.Hijri
// @namespace     http://dgweb.rezaie.info
// @description   Hijri (Islamic) calendar system extension for DGWeb
// @include       *
// ==/UserScript==


if (typeof unsafeWindow.DGWeb == "undefined") {
	unsafeWindow.DGWeb = {};
}

if (typeof unsafeWindow.DGWeb.RegisterConvertor == "undefined") {
	unsafeWindow.DGWeb.convertFunctions = unsafeWindow.DGWeb.convertFunctions || {};
	unsafeWindow.DGWeb.RegisterConvertor = function(name, func) {
		if (unsafeWindow.DGWeb.convertFunctions[name] == null) {
			unsafeWindow.DGWeb.convertFunctions[name] = func;
		}
	}
}

unsafeWindow.DGWeb.RegisterConvertor("Hijri", function(gDate, formatStr){

	if (gDate == null) {
		return null;
	}

	var ISLAMIC_EPOCH = 1948439.5;
	var GREGORIAN_EPOCH = 1721425.5;

	function leap_gregorian(year)
	{
	    return ((year % 4) == 0) &&
	            (!(((year % 100) == 0) && ((year % 400) != 0)));
	}
	function gregorian_to_jd(year, month, day){
		return (GREGORIAN_EPOCH - 1) +
		(365 * (year - 1)) +
		Math.floor((year - 1) / 4) +
		(-Math.floor((year - 1) / 100)) +
		Math.floor((year - 1) / 400) +
		Math.floor((((367 * month) - 362) / 12) +
		((month <= 2) ? 0 : (leap_gregorian(year) ? -1 : -2)) +
		day);
	}
	function leap_islamic(year)
	{
	    return (((year * 11) + 14) % 30) < 11;
	}
	function islamic_to_jd(year, month, day)
	{
	    return (day +
	            Math.ceil(29.5 * (month - 1)) +
	            (year - 1) * 354 +
	            Math.floor((3 + (11 * year)) / 30) +
	            ISLAMIC_EPOCH) - 1;
	}
	function jd_to_islamic(jd)
	{
	    var year, month, day;
	
	    jd = Math.floor(jd) + 0.5;
	    year = Math.floor(((30 * (jd - ISLAMIC_EPOCH)) + 10646) / 10631);
	    month = Math.min(12,
	                Math.ceil((jd - (29 + islamic_to_jd(year, 1, 1))) / 29.5) + 1);
	    day = (jd - islamic_to_jd(year, month, 1)) + 1;
	    return new Array(year, month, day);
	}
	
	function gregorian_to_hijri(year, month, day) {
		var jd = gregorian_to_jd(year, month, day);
		return jd_to_islamic(jd);
	}


	var hDateString = '';

	if (formatStr.search(/[md]/i) == -1) {			// only year component

		gDate.setDate(1);
		gDate.setMonth(0);
		var hDate1 = gregorian_to_hijri(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		gDate.setFullYear(gDate.getFullYear() + 1);
		gDate.setDate(-1);
		var hDate2 = gregorian_to_hijri(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		hDateString = unsafeWindow.DGWeb.Lang.Hijri.YY_FORMAT.replace("%Y1", unsafeWindow.DGWeb.Lang.Hijri.LocaleNumber(hDate1[0])).replace("%Y2", unsafeWindow.DGWeb.Lang.Hijri.LocaleNumber(hDate2[0]));

	} else if (formatStr.search(/[yd]/i) == -1) {	// only month component

		gDate.setFullYear((new Date()).getFullYear());
		gDate.setDate(1);
		var hDate1 = gregorian_to_hijri(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		gDate.setMonth(gDate.getMonth() + 1);
		gDate.setDate(-1);
		var hDate2 = gregorian_to_hijri(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		hDateString = unsafeWindow.DGWeb.Lang.Hijri.MM_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Hijri._MN[hDate1[1] - 1]).replace("%M2", unsafeWindow.DGWeb.Lang.Hijri._MN[hDate2[1] - 1]);

	} else if (formatStr.search(/d/i) == -1) {		// only month and year components

		gDate.setDate(1);
		var hDate1 = gregorian_to_hijri(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		gDate.setMonth(gDate.getMonth() + 1);
		gDate.setDate(-1);
		var hDate2 = gregorian_to_hijri(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		if (hDate1[0] == hDate2[0]) {
			hDateString = unsafeWindow.DGWeb.Lang.Hijri.MMY_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Hijri._MN[hDate1[1] - 1])
										.replace("%M2", unsafeWindow.DGWeb.Lang.Hijri._MN[hDate2[1] - 1])
										.replace("%Y", unsafeWindow.DGWeb.Lang.Hijri.LocaleNumber(hDate1[0]));
		} else {
			hDateString = unsafeWindow.DGWeb.Lang.Hijri.MMYY_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Hijri._MN[hDate1[1] - 1])
										.replace("%M2", unsafeWindow.DGWeb.Lang.Hijri._MN[hDate2[1] - 1])
										.replace("%Y1", unsafeWindow.DGWeb.Lang.Hijri.LocaleNumber(hDate1[0]))
										.replace("%Y2", unsafeWindow.DGWeb.Lang.Hijri.LocaleNumber(hDate2[0]));
		}

	} else if (formatStr.search(/y/i) == -1) {		// only month and day components

		gDate.setFullYear((new Date()).getFullYear());
		var hDate = gregorian_to_hijri(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		hDateString = unsafeWindow.DGWeb.Lang.Hijri.DM_FORMAT.replace("%D", unsafeWindow.DGWeb.Lang.Hijri.LocaleNumber(hDate[2])).replace("%M", unsafeWindow.DGWeb.Lang.Hijri._MN[hDate[1] - 1]);

	} else  { // all components are available

		var hDate = gregorian_to_hijri(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		hDateString = unsafeWindow.DGWeb.Lang.Hijri.DMY_FORMAT.replace("%D", unsafeWindow.DGWeb.Lang.Hijri.LocaleNumber(hDate[2])).replace("%M", unsafeWindow.DGWeb.Lang.Hijri._MN[hDate[1] - 1]).replace("%Y", unsafeWindow.DGWeb.Lang.Hijri.LocaleNumber(hDate[0]));
	}

	return hDateString;
});

