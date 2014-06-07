// ==UserScript==
// @name           Date Converter for Blogger
// @namespace      http://vahidnasiri.blogspot.com/
// @description    This script will convert Blogger's posts date-time stamps to Persian, also I've added Yahoo's mail date column to Persian date converter
// @include        *
// ==/UserScript==

/*
	Name: Persian Date
	Developer : Bahram Maravandi
	Lastupdate: 24-12-2007
	Thanks to: Amin Habibi Shahri
*/

var WEEKDAYS = new Array( "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" );
var PERSIAN_MONTHS = ["فروردین", "اردیبهشت", "خرداد", "تیر", "امرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسپند"];
var PERSIAN_DIGITS = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];						  
var PERSIAN_DAYS = ["اورمزد","بهمن","اوردیبهشت","شهریور","سپندارمذ","خورداد","امرداد","دی به آذز","آذز","آبان","خورشید","ماه","تیر","گوش","دی به مهر","مهر","سروش","رشن","فروردین","بهرام","رام","باد","دی به دین","دین","ارد","اشتاد","آسمان","زامیاد","مانتره سپند","انارام","زیادی"];
var PERSIAN_WEEKDAYS = new Array("مهرشید", "مه‌شید", "بهرام‌شید", "تیرشید", "اورمزشید", "ناهیدشید", "کیوان‌شید");
var PERSIAN_WEEKDAYS1 = new Array("یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "آدینه", "شنبه");

var GREGORIAN_EPOCH = 1721425.5;
var PERSIAN_EPOCH = 1948320.5;

/*  MOD  --  Modulus function which works for non-integers.  */
function mod(a, b)
{
    return a - (b * Math.floor(a / b));
}

function jwday(j)
{
    return mod(Math.floor((j + 1.5)), 7);
}

//  LEAP_GREGORIAN  --  Is a given year in the Gregorian calendar a leap year ?
function leap_gregorian(year) {
    if ((year % 4) != 0)
        return false;
    if ((year % 100) != 0)
        return true;
    if ((year % 400) != 0)
        return true;
    return false;    
}

//  GREGORIAN_TO_JD  --  Determine Julian day number from Gregorian calendar date
function gregorian_to_jd(year, month, day)
{
    return (GREGORIAN_EPOCH - 1) +
           (365 * (year - 1)) +
           Math.floor((year - 1) / 4) +
           (-Math.floor((year - 1) / 100)) +
           Math.floor((year - 1) / 400) +
           Math.floor((((367 * month) - 362) / 12) +
           ((month <= 2) ? 0 :
                               (leap_gregorian(year) ? -1 : -2)
           ) +
           day);
}

//  JD_TO_GREGORIAN  --  Calculate Gregorian calendar date from Julian day
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

//  LEAP_PERSIAN  --  Is a given year a leap year in the Persian calendar ?
function leap_persian(year)
{
    return ((((((year - ((year > 0) ? 474 : 473)) % 2820) + 474) + 38) * 682) % 2816) < 682;
}

//  PERSIAN_TO_JD  --  Determine Julian day from Persian date
function persian_to_jd(year, month, day)
{
    var epbase, epyear;

    epbase = year - ((year >= 0) ? 474 : 473);
    epyear = 474 + mod(epbase, 2820);

    return day +
            ((month <= 7) ?
                ((month - 1) * 31) :
                (((month - 1) * 30) + 6)
            ) +
            Math.floor(((epyear * 682) - 110) / 2816) +
            (epyear - 1) * 365 +
            Math.floor(epbase / 2820) * 1029983 +
            (PERSIAN_EPOCH - 1);
}

//  JD_TO_PERSIAN  --  Calculate Persian date from Julian day

function jd_to_persian(jd)
{
    var year, month, day, depoch, cycle, cyear, ycycle,
        aux1, aux2, yday;


    jd = Math.floor(jd) + 0.5;

    depoch = jd - persian_to_jd(475, 1, 1);
    cycle = Math.floor(depoch / 1029983);
    cyear = mod(depoch, 1029983);
    if (cyear == 1029982) {
        ycycle = 2820;
    } else {
        aux1 = Math.floor(cyear / 366);
        aux2 = mod(cyear, 366);
        ycycle = Math.floor(((2134 * aux1) + (2816 * aux2) + 2815) / 1028522) +
                    aux1 + 1;
    }
    year = ycycle + (2820 * cycle) + 474;
    if (year <= 0) {
        year--;
    }
    yday = (jd - persian_to_jd(year, 1, 1)) + 1;
    month = (yday <= 186) ? Math.ceil(yday / 31) : Math.ceil((yday - 6) / 30);
    day = (jd - persian_to_jd(year, month, 1)) + 1;
    return new Array(year, month, day);
}

function calcPersian(year,month,day)
{
    var date,j;

    j = persian_to_jd(year,month,day);
    date = jd_to_gregorian(j);
    weekday = jwday(j);
    return new Array(date[0], date[1], date[2],weekday);
}

//  calcGregorian  --  Perform calculation starting with a Gregorian date
function calcGregorian(year,month,day)
{
    month--;

    var j, weekday;

    //  Update Julian day

    j = gregorian_to_jd(year, month + 1, day) +
           (Math.floor(0 + 60 * (0 + 60 * 0) + 0.5) / 86400.0);

    //  Update Persian Calendar
    perscal = jd_to_persian(j);
    weekday = jwday(j);
    return new Array(perscal[0], perscal[1], perscal[2],weekday);
}

function getTodayGregorian()
{
    var t = new Date();
    var today = new Date();

    var y = today.getYear();
    if (y < 1000) {
        y += 1900;
    }

    return new Array(y, today.getMonth() + 1, today.getDate(),t.getDay());
}

function getTodayPersian()
{
    var t = new Date();
    var today = getTodayGregorian();

    var persian = calcGregorian(today[0],today[1],today[2]);
    return new Array(persian[0],persian[1],persian[2],t.getDay());
}

var gDateOnly = false;
// date and time
var gLongFormat = false;
// date and persian day 
var gParsiLongFormat = false;
//Converts a gregorian date to Jalali date for different formats
function ToPersianDate(gd)
{

var pa = calcGregorian(gd.getFullYear(),gd.getMonth() +1, gd.getDate());
var p;

if (!gDateOnly)
	p = PERSIAN_WEEKDAYS[pa[3]] + "  " + formatPersian(pa[2]) + " " + PERSIAN_MONTHS[pa[1] -1] + " " + formatPersian(pa[0]);
else
	p = getRefreshLink(pa);
	
if (gLongFormat)
	{	
		p += '  ';
		
		var h = formatPersian(((gd.getHours()>12)?(gd.getHours()-12):(gd.getHours()===0?12:	gd.getHours())));
		var min = formatPersian(((gd.getMinutes()<10)?('0' + gd.getMinutes()):(gd.getMinutes())));
		
		p += '،  ' + h + ':' + min.replace(' ','') + ' ' + 
			((gd.getHours()>=12)?'ب ظ':'پ ظ');
	}

//if (gParsiLongFormat)
//	{
//		p += '،  ' + PERSIAN_DAYS[pa[2]-1] + ' روز';
//	}	
		
return p;

}

function ArrayToPersianDate(pa)
{
// calc weekday
var pd = calcPersian(pa[0],pa[1], pa[2]);
var gd = calcGregorian(pd[0],pd[1], pd[2]);
var p = PERSIAN_WEEKDAYS[gd[3]] + "،  " + formatPersian(gd[2]) + " " + PERSIAN_MONTHS[gd[1] -1] + " " + formatPersian(gd[0]);

return p;

}

function ArrayToGregorianDate(pa)
{
// calc weekday
var pd = calcPersian(pa[0],pa[1], pa[2]);
var p = pd[0] + "-" + ((pd[1] < 10) ? "0" + pd[1] : pd[1]) + "-" + ((pd[2] < 10) ? "0" + pd[2] : pd[2]);

return p;

}

//
// formats numerical values to persian numbers
// added by Bahram Maravandi
// 13 Feb 2007,  24 Bahman 1385
//
function formatPersian(num)
{
   var tmp = num;
   tmp = tmp.toString(); 

   for(var i=0; i < 10; i++)
   {	
	for(var z=0; z < tmp.length; z++)
		tmp = tmp.replace(i , PERSIAN_DIGITS[i]);	
   }
   
   tmp = tmp.replace(" ",'');
   return tmp;
}
