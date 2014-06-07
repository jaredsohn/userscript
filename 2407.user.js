// ==UserScript==
// @name          KEXP
// @namespace     tag:psoul:kexp
// @description   Shows a link to play files in playlist
// @include       http://www.kexp.org/playlist/playlist.asp*
// @include       http://kexp.org/playlist/playlist.asp*
// @include       http://kexp.org/playlist/old_playlist.asp
// ==/UserScript==

// This adds "play" links to the KEXP playlist
// Patrick Niemeyer, http://www.psoul.com
// current version: http://www.psoul.com/files/kexp.user.js

// 13/7/2005 - 0.01

// TODO: 
// change time element selection to an evaluate (300+ td's match)
// figure out what's "too new" and don't add links for that

(function() 
{
	// 0: 24k wma
	// 1: 96k wma
	// 2: 1.4m wma
	// 3: 256k real
	var streamTypePreference = 1;

	// DOM path to the date cell from which we will parse date information
	// (month, day, year, am/pm)  
	var datePath = "html/body/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/b";
	

	var playlistY;
	var playlistM;
	var playlistD;
	var playlistAMPM;

	/* getPlaylistDateInfo - read date information from the page
	 */
	function getPlaylistDateInfo()
	{
		var str = document.evaluate(datePath,document,null,XPathResult.STRING_TYPE,null).stringValue;
		str.match(/^\w+, (\w+) (\d+), (\d+) - \d+ (\w+)$/);

		// format: Wednesday, July 13, 2005 - 3 PM
		// want               ^^^^ ^^  ^^^^     ^^

		playlistY = RegExp.$3;
		playlistD = RegExp.$2;
		playlistAMPM = RegExp.$4; // must be lowercase

		switch (RegExp.$1) {
		case "January" :  { playlistM =  0; break; }
		case "February" : { playlistM =  1; break; }
		case "March" :    { playlistM =  2; break; }
		case "April" :    { playlistM =  3; break; }
		case "May" :      { playlistM =  4; break; }
		case "June" :     { playlistM =  5; break; }
		case "July" :     { playlistM =  6; break; }
		case "August" :   { playlistM =  7; break; }
		case "September" :{ playlistM =  8; break; }
		case "October" :  { playlistM =  9; break; }
		case "November" : { playlistM = 10; break; }
		case "December" : { playlistM = 11; break; }
		}
	}

	/* modifyTimeCell - modify the cell to include a link to the stream.
	 * Basically this just reuses the KEXP functions for calculating the date
	 * start parameter.
	 */
	function modifyTimeCell(node)
	{
		var time = node.innerHTML;

		var streamTypes = new Array (
			new Array (1, 24),
			new Array (1, 96),
			new Array (1, 1413),
			new Array (2, 256)
			);

		var timeSplit = time.split(":");
		var timeHour = parseInt(timeSplit[0]);
		if (timeHour == 12 && playlistAMPM == "am") {
			timeHour = 0;
		} else if (playlistAMPM == "pm") {
			timeHour += 12;
		}
		var timeMin = parseInt(timeSplit[1]);

		
		var media = streamTypes[streamTypePreference][0]; // 1:wmp, 2:real
		var bitrate = streamTypes[streamTypePreference][1]; // wmp also supports 20, 1413. real must be 256
		var start = new Date(playlistY, playlistM, playlistD, timeHour, timeMin);
		var starttime = GetTimeCode(start);
	
		var url = "javascript:doPopup('http://www.kexp.org/streamarchive/popup.asp?selectid=&mediatype=" + media + "&bitRate=" + bitrate + "&starttime=" + starttime + "', 'Archive', 430, 237)";

		node.innerHTML += "<br><a href=\"" + url + "\">play</a>";
	}

	// find the time stamps and put in "play" links
	function main()
	{
		getPlaylistDateInfo();

		var candidates = document.getElementsByTagName("TD");
		for (var i = 0; i < candidates.length; ++i)
		{
			var candidate = candidates[i];
			var candidateTime = candidate.innerHTML;

			if (candidateTime.match(/^\d+:\d+$/))
			{
				modifyTimeCell(candidate);
			}
		}
	}

	main();

	//--------------------------------------------------- BEGIN KEXP functions
	function s2ms (n) { return n * 1000 }
	function m2s  (n) { return n * 60 }
	function m2ms (n) { return s2ms( m2s(n) ) }
	function h2m  (n) { return n * 60 }
	function h2s  (n) { return m2s( h2m(n) ) }
	function h2ms (n) { return s2ms( h2s(n) ) }
	function h2d  (n) { return n / d2h(1) }
	function d2h  (n) { return n * 24 }
	function d2m  (n) { return d2h( h2m(n) ) }
	function d2s  (n) { return d2m( m2s(n) ) }
	function d2ms (n) { return d2m( m2ms(n) ) }
	
	function y2k(number)    { return (number < 1000) ? number + 1900 : number; }
	
	function LeapYear(year) {
		if ((year/4)   != Math.floor(year/4))   return false;
		if ((year/100) != Math.floor(year/100)) return true;
		if ((year/400) != Math.floor(year/400)) return false;
		return true;
	}
	
	function makeArray()    {
		this[0] = makeArray.arguments.length;
		for (i = 0; i<makeArray.arguments.length; i++) {
			this[i+1] = makeArray.arguments[i];
		}
	}
	
	function DayOfWeek(day,month,year) {
		var a = Math.floor((14 - month)/12);
		var y = year - a;
		var m = month + 12*a - 2;
		var d = (day + y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + Math.floor((31*m)/12)) % 7;
		
		//return d+1;//makes Sunday = 1, Monday =2 etc.
		return d;
	}
	
	function NthDay(nth,weekday,month,year) {
		var daysofmonth   = new makeArray( 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		var daysofmonthLY = new makeArray( 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		
		//weekday : 1 = Sunday
		if (nth > 0) return (nth-1)*7 + 1 + (7 + weekday - DayOfWeek((nth-1)*7 + 1,month,year)) % 7;
		var days = LeapYear(year) ? daysofmonthLY[month] : daysofmonth[month];
		return days - (DayOfWeek(days,month,year) - weekday + 7)%7;
	}

	function getDSTStart(date) {
		var year = y2k(date.getYear());
		var DSTstart = new Date(year,4-1,NthDay(1,0,3,year),2,0,0);
		return DSTstart;
	}

	function getDSTEnd(date) {
		var year = y2k(date.getYear());
		var DSTend   = new Date(year,10-1,NthDay(-1,0,9,year),2,0,0);
		return DSTend;
	}

	function getMS(d) {
		return Date.UTC(y2k(d.getYear()),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds());
	}

	function GetTimeCode(dtThis) {
		/*
		  some reformating and definition done for clarity
		  this function basically takes the time and adds/subtracts millisecs based on daylight
		  savings time and takes time zones into account (GMT Time / UTC Time)
		  javascript calculates dates offset from 01/01/1970, the playlist
		  bases its timecode from 12/30/1899.
		*/

		//timezoneOffset for PST in ms
		var msSinceEpoch = dtThis.valueOf() - 8 * h2ms(1);
		var DSTOffset = h2m(1);
		var daysSince12301899 = (msSinceEpoch / d2ms(1)) + 25569;
	
		//now move from the GMT to the local
		//change the date slightly so that it is the correct date/time Seattle
		var dtTimeZone = new Date(msSinceEpoch);

		//now adjust for dst
		var DSTstartMS = getMS(getDSTStart(dtTimeZone));
		var DSTendMS = getMS(getDSTEnd(dtTimeZone));
		var selectedMS = getMS(dtTimeZone);

		// were some weird comments here but the DSTOffset is always 1 hour (maybe
		// they were trying to tell if the DSTOffset should be taken into account,
		// but that should be added in or not later, instead)
		DSTOffset = h2d(1);

		//essentially want to change the date slightly so that it is the correct date/time locally
		//the user does not want to play a show starting at the time it was GMT for the local time 
		//he/she selected!
		daysSince12301899 -= ((dtTimeZone.getTimezoneOffset())/(h2m(1) * d2h(1)) - (7/24)); //timezoneOffset is in minutes
		daysSince12301899 += DSTOffset;
	
		return daysSince12301899;
	}

	function csWin(popUrl,popName,w,h,scrollbars,x,y,toolbar,menubar,resizable,status,directories){
		this.popUrl = popUrl;
		this.popName = popName;
		this.w = w ? w : screen.width;
		this.h = h ? h : screen.height;
		this.scrollbars = scrollbars ? 1 : 0;
		this.toolbar = toolbar ? toolbar : 0;
		this.menubar = menubar ? menubar : 0;
		this.resizable = resizable ? resizable : 0;
		this.status = status ? status : 0;
		this.directories = directories ? directories : 0;
		var winl = x ? x : ((screen.width - this.w) / 2);
		var wint = y ? y : ((screen.height - this.h) / 2);
		if (wint < 0) wint = 1;
		if (winl < 0) winl = 0;
		this.popWin = window.open(
			this.popUrl,
			this.popName,
			"top=" + wint + "," +
			"left=" + winl + "," +
			"toolbar=" + this.toolbar.toString() + "," +
			"directories=" + this.directories.toString() + "," +
			"status=" + this.status.toString() + "," +
			"menubar=" + this.menubar.toString() + "," +
			"scrollbars=" + this.scrollbars.toString() + "," +
			"resizable=" + this.resizable.toString() + "," +
			"width=" + this.w.toString() + "," +
			"height=" + this.h.toString()
			);
	}

	//--------------------------------------------------- END KEXP functions
})();