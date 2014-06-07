// ==UserScript==
// @name          gchang's dts portal enhancer
// @namespace     http://www.gchang.com
// @description   Modifies the DTS Online webpage
// @include       http://toudoux:8080/dts/portal
// ==/UserScript==

// v02.00 New

// Get date in this format: yyyy/mm/dd
function getFormattedDate(oDate)
{
    var sDate = "";
    if (oDate)
    {
        var sYear = oDate.getFullYear();
        // add 1 to month because month starts at 0
        var sMonth = oDate.getMonth() + 1;
        // add leading 0 if there is only 1 character
        sMonth = sMonth < 10 ? "0" + sMonth: sMonth;
        var sDay = oDate.getDate();
        sDay = sDay < 10 ? "0" + sDay : sDay;
        
        sDate = sYear + "/" + sMonth + "/" + sDay;
    }
    
    return sDate;
}

// Sets the time portion of a date to 0.
function clearTime(oDate)
{
    if (oDate)
    {
        oDate.setHours(0);
        oDate.setMinutes(0);
        oDate.setSeconds(0);
        oDate.setMilliseconds(0);
    }
    
    return oDate;
}

// Compare oBaseDate with oCompareDate
// Return PAST if oBaseDate is greater than oCompareDate
//        TODAY if oBaseDate is the same as oCompareDate
//        FUTURE is oBaseDate is less than oCompareDate
//        Number of days between oBaseDate and oCompareDate is also given (e.g. PAST 1, meaning 1 day before; FUTURE 2, meaning 2 days later)
function compare(oBaseDate, oCompareDate)
{
    var sResult = "NO DATE";
    
    if (oBaseDate && oCompareDate)
    {
        var nBaseDateTime = oBaseDate.getTime();
        var nCompareDateTime = oCompareDate.getTime();
     
        var nOneDay = 86400000; // 24hr/day * 60min/hr * 60sec/min * 1000msec/sec
        
        // how many days in the past/future?
        // negative: nBaseDateTime is past; positive: nBaseDateTime is future
        var nDayDifference = Math.ceil(nCompareDateTime-nBaseDateTime)/ nOneDay;
        // positive value only
        nDayDifference = Math.abs(nDayDifference);
        
        if (nBaseDateTime > nCompareDateTime)
        {
            sResult = "<font color='red'><b>PAST " + nDayDifference + "</b></font>";
        }
        else if (nBaseDateTime == nCompareDateTime)
        {
            sResult = "<font color='blue'><b>TODAY " + nDayDifference + "</b></font>";
        }
        else if (nBaseDateTime < nCompareDateTime)
        {
            sResult = "<font color='green'><b>FUTURE " + nDayDifference + "</b></font>";
        }
    }
    
    return sResult;
}

// TIMESHEET INPUT
var oNewDateTextbox = document.getElementById("tl_nsp.dts.main.TimesheetSWO::dataMap__timesheet_date__");
if (oNewDateTextbox)
{
    var oCurrentDate = clearTime(new Date());
    
    // Replace content of New Date cell to current date, and comparison textbox date in relation to current date
    var sNewDateValue = oNewDateTextbox.value;
    var oNewDate = clearTime(new Date(sNewDateValue));
    var oNewDateCell = oNewDateTextbox.parentNode.parentNode.previousSibling;
    oNewDateCell.innerHTML = "Current Date: " + getFormattedDate(oCurrentDate) + " - " + compare(oCurrentDate, oNewDate);
}

// Return weekday value of Date in parenthesis.
// e.g. Monday is returned as (1)
function getDay(oDate)
{
    var sDay = "";
    
    if (oDate)
    {
        sDay = "(" + oDate.getDay() + ")";
    }
    
    return sDay;
}

// Increase oDate by one day.
function incrementDate(oDate)
{
    var oNewDate = new Date();
    var nMillisecondsInOneDay = 86400000;
    
    if (oDate)
    {
        oNewDate = new Date(oDate.getTime() + nMillisecondsInOneDay);
    }
    
    return oNewDate;
}

function getDayDisplay(oDate)
{
    var sDisplay = "";
    
    if (oDate)
    {
        sDisplay = oDate.getDate() + " " + getDay(oDate);
    }
    
    return sDisplay;
}

// TIMESHEET VIEW
var oStartDateLabel = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvIndividualApproval__label17");
if (oStartDateLabel)
{
    // Replace "&nbsp;" with space
    var sStartDateLabelValue = oStartDateLabel.innerHTML.replace(/&nbsp;/g, " ");
    
    // monday
    var oMondayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvDirectActivitiesView__label5");
    var oMonday = new Date(sStartDateLabelValue);
    oMondayCell.innerHTML = getDayDisplay(oMonday);
	var oIndirectMondayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvIndirectActivitiesView__label5");
	oIndirectMondayCell.innerHTML = getDayDisplay(oMonday);
    
    // tueday
    var oTuesdayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvDirectActivitiesView__label6");
    var oTuesday = incrementDate(oMonday);
    oTuesdayCell.innerHTML = getDayDisplay(oTuesday);
    var oIndirectTuesdayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvIndirectActivitiesView__label6");
	oIndirectTuesdayCell.innerHTML = getDayDisplay(oTuesday);
	
    // wednesday
    var oWednesdayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvDirectActivitiesView__label7");
    var oWednesday = incrementDate(oTuesday);
    oWednesdayCell.innerHTML = getDayDisplay(oWednesday);
	var oIndirectWednesdayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvIndirectActivitiesView__label7");
	oIndirectWednesdayCell.innerHTML = getDayDisplay(oWednesday);
    
    // thursday
    var oThursdayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvDirectActivitiesView__label8");
    var oThursday = incrementDate(oWednesday);
    oThursdayCell.innerHTML = getDayDisplay(oThursday);
	var oIndirectThursdayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvIndirectActivitiesView__label8");
    oIndirectThursdayCell.innerHTML = getDayDisplay(oThursday);
	
    // friday
    var oFridayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvDirectActivitiesView__label9");
    var oFriday = incrementDate(oThursday);
    oFridayCell.innerHTML = getDayDisplay(oFriday);
	var oIndirectFridayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvIndirectActivitiesView__label9");
	oIndirectFridayCell.innerHTML = getDayDisplay(oFriday);
    
    // saturday
    var oSaturdayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvDirectActivitiesView__label10");
    var oSaturday = incrementDate(oFriday);
    oSaturdayCell.innerHTML = getDayDisplay(oSaturday);
    var oIndirectSaturdayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvIndirectActivitiesView__label10");
	oIndirectSaturdayCell.innerHTML = getDayDisplay(oSaturday);
	
    // sunday
    var oSundayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvDirectActivitiesView__label11");
    var oSunday = incrementDate(oSaturday);
    oSundayCell.innerHTML = getDayDisplay(oSunday);
	var oIndirectSundayCell = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvIndirectActivitiesView__label11");
	oIndirectSundayCell.innerHTML = getDayDisplay(oSunday);
}

// TIMESHEET VIEW

function clearAll()
{
	alert("gchang");
}
if (oStartDateLabel)
{
	var x = document.getElementById("nsp.dts.main.TimesheetSWO::Root:hdvIndividualApproval__label8");

	var newLink = document.createElement("a");
  var linkText=document.createTextNode('Clear');
  newLink.setAttribute('href','clearAll()');

  newLink.appendChild(linkText);

	// button.addEventListener("click", clearAll, false);

	x.appendChild(newLink);

}