// ==UserScript==
// @name        IS24 Portfolio Overview - Jira 5 Rapid Board - Dev
// @namespace   de.mobile.immobilienscout24.rapidboard
// @description Customization for cards displayed on the Jira RapidBoard forked from the script build for the rapid boord at mobile.de
// @include     https://jira.corp.mobile.de/jira/secure/RapidBoard.jspa?rapidView=*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     v5.39.2
// @grant       none
// ==/UserScript==

/* ===============
 * Version History
 * ===============
 * 
 * v5.39.2, 2014-04-24 - I modified the layout in zoom mode so that the epic age and number of stories decorators look good even when zoom out
 * v5.39.1, 2014-04-24 - If an epic is already done is does not "age" anymore. The number of days alive shows how long it took the epic to get done.
 * v5.39, 2014-04-24 - The epics are now decorated with information about the number calendar days alive in total.
 * v5.38, 2014-04-04 - The epics are now decorated with information about the number of stories in total and the number of epics already closd. This enables you to see the progress inside an epic at a glance.
 * v5.37.1_s24, 2013-11-29 - The pull down filter menu was broken. I fixed it.
 * v5.37_s24, 2013-09-09 - The zoom is now really a birds view. All issues are so tiny, that its possible to see very many of them in one board without scrolling.
 * v5.36.6_s24, 2013-09-09 - Some minor bug fixes regarding the zoom.
 * v5.36.5_s24, 2013-08-26 - The zoom function is now working correctly again.
 * v5.36.4_s24, 2013-08-26 - And now the epic keys are completely visible again.
 * v5.36.3_s24, 2013-08-26 - I think that I know have fixed all left over layout and design messes from the 5.2 update.
 * v5.36.2_s24, 2013-08-26 - Epics are now floating correclty in each lane. No empty epic spaces are left.
 * v5.36.1_s24, 2013-08-26 - In Mozilla Firefox no epics were visible only Chrome users could use the board. I fixed it.
 * v5.36_is24, 2013-08-26 - There is an new button available that, if pushed, starst to colorize the epics on the board according to the colorization filters in the boards configuration.
 * It us currently not completely functional, but will later show the user which ServiceLine is working on which epic it a glance.
 * v5.35_is24, 2013-08-24 - I fixed the refresh issues.
 * v5.34_is24, 2013-08-21 - The drop down filter is working for Jira 5 too
 * v5.33_is24, 2013-08-15 - Nearly all of the static features are now available on Jira 5.
 * v5.32.4_is24, 2013-08-14 - I fixed a bug. New even the last column header gets the right number of issues per filter.
 * v5.32.3_is24, 2013-06-28 Forked to make the script Jira 5 compatible
 * v32.2_is24, 2013-06-11 - I supress error messages in the header of the board
 * v32.1_is24, 2013-05-10 - Deleted some unused code
 * v32_is24, 2013-05-10 - The layout is not longer broken when issues of type "Task" are displayed.
 * v31_is24, 2013-04-16 - The column sizes have been readjusted to catch up with the new ideas column.
 * v30_is24, 2013-04-15 - I added filters for external and PMI projects.
 * v29_is24, 2013-04-09 - I renamed the drop down menu and removed every occurence of the term OE.
 * v28.3_is24, 2013-04-09 - Fix: When zoomed out the wrapping of the epic key text did not occur.
 * v28.2_is24, 2013-04-09 - Now using jquery 1.9.1 instead of 1.8.3
 * v28.1_is24, 2013-04-09 - Now using jquery 1.8.3 instead of 1.7.1
 * v28_is24, 2013-04-09 - I added a Button to show the assignees of the epics. Its a toggle button, so you can hide them again. The feature workes in zoom and normal mode.
 * v27.1_is24, 2013-04-03 - Fix: The dynamic parts of the script like drop down filters are now running in Firefox again.
 * v27_is24, 2013-04-02 - The SL filter as now a more generel OE filter and contains also the options to filter for departments.
 * v26_is24, 2013-03-18 - Now the number of epics in the header reflects the filter settings. I aslo fixed an issue with the internal event listening which led to poor performance after refreshes.
 * v25.1_is24, 2013-03-15 - Fixed the duplicate SL Filter drop down
 * v25_is24, 2013-03-14 - The ServiceLine filter stays available even after a change of the board
 * v24_is24, 2013-03-13 - The column with the name "In Progress" is automatically identified and used to color the epics. The first and the last column of the board get the most space, regardless of the number of other columns.
 * v23_is24, 2013-03-13 - The ServiceLine filters are now grouped in a pull down menu
 * v22.1_is24, 2013-03-12 - Started to implement the pull down for ServiceLine filters
 * v22_is24, 2013-03-12 - Merged Lydia's fix for the header and some fixes for event and timing problems.
 * v21_is24, 2013-03-12 - Renamed the new button to "Zoom out". Its name chages to "Zoom in" when zoomed.
 * v20_is24, 2013-03-11 - Theres a new button "Toggle Progress Bar View" available that you can use to get a progress bar like view of the progress in the swimlanes
 * v19_is24, 2013-03-08 - The SL filter are extra visible
 * v18_is24, 2013-03-04 - Fix: Coloring of cards and column sizes are restored after filter selection
 * v17_is24, 2013-02-27 - Refactorings and code candy
 * v16_is24, 2013-02-27 - Fixed close button on detail view
 * v15_is24, 2013-02-26 - only one script needed
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


/* -------------
 * Configuration
 * -------------
 */

const DAYS_ALIVE_CIRCLE_BACKGROUND_COLOR = "rgb(26, 90, 127)";

const DAYS_ALIVE_CIRCLE_BORDER_COLOR = "rgb(0,52,104)";

const STORY_CIRCLE_BACKGROUND_COLOR = "rgb(255,117,0)";

const STORY_CIRCLE_BORDER_COLOR = "rgb(0,52,104)";

const BACKGROUND_COLOR = "rgb(22, 75, 106)";

const MENU_BACKGROUND_COLOR = "rgb(26, 90, 127)";

const MENU_HOVER_COLOR = "rgb(31,108,150)";

const ISSUE_HOVER_COLOR = "rgb(153, 173, 194)";

const ISSUE_HEIGHT = 60;

const ISSUE_GRABBER_HEIGHT = 77;

const ISSUE_WIDTH = 88;

const ISSUE_FONT_SIZE = "8pt";

const SWIMLANE_HEADER_SIZE = "18pt";

const COLUMN_HEADER_SIZE = "18pt";

const FOREGROUND_COLOR = "white";

const YELLOW_MARKER_COLOR = "rgb(247,223,86)";

const RED_MARKER_COLOR = "rgb(181,75,50)";

/* Number of the development column */
var columnId = 2;

/* tickets that are more days than this in development are marked red */
const DAYS_RED = 180;

/* tickets that are more days than this in development are marked red */
const DAYS_YELLOW = 28;

var inProgressBarMode = false;
var inColorizeServiceLineMode = false;

/* The JQuery selector to a dom node to which custom buttons for zoom and other features are added */
//var NODE_TO_ADD_CUSTOM_BUTTONS = "div#ghx-controls-work dl:last-child";
var NODE_TO_ADD_CUSTOM_BUTTONS = "div#ghx-controls-work dl";

var ghxPool = $("#ghx-pool");
var allGhxIssues = ghxPool.find("div.ghx-issue");
var allFirstGhxIssues = ghxPool.find("div.ghx-issue:first-child");

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
$ = this.$ = this.jQuery = jQuery.noConflict(true);

function addCss(css) {
    var newCss = document.createElement("style");
    newCss.type = "text/css";
    newCss.innerHTML = css;
    $("head")[0].appendChild(newCss);
}


function overwriteStaticCss() {
	
	
    log("overwriteStaticCss...");
    /* =================
     * Overall Background
     * ==================*/

    /* make backgrounds blue */
	addCss("#content { background: " + BACKGROUND_COLOR + " }");
    addCss("#ghx-pool { background: " + BACKGROUND_COLOR + " }");
    addCss("#ghx-column-headers { background: " + BACKGROUND_COLOR + " }");
    addCss("#ghx-column-header-group.ghx-fixed {background: none}");

    
    /* =================
     * Header
     * ==================*/
	addCss(".aui-theme-default #header #logo a img { padding:0 }");
    addCss("#ghx-header { padding-left:0 }");
    addCss("#ghx-work { border:none }");
    
    addCss("#ghx-operations {padding:0}");
    
    addCss(".aui-theme-default #header .global { background: " + BACKGROUND_COLOR + " }");
    addCss(".aui-theme-default #content { margin:0; padding-top:0; padding-bottom:0; padding-left:16px }");
    addCss(".aui-theme-default #header .global .secondary>ul>li { background: " + BACKGROUND_COLOR + "}");
    
    addCss("h2#ghx-board-name { color: " + FOREGROUND_COLOR + ";font-weight:bold }");

	// Hide some stuff that is not helping us here    
    addCss(".alertHeader { display:none }");
    //addCss("#ghx-modes { display:none }");
    addCss(".SpartezAC-print { display:none }");
    addCss(".ghx-compact-toggle { display:none }");
    addCss(".local { display:none }");
    addCss("#js-swimlane-header-stalker {display:none !important}");
    addCss(".ghx-feedback {display:none}");
    


    /* =================
     * Buttons
     * ==================*/
   	
    addCss(".aui-theme-default a, .aui-theme-default a:link, .aui-theme-default a:visited { color:white;background: " + MENU_BACKGROUND_COLOR + ";border:none;margin:0;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:5px }");
    addCss(".aui-theme-default a:hover { color:white;background: " + MENU_HOVER_COLOR + ";margin:2px;border:none;margin:0;text-decoration:none }");
    addCss(".aui-theme-default .aui-list .aui-list-item-link { color:white }");
    addCss(".ghx-controls-filters dd a.ghx-active {color:white;border:none;background: " + MENU_HOVER_COLOR + "}");
    
    addCss("#ghx-release {display:none}");
    
    addCss(".aui-theme-default #header #logo a { background: " + BACKGROUND_COLOR + "}");

    /* ==========
     * Issue Cards
     * ===========*/

    addCss(".ghx-issue:hover {background:" + ISSUE_HOVER_COLOR + "}");

    /* add a shadow to cards */
    addCss(".ghx-issue { box-shadow: none; background:white}");
        
    /* make issues floating and round corners*/
    addCss(".ghx-issue { float: left; cursor: pointer; border-radius: 0 0 10px 0;margin:2px}");
    
    addCss(".ghx-grabber { background:white; display:none}");
    
    addCss(".ghx-issue .ghx-grabber:after { background:none;}");
    
    /* Hide epic symbol */
    addCss(".ghx-issue { padding-left: 12px; padding-top: 8px }");
    addCss(".ghx-issue-fields .ghx-type { display: none }");

    addCss(".ghx-issue:first-child { border: none }");
    
    
    /* hide priority symbol */
    addCss(".ghx-priority { display:none }");

    /* make text on the "cards" bigger so that more is visible */
    addCss(".ghx-summary { font-size: " + ISSUE_FONT_SIZE + " }");
    addCss(".ghx-issue-fields { padding-right: 0px !important; }");
    addCss(".ghx-issue-fields .ghx-key {font-size: " + ISSUE_FONT_SIZE + "; height: 13px; line-height: 0.98em; overflow:visible; vertical-align:baseline}");
    addCss(".ghx-issue-fields .ghx-key a { background: none;color: " + BACKGROUND_COLOR + "; word-wrap: break-word;display:block}");
    addCss(".ghx-issue-fields .ghx-summary span, .ghx-issue-subtask .ghx-issue-fields .ghx-summary span { height: 5em; line-height: 0.98em }");

    /* Care for tasks */
    addCss(".ghx-issue-subtask .ghx-issue-fields .ghx-summary { font-size: " + ISSUE_FONT_SIZE + " }");
    addCss(".ghx-issue-subtask .ghx-issue-fields .ghx-key, .ghx-issue-subtask .ghx-issue-fields .ghx-summary {font-size: " + ISSUE_FONT_SIZE + "; height: 13px; line-height: 0.98em }");
    addCss(".ghx-issue-subtask .ghx-issue-fields .ghx-key, .ghx-issue-subtask .ghx-issue-fields .ghx-summary { color: " + BACKGROUND_COLOR + "; word-wrap: break-word;display:block}");
    addCss(".ghx-issue-subtask .ghx-issue-fields .ghx-key a { white-space: normal}");

    /* make avatars invisible */
    addCss(".ghx-issue .ghx-avatar img { height: 35px; width: 35px; opacity: 0.5; display:none }");

    /* remove lines through resolved issue keys */
    addCss(".ghx-issue.ghx-done .ghx-key a { text-decoration: none; }");
    addCss(".ghx-issue.ghx-done .ghx-key a:hover { text-decoration: underline; }");

    /* hide days spent dots */
    addCss(".ghx-days { display:none}");
    
    /* stories in epic circle */
    addCss(".storiesInEpic {position:absolute;right:-3px;bottom:-2px;height:30px;width:30px;background-color:" + STORY_CIRCLE_BACKGROUND_COLOR + ";line-height:30px;font-size: " + ISSUE_FONT_SIZE + ";color: " + BACKGROUND_COLOR + ";text-align:center;vertical-align:middle;border:1px solid " + STORY_CIRCLE_BORDER_COLOR + ";border-radius:15px}");
    
    /* epic days alive circle */
    addCss(".epicDaysAlive {position:absolute;right:-3px;bottom:47px;height:30px;width:30px;background-color:" + DAYS_ALIVE_CIRCLE_BACKGROUND_COLOR + ";line-height:30px;font-size: " + ISSUE_FONT_SIZE + ";color: " + FOREGROUND_COLOR + ";text-align:center;vertical-align:middle;border:1px solid " + DAYS_ALIVE_CIRCLE_BORDER_COLOR + ";border-radius:15px}");
    
    /* ====================
     * Columns and Swimlanes
     * =====================*/
    
    addCss("#ghx-pool {padding:0}");

    /* make column and swim lane headers bigger and modify colors */
    addCss(".ghx-swimlane-header { font-size: " + SWIMLANE_HEADER_SIZE + "; background: " + BACKGROUND_COLOR + "; border:none;color: " + FOREGROUND_COLOR + "; font-size: " + COLUMN_HEADER_SIZE + ";");
    addCss(".ghx-column-headers h2 { font-weight:normal;margin:0;line-height:1.2}");
    
    addCss("#ghx-column-header-group {left: 28px !important}");
    
    // add a separator border
    addCss(".ghx-info:after {background-color: #fff;content: '';height: 1px;position: absolute;width: 95%;top: 25px;}");
   
    addCss(".ghx-swimlane-header:after {display: none}");
    
    addCss(".ghx-column-headers .ghx-column, .ghx-columns .ghx-column { background: " + BACKGROUND_COLOR + "; color: " + FOREGROUND_COLOR + " ;border:none; padding:0}");
    
    addCss(".ghx-column-headers .ghx-column h2 { color: " + FOREGROUND_COLOR + "; font-size: " + COLUMN_HEADER_SIZE + "; float: left }");
    addCss("li.ghx-column { padding-left: 15px;}");

       
    /* number of issues */
    
    addCss(".ghx-column-headers .ghx-qty { color: " + FOREGROUND_COLOR + ";background:" + BACKGROUND_COLOR + ";border:none;font-weight:normal; margin-left:5px}");
    
    addCss(".ghx-columns {padding-left:13px}");
    
    addCss(".ghx-qty { color: " + FOREGROUND_COLOR + ";background:" + BACKGROUND_COLOR + ";border:none;position:relative;margin:0; font-size:" + COLUMN_HEADER_SIZE + ";font-weight:normal }");
    
    addCss(".ghx-description {color: " + FOREGROUND_COLOR + ";margin-right:5px}");
    log("overwriteStaticCss done");
}

function markLateTickets(event) {
    log("markLateTickets...");
    
    var days = $(event.target.offsetParent).find(".ghx-days").attr("title");
    days = Number(days.substring(0, days.indexOf(" ")));
    
    if (days > DAYS_RED) {
    	$(event.target.offsetParent).find(".ghx-grabber").css("background", RED_MARKER_COLOR).css("display", "block");
    } else if (days > DAYS_YELLOW) {
        $(event.target.offsetParent).find(".ghx-grabber").css("background", YELLOW_MARKER_COLOR).css("display", "block");
    } 

    log("markLateTickets done");
}

function adjustColumnSizes() {
    log("adjustColumnSizes...");
    $(".ghx-column-headers li:first-child").css("width", "25%");
    $(".ghx-column-headers li:last-child").css("width", "25%");

	$(".ghx-columns li:first-child").each(function () {
        $(this).css("width", "25%");
    });

    $(".ghx-columns li:last-child").each(function () {
        $(this).css("width", "25%");
    });
    log("adjustColumnSizes done");
}



function enterProgressBarView() {
    log("entering progress bar view...")
    $(".ghx-summary").css("display", "none");
    $(".ghx-issue-fields .ghx-key").css("font-size", "6pt");
    
    $("div.ghx-issue").css("padding-left","0").css("padding-top","0").css("margin","1px").width(ISSUE_WIDTH / 2).height(ISSUE_HEIGHT / 2.0);
    
    $("div.ghx-issue:first-child").css("padding-left","0").css("padding-top","0").css("margin","1px").width(ISSUE_WIDTH / 2).height(ISSUE_HEIGHT / 2.0);
    
    
    $(".ghx-issue .ghx-grabber").height(ISSUE_GRABBER_HEIGHT / 2);
    $(".ghx-issue:first-child .ghx-grabber").height(ISSUE_GRABBER_HEIGHT / 2);
    
    $(".ghx-swimlane-header .ghx-heading").css("margin","0px");
    
    $(".ghx-column-headers .ghx-column h2").css("font-size", "8pt");
    $(".ghx-swimlane-header").css("font-size", "8pt");
    $(".ghx-qty").css("font-size", "8pt");
    $(".ghx-columns .ghx-column").css("padding-bottom", 0);
    $(".ghx-issue .ghx-avatar img").height("10px").width("10px");
    $(".ghx-description").css("display","none");
    $(".storiesInEpic").width(ISSUE_HEIGHT / 3).height(ISSUE_HEIGHT / 3).css("bottom","0px").css("border-radius","10px").css("line-height","20px");
    $(".epicDaysAlive").width(ISSUE_HEIGHT / 3).height(ISSUE_HEIGHT / 3).css("bottom","20px").css("border-radius","10px").css("line-height","20px");
   
    log("progress bar view entered");
}

function leaveProgressBarView() {
    log("leaving progress bar view");
    $(".ghx-summary").css("display", "inline");
    $(".ghx-issue-fields .ghx-key").css("font-size", "10pt");
    
    $("div.ghx-issue").css("padding-left","12px").css("padding-top","8px").css("margin","2px");
    $("div.ghx-issue").width(ISSUE_WIDTH);
    $("div.ghx-issue").height(ISSUE_HEIGHT);
    
    $("div.ghx-issue:first-child").css("padding-left","12px").css("padding-top","8px").css("margin","2px").width(ISSUE_WIDTH).height(ISSUE_HEIGHT);   
    
    $(".ghx-issue .ghx-grabber").height(ISSUE_GRABBER_HEIGHT);    
    $(".ghx-issue:first-child .ghx-grabber").height(ISSUE_GRABBER_HEIGHT);
    $(".ghx-swimlane-header .ghx-heading").css("margin-top","10px");
    
    $(".ghx-column-headers .ghx-column h2").css("font-size", SWIMLANE_HEADER_SIZE);
    $(".ghx-swimlane-header").css("font-size", COLUMN_HEADER_SIZE);
    $(".ghx-qty").css("font-size", COLUMN_HEADER_SIZE);
    $(".ghx-columns .ghx-column").css("padding-bottom", 32);
    $(".ghx-issue .ghx-avatar img").height("35px").width("35px");
    $(".ghx-description").css("display","inline-block");
    $(".storiesInEpic").width(ISSUE_HEIGHT / 2).height(ISSUE_HEIGHT / 2).css("bottom","-3px").css("border-radius","15px").css("line-height","30px");
    $(".epicDaysAlive").width(ISSUE_HEIGHT / 2).height(ISSUE_HEIGHT / 2).css("bottom","47px").css("border-radius","15px").css("line-height","30px");

    log("progress bar view left");
    
    
}

function refreshProgressBarView() {
    log("refreshing progress bar view...");
    if (inProgressBarMode) {
        enterProgressBarView();
    } else {
        leaveProgressBarView();
    }
    log("progress bar view refreshed");
}

function enterColorizeAgeMode() {
    log("enterColorizeAgeMode...");
    markLateTickets();
    log("enterColorizeAgeMode done");
}

function enterColorizeServiceLineMode() {
    log("enterColorizeServiceLineMode...");
    $(".ghx-grabber").css("display","block");
    GH.EpicView.updateEpicColor
    log("enterColorizeServiceLineMode done");
}

function toggleIssueColorization() {
    if (inColorizeServiceLineMode) {
        inColorizeServiceLineMode = !inColorizeServiceLineMode;
        enterColorizeAgeMode();
    } else {
        inColorizeServiceLineMode = !inColorizeServiceLineMode;
        enterColorizeServiceLineMode();
    }
    
    if ("Colorize ServiceLines" == $("#colorText").text()) {
        $("#colorText").text("Colorize age");
    } else {
        $("#colorText").text("Colorize ServiceLines");
    }
}

function toggleProgressBarView() {
    if (inProgressBarMode) {
        leaveProgressBarView();
    } else {
        enterProgressBarView();
    }
    inProgressBarMode = !inProgressBarMode;
    if ("Zoom out" == $("#zoomText").text()) {
        $("#zoomText").text("Zoom in");
    } else {
        $("#zoomText").text("Zoom out");
    }
}



function convertFilterButtonsIntoPullDown() {
    log("convertFilterButtonsIntoPullDown...");
    
    // Wait for the list of quick filters to be available
    $("div#ghx-controls-work dl").onAvailable(function() {
        
        
    
        $("div#ghx-controls-work dl:first-child > dt").css("display","none");
        
    	// Add a new list to the above div and put one item inside which will be the button to hover the pull down menu
        $("<dl><dt id='slFilterButton' style='font-weight:normal;line-height:1.4;background:" + MENU_BACKGROUND_COLOR + ";background-position: 8% 50%;background-repeat: no-repeat;background-image: url(\"/rest/api/1.0/dropdowns?color=%23ffffff&bgcolor=%23114070\");padding-top:4px;padding-left:24px;padding-right:5px;padding-bottom:5px;color:white;font-size:10pt;cursor: pointer'>Filter by...</dt></dl>").appendTo($("div#ghx-controls-work"));
        
        
        
    	// Now move all ServiceLine, Department or other orga filters into the newly created list
        $("dd:not(:contains('SL '))dd:not(:contains('DEP '))dd:not(:contains('Supporting Teams'))dd:not(:contains('External'))dd:not(:contains('PMI'))dd:not(:contains('Project Management'))").detach().appendTo($("div#ghx-controls-work dl:last-child"));
        
        // Reformat the original list that now contains all ServiceLine filters, etc. so that it is hidden and lies under the "Filter by..." button.
        $("div#ghx-controls-work dl:first-child").css('list-style', 'none').css('position', 'absolute').css('left', '15px').css('top', '25px').css('float', 'left').css('display', 'none').css('z-index', '99').css('width', '180px').css('margin', '0').css('padding', '0').css('background', MENU_BACKGROUND_COLOR);
        $("div#ghx-controls-work dl:first-child > dd").css('width', '180px').css('margin', '0').css('padding', '0').css('border', 'none').css('clear', 'both');
        
        console.log($("div#js-work-quickfilters"));
        
        $("dd.ghx-quickfilter-trigger").css('display', 'none');
        $("div#js-work-quickfilters").removeClass("aui-expander-content");		
              
        
       	// Reformat the new list with the moved itemss
        $("div#ghx-controls-work dl:last-child > dd").css("font-size","10pt").css("padding-top","4px").css("padding-right","5px").css("padding-bottom","5px").css("background",MENU_BACKGROUND_COLOR).css("color","white");
        
        // Slide down the original list under the button and make it visible
        $("#slFilterButton").on("mouseenter", function () {
            $(this).css('background', MENU_HOVER_COLOR).css('background-position', '8% 50%').css('background-repeat', 'no-repeat').css('background-image', 'url(\"/rest/api/1.0/dropdowns?color=%23ffffff&bgcolor=%23114070\")');
            $("div#ghx-controls-work dl:first-child").slideDown('fast');
        })

        // Slide up again and hide the list
        $("div#ghx-controls-work dl:first-child").hover(function () {
        }, function () {
            $("#slFilterButton").css('background', MENU_BACKGROUND_COLOR).css('background-position', '8% 50%').css('background-repeat', 'no-repeat').css('background-image', 'url(\"/rest/api/1.0/dropdowns?color=%23ffffff&bgcolor=%23114070\")');
            $("div#ghx-controls-work dl:first-child").slideUp('slow');
        })
    });
    
log("convertFilterButtonsIntoPullDown done");
}

function addColorizeButtonToButtonBar() {
    $(NODE_TO_ADD_CUSTOM_BUTTONS).onAvailable(function () {
            $("<dd id='colorizeButton' style='padding-top:6px;background:" + MENU_BACKGROUND_COLOR + ";color:white;font-size:10pt;cursor: pointer;padding-left:5px;padding-top:4px;padding-bottom:5px;padding-right:5px'><span id='colorText'>Colorize ServiceLines</span></dd>").appendTo(NODE_TO_ADD_CUSTOM_BUTTONS);

            $("#colorizeButton").on("click",function () {
                toggleIssueColorization()
            }).on("mouseenter",function () {
                    $(this).css('background', MENU_HOVER_COLOR);
                }).on("mouseleave", function () {
                    $(this).css('background', MENU_BACKGROUND_COLOR);
                })
        }
    )
}

function addZoomButtonToButtonBar() {
    $(NODE_TO_ADD_CUSTOM_BUTTONS).onAvailable(function () {
            $("<dd id='zoomButton' style='padding-top:6px;background:" + MENU_BACKGROUND_COLOR + ";color:white;font-size:10pt;cursor: pointer;padding-left:5px;padding-top:4px;padding-bottom:5px;padding-right:5px'><span id='zoomText'>Zoom out</span></dd>").appendTo(NODE_TO_ADD_CUSTOM_BUTTONS);

            $("#zoomButton").on("click",function () {
                toggleProgressBarView()
            }).on("mouseenter",function () {
                    $(this).css('background', MENU_HOVER_COLOR);
                }).on("mouseleave", function () {
                    $(this).css('background', MENU_BACKGROUND_COLOR);
                })
        }
    )
}

function addShowAssigneeButtonToButtonBar() {
    $(NODE_TO_ADD_CUSTOM_BUTTONS).onAvailable(function () {
            $("<dd id='showAsigneeButton' style='padding-top:6px;background:" + MENU_BACKGROUND_COLOR + ";color:white;font-size:10pt;cursor: pointer;padding-left:5px;padding-top:4px;padding-bottom:5px;padding-right:5px'><span id='showAsigneesText'>Show asignees</span></dd>").appendTo(NODE_TO_ADD_CUSTOM_BUTTONS);

            $("#showAsigneeButton").on("click",function () {
				showAsignees();                
            }).on("mouseenter",function () {
                    $(this).css('background', MENU_HOVER_COLOR);
                }).on("mouseleave", function () {
                    $(this).css('background', MENU_BACKGROUND_COLOR);
                })
        }
    )
}

function showAsignees() {
    if($(".ghx-issue .ghx-avatar img").css("display") == "block") {
        $("#showAsigneesText").text("Show asignees");
        $(".ghx-issue .ghx-avatar img").css("display","none");
    } else {
        $("#showAsigneesText").text("Hide asignees");
        $(".ghx-issue .ghx-avatar img").css("display","block");
    }
}

function beautifyBoard() {
    log("beautifyBoard...");
    overwriteStaticCss();
    overwriteCssAfterRefresh();
    addZoomButtonToButtonBar();
    addShowAssigneeButtonToButtonBar();
    //addColorizeButtonToButtonBar();
    convertFilterButtonsIntoPullDown(); 
	log("beautifyBoard done");
}

function overwriteCssAfterRefresh() {
   	log("overwriteCssAfterRefresh...");
    $(".ghx-issue").onAvailable(function () {
    	log("available");    
        adjustColumnSizes();
        refreshProgressBarView();
    });
    log("overwriteCssAfterRefresh done");
}


function visualizeProgressOfEpics(addEpicEvent) {
    log("visualizeProgressOfEpics...");
    $.get( "/rest/api/2/search?jql=cf[10951]=" + addEpicEvent.target.innerHTML, function( data ) {
        printNumberOfStoriesOnEpic(addEpicEvent.target.offsetParent, data.issues);
	});
    log("visualizeProgressOfEpics done");
}


function printNumberOfStoriesOnEpic(epicNode, storiesInEpic) {
    $(epicNode).append($("<div class='storiesInEpic'><span id='storiesDone'>0</span>|<span id='storiesTotal'>" + storiesInEpic.length + "</span></div>"));
    for(var storyKey=0;storyKey < storiesInEpic.length;storyKey++) {
    	$.get( "/rest/api/2/issue/" + storiesInEpic[storyKey].key, function( storyData ) {
        	if(null == storyData.fields.resolution) {
                return;
            }
            if("Done" == storyData.fields.resolution.name || "Fixed" == storyData.fields.resolution.name || "Won't Do" == storyData.fields.resolution.name) {
            	var currentStoriesDone = parseInt(($(epicNode).find($("div .storiesInEpic span#storiesDone"))).text());
               	$(epicNode).find($("div .storiesInEpic span#storiesDone")).text(++currentStoriesDone);
            }
        });
    }
}

function parseDateFromJira(datestring) {
	var parts = datestring.split('T')[0].split('-');
	var date = new Date(parts[0], parts[1]-1, parts[2]);
	return date;
}

function visualizeDaysAliveOnEpics(addEpicEvent) {
	log("visualizeDaysAliveOnEpics...");
	$.get( "/rest/api/2/issue/" + addEpicEvent.target.innerHTML, function( storyData ) {
		var oneDay = 24*60*60*1000;
		
		var firstDate = parseDateFromJira(storyData.fields.created);
		
		var secondDate = new Date();
		
		if(storyData.fields.resolutiondate != null) {
			secondDate = parseDateFromJira(storyData.fields.resolutiondate);
		}
		
		var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
		
		printDaysAliveOnEpic(addEpicEvent.target.offsetParent, diffDays);
	});
	log("visualizeDaysAliveOnEpics done");
}

function printDaysAliveOnEpic(epicNode, diffDays) {
	log("printDaysAliveOnEpic ...");
	$(epicNode).append($("<div class='epicDaysAlive'><span>" + 0 + "</span></div>"));
	$(epicNode).find($("div .epicDaysAlive")).text(diffDays);
	log("printDaysAliveOnEpic done");
}

var DOMTimeout = null;

$(document).ready(function () {
    console.log(new Date().toLocaleTimeString() + " document is ready");
    stop = false;
    beautifyBoard();
	
    $("#ghx-work").on("DOMNodeInserted", function (event) {
        
        
        if('A' != event.target.nodeName) {
            return;
        }
        
        if('ghx-key-link js-detailview' != event.target.className) {
            return;
        }
	
	$.get( "/rest/api/2/issue/LCMS-626", function( storyData ) {
		console.log("Done");
		console.dir(storyData);
	});
	
	$.get( "/rest/api/2/issue/LCMS-1275", function( storyData ) {
		console.log("Open"); 
		console.dir(storyData);
	});
        
	visualizeDaysAliveOnEpics(event); 
	
        visualizeProgressOfEpics(event);	
		
        markLateTickets(event);        
        
        if(DOMTimeout) {
            clearTimeout(DOMTimeout);
        }
        DOMTimeout = setTimeout(function() {
            
            overwriteCssAfterRefresh();

                    
            
        	
            
        }, 150);
        
        
        
	});
    
    
    
});

function log(text) {
    console.dir(new Date().toLocaleTimeString() + " " + text);
}

/* Adds functionality to jQuery to wait for an element to be available;
 * this is useful for the rapid board because most of the page is loaded
 * after document ready by Ajax */
$.fn.onAvailable = function (fn) {
    var sel = this.selector;
    var timer;
    if (this.length > 0) {
        fn.call(this);
    }
    else {
        timer = setInterval(function () {
            if ($(sel).length > 0) {
                fn.call($(sel));
                clearInterval(timer);
            }
        }, 1000);
    }
};