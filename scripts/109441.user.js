// ==UserScript==
// @name          GC.com Average Log Length
// @description   Averages the length of all visible logs on the cache page.
// @namespace     rob3k
// @version       1.5
// @license       Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include       http://*.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==

 
// ===============================================================================
// Changelog:
// ===============================================================================
// v 1.5 08/09/2011
// * Added link to load all logs (if not already fully loaded) on results line.
// * Collapsed prior updates into version 1.1
// ===============================================================================
// v 1.1  08/07/2011
// * Moved total logs counted to end of result string.
// * Reworked to strip html tags from log length string count.
// * Updated to include only find and DNF logs in the calculation. (Notes, reviewer notes, etc are excluded.)
// * Longest and shortest log length now links to the log.
// ===============================================================================
// v 1.0  08/07/2011
// * Initial version
// ===============================================================================


function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function getLink(tdElement) {
    var VIEW_EDIT_TITLE = "View / Edit Log / Images";
    var VIEW_TITLE = "View Log";
    var logLink = tdElement.getElementsByTagName("a");
    for (var i = 0; i < logLink.length; i++) {
        if ((logLink[i].getAttribute("title") == VIEW_TITLE) || (logLink[i].getAttribute("title") == VIEW_EDIT_TITLE)) {
            return logLink[i].getAttribute("href");
        }
    }
    //Shouldn't reach this code; return generic link to avoid HTML issues.
    return "http://www.geocaching.com";
}

function get_nextsibling(n)
{
x=n.nextSibling;
while (x.nodeType!=1)
  {
  x=x.nextSibling;
  }
return x;
}

//Initializing values.
var LOG_TABLE_CLASS_NAME = "LogsTable";
var KEY_ID = "ctl00_ContentBody_lblFindCounts";
var DNF_TITLE = 'title="Didn\'t find it"';
var FIND_TITLE = 'title="Found it"';
var OWN_LOG_SUFFIX = "View / Edit Log / Images Upload an Image for this Log ";
var LOG_SUFFIX = "View Log ";

var shortLogHref = "http://www.google.com";
var longLogHref = "http://www.google.com";
var logLength = 0;
var totalLogs = 0;
var longestLog = 0;
var shortestLog = 50000;
var averageLog = 0;

var logTable = document.getElementsByClassName(LOG_TABLE_CLASS_NAME);

var cells = logTable[0].getElementsByTagName("td");
for (var i = 0; i < cells.length; i++) {
    currentLog = cells[i];
    logLength = 0;
    if ((currentLog.className == "Nothing") || (currentLog.className == "AlternatingRow")) { 
 
        var logHtml = currentLog.innerHTML;
        if((logHtml.indexOf(FIND_TITLE) != -1) || (logHtml.indexOf(DNF_TITLE) != -1)) {
            totalLogs++;
            var logText = currentLog.textContent||currentLog.innerText;
            if ((logText.indexOf(")")) != -1) {
                logLength = 0;
                logText = logText.substring(logText.indexOf(")")+1, logText.length);
                if (endsWith(logText, OWN_LOG_SUFFIX)) {
                   logLength = logText.length - OWN_LOG_SUFFIX.length; 
                } else if (endsWith(logText, LOG_SUFFIX)) {
                   logLength = logText.length - LOG_SUFFIX.length; 
                }
                if (logLength > 0) {
                    if (logLength < shortestLog) {
                       shortestLog = logLength;
                       var shortLogHref = getLink(currentLog);
                    }
                    if (logLength > longestLog) {
                       longestLog = logLength;
                       var longLogHref = getLink(currentLog);
                    }
                    averageLog = ((averageLog*i)+logLength)/(i+1);
                }
            }
        }
    }
}

var logLengthDiv = document.createElement('div');
logLengthDiv.setAttribute('id', 'logLengthResult');
logLengthDiv.innerHTML = "<strong>Average Length:</strong> " + Math.round(averageLog*10)/10 + "; <strong>Longest Log:</strong> <a href='" + longLogHref + "' title='Longest Log'>" + longestLog + "</a>; <strong>Shortest Log:</strong> <a href='" + shortLogHref + "' title='Shortest Log'>" + shortestLog + "</a>; <strong>Total logs counted:</strong> " + totalLogs;
var viewAllPara = get_nextsibling(logTable[0]);
var viewAllLink = viewAllPara.getElementsByTagName("a");
//var linkText = viewAllLink[0].textContent||viewAllLink[0].innerText;
if (viewAllLink[0]) {
    var linkText = viewAllLink[0].innerHTML;
    if (linkText.indexOf("View them all") != -1) {
        logLengthDiv.innerHTML = logLengthDiv.innerHTML + "; <a href='" + viewAllLink[0].href + "'>Load all logs</a>";
    }
}

document.getElementById(KEY_ID).appendChild(logLengthDiv); 
