// ==UserScript==
// @name           IPL Schedule YouTube
// @namespace      http://www.ipl-schedule.com/
// @description    Insert YouTube links in IPL Schedule
// @include        http://www.ipl-schedule.com/
// @require        http://code.jquery.com/jquery-1.5.2.min.js
// @require        http://flesler-plugins.googlecode.com/files/jquery.scrollTo-1.4.2-min.js
// ==/UserScript==

$(document).ready( function() {

// Get today's date in "d-Mmm-yy" format
var now = new Date();
var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
var dateStr = (now.getDate()) + "-" + monthNames[now.getMonth()] + "-" + now.getFullYear()%100;
var scrolledAlready = false;

// For each table row, add YouTube links
$('tr[class^="row-"]').each( function(idx, elem) {
    var originalMatchNo = $(this).children(".column-3").text();

    var patt = /[st|nd|rd|th]/g;
    matchNo = originalMatchNo.replace(patt, '' );
    $(this).children(".column-3").html("<a href=http://www.youtube.com/results?search_query=ipl+2011+match" + matchNo + "+-winning>"+ originalMatchNo +"</a> | ");
    $(this).children(".column-3").append("<a href=http://www.youtube.com/results?search_query=ipl+2011+match" + matchNo + "+-winning+1st+inning+highlights>1st</a> | ");
    $(this).children(".column-3").append("<a href=http://www.youtube.com/results?search_query=ipl+2011+match" + matchNo + "+-winning+2nd+inning+highlights>2nd</a>");


    // If this is today's row, highlight it and scroll to it
    rowDate = $(this).children(".column-1").text();
    if (rowDate.toLowerCase() == dateStr.toLowerCase()) {
        $(this).children(".column-1").css("color", "red").css("font-size", "2.5em").css("font-weight", "bold");
        if (!scrolledAlready) {
            $.scrollTo(this);
            scrolledAlready = true;
        }
    }
   
} );    // End handler for each row of table

} );    // End document ready handler


