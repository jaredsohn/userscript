// DGWeb Bahai user script
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
// select "DGWeb.Bahai", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          DGWeb.Bahai
// @namespace     http://dgweb.rezaie.info
// @description   Bahai calendar system extension for DGWeb
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

unsafeWindow.DGWeb.RegisterConvertor("Bahai", function(gDate, formatStr){
	if (gDate == null) {
		return null;
	}

	var GREGORIAN_EPOCH = 1721425.5;
	var BAHAI_EPOCH = 2394646.5;

	function mod(a, b)
	{
	    return a - (b * Math.floor(a / b));
	}
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
	function jd_to_gregorian(jd) {
	    var wjd, depoch, quadricent, dqc, cent, dcent, quad, dquad,
	        yindex, dyindex, year, yearday, leapadj;
	
	    wjd = Math.floor(jd - 0.5) + 0.5;
	    depoch = wjd - GREGORIAN_EPOCH;
	    quadricent = Math.floor(depoch / 146097);
	    dqc = mod(depoch, 146097);
	    cent = Math.floor(dqc / 36524);
	    dcent = mod(dqc, 36524);
	    quad = Math.floor(dcent / 1461);
	    dquad = mod(dcent, 1461);
	    yindex = Math.floor(dquad / 365);
	    year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
	    if (!((cent == 4) || (yindex == 4))) {
	        year++;
	    }
	    yearday = wjd - gregorian_to_jd(year, 1, 1);
	    leapadj = ((wjd < gregorian_to_jd(year, 3, 1)) ? 0
	                                                  :
	                  (leap_gregorian(year) ? 1 : 2)
	              );
	    month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
	    day = (wjd - gregorian_to_jd(year, month, 1)) + 1;
	
	    return new Array(year, month, day);
	}

	function bahai_to_jd(major, cycle, year, month, day)
	{
	    var gy;
	
	    gy = (361 * (major - 1)) + (19 * (cycle - 1)) + (year - 1) +
	         jd_to_gregorian(BAHAI_EPOCH)[0];
	    return gregorian_to_jd(gy, 3, 20) + (19 * (month - 1)) +
	           ((month != 20) ? 0 : (leap_gregorian(gy + 1) ? -14 : -15))  +
	           day;
	}
	function jd_to_bahai(jd)
	{
	    var major, cycle, year, month, day,
	        gy, bstarty, bys, days, bld, byear;
	
	    jd = Math.floor(jd) + 0.5;
	    gy = jd_to_gregorian(jd)[0];
	    bstarty = jd_to_gregorian(BAHAI_EPOCH)[0];
	    bys = gy - (bstarty + (((gregorian_to_jd(gy, 1, 1) <= jd) && (jd <= gregorian_to_jd(gy, 3, 20))) ? 1 : 0));
	    major = Math.floor(bys / 361) + 1;
	    cycle = Math.floor(mod(bys, 361) / 19) + 1;
	    year = mod(bys, 19) + 1;
	    days = jd - bahai_to_jd(major, cycle, year, 1, 1);
	    bld = bahai_to_jd(major, cycle, year, 20, 1);
	    month = (jd >= bld) ? 20 : (Math.floor(days / 19) + 1);
	    day = (jd + 1) - bahai_to_jd(major, cycle, year, month, 1);
	
	    //return new Array(major, cycle, year, month, day);
		/// actual bahai year is equal to (major-1)*361 + (cycle-1)*19 + year
		byear = (major-1)*361 + (cycle-1)*19 + year;
		return new Array(byear, month, day);
	}





	
	function gregorian_to_bahai(year, month, day) {
		var jd = gregorian_to_jd(year, month, day);
		return jd_to_bahai(jd);
	}


	var bDateString = '';
	var dif = 0;	// may be used in some branches

	if (formatStr.search(/[md]/i) == -1) {			// only year component

		gDate.setDate(1);
		gDate.setMonth(0);
		var bDate1 = gregorian_to_bahai(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		gDate.setFullYear(gDate.getFullYear() + 1);
		gDate.setDate(-1);
		var bDate2 = gregorian_to_bahai(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		bDateString = unsafeWindow.DGWeb.Lang.Bahai.YY_FORMAT.replace("%Y1", unsafeWindow.DGWeb.Lang.Bahai.LocaleNumber(bDate1[0])).replace("%Y2", unsafeWindow.DGWeb.Lang.Bahai.LocaleNumber(bDate2[0]));

	} else if (formatStr.search(/[yd]/i) == -1) {	// only month component

		gDate.setFullYear((new Date()).getFullYear());
		gDate.setDate(1);
		var bDate1 = gregorian_to_bahai(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());

		gDate.setMonth(gDate.getMonth() + 1);
		gDate.setDate(-1);
		var bDate2 = gregorian_to_bahai(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());

		dif = bDate2[1] - bDate1[1];
		if (dif == 1 || dif == -11) {
			bDateString = unsafeWindow.DGWeb.Lang.Bahai.MM_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate1[1] - 1]).replace("%M2", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate2[1] - 1]);
		}
		else {
			bDateString = unsafeWindow.DGWeb.Lang.Bahai.MMM_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate1[1] - 1])
										.replace("%M2", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate1[1]%20])
										.replace("%M3", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate2[1] - 1]);
		}

	} else if (formatStr.search(/d/i) == -1) {		// only month and year components

		gDate.setDate(1);
		var bDate1 = gregorian_to_bahai(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		gDate.setMonth(gDate.getMonth() + 1);
		gDate.setDate(-1);
		var bDate2 = gregorian_to_bahai(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		if (bDate1[0] == bDate2[0]) {	// in the same year
			dif = bDate2[1] - bDate1[1];
			if (dif == 1) {
				bDateString = unsafeWindow.DGWeb.Lang.Bahai.MMY_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate1[1] - 1])
											.replace("%M2", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate2[1] - 1])
											.replace("%Y", unsafeWindow.DGWeb.Lang.Bahai.LocaleNumber(bDate1[0]));
			}
			else {
				bDateString = unsafeWindow.DGWeb.Lang.Bahai.MMMY_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate1[1] - 1])
											.replace("%M2", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate1[1]%20])
											.replace("%M3", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate2[1] - 1])
											.replace("%Y", unsafeWindow.DGWeb.Lang.Bahai.LocaleNumber(bDate1[0]));
			}
		} else {	// in two sequential years
			dif = bDate2[1] - bDate1[1];
			if (dif == 1 || dif == -11) {
				bDateString = unsafeWindow.DGWeb.Lang.Bahai.MMYY_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate1[1] - 1])
											.replace("%M2", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate2[1] - 1])
											.replace("%Y1", unsafeWindow.DGWeb.Lang.Bahai.LocaleNumber(bDate1[0]))
											.replace("%Y2", unsafeWindow.DGWeb.Lang.Bahai.LocaleNumber(bDate2[0]));;
			}
			else {
				bDateString = unsafeWindow.DGWeb.Lang.Bahai.MMMYY_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate1[1] - 1])
											.replace("%M2", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate1[1]%20])
											.replace("%M3", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate2[1] - 1])
											.replace("%Y1", unsafeWindow.DGWeb.Lang.Bahai.LocaleNumber(bDate1[0]))
											.replace("%Y2", unsafeWindow.DGWeb.Lang.Bahai.LocaleNumber(bDate2[0]));
			}
		}

	} else if (formatStr.search(/y/i) == -1) {		// only month and day components

		gDate.setFullYear((new Date()).getFullYear());
		var bDate = gregorian_to_bahai(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());

		bDateString = unsafeWindow.DGWeb.Lang.Bahai.DM_FORMAT.replace("%D", unsafeWindow.DGWeb.Lang.Bahai.LocaleNumber(bDate[2])).replace("%M", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate[1] - 1]);

	} else  { // all components are available

		var bDate = gregorian_to_bahai(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		bDateString = unsafeWindow.DGWeb.Lang.Bahai.DMY_FORMAT.replace("%D", unsafeWindow.DGWeb.Lang.Bahai.LocaleNumber(bDate[2])).replace("%M", unsafeWindow.DGWeb.Lang.Bahai._MN[bDate[1] - 1]).replace("%Y", unsafeWindow.DGWeb.Lang.Bahai.LocaleNumber(bDate[0]));
	}

	return bDateString;
});
