// ==UserScript==
// @name        Jira Scrum of Scrums Rapid Board
// @namespace   de.mobile.greasemonkey.jira.rapidboard
// @description Modifications for the mobile.de Scrum of Scrums Rapid Board in Jira - colors tickets that are in the "Development" column according to how long they have been there
// @include     https://jira.corp.mobile.de/jira/secure/RapidBoard.jspa?rapidView=*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       none
// @version     2
// ==/UserScript==

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
this.$ = this.jQuery = jQuery.noConflict(true);

var PROJECT_NAME = "Scrum of Scrums";
var COLUMN_NAME = "Development";
var DAYS_YELLOW = 7;
var DAYS_RED = 14;

$(document).ready(function() {

    $("#js-ghx-views-trigger").onAvailable(function() {
        
        console.log("[GREASEMONKEY-DEBUG] #js-ghx-views-trigger available");

        /* only modify the rapid board if "Scrum of Scrums" is selected */
        var projectName = $("#js-ghx-views-trigger").text().trim();
        if (projectName != PROJECT_NAME) {
            console.log("Project other than " + PROJECT_NAME + " is selected - no RapidBoard modifications");
            return;
        }
        
        /* find out the data ID of the development column */
        $("#ghx-column-headers").onAvailable(function () {
            
            console.log("[GREASEMONKEY-DEBUG] #ghx-column-headers available");
            
            var columnId = undefined;
            $("#ghx-column-headers li.ghx-column").each(function() {
                var columnName = $(this).text().trim();
                if (columnName == COLUMN_NAME) {
                    columnId = $(this).attr("data-id")
                }
                
            });

            if (columnId == undefined) {
                console.log("No column \"" + COLUMN_NAME + "\" found - no RapidBoard modifications");
                return;
            }
            $("li.ghx-column[data-column-id=" + columnId + "] div.ghx-issue").each(function() {
                var days = $(this).find(".ghx-days").attr("title");
                days = Number(days.substring(0, days.indexOf(" ")));
                $(this).css("background", "-moz-linear-gradient(center top , " + (days >= DAYS_RED ? "lightpink" : days >= DAYS_YELLOW ? "lemonchiffon" : "palegreen") + " 25%, " + (days >= DAYS_RED ? "red" : days >= DAYS_YELLOW ? "yellow" : "green") + " 75%) repeat scroll 0 0 transparent");
            });
        });
    });

});


/* Adds functionality to jQuery to wait for an element to be available;
 * this is useful for the rapid board because most of the page is loaded
 * adter document ready by Ajax */
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
        },50);  
    }
};