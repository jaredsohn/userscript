// ==UserScript==
// @name        Jira Rapid Board
// @namespace   de.mobile.greasemonkey.jira.rapidboard
// @description Customization for cards displayed on the Jira RapidBoard - makes the font of the summaries smaller, the avatar pictures bigger and fades them into the background
// @include     https://jira.corp.mobile.de/jira/secure/RapidBoard.jspa?rapidView=*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     8
// @grant       none
// ==/UserScript==

/* ===============
 * Version History
 * ===============
 *
 * v9, 2012-12-18 - removed infinite timer to improve performance
 * v8, 2012-12-18 - removed functionality to remove header (obsolete with new Jira version)
 * v7, 2012-12-18 - removed functionality to display Jira ticket on new tab when card is clicked (obsolete with new Jira version)
 */

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function() {
    
    /* make text on the "cards" smaller so that more is visible */
    addCss(".ghx-issue-fields { padding-right: 0px !important; }");
    addCss(".ghx-summary { font-size: 7pt; }");
    addCss(".ghx-issue-fields .ghx-key { font-size: 9pt; height: 13px; line-height: 0.98em }"); 
    addCss(".ghx-issue-fields .ghx-summary span, .ghx-issue-subtask .ghx-issue-fields .ghx-summary span { height: 5em; line-height: 0.98em }");

    /* make avatars bigger and transparent */
    addCss(".ghx-issue .ghx-avatar img { height: 58px !important; width: 58px !important; opacity: 0.4; }");

    /* add a shadow to cards */
    addCss(".ghx-issue { box-shadow: 3px 3px 5px silver; }");

    /* remove lines through resolved issue keys */
    addCss(".ghx-issue.ghx-done .ghx-key a { text-decoration: none; }");
    addCss(".ghx-issue.ghx-done .ghx-key a:hover { text-decoration: underline; }");

    /* make column and swim lane headers smaller */
    addCss(".ghx-column-headers h2 { font-size: 12px; }");
    addCss(".ghx-swimlane .ghx-swimlane-header h2 { font-size: 12px; }");
    addCss("#gh.ghx-board-rapid { font-size: 12px; }");
    
    /* make subtasks the same size as regular tasks */
    addCss(".ghx-issue.ghx-issue-subtask.ghx-has-days, .ghx-issue.ghx-issue-subtask { height: 75px; }");
    addCss(".ghx-issue-subtask { padding-left: 32px; }");
    addCss(".ghx-issue-subtask .ghx-issue-fields .ghx-summary { font-size: 7pt; display: inline; }");
    addCss(".ghx-issue-subtask .ghx-issue-fields .ghx-key { font-size: 9pt; display: block; height: 12px; line-height: 0.98em; }");
    addCss(".ghx-issue.ghx-issue-subtask.ghx-has-days, .ghx-issue.ghx-issue-subtask.ghx-has-days .ghx-grabber { height: 75px; }");
    addCss(".ghx-issue.ghx-issue-subtask.ghx-has-days .ghx-grabber:after { height: 70px; }");
    
    /* hide priority icon on subtasks */
    addCss(".ghx-issue-subtask .ghx-flags { display: none; }");

});

function addCss(css) {
    var newCss = document.createElement("style");
    newCss.type = "text/css";
    newCss.innerHTML = css;
    $("head")[0].appendChild(newCss);
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
        },1000);  
    }
};