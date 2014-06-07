// ==UserScript==
// @name       ClockingIT Nav Away Warning
// @namespace  http://igdit.com
// @version    0.1
// @description  Prevents leaving a page if edits were detected
// @match      http://*.clockingit.com/tasks/*
// @copyright  2013+, EJD
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

var CIT_CHANGES_MADE = "You have made changes to this page. Unsaved changes will be lost.";
var _cItNavMsg = null;

$('input[type=submit]').click(function() {
    _cItNavMsg = null;
});

function cItInitListeners() {
    $('input[type="text"], textarea').not('#worklog_body, #query').keyup(function() {
        _cItNavMsg = CIT_CHANGES_MADE;
    });
    
    $('input[type="radio"], select').change(function() {
        _cItNavMsg = CIT_CHANGES_MADE;
    });
}

cItInitListeners();

$('a:contains("QuickAdd")').click(function() {
    setTimeout(cItInitListeners,3000); // ample time for AJAX form to load, but not enough time to input something valuable and accidentally navigate away
});
                                  
window.onbeforeunload = function() {
    return _cItNavMsg;
};
