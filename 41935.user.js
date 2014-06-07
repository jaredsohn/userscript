// ==UserScript==
// @name		Jalali GCal
// @namespace		http://code.behnam.es/jalali-gcal/
// @description		Adds Jalali calendar to Google Calendar web interface
// @include		http://*.google.com/calendar/render*
// @include		https://*.google.com/calendar/render*
// @include		http://*.google.com/calendar/*/render*
// @include		https://*.google.com/calendar/*/render*
// @version		4.3
// @grant		none
// ==/UserScript==

/*
 * Project page: http://code.behnam.es/jalali-gcal/
 */


///////////////////////////////////////////////////////////////////////////////
// JalaliGCal Object //////////////////////////////////////////////////////////

/*
 * GNU LGPL 2.1
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You can receive a copy of GNU Lesser General Public License at the
 * World Wide Web address <http://www.gnu.org/licenses/lgpl.html>.
 */

/*
 * Copyright (C) 2006-2010,2012-2013  Behnam Esfahbod "ZWNJ" <behnam@zwnj.org>
 * Copyright (C) 2008  Mehdi Ahmadizadeh <mehdia@buffalo.edu>
 */


"use strict";

var JalaliGCal = function () {
    var _log_info = function () {
	    try {
		//console.info.apply(this, arguments);
	    } catch (err) {}
	},
	_log_error = function () {
	    try {
		//console.error.apply(this, arguments);
	    } catch (err) {}
	},
	nodelist_filter = function (nodelist, func) {
	    return Array.prototype.filter.call(Array.prototype.slice.call(nodelist), func);
	};

    this.EDITION	= 'Persian';
    this.VERSION	= '4.3';

    // Preferences
    if (this.EDITION === 'Persian') {
	this.usePersianDigits	= true;
	this.usePersianNames	= true;
    }
    else {
	this.usePersianDigits	= false;
	this.usePersianNames	= false;
    }

    this.useMonthNameInFirstDay	= true;

    if (true) { // Used to be (this.usePersianDigits)
	this.tagOpen		= (' <span style="' +
				      'background: #666; ' +
				      'border-radius: 6px; ' +
				      'color: #fff; ' +
				      'direction: rtl; ' +
				      'font-family: Roya, Nazli, Nazanin, B Nazanin, Zar, B Zar, Droid Arabic Naskh, DejaVu Sans, Tahoma, sans; ' +
				      'font-weight: bold; ' +
				      'line-height: 80%; ' +
				      'margin: 0 3px; ' +
				      'padding: 0 3px;' +
				      'unicode-bidi: embed; ' +
				  '"> ');
	this.tagClose		= '</span>';
    }
    else {
	this.tagOpen		= ' &mdash; <i>';
	this.tagClose		= '</i>';
    }

    this.dash		= ' &ndash; ';


    this.loopTimeout	= 200;


    // Init values
    this.jc = new JalaliCalendar();
    this.gIntervalStart	= [];
    this.gIntervalEnd	= [];
    this.gIntervalFixed	= null;

    // Persian number support
    this.printPerisanDigit		= function (i)	{ return ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][i]; };
    this.printPersianNumber		= function (n)	{ var s1 = String(n), s2 = '', i; for (i = 0; i < s1.length; i++) { s2 += this.printPerisanDigit(Number(s1.charAt(i))); } return s2; };
    this.pN	= this.printNumber	= function (n)	{ if (this.usePersianDigits) { return this.printPersianNumber(n); } else { return String(n); } };

    // Jalali string outputs
    this.jalaliMonthNameEnglishFull	= ["Farvardin","Ordibehesht","Khordad", "Tir","Mordad","Shahrivar", "Mehr","Aban","Azar", "Dey","Bahman","Esfand"];
    //this.jalaliMonthNameEnglishAbbr	= ["Far","Ord","Kho", "Tir","Mor","Sha", "Meh","Aba","Aza", "Dey","Bah","Esf"];
    this.jalaliMonthNameEnglishAbbr	= this.jalaliMonthNameEnglishFull;

    this.jalaliMonthNamePersianFull	= ["فروردین","اردی‌بهشت","خرداد", "تیر","مرداد","شهریور", "مهر","آبان","آذر", "دی","بهمن","اسفند"];
    //this.jalaliMonthNamePersianAbbr	= ["فرو.","ارد.","خرد.", "تیر.","مرد.","شهر.", "مهر.","آبا.","آذر.", "دی","بهم.","اسف."];
    this.jalaliMonthNamePersianAbbr	= this.jalaliMonthNamePersianFull;

    this.pJMNF	= this.printJalaliMonthNameFull	= function (i)	{ if (this.usePersianNames) { return this.jalaliMonthNamePersianFull[i-1]; } else { return this.jalaliMonthNameEnglishFull[i-1]; } };
    this.pJMNA	= this.printJalaliMonthNameAbbr	= function (i)	{ if (this.usePersianNames) { return this.jalaliMonthNamePersianAbbr[i-1]; } else { return this.jalaliMonthNameEnglishAbbr[i-1]; } };

    // Day
    this.printJalaliDay				= function (j1)		{ return this.pN(j1[2])	; };
    this.printJalaliDayOrMonth			= function (j1)		{ if (j1[2] !== 1)
									    return this.pN(j1[2])	;
									  else
									    return this.pN(j1[2]) +	' ' +	this.pJMNA(j1[1])	;
									};

    // Day & Month
    this.printJalaliMonumDay			= function (j1)		{ return this.pN(j1[1]) +	'/' +	this.pN(j1[2])	; };

    this.printJalaliMonthDay			= function (j1)		{ if (this.usePersianNames)
									    return this.pN(j1[2]) +	' ' +	this.pJMNA(j1[1])	;
									  else
									    return this.pJMNA(j1[1]) +	' ' +	this.pN(j1[2])	;
									};

    // Month & Year
    this.printJalaliMonthYear			= function (j1)		{ return this.pJMNF(j1[1]) +	' ' +	this.pN(j1[0])	; };

    this.printJalaliMonthDayYear		= function (j1)		{ if (this.usePersianNames)
									    return this.pN(j1[2]) +	' ' +	this.pJMNA(j1[1]) +	' ' +	this.pN(j1[0])	;
									  else
									    return this.pJMNA(j1[1]) +	' ' +	this.pN(j1[2]) +	', ' +	this.pN(j1[0])	;
									};

    // Month & Year (2)
    this.printJalaliMonthMonthYear		= function (j1, j2)	{ return this.pJMNF(j1[1]) +	this.dash +	this.pJMNF(j2[1]) +	' ' +	this.pN(j2[0])	; };
    this.printJalaliMonthYearMonthYear		= function (j1, j2)	{ return this.pJMNF(j1[1]) +	' ' +	this.pN(j1[0]) +	this.dash +	this.pJMNF(j2[1]) +	' ' +	this.pN(j2[0])	; };

    this.printJalaliMonthDayDayYear		= function (j1, j2)	{ if (this.usePersianNames)
									    return this.pN(j1[2]) +	this.dash +	this.pN(j2[2]) +	' ' +	this.pJMNA(j1[1]) +	' ' +	this.pN(j2[0])	;
									  else
									    return this.pJMNA(j1[1]) +	' ' +	this.pN(j1[2]) +	this.dash +	this.pN(j2[2]) +	', ' +	this.pN(j2[0])	;
									};

    // Day & Month & Year (2)
    this.printJalaliMonthDayMonthDayYear	= function (j1, j2)	{ if (this.usePersianNames)
									    return this.pN(j1[2]) +	' ' +	this.pJMNA(j1[1]) +	this.dash +	this.pN(j2[2]) +	' ' +	this.pJMNA(j2[1]) +	' ' +	this.pN(j2[0])	;
									  else
									    return this.pJMNA(j1[1]) +	' ' +	this.pN(j1[2]) +	this.dash +	this.pJMNA(j2[1]) +	' ' +	this.pN(j2[2]) +	', ' +	this.pN(j2[0])	;
									};

    this.printJalaliMonthDayYearMonthDayYear	= function (j1, j2)	{ if (this.usePersianNames)
									    return this.pN(j1[2]) +	' ' +	this.pJMNA(j1[1]) +	' ' +	this.pN(j1[0]) +	this.dash +	this.pN(j2[2]) +	' ' +	this.pJMNA(j2[1]) +	' ' +	this.pN(j2[0])	;
									  else
									    return this.pJMNA(j1[1]) +	' ' +	this.pN(j1[2]) +	', ' +	this.pN(j1[0]) +	this.dash +	this.pJMNA(j2[1]) +	' ' +	this.pN(j2[2]) +	', ' +	this.pN(j2[0])	;
									};

    // Parser

    this.ParserTypes = [
	// NULL
	null,

	// GENERIC

	// 1, MONTH1 DAY1, YEAR1 - MONTH2 DAY2, YEAR2
	/([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})\s+\W\s+([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})/,

	// 2, MONTH1 DAY1 - MONTH2 DAY2, YEAR
	/([A-Z][a-z]{2})\s+(\d{1,2})\s+\W\s+([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})/,

	// 3, MONTH DAY1 - DAY2 YEAR
	/([A-Z][a-z]{2})\s+(\d{1,2})\s+\W\s+(\d{1,2})\s*,\s+(\d{4})/,

	// 4, MONTH DAY, YEAR
	/([A-Z][a-z]{2})\s+(\d{1,2}),\s+(\d{4})/,

	// 5, FULLMONTH YEAR
	/([A-Z][a-z]{2,})\s+(\d{4})/,

	// EXCEPTIONAL

	// 6, WEEKDAY MONTHNUM/DAY
	/([A-Z][a-z]{2,})\s+(\d{1,2})\/(\d{1,2})/,

	// 7, MONTH DAY
	/([A-Z][a-z]{2})\s+(\d{1,2})/,

	// 8, MONTH DAY YEAR
	/([A-Z][a-z]{2})\s+(\d{1,2})\s+(\d{4})/,

	// 9, DAY
	/(\d{1,2})/,
    ];


    this.getGregorianMonthByName	= function (s)	{ return "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(s.substring(0,3))/3 + 1; };

    this.getDaysFromGregorianString	= function (gs, setGlobal) {
	var type = 0,
	    j1 = null,
	    j2 = null,
	    withDay = true;

	var g1 = null,
	    g2 = null;

	// GENERIC

	if (this.ParserTypes[1].test(gs)) {
	    type = 1;
	    var res = this.ParserTypes[type].exec(gs);

	    var y1 = Number(res[3]),
		m1 = this.getGregorianMonthByName(res[1]),
		d1 = Number(res[2]),
		y2 = Number(res[6]),
		m2 = this.getGregorianMonthByName(res[4]),
		d2 = Number(res[5]);

	    g1 = [y1, m1, d1];
	    g2 = [y2, m2, d2];

	    j1 = this.jc.gregorianToJalali (g1);
	    j2 = this.jc.gregorianToJalali (g2);
	    withDay = true;
	}

	else if (this.ParserTypes[2].test(gs)) {
	    type = 2;
	    var res = this.ParserTypes[type].exec(gs);

	    var y1 = Number(res[5]),
		m1 = this.getGregorianMonthByName(res[1]),
		d1 = Number(res[2]),
		m2 = this.getGregorianMonthByName(res[3]),
		d2 = Number(res[4]);

	    g1 = [y1, m1, d1];
	    g2 = [y1, m2, d2];

	    j1 = this.jc.gregorianToJalali (g1);
	    j2 = this.jc.gregorianToJalali (g2);
	    withDay = true;
	}

	else if (this.ParserTypes[3].test(gs)) {
	    type = 3;
	    var res = this.ParserTypes[type].exec(gs);

	    var y1 = Number(res[4]),
		m1 = this.getGregorianMonthByName(res[1]),
		d1 = Number(res[2]),
		d2 = Number(res[3]);

	    g1 = [y1, m1, d1];
	    g2 = [y1, m1, d2];

	    j1 = this.jc.gregorianToJalali (g1);
	    j2 = this.jc.gregorianToJalali (g2);
	    withDay = true;
	}

	else if (this.ParserTypes[4].test(gs)) {
	    type = 4;
	    var res = this.ParserTypes[type].exec(gs);

	    var y1 = Number(res[3]),
		m1 = this.getGregorianMonthByName(res[1]),
		d1 = Number(res[2]);

	    g1 = [y1, m1, d1];
	    g2 = [y1, m1, d1];

	    j1 = this.jc.gregorianToJalali (g1);
	    j2 = this.jc.gregorianToJalali (g2);
	    withDay = true;
	}

	else if (this.ParserTypes[5].test(gs)) {
	    type = 5;
	    var res = this.ParserTypes[type].exec(gs);

	    var m1 = this.getGregorianMonthByName(res[1]),
		y1 = Number(res[2]);

	    g1 = [y1, m1, 1];
	    g2 = [y1, m1, this.jc.getGregorianDaysInMonth(y1, m1)];
	    j1 = this.jc.gregorianToJalali (g1);
	    j2 = this.jc.gregorianToJalali (g2);
	    withDay = false;
	}


	// EXCEPTIONAL

	else if (this.ParserTypes[6].test(gs)) {
	    type = 6;
	    var res = this.ParserTypes[type].exec(gs);

	    var y1 = this.gIntervalStart[0],
		m1 = Number(res[2]),
		d1 = Number(res[3]),
		w1 = res[1];

	    if (m1 < this.gIntervalStart[1]) {
		y1 += 1;
	    }

	    g1 = [y1, m1, d1, w1];
	    j1 = this.jc.gregorianToJalali (g1);
	}

	else if (this.ParserTypes[7].test(gs)) {
	    type = 7;
	    var res = this.ParserTypes[type].exec(gs);

	    var y1 = this.gIntervalStart[0],
		m1 = this.getGregorianMonthByName(res[1]),
		d1 = Number(res[2]),

	    g1 = [y1, m1, d1];
	    j1 = this.jc.gregorianToJalali (g1);
	}

	else if (this.ParserTypes[8].test(gs)) {
	    type = 8;
	    var res = this.ParserTypes[type].exec(gs);

	    var y1 = Number(res[3]),
		m1 = this.getGregorianMonthByName(res[1]),
		d1 = Number(res[2]);

	    g1 = [y1, m1, d1];
	    j1 = this.jc.gregorianToJalali (g1);
	}

	else if (this.ParserTypes[9].test(gs)) {
	    type = 9;
	    var res = this.ParserTypes[type].exec(gs);

	    var y1 = this.gIntervalStart[0],
		m1 = this.gIntervalStart[1],
		d1 = Number(res[1]);

	    if (this.gIntervalFixed == false) {
		_log_info ("PARSER: Fixing Global Interval!");
		if (d1 > this.gIntervalStart[2]) {
		    m1 -= 1;
		    if (m1 < 1) { m1  = 12; y1 -= 1; }
		    _log_info ("PARSER: Fixed!");
		}
		this.gIntervalFixed = true;
		setGlobal = true;
	    }

	    if (d1 < this.gIntervalStart[2]) {
		m1 += 1;
		if (m1 > 12) { m1  = 1; y1 += 1; }
	    }

	    g1 = [y1, m1, d1];
	    j1 = this.jc.gregorianToJalali (g1);
	}

	else {
	    _log_info ("PARSER: ERROR! | gs=" + gs + " | g1, g2: " + g1 + ' - ' + g2);
	    return false;
	}

	_log_info ("PARSER: TYPE", type);
	_log_info ("PARSER: FIXED", this.gIntervalFixed);
	_log_info ("PARSER: S, E", this.gIntervalStart, this.gIntervalEnd);
	_log_info ("PARSER: GS", gs);
	_log_info ("PARSER: g1, g2", g1, g2);
	_log_info ("PARSER: j1, j2", j1, j2);

	if (setGlobal) {
	    if (g1 !== null) { this.gIntervalStart	= g1; }
	    if (g2 !== null) { this.gIntervalEnd	= g2; }
	}

	return [type, j1, j2, withDay];
    };


    // Format

    this.printJalali	= function (days, gs)
    {
	if (!days) { return gs; }

	var type = days[0],
	    j1 = days[1],
	    j2 = days[2],
	    withDay = days[3],
	    output = '';

	// general
	if (1 <= type && type <= 5) {
	    output += gs + this.tagOpen;
	    if (j1[0] == j2[0]) {	if (j1[1] == j2[1]) {	if (j1[2] == j2[2]) {	if (withDay)	output += this.printJalaliMonthDayYear(j1);
											else		output += this.printJalaliMonthYear(j1);
							    }
							    else {  if (withDay)	output += this.printJalaliMonthDayDayYear(j1,j2);
								    else		output += this.printJalaliMonthYear(j1);
							    }
					}
					else {	if (withDay)	output += this.printJalaliMonthDayMonthDayYear(j1,j2);
						else		output += this.printJalaliMonthMonthYear(j1,j2);
					}
	    }
	    else {	if (withDay)	output += this.printJalaliMonthDayYearMonthDayYear(j1,j2);
			else		output += this.printJalaliMonthYearMonthYear(j1,j2);
	    }
	    output += this.tagClose;
	}

	else if (type == 6) { output += gs + this.tagOpen + this.printJalaliMonumDay(j1) + this.tagClose; }
	else if (type == 7) { output += gs + this.tagOpen + this.printJalaliMonthDay(j1) + this.tagClose; }
	else if (type == 8) { output += gs + this.tagOpen + this.printJalaliMonthDayYear(j1) + this.tagClose; }
	else if (type == 9) { output += gs + this.tagOpen + this.printJalaliDayOrMonth(j1) + this.tagClose; }

	return output;
    }


    // Dirty stuff

    this.getHtml = function (obj)		{ return obj.innerHTML; };
    this.setHtml = function (obj, html)		{ return obj.innerHTML = html; };
    this.getPrev = function (obj)		{ return obj.getAttribute("prev_innerHTML"); };
    this.setPrev = function (obj, prev)		{ return obj.setAttribute("prev_innerHTML", prev, true); };
    this.getOrig = function (obj)		{ return obj.getAttribute("orig_innerHTML"); };
    this.setOrig = function (obj, orig)		{ return obj.setAttribute("orig_innerHTML", orig, true); };

    this.changedHtml	= function (obj)	{ return !this.getPrev(obj) || this.getPrev(obj) != this.getHtml(obj); };
    this.updateHtml	= function (obj, html)	{ this.setOrig (obj, this.getHtml(obj)); this.setHtml (obj, html); this.setPrev (obj, this.getHtml(obj)); };

    this.updateToJalali	= function (obj, setGlobal)	{ this.updateHtml(obj, this.printJalali(this.getDaysFromGregorianString(this.getHtml(obj), setGlobal), this.getHtml(obj))); };

    this.loop = function (mythis) {

	var global_date_range = document.getElementById("currentDate:2");
	if (global_date_range && mythis.changedHtml(global_date_range))
	{
	    mythis.gIntervalFixed = false;

	    mythis.updateToJalali(global_date_range, true);

	    nodelist_filter(document.getElementsByClassName('wk-dayname'), function(elem){
		nodelist_filter(elem.getElementsByClassName('wk-daylink'), function(elem2){
		    if (mythis.changedHtml(elem2)) {
			mythis.updateToJalali(elem2, false);
		    }
		});
	    });

	    nodelist_filter(document.getElementsByClassName('st-dtitle'), function(elem){
		nodelist_filter(elem.getElementsByTagName('SPAN'), function(elem2){
		    if (mythis.changedHtml(elem2)) {
			mythis.updateToJalali(elem2, false);
		    }
		});
	    });

	    nodelist_filter(document.getElementsByClassName('lv-datecell'), function(elem){
		nodelist_filter(elem.getElementsByClassName('lv-datelink'), function(elem2){
		    if (mythis.changedHtml(elem2)) {
			mythis.updateToJalali(elem2, false);
		    }
		});
	    });

	}

	window.setTimeout (mythis.loop, this.loopTimeout, mythis);
    };
};


///////////////////////////////////////////////////////////////////////////////
// JalaliCalendar Object //////////////////////////////////////////////////////

/*
 * Jalali Calendar in JavaScript
 */

/*
 * GNU LGPL 2.1
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You can receive a copy of GNU Lesser General Public License at the
 * World Wide Web address <http://www.gnu.org/licenses/lgpl.html>.
 */

/*
 * Copyright (C) 2001  Roozbeh Pournader <roozbeh@sharif.edu>
 * Copyright (C) 2001  Mohammad Toossi <toossi@umd.edu>
 * Copyright (C) 2003  Behdad Esfahbod <js@behdad.org>
 * Copyright (C) 2005-2006  Behnam "ZWNJ" Esfahbod <behnam@zwnj.org>
 *
 */

/* Changes:
 *
 * 2006-May-21:
 *	Move all Jalali support to JalaliCalendar object
 *
 * 2003-Mar-29:
 *	Ported to javascript by Behdad Esfahbod
 *
 * 2001-Sep-21:
 *	Fixed a bug with "30 Esfand" dates, reported by Mahmoud Ghandi
 *
 * 2001-Sep-20:
 *	First LGPL release, with both sides of conversions
 */

var JalaliCalendar = function ()
{
    this.gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    this.div = function (a,b) { return Math.floor(a/b); };

    this.getGregorianDaysInMonth = function (y, m)
    {
	if (m != 2)					{ return this.gDaysInMonth[m-1]; }
	else	if ((y%4==0 && y%100!=0) || (y%400==0))	{ return this.gDaysInMonth[m-1] + 1; }
		else					{ return this.gDaysInMonth[m-1]; }
    }

    this.gregorianPrevMonth = function (g)
    {
	if (g[2] > 1)
	{
	    g[2] -= 1;
	}
	else
	{
	    if (g[1] > 1)
	    {
		g[1] -= 1;
	    }
	    else
	    {
		g[0] -= 1;
		g[1] = 12;
	    }
	    g[2] = this.getGregorianDaysInMonth[g[0], g[1]];
	}
    }

    this.gregorianToJalali = function (g)
    // input: array containing gregorian date [year, month, day]
    // output: array containing jalali date [year, month, day]
    {
	var gy, gm, gd, g_day_no;
	var jy, jm, jd, j_day_no, j_np;

	var i;

	gy = g[0]-1600;
	gm = g[1]-1;
	gd = g[2]-1;

	// calculating g_day_no
	g_day_no = 365*gy + this.div((gy+3),4) - this.div((gy+99),100) + this.div((gy+399),400);

	for (i=0; i<gm; ++i)
	    g_day_no += this.gDaysInMonth[i];

	if (gm>1 && ((gy%4==0 && gy%100!=0) || (gy%400==0)))
	    ++g_day_no;						// leap and after Feb

	g_day_no += gd;

	// calculating j_day_no, etc
	j_day_no = g_day_no-79;

	j_np = this.div(j_day_no, 12053);
	j_day_no %= 12053;

	jy = 979+33*j_np+4*this.div(j_day_no,1461);
	j_day_no %= 1461;

	if (j_day_no >= 366)
	{
	    jy += this.div((j_day_no-1),365);
	    j_day_no = (j_day_no-1)%365;
	}

	for (i = 0; i < 11 && j_day_no >= this.jDaysInMonth[i]; ++i)
	{
	    j_day_no -= this.jDaysInMonth[i];
	}

	jm = i+1;
	jd = j_day_no+1;

	return [jy, jm, jd];
    }

    this.jalaliToGregorian = function (j)
    // input: array containing jalali date [year, month, day]
    // output: array containing gregorian date [year, month, day]
    {
	var gy, gm, gd;
	var jy, jm, jd;
	var g_day_no, j_day_no;
	var leap;

	var i;

	jy = j[0]-979;
	jm = j[1]-1;
	jd = j[2]-1;

	// calculating j_day_no
	j_day_no = 365*jy + this.div(jy,33)*8 + this.div((jy%33+3),4);
	for (i=0; i < jm; ++i)
	    j_day_no += this.jDaysInMonth[i];

	j_day_no += jd;

	// calculating g_day_no, etc
	g_day_no = j_day_no+79;

	gy = 1600 + 400*this.div(g_day_no,146097);	// 146097 = 365*400 + 400/4 - 400/100 + 400/400
	g_day_no = g_day_no % 146097;

	leap = 1;
	if (g_day_no >= 36525)				// 36525 = 365*100 + 100/4
	{
	    g_day_no--;
	    gy += 100*this.div(g_day_no,36524);		// 36524 = 365*100 + 100/4 - 100/100
	    g_day_no = g_day_no % 36524;

	    if (g_day_no >= 365)
		g_day_no++;
	    else
		leap = 0;
	}

	gy += 4*this.div(g_day_no,1461);		// 1461 = 365*4 + 4/4
	g_day_no %= 1461;

	if (g_day_no >= 366) {
	    leap = 0;

	    g_day_no--;
	    gy += this.div(g_day_no, 365);
	    g_day_no = g_day_no % 365;
	}

	for (i = 0; g_day_no >= this.gDaysInMonth[i] + (i == 1 && leap); i++)
	    g_day_no -= this.gDaysInMonth[i] + (i == 1 && leap);

	gm = i+1;
	gd = g_day_no+1;

	return [gy, gm, gd];
    }

    this.printTodayJalali = function ()
    {
	today = new Date();
	glist = [ today.getFullYear(), today.getMonth()+1, today.getDate() ];
	return this.gregorianToJalali( glist );
    }
}


///////////////////////////////////////////////////////////////////////////////
// Start Here /////////////////////////////////////////////////////////////////

var main = function ()
{
    var jgc = new JalaliGCal();
    jgc.loop(jgc);
}

main();


///////////////////////////////////////////////////////////////////////////////
// The END ////////////////////////////////////////////////////////////////////

