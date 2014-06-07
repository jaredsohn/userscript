// DGWeb Persian (Jalali) user script
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
// select "DGWeb.Persian", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          DGWeb.Persian
// @namespace     http://dgweb.rezaie.info
// @description   Persian (Jalali) calendar system extension for DGWeb
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

unsafeWindow.DGWeb.RegisterConvertor("Jalali", function(gDate, formatStr){

	if (gDate == null) {
		return null;
	}

	var g_days_in_month = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var j_days_in_month = new Array(31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29);
	
	function divide(a,b) {
	  return Math.floor(a/b);
	}
	
	function remainder(a,b) {
	  return a - divide(a,b)*b;
	}
	
	function gregorian_to_jalali(year, month, day) {
	   var gy, gm, gd;
	   var jy, jm, jd;
	   var g_day_no, j_day_no;
	   var j_np;
	
	   var i;
	
	   gy = year-1600;
	   gm = month-1;
	   gd = day-1;
	
	   g_day_no = 365*gy+divide((gy+3),4)-divide((gy+99),100)+divide((gy+399),400);
	   for (i=0;i<gm;++i)
	      g_day_no += g_days_in_month[i];
	   if (gm>1 && ((gy%4==0 && gy%100!=0) || (gy%400==0)))
	      /* leap and after Feb */
	      ++g_day_no;
	   g_day_no += gd;
	
	   j_day_no = g_day_no-79;
	
	   j_np = divide(j_day_no, 12053);
	   j_day_no = remainder (j_day_no, 12053);
	
	   jy = 979+33*j_np+4*divide(j_day_no,1461);
	   j_day_no = remainder (j_day_no, 1461);
	
	   if (j_day_no >= 366) {
	      jy += divide((j_day_no-1),365);
	      j_day_no = remainder ((j_day_no-1), 365);
	   }
	
	   for (i = 0; i < 11 && j_day_no >= j_days_in_month[i]; ++i) {
	      j_day_no -= j_days_in_month[i];
	   }
	   jm = i+1;
	   jd = j_day_no+1;
	
	   return new Array(jy, jm, jd);
	}


	var jDateString = '';

	if (formatStr.search(/[md]/i) == -1) {			// only year component

		gDate.setDate(1);
		gDate.setMonth(0);
		var jDate1 = gregorian_to_jalali(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		gDate.setFullYear(gDate.getFullYear() + 1);
		gDate.setDate(-1);
		var jDate2 = gregorian_to_jalali(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		jDateString = unsafeWindow.DGWeb.Lang.Jalali.YY_FORMAT.replace("%Y1", unsafeWindow.DGWeb.Lang.Jalali.LocaleNumber(jDate1[0])).replace("%Y2", unsafeWindow.DGWeb.Lang.Jalali.LocaleNumber(jDate2[0]));

	} else if (formatStr.search(/[yd]/i) == -1) {	// only month component

		gDate.setFullYear((new Date()).getFullYear());
		gDate.setDate(1);
		var jDate1 = gregorian_to_jalali(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		gDate.setMonth(gDate.getMonth() + 1);
		gDate.setDate(-1);
		var jDate2 = gregorian_to_jalali(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		jDateString = unsafeWindow.DGWeb.Lang.Jalali.MM_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Jalali._MN[jDate1[1] - 1]).replace("%M2", unsafeWindow.DGWeb.Lang.Jalali._MN[jDate2[1] - 1]);

	} else if (formatStr.search(/d/i) == -1) {		// only month and year components

		gDate.setDate(1);
		var jDate1 = gregorian_to_jalali(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		gDate.setMonth(gDate.getMonth() + 1);
		gDate.setDate(-1);
		var jDate2 = gregorian_to_jalali(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		if (jDate1[0] == jDate2[0]) {
			jDateString = unsafeWindow.DGWeb.Lang.Jalali.MMY_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Jalali._MN[jDate1[1] - 1])
										.replace("%M2", unsafeWindow.DGWeb.Lang.Jalali._MN[jDate2[1] - 1])
										.replace("%Y", unsafeWindow.DGWeb.Lang.Jalali.LocaleNumber(jDate1[0]));
		} else {
			jDateString = unsafeWindow.DGWeb.Lang.Jalali.MMYY_FORMAT.replace("%M1", unsafeWindow.DGWeb.Lang.Jalali._MN[jDate1[1] - 1])
										.replace("%M2", unsafeWindow.DGWeb.Lang.Jalali._MN[jDate2[1] - 1])
										.replace("%Y1", unsafeWindow.DGWeb.Lang.Jalali.LocaleNumber(jDate1[0]))
										.replace("%Y2", unsafeWindow.DGWeb.Lang.Jalali.LocaleNumber(jDate2[0]));
		}

	} else if (formatStr.search(/y/i) == -1) {		// only month and day components

		gDate.setFullYear((new Date()).getFullYear());
		var jDate = gregorian_to_jalali(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		
		jDateString = unsafeWindow.DGWeb.Lang.Jalali.DM_FORMAT.replace("%D", unsafeWindow.DGWeb.Lang.Jalali.LocaleNumber(jDate[2])).replace("%M", unsafeWindow.DGWeb.Lang.Jalali._MN[jDate[1] - 1]);

	} else  { // all components are available

		var jDate = gregorian_to_jalali(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
		//jDateString = jDate[2] + ' ' + DGWeb.Lang.Jalali._MN[jDate[1]-1] + ' ' + jDate[0];
		jDateString = unsafeWindow.DGWeb.Lang.Jalali.DMY_FORMAT.replace("%D", unsafeWindow.DGWeb.Lang.Jalali.LocaleNumber(jDate[2])).replace("%M", unsafeWindow.DGWeb.Lang.Jalali._MN[jDate[1] - 1]).replace("%Y", unsafeWindow.DGWeb.Lang.Jalali.LocaleNumber(jDate[0]));
	}

	return jDateString;
});

