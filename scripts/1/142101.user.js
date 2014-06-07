// ==UserScript==
// @name        Rooster HU prettifier
// @namespace   korijn
// @description Maakt de Standaard rooster weergave van de HU rooster website een stuk toegankelijker door er een kalender weergave aan toe te voegen, Google Calendar-style.
// @include     https://www.roosters.hu.nl/*/huc/showtimetable.aspx
// @version     17
// @grant       none
// ==/UserScript==

var addScript = function (src, callback) {
    var script = document.createElement("script");
    script.setAttribute("src", src);
    script.setAttribute("type", "text/javascript");
    script.addEventListener('load', callback, true);
    document.body.appendChild(script);
}

var addScriptAndRun = function (src, callback) {
    var script = document.createElement("script");
    script.setAttribute("src", src);
    script.setAttribute("type", "text/javascript");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

var addStylesheet = function (href, callback) {
    var link = document.createElement("link");
    link.setAttribute("href", href);
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.addEventListener('load', callback, true);
    document.body.appendChild(link);
}

addScript("http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js", function () {

    addStylesheet("http://lauran.amorgen.org/fullcalendar-1.5.3/fullcalendar/fullcalendar.css", function () {

        addScriptAndRun("http://lauran.amorgen.org/fullcalendar-1.5.3/fullcalendar/fullcalendar.js", function () {

            // utility method to retrieve Date from weeknumber
            var w2date = function (year, wn, dayNb) {
                var j10 = new Date(year, 0, 10, 12, 0, 0),
                    j4 = new Date(year, 0, 4, 12, 0, 0),
                    mon1 = j4.getTime() - j10.getDay() * 86400000;
                return new Date(mon1 + ((wn - 1) * 7 + dayNb) * 86400000);
            };

            // utility method
            function isArray(a) {
                return Object.prototype.toString.apply(a) === '[object Array]';
            }

            // some date variables
            var now = new Date();
            var year = now.getFullYear();
            var days = {
                "Maandag": 0,
                "Dinsdag": 1,
                "Woensdag": 2,
                "Donderdag": 3,
                "Vrijdag": 4
            };

            $(document).ready(function () {

                $('body').prepend("<div id='calendar'></div>");

                // data
                var data = {
                    'Opleiding': $(".header-0-0-1").text(),
                    'Groep': $(".header-1-0-1").text(),
                    'Kalenderweek': $(".header-2-0-1").text(),
                    'records': [] // the actual records
                };

                // iterate over tables to extract the records
                var weekStringLength = 0;
		var yearCorrectionDone = false;
                $("table.spreadsheet").each(function () {

                    var $table = $(this);

		    // identify the weeks
                    var weeks = $.trim($table.prev().find("span").text());
                    var weekSeparator = "-";
                    if (weeks.indexOf(weekSeparator) > -1) {
                        weeks = weeks.split(weekSeparator);
			var tempWeeks = [];
			for (var i = parseInt(weeks[0]); i <= parseInt(weeks[1]); i++) {
				tempWeeks.push(i);
			}
			weeks = tempWeeks;
                    } else if (weeks.indexOf(", ") > -1) {
                        weeks = weeks.split(", ");
                    } else if (weeks.indexOf(",") > -1) {
                        weeks = weeks.split(",");
                    }

		    // determine the columns of this table
                    var columns = [];
                    $table.find("tr.columnTitles td").each(function () {
                        var $td = $(this);
                        var columnTitle = $.trim($td.text());
                        columns.push(columnTitle);
                    });

		    // extract the records from the table
                    $table.find("tr:not(tr.columnTitles)").each(function () {
                        var $tr = $(this);
                        var row = {};
                        for (var i = 0; i < columns.length; i++) {
                            row[columns[i]] = $.trim($tr.find("td:eq(" + i + ")").text());
                        }
                        var dayIdx = days[row.Dag];
                        var van = row.Van.split(":");
                        var tot = row.Tot.split(":");
                        row.DateTime = {};

			console.log(weeks);

			// handle a list of weeks and a single week differently
                        if (!isArray(weeks)) {

                            var newWeekStringLength = (weeks.toString()).length;
                            if(weeks[i] == 1) // when the week number changes from 52 to 1 we need to increment the year counter
                                year++;
                            weekStringLength = newWeekStringLength;

                            row.DateTime.Start = w2date(year, weeks, dayIdx);
                            row.DateTime.End = w2date(year, weeks, dayIdx);

			    if(!yearCorrectionDone && now.getMonth() < 6 && row.DateTime.Start.getMonth() >= 6)
			    {
				yearCorrectionDone = true;
				year--;
                        	row.DateTime.Start = w2date(year, weeks, dayIdx);
	                        row.DateTime.End = w2date(year, weeks, dayIdx);
			    }

                            row.DateTime.Start.setHours(van[0], van[1], 0, 0);
                            row.DateTime.End.setHours(tot[0], tot[1], 0, 0);
                            data.records.push(row);
                        } else {
                            for (var i = 0; i < weeks.length; i++) {
                                var tempRow = jQuery.extend(true, {}, row);

                                var newWeekStringLength = (weeks[i].toString()).length;
                                if(weeks[i] == 1) // when the week number changes from 52 to 1 we need to increment the year counter
                                    year++; 
                                weekStringLength = newWeekStringLength;

                                tempRow.DateTime.Start = w2date(parseInt(year), parseInt(weeks[i]), parseInt(dayIdx));
                                tempRow.DateTime.End = w2date(parseInt(year), parseInt(weeks[i]), parseInt(dayIdx));

				if(!yearCorrectionDone && now.getMonth() < 6 && tempRow.DateTime.Start.getMonth() >= 6)
				{
					yearCorrectionDone = true;
					year--;
        	                        tempRow.DateTime.Start = w2date(parseInt(year), parseInt(weeks[i]), parseInt(dayIdx));
	                                tempRow.DateTime.End = w2date(parseInt(year), parseInt(weeks[i]), parseInt(dayIdx));
				}

                                tempRow.DateTime.Start.setHours(van[0], van[1], 0, 0);
                                tempRow.DateTime.End.setHours(tot[0], tot[1], 0, 0);

                                data.records.push(tempRow);
                            }
                        }
                    });
                });

		// sort the found records by start date
                data.records.sort(function (a, b) {
                    var a1 = a.DateTime.Start;
                    var b1 = b.DateTime.Start;
                    if (a1 == b1) {
                        return 0;
                    }
                    return (a1 > b1) ? 1 : -1;
                });

		// add some margin to the bottom of this thing
                $('#calendar').css("margin-bottom", "16px");

		// initialize the calendar plugin
                $('#calendar').fullCalendar({
                    'weekends': false,
                    'header': {
                        'left': 'title',
                        'center': '',
                        'right': 'month,agendaWeek,agendaDay today prev,next'
                    },
                    'defaultView': 'agendaWeek',
                    'allDayDefault': false,
                    'minTime': 7,
                    'maxTime': 23,
                    'axisFormat': 'H:mm',
                    'allDaySlot': false,
                    'timeFormat': 'H:mm{ - H:mm}',
                    'events': function (start, end, callback) {
			// load the extracted events
                        var events = [];
                        for (var i = 0; i < data.records.length; i++) {
                            if (data.records[i].DateTime.Start >= start && data.records[i].DateTime.End <= end) {
                                var lokaal = data.records[i]['Lokaal nr(s)'].split(" ")[0];
                                var title = data.records[i].Opmerkingen + " " + data.records[i].Lesvorm + ", " + lokaal;
                                events.push({
                                    'title': title,
                                    'start': data.records[i].DateTime.Start,
                                    'end': data.records[i].DateTime.End
                                });
                            }
                        }
                        callback(events);
                    },
                    'eventRender': function (event, element, view) {
                        element.prop("title", event.title);
                    }
                });

		// if the first appointment is in the future, go there in the calendar
                if(data.records[0].DateTime.Start > new Date()) {
                    $('#calendar').fullCalendar('gotoDate', data.records[0].DateTime.Start.getFullYear(), data.records[0].DateTime.Start.getMonth(), data.records[0].DateTime.Start.getDate());
                }

            });
        });
    });
});