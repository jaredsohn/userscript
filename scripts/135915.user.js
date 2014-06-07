// ==UserScript==
// @name        Jira 4||7 Rapid Board
// @namespace   de.mobile.greasemonkey.jira.rapidboard
// @description Modifications for Rapid Board of mobile.de Developement Team 4||7 - adds a Leftie logo favicon
// @include     https://jira.corp.mobile.de/jira/secure/RapidBoard.jspa?rapidView=4
// @version     4
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
this.$ = this.jQuery = jQuery.noConflict(true);

var PROJECT_NAME = "4||7";

$(document).ready(function() {

    $("#js-ghx-views-trigger").onAvailable(function() {
        
        /* only modify the rapid board if "4||7" is selected */
        var projectName = $("#js-ghx-views-trigger").text().trim();
        if (projectName != PROJECT_NAME) {
            console.log("Project other than " + PROJECT_NAME + " is selected - no RapidBoard modifications");
            return;
        }
    
        /* change favicon to 4||7's Leftie-logo */
        addFavicon("https://lh4.googleusercontent.com/-SruLai6wt0c/T3wmh4h3xTI/AAAAAAAAAao/cZVYvebfwFY/s32/custom-favicon_rapidboard.ico");
    });
    
    
});


function addFavicon(url) {
    var link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = url;
    $("head")[0].appendChild(link);
}

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