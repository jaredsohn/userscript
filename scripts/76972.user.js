// ==UserScript==
// @name RadBugz Lite - Auto-open edit textboxes
// @namespace http://dmipartners.com
// @description Opening cases from the FogBugz case list automatically opens the "Edit" textbox on that page
// @include http://fogcreek/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require http://plugins.jquery.com/files/jquery.cookie.js.txt
// ==/UserScript==



// METHOD DEFINITIONS //

// Add global functions to unsafeWindow

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

var titleName = unsafeWindow.getClassNameFromTag("Title");
var caseName = unsafeWindow.getClassNameFromTag("Case");

var openwithedit = $.cookie('radbugz_openwithedit');



// LIST CASES PAGE //

$(':regex(id,^row)').each(function() {

    // Get columns we care about

    var titleCol = $(this).find("."+titleName+":first");
    var caseCol = $(this).find("."+caseName+":first");

    // Based on user preferences, change all case links to automatically open the Edit textbox

    if (openwithedit != null && titleCol != null) {
        var titleLink = titleCol.find('.vb');
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
});



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
}