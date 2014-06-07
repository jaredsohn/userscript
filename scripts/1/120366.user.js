// ==UserScript==
// @id             achievo-a10838be-1cc9-4f87-ab4a-4ea666cdadc1@scriptish
// @name           AchievoAchiever
// @version        3.6.5
// @namespace      HIS
// @author         condorcet
// @updateURL      http://userscripts.org/scripts/source/120366.user.js
// @installURL     http://userscripts.org/scripts/source/120366.user.js
// @downloadURL    http://userscripts.org/scripts/source/120366.user.js
// @description    Adds a totals row to the weekly favorites view in HIS-Achievo, to see how many hours in total are being booked.
// @include        */dispatch.php?atknodetype=timeregistration.timeregistration&atkaction=timeregistration&subaction=tasks_showfavourite&displayfavourite=*
// @include        */dispatch.php?atknodetype=timeregistration.timeregistration&atkaction=timeregistration&subaction=tasks_showmyprojects*
// @include        */dispatch.php?atknodetype=timeregistration.timeregistration&atkaction=timeregistration&subaction=tasks_showmytasks*
// @include        */dispatch.php?atknodetype=timereg.hours&atkaction=admin&viewuser=*&viewdate=*&weekview=1&only_view=0*
// @include        https://achievo.his.de/dispatch.php
// @run-at         document-end
// @require  	   https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==


	// last changes
	// 1.3   -- Totals row was being put in at wrong location. Totals change to red if too much time selected (more than 12 hours total).
	// 1.4   -- Include URL generalized.
	// 1.5   -- Worked and Remaining rows completed (Worked to be selected by user, Remaining subtracts selected hours from worked hours.)
	//	     -- Missing feature: "bereits gebucht" time currently ignored.... 
	// 1.6   -- Don't check Remaining hours in no Worked hours entered.
	// 1.7   -- Remove helper Comboboxes before submitting, otherwise Achievo gets confused with the unknown form variables.
	// 1.8   -- Also keep track of hours already booked ("bereits gebucht"). Remaining hours select boxes are green if time remains. Remove extra select boxes for weekends.
	//		  UserScript ID changed.
	// 1.9   -- Prevent extra rows from being added more than once, in case the script is executed multiple times.
	// 2.0   -- IE compatible: replaced JavaScript textContent with jquery text(), change calculation used for num_rows in main table.
	//		  Fixed bug in calculation of remaining time.
	// 2.1   -- Minor change for IE: weekend totals weren't removed.
	// 2.2   -- Make previousy entered time easier to see.
	// 2.3   -- Fix major bug in calculating remaining hours. Show remaining hours even when negative (marked red).
	// 2.4   -- Two more IE bugs fixed (upon submitting form with hours). Add standard text ("Bearbeitung") for all descriptions.
	// 2.5   -- Double-click on a row to transfer all available hours for entire week to that row (or vice-versa)
	// 2.6   -- Correction to last change for IE: vice-versa from v2.5 prevented. Also allow resetting of worked hours back to 0.
	// 2.7   -- Activate the description after a double-click to get remaining hours.
	// 2.8   -- Also activate the submit buttons after a double-click to get remaining hours.
	// 2.9   -- Also activate the submit buttons after a double-click to get remaining hours.
	// 3.0   -- Add feature: double click on "bereits gebucht" for one day and transfer hours just for that day.
	// 3.1   -- Use latest 2.7.x minimized version of jQuery
	// 3.1.1 -- Greasemonkey compatibility.
	// 3.2   -- Automatically selected hours/minutes now has same class as manually selected (ie color is blue). Removed debug alerts. Added Meta-urls in UserScript header. Added some "use strict" statements.
	// 3.3   -- Change script startup to match website (for future combination with other scripts).
	// 3.3.1 -- New function to get the displayed Monday.
	// 3.4   -- Added ability to change week with keyboard.
	// 3.4.1 -- Minor bugfixes for change week function.
	// 3.4.2 -- Change on('click', ...) to click()
	// 3.4.3 -- Delete extra rows on click of first submit button rather than second.
	// 3.4.4 -- Disable extra row instead of deleting it (won't be submitted).
	// 3.4.5 -- Add include for Achievo Project page.
	// 3.5   -- Add include for Achievo Tasks page. Also the Booked Hours page (week view), which can be navigated one week back/forth with the keyboard.
	// 3.5.1 -- Fix include page for Achievo Booked Hours.
	// 3.6   -- Add extra rows to Booked Hours page (week view).
	// 3.6.1 -- Add function getAchievoType() to distinguish between Booked Hours view and others (Favorite, etc.).
	// 3.6.2 -- Set var to null instead of delete (Firefox gave error: "applying the 'delete' operator to an unqualified name is deprecated").
	// 3.6.4 -- Bugfixes (missing var's).
	// 3.6.5 -- Bugfixes (Javascript error when no projects on project page).

	"use strict"	

	String.prototype.capitalize = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	function callMethod(method)
	{
		"use strict";
	     method();
	}

	
	function addNewRow(tableId, rowNumCopy, rowInsertSelector, rowNumInsert, insertWhere, newText, bDisabled)
	{	
		// use strict can also be applied to specific funtions!
		//"use strict";
		// prevent the row from being created more than once
		if ($("#" + newText).length > 0)
			return;

		var totalsRow = $(tableId + " tr:eq(" + rowNumCopy + ")").clone();
		
		// saving myself an extra variable (ie before or after)
		if (insertWhere == "insertBefore")
			totalsRow.insertBefore($(tableId + " " + rowInsertSelector + " tr:eq(" + rowNumInsert + ")"));
		else
			totalsRow.insertAfter($(tableId + "  " + rowInsertSelector + " tr:eq(" + rowNumInsert + ")"));						
		
		// just for the booked hours view
		totalsRow.children("th").each(function(){
			if ($(this).text() == "Total")
				$(this).text(newText);
			else
				$(this).text('');
		});		

		newText = newText.replace(" ", "_");

		totalsRow.attr('id', newText);		

		totalsRow.find(':input').attr('name', function(index, name) {
			  return name.replace(/s\[[0-9]+\]\[/, "s[" + newText + "][")});
			  
		totalsRow.find(':input').attr('class', function(index, name) {
			  return name.replace(/s.*/, " weekview_" + newText)});
		
		totalsRow.attr('class', 'task extra');
			  
		if (bDisabled)
			totalsRow.find(':input').attr('disabled', 'disabled');
			  		
		totalsRow.find('.taskname').text(newText.capitalize());
		totalsRow.find('.hisid').text('');
		totalsRow.find('.project').text('');		
		totalsRow = null;
	}


	
	// compare selected values for selectbox pair with expected values, add warning color if necessary
	function checkValues(sb1, val1, sb2, val2)
	{
		"use strict";
		if ((sb1.val() != val1) || (sb2.val() != val2))
		{
			sb1.css("background-color", "red");
			sb2.css("background-color", "red");
		}
		else
		{
			sb1.css("background-color", "");
			sb2.css("background-color", "");
		}
	}
	
	function timeDiff(hours1, min1, hours2, min2)
	{
		var totalMin1 = parseInt(min1);
		var totalMin2 = parseInt(min2);		
		totalMin1 += parseInt(hours1 * 60);
		totalMin2 += parseInt(hours2 * 60);		
		var totalMinDiff = totalMin1 - totalMin2;		
		var retval = new Array();
		retval[0] = parseInt(totalMinDiff / 60, 10);
		retval[1] = parseInt(totalMinDiff % 60, 10);
		return retval;
	}
	
	function updateExtraFields(index)
	{
		var name = $(this).attr('name');
		
		// due to problem with ie
		if (name == undefined)
		{
			return;
		}
		
		var name_length = name.length-1;
		var num = name.substring(name_length-1, name_length);
		
		// remove weekends
		if ((num > 5) && ((name.indexOf("total") != -1) || (name.indexOf("remaining") != -1) || (name.indexOf("worked") != -1)))
		{
			$(this).remove()
		}
		
		var times = $("#result").find("[class*=weekday_" + num + "]").not("[name*=total]");		
		var timesAlreadyBooked = $("#result").find("[class=already_booked_content]");
		
		var minutesSum = 0,
			hoursSum   = 0;
		
		timesAlreadyBooked.each(function() {				
			if (num == this.parentNode.cellIndex)
			{
				// specify base 10
				var addHours = parseInt($(this).text().split(":")[0], 10);			
				var addMinutes = parseInt($(this).text().split(":")[1], 10);
				hoursSum += addHours;
				minutesSum += addMinutes;
				// make easier to see
				if ((addHours > 0) || (addMinutes > 0))
				{
					$(this).css("font-weight", "bold");
					$(this).css("color", "black");
				}
			}		
		});		
		
		times.each(function() {		
			if (this.getAttribute("name").indexOf("minutes") != -1)
				minutesSum += Number($(this).val());
			if (this.getAttribute("name").indexOf("hours") != -1)
				hoursSum += Number($(this).val());		
		});

		hoursSum += parseInt(minutesSum / 60);	
		minutesSum = minutesSum % 60;		

		var hoursTotalSelectBox = $("#result").find('[name="hours[total][' + num + ']"]');
		hoursTotalSelectBox.val(hoursSum);
		var minutesTotalSelectBox = $("#result").find('[name="minutes[total][' + num + ']"]');
		minutesTotalSelectBox.val(minutesSum);
		
		// values from time system (eg HIS QIS)
		var hoursWorked = $("#result").find('[name="hours[worked][' + num + ']"]').val();	
		var minutesWorked = $("#result").find('[name="minutes[worked][' + num + ']"]').val();
		
		var hoursRemainingSelectBox = $("#result").find('[name="hours[remaining][' + num + ']"]');
		var minutesRemainingSelectBox = $("#result").find('[name="minutes[remaining][' + num + ']"]');
		
		var timeRemaining = timeDiff(hoursWorked, minutesWorked, hoursSum, minutesSum);
		var hoursRemaining = timeRemaining[0];
		var minutesRemaining = timeRemaining[1];

		hoursRemainingSelectBox.val(hoursRemaining);
		minutesRemainingSelectBox.val(minutesRemaining);
		
		checkValues(hoursRemainingSelectBox, hoursRemaining, minutesRemainingSelectBox, minutesRemaining);				
		
		if ((hoursRemainingSelectBox.val() > 0) || (minutesRemainingSelectBox.val() > 0))
		{
			hoursRemainingSelectBox.css("background-color", "lightgreen");
			minutesRemainingSelectBox.css("background-color", "lightgreen");
		}
		
		// even if we have too many hours (red), show how many rather than nothing
		hoursRemainingSelectBox.val(Math.abs(hoursRemaining));
		minutesRemainingSelectBox.val(Math.abs(minutesRemaining));
				
		checkValues(hoursTotalSelectBox, hoursSum, minutesTotalSelectBox, minutesSum);	
	}		
	
	function transferRemainingHours(index)
	{
		"use strict";
		var remainingSelectBoxName = $(this).attr('name').replace(/s\[\d*\]\[/, "s[remaining][");
		var remainingSelectBox = $("[name=\"" + remainingSelectBoxName + "\"]");
		// make sure we don't have negative hours			
		var colorCheck = $('<div></div>').css("background-color", "red");
		
		if ((remainingSelectBox.val() > 0) && (colorCheck.css("background-color") != remainingSelectBox.css("background-color")))
		{					
			$(this).val(remainingSelectBox.val());	
			$(this).addClass("input_selected_time");
			// activate the description and submit buttons manually
			$(this).parent().parent().next().next().attr('style', 'display: table-row;');				
			$('.timereg_btn_tmp').attr('class', function(index, name) {
			  return name.replace(/disabled/, "")});
		}
		$('#timereg_btn').attr('class', function(index, name) {
		  return name.replace(/disabled/, "")});		  
	}

// timeouts required for change trigger to take effect
function changeWeek(direction)
{	
	"use strict";

	// for favorites, projects and tasks views
	var bookedHoursView = false;
	var dayField = $("#date\\[day\\]");
	var monthField = $("#date\\[month\\]");
	var yearField = $("#date\\[year\\]");

	// for booked hours view
	if (dayField.length == 0)
	{
		bookedHoursView = true;
		dayField = $("#viewdate\\[day\\]");
		monthField = $("#viewdate\\[month\\]");
		yearField = $("#viewdate\\[year\\]");		
	}
	
	var newDay = parseInt(dayField.val(), 10) + parseInt(7 * parseInt(direction, 10), 10);	
	
	if (newDay < 1)
	{
		// previous month
		var previousDay = parseInt(dayField.val(), 10);
		var newMonth = monthField.val() - 1;
		//unsafeWindow.console.log("newMonth: " + newMonth );
		if (newMonth < 1)
		{
			// previous year
			yearField.val(yearField.val() - 1);
			yearField.trigger("change");		
			newMonth = 12;
		}		
		setTimeout(function() {	
			monthField.val(newMonth);		
			monthField.trigger("change");		
		}, 50);	
		
		setTimeout(function() {	
			var reallyNewDay = parseInt(dayField.children().length, 10) + (newDay);			
			dayField.val(reallyNewDay);
		}, 100);
		
	}		
	else if (newDay > dayField.children().length)
	{
		// next month
		var daysInPrevMonth = parseInt(dayField.children().length, 10);
		var newMonth = parseInt(monthField.val(), 10) + 1;

		if (newMonth == 13)
		{
			// next year
			yearField.val(yearField.val() + 1);
			yearField.trigger("change");		
			newMonth = 1;
		}
		else if (newMonth > monthField.children().length)
		{
			unsafeWindow.console.log("End of time (for Achievo)");
			return;
		}
		setTimeout(function() {	
			monthField.val(newMonth);		
			monthField.trigger("change");
		}, 50);	

		setTimeout(function() {				
			var reallyNewDay = newDay - daysInPrevMonth;
			dayField.val(reallyNewDay);
		}, 100);
	}
	else
	{
		dayField.val(newDay);
	}	
	setTimeout(function() {				
		if (!bookedHoursView)
			AchievoFunctionToChangeDate();
		else
			$("[name=weekview]").submit();
	}, 150);
	
	return;
}

// extracted from timeregistration.js
function AchievoFunctionToChangeDate()
{
	var reloadURL = "";

	if (jQuery("[name=formtype]").val() == "table" || jQuery("[name=formtype]").val() == "week") {
	var dateAttribute = "year-month-day";
	jQuery("#timeregistration .atkdateattribute").each(function() {
	if (jQuery(this).attr("id") == "date[year]") {
		dateAttribute = dateAttribute.replace(/year/, (jQuery(this).val()<10)?"0"+jQuery(this).val():jQuery(this).val());
	}
	if (jQuery(this).attr("id") == "date[month]") {
		dateAttribute = dateAttribute.replace(/month/, (jQuery(this).val()<10)?"0"+jQuery(this).val():jQuery(this).val());
	}
	if (jQuery(this).attr("id") == "date[day]") {
		dateAttribute = dateAttribute.replace(/day/, (jQuery(this).val()<10)?"0"+jQuery(this).val():jQuery(this).val());
	}
	});
		reloadURL = $("#refreshdate").attr("href") + "&filterdate=" + dateAttribute;
	}

	// if a comment field is visible, then we ask. ow not
	if ($("[class=comment]:visible").length > 0)
	{
		if (window.confirm("Eingaben verwerfen und neues Datum laden?")) {
			document.location.href = reloadURL;
		}
	}
	else
	{
		document.location.href = reloadURL;
	}
	return false; 
}

// for favorites, projects and tasks
function startAchievoAchiever()
{	
	"use strict";
	// changing row description will affect code above! TODO: make these global	
	var num_rows = $("#result tr.task").length * 3;  // counting children of tbody didn't work in IE
	
	addNewRow("#result", 3, "tbody", num_rows - 1, "insertAfter", 'total', true);	
	addNewRow("#result", 3, "tbody", 0, "insertBefore", 'worked', false);
	// 4 because worked has been added to beginning
	addNewRow("#result", 4, "tbody", 1, "insertBefore", 'remaining', true);
	
	// for some reason this didn't happen in IE
	if ($.browser.msie)
	{	
		$("#result").find('[name*="total][6]"]').remove();
		$("#result").find('[name*="total][7]"]').remove();
	}
	
	// add standard description
	$("#result").find('[name*="description["]').text('Bearbeitung');
	
	// double click on row description adds all available hours for the entire week to the clicked row
	$("tr.task:not(.extra)").dblclick(function() {
		$(this).find('select:enabled').each(transferRemainingHours);
		$("#result").find('[class*=input_]').each(updateExtraFields);		
	});
	
	// double click on already_booked_content to fill just one day
	$("div.already_booked_content").dblclick(function() {
		var currentTD = $(this).parent();
		var currentTR = currentTD.parent();		
		var index = currentTR.children().index(currentTD);
		currentTR.prev().children().eq(index).find('select:enabled').each(transferRemainingHours);				
		$("#result").find('[class*=input_]').each(updateExtraFields);
	});
		
	// add events
	$("#result").find('[class*=input_]').on('change', updateExtraFields);	
	$("#result").find('[class*=input_]').each(updateExtraFields);
	
	// call this (in case of pre-existing hours)
	updateExtraFields(null);
	
	$(".timereg_btn_tmp").click(function() {
		// disabling this form prevents it from being submitted--which would make acheivo cry
		$("#result").find('[name*="[worked]["]').attr("disabled", "disabled");			
	});

	addKeyboardShortcuts();	
}

function addKeyboardShortcuts()
{
	// keyboard shortcuts
	$('body').keyup(function (e) {		
		var unicode = e.keyCode? e.keyCode : e.charCode;
		switch(unicode)
		{
			// right arrow
			case 39:
				changeWeek(1);
				break;
			// left arrow	
			case 37:
				changeWeek(-1);
				break;			
			default:
				//alert(unicode);
				break;
		}
	});
}

// dd.mm.yy or dd.mm.yyyy
function getMonday()
{	
	"use strict";
	var monday = $(".weekview_date:nth-child(2)").text();
	if (monday.length == 0)
	{
		var containsYear = $(".panelTitleText").text();
		if (containsYear == 0) return null;
		var year = containsYear.split(",")[1].trim();
		var monthDay = $(".recordlist thead .row1 th:nth-child(2)").text().split("(")[1].replace(")", "");
		monthDay = monthDay.split("-");
		var month = monthDay[0];
		var day = monthDay[1];
		return day + "."  + month + "." + year;
	}
	return monday;
}

function startAchievoAchiever_bookedHours()
{
	// use timeout to lose focus from day field at top	
	setTimeout(function() {	
		$("#activitydate\\[day\\]").blur();			
	}, 1000);	
				
	addKeyboardShortcuts();
	
	addNewRow(".recordlist tfoot", 0, "", 0, "insertAfter", "Difference", false);
	addNewRow(".recordlist tfoot", 0, "", 0, "insertAfter", "Total (QIS)", false);			
}

// returns book (favorites, projects, tasks) or booked (booked hours, week view)
function getAchievoType()
{
	var searchQuery = window.location.search;
	var doctitle = document.title;
	var weekviewExists = ($("[name=weekview]").length == 1);
	if (searchQuery.match(/timeregistration/))
	{
		return "book";
	}
	else if ((searchQuery.match(/timereg.hours/) && searchQuery.match(/weekview=1/)) ||
				  ((doctitle == "Achievo - Stunden - Verwalten") && (weekviewExists)))
	{
		return "booked";
	}
}

$(document).ready(function() {
	"use strict";
	var hostName = window.location.hostname;
	
	
	if (hostName.match(/achievo/))
	{
		var achievoType = getAchievoType();
		if (achievoType == "book")
		{
			startAchievoAchiever();
		}
		else if (achievoType == "booked")
		{		
			startAchievoAchiever_bookedHours();				
		}
	}	
});