// Surfblinders
// Ben Younkins
// version 1 RC
//
// ==UserScript==
// @name          Surfblinders
// @description Limits access to useful, but distracting websites
// @namespace LiquidBen.com
// @include       http://*.wikipedia.org/*
// @include       http://*.imdb.com/*
// @include       http://*.amazon.com/*
// ==/UserScript==
//
// ==RevisionHistory==
// version 0.9
// Removed redundant elements from prototype of full extension to create "Lite" version
//
// version 0.91
// folded in iCloak code to add time window control
// ==/RevisionHistory==

(function () { // start encapsulation 
// ********************************************************************************
// The defaults are set for the stereotypical workweek:
//	* 8 AM to 5 PM workday
//	* an hour-long lunchbreak at noon
//	* Workdays are Monday thru Friday
// ********************************************************************************
// YOU CAN EDIT THE NEXT FEW LINES TO CUSTOMIZE FOR YOURSELF! :)
// NOTE:	Hours have to be set in military time: 0 = midnight, 5 = 5 AM, 12 = noon, 18 = 6PM
//		Shifts that cross midnight are okay, ie start at 8PM (20) & end at 5 AM (5)
//		Days are numbered with Sunday = 1, Monday = 2 ... Saturday = 7
//		Shifts that go through the weekend are ok, ie Thursday (5) through Monday (2)
	var day_start 	= 	 8;
	var day_end 	= 	17;
	var break_start = 	12;
	var break_end 	= 	13;
	var first_day 	= 	 2;
	var last_day	=	 6;
// The timeout length is measured in minutes. Decimal amounts are possible, but keep it simple
//	Note: I've arbitrarily capped it at 50400 minutes, or 5 weeks, which is still ridiculously high
	var timeout_length = 10;
// END EDITABLE SECTION
// ********************************************************************************

// ------------------------------------------------------------------------------------------------------------------------------
// Start checking input
// ------------------------------------------------------------------------------------------------------------------------------
	if(day_start == 24)		{day_start = 0;}
	if(day_end == 24) 		{day_end = 0;}
	if(break_start == 24)	{break_start = 0;}
	if(break_end == 24)		{break_end = 0;}
	day_start 	= limitRange(day_start, 0, 23);
	day_end 	= limitRange(day_end, 0, 23);
	break_start = limitRange(break_start, 0, 23);
	break_end	= limitRange(break_end, 0, 23);
	timeout_length = limitRange(timeout_length, 1, 50400);
// ------------------------------------------------------------------------------------------------------------------------------
// Start checking input
// ------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------------
// Start main body
// ------------------------------------------------------------------------------------------------------------------------------
var currentPage = document.URL;
var i = 0;
var j = 0;

var limitInterval = timeout_length * 60000;
var timeNow = new Date();

	var dailySchedule = new Array();
	var workDays = new Array();

	setDailySchedule(dailySchedule, day_start, day_end, break_start, break_end);
	setWorkDays(workDays, first_day, last_day);
		
	var timeNow = new Date();
	var d = timeNow.getDay() + 1;
	var h = timeNow.getHours();
	
	if(workDays[d])
	{ // only fires on work days
		if(dailySchedule[h])
		{ // only fires if hour is "true"ly blocked
			// ========= Payload ===========
			var currentSite = getRoot(currentPage);
			if(currentSite != "-1") // getRoot returns "-1" if it couldn't produce sensisble information
			 { currentSite = "on " + currentSite; } // adding a little grammar never hurt anybody
			else
			 { currentSite = ""; } // cleans up insert if sitename was unretrievable

			if(timeNow - getLastVisit() < limitInterval)
			{
				blockPage();
				var temp = milsecToString(limitInterval - (timeNow - getLastVisit()));
				alert("SURFBLINDERS WARNING:\nYou can't visit this page " + currentSite + " because it is a limited access page.\nLimited access pages are on lockout for another " + temp + ".");
			}
			else
			{
				var temp = milsecToString(limitInterval);
				alert("SURFBLINDERS WARNING:\nThis page on " + currentSite + " is limited access.\nYou will not be able to visit another limited access page for " + temp + ".");
				setLastVisit(timeNow);
			}
			// ========= Payload ===========
		}
		else
		{
			// alert("DEBUG: Surf allowed during off hours");
		}
	}
	else
	{
		// alert("DEBUG: Surf allowed on day off\n Today is: " + d + 1 + " ");
	}
// ------------------------------------------------------------------------------------------------------------------------------
// End main body
// ------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------------
// title: setWorkDays
// input: workDays array (any data already in array will be lost), first_day, last_day
// output: workDays (passed by ref) with individual days marked true/false for work/free
// notes: if workDays is not an array, nothing happens
// 	=dilemma=	An 8 hour workday is described as 8 AM to 5 PM, but no work is done during the 5 PM hour
//			A 5 day workweek is described as Mon thru Fri, and work is done during Friday
// ------------------------------------------------------------------------------------------------------------------------------
function setWorkDays(workDays, first_day, last_day) {
	var i = 0;
	if(workDays.constructor == Array)
	{
		workDays.length = 0; // empty
		for(i = 0; i < 24; i++) { workDays[i] = false; } // initialize
		// true == monitored days, false indicated free days
		i = first_day;
		while(i != last_day)
		{
			workDays[i] = true;
		
			i++;
			if(i == workDays.length) { i = 0 }; // wrap around weekend
		}
		workDays[last_day] = true;
		
	}
}

// ------------------------------------------------------------------------------------------------------------------------------
// title: setDailySchedule
// input: 	dailySchedule array (any data already in array will be lost),
//		 day_start, day_end, break_start, break_end
// output: dailySchedule (passed by ref) with individual hours marked true/false for work/free
// notes: if dailySchedule is not an array, nothing happens
// ------------------------------------------------------------------------------------------------------------------------------
function setDailySchedule(dailySchedule, day_start, day_end, break_start, break_end) {
	var i = 0;
	if(dailySchedule.constructor == Array)
	{
		dailySchedule.length = 0; // empty
		for(i = 0; i < 24; i++) { dailySchedule[i] = false; } // initialize
		// true == monitored time, false indicated free time
		i = day_start;
		while(i != day_end)
		{
			dailySchedule[i] = true;
		
			i++;
			if(i == dailySchedule.length) { i = 0 }; // wrap around midnight
		}
		
		i = break_start;
		while(i != break_end)
		{
			dailySchedule[i] = false;
		
			i++;
			if(i == dailySchedule.length) { i = 0 }; // wrap around midnight
		}
	}
}

// ------------------------------------------------------------------------------------------------------------------------------
// title: limitRange
// input: some number X, lowest desired value, highest desired value
// output: if X falls outside of the range from the lowest to the highest (including the lowest/highest)
//		the output will be whichever of the lowest and highest that comes closest, otherwise the
//		output will be X
// notes: if lowend > highend, then X is returned
// ------------------------------------------------------------------------------------------------------------------------------
function limitRange(X, lowend, highend) {
	if(lowend > highend) { return X; }
	else if(X < lowend) { return lowend; }
	else if(X > highend) { return highend; }
	else { return X; }
}

// ------------------------------------------------------------------------------------------------------------------------------
// title: getRoot
// input: URL string
// output: root of string (foo.com or drive name)
// notes: returns "-1" if unsuccessful
// ------------------------------------------------------------------------------------------------------------------------------
function getRoot(stringToClip) {
	var startClip = "";
	var endClip = "";
	var currentSite = "";
	
	startClip = stringToClip.indexOf("://") + 3;
	endClip = stringToClip.indexOf("/",startClip);
	
	if(endClip != "-1")
	{
		currentSite = stringToClip.slice(startClip, endClip);
		if(currentSite == "" && endClip != "-1")
		{
			startClip = endClip + 1;
			endClip = stringToClip.indexOf("/",startClip);
			
			currentSite = stringToClip.slice(startClip, endClip);
		}
	}
	
	return currentSite;
}

// ------------------------------------------------------------------------------------------------------------------------------
// title: blockPage
// input: none
// output: none
// notes: based on "Invisibility Cloak v0.2" by Gina Trapani  2006-01-03
// ------------------------------------------------------------------------------------------------------------------------------
function blockPage() {
	var pageBody = (document.getElementsByTagName("body")[0]);
		pageBody.setAttribute('style', 'display:none!important');
}

// ------------------------------------------------------------------------------------------------------------------------------
// title: milsecToString
// input: positive integer milliseconds amount
// output: input converted into a string of "X years, Y days, Z hours, I minutes". No decimals, no zero values
// notes: 
// ------------------------------------------------------------------------------------------------------------------------------
function milsecToString(milsec) {
	
	
	var i = 0;
	var currUnit = 0;
	var X = milsec;
	var snippet = "";
	var outString = "";
	
	var unitName = new Array("second", "minute", "hour", "day", "year");
	var conversion = new Array(1000, 60, 60, 24, 365);
	
	for(i = 0; i < conversion.length; i++)
	{	
		snippet = "";
		X = ((X - (X % conversion[i])) / conversion[i]);
		
		if(i != conversion.length - 1)
			{ currUnit = X % conversion[i+1]; }
		else
			{ currUnit = X; }
		
		if(currUnit > 0)
		{
			snippet = currUnit + " " + unitName[i];
			if(currUnit != 1)
			{ snippet += "s"; }
			if(outString != "")
			{ snippet += ", "; }
			outString = snippet + outString;
		}
	}
	
	return outString;
}

// ------------------------------------------------------------------------------------------------------------------------------
// title: getLastVisit
// input: none
// output: stored value for lastVisit
// notes: This is held in its own function for portability when transitioning from a GM script to an extension
// ------------------------------------------------------------------------------------------------------------------------------
function getLastVisit() {
	var lastVisitTime = new Date(GM_getValue("lastVisit", "Fri May 11 2007 12:30:14 GMT-0400 (Eastern Daylight Time)"));
	return lastVisitTime;
}

// ------------------------------------------------------------------------------------------------------------------------------
// title: setLastVisit
// input: lastVisitTime - milliseconds val from getTime
// output: none
// notes: This is held in its own function for portability when transitioning from a GM script to an extension
// ------------------------------------------------------------------------------------------------------------------------------
function setLastVisit(lastVisitTime) {
	if(lastVisitTime.constructor==Date)
	{
		GM_setValue("lastVisit", lastVisitTime.toString());
	}
	else
	{
		GM_setValue("lastVisit", lastVisitTime);
	}
}

})// end encapsulation
();
