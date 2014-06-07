// ==UserScript==
// @name        Kanban Data Report
// @namespace   de.mobile.greasemonkey.jira.kanbandata
// @description Parses the info how long the Jira ticket displayed on the browser stayed in which column of the Kanban board and displays the aggregated data on the "History" tab
// @include     https://jira.corp.mobile.de/jira/browse/*
// @version     6
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

/* ===============
 * Version History
 * ===============
 *
 * v6, 2012-09-12 - added columns for project "MTK"
 */

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
this.$ = this.jQuery = jQuery.noConflict(true);

/* Use this map to define the mapping of Jira ticket states (key) to 
 * your Kanban board's column name and other attributes. The last item
 * for each project's column list should always be the column where tickets
 * go that were successfully completed, otherwise the lead time won't be
 * shown correctly */
var columns = {
    "SDR": {
        "Open": { name: "Preparing", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Assigned": { name: "Preparing (assigned)", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Approved": { name: "Prepared", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "In Progress": { name: "Dev in Progress", stage: "In Progress", cssClass: "kanbanHistoryInProgress" },
        "Review": { name: "QA by Dev", stage: "In Progress", cssClass: "kanbanHistoryInProgress" },
        "Reopened": { name: "QA by Dev (reopened)", stage: "In Progress", cssClass: "kanbanHistoryInProgress" },
        "Resolved": { name: "Ready for QA", stage: "QA", cssClass: "kanbanHistoryQA" },
        "QA": { name: "QA in Progress", stage: "QA", cssClass: "kanbanHistoryQA" },
        "Verified": { name: "Verified", stage: "QA", cssClass: "kanbanHistoryQA" },
        "On Hold": { name: "Ready for Publish", stage: "Done", cssClass: "kanbanHistoryDone" },
        "Done": { name: "Published", stage: "Done", cssClass: "kanbanHistoryDone" },
        "Rejected": { name: "Done (rejected)", stage: "Done", cssClass: "kanbanHistoryRejected" },
        "Closed": { name: "Done", stage: "Done", cssClass: "kanbanHistoryDone" }
    },
    "GOC": {
        "Open": { name: "To Do", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Approved": { name: "To Do", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Assigned": { name: "To Do", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Verified": { name: "To Do", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "On Hold": { name: "To Do", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "In Progress": { name: "In Progress", stage: "In Progress", cssClass: "kanbanHistoryInProgress" },
        "Review": { name: "In Progress", stage: "In Progress", cssClass: "kanbanHistoryInProgress" },
        "Resolved": { name: "QA", stage: "QA", cssClass: "kanbanHistoryQA" },
        "QA": { name: "QA", stage: "QA", cssClass: "kanbanHistoryQA" },
        "Reopened": { name: "Reopened", stage: "In Progress", cssClass: "kanbanHistoryInProgress" },
        "Done": { name: "Done", stage: "Done", cssClass: "kanbanHistoryDone" },
        "Closed": { name: "Done", stage: "Done", cssClass: "kanbanHistoryDone" }
    },
    "SOS": {
        "Open": { name: "Idea", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Vision Ongoing": { name: "Vision Ongoing", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Vision Done": { name: "Vision Done", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Envision Ongoing": { name: "Envisioning Ongoing", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Envision Done": { name: "Envisioning Done", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Development": { name: "Development", stage: "In Progress", cssClass: "kanbanHistoryInProgress" },
        "Cancelled": { name: "Cancelled", stage: "Done", cssClass: "kanbanHistoryRejected" },
        "Closed": { name: "Live to Site", stage: "Done", cssClass: "kanbanHistoryDone" }
    },
    "MTK": {
        "Open": { name: "Vision Ongoing", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Vision Done": { name: "Vision Done", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Envision Done": { name: "Ready for Dev", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Development": { name: "Development", stage: "In Progress", cssClass: "kanbanHistoryInProgress" },
        "Verified": { name: "LTS / To Be Validated", stage: "Done", cssClass: "kanbanHistoryDone" },
        "Cancelled": { name: "Cancelled", stage: "Done", cssClass: "kanbanHistoryRejected" },
        "Closed": { name: "Validated = Closed", stage: "Done", cssClass: "kanbanHistoryDone" }
    },
    "Default": {
        "Open": { name: "Open", stage: "Open", cssClass: "kanbanHistoryOpen" },
        "Assigned": { name: "Assigned", stage: "In Progress", cssClass: "kanbanHistoryInProgress" },
        "In Progress": { name: "In Progress", stage: "In Progress", cssClass: "kanbanHistoryInProgress" },
        "Resolved": { name: "Resolved", stage: "QA", cssClass: "kanbanHistoryQA" },
        "Reopened": { name: "Reopened", stage: "In Progress", cssClass: "kanbanHistoryInProgress" },
        "Closed": { name: "Closed", stage: "Done", cssClass: "kanbanHistoryDone" }
    }
};

/* A status for tickets that are not going to go live (e.g. rejected or cancelled).
 * All Kanban history events after this status will be colored gray to 
 * indicate that they are irrelevant */
var rejectedStatus = {
    "SDR": "Rejected",
    "MTK": "Cancelled",
    "SOS": "Cancelled"
};

$(document).ready(function() {
    
    /* only display the Kanban History if the activity tab "History" is active */
    if (!$("#changehistory-tabpanel").hasClass("active")) return;
    
    /* parse the ticket's key and the Jira project ID from the HTML code of the page */
    var key = $("#key-val").text().trim();
    var project = key.substring(0, key.indexOf("-"));
    var summary = $("#issue_header_summary a").text().trim();
    var type = $("#type-val").text().trim();
    
    /* find the column definitions for this project, use "Default" if none are found */
    var projectColumns = columns[project] == undefined ? columns["Default"] : columns[project];
    
    /* set CSS styles */
    addCss(".kanbanHistoryOpen { background-color: rgba(255, 0, 0, 0.2); }");
    addCss(".kanbanHistoryInProgress { background-color: rgba(255, 127, 0, 0.2); }");
    addCss(".kanbanHistoryQA { background-color: rgba(255, 255, 0, 0.2); }");
    addCss(".kanbanHistoryDone { background-color: rgba(0, 255, 0, 0.2); }");
    addCss(".kanbanHistoryRejected { background-color: rgba(127, 127, 127, 0.2); color: #999; font-style: italic; }");
    addCss(".kanbanHistoryOpenTotal { background-color: rgba(255, 0, 0, 0.4); }");
    addCss(".kanbanHistoryInProgressTotal { background-color: rgba(255, 127, 0, 0.4); }");
    addCss(".kanbanHistoryQATotal { background-color: rgba(255, 255, 0, 0.4); }");
    addCss(".kanbanHistoryDoneTotal { background-color: rgba(0, 255, 0, 0.4); }");
    addCss(".kanbanHistoryLeadTime { background-color: rgba(0, 255, 0, 1); font-weight: bold; }");
    addCss(".kanbanHistoryLeadTimeNA { background-color: rgba(127, 127, 127, 0.4); color: #999; font-style: italic;  }");
    addCss("#kanbanHistory h3 span { font-weight: normal;  }");
    addCss("#kanbanHistory table { width: 600px; }");
    addCss("#kanbanHistory table th { width: 33%; }");
    
    /* create list of history events (when the ticket changed 
     * into which column and how long it stayed there) by parsing
     * the list of events on the "history" tab */
    var history = [], isRejected = false, rejectionCause = undefined;
    var created = findDate("#create-date");
    history.push({ date: created, column: getColumn(projectColumns, "Open") })
   
    $("div[id^=changehistory-]").each(function() {
        var historyId = $(this).attr("id").substr($(this).attr("id").indexOf("-") + 1);
        $("#changehistory_" + historyId).find("td.activity-name").each(function() {
            var activity = $(this).text().trim();
            if (activity == "Status") {
                var changed = findDate("#changehistorydetails_" + historyId);
                var status = $(this).siblings("td.activity-new-val").contents().filter(function() {
                  return this.nodeType == 3;
                }).text().trim();
                if (status == rejectedStatus[project]) {
                    isRejected = true;
                }
                if (status == "Reopened") {
                    isRejected = false;
                    rejectionCause = undefined;
                }
                var column = getColumn(projectColumns, status);
                history.push({ date: changed, column: { name: column.name, stage: column.stage, cssClass: column.cssClass }})
            }
            
            /* display history events as gray if there was a resolution
             * other than fixed (for tickets that were rejected and projects
             * that don't have a particular column defined for this) */
            if (activity == "Resolution") {
                var resolution = $(this).siblings("td.activity-new-val").contents().filter(function() {
                  return this.nodeType == 3;
                }).text().trim();
                if (resolution != "" && resolution != "Fixed/Completed") {
                    isRejected = true;
                    rejectionCause = resolution;
                    history[history.length - 1].column.name += " / " + resolution;
                }
            }
            
            if (isRejected && (activity == "Status" || activity == "Resolution")) {
                history[history.length - 1].column.cssClass = "kanbanHistoryRejected";
            }
        });
    });
    
    /* calculate summary values */
    var totalOpen = 0, totalInProgress = 0, totalQA = 0, totalDone = 0, maxDuration = 0;
    $.each(history, function(index, value) {
        if (index < history.length - 1) {
            value.duration = history[index + 1].date.getTime() - value.date.getTime();
            switch (value.column.stage) {
                case "Open":
                    totalOpen += value.duration;
                    if (totalOpen > maxDuration) maxDuration = totalOpen;
                    break;
                case "In Progress":
                    totalInProgress += value.duration;
                    if (totalInProgress > maxDuration) maxDuration = totalInProgress;
                    break;
                case "QA":
                    totalQA += value.duration;
                    if (totalQA > maxDuration) maxDuration = totalQA;
                    break;
                case "Done":
                    totalDone += value.duration;
                    if (totalDone > maxDuration) maxDuration = totalDone;
                    break;
            }
        }
    });
    
    /* set the width of the duration bars */
    var barWidth = 100;
    $.each(history, function(index, value) {
        if (value.duration == undefined) return;
        value.width = Math.ceil(value.duration / maxDuration * barWidth);
    });
    
    /* determine if the ticket is done by finding the name of the last Kanban column
     * and comparing it to the last entry in the history */
    var lastColumnName = "";
    for (i in projectColumns) lastColumnName = projectColumns[i].name;
    var isDone = history[history.length - 1].column.name == lastColumnName;

    /* build the table with history items */
    var div = $("<div id=\"kanbanHistory\" class=\"issue-data-block\"></div>").prependTo("#issue_actions_container");
    var current = history[history.length - 1].column;
    var h3 = $(
        "<h3>Kanban History " + key + " - " +
        "<span>Current Column: <span class=\"" + current.cssClass + "\">" + 
        current.name  + 
        (rejectionCause != undefined && !endsWith(current.name, rejectionCause) ? " / " + rejectionCause : "") +
        "</span></span></h3>").appendTo(div);
    var table = $("<table></table>").appendTo(div);
    var thead = $("<thead></thead>").appendTo(table);
    var trHead = $("<tr></tr>").appendTo(thead);
    $("<th>Date / Time</th>").appendTo(trHead);
    $("<th>Column</th>").appendTo(trHead);
    $("<th>Duration</th>").appendTo(trHead);
    var tbody = $("<tbody></tbody>").appendTo(table);
    $.each(history, function(index, value) {
        var tr = $("<tr class=\"" + value.column.cssClass + "\"></tr>").appendTo(tbody);
        $("<td>" + formatDate(value.date) + "</td>").appendTo(tr);
        $("<td>" + value.column.name + "</td>").appendTo(tr);
        var td = $("<td>" + (value.duration > 0 ? " " + formatDuration(value.duration) : "") + "</td>").appendTo(tr);
        if (value.width != undefined && value.width > 0) {
            td.css("background-image", "-moz-linear-gradient(left, rgba(0, 0, 0, 0.2) "+ value.width + "%, rgba(0, 0, 0, 0) "+ value.width + "%)");
        }
    });
    
    var leadTime = isDone && !isRejected ? totalInProgress + totalQA + totalDone : -1;
    
    /* build the table with summary items */
    var summaries = [
        { label: "Total \"Open\”: ", value: totalOpen, cssClass: "kanbanHistoryOpenTotal", width: totalOpen > 0 ? Math.ceil(totalOpen / maxDuration * barWidth) : undefined },
        { label: "Total \"In Progress\”: ", value: totalInProgress, cssClass: "kanbanHistoryInProgressTotal", width: totalInProgress > 0 ? Math.ceil(totalInProgress / maxDuration * barWidth) : undefined },
        { label: "Total \"QA\”: ", value: totalQA, cssClass: isRejected ? "kanbanHistoryLeadTimeNA" : "kanbanHistoryQATotal", width: totalQA > 0 ? Math.ceil(totalQA / maxDuration * barWidth) : undefined },
        { label: "Total \"Done\”: ", value: totalDone, cssClass: isRejected ? "kanbanHistoryLeadTimeNA" : "kanbanHistoryDoneTotal", width: totalDone > 0 ? Math.ceil(totalDone / maxDuration * barWidth) : undefined },
        { label: "Lead time: ", value: leadTime, cssClass: isDone && !isRejected ? "kanbanHistoryLeadTime" : "kanbanHistoryLeadTimeNA" }
    ];
    $.each(summaries, function(index, item) {
        if (item.value != 0) {
            var tr = $("<tr class=\"" + item.cssClass + "\"></tr>").appendTo(tbody);
            $("<th></th>").appendTo(tr);
            $("<th>" + item.label + "</th>").appendTo(tr);
            var td = $("<td>" + formatDuration(item.value) + "</td>").appendTo(tr);
            if (item.width != undefined && item.width > 0) {
                td.css("background-image", "-moz-linear-gradient(left , rgba(0, 0, 0, 0.2) "+ item.width + "%, rgba(0, 0, 0, 0) "+ item.width + "%)");
            }
        }
    });
    
    /* find out when the ticket was first moved to each stage */
    var devStartDate = undefined, qaStartDate = undefined, doneStartDate = undefined, currentStage = undefined;
    $.each(history, function(index, item) {
        if (item.column.stage == "In Progress" && devStartDate == undefined) {
            devStartDate = item.date;
        }
        if (item.column.stage == "QA" && qaStartDate == undefined) {
            qaStartDate = item.date;
        }
        if (item.column.stage == "Done" && doneStartDate == undefined) {
            doneStartDate = item.date;
        }
        currentStage = item.column.stage;
    });
    
    /* find out when the ticket was closed */
    var closedDate = isDone ? history[history.length - 1].date : undefined;
    
    if (isDone) currentStage = "Closed";
    
    /* send the data to the Kanban Data Digester webapp for storing in a local database */
    $.ajax({
        url: "http://localhost:8080/kanban-data-digester/",
        data: {
            jiraKey: key,
            project: project,
            summary: summary,
            ticketType: type,
            created: created.getTime(),
            startDev: devStartDate ? devStartDate.getTime() : -1,
            startQA: qaStartDate ? qaStartDate.getTime() : -1,
            startDone: doneStartDate ? doneStartDate.getTime() : -1,
            closed: closedDate ? closedDate.getTime() : -1,
            totalOpen: devStartDate ? totalOpen : -1,
            totalDev: qaStartDate ? totalInProgress : -1,
            totalQA: doneStartDate ? totalQA : -1,
            totalDone: closedDate ? totalDone : -1,
            leadTime: leadTime,
            currentStage: currentStage,
            rejected: isRejected,
            rejectionCause: rejectionCause
            
        }
    });


});

function endsWith(haystack, needle) {
    return haystack.substring(haystack.length - needle.length) == needle;
}

function getColumn(projectColumns, status) {
    if (projectColumns[status] == undefined) console.log("Unknown status \”" + status + "\" - cannot map to any Kanban column");
    return projectColumns[status] == undefined ? { name: "Unknown (status \"" + status + "\")", stage: "", cssClass: "" } : projectColumns[status];
}

function findDate(selector) {
    var dateStr = $(selector).find("time").attr("datetime");
    var year = dateStr.slice(0, 4);
    var month = dateStr.slice(5, 7);
    var day = dateStr.slice(8, 10);
    var hours = dateStr.slice(11, 13);
    var minutes = dateStr.slice(14, 16);
    return new Date(year, month - 1, day, hours, minutes, 0);
}

function formatDate(dateStr) {
    var year = dateStr.getFullYear();
    var month = addZero(dateStr.getMonth() + 1);
    var day = addZero(dateStr.getDate());
    var hours = addZero(dateStr.getHours());
    var minutes = addZero(dateStr.getMinutes());
    return day + "." + month + "." + year + " " + hours + ":" + minutes;
}

function addZero(number) {
    var str = String(number);
    return str.length == 1 ? "0" + str : str;
}

function formatDuration(ms) {
    if (ms == -1) return "n/a";
    var d = getDaysFromMs(ms);
    var h = getHoursFromMs(ms);
    var m = getMinutesFromMs(ms);
    var s = getSecondsFromMs(ms);
    var sb = "";
    if (d > 0) sb += d + "d";
    if (h > 0) {
        if (sb.length > 0) sb += " ";
        sb += h + "h";
    }
    if (m > 0) {
        if (sb.length > 0) sb += " ";
        sb += m + "m";
    }
    if (s > 0) {
        if (sb.length > 0) sb += " ";
        sb += s + "s";
    }
    if (sb.length == 0) {
        sb = "0s";
    }
    return sb;
}

function getDaysFromMs(ms) {
    return Math.floor(ms / 86400000);
}

function getHoursFromMs(ms) {
    return Math.floor((ms % 86400000) / 3600000);
}

function getMinutesFromMs(ms) {
    return Math.floor(((ms % 86400000) % 3600000) / 60000);
}

function getSecondsFromMs(ms) {
    return Math.floor((((ms % 86400000) % 3600000) % 60000) / 1000);
}


function addCss(css) {
    var newCss = document.createElement("style");
    newCss.type = "text/css";
    newCss.innerHTML = css;
    $("head")[0].appendChild(newCss);
}

function addFavicon(url) {
    var link = document.createElement("link");

    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = url;
    $("head")[0].appendChild(link);
}

