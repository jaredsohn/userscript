// ==UserScript==
// @name        Jira Meta Kanban Rapid Board
// @namespace   de.mobile.greasemonkey.jira.rapidboard
// @description Customization of the Rapid Board for Jira Project "Meta Kanban" (MTK) at mobile.de
// @include     https://jira.corp.mobile.de/jira/secure/RapidBoard.jspa*
// @version     4
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

/* ===============
 * Version History
 * ===============
 *
 * v4, 2012-12-18 - fix/adjustment for new Jira version
 * v3, 2012-09-17 - "Schwerpunkt" instead of "Scherpunkt"
 * v2, 2012-09-11 - bugfix (drag and drop of cards was broken); script now applies to all MTK boards
 * v1, 2012-09-04 - gray M-cards, no priority icons, tickets longer than 3 weeks in dev marked red
 */

/* -------------
 * Configuration
 * -------------
 */

/* name of the development column */
var COLUMN_NAME = "Development"; 

/* tickets that are more days than this in development are marked red */
var DAYS_RED = 21; 

/* rapid boad names this script applies to */
var BOARD_NAMES = [ "Meta Kanban by Teams", "Meta Kanban by Focus (Schwerpunkt)"]; 


/* ------------ */

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
this.$ = this.jQuery = jQuery.noConflict(true);

var inactive = true; // don't change this, internal variable

$(document).ready(function() {
    
    $("#ghx-board-name").onAvailable(function() {
        
        if (aleadyManipulated($(this))) return;

        /* only modify the rapid board if it is one of the boards defined above */
        var boardName = $(this).text().trim();
        if (jQuery.inArray(boardName, BOARD_NAMES) > -1) {
            inactive = false;
        }
    });
    
    $(".ghx-issue").onAvailable(function() {
        
        console.log('inactive: ' + inactive);
        if (aleadyManipulated($(this)[0]) || inactive) return;

        $(this).each(function() {

            /* make M-cards gray */
            if ($(this).find("img").attr("src").indexOf("m.gif") > 0) {
                $(this).css("background", "-moz-linear-gradient(center top, #DDDDDD 25%, #F7F7F7 75%) repeat scroll 0 0 transparent");
            }
            
            /* remove priority icons - they are irrelevant for the MTK board */
            $(this).find("span.ghx-priority").hide();
        }); // ...each card element

        /* mark tickets longer than X days in development red */
        markLateTickets();

    }); // ...on available

}); // ...document ready

function markLateTickets() {
    var columnId = undefined;
    $("#ghx-column-headers li.ghx-column h2").each(function() {
        var columnName = $(this).text().trim();
        if (columnName == COLUMN_NAME) {
            columnId = $(this).parent().attr("data-id")
        }
        
    });

    if (columnId == undefined) {
        console.log("No column \"" + COLUMN_NAME + "\" found - no RapidBoard modifications");
        return;
    }
    $("li.ghx-column[data-column-id=" + columnId + "] div.ghx-issue").each(function() {
        var days = $(this).find(".ghx-days").attr("title");
        days = Number(days.substring(0, days.indexOf(" ")));
        if (days > DAYS_RED)
        $(this).css(
                "background", 
                "-moz-linear-gradient(center top, lightpink 25%, white 75%) repeat scroll 0 0 transparent");
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

