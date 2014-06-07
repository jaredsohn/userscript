// DGWeb Hebrew user script
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
// select "DGWeb.Hebrew", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          DGWeb.Hebrew
// @namespace     http://dgweb.rezaie.info
// @description   Hebrew calendar system extension for DGWeb
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

unsafeWindow.DGWeb.RegisterConvertor("Hebrew", function(gDate, formatStr){
	if (gDate == null) {
		return null;
	}

	var GREGORIAN_EPOCH = 1721425.5;
	var HEBREW_EPOCH = 347995.5;

	/*  MOD  --  Modulus function which works for non-integers.  */
	function mod(a, b)
	{
	    return a - (b * Math.floor(a / b));
	}

	function leap_gregorian(year)
	{
	    //return ((year % 4) == 0) &&
	    //        (!(((year % 100) == 0) && ((year % 400) != 0)));
		return ((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
	}

	function hebrew_leap(year)
	{
	    return mod(((year * 7) + 1), 19) < 7;
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

	function hebrew_year_months(year)
	{
	    return hebrew_leap(year) ? 13 : 12;
	}

	//  Test for delay of start of new year and to avoid
	//  Sunday, Wednesday, and Friday as start of the new year.
	function hebrew_delay_1(year)
	{
	    var months, days, parts;

	    months = Math.floor(((235 * year) - 234) / 19);
	    parts = 12084 + (13753 * months);
	    day = (months * 29) + Math.floor(parts / 25920);

	    if (mod((3 * (day + 1)), 7) < 3) {
	        day++;
	    }
	    return day;
	}

	//  Check for delay in start of new year due to length of adjacent years
	function hebrew_delay_2(year)
	{
	    var last, present, next;

	    last = hebrew_delay_1(year - 1);
	    present = hebrew_delay_1(year);
	    next = hebrew_delay_1(year + 1);

	    return ((next - present) == 356) ? 2 :
	                                     (((present - last) == 382) ? 1 : 0);
	}


	//  How many days are in a Hebrew year ?
	function hebrew_year_days(year)
	{
	    return hebrew_to_jd(year + 1, 7, 1) - hebrew_to_jd(year, 7, 1);
	}

	function hebrew_month_days(year, month)
	{
	    //  First of all, dispose of fixed-length 29 day months

	    if (month == 2 || month == 4 || month == 6 ||
	        month == 10 || month == 13) {
	        return 29;
	    }

	    //  If it's not a leap year, Adar has 29 days

	    if (month == 12 && !hebrew_leap(year)) {
	        return 29;
	    }

	    //  If it's Heshvan, days depend on length of year

	    if (month == 8 && !(mod(hebrew_year_days(year), 10) == 5)) {
	        return 29;
	    }

	    //  Similarly, Kislev varies with the length of year

	    if (month == 9 && (mod(hebrew_year_days(year), 10) == 3)) {
	        return 29;
	    }

	    //  Nope, it's a 30 day month

	    return 30;
	}

	function hebrew_to_jd(year, month, day)
	{
	    var jd, mon, months;

	    months = hebrew_year_months(year);
	    jd = HEBREW_EPOCH + hebrew_delay_1(year) +
	         hebrew_delay_2(year) + day + 1;

	    if (month < 7) {
	        for (mon = 7; mon <= months; mon++) {
	            jd += hebrew_month_days(year, mon);
	        }
	        for (mon = 1; mon < month; mon++) {
	            jd += hebrew_month_days(year, mon);
	        }
	    } else {
	        for (mon = 7; mon < month; mon++) {
	            jd += hebrew_month_days(year, mon);
	        }
	    }

	    return jd;
	}


	function jd_to_hebrew(jd)
	{
	    var year, month, day, i, count, first;

	    jd = Math.floor(jd) + 0.5;
	    count = Math.floor(((jd - HEBREW_EPOCH) * 98496.0) / 35975351.0);
	    year = count - 1;
	    for (i = count; jd >= hebrew_to_jd(i, 7, 1); i++) {
	        year++;
	    }
	    first = (jd < hebrew_to_jd(year, 1, 1)) ? 7 : 1;
	    month = first;
	    for (i = first; jd > hebrew_to_jd(year, i, hebrew_month_days(year, i)); i++) {
	        month++;
	    }
	    day = (jd - hebrew_to_jd(year, month, 1)) + 1;
	    return new Array(year, month, day);
	}


	function gregorian_to_julian(year, month, day) {
		var jd = gregorian_to_jd(year, month, day);
		return jd_to_hebrew(jd);
	}


	var hDateString = '';

	if (formatStr.search(/[md]/i) == -1) {			// only year component

		gDate.setDate(1);
		gDate.setMonth(0);
		var hDate1 = gregorian_to_julian(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		gDate.setFullYear(gDate.getFullYear() + 1);
		gDate.setDate(-1);
		var hDate2 = gregorian_to_julian(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		hDateString = unsafeWindow.DGWeb.Lang.Hebrew.YY_FORMAT.replace("%Y1", unsafeWindow.DGWeb.Lang.Hebrew.LocaleNumber(hDate1[0])).replace("%Y2", unsafeWindow.DGWeb.Lang.Hebrew.LocaleNumber(hDate2[0]));

	} else if (formatStr.search(/[yd]/i) == -1) {	// only month component

		gDate.setFullYear((new Date()).getFullYear());
		gDate.setDate(1);
		var hDate1 = gregorian_to_julian(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		gDate.setMonth(gDate.getMonth() + 1);
		gDate.setDate(-1);
		var hDate2 = gregorian_to_julian(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		hDateString = unsafeWindow.DGWeb.Lang.Hebrew.MM_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Hebrew._MN[hDate1[1] - 1]).replace("%M2", unsafeWindow.DGWeb.Lang.Hebrew._MN[hDate2[1] - 1]);

	} else if (formatStr.search(/d/i) == -1) {		// only month and year components

		gDate.setDate(1);
		var hDate1 = gregorian_to_julian(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		gDate.setMonth(gDate.getMonth() + 1);
		gDate.setDate(-1);
		var hDate2 = gregorian_to_julian(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		if (hDate1[0] == hDate2[0]) {
			hDateString = unsafeWindow.DGWeb.Lang.Hebrew.MMY_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Hebrew._MN[hDate1[1] - 1])
										.replace("%M2", unsafeWindow.DGWeb.Lang.Hebrew._MN[hDate2[1] - 1])
										.replace("%Y", unsafeWindow.DGWeb.Lang.Hebrew.LocaleNumber(hDate1[0]));
		} else {
			hDateString = unsafeWindow.DGWeb.Lang.Hebrew.MMYY_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Hebrew._MN[hDate1[1] - 1])
										.replace("%M2", unsafeWindow.DGWeb.Lang.Hebrew._MN[hDate2[1] - 1])
										.replace("%Y1", unsafeWindow.DGWeb.Lang.Hebrew.LocaleNumber(hDate1[0]))
										.replace("%Y2", unsafeWindow.DGWeb.Lang.Hebrew.LocaleNumber(hDate2[0]));
		}

	} else if (formatStr.search(/y/i) == -1) {		// only month and day components

		gDate.setFullYear((new Date()).getFullYear());
		var hDate = gregorian_to_julian(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		hDateString = unsafeWindow.DGWeb.Lang.Hebrew.DM_FORMAT.replace("%D", unsafeWindow.DGWeb.Lang.Hebrew.LocaleNumber(hDate[2])).replace("%M", unsafeWindow.DGWeb.Lang.Hebrew._MN[hDate[1] - 1]);

	} else  { // all components are available

		var hDate = gregorian_to_julian(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		//hDateString = hDate[2] + ' ' + DGWeb.Lang.Hebrew._MN[hDate[1]-1] + ' ' + hDate[0];
		hDateString = unsafeWindow.DGWeb.Lang.Hebrew.DMY_FORMAT.replace("%D", unsafeWindow.DGWeb.Lang.Hebrew.LocaleNumber(hDate[2])).replace("%M", unsafeWindow.DGWeb.Lang.Hebrew._MN[hDate[1] - 1]).replace("%Y", unsafeWindow.DGWeb.Lang.Hebrew.LocaleNumber(hDate[0]));
	}

	return hDateString;
});
