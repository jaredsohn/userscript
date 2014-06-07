// ==UserScript==
// @name        Jira Rapid Board Custsmization
// @namespace   de.mobile.immobilienscout24.rapidboard
// @description Customization for cards displayed on the Jira RapidBoard forked from the script build for the rapid boord at mobile.de
// @include     https://jira.corp.mobile.de/jira/secure/RapidBoard.jspa?rapidView=*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     14_is24
// @grant       none
// ==/UserScript==

/* ===============
 * Version History
 * ===============
 *
* v14_is24, 2013-02-26 - works in Chrome too
* v13_is24, 2013-02-26 - more flat buttons
* v12_is24, 2013-02-26 - flat buttons
* v11_is24, 2013-02-26 - flat design and included feedback from ux
 * v10_is24, 2013-02-25 - everything is blue and friendly
 * v9_is24, 2013-02-13 - uses different sizes for cards and floats the cards in their columns
 * v9, 2012-12-18 - removed infinite timer to improve performance
 * v8, 2012-12-18 - removed functionality to remove header (obsolete with new Jira version)
 * v7, 2012-12-18 - removed functionality to display Jira ticket on new tab when card is clicked (obsolete with new Jira version)
 */

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
$ = this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function() {

/* =================
* Overall Background
* ==================*/
	
	/* make backgrounds blue */
	addCss(".ghx-pool { background: rgba(22, 75, 106, 1) }");
	addCss("#gh { background: rgba(22, 75, 106, 1) }");
	addCss("#ghx-content-main { background: rgba(22, 75, 106, 1); border:none; margin:0; padding:0 }");
	addCss(".ghx-column { background: rgba(22, 75, 106, 1) }");
	
/* =================
* Header
* ==================*/
	
	addCss("#header { background: rgba(22, 75, 106, 1) }");
	addCss(".alertHeader { display:none }");
	addCss("#ghx-header { margin:0 }");
	addCss("#header-bottom {display:none}");
	addCss("#header, #footer, .layout {display:block}");
	
/* =================
* Buttons
* ==================*/

	addCss(".ops li .button { color:white;background: rgba(22, 75, 106, 1);margin:2px;border:none;text-decoration:underline }");
	addCss(".js-mode-selector li {display:none}");
	addCss(".ghx-release {display:none}");
	addCss(".ghx-icon {background:none;display:block;text-indent:0;vertical-align:bottom;width:100%}");
	
	
/* ==========
* Issue Cards
* ===========*/

	addCss(".ghx-issue:hover {background:rgba(153, 173, 194, 1);}");
	
	/* add a shadow to cards */
	addCss(".ghx-issue { box-shadow: none; background:white}");
	
	/* resize issues*/
	addCss(".ghx-issue { height: 80px !important; width: 115px !important; }");
	
	/* make issues floating and round corners*/
	addCss(".ghx-issue { float: left; cursor: pointer; border-radius: 0px 0px 10px 0px;margin:2px}");
	addCss(".ghx-type-6 .ghx-grabber { height: 79px !important; background:white; display:none}");
	
	/* Hide epic symbol */
	addCss(".ghx-issue { padding-left: 12px; padding-top: 8px }");
	addCss(".ghx-issue-fields .ghx-type { display: none }");
 
	/* hide priority symbol */
	addCss(".ghx-priority { display:none }");
	
	/* make text on the "cards" bigger so that more is visible */
	addCss(".ghx-summary { font-size: 8pt; }");
	addCss(".ghx-issue-fields { padding-right: 0px !important; }");
	addCss(".ghx-issue-fields .ghx-key {font-size: 8pt; height: 13px; line-height: 0.98em }"); 
	addCss(".ghx-issue-fields .ghx-key a { color: rgba(22, 75, 106, 1)"); 
	addCss(".ghx-issue-fields .ghx-summary span, .ghx-issue-subtask .ghx-issue-fields .ghx-summary span { height: 5em; line-height: 0.98em }");

	/* make avatars invisible */
	addCss(".ghx-issue .ghx-avatar img { height: 35px !important; width: 35px !important; opacity: 0.0; }");

	/* remove lines through resolved issue keys */
	addCss(".ghx-issue.ghx-done .ghx-key a { text-decoration: none; }");
	addCss(".ghx-issue.ghx-done .ghx-key a:hover { text-decoration: underline; }");
    
	/* hide days spent dots */
	addCss(".ghx-has-days .ghx-days { display:none}");

/* ====================
* Columns and Swimlanes
* =====================*/

	/* make column and swim lane headers bigger and modify colors */
	addCss(".ghx-swimlane .ghx-swimlane-header { top: 1px;");
	addCss(".ghx-swimlane .ghx-swimlane-header h2 { font-size: 18px;");
	addCss(".ghx-swimlane .ghx-swimlane-header h2 .ghx-heading { background: rgba(22, 75, 106, 1); color: white;border:none; padding:0}");
	addCss(".ghx-swimlane .ghx-swimlane-header .ghx-twixie b { border-color: white transparent -moz-use-text-color; }");
	addCss(".ghx-swimlane .ghx-swimlane-header .ghx-info { color: rgba(22, 75, 106, 1); background: none repeat scroll 0 0 rgba(255, 255, 255, 0.8) }");
	addCss(".ghx-column-headers .ghx-column h2 { color: white; font-size: 18px; float: left }");  
	addCss("li.ghx-column { padding-left: 15px;}");
	
	/* number of issues */
	
	addCss(".ghx-column-headers .ghx-col-qty span, .ghx-header .ghx-busted { background:rgba(22, 75, 106, 1);border:none }");
        addCss(".ghx-qty { color: white;background:rgba(22, 75, 106, 1) }");
	addCss(".ghx-column-headers .ghx-col-qty {position:relative;margin:0;float: left; font-size:18px}");
	addCss(".ghx-nav-views a { color: white }");
    
    https://docs.google.com/spreadsheet/oimg?key=0AvEVYwAr1kFBdGlETGMwQVExZUQ3OHU2c0Z1dGtHZXc&oid=20&zx=is1pw54hcent
    
/* ========
* Subtasks
* =========*/
    
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