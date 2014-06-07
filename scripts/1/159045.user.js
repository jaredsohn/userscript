// ==UserScript==
// @name        Jira Meta Kanban Rapid Board
// @namespace   de.immobilienscout24.jira.rapidboard
// @description Customization of the Rapid Board for Jira Project "Portfolio Board" at Immobilien Scout forked from the Meta Kanban Board of mobile.de
// @include     https://jira.corp.mobile.de/jira/secure/RapidBoard.jspa*
// @version    9_is24
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

/* ===============
 * Version History
 * ===============
* v9_is24 2013-02-26 - works with chrome too
* v8_is24 2013-02-26 - set yellow days to 28 and red days to 180
* v7_is24 2013-02-26 - modified column widths
 * v6_is24 2013-01-13 - only the grabber is colorized not the whole card
 * v5_is24 2013-01-13 - ci colors
 * v4_is24 2013-02-13 - inmplemented yellow in addition to red status flag
 * v4, 2012-12-18 - fix/adjustment for new Jira version
 * v3, 2012-09-17 - "Schwerpunkt" instead of "Scherpunkt"
 * v2, 2012-09-11 - bugfix (drag and drop of cards was broken); script now applies to all MTK boards
 * v1, 2012-09-04 - gray M-cards, no priority icons, tickets longer than 3 weeks in dev marked red
 */

/* -------------
 * Configuration
 * -------------
 */

/* Number of the development column */
var COLUMN_ID = 2; 

/* tickets that are more days than this in development are marked red */
var DAYS_RED = 180; 

/* tickets that are more days than this in development are marked red */
var DAYS_YELLOW = 28; 

/* rapid boad names this script applies to */
var BOARD_NAMES = [ "I18N Road Map 2013","Copy of Portfolio Kanban"]; 


/* ------------ */

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
$= this.$ = this.jQuery = jQuery.noConflict(true);

var inactive = true; // don't change this, internal variable

$(document).ready(function() {
    

    $("#ghx-nav-views").onAvailable(function() {
	    
        if (aleadyManipulated($(this))) return;

        /* only modify the rapid board if it is one of the boards defined above */
        var boardName = $(this).text().trim();
        if (jQuery.inArray(boardName, BOARD_NAMES) > -1) {
            inactive = false;
        }
    });
    
    $(".ghx-issue").onAvailable(function() {

        if (aleadyManipulated($(this)[0]) ) return;

        /* mark tickets longer than X days in development red */
        markLateTickets();

    }); // ...on available

}); // ...document ready

function markLateTickets() {
       $("li.ghx-column[data-column-id="+COLUMN_ID+"] div.ghx-issue").each(function() {
        var days = $(this).find(".ghx-days").attr("title");
        days = Number(days.substring(0, days.indexOf(" ")));
        if (days > DAYS_YELLOW) {
		
        $(this).find(".ghx-grabber").css(
                "background", 
                "rgba(247,223,86,1)");
		$(this).find(".ghx-grabber").css(
                "display", 
                "block");
	} if (days > DAYS_RED) {
		
        $(this).find(".ghx-grabber").css(
                "background", 
                "rgba(181,75,50,1)");
		$(this).find(".ghx-grabber").css(
                "display", 
                "block");
	}
    });

    $(".ghx-column-headers").children('li').eq(0).css("width","33%");
    
    $(".ghx-column-headers").children('li').eq(3).css("width","33%");
    
    $("li.ghx-column[data-column-id=0]").each(function() {
	     $(this).css(
                "width", 
                "33%");
    });
    
    $("li.ghx-column[data-column-id=3]").each(function() {
	     $(this).css(
                "width", 
                "33%");
    });
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

/* Adds functionality to jQuery to wait for an element to be available;
 * this is useful for the rapid board because most of the page is loaded
 * after document ready by Ajax */
$.fn.onAvailable = function(fn){
    var sel = this.selector;
    var timer;
    if (this.length > 0) {
        fn.call(this);   
    }
    else {
        timer = setInterval(function(){
            if ($(sel).length > 0) {
                fn.call($(sel));
                clearInterval(timer);  
            }
        },100);  
    }
};

/* checks if the GreaseMonkey script has already done its dirty deed */
function aleadyManipulated(element) {
    if ($(element).data("gm-manipulated")) return true;
    $(element).data("gm-manipulated", true);
    return false;
}
