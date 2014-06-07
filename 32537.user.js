// ==UserScript==
// @name           Google Calendar Persian
// @namespace      http://i.nima.rasouli.org/google-calendar-persian
// @description    Some RTL translations, persian date and persian styles
// @include        http://www.google.com/calendar/*
// @include        http://calendar.google.tld/*
// @include        https://calendar.google.tld/*
// @include        http://www.google.tld/calendar*
// @include        https://www.google.tld/calendar*
// @include        http://google.tld/calendar*
// @include        https://google.tld/calendar*
// ==/UserScript==


/*
	Name: Persian Date
	Developer : Bahram Maravandi
	Lastupdate: 24-12-2007
	Thanks to: Amin Habibi Shahri
*/
var WEEKDAYS = new Array( "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" );
var PERSIAN_MONTHS = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
var PERSIAN_DIGITS = ["۰","۱","۲","۳","۴"," ۵","۶","۷","۸","۹"];						  
var PERSIAN_DAYS = ["اورمزد","بهمن","اوردیبهشت","شهریور","سپندارمذ","خورداد","امرداد","دی به آذز","آذز","آبان","خورشید","ماه","تیر","گوش","دی به مهر","مهر","سروش","رشن","فروردین","بهرام","رام","باد","دی به دین","دین","ارد","اشتاد","آسمان","زامیاد","مانتره سپند","انارام","زیادی"];
var PERSIAN_WEEKDAYS = new Array("یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه");

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
function leap_gregorian(year)
{
    return ((year % 4) == 0) &&
            (!(((year % 100) == 0) && ((year % 400) != 0)));
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
	//var y = 2011;
    if (y < 1000) {
        y += 1900;
    }
	//var postdate = y + "/08/23";

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
var gTimeOnly = false;
// time
var gBrakeFormat = false;
// brake and bold the weekday
var gLongFormat = false;
// date and persian day 
var gParsiLongFormat = false;
//Converts a gregorian date to Jalali date for different formats
function ToPersianDate(gd)
{

var pa = calcGregorian(gd.getFullYear(),gd.getMonth() +1, gd.getDate());
var p;

if (gTimeOnly)
             {

		var h = formatPersian(((gd.getHours()>12)?(gd.getHours()-12):(gd.getHours()===0?12:	gd.getHours())));
		var min = formatPersian(((gd.getMinutes()<10)?('0' + gd.getMinutes()):(gd.getMinutes())));
		
		p = h + ':' + min.replace(' ','') + ' ' + 
			((gd.getHours()>=12)?'ب ظ':'ق ظ');
              }
else
  {
if (gBrakeFormat)
             {
                           p = "<b>" + PERSIAN_WEEKDAYS[pa[3]] + "</b><br/>" + formatPersian(pa[2]) + " " + PERSIAN_MONTHS[pa[1] -1] + " " + formatPersian(pa[0]);
              }
else
    {
if (!gDateOnly)
	p = PERSIAN_WEEKDAYS[pa[3]] + "،  " + formatPersian(pa[2]) + " " + PERSIAN_MONTHS[pa[1] -1] + " " + formatPersian(pa[0]);
else
	p = PERSIAN_WEEKDAYS[pa[3]] + "،  " +formatPersian(pa[1]) + "/" + formatPersian(pa[2]);
	
if (gLongFormat)
	{	
		p += '  ';
		
		var h = formatPersian(((gd.getHours()>12)?(gd.getHours()-12):(gd.getHours()===0?12:	gd.getHours())));
		var min = formatPersian(((gd.getMinutes()<10)?('0' + gd.getMinutes()):(gd.getMinutes())));
		
		p += '،  ' + h + ':' + min.replace(' ','') + ' ' + 
			((gd.getHours()>=12)?'ب ظ':'ق ظ');
	}

if (gParsiLongFormat)
	{
		p += '،  ' + PERSIAN_DAYS[pa[2]-1] + ' روز';
	}	
    }
  }		
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






//
// Google Calendar main codes
// developed by Nima Rasouli: http://nima.rasouli.org
// 26 Aug 2008, 5 Sahrivar 1387
//

gDateOnly = true;

// Saturday
function sattimedCount() 
{
	var satchead = document.getElementById('chead0'); 
	var satval = satchead.childNodes[0].firstChild.nodeValue;
	var satpos = satval.indexOf("Sat"); 
	if (satpos==0)
	{
		satval = satval.replace(/Sat /, "/"); 
		var satdate = '2009'+ satval; //temporary for 2009 year
		var satper = ToPersianDate(new Date(satdate));
		var satnew = document.createElement("span");
		satnew.setAttribute('id','chead0per');
		satnew.innerHTML = '<a style="direction:rtl;text-align:right;" href="javascript:void(Zw(1))" class="lkh">' +  satper + '</a><style>.chead { direction: rtl; }a, p, label, html, body, span, div, td, br, input, font, button, select, option { font-family: Tahoma !important; } .noleft { direction: rtl; text-align: right; }.chip { direction: rtl; }.calListLabelOuter { direction: rtl; padding-right: 5px; }</style>';
		document.body.insertBefore(satnew, document.body.firstChild);
		satchead.parentNode.replaceChild(satnew, satchead); 
	}
 	for(var i = 1; i <= 5; i++) 
	{
		window.addEventListener('click',sattimedCount,false);  //addListeners to various events that updates the page.
	}
}
sattimedCount();
function satloader0() {	
	setTimeout(satloader1,500);
}
function satloader1() {	
	setTimeout(sattimedCount,2000);
}
function satloader2() {	
	setTimeout(sattimedCount,500);
}
for(var i = 1; i <= 5; i++){
window.addEventListener('click',satloader0,false); 
window.addEventListener('load',satloader1,false);  
window.addEventListener('resize',satloader2,false);  
}

// Sunday
function suntimedCount() 
{
	var sunchead = document.getElementById('chead1'); 
	var sunval = sunchead.childNodes[0].firstChild.nodeValue;
	var sunpos = sunval.indexOf("Sun"); 
	if (sunpos==0)
	{
		sunval = sunval.replace(/Sun /, "/"); 
		var sundate = '2011'+ sunval; //temporary for 2011 year
		var sunper = ToPersianDate(new Date(sundate));
		var sunnew = document.createElement("span");
		sunnew.setAttribute('id','chead1per');
		sunnew.innerHTML = '<a style="direction:rtl;text-align:right;" href="javascript:void(Zw(1))" class="lkh">' +  sunper + '</a>';
		document.body.insertBefore(sunnew, document.body.firstChild);
		sunchead.parentNode.replaceChild(sunnew, sunchead); 
	}
 	for(var i = 1; i <= 5; i++) 
	{
		window.addEventListener('click',suntimedCount,false);  //addListeners to various events that updates the page.
	}
}
suntimedCount();
function sunloader0() {	
	setTimeout(sunloader1,500);
}
function sunloader1() {	
	setTimeout(suntimedCount,2000);
}
function sunloader2() {	
	setTimeout(suntimedCount,500);
}
for(var i = 1; i <= 5; i++){
window.addEventListener('click',sunloader0,false); 
window.addEventListener('load',sunloader1,false);  
window.addEventListener('resize',sunloader2,false);  
}

// Monday
function montimedCount() 
{
	var monchead = document.getElementById('chead2'); 
	var monval = monchead.childNodes[0].firstChild.nodeValue;
	var monpos = monval.indexOf("Mon"); 
	if (monpos==0)
	{
		monval = monval.replace(/Mon /, "/"); 
		var mondate = '2011'+ monval; //temporary for 2011 year
		var monper = ToPersianDate(new Date(mondate));
		var monnew = document.createElement("span");
		monnew.setAttribute('id','chead2per');
		monnew.innerHTML = '<a style="direction:rtl;text-align:right;" href="javascript:void(Zw(1))" class="lkh">' +  monper + '</a>';
		document.body.insertBefore(monnew, document.body.firstChild);
		monchead.parentNode.replaceChild(monnew, monchead); 
	}
 	for(var i = 1; i <= 5; i++) 
	{
		window.addEventListener('click',montimedCount,false);  //addListeners to various events that updates the page.
	}
}
montimedCount();
function monloader0() {	
	setTimeout(monloader1,500);
}
function monloader1() {	
	setTimeout(montimedCount,2000);
}
function monloader2() {	
	setTimeout(montimedCount,500);
}
for(var i = 1; i <= 5; i++){
window.addEventListener('click',monloader0,false); 
window.addEventListener('load',monloader1,false);  
window.addEventListener('resize',monloader2,false);  
}

// Tuesday
function tuetimedCount() 
{
	var tuechead = document.getElementById('chead3'); 
	var tueval = tuechead.childNodes[0].firstChild.nodeValue;
	var tuepos = tueval.indexOf("Tue"); 
	if (tuepos==0)
	{
		tueval = tueval.replace(/Tue /, "/"); 
		var tuedate = '2011'+ tueval; //temporary for 2011 year
		var tueper = ToPersianDate(new Date(tuedate));
		var tuenew = document.createElement("span");
		tuenew.setAttribute('id','chead3per');
		tuenew.innerHTML = '<a style="direction:rtl;text-align:right;" href="javascript:void(Zw(1))" class="lkh">' +  tueper + '</a>';
		document.body.insertBefore(tuenew, document.body.firstChild);
		tuechead.parentNode.replaceChild(tuenew, tuechead); 
	}
 	for(var i = 1; i <= 5; i++) 
	{
		window.addEventListener('click',tuetimedCount,false);  //addListeners to various events that updates the page.
	}
}
tuetimedCount();
function tueloader0() {	
	setTimeout(tueloader1,500);
}
function tueloader1() {	
	setTimeout(tuetimedCount,2000);
}
function tueloader2() {	
	setTimeout(tuetimedCount,500);
}
for(var i = 1; i <= 5; i++){
window.addEventListener('click',tueloader0,false); 
window.addEventListener('load',tueloader1,false);  
window.addEventListener('resize',tueloader2,false);  
}

// Wednesday
function wedtimedCount() 
{
	var wedchead = document.getElementById('chead4'); 
	var wedval = wedchead.childNodes[0].firstChild.nodeValue;
	var wedpos = wedval.indexOf("Wed"); 
	if (wedpos==0)
	{
		wedval = wedval.replace(/Wed /, "/"); 
		var weddate = '2011'+ wedval; //temporary for 2011 year
		var wedper = ToPersianDate(new Date(weddate));
		var wednew = document.createElement("span");
		wednew.setAttribute('id','chead4per');
		wednew.innerHTML = '<a style="direction:rtl;text-align:right;" href="javascript:void(Zw(1))" class="lkh">' +  wedper + '</a>';
		document.body.insertBefore(wednew, document.body.firstChild);
		wedchead.parentNode.replaceChild(wednew, wedchead); 
	}
 	for(var i = 1; i <= 5; i++) 
	{
		window.addEventListener('click',wedtimedCount,false);  //addListeners to various events that updates the page.
	}
}
wedtimedCount();
function wedloader0() {	
	setTimeout(wedloader1,500);
}
function wedloader1() {	
	setTimeout(wedtimedCount,2000);
}
function wedloader2() {	
	setTimeout(wedtimedCount,500);
}
for(var i = 1; i <= 5; i++){
window.addEventListener('click',wedloader0,false); 
window.addEventListener('load',wedloader1,false);  
window.addEventListener('resize',wedloader2,false);  
}

// Thursday
function thutimedCount() 
{
	var thuchead = document.getElementById('chead5'); 
	var thuval = thuchead.childNodes[0].firstChild.nodeValue;
	var thupos = thuval.indexOf("Thu"); 
	if (thupos==0)
	{
		thuval = thuval.replace(/Thu /, "/"); 
		var thudate = '2011'+ thuval; //temporary for 2011 year
		var thuper = ToPersianDate(new Date(thudate));
		var thunew = document.createElement("span");
		thunew.setAttribute('id','chead5per');
		thunew.innerHTML = '<a style="direction:rtl;text-align:right;" href="javascript:void(Zw(1))" class="lkh">' +  thuper + '</a>';
		document.body.insertBefore(thunew, document.body.firstChild);
		thuchead.parentNode.replaceChild(thunew, thuchead); 
	}
 	for(var i = 1; i <= 5; i++) 
	{
		window.addEventListener('click',thutimedCount,false);  //addListeners to various events that updates the page.
	}
}
thutimedCount();
function thuloader0() {	
	setTimeout(thuloader1,500);
}
function thuloader1() {	
	setTimeout(thutimedCount,2000);
}
function thuloader2() {	
	setTimeout(thutimedCount,500);
}
for(var i = 1; i <= 5; i++){
window.addEventListener('click',thuloader0,false); 
window.addEventListener('load',thuloader1,false);  
window.addEventListener('resize',thuloader2,false);  
}

// Friday
function fritimedCount() 
{
	var frichead = document.getElementById('chead6'); 
	var frival = frichead.childNodes[0].firstChild.nodeValue;
	var fripos = frival.indexOf("Fri"); 
	if (fripos==0)
	{
		frival = frival.replace(/Fri /, "/"); 
		var fridate = '2011'+ frival; //temporary for 2011 year
		var friper = ToPersianDate(new Date(fridate));
		var frinew = document.createElement("span");
		frinew.setAttribute('id','chead6per');
		frinew.innerHTML = '<a style="direction:rtl;text-align:right;" href="javascript:void(Zw(1))" class="lkh">' +  friper + '</a>';
		document.body.insertBefore(frinew, document.body.firstChild);
		frichead.parentNode.replaceChild(frinew, frichead); 
	}
 	for(var i = 1; i <= 5; i++) 
	{
		window.addEventListener('click',fritimedCount,false);  //addListeners to various events that updates the page.
	}
}
fritimedCount();
function friloader0() {	
	setTimeout(friloader1,500);
}
function friloader1() {	
	setTimeout(fritimedCount,2000);
}
function friloader2() {	
	setTimeout(fritimedCount,500);
}
for(var i = 1; i <= 5; i++){
window.addEventListener('click',friloader0,false); 
window.addEventListener('load',friloader1,false);  
window.addEventListener('resize',friloader2,false);  
}


