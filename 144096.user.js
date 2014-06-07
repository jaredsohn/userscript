// ==UserScript==
// @name       SelectSmart Hide Topic
// @namespace  http://www.selectsmart.com/
// @version    0.1
// @description  Adds a "Hide Topic" link to the list of topics
// @match      http://www.selectsmart.com/DISCUSS/list.php?*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var regex = /([0-9]+),3,([0-9]+)">Move Topic<\/a>/;

$(document).ready(function(){
    $('#phorum table.list td:last-child small').each(function(index) {
        if (!regex.test($(this).html())) return;
        var forum = regex.exec($(this).html())[1];
        var topic = regex.exec($(this).html())[2];
        $(this).append('<br />&raquo; <a href="http://www.selectsmart.com/DISCUSS/moderation.php?' + forum + ',8,' + topic + '">Hide Topic</a>');
    });
});
