// ==UserScript==
// @name           Infonet docent rooster export
// @namespace      http://userscripts.org/users/467084
// @version        0.1
// @description    "Exporteert" het docentenrooster naar iCal formaat. Output opslaan als ".ics" bestand en inladen in Outlook. Rooster staat nu in je agenda :)
// @include        https://infonet.hszuyd.nl/view_html.jsp?*content=4782*studyID=I_V*schedule=teacher*teacherID=*
// @match          https://infonet.hszuyd.nl/view_html.jsp?*content=4782*studyID=I_V*schedule=teacher*teacherID=*
// @grant          none
// ==/UserScript==


// global vars something..
var result;
var allApps = new Array();
var thisWeek;
var thisYear;

function getHours() {
  var rosterTable = $("table").filter(function () {
    return $(this).attr("style") == "table-layout:fixed;overflow:hidden;width:577px";
  });
  
  if (!rosterTable.length) {
    return false;
  }

  var hours = rosterTable.children("tbody").children();
  
  hours.each(function(index) {
    if (index == 0 || index == 27) // MAGIC NUMBERS! (first and last row of table)
	  return true;
	
	parseHour($(this));
  });
  
  return true;
}

function parseHour(hour) {
  var cells = hour.children(".schedulecel");
  
  cells.each(function(index) {
    if ($(this).html() == "&nbsp;")
	  return true;
	
    var divWithInfo = $(this).children("div");	
	var classInfo = divWithInfo.html();
	var classInfo = classInfo.split("<br>");
	var period = divWithInfo.attr("id");
	period = period.split("_");
	
	var app = {
	  week: thisWeek,
	  year: thisYear,
	  day: parseInt(period[1]),
	  time: parseInt(period[0]), // THIS IS ZERO BASED. The website fools you by saying 9:00-9:30 = 1, it's 0 in the html..
	  course: classInfo[0].replace("&nbsp;", " "),
	  classes: classInfo[1].replace("&nbsp;", " "),
	  location: classInfo[2].replace("&nbsp;", " "),
	  added: false
	};
	
	allApps.push(app);
  });
};

function buildCal()
{
  for (var i = 0, len = allApps.length; i < len; i++)
  {
    addToCal(allApps[i]);
  }
  // allApps.each(function(index){
    // addToCal($(this));
  // });
  
}

function addToCal(app){
  if (app.added)
    return;

  var endtime = app.time;
  if (app.time < 26) // MAGIC NUMBER! (last "period" in the table)
  {
    // look for other appointments after this one
	// with same day, course, classes
    var linkedApps = allApps.filter(function (s){
      return s.time > app.time && s.day == app.day && s.course == app.course && s.classes == app.classes && !s.added;
    });
	
	if (linkedApps.length)
	{
      for (var i = 0, len = linkedApps.length; i < len; i++)
      {
	    linkedApps[i].added = true;
      }
   
      endtime = linkedApps[linkedApps.length - 1].time;
	}
  }
  app.added = true;
  
  var date = new Date(firstDayOfWeek(app.week, app.year));
  date.setDate(date.getDate() + app.day - 1);
  date.setHours(9 + (app.time/2), (app.time%2==0?0:30));
  var endDate = new Date(date);
  endDate.setHours(9 + ((endtime+1)/2), (endtime%2==1?0:30)); // we need the END of this period, so yeah.. add stuff and calculate differently

  result += "BEGIN:VEVENT\r\n";
  result += "SUMMARY:" + app.course.replace(/,/g, "\\,") + "\r\n";
  result += "DTSTART:" + dateToIcalFormat(date) + "\r\n";
  result += "DTEND:" + dateToIcalFormat(endDate) + "\r\n";
  result += "LOCATION:" + app.location.replace(/,/g, "\\,") + "\r\n";
  result += "DESCRIPTION:" + app.classes.replace(/,/g, "\\,") + "\r\n";
  result += "END:VEVENT\r\n";
}

function setupCal(){
  result = "BEGIN:VCALENDAR\r\n";
  result += "PRODID:-//infonet to ical v0.1//NONSGML Infonet//EN\r\n";
  result += "VERSION:2.0\r\n";
  result += "CALSCALE:GREGORIAN\r\n";
  result += "METHOD:PUBLISH\r\n";
}

function endCal(){
  result += "END:VCALENDAR\r\n";
}

// function to convert week,year to monday of that week
// credits to Kevin Smith, http://stackoverflow.com/questions/7580824/how-to-convert-a-week-number-to-a-date-in-javascript
function firstDayOfWeek(week, year) { 
    if (typeof year !== 'undefined') {
        year = (new Date()).getFullYear();
    }
    var date       = firstWeekOfYear(year),
        weekTime   = weeksToMilliseconds(week),
        targetTime = date.getTime() + weekTime;
    
    return date.setTime(targetTime); 
}

function weeksToMilliseconds(weeks) {
    return 1000 * 60 * 60 * 24 * 7 * (weeks - 1);
}

function firstWeekOfYear(year) {
    var date = new Date();
    date = firstDayOfYear(date,year);
    date = firstWeekday(date);
    return date;
}

function firstDayOfYear(date, year) {
    date.setYear(year);
    date.setDate(1);
    date.setMonth(0);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

function firstWeekday(date) {
    
    var day = date.getDay(),
        day = (day === 0) ? 7 : day;
        
    if (day > 3) {
        var remaining = 8 - day,
            target    = remaining + 1;
        date.setDate(target);
    }
    
    return date;
}

// end function to convert week,year
//

function dateToIcalFormat(date){
  var s = date.getUTCFullYear() + pad(date.getUTCMonth() + 1, 2) + pad(date.getUTCDate(), 2);
  s += "T";
  s += pad(date.getUTCHours(), 2) + pad(date.getUTCMinutes(), 2) + pad(date.getUTCSeconds(), 2);
  s += "Z";
  return s;
}

function pad(num, size){
  var s = "0" + num;
  return s.substr(s.length - size);
}

function startWeek(){
  var weekThing = $("select[name=week] option:selected");
  var weekThing = weekThing.attr("value").split(",");
  thisWeek = weekThing[0];
  thisYear = weekThing[1];
  getHours();
  
  setupCal();
  buildCal();
  endCal();
}

startWeek();
alert(result);
