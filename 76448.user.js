// ==UserScript==
// @name RadBugz
// @namespace http://dmipartners.com
// @description Enhancing the FogBugz experience
// @include http://fogcreek/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require http://plugins.jquery.com/files/jquery.cookie.js.txt
// ==/UserScript==



// METHOD DEFINITIONS //

// Add global functions to unsafeWindow

unsafeWindow.getDateFromString = function(strText) {
    var strTime = "1/1/1970 12:00 AM";
    if (strText != null) {
        var strTagIndex = strText.indexOf('<nobr><span>');
        var strEndIndex = strText.indexOf('M');
        if (strTagIndex > -1 && strEndIndex > -1) {
            strTime = strText.substring(strTagIndex + 12, strEndIndex + 1).replace("(Yesterday) ","").replace("(Today) ","");
        }
    }
    return strTime;
}

unsafeWindow.getPriorityFromString = function(strText) {
    strPrior = "";
    if (strText != null) {
        var strTagIndex = strText.indexOf('<nobr><span>');
        strPrior = strText.substring(strTagIndex + 12, strTagIndex + 14);
    }
    return strPrior;
}

unsafeWindow.getColorFromPriority = function(priority) {
    switch (priority) {
        case "1 ": return "#fbce9b";
        case "2 ": return "#fbd8b2";
        case "3 ": return "#fae5cf";
        case "4 ": return "#f0ede9";
        case "5 ": return "#d8e6ec";
        case "6 ": return "#c2dbe5";
        case "7 ": return "#abcfdb";
        case "8 ": return "#98c5d2";
        case "9 ": return "#89bdcb";
        case "10": return "#7fb8c7";
        default: return "#ffffff";
    }
}

unsafeWindow.getNameFromString = function(strText) {
    strName = "";
    if (strText != null) {
        var strTagIndex = strText.indexOf('<fb:x>');
        var strEndIndex = strText.indexOf('</fb:x>');
        if (strTagIndex > -1 && strEndIndex > -1) {
            strName = strText.substring(strTagIndex + 6, strEndIndex);
        }
    }
    return strName;
}

unsafeWindow.getCaseFromString = function(strText) {
    strCase = "";
    if (strText != null) {
        var strTagIndex = strText.indexOf(', this);">');
        var strEndIndex = strText.indexOf('</a>');
        if (strTagIndex > -1 && strEndIndex > -1) {
            strCase = strText.substring(strTagIndex + 10, strEndIndex);
        }
    }
    return strCase;
}

unsafeWindow.getClassNameFromTag = function(strTitle) {
    strName = "";
    if (strTitle != null) {
        var classObj = $('th:contains(' + strTitle + '):first');
        if (classObj != null && classObj.html() != null) {
            strName = classObj.attr('class').replace(" c-h","");
        }
    }
    return strName;
}

// Adding the Regex Selector for JQuery
// Source: James Padolsey
// http://james.padolsey.com/javascript/regex-selector-for-jquery/

jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}



// SETUP //

// Collect some info from the user screen

var userTag = $("#username");
var userName = "";
if (userTag != null) {
    userName = userTag.html(); }

var updatedName = unsafeWindow.getClassNameFromTag("Last Updated");
var viewName = unsafeWindow.getClassNameFromTag("Last viewed by me");
var editName = unsafeWindow.getClassNameFromTag("Last Edited By");
var priorityName = unsafeWindow.getClassNameFromTag("Priority");
var titleName = unsafeWindow.getClassNameFromTag("Title");
var caseName = unsafeWindow.getClassNameFromTag("Case");
var dueName = unsafeWindow.getClassNameFromTag("Due");
var statusName = unsafeWindow.getClassNameFromTag("Status");
var assignName = unsafeWindow.getClassNameFromTag("Assigned To");

var openwithedit = $.cookie('radbugz_openwithedit');
var dbupdates = $.cookie('radbugz_dbupdates');



// LIST CASES PAGE //

$(':regex(id,^row)').each(function() {

    // Get columns we care about

    var updatedCol = $(this).find("."+updatedName+":first");
    var viewCol = $(this).find("."+viewName+":first");
    var editCol = $(this).find("."+editName+":first");
    var priorityCol = $(this).find("."+priorityName+":first");
    var titleCol = $(this).find("."+titleName+":first");
    var caseCol = $(this).find("."+caseName+":first");
    var dueCol = $(this).find("."+dueName+":first");
    var statusCol = $(this).find("."+statusName+":first");
    var assignCol = $(this).find("."+assignName+":first");

    // Bold any recently updated items

    if (updatedCol != null && viewCol != null) {
        var updateTime = new Date(unsafeWindow.getDateFromString(updatedCol.html()));
        var viewTime = new Date(unsafeWindow.getDateFromString(viewCol.html()));
        var editedBy = unsafeWindow.getNameFromString(editCol.html());
        if (editedBy != userName && updateTime > viewTime) {
            $(this).children().css("font-weight", "bold");
        }
    }

    // Color code rows by priority

    var priority = unsafeWindow.getPriorityFromString(priorityCol.html());
    var color = unsafeWindow.getColorFromPriority(priority);

    $(this).children().css("background-color",color);

    var persistColor = function() {
        $(this).children().css("background-color",color);
    };

    var unsafeThis = unsafeWindow.document.getElementById($(this).attr('id'));
    unsafeThis.onmouseover = persistColor;
    unsafeThis.onmouseout = persistColor;
    unsafeThis.onfocus = persistColor;
    unsafeThis.onclick = persistColor;
    unsafeThis.onkeypress = persistColor;

    // Re-style the case title link

    if (titleCol != null) {
        var titleLink = titleCol.find('.vb');

        // Title link color determined by update time, context grouping and due date

        if (titleLink == null || titleLink.html() == null) {
            titleLink = titleCol.find('.uvb');
            titleLink.css('color', '#0F5491');
        }
        else if ($(this).attr('class').indexOf('-context') > -1) {
            titleLink.css('color', '#999999');
        }
        else {
            titleLink.css('color', 'black');
        }

        if (dueCol != null && dueCol.html() != null) {
            if ((statusCol == null || statusCol.html() == null || statusCol.html().indexOf('Closed') == -1)
             && (assignCol == null || assignCol.html() == null || assignCol.html().indexOf('CLOSED') == -1)) {
                var dueDate = unsafeWindow.getDateFromString(dueCol.html());
                if (dueDate != "1/1/1970 12:00 AM") {
                    var todaysDate = new Date();
                    var dateDiff = (((new Date(dueDate))-todaysDate)/(24*60*60*1000));
                    if (dateDiff <= 2) {
                        titleLink.css('color', 'red');
                        dueCol.css( {'font-weight': 'bold', 'color': 'red'} );
                    }
                }
            }
        }

        titleLink.css( {'font-size': '14px', 'font-weight': 'bold', 'text-decoration': 'none'} );

        // Based on user preferences, change all case links to automatically open the Edit textbox

        if (openwithedit) {
            if (openwithedit == 'y') {
                var caseUrl = titleLink.attr('href');
                var bugId = caseUrl.substring(caseUrl.indexOf('?')+1, caseUrl.indexOf('#'));
                var bugEvent = caseUrl.substring(caseUrl.indexOf('#')+1);
                var newUrl = "default.asp?pg=pgEditBug&ixBug=" + bugId + "&command=edit&ixBugEventLatest=" + bugEvent;
                titleLink.attr('href', newUrl);
                if (caseCol != null) {
                    var caseLink = caseCol.find('.vb');
                    caseLink.attr('href', newUrl);
                }
            }
        }

        // Add hover-over summary to case title link

        if (caseCol != null) {
            var caseNumber = unsafeWindow.getCaseFromString(caseCol.html());
            titleLink.mouseover(function() {
                unsafeWindow.b1(caseNumber, this);
            });
        }
    }
});

// Hide the "Last Viewed By Me" column

if (viewName != null && viewName != '') {
    $('.'+viewName).hide();
}



// CASE VIEW PAGE //

// For the Item View page, add horizontal dividers between comments and actions

$('.action').each(function() {
    $(this).html('<hr>' + $(this).html()); });

// Title and due date in red if due within two days and not closed

var duePanel = $("#sidebar_dueDate_-1");
if (duePanel != null && duePanel.html() != null) {
    var statusLabel = $('.status:first');
    if (statusLabel == null || statusLabel.html() == null || statusLabel.html().indexOf('Closed') == -1) {
        var dueDate = duePanel.find('.content').html();
        if (dueDate != "1/1/1970 12:00 AM") {
            var todaysDate = new Date();
            var dateDiff = (((new Date(dueDate))-todaysDate)/(24*60*60*1000));
            if (dateDiff <= 2) {
                $('.idTitleProjectAndArea').find('div:first').css('color', 'red');
                duePanel.css( {'font-weight': 'bold', 'color': 'red'} );
            }
        }
    }
}

// Page background in red if Item Status involves DB Updates

if (dbupdates == 'y') {
    var contentStatus = $('.idTitleProjectAndArea:first');
    if (contentStatus != null && contentStatus.html() != null && contentStatus.html().indexOf('- DB Updates') > -1) {
        $('#mainArea').css('backgroundColor', 'red');
    }
    else {
        var statusDropDown = $('#ixStatus');
        if (statusDropDown != null && statusDropDown.html() != null) {
            var statusIndex = statusDropDown.attr('selectedIndex');
            var statusOptions = statusDropDown.attr('options');
            if (statusOptions[statusIndex].text.indexOf('- DB Updates') > -1) {
                $('#mainArea').css('backgroundColor', 'red');
            }
        }
    }
}



// SETTINGS PAGE

// Create RadBugz settings section

var settingsHeader = $('.dlg:first');
if (settingsHeader != null && settingsHeader.html() != null) {
    settingsHeader.html('RadBugz User Preferences</p>'
     + '<table cellspacing="0" style="width: 60%; font-family: Helvetica,Arial,Verdana,sans-serif;">'
     + '<tbody style="font-family: Helvetica,Arial,Verdana,sans-serif;">'
     + '<tr id="radBugzRowOpenWithEdit" style="font-family: Helvetica,Arial,Verdana,sans-serif;">'
     + '<th class="dlg" valign="top" style="font-family: Helvetica,Arial,Verdana,sans-serif;">Automatically open Edit textbox on Case View?</th>'
     + '<td class="dlg" ;="" style="width: 70%; font-family: Helvetica,Arial,Verdana,sans-serif;">'
     + '<input id="OpenWithEdit_Yes" class="dlgButton" value="Yes" style="font-family: Helvetica,Arial,Verdana,sans-serif;">'
     + '<input id="OpenWithEdit_No" class="dlgButton" value="No" style="font-family: Helvetica,Arial,Verdana,sans-serif;">'
     + '</td></tr><tr>'
     + '<th class="dlg" valign="top" style="font-family: Helvetica,Arial,Verdana,sans-serif;">Red background for DB Update Items?</th>'
     + '<td class="dlg" ;="" style="width: 70%; font-family: Helvetica,Arial,Verdana,sans-serif;">'
     + '<input id="DBUpdates_Yes" class="dlgButton" value="Yes" style="font-family: Helvetica,Arial,Verdana,sans-serif;">'
     + '<input id="DBUpdates_No" class="dlgButton" value="No" style="font-family: Helvetica,Arial,Verdana,sans-serif;">'
     + '</td></table>'
     + '<p class="dlg" style="font-family: Helvetica,Arial,Verdana,sans-serif;">' + settingsHeader.html());

    // Preference: Auto-open Edit Textbox

    if (openwithedit != null) {
        if (openwithedit == 'y') {
            $('#OpenWithEdit_Yes').css('color', 'green');
        }
        else {
            $('#OpenWithEdit_No').css('color', 'red');
        }
    }

    if (dbupdates != null) {
        if (dbupdates == 'y') {
            $('#DBUpdates_Yes').css('color', 'green');
        }
        else {
            $('#DBUpdates_No').css('color', 'red');
        }
    }

    $('#OpenWithEdit_Yes').click(function() {
        $.cookie('radbugz_openwithedit', 'y', {expires: 3650});
        $(this).css('color', 'green');
        $('#OpenWithEdit_No').css('color', 'black');
        alert('Settings changed!');
    });

    $('#OpenWithEdit_No').click(function() {
        $.cookie('radbugz_openwithedit', 'n', {expires: 3650});
        $(this).css('color', 'red');
        $('#OpenWithEdit_Yes').css('color', 'black');
        alert('Settings changed!');
    });

    $('#DBUpdates_Yes').click(function() {
        $.cookie('radbugz_dbupdates', 'y', {expires: 3650});
        $(this).css('color', 'green');
        $('#DBUpdates_No').css('color', 'black');
        alert('Settings changed!');
    });

    $('#DBUpdates_No').click(function() {
        $.cookie('radbugz_dbupdates', 'n', {expires: 3650});
        $(this).css('color', 'red');
        $('#DBUpdates_Yes').css('color', 'black');
        alert('Settings changed!');
    });

}



// ALL PAGES //

// Font change

$("*").css("font-family","Helvetica,Arial,Verdana,sans-serif");