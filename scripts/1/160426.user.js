// ==UserScript==
// @name       GradeSource Highlighter
// @namespace  http://clinton.kopotic.com/
// @version    0.2
// @description  Highlights gradesource secret number
// @match      http://www.gradesource.com/reports/*
// @match      http://gradesource.com/reports/*
// @require    http://code.jquery.com/jquery-latest.js
// @copyright  2013, Clinton Kopotic
// ==/UserScript==

// Helper functions
var gsh_setCookie = function (c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    c_value += "; domain=gradesource.com";
    document.cookie = c_name + "=" + c_value;
};

var gsh_getCookie = function (c_name) {
    var i;
    var x;
    var y;
    var ARRcookies = document.cookie.split(";");
    var len = ARRcookies.length;
    
    for (i = 0; i < len; ++i) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
};

var gsh_getCookieName = function (pageId) {
    return pageId + '/secretNumber';
};

var gsh_checkCookie = function (pageId) {
    var secretNumber = gsh_getCookie(gsh_getCookieName(pageId));
    return secretNumber;
};

var gsh_getPageId = function () {
    var pathElements = window.location.pathname.split('/');
    return pathElements[2] + '/' + pathElements[3];
};

// Determine if page has secret numbers (i.e., not index.html)

var gsh_Traverse_To_Tag_No_Children = function ($originalTag) {
    var $currentTag = $originalTag;
    
    while ($currentTag && $currentTag.children().length > 0) {
        $currentTag = $currentTag.children().first();
    }
    
    if ($currentTag) {
        return $currentTag;
    }
};

var gsh_Get_SecretNumber_Rows = function () {
    var $currentTag = gsh_Traverse_To_Tag_No_Children($('center > table').eq(1));
    
    if ($currentTag && $currentTag.html() === "Secret Number") {
        return $currentTag.parents('tbody').children('tr');
    }
};

// Get or set secret number associated with id in a cookie
// Move table row with secret number to the top and highlight

var gsh_pageId = gsh_getPageId();
var gsh_secretNumber = gsh_checkCookie(gsh_pageId);
var gsh_text = "Click to Change Secret Number";

if (isNaN(parseInt(gsh_secretNumber, 10))) {
    gsh_text = "Click to Set Secret Number";
}

$('body').prepend('<div id="secretNumber">' + gsh_text + '</div>');
$('#secretNumber').hover(function () { $(this).css('cursor','pointer'); }, function () { $(this).css('cursor','default'); } );
$('#secretNumber').click(function () {
    gsh_secretNumber = prompt('What is your secret number?');
    if (gsh_secretNumber != null) {
        gsh_setCookie(gsh_getCookieName(gsh_pageId), gsh_secretNumber, 180);
        location.reload();
    }
});

var $gsh_rows = gsh_Get_SecretNumber_Rows();

if ($gsh_rows && $gsh_rows.length > 0) {
    var gsh_i;
    var gsh_len = $gsh_rows.length;
    
    for (gsh_i = 0; gsh_i < gsh_len; ++gsh_i) {
        if (gsh_Traverse_To_Tag_No_Children($gsh_rows.eq(gsh_i)).html() === gsh_secretNumber) {
            var $gsh_row = $gsh_rows.eq(gsh_i).clone();
            $gsh_row.attr('bgcolor', '#FF9933');
            $gsh_row.children('td').attr('bgcolor', '#FF9933');
            $gsh_rows.eq(2).after($gsh_row);
            break;
        }
    }
}