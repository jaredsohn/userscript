// ==UserScript==
// @name          Date Based Quick Search (mod)       
// @description   Adds a sidebar widget to GMail to allow quick date-based searches
// @author        Arvind Satyanarayan
// @version       1.0 mod
// @license       GPLv3
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @require       http://code.jquery.com/jquery-1.3.2.min.js
// ==/UserScript==

var today = new Date();

var daysInMonth = [31, (checkLeapYear(today.getFullYear()) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Add any other quick searches you'd like to see in the sidebar widget
// Before/After offsets are calculated based off today's date
var dateWidget = [ 
     {'label': 'Yesterday', 'before': -1, 'after': -2}, 
     {'label': 'Seven days ago', 'before': -7, 'after': -8}, 
     {'label': 'Two weeks ago', 'before': -14, 'after': -15},  
     {'label': 'This Week', 'before': 6 - today.getDay(), 'after': -today.getDay()}, 
     {'label': 'Last Week', 'before': -today.getDay(), 'after': -today.getDay() - 7} 
];

if(document.location == top.location){
    (function waitForLoading(){
        var canvasFrame = $("#canvas_frame").contents();
        var tbodyNodes = $("table.cf.nX tbody", canvasFrame);
        if((tbodyNodes.length >= 2) && tbodyNodes.eq(1).find("a[title]").length){
            createDateWidget();
        }else{
            window.setTimeout(waitForLoading, 500);
        }
    })();
}

function createDateWidget() {
    var canvasFrame = $("#canvas_frame").contents();
    var widget = '<div class="CM"></div><div class="LrBjie">';
    widget += '<table cellpadding="0" class="cf nX"><tbody>';
   
    for(var i = 0; i < dateWidget.length; i++) {
        var searchStr = document.location.href;
        searchStr = searchStr.replace(/#.*/, "");
        searchStr += '#search/';
        searchStr += buildSearchStr(dateWidget[i].after, dateWidget[i].before);     
       
        widget += '<tr class="Alfa2e" id=":s4"><td class="nL"></td><td><div class="n2"><div class="nU"><a href="' + searchStr + '" target="_top" title="' + dateWidget[i].label + '" class="n0">' + dateWidget[i].label + '</a></div></div></td></tr>';
    }
   
    widget += '</tbody></table></div>';
   
    $('#:ra > .CM', canvasFrame).before(widget);
}

function checkLeapYear(year) {
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        return true;
       
    return false;
}

function buildSearchStr(after, before) {
    var afterYear, afterMonth, afterDay,
        beforeYear, beforeMonth, beforeDay;
       
    afterYear = beforeYear = today.getFullYear();
    afterMonth = beforeMonth = today.getMonth() + 1;
    afterDay = today.getDate() + after;
    beforeDay = today.getDate() + before;
   
   
    return "after:" + parseDate(afterDay, afterMonth, afterYear) +
            "+before:" + parseDate(beforeDay, beforeMonth, beforeYear);
}

function parseDate(day, month, year) {
    newDay = day;
   
    // If negative
    if(day < 1) {
        --month;
        if(month < 1) {
            --year;
            month = 12;
        }
       
        newDay = daysInMonth[month - 1];
        for(var i = 0; i > day; i--)
            --newDay;
       
        // If we still don't have a valid date, recurse   
        if(newDay < 1)
            parseDate(newDay, month, year);
    }
   
    // Within max day range
    if(day > daysInMonth[month - 1]) {
        newDay = 0;
        for(var i = daysInMonth[month - 1]; i < day; i++)
            ++newDay;
       
        ++month;
        if(month > 12) {
            ++year;
            month = 1;
        }
       
        // If we still don't have a valid date, recurse
        if(newDay > daysInMonth[month - 1])
            parseDate(newDay, month, year);
    }
   
    return year + '/' + month + '/' + newDay;
}