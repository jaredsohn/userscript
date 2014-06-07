// ==UserScript==
// @name           Google Calendar from Evite
// @namespace      http://www.indelible.org/
// @description    Replaces the default calendar link in Evite invitations with a Google Calendar link instead.
// @author         Jon Parise
// @version        1.5
// @include        http://www.evite.com/pages/invite/*
// ==/UserScript==

function unwrap(e)
{
    // The desired content may be wrapped in a <div> element.
    var divs = e.getElementsByTagName('div');
    if (divs.length > 0) {
        return divs[0].innerHTML;
    }

    return e.innerHTML;
}

function getMonth(name)
{
    switch (name) {
        case 'January':     return '01';
        case 'February':    return '02';
        case 'March':       return '03';
        case 'April':       return '04';
        case 'May':         return '05';
        case 'June':        return '06';
        case 'July':        return '07';
        case 'August':      return '08';
        case 'September':   return '09';
        case 'October':     return '10';
        case 'November':    return '11';
        case 'December':    return '12';
    }

    return '00';
}

function getDateTime(text)
{
    // e.g. December 31, 7:00PM
    var fields = text.split(' ', 3);

    // e.g. December 31,
    var year = new Date().getUTCFullYear();
    var month = getMonth(fields[0]);
    var day = fields[1].slice(0, -1);

    // e.g. 7:00PM
    var time = fields[2].split(':');
    var hour = parseInt(time[0]);
    var minute = time[1].substr(0, 2);

    // Convert the hour field to 24-hour time if necessary.
    if (hour == 12 && time[1].search(/AM/) != -1) {
        hour = 0;
    } else if (hour < 12 && time[1].search(/PM/) != -1) {
        hour += 12;
    }
    hour = String(hour);

    // Zero-fill the day and hour fields if necessary.
    if (day.length == 1)  day = '0' + day;
    if (hour.length == 1) hour = '0' + hour;

    return [year + month + day, hour + minute + '00'];
}

function parseDates(e)
{
    // e.g. December 31, 7:00PM
    dates = e.innerHTML.match(/(\w+ \d+, )?\d+:\d+(?:AM|PM)/g);

    // We handle events with only a "start" time (in which case the "end" time
    // is set to the start time) or both a explicit "start" and "end" time.
    if (dates.length == 1) {
        dates[0] = getDateTime(dates[0]);
        dates[1] = dates[0];
    } else if (dates.length == 2) {
        // Handle the case where the start and end times are on the same day.
        // Evite only prints the day once in this case, so we borrow the date
        // portion from the start time and prepend it to the end time.
        var dayRE = /\w+ \d+, /;
        if (!dayRE.test(dates[1])) {
            day = dayRE.exec(dates[0]);
            dates[1] = day + dates[1];
        }

        dates[0] = getDateTime(dates[0]);
        dates[1] = getDateTime(dates[1]);

        // Compensate for events spanning the end of the year.
        end = parseInt(dates[1][0]);
        if (end < parseInt(dates[0][0])) {
            end += 10000;
            dates[1][0] = String(end);
        }
    }

    // Lastly, format the UTC dates as Google expects them.
    var start = dates[0][0] + 'T' + dates[0][1];
    var end   = dates[1][0] + 'T' + dates[1][1];

    return [start, end];
}

function parseLocation(e)
{
    var text = unwrap(e);
    text = text.replace(/<br\s*\/?>/gi, ', ');
    text = text.split("\n", 1)[0];

    // Attempt to separate the location string into a place name and an
    // address.  We split the string into comma-delimited parts, and if the
    // first part doesn't start with a number, it is used as the place name.
    //
    // Unfortunately, this fails to work for places whose names start with
    // numbers.  Fixing that probably involves considering the second part and
    // checking if it also starts with a number, in which case the second part
    // is probably the start of the address.  That may be more error prone,
    // however, and the current approach degrades safely.
    parts = text.split(/\s?,\s?/);
    if (parts.length > 1 && parts[0].match(/^\D/)) {
        text = parts.slice(1).join(', ');
        text += ' (' + parts[0] + ')';
    }

    return text;
}

function makeGoogleCalendarLink()
{
    // Event Title
    var title = document.getElementsByTagName('h1');
    if (title) { 
        title = title[0].innerHTML;
    }

    // Event Details
    var detailsIndex = -1, details, loc;
    var whenRE = /When:/, locationRE = /Location:/, phoneRE = /Phone:/;

    var tds = document.getElementsByTagName('td');
    for (var i = 0; i < tds.length; ++i) {
        if (tds[i].className != 'detailsName')
            continue;

        var text = tds[i].innerHTML;
        if (locationRE.test(text)) {
            loc = parseLocation(tds[++i]);
        } else if (whenRE.test(text)) {
            dates = parseDates(tds[++i]);
            detailsIndex = i + 1;
        } else if (phoneRE.test(text)) {
            detailsIndex = i + 2;
        }
    }

    var details = '';
    if (detailsIndex != -1) {
        details = unwrap(tds[detailsIndex]);

        // Trim off any leading whitespace.
        details = details.replace(/^\s*/, '');

        // We need to limit the length of the details string to avoid
        // exceeding the maximum accepted length of the GET request.
        if (details.length > 1000) {
            details = details.substr(0, 1000);
            details += '...';
        }

        // Add some space between the details and the appending Evite link.
        details += "\n\n";
    }
    details += document.location;

    // http://www.google.com/googlecalendar/event_publisher_guide_detail.html
    return 'http://www.google.com/calendar/event' +
        '?action=TEMPLATE&text=' + escape(title) +
        '&dates=' + dates[0] + '/' + dates[1] +
        '&details=' + escape(details) +
        '&location=' + escape(loc) +
        '&trp=true&sprop=website:www.evite.com&sprop=name:Evite';
}

// Find the exsting calendar link element.
var calendarRE = /Calendar/;
var link, links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; ++i) {
    if (calendarRE.test(links[i].innerHTML)) {
        link = links[i];
        break;
    }
}

// Replace the existing link with our Google Calendar link.
if (link) {
    link.innerHTML = 'Add to Google Calendar';
    link.setAttribute('href', makeGoogleCalendarLink());
}
