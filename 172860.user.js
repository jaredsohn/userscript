// ==UserScript==
// @name       Geocaching English Corrector
// @namespace  http://localhost
// @version    0.2
// @description  Change annoying geocaching "English" to proper English, eg "Needs Archived" become "Needs Archiving"
// @include        http://www.geocaching.com/seek/*
// @include        https://www.geocaching.com/seek/*
// @include        http://www.geocaching.com/geocache/*
// @include        https://www.geocaching.com/geocache/*
// @exclude        http://www.geocaching.com/seek/sendtogps.aspx*
// @copyright  2013+, Rachel Westwood
// ==/UserScript==

function replaceText(){
    textNodes = document.evaluate(
        "//text()",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    var s_archiving = new RegExp('Needs Archived$','gi');
    var r_archiving = 'Rubbish cache (needs archiving)';
    var s_maintenance = new RegExp('Needs Maintenance$','gi');
    var r_maintenance = 'Broken (It needs maintenance)';
    var s_no = new RegExp('Didn\'t find It$','gi');
    var r_no = 'Too well hidden or not there';
    var s_yes = new RegExp('Found It$','gi');
    var r_yes = 'Oh Yeah! I found it!';
    var s_note = new RegExp('Write Note$','gi');
    var r_note = 'Just a quick note to say...';
    var s_attend = new RegExp('Will Attend$','gi');
    var r_attend = 'I\'ll be there!';
    var s_attended = new RegExp('Attended$','gi');
    var r_attended = 'I was there!';
    
    for (var i=0;i<textNodes.snapshotLength;i++) {
        var node = textNodes.snapshotItem(i);
        node.data = node.data.replace(s_archiving, r_archiving);
        node.data = node.data.replace(s_maintenance, r_maintenance);
        node.data = node.data.replace(s_no, r_no);
        node.data = node.data.replace(s_note, r_note);
        node.data = node.data.replace(s_yes, r_yes);
        node.data = node.data.replace(s_attend, r_attend);
        node.data = node.data.replace(s_attended, r_attended);
    }
}


replaceText();
window.addEventListener('scroll', replaceText, false);