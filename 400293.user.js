// ==UserScript==
// @name       UTSW_WebC_Add_Calendar_To_Schedule
// @namespace  https://plus.google.com/107332279152288777803/
// @version    0.5
// @description  Adds a calendar on top of the schedule
// @match	   http://medschool.swmed.edu/courses/*/schedule.php
// @match      http://medschool.swmed.edu/schedules/ms*-current.php
// @match      http://medschool.swmed.edu/schedules/ms*-entire.php
// @copyright  2014+, Mark Kittisopikul
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

execute(addCalendar);

function addCalendar() {

var calendarCSS = "\
.calendar div.day {\
    display: table-cell;\
    font-size: 90%;\
    width: 20%;\
}\
\
.calendar div.week {\
    display: table-row;\
}\
\
div.calendar {\
    display: table;\
    width: 95%;\
    margin-top: 1em;\
    margin-left: 0.75em;\
    margin-right: 0;\
    margin-bottom: 0.5em;\
    border-color: rgb(149, 179, 214);\
    border-style: solid;\
    border-width: 2px;\
}\
@media only screen and (max-width: 768px) { \
	div.calendar { \
		display: none; \
	}\
}\
\
.calendar div.header {\
    display: table-row;\
}\
\
.calendar .links {\
    display: none;\
}\
\
.calendar .schedule-col2 {\
    margin-left: 6em;\
    padding: 0.2em;\
}\
\
.calendar .day {\
    border-style: solid;\
    border-width: 1px;\
    padding: 2px;\
    border-color: rgb(184, 203, 227);\
}\
\
.calendar .header .day {\
    background-color: rgb(54, 96, 146);\
    color: #ffffff;\
    font-weight: bold;\
    padding-top: 0.5em;\
    padding-bottom: 0.5em;\
    padding-left: 0.75em;\
    padding-right: 0.75em;\
    font-size: 100%;\
}\
\
.calendar .Saturday {\
    display: none;\
}\
\
.calendar .Sunday {\
    display: none;\
}\
\
.calendar div.day.Sunday {\
    display: none;\
}\
\
.calendar div.day.Saturday {\
    display: none;\
}\
\
.calendar div.day td {\
    padding: 0.25em;\
}\
\
.calendar span.label {\
    font-size: 1.2em;\
    font-weight: bold;\
    margin: 0.5px;\
    padding: 0.25em;\
    dipslay: block;\
    width: 100%;\
}\
\
.calendar span.label a {\
    font-weight: bold;\
}\
\
.calendar span.label a:hover {\
    text-decoration: underline;\
}\
\
.calendar .schedule-col1 {\
    width: 6em;\
    padding: 0.25em;\
    margin-right: 0.25em;\
    margin-bottom: 0.25em;\
}\
\
.calendar a {\
    color: #000000;\
    text-decoration: none;\
}\
\
.calendar a:hover {\
    text-decoration: underline;\
}\
.calendar .details {\
	position: absolute;\
	background-color: white;\
	border: solid 1px black;\
	padding: 0.5em;\
	margin-left: 3em;\
}\
";
$('<style type="text/css">' + calendarCSS + '</span>').appendTo('head');

//zero pad numbers between 0 and 99 to two digits
function z(n) {
    var s = n.toString();
    if(n < 10) {
        s = '0' + s;
    }
    return s;
}
function getDateID(date) {
    return 'calendar-day-' + date.getFullYear() + '-' + z(date.getMonth()+1) + '-' + z(date.getDate());
}
var i,j;

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

//encode a date with each date row
$('tr.date b').each( function(i,b) {
    var date = new Date(b.innerHTML);
    $(b).parent().parent().data('date',date);
});

//begin at last Sunday
var begin = new Date($('tr.date').first().data('date'));
begin.setDate(begin.getDate()-begin.getDay());

//end at the last Saturday
var end = new Date($('tr.date').last().data('date'));
end.setDate(end.getDate() + 6 - end.getDay());

//milliseconds per day
//1000 ms/s x 60 s/min x 60 min/hr x 24 hr/day
var ms_per_day = 1000*60*60*24;

var n_weeks = ((end-begin)/ms_per_day + 1)/7;

var calendar = $('<div/>',{class: 'calendar', id: 'calendar'});
var header = $('<div/>',{class: 'header'});

calendar.append(header);
for(i=0; i < weekdays.length; i++) {
    header.append($('<div/>',{class: 'day  ' + weekdays[i],text: weekdays[i]}));
}

//var weeks = new Array(n_weeks);
var weeks = [];
weeks.length = n_weeks;
var dateCursor = new Date(begin);
var day, dayLabel;
var prevMonth = -1;
for(i=0; i < weeks.length; i++) {
    weeks[i] = $('<div/>',{class: 'week'});
    for(j=0; j < weekdays.length; j++) {
        monthLabel = $('<span class="month"> ' + months[dateCursor.getMonth()] + '</span>');
        //if(prevMonth == dateCursor.getMonth()) {
        //    monthLabel.hide();
        //}
        dayLabel = $('<span class="label">'+dateCursor.getDate()+'</span>');
        day =  $('<div/>',{class: 'day  ' + weekdays[j],id: getDateID(dateCursor)});
        dayLabel.append(monthLabel);
        day.append(dayLabel);
        weeks[i].append(day);
        prevMonth = dateCursor.getMonth();
        dateCursor.setDate(dateCursor.getDate() + 1);
    }
    calendar.append(weeks[i]);
}

$('.table-course-schedule').before(calendar);
$('.calendar .week .day').append('<table/>');

$('tr.date').each( function(i,tr) {
    tr = $(tr);
    var events = tr.nextUntil('tr.date').clone();
    var day = $('#' + getDateID(tr.data('date')));
    events.appendTo(day.find('table'));
    day.find('span.label').wrapInner($('<a/>',{href: '#' + tr.find('b').attr('id')}));
});

//remove the lecture id anchors and make the firstlines links to the agenda below
$('.calendar span.firstline').each( function(i,s) {
    s = $(s);
    b = s.find('b[id]');
    if(b.length) {
    	s.wrapInner($('<a/>',{href: '#' +b.attr('id')}));
    	s.parent().prev().wrapInner($('<a/>',{href: '#' +b.attr('id')}));
    	b.removeAttr('id');
    } else if(s.attr('id')) {
        s.wrapInner($('<a/>',{href: '#' +s.attr('id')}));
        s.parent().prev().wrapInner($('<a/>',{href: '#' +s.attr('id')}));
        s.removeAttr('id');
    }
});

//toggle details fade in and out on the calendar
$('.calendar td').hover(function (e) {
    $(e.currentTarget).find('span.details').fadeIn();
},function (e) {
    $(e.currentTarget).find('span.details').fadeOut();
});
}

//add a calendar option in the drop down menu
$('select.dateSelector').prepend($('<option/>',{value: 'calendar',text: 'Calendar'}))