// ==UserScript==
// @id             qissva-54e81bb2-9033-4bfb-b4a2-a2c4aca29357@scriptish
// @name           Kerngriff
// @version        3.6.2
// @namespace      HIS
// @author         condorcet
// @updateURL      http://userscripts.org/scripts/source/111730.user.js
// @installURL     http://userscripts.org/scripts/source/111730.user.js
// @downloadURL    http://userscripts.org/scripts/source/111730.user.js
// @description    Kernzeiteingriffe finden in HIS QIS
// @include        http://qissva*/qisserver/rds?state=sva&moduleParameter=timesheet&next=timesheet/timeSheet.vm&subdir=sva&*
// @run-at         document-end
// @require  	   https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require  	   https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @grant          GM_setValue
// @grant          GM_listValues
// @grant          GM_deleteValue

// ==/UserScript==

	// last changes, starting with 2.0
	// 2.0   -- Started adding general/useful information: day of week, week number, border between weeks
	// 2.1   -- Add jquery, scroll to bottom of page after loading
	// 2.2   -- Fixed counting bug.
	// 2.3   -- After 4 latenesses, color red instead of yellow. Correct font for Mondays. Check for hidden weekends.
	// 2.5   -- Major changes: Show overtime in days, make control panel floatable.
	// 2.6   -- Remove unnecessary javascript from last change (caused error). Use document.ready instead of window.load.
	// 2.7   -- Use latest 2.7.x minimized version of jQuery. "use strict" Javascript. Extracted several functions from checkKernzeitEingriffe().
	// 2.8   -- Add ability to quickly go to next/previous month with keyboard shortcuts.
	// 2.9   -- Add actual hours next to time difference between worked and expected.
	// 2.9.1 -- GreaseMonkey compatibility.
	// 2.9.5 -- Day-of-week information missing for off-days
	// 3.0   -- Float/Scroll checkbox with cookie (jQuery Plugin). Added Urls to meta-info for Greasemonkey, etc. Fixed problem with missing week dividing line for Monday holidays.
	// 3.1   -- Bugfix: parseInt interpreted numbers like 08 as octal, solution: provide second argument (radix 10).
	// 3.1.5 -- Bugfix: Negative hours means negative minutes (error in timeToMinutes).
	// 3.2   -- Replaced Javascript calls to .textContent with jQuery .text() to make IE happy.
	// 3.2.1 -- Replaced Javascript .trim() with jQuery $.trim, again to make IE happy.
	// 3.3   -- Don't count more than one core-time violation on one day.
	// 3.4   -- Change script startup to match website (for future combination with other scripts).
	// 3.4.1 -- Ignore business trips.
	// 3.5   -- New function addMinutesToGreasemonkey can save minutes global via GreaseMonkey(not yet called).
	// 3.5.1 -- Activate addMinutesToGreasemonkey.
	// 3.5.2 -- Don't delete minutes at all.
	// 3.6   -- Remove doctor's visits, sick days and other abscenses from daily total times. Don't remove style tag to make background of rows colored.
	// 3.6.1 -- Fix in checking for doctor's visits, etc.: use trim before checking for blank entries.
	// 3.6.2 -- Add metadata block for @grant.
	
"use strict"

Date.prototype.between = 
function isBetween(start, end)
{
	if ((this > start) && (this < end))
	{
		return true;
	}	
	return false;
}

function isInt(n) {
	return (n % 1 == 0) ||  (n == 0);
}

 Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(),0,1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
    } 

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};
	
function timeToMinutes(time) {
    time = time.split(/:/);
	// negative hours means negative minutes, duh	
	if (time[0].indexOf("-") != -1)
		time[1] = "-" + time[1];		
    var retval = parseInt(time[0], 10) * 60 + parseInt(time[1], 10);	
	return retval;
}

function minutesToTime(minutes) {
	minutes = parseInt(minutes, 10);	
    var hours = parseInt(minutes/60, 10);	
	
	var minutesAlone = minutes%60;
	if (minutesAlone < 10)
		minutesAlone = "0" + minutesAlone
    var retval = hours + ":" + minutesAlone;
	
	return retval;
}

// Soll (stunden) - for one day (not possible for future months)
function getExpectedHours()
{
	// save time on possible second call
	if (getExpectedHours.expectedHours != undefined)
		return getExpectedHours.expectedHours;
	var expectedHours = null;
	$(".sva_zeitform td.grey[align=center][colspan=2]").each(function() {				
		var myParent = $(this).parent();
		
		if (myParent.children().index($(this)) == 2)
		{
			expectedHours = $(this).text(); 
			// this return is for the jquery each funtion!
			return false;
		}
	});
	getExpectedHours.expectedHours = expectedHours;
	return expectedHours; 
}

// returns array (e.g. for GM)
function printActualHours()
{		
	var minutesArray = new Object();
		
	var expectedHours = getExpectedHours();
	var difference = $("td.grey table").find("td[align=right]");
	difference.each(function() {
		var differenceText = $(this).text().replace("+", "");
		var differenceMinutes = timeToMinutes(differenceText);

		// search within this day for missed time:		
		var parentTR = $(this).parent().parent().closest("tr");
		var parentTRClass = parentTR.attr("class");
		if (typeof parentTRClass == 'undefined')
			parentTRClass = "";
		var previousTR = parentTR.prev();
		var timeToSubtract = 0;
		while (previousTR.hasClass(parentTRClass))
		{
			// check for Arztbesuch, etc.
			if ((previousTR.text().indexOf("Arztbesuch") != -1) || (previousTR.text().indexOf("Abwesenheit") != -1))
			{
				var minutesMissing = $.trim(previousTR.children("[colspan=2][align=right]").text());
				if ((typeof minutesMissing != 'undefined') && (minutesMissing != ''))
				{
					timeToSubtract += timeToMinutes(minutesMissing);					
				}
			}
			var previousTR = previousTR.prev();
		} 

		var actualMinutes = timeToMinutes(expectedHours) + differenceMinutes - timeToSubtract;
		var actualTime = minutesToTime(actualMinutes);
		if (timeToSubtract > 0)
			actualTime += "**";
		var newContent = '<td class="grey" align="left" style="padding-top:4px;">&nbsp;(' + actualTime + ')</td>';
		
		// set this for another part of this script to access		
		var date = $(this).closest("table").closest("tr").prevAll(":has(td[colspan=12])").first().children(":first").text();
		
		minutesArray[date] = actualMinutes;		
		
		// insert actual amount
		$(this).parent().closest("td").after(newContent);
		
	});	

	// add notice about time
	$("div.content").children(":last-child").after("<div class=\"sva_note\">** Stunden ohne Artzbesuche usw.</div>");
	
	return minutesArray;
}

function addMinutesToGreasemonkey(minutesArray)
{
	// delete existing GM global values (for some reason only worked with this while loop)	

	if (typeof resetGM_minutes != 'undefined')
	{
		while (GM_listValues().length > 0)
		{
			for (var i = 0; i  < GM_listValues().length; i++)
			{
				GM_deleteValue(GM_listValues()[i]);			
			}
		}	
	}
	
	var length = Object.keys(minutesArray).length;
	
	for (var date in minutesArray) {
		//unsafeWindow.console.log(date + " array value is " + minutesArray[date]);
		GM_setValue(date, minutesArray[date]);
	}		
}

// see http://techwelkin.com/create-floating-bar-like-gmail-and-facebook
function floatControlPanel()
{

	if ($("#my-float-container").length > 0)
		return;
		
	// add css
	$("head").append("<style type=\"text/css\"> \
							#my-float { \
							overflow: hidden; \
							z-index: 1; \
							} \
		#my-float.floating { \
			background-color:#b0c4de; \
			position: fixed; \
			top: 0; \
			box-shadow: 0 4px 2px -1px rgba(0, 0, 0, 0.25); \
			-moz-box-shadow: 0 4px 2px -1px rgba(0, 0, 0, 0.25); \
			-webkit-box-shadow: 0 4px 2px -1px rgba(0, 0, 0, 0.25); \
		} \
	</style> \
	");

	// put element in appropriate div containers -- unfortunately this was the only thing that I could get working
	var elementToFloat = $("th.level1");
	var insertElementText = elementToFloat.html();
	var innerDiv = $("<th class=\"level1\" colspan=\"14\"><div id=\"my-float-container\"><div id=\"my-float\">" + insertElementText + "</div></div></th>");
	elementToFloat.replaceWith(innerDiv);
	
	$(window).scroll( function() { 
		if ($(window).scrollTop() > $('#my-float-container').offset().top) 
			$('#my-float').addClass('floating'); 
		else 
			$('#my-float').removeClass('floating'); 
	});		
}

function changeMonth(direction)
{
	var monthField = $('[name=selectedMonth]');
	var month = monthField.val();
	var newMonth = parseInt(month, 10) + parseInt(direction, 10);
	if ((newMonth == 0) || (newMonth == 13))
	{
		// year change necessary
		var yearField = $('[name=selectedYear]');
		var year = yearField.val();
		var newYear = parseInt(year) + parseInt(direction, 10);
		yearField.val(newYear);
		newMonth = (newMonth) ? 0 : 12;
	}	
	monthField.val(newMonth);
	$('[name=action_showaccount]').click();
}

function convertOvertimeHoursIntoDays()
{
	var expectedHours = getExpectedHours();
	if (expectedHours == null)
		return;
	var expectedMinutes = parseInt(timeToMinutes(expectedHours, 10));
	
	var overtimeTD = $(".level1[colspan=14] tr:last td:last");
	var overtimeMinutes = parseInt(timeToMinutes(overtimeTD.text()), 10);
		
	var exertimeDays = overtimeMinutes / expectedMinutes;
	exertimeDays = exertimeDays.toFixed(2);
	overtimeTD.after('<td>(' + exertimeDays + ' Tagen)</td>');		
}
	
function setupDay(dateField, selectedTime)
{	
	var checkDate = $.trim($(dateField).text());
	
	if (checkDate == "")
		return;
		
	var weekdayNames = new Array("So", "Mo", "Di", "Mi", "Do", "Fr", "Sa");
	var dateParts  = checkDate.split(".");
	var currentDate = new Date("20" + dateParts[2], (dateParts[1] - 1), dateParts[0]); 		
	if (currentDate.toString() != "NaN" && currentDate.toString() != "Invalid Date")
	{			
		// define core times
		checkKernzeitEingriffe.currentDateAsString = currentDate.toDateString() + ' ';				
		var currentWeekday = currentDate.getDay();
		checkKernzeitEingriffe.kernzeitMorgenStart 	= new Date (checkKernzeitEingriffe.currentDateAsString + '9:30');
		checkKernzeitEingriffe.kernzeitMorgenEnd 	= new Date (checkKernzeitEingriffe.currentDateAsString + '12:00');
		// no afternoon core time after October 1, 2011	
		var policyChange = new Date();
		policyChange.setFullYear(2011,9,1);		
		
		// historical core time
		if (currentDate < policyChange)
		{					
			checkKernzeitEingriffe.kernzeitNachmittagStart = new Date (checkKernzeitEingriffe.currentDateAsString + '13:30');					
			
			if (currentWeekday == 5)  // Freitag
			{				
				checkKernzeitEingriffe.kernzeitNachmittagEnd = new Date (checkKernzeitEingriffe.currentDateAsString + '14:30');				
			}
			else
			{
				checkKernzeitEingriffe.kernzeitNachmittagEnd = new Date (checkKernzeitEingriffe.currentDateAsString + '15:00');
			}													
		}				
		
		// order of these two ifs matter
		if ((currentWeekday == 1) || 
		   ((setupDay.previousDate) && (Math.ceil((currentDate.getTime() - setupDay.previousDate.getTime())/(1000*60*60*24)) > 2))) // 1000*60*60*24 is day in milliseconds
		{						
			// Montag OR hidden long weekend (holidays are removed completely!) -- new week starts on day other than monday
			if (selectedTime != null)
				selectedTime.parentNode.parentNode.previousSibling.previousSibling.style.borderTop = "thick solid";						
			$(dateField).text(checkDate + " (KW: " + currentDate.getWeek() + ")");
		}					
		
		if (currentWeekday)
		{		
			var monospacedDay = "<span style=\"font-family:Courier, monospace;font-size:medium\">" + weekdayNames[currentWeekday] + "</span>";			
			dateField.innerHTML = monospacedDay + " " + $(dateField).text();			
		}						
		setupDay.previousDate = currentDate;					
	}		
}	
// days without hours don't have font, day of week missing after checkKernzeitEingriffe()
function addDayOfWeekToMissedDays()
{
	$("tr td[colspan=4]:not(.grey)").each(function(){
		var dateField = this.previousSibling.previousSibling;
				
		if(isInt($(dateField).text()[0]))
		{		
			setupDay(dateField,	null);
		}
	});
}			
	
// todo: use more jquery here, shorten--don't add more!
function checkKernzeitEingriffe()
{		
	var selectedTimes = document.getElementsByTagName("font");
	var count = 0;	
	var previousGehen = null, previousKernzeitEingriff = null, currentKernzeitEingriff = null;
	var previousDateAsString = null, kommen = null, previousKernzeitEingriffDate = null;	
		
	for (var i = 0, max = selectedTimes.length; i < max; i++) 
	{					
		if (selectedTimes[i].className == "sva_grey")
		{		 					
			// get day to check for Fridays
			var dateField = selectedTimes[i].parentNode.parentNode.previousSibling.previousSibling.childNodes[1];

			setupDay(dateField, selectedTimes[i]);
			var currentTime = $(selectedTimes[i]).text();
						
			// abwesend bzw. Zukunft
			if ((currentTime == "0:00") || (currentTime == ""))
			{
				continue;
			}
							
			currentKernzeitEingriff = "";							
			 // even numbers are Kommen
			 if ((i%2) == 0)
			 {
				var kommen = new Date (checkKernzeitEingriffe.currentDateAsString + currentTime);	 
				
				// missed complete morning kernzeit				
				if ((kommen > checkKernzeitEingriffe.kernzeitMorgenEnd) && ((typeof previousDateAsString != 'undefined') && (previousDateAsString != checkKernzeitEingriffe.currentDateAsString)))
				{										
					count = markLine(selectedTimes[i], currentKernzeitEingriff, previousKernzeitEingriff, count);
				}
			 }
			 // odd numbers are Gehen
			 else
			 {			 
				var gehen = new Date (checkKernzeitEingriffe.currentDateAsString + currentTime);
				
				// rule out Arztbesuche, bus. trips
				var text1 = $.trim($(selectedTimes[i].parentNode.parentNode).text());
				var text2 = "", text3 = "";
				if ((i-2 >= 0) && selectedTimes[i-2])
					text2 = $.trim($(selectedTimes[i-2].parentNode.parentNode).text());
					
				if ((i+2 < selectedTimes.length) && selectedTimes[i+2])
					text3 = $(selectedTimes[i+2].parentNode.parentNode).text();
									
				if (((text1.indexOf("Arztbesuch") > 0) || ((text2.indexOf("Arztbesuch") > 0) && (previousGehen = kommen))) ||
					((text1.indexOf("Dienstreise") > 0) || ((text2.indexOf("Dienstreise") > 0) && (previousGehen = kommen))) ||
					(text3.indexOf("Dienstreise") > 0))
				{
					previousGehen = null;
					previousKernzeitEingriff = null; 
					continue;					
				}
				
				// came 9:30 - 12:00
				if (kommen.between(checkKernzeitEingriffe.kernzeitMorgenStart, checkKernzeitEingriffe.kernzeitMorgenEnd))
				{									
					currentKernzeitEingriff = "KM";
				}
				
				// went 9:30 - 12:00
				if (gehen.between(checkKernzeitEingriffe.kernzeitMorgenStart, checkKernzeitEingriffe.kernzeitMorgenEnd))
				{								
					currentKernzeitEingriff = "GM";
				}						
				
				// historic
				if (checkKernzeitEingriffe.kernzeitNachmittagStart != undefined)
				{									
					// came 13:30 - 15:00					
					if (kommen.between(checkKernzeitEingriffe.kernzeitNachmittagStart, checkKernzeitEingriffe.kernzeitNachmittagEnd))
					{				
						currentKernzeitEingriff = "KN";
					}				
					
					// went 13:30 - 15:00
					if (gehen.between(checkKernzeitEingriffe.kernzeitNachmittagStart, checkKernzeitEingriffe.kernzeitNachmittagEnd))
					{					
						currentKernzeitEingriff = "GN";									
					}
				}
				if (currentKernzeitEingriff && (previousKernzeitEingriffDate != checkKernzeitEingriffe.currentDateAsString))
				{														
					//unsafeWindow.console.log(selectedTimes[i]);
					//unsafeWindow.console.log(previousKernzeitEingriff);			  
					count = markLine(selectedTimes[i], currentKernzeitEingriff, previousKernzeitEingriff, count);
					previousKernzeitEingriffDate = checkKernzeitEingriffe.currentDateAsString;
				}	 
			 }
			 previousKernzeitEingriff = currentKernzeitEingriff; 			 
			 previousGehen = gehen;
			 previousDateAsString = checkKernzeitEingriffe.currentDateAsString;			 
		 }		 
	}
	return count;
}

function markLine(selectedTime, currentKernzeitEingriff, previousKernzeitEingriff, count)
{
	if (count < 4)
		selectedTime.parentNode.parentNode.style.backgroundColor = "yellow";
	else
		selectedTime.parentNode.parentNode.style.backgroundColor = "red";
	selectedTime.parentNode.parentNode.style.fontWeight  = "bold";
		
	if (currentKernzeitEingriff == null)
	{
		// special case, e.g. missed complete morning kernzeit
		count++;
		// todo: where to put number?
	}		
	// don't count twice, but marked as red
	else if ((previousKernzeitEingriff == null) || !((currentKernzeitEingriff[1] == previousKernzeitEingriff[1]) && (currentKernzeitEingriff[0] != previousKernzeitEingriff[0])))
	{		
		count++;		
		$(selectedTime.parentNode.parentNode.childNodes[1]).text("#" + count);
	}	
	return count;
}

function flashScreen()
{
	// flash div element over all other elements
	var newdiv = document.createElement('div');
	var style = "visibility:hidden; z-index: 10000;	-moz-opacity: .50; /*older Mozilla*/ opacity: 1;   /*supported by current Mozilla, Safari, and Opera*/	background-color:yellow; position:fixed; top:0px; left:0px; width:100%; height:100%;";
	newdiv.setAttribute('style',style);

	var elem = document.body.appendChild(newdiv);

	setTimeout(function() {
		elem.style.visibility = 'visible';
	}, 300);
	
	setTimeout(function() {
		elem.style.visibility = 'hidden';
	}, 500);
}

function addCheckboxForFloatControlPanel()
{
	// add checkbox
	var extendTD = $(".level1[colspan=14] tr").eq(-2).find("td:last");
	extendTD.after('<td><input id=\"floatControlPanel\" type=\"checkbox\"> Float &amp; Scroll</td>');
	
	// value from cookie
	if ($.cookie('floatControlPanel') == "yes")
	{						
		floatControlPanel();	
		scrollDown();
		$("#floatControlPanel").prop("checked", true); // do this last, as it's otherwise unset
	}	
	$("#floatControlPanel").change(function() {		
		if (this.checked)
		{						
			$.cookie('floatControlPanel', 'yes', { expires: 365, path: '/' });
			floatControlPanel();				
			scrollDown();			
			$("#floatControlPanel").prop("checked", true); // do this here, as it's otherwise unset
		}
		else
		{			
			$.cookie('floatControlPanel', 'no', { expires: 365, path: '/' });	
			location.reload();
		}
	});	
}

function scrollDown()
{	
	$("html, body").stop().delay(1000).animate({ scrollTop: $(document).height() - $(window).height() }, 3000);	
}

function startKernGriff()
{
	convertOvertimeHoursIntoDays();
	var minutesArray = printActualHours();	
	addMinutesToGreasemonkey(minutesArray);
		
	var count = checkKernzeitEingriffe();
	if (count > 0)
	{
		flashScreen();
	}	
	addDayOfWeekToMissedDays();	
	
	if (!$.browser.msie)
		addCheckboxForFloatControlPanel();
		
	// keyboard shortcuts
	$('body').keyup(function (e) {		
		var unicode=e.keyCode? e.keyCode : e.charCode;
		switch(unicode)
		{
			// right arrow
			case 39:
				changeMonth(1);
				break;
			// left arrow	
			case 37:
				changeMonth(-1);
				break;			
			default:
				//alert(unicode);
				break;
		}
	});
}

// "main"
$(document).ready(function() {
	//alert(GM_info["script"]["includes"]);
	
	var hostName = window.location.hostname;
	
	if (hostName.match(/qissva/))
	{
		startKernGriff();
	}
});