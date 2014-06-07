// ==UserScript==
// @name        ach.QIS.ition
// @namespace   HIS
// @description Kombiniert Kerngriff mit AchievoAchiever
// @include     */dispatch.php?atknodetype=timeregistration.timeregistration&atkaction=timeregistration&subaction=tasks_showfavourite&displayfavourite=*
// @include     */dispatch.php?atknodetype=timeregistration.timeregistration&atkaction=timeregistration&subaction=tasks_showmyprojects*
// @include     http://qissva*/qisserver/rds?state=sva&moduleParameter=timesheet&next=timesheet/timeSheet.vm&subdir=sva&*
// @include     */dispatch.php?atknodetype=timeregistration.timeregistration&atkaction=timeregistration&subaction=tasks_showmytasks*
// @include     */dispatch.php?atknodetype=timereg.hours&atkaction=admin&viewuser=*&viewdate=*&weekview=1&only_view=0*
// @include     https://achievo.his.de/dispatch.php
// @version     1.2.6
// @require  	https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require  	https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @require  	http://userscripts.org/scripts/source/120366.user.js
// @require  	http://userscripts.org/scripts/source/111730.user.js
// ==/UserScript==

	// last changes
	// 1.0.1 -- Comment out debug log.
	// 1.1   -- Improved retrieval of GM data.
	// 1.2   -- Improve rounding: round up instead of down.
	// 1.2.1 -- Add include for Achievo Project page.
	// 1.2.2 -- Add include for Achievo Tasks and Booked Hours (week view) page -- AchievoAchiever changes.
	// 1.2.3 -- Fix include page for Achievo Booked Hours.
	// 1.2.5 -- Began function computeBookedHours() for dealing with booked hours view.
	// 1.2.6 -- Bugfixes (missing var's).

"use strict"

function datesEqual(a, b)
{
   return (!(a>b || b>a));
}

function fillAchievoFromGM()
{
	var monday = getMonday();
	// remove 20 from year
	monday = monday.replace(".20", ".");
	var mondayParts = monday.split(".");		
	var mondayDay = mondayParts[0];
	var mondayMonth = mondayParts[1];
	var mondayYear = mondayParts[2];
	var mondayDate = new Date("20" + mondayYear, mondayMonth - 1, mondayDay);
	// check that we really have a monday
	if (mondayDate.getDay() != 1)
	{
		unsafeWindow.console.log("Monday is not a Monday!");	
		return 1;
	}
	// loop through this week
	for (var dayCounter = mondayDate; dayCounter.getDay() < 6; dayCounter.setDate(dayCounter.getDate() + 1))
	{
		setTimeForOneDay(dayCounter);
	}
	return;
	
}

function setTimeForOneDay(dateObj)
{
	var curr_date = dateObj.getDate();
    var curr_month = dateObj.getMonth() + 1; //Months are zero based
	var curr_year = dateObj.getYear() - 100;

	if (curr_month < 10) curr_month = "0" + curr_month;
	if (curr_date < 10) curr_date = "0" + curr_date;

	var dateAsString = curr_date + "." + curr_month + "." + curr_year;

	var totalMinutes = GM_getValue(dateAsString);
	var time = minutesToTime(totalMinutes)

	var timeParts = time.split(":");

	// minutes: round up to nearest 15	
	if ((timeParts[1]%15 > 0) || ((timeParts[1] > 0) && (timeParts[1] < 15)))
	{
		timeParts[1] = parseInt(timeParts[1]/15, 10);
		// if remainder, round up -- may need to add an hour
		if (timeParts[1] == 3)
		{
			timeParts[1] = 0;
			timeParts[0]++;
		}
		else
			timeParts[1]++;
	}
	else
	{
		timeParts[1] = parseInt(timeParts[1]/15, 10);
	}

	timeParts[1] *= 15;

	
	var currentHoursField = $('[name="hours[worked][' + dateObj.getDay() + ']"]');
	var currentMinutesField = $('[name="minutes[worked][' + dateObj.getDay() + ']"]');
	
	currentHoursField.val(timeParts[0]);								
	currentMinutesField.val(timeParts[1]);
	currentHoursField.trigger("change");
	currentMinutesField.trigger("change");
	//unsafeWindow.console.log(sortGMValues[i] + " gm value is " + time);		
}

// this is here rather than in AchievoAchiever to have access to timeToMinutes, etc (from Kerngriff)
function computeBookedHours()
{
	$("#Difference").children("th[align=center]").each(function(){
		var currentIndex = $(this).parent().children().index($(this));
		var totalQis = $("#Total_(QIS)").children("th[align=center]").eq(currentIndex).text();
		var totalAchievo = $(".recordlist tfoot .row1:first-child th").eq(currentIndex).text();
		//TODO: FINISH!!!
		//alert($(".recordlist tfoot .row1").html());
		//alert(totalAchievo);		
	});
}

// "main"
$(document).ready(function() {
	
	var hostName = window.location.hostname;
	
	if (hostName.match(/qissva/))
	{
	
	}
	else if (hostName.match(/achievo/))
	{	
		var achievoType = getAchievoType();
		if (achievoType == "book")
		{
			fillAchievoFromGM();
		}
		else if (achievoType == "booked")
		{
			computeBookedHours();
		}
	}
});