// ==UserScript==
// @name       		CalendarFixer
// @namespace  	CalendarFixer
// @description	CalendarFixer
// @version		2.6
// @grant			none
// @include		https://www.google.com/calendar*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @icon			http://www.google.com/favicon.ico
// @copyright		2013+, Mike Salmon
// @encoding		UTF-8
// ==/UserScript==

$(window).load(function() {
    removeBackgroundColour();
    setTimeout(function() { removeBackgroundColour(); }, 2500);
    setInterval(function() { removeBackgroundColour(); }, 5000);
});

function removeBackgroundColour() {
    if ( jQuery('.te').length ) {
	    jQuery('.te').css('background-color', 'transparent');
    }
}

removeBackgroundColour();