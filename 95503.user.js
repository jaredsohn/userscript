// ==UserScript==
// @name		Harvest Day Timesheet Rounder
// @description	Adds a form to the timesheet view that allows toggling between rounded time and actual time.
// @include     https://*.harvestapp.com/daily
// @include     https://*.harvestapp.com/daily/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @author		Tim DeMoss
// @version		0.1.3
// ==/UserScript==	

// Globals that will be used in several functions

// HTML for our form: A rounding button, select lists for rounding options, an incremental rounding option, and an actual button
var SelectHTMLRoundingStyle = '<div class="customrounder rounderform"><select id="rounding_style" style="width:12em;"><option value="round">Round to nearest</option><option value="ceil" selected>Round up to</option></select>&nbsp;';
var SelectHTMLRoundTo = '<select id="round_to" style="width:4em"><option value="0.1">6</option><option value="0.25" selected>15</option><option value="0.5">30</option></select> minutes</div>';
var CheckboxHTMLIncremental = '<div class="extra_rounding_options customrounder rounderform" style="margin: 5px 0;"><input id="incremental_rounding" name="incremental_rounding" type="checkbox" value="1" checked="checked" /> Use incremental rounding<div class="notes_text">Round each time entry before summing up hours.</div></div>';
var ButtonHTMLRound = '<div class="customrounder rounderform" style="width:150px"><input type="submit" id="roundtimes" value="Round Times"></div>';
var ROUNDINGFORMHTML = SelectHTMLRoundingStyle + SelectHTMLRoundTo + CheckboxHTMLIncremental + ButtonHTMLRound; // Wrapping up our rounding form into one package since the pieces will always be shown together
var ACTUALBUTTONHTML = '<div class="customrounder actualbutton" style="width:150px"><input type="submit" id="actualtimes" value="Actual Times"></div>';

var Rounding = ""; // User's choice of rounding type: round up or round nearest
var RoundTo = 0; // User's choice of rounding increment: 6, 15 or 30 minutes
var UseIncrementalRounding = true;
var aActualTimes = new Object; // An associative array for storing actual times so we can restore them in the view when necessary
var ShowingActuals = true; // Just a tracker to know which state the times are in: rounded or actual

// Need to store these so we can revert back to original colors after highlighting
var TimerBkgdColor = $(".timer").css('background-color');
var TimerTextColor = $(".timer").css('color');
var TotalTextColor = $(".total_amount").css('color');

//This line is to ensure the ready function fires if the back button is used to reach the page
history.navigationMode = 'compatible';

// Do jQuery stuff once the page loads
$(document).ready(function(){
	
	// Add a "Round Times" form (off-state is "Show Actual" button only) when page loads
	// Button/form should not be visible if timer is running
	// Button/form should only be available if there is a visible timer on the timesheet
	if (!isTimerRunning() && $(".timer:visible").length && !$(".rounderform").length) {
		$("#timesheet_top_panel").before(ROUNDINGFORMHTML);
	}

	// When a new timer is started, reset the view
	$("#add_time_link").live('click', function() {
		resetView();
	});

	// When timer is clicked (on or off), reset the view
	$(".timer").live('click', function() {
		resetView();
	});
		
	// Round times on command
	$("#roundtimes").live('click', function() {
		// Store actual times for later retrieval
		aActualTimes = cacheActualTimes();
		
		// Reset rounding preferences
		Rounding = $("#rounding_style option:selected").attr('value'); // User's choice of rounding type: round up or round nearest
		RoundTo = Number($("#round_to option:selected").attr('value')); // User's choice of rounding increment: 6, 15 or 30 minutes
		UseIncrementalRounding = $('#incremental_rounding').is(':checked');
		
		roundTimes();
		ShowingActuals = false;
	});
		
	// Restore actual times on command
	$("#actualtimes").live('click', function() {
		restoreActualTimes(aActualTimes);
		ShowingActuals = true;
		
		//Set form to match current preferences
		setFormPreferences();
	});

});

// I round the time views according to the requested parameters
function roundTimes() {
	var Time = 0.0; // Represents a time entry
	var Total = 0.0; // Represents the total time

	// Show rounded view for each timer entry and get total as we go
	$(".timer:visible").each(function() {
		Time = $(this).text();

		// Add to total before time entry rounding if not using incremental rounding
		if (!UseIncrementalRounding) {
			Total = addTime(Total,Time);
		} else {
			// Round time entry
			Time = roundTime(Time);
			Total = addTime(Total,Time);
		}
		
		// Only need to update time entry if we use incremental rounding
		if (UseIncrementalRounding) {
			$(this).text(Time);
		}
	});
	
	// Round total if not using incremental rounding (otherwise the total is already rounded)
	if (!UseIncrementalRounding) {
		Total = roundTime(Total);
	}
	
	// Show rounded view for total time
	$(".total_amount").text(Total);
	
	setTimerColors('rounded');

	// Swap out the "Round Times" form for the "Actual Times" button
	if ($(".rounderform").length) {
		$(".rounderform").remove();
	}
	if (!$(".actualbutton").length) {
		$("#timesheet_top_panel").before(ACTUALBUTTONHTML);
	}
}

function addTime(Total,Time) {
	var isDecimal = isDecimalTime();
	var TotalHours = 0;
	var TotalMinutes = 0;
	var TimeHours = 0;
	var TimeMinutes = 0;
	var MinutesRemainder = 0;
	
	if (isDecimal) {
		// We should not need to set the total format to two decimal places because roundTime handles that for us.
		// However, let's be anal about it.
		Total = (Number(Total) + Number(Time)).toFixed(2);
	} else {
		// First, let's get integers for our hours and minutes
		TotalHours = parseInt(listFirst(Total,":"),10);
		TotalMinutes = parseInt(listLast(Total,":"),10);
		TimeHours = parseInt(listFirst(Time,":"),10);
		TimeMinutes = parseInt(listLast(Time,":"),10);
		
		//Now add 'em up and carry the minutes if > 60
		TotalHours = TotalHours + TimeHours;
		TotalMinutes = TotalMinutes + TimeMinutes;
		if (TotalMinutes >= 60) {
			MinutesRemainder = TotalMinutes%60;
			if (MinutesRemainder > 0) {
				TotalMinutes = MinutesRemainder;
				TotalHours = TotalHours + 1;
			} else {
				TotalMinutes = 0;
				TotalHours = TotalHours + 1;
			}
		}
		// And finally, we'll return the time as a String, adding leading zero if necessary
		TotalMinutes = String(TotalMinutes);
		if (TotalMinutes.length == 1) {
			TotalMinutes = "0" + TotalMinutes;
		}
		Total = String(TotalHours) + ":" + String(TotalMinutes);
	}
	
	return Total;
}

function roundTime(Time) {
	
	// To avoid math rounding errors, we will NOT convert HH:MM time to decimal and back again.
	// In a future version, we will try to use times from the DB instead of the screen,
	// and can use all decimal math and convert to HH:MM if necessary.
	
	var isDecimal = isDecimalTime();
	var RoundingQuotient = 0;
	var Hours = "";
	var Minutes = "";
	var Remainder = 0;
	var Floor = 0;

	if (isDecimal) {
		RoundingQuotient = Math.round(1/RoundTo); // Conversion of rounding increment to quotient used in math for rounding; must be an integer
		if (Rounding == 'round') {
			Time = (Math.round(Time * RoundingQuotient) / RoundingQuotient).toFixed(2);
		} else {
			Time = (Math.ceil(Time * RoundingQuotient) / RoundingQuotient).toFixed(2);
		}
	} else {
		RoundingQuotient = Math.round(60*RoundTo); // Conversion of rounding increment to quotient used in math for rounding; must be an integer
		// First, let's get integers for our hours and minutes
		Hours = parseInt(listFirst(Time,":"),10);
		Minutes = parseInt(listLast(Time,":"),10);
		// Now get the remainder (modulus)
		Remainder = Minutes%RoundingQuotient;
		// Get the floor of Minutes/RoundTo
		Floor = Math.floor(Minutes/RoundingQuotient);
		if (Rounding == 'round') {
			if (Remainder/RoundingQuotient < 0.5) {
				Minutes = RoundingQuotient * Floor;
			} else {
				Minutes = RoundingQuotient * (Floor + 1);
			}
		} else {
			if (Remainder > 0 || (Hours == 0 && Remainder == 0 && Minutes < RoundingQuotient)) {
				Minutes = RoundingQuotient * (Floor + 1);
			}
		}
		// Now we have to carry the minutes column (so to speak) if Minutes = 60
		if (Minutes == 60) {
			Minutes = 0;
			Hours = Hours + 1;
		}
		// And finally, we'll return the time as a String, adding leading zero if necessary
		Minutes = String(Minutes);
		if (Minutes.length == 1) {
			Minutes = "0" + Minutes;
		}
		Time = String(Hours) + ":" + String(Minutes);
	}
	
	return Time;
}

function restoreActualTimes(aTimes) {
	
	// Update all time displays to original values
	for (var TimerID in aTimes) {
		$("#"+TimerID).text(aTimes[TimerID]);
	}
	
	setTimerColors('actual');

	// Remove "Actual Times" button if it is showing
	if ($(".actualbutton").length) {
		$(".actualbutton").remove();
	}
	// Show the "Round Times" form
	if (!$(".rounderform").length) {
		$("#timesheet_top_panel").before(ROUNDINGFORMHTML);
		
		//Set form to match current preferences
		setFormPreferences();
	}
}

function cacheActualTimes() {
	var aTimes = new Object; // An associative array for storing actual times; we will return this
	var TimerID = ""; // Represents the DOM ID for a timer entry
	var TimerValue = 0.0; // Represents the DOM text/value for a timer entry
	
	// Store the total time information
	aTimes["total_duration"] = $("#total_duration").text();
	
	// Store the time entries' information
	$(".timer").each(function() {
		TimerID = $(this).attr("id");
		TimerValue = $(this).text();
		aTimes[TimerID] = TimerValue;
	});
	
	return aTimes;
}

function isDecimalTime() {
	var TimeText = $("#total_duration").text();
	var isDecimal = true;
	
	if (TimeText.indexOf(":") != -1) {
		isDecimal = false;
	}
	
	return isDecimal;
}

function setFormPreferences() {
	$("#rounding_style").val(Rounding);
	$("#round_to").val(RoundTo);
	$('input[name=incremental_rounding]').attr('checked', UseIncrementalRounding);
}

function resetView() {
	// This restoration may happen microseconds after the timer starts, but rarely will that cause an inaccurate display,
	// and never will it affect the DB storage
	if (!ShowingActuals) {
		restoreActualTimes(aActualTimes);
	}
	// Remove the entire form if the timer is running. Show it if timer is not running and form is not present.
	if (isTimerRunning() && $(".customrounder").length) {
		$(".customrounder").remove();
	} else if (!isTimerRunning() && !$(".customrounder").length) {
		$("#timesheet_top_panel").before(ROUNDINGFORMHTML);
		
		//Set form to match current preferences
		setFormPreferences();
	}
	// Store actual times for later retrieval
	aActualTimes = cacheActualTimes();
}

function isTimerRunning() {
	var TimerIsRunning = false;
	$(".timer").each(function() {
		if ($(this).parent().parent().hasClass('running_timer')) {
			TimerIsRunning = true;
		}
	});
	
	return TimerIsRunning;
}

function setTimerColors(style) {
	
	if (style == 'rounded') {
		// Turn timer red to indicate that rounded times are showing
		$(".timer").css('background-color','red');
		$(".timer").css('color','white');
		$(".total_amount").css('color','red');
	} else if (style == 'actual') {
		// Show original timer colors
		$(".timer").css('background-color',TimerBkgdColor);
		$(".timer").css('color',TimerTextColor);
		$(".total_amount").css('color',TotalTextColor);
	}
}

function listLast(list,delimiter) {
	var aSplitList = new Array();

	aSplitList = String(list).split(delimiter);
	
	return aSplitList[aSplitList.length - 1];
}

function listFirst(list,delimiter) {
	var aSplitList = new Array();

	aSplitList = String(list).split(delimiter);
	
	return aSplitList[0];
}