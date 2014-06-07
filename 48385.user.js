// ==UserScript==
// @name                vkiCal
// @namespace           http://userscripts.org/users/ale925
// @description         Создает объект iCalendar на страницах событий ВКонтакте
// @version             1.0
// @author              Alexey Porotnikov
// @include             http://vkontakte.ru/event*
// @filename            vkical.user.js
// @filename-IE         vkical.ieuser.js
// @filename-opera      vkical.js
// @uniquescriptname    vkical
// @license             GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

(function()
{
    if((typeof GM_log) != "undefined") {      // Firefox + Greasemonkey
        my_log = GM_log;
    }
    else if(window.opera) {    // Opera
        my_log = window.opera.postError;
    }
    else if((typeof PRO_log) != "undefined") { // Internet Explorer + IEPro
        my_log = PRO_log;
    }
    else if((typeof console) == "object") { // Google Chrome - Midori
        my_log = console.log;
    }
        
    my_log("vkiCal start with " + window.location.href);

    const rumont = {
        "янв" : "01",
        "фев" : "02",
        "мар" : "03",
        "апр" : "04",
        "мая" : "05",
        "июн" : "06",
        "июл" : "07",
        "авг" : "08",
        "сен" : "09",
        "окт" : "10",
        "ноя" : "11",
        "дек" : "12"
    };

    var summary = '';
    var location = '';
    var description = '';
    var time_start = '';
    var time_end = '';

    var allLabelsTD = document.evaluate("//div[@class='label fl_l']", document, null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for ( var i = 0; i < allLabelsTD.snapshotLength; i++) {
        var dataHTML;
        var thisLink = allLabelsTD.snapshotItem(i);
        var label = thisLink.innerHTML.toString();
        var nes = thisLink.nextElementSibling;
        
        my_log("'" + label + "'");
        switch (label) {
        case "О встрече:":
            if(nes.childNodes[0].nodeName == "#text") {
                dataHTML = nes.innerHTML
            }
            else if(nes.childNodes[0].nodeName == "SPAN"){
                dataHTML = nes.firstElementChild.firstElementChild.nextElementSibling.innerHTML
            }
            else {
                my_log("Error: Unknown construct " + it.innerHTML);
            }
            if (dataHTML) {
                my_log(dataHTML.toString());
                description = dataHTML.toString();
                description = description.replace(/<br>/g, "\\n");
            }
            break;
        case "Место:":
            dataHTML = thisLink.nextElementSibling.firstChild.innerHTML
            if (dataHTML) {
                my_log(dataHTML.toString());
                location = dataHTML.toString();
            }
            break;
        case "Начало:":
            dataHTML = thisLink.nextElementSibling.innerHTML;
            if (dataHTML) {
                my_log(dataHTML.toString());
                time_start = dataHTML.toString();
            }
            break;
        case "Окончание:":
            dataHTML = thisLink.nextElementSibling.innerHTML;
            if (dataHTML) {
                my_log(dataHTML.toString());
                time_end = dataHTML.toString();
            }
            break;
        }
    }

    var summary = document.title;

    var now = new Date();

    // 18 мая 2009 в 19:00
    // сегодня в 22:30
    // завтра в 18:00
    // 18 мая в 19:00
    //вчера?
    var regexp1 = /(\d+) ([^ ]+) (\d\d\d\d)\D+(\d+):(\d+)/;
    var regexp2 = /сегодня\D+(\d+):(\d+)/;
    var regexp3 = /завтра\D+(\d+):(\d+)/;
    var regexp4 = /(\d+) ([^ ]+) \D+(\d+):(\d+)/;
    var oneDayInMs = 1000 * 60 * 60 * 24;
    var start_td, end_td;

    var matches = time_start.match(regexp1);
    if (matches) {// 18 мая 2009 в 19:00
        my_log("SM1 " + matches);
        var month3 = matches[2].substring(0, 3);
        start_td = new Date(matches[3], rumont[month3] - 1, matches[1],
                matches[4], matches[5], 0);
    }
    else {
        var matches2 = time_start.match(regexp2);
        if (matches2) {// сегодня в 22:30
            my_log("SM2 " + matches2);
            var l_year = now.getFullYear();
            var l_month = now.getMonth();
            var l_day = now.getDate();
            start_td = new Date(l_year, l_month, l_day,
                    matches2[1], matches2[2], 0);
        }
        else {
            var matches3 = time_start.match(regexp3);
            if (matches3) {// завтра в 18:00
                my_log("SM3 " + matches3);
                var l_year = now.getFullYear();
                var l_month = now.getMonth();
                var l_day = now.getDate();
                start_td = new Date(l_year, l_month, l_day,
                        matches3[1], matches3[2], 0);
                var dateInMs = start_td.getTime();
                dateInMs += oneDayInMs; 
                start_td.setTime(dateInMs);
            }
            else {
                var matches4 = time_start.match(regexp4);
                if (matches4) {// 18 мая в 19:00
                    my_log("SM4 " + matches4);
                    var l_year = now.getFullYear();
                    var month3 = matches4[2].substring(0, 3);
                    start_td = new Date(l_year, rumont[month3] - 1, matches4[1],
                            matches4[3], matches4[4], 0);
                }
            }
            
        }
    }

    my_log(start_td);

    var year = start_td.getUTCFullYear();
    var month = start_td.getUTCMonth() + 1;
    var day = start_td.getUTCDate();
    var hours = start_td.getUTCHours();
    var mins = start_td.getUTCMinutes();
    var secs = start_td.getUTCSeconds();
    time_start = year + (month < 10 ? '0' + month : month.toString())
            + (day < 10 ? '0' + day : day.toString()) + 'T'
            + (hours < 10 ? '0' + hours : hours.toString())
            + (mins < 10 ? '0' + mins : mins.toString())
            + (secs < 10 ? '0' + secs : secs.toString()) + 'Z';

    my_log(time_start);

    matches1 = time_end.match(regexp1);
    if (matches1) {
        my_log("EM1 " + matches1);
        end_td = new Date(matches1[3], rumont[matches1[2]] - 1, matches1[1],
                matches1[4], matches1[5], 0);
    }
    else {
        var matches2 = time_end.match(regexp2);
        if (matches2) {
            my_log("M2 " + matches2);
            var l_year = now.getFullYear();
            var l_month = now.getMonth();
            var l_day = now.getDate();
            end_td = new Date(l_year, l_month, l_day,
                    matches2[1], matches2[2], 0);
        }
        else {
            var matches3 = time_end.match(regexp3);
            if (matches3) {
                my_log("M3 " + matches3);
                var l_year = now.getFullYear();
                var l_month = now.getMonth();
                var l_day = now.getDate();
                end_td = new Date(l_year, l_month, l_day,
                        matches3[1], matches3[2], 0);
                var dateInMs = end_td.getTime();
                dateInMs += oneDayInMs; 
                end_td.setTime(dateInMs);
            }
        }
    }

    if (typeof end_td == 'undefined') {
        end_td = start_td;
    }

    year = end_td.getUTCFullYear();
    month = end_td.getUTCMonth() + 1;
    day = end_td.getUTCDate();
    hours = end_td.getUTCHours();
    mins = end_td.getUTCMinutes();
    secs = end_td.getUTCSeconds();
    time_end = year + (month < 10 ? '0' + month : month.toString())
            + (day < 10 ? '0' + day : day.toString()) + 'T'
            + (hours < 10 ? '0' + hours : hours.toString())
            + (mins < 10 ? '0' + mins : mins.toString())
            + (secs < 10 ? '0' + secs : secs.toString()) + 'Z';

    // TIMESTAMP (UTC)
    year = now.getUTCFullYear();
    month = now.getUTCMonth() + 1;
    day = now.getUTCDate();
    hours = now.getUTCHours();
    mins = now.getUTCMinutes();
    secs = now.getUTCSeconds();
    timestamp = year + (month < 10 ? '0' + month : month.toString())
            + (day < 10 ? '0' + day : day.toString()) + 'T'
            + (hours < 10 ? '0' + hours : hours.toString())
            + (mins < 10 ? '0' + mins : mins.toString())
            + (secs < 10 ? '0' + secs : secs.toString()) + 'Z';

    // UID
    var uid = 'vkiCal-' + timestamp;

    description = "DESCRIPTION:" + description;
    var crlfIndex = 73;
    while (crlfIndex < description.length) {
        description = description.substring(0, crlfIndex) + "\n "
                + description.substring(crlfIndex);
        crlfIndex += 74;
    }

    description = description.substring(12);

    var cal_string = [ 
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT", 
    "DTSTART:" + time_start,
    "DTEND:" + time_end,
    "SUMMARY:" + summary,
    "LOCATION:" + location, 
    "DESCRIPTION:" + description, 
    "UID:" + uid, 
    "SEQUENCE:0", 
    "DTSTAMP:" + timestamp, 
    "END:VEVENT", 
    "END:VCALENDAR" 
    ].join("\n");

/*    var navOL = document.evaluate("//ol", document, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    var ical_li = document.createElement("li");
    var ical_a = document.createElement("a");
    var ical_text = document.createTextNode("Экспорт в iCal");
    ical_a.href = "data:text/calendar;charset=utf-8,"
        + encodeURIComponent(cal_string);
    ical_a.appendChild(ical_text);
    ical_li.appendChild(ical_a);

    navOL.appendChild(ical_li);*/

    var actions_div = document.evaluate("//div[@class='page_actions']", document, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var ical_a = document.createElement("a");
    var ical_text = document.createTextNode("Экспорт в iCal");
    ical_a.href = "data:text/calendar;charset=utf-8,"
        + encodeURIComponent(cal_string);
    ical_a.appendChild(ical_text);
    actions_div.appendChild(ical_a);
    
})();
