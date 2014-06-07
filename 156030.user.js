// ==UserScript==
// @name       imgur report button
// @namespace  http://mathemaniac.org/
// @version    1.0
// @description  Adds a report button when viewing imgur pictures.
// @match      http://i.imgur.com/*
// @match      http://imgur.com/removalrequest*
// @copyright  2013, Sebastian Paaske Tørholm
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

var location = "" + document.location;

if (document.location.host === "i.imgur.com") {
    var url = "http://imgur.com/removalrequest#imgurl=" + document.location;
    
    $('img').after('<a href="' + url + '" class="imgur-report-button">Report</a>');
    $('.imgur-report-button').css( {
        "background-color": "red",
        "color": "white",
        "font-family": "sans-serif",
        "font-size": "small",
        "position": "relative",
        "padding": "0.15em",
        "text-decoration": "none",
        "vertical-align": "top",
        "opacity": "0.2"
    } ).css( {
        "left": "-" + $('.imgur-report-button').outerWidth()  
    } ).hover(
        function () { $(this).css({ "opacity": "1.0" }); },    
        function () { $(this).css({ "opacity": "0.2" }); }
    );
} else if (location.match(/removalrequest/)) {
 	var imgurl = document.location.hash.match(/imgurl=(.*)/);
    if (imgurl) {
    	$('#images').val(imgurl[1]); 
        $('#reason').focus();
        unsafeWindow.onload = function () {};
    }
}