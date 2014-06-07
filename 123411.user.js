// ==UserScript==
// @name           Google Calendar Time Box Duration
// @namespace      http://userscripts.org/users/121410
// @description    Shows the duration of each event.
// @include        https://www.google.com/calendar*
// ==/UserScript==

var timer;
document.querySelector('#gridcontainer').addEventListener("DOMSubtreeModified",
    function(e)
    {
        window.clearTimeout(timer);
        timer = window.setTimeout(addDuration,500);
    }, false);

function addDuration()
{
    var timeElements = document.querySelectorAll('dl.cbrd dt');
    for (var i in timeElements) {
        var str = timeElements[i].innerHTML || '';
        str     = str.replace(/^(\d{2}:\d{2}) – (\d{2}:\d{2}) (.*?)$/, callbackTimeISO);
        str     = str.replace(/^(\d+)(\:?\d*?)(p?) – (\d+)(\:?\d*?)(p?) (.*?)$/, callbackTimeGoogleAMPM);
        timeElements[i].innerHTML = str;
        window.clearTimeout(timer);
    }
}

function AMPMto24(hour, isPM)
{
    hour = isPM && hour != '12' ? parseInt(hour) + 12 : hour;
    return pad(!isPM ? parseInt(hour) % 12 : hour, 2);
}

function callbackTimeGoogleAMPM(match, startHour, startMinute, startP, endHour, endMinute, endP, extra)
{
    var start = AMPMto24(startHour, startP == 'p');
    start    += startMinute != '' ? startMinute : ':00';
    var end   = AMPMto24(endHour, endP == 'p');
    end      += endMinute != '' ? endMinute : ':00';
    return startHour + startMinute + startP + ' - ' + endHour + endMinute + endP +
            ' (' + calculateDuration(start, end) + ') ' + extra;
}

function callbackTimeISO(match, start, end, extra)
{
    return start + ' - ' + end + ' (' + calculateDuration(start, end) + ') ' + extra;
}

function getTimeDifference(startDate,endDate)
{
    var totalDifference = endDate.getTime() - startDate.getTime();
    var diff            = new Object();
    diff.days           = Math.floor(totalDifference/1000/60/60/24);
    totalDifference    -= diff.days*1000*60*60*24;
    diff.hours          = Math.floor(totalDifference/1000/60/60);
    totalDifference    -= diff.hours*1000*60*60;
    diff.minutes        = Math.floor(totalDifference/1000/60);
    totalDifference    -= diff.minutes*1000*60;
    diff.seconds        = Math.floor(totalDifference/1000);
    return diff;
}

function pad(number, length)
{
    var str = '' + number;
    while (str.length < length)
        str = '0' + str;
    return str;
}

function calculateDuration(startTime,endTime)
{
    var dateString = "2011-11-11T";
    var s          = new Date(dateString+startTime);
    var e          = new Date(dateString+endTime);
    var diff       = getTimeDifference(s,e);
    return  pad(diff.hours,2) + ":" + pad(diff.minutes,2);
}
