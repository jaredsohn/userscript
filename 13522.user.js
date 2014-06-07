// ==UserScript==
// @name           Display LastModified Date in Title Bar
// @namespace      http://www.wallofcats.com
// @description    Display last modified date in the Title bar (if available)
// @include        *
// @exclude			http://*.google.com/*
// @exclude			http://*.google.tld/*
// @exclude			http://search.yahoo.com/*
// ==/UserScript==
// 

/*

*************
***Updates***
*************
Oct 31, 2007 - First Try*/
//
// format date as dd-mmm-yy
// example: 12-Jan-99
//


function lastMod(inDate) {

	var x = new Date (inDate);
	
	Modif = new Date(x.toGMTString());
	Year = takeYear(Modif);
	Month = Modif.getMonth();
    Day = Modif.getDate();
	Mod = (Date.UTC(Year,Month,Day,0,0,0))/86400000;
	x = new Date();
	today = new Date(x.toGMTString());
	Year2 = takeYear(today);
	Month2 = today.getMonth();
	Day2 = today.getDate();
	now = (Date.UTC(Year2,Month2,Day2,0,0,0))/86400000;
	daysago = now - Mod;
	if (daysago < 0) return '';
	unit = 'days';
	if (daysago > 730) 	{
		daysago = Math.floor(daysago/365);
		unit = 'years';
	}
	else if (daysago > 60) {
		daysago = Math.floor(daysago/30);
		unit = 'months';
	}
	else if (daysago > 14) {
		daysago = Math.floor(daysago/7);
		unit = 'weeks'
	}
	var towrite = 'Last changed ';
	if (daysago == 0) towrite += 'today';
	else if (daysago == 1) towrite += 'yesterday';
	else towrite += daysago + ' ' + unit + ' ago';
	return towrite;
	
}


function takeYear(theDate) {
	x = theDate.getYear();
	var y = x % 100;
	y += (y < 38) ? 2000 : 1900;
	return y;
}

function lastModDate() {
	var x = new Date (document.lastModified);
	var y =  Date();
    var z=lastMod(x);
if ((Date.parse(x)- Date.parse(y))>-5000 )
	{ 
	return "";
	} else {

	Modif = new Date(x.toGMTString());
	Year = Modif.getYear();
	  if(Year >= 2000)
  {
    Year -= 2000;
  }
  if(Year >= 100)
  {
    Year += 1900;
  };
	m = Modif.getMonth();
	var mmm = ( 0==m)?'Jan':( 1==m)?'Feb':(2==m)?'Mar':( 3==m)?'Apr':( 4==m)?'May':(5==m)?'Jun':( 6==m)?'Jul':( 7==m)?'Aug':(8==m)?'Sep':(9==m)?'Oct':(10==m)?'Nov':'Dec';
	Day = Modif.getDate();
	Hour = Modif.getHours();
	var h1= (Hour > 12)?Hour-12:Hour;
	var ap=(Hour > 12)?"PM":"AM";
	Minute = Modif.getMinutes();
	mn = ((Minute < 10)?"0":"") + Minute;
	
	return "   (" + mmm + " " + Day + ", " + Year + "  " + h1 + ":" + mn + ap + " -- " + z + " --)";
	};
	}


var curDate = lastModDate() ;
document.title += curDate;
