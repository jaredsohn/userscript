// ==UserScript==
// @name        IS24 Portfolio Overview - Jira Rapid Board
// @namespace   de.mobile.immobilienscout24.rapidboard
// @description Customization for cards displayed on the Jira RapidBoard forked from the script build for the rapid boord at mobile.de
// @include     https://jira.corp.mobile.de/jira/secure/RapidBoard.jspa?rapidView=*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     v33_is24
// @grant       none
// ==/UserScript==

/* ===============
 * Version History
 * ===============
 * 
 * v33_is24, 2013-08-14 - Project Management is now a filter.
 * v32.3_is24, 2013-08-14 - I fixed a bug. New even the last column header gets the right number of issues per filter.
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

const BACKGROUND_COLOR = "rgba(22, 75, 106, 1)";

const MENU_BACKGROUND_COLOR = "rgba(26, 90, 127, 1)";

const MENU_HOVER_COLOR = "rgb(31,108,150)";

const ISSUE_HOVER_COLOR = "rgba(153, 173, 194, 1)";

const ISSUE_HEIGHT = 60;

const ISSUE_GRABBER_HEIGHT = 78;

const ISSUE_WIDTH = 88;

const ISSUE_FONT_SIZE = "8pt";

const SWIMLANE_HEADER_SIZE = "18pt";

const COLUMN_HEADER_SIZE = "18pt";

const FOREGROUND_COLOR = "white";

const YELLOW_MARKER_COLOR = "rgba(247,223,86,1)";

const RED_MARKER_COLOR = "rgba(181,75,50,1)";

/* Number of the development column */
var columnId = 2;

/* tickets that are more days than this in development are marked red */
const DAYS_RED = 180;

/* tickets that are more days than this in development are marked red */
const DAYS_YELLOW = 28;

var inProgressBarMode = false;

/* The JQuery selector to a dom node to which custom buttons for zoom and other features are added */
var NODE_TO_ADD_CUSTOM_BUTTONS = "div#ghx-controls-work ul:last-child";

/* Fix for Greasemonkey 1.0 bug, see http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html */
$ = this.$ = this.jQuery = jQuery.noConflict(true);

function addCss(css) {
    var newCss = document.createElement("style");
    newCss.type = "text/css";
    newCss.innerHTML = css;
    $("head")[0].appendChild(newCss);
}


function overwriteStaticCss() {
    console.log("Overwrite static css...");
    /* =================
     * Overall Background
     * ==================*/

    /* make backgrounds blue */
    addCss(".ghx-pool { background: " + BACKGROUND_COLOR + " }");
    addCss("#gh { background: " + BACKGROUND_COLOR + " }");
    addCss("#ghx-content-main { background: " + BACKGROUND_COLOR + "; border:none; margin:0; padding:0 }");
    addCss(".ghx-column { background: " + BACKGROUND_COLOR + " }");

    /* =================
     * Header
     * ==================*/

    addCss("#header { background: " + BACKGROUND_COLOR + " }");
    addCss(".alertHeader { display:none }");
    addCss("#ghx-header { margin:0; padding-top:5px; padding-bottom:5px }");
    addCss("#header, #footer, .layout {display:block}");

    /* hide "create Issue" Button */
    addCss("#createItem { display:none }");

    /* hide Navigation Buttons */
    addCss("#menu { display:none }");

    /* create separator */
    addCss("#header-bottom { min-height:0px; border:none }");
    
    
    /* supress error messages in header */
    addCss("#ghx-errors { display:none;}");

    /* =================
     * Buttons
     * ==================*/

    addCss(".ops li .button { color:white;background: " + MENU_BACKGROUND_COLOR + ";margin:2px;border:none;margin:0 }");
    addCss(".ops li .button:hover { background:" + MENU_HOVER_COLOR + ";}");
    addCss(".ops li.last { margin:0 }");
    addCss(".js-mode-selector li {display:none}");
    addCss(".ghx-release {display:none}");
    addCss(".ghx-icon-collapse {background:none;display:block;text-indent:0;vertical-align:bottom;width:100%}");
    addCss(".ghx-icon-expand {background:none;display:block;text-indent:0;vertical-align:bottom;width:100%}");


    /* ==========
     * Issue Cards
     * ===========*/

    addCss(".ghx-issue:hover {background:" + ISSUE_HOVER_COLOR + "}");

    /* add a shadow to cards */
    addCss(".ghx-issue { box-shadow: none; background:white}");
        
    /* make issues floating and round corners*/
    addCss(".ghx-issue { float: left; cursor: pointer; border-radius: 0 0 10px 0;margin:2px}");
    addCss(".ghx-has-days .ghx-grabber { background:white; display:none}");

    /* Hide epic symbol */
    addCss(".ghx-issue { padding-left: 12px; padding-top: 8px }");
    addCss(".ghx-issue-fields .ghx-type { display: none }");

    /* hide priority symbol */
    addCss(".ghx-priority { display:none }");

    /* make text on the "cards" bigger so that more is visible */
    addCss(".ghx-summary { font-size: " + ISSUE_FONT_SIZE + " }");
    addCss(".ghx-issue-fields { padding-right: 0px !important; }");
    addCss(".ghx-issue-fields .ghx-key {font-size: " + ISSUE_FONT_SIZE + "; height: 13px; line-height: 0.98em }");
    addCss(".ghx-issue-fields .ghx-key a { color: " + BACKGROUND_COLOR + "; word-wrap: break-word;display:block}");
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
    addCss(".ghx-has-days .ghx-days { display:none}");

    /* ====================
     * Columns and Swimlanes
     * =====================*/

    /* make column and swim lane headers bigger and modify colors */
    addCss(".ghx-swimlane .ghx-swimlane-header { top: 1px;");
    addCss(".ghx-swimlane .ghx-swimlane-header h2 { font-size: " + SWIMLANE_HEADER_SIZE);
    addCss(".ghx-swimlane .ghx-swimlane-header h2 .ghx-heading { background: " + BACKGROUND_COLOR + "; color: " + FOREGROUND_COLOR + " ;border:none; padding:0}");
    addCss(".ghx-swimlane .ghx-swimlane-header .ghx-twixie b { border-color: " + FOREGROUND_COLOR + " transparent -moz-use-text-color; }");
    addCss(".ghx-swimlane .ghx-swimlane-header .ghx-info { color: " + BACKGROUND_COLOR + "; background: none repeat scroll 0 0 rgba(255, 255, 255, 0.8) }");
    addCss(".ghx-column-headers .ghx-column h2 { color: " + FOREGROUND_COLOR + "; font-size: " + COLUMN_HEADER_SIZE + "; float: left }");
    addCss("li.ghx-column { padding-left: 15px;}");

    addCss(".ghx-parent-stub { display: none}");
    
    /* number of issues */

    addCss(".ghx-column-headers .ghx-col-qty span, .ghx-header .ghx-busted { background:" + BACKGROUND_COLOR + ";border:none }");
    addCss(".ghx-qty { color: " + FOREGROUND_COLOR + ";background:" + BACKGROUND_COLOR + " }");
    addCss(".ghx-column-headers .ghx-col-qty {position:relative;margin:0;float: left; font-size:" + COLUMN_HEADER_SIZE + "}");
    addCss(".ghx-nav-views a { color: " + FOREGROUND_COLOR + " }");


}

function markLateTickets() {
    console.log("markLateTickets...");
    $("li.ghx-column[data-column-id=" + columnId + "] div.ghx-issue").each(function () {

        var days = $(this).find(".ghx-days").attr("title");
        days = Number(days.substring(0, days.indexOf(" ")));

        if (days > DAYS_RED) {
            $(this).find(".ghx-grabber").css("background", RED_MARKER_COLOR).css("display", "block");
        } else if (days > DAYS_YELLOW) {
            $(this).find(".ghx-grabber").css("background", YELLOW_MARKER_COLOR).css("display", "block");
        }
    });
}


//function makeBugsRedBordered() {
//    $(".ghx-issue.ghx-has-days").each(function () {
//            var type = $(this).find(".ghx-issue-fields .ghx-type img").attr("alt");
//            if ("Bug" == type) {
//                $(this).css("cssText", "width:75px !important").css("height", "55px").css("cssText", "border:1px solid red");
//                $(this).find(".ghx-grabber").css("height", "54px");
//                $(this).find(".ghx-issue-fields .ghx-key").css("font-size", "6pt").css("line-height", "0.46em").css("height", "8px");
//            }
//        }
//    )
//}

//function makeStoriesSmaller() {
//    $(".ghx-issue.ghx-has-days").each(function () {
//            var type = $(this).find(".ghx-issue-fields .ghx-type img").attr("alt");
//            if ("Story" == type) {
//                $(this).css("width", "75px").css("height", "55px");
//                $(this).find(".ghx-grabber").css("height", "54px");
//                $(this).find(".ghx-issue-fields .ghx-key").css("font-size", "6pt").css("line-height", "0.46em").css("height", "8px");
//                $(this).find(".ghx-summary").css("font-size", "6pt");
//            }
//        }
//    )
//}

function adjustColumnSizes() {
    console.log("adjustColumnSizes...");
    $(".ghx-column-headers li:first-child").css("width", "25%");
    $(".ghx-column-headers li:last-child").css("width", "25%");

	$(".ghx-columns li:first-child").each(function () {
        $(this).css("width", "25%");
    });

    $(".ghx-columns li:last-child").each(function () {
        $(this).css("width", "25%");
    });
}

function overwriteCssAfterRefresh() {
    console.log("Overwrite css after refresh...");
    $(".ghx-issue").onAvailable(function () {
        identifyInProgressColumnId();
        adjustColumnSizes();
        markLateTickets();
        refreshProgressBarView();
        
    });

}

function enterProgressBarView() {
    console.log("enterProgressBarView...");
    $(".ghx-summary").css("display", "none");
    $(".ghx-issue-fields .ghx-key").css("font-size", "8pt");
    
    $(".ghx-issue.ghx-has-days").height(ISSUE_HEIGHT / 2.0).width(ISSUE_WIDTH / 2.0);
    $(".ghx-has-days .ghx-grabber").height(48);
    
    $(".ghx-issue.ghx-issue-subtask.ghx-has-days").height(25).width(38);
    $(".ghx-issue.ghx-issue-subtask.ghx-has-days .ghx-grabber").height(42);
    
    $(".ghx-swimlane .ghx-swimlane-header h2").css("font-size", "12pt");
    $(".ghx-column-headers .ghx-column h2").css("font-size", "12pt");
    $(".ghx-column-headers .ghx-col-qty").css("font-size", "12pt");
    $(".ghx-columns .ghx-column").css("padding-bottom", 0);
    $(".ghx-issue .ghx-avatar img").height("15px");
    $(".ghx-issue .ghx-avatar img").width("15px");
}

function leaveProgressBarView() {
    console.log("leaveProgressBarView...");
    $(".ghx-summary").css("display", "inline");
    $(".ghx-issue-fields .ghx-key").css("font-size", "10pt");
    
    $(".ghx-issue.ghx-has-days").height(ISSUE_HEIGHT).width(ISSUE_WIDTH);
    $(".ghx-has-days .ghx-grabber").height(78);
    
    $(".ghx-issue.ghx-issue-subtask.ghx-has-days").height(50).width(75);
    $(".ghx-issue.ghx-issue-subtask.ghx-has-days .ghx-grabber").height(67);
    
    $(".ghx-swimlane .ghx-swimlane-header h2").css("font-size", SWIMLANE_HEADER_SIZE);
    $(".ghx-column-headers .ghx-column h2").css("font-size", COLUMN_HEADER_SIZE);
    $(".ghx-column-headers .ghx-col-qty").css("font-size", COLUMN_HEADER_SIZE);
    $(".ghx-columns .ghx-column").css("padding-bottom", 32);
    $(".ghx-issue .ghx-avatar img").height("35px");
    $(".ghx-issue .ghx-avatar img").width("35px");
}

function refreshProgressBarView() {
    if (inProgressBarMode) {
        enterProgressBarView();
    } else {
        leaveProgressBarView();
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
    
    if(undefined != $("#slFilterButton")[0]) {
        return;
    }
    
    $(NODE_TO_ADD_CUSTOM_BUTTONS).onAvailable(function () {
        $("<li id='slFilterButton' style='background:" + MENU_BACKGROUND_COLOR + ";background-position: 8% 50%;background-repeat: no-repeat;background-image: url(\"/rest/api/1.0/dropdowns?color=%23ffffff&bgcolor=%23114070\");padding-top:4px;padding-left:24px;padding-right:5px;padding-bottom:5px;color:white;font-size:10pt;cursor: pointer'><span id='slFilterButton'>Filter by ...</span></li>").prependTo(NODE_TO_ADD_CUSTOM_BUTTONS);

        $("#slFilterButton").on("mouseenter", function () {
            $(this).css('background', MENU_HOVER_COLOR).css('background-position', '8% 50%').css('background-repeat', 'no-repeat').css('background-image', 'url(\"/rest/api/1.0/dropdowns?color=%23ffffff&bgcolor=%23114070\")');
            $("div#ghx-controls-work ul:first-child").slideDown('fast');
        })

        $("div#ghx-controls-work ul:first-child").hover(function () {
        }, function () {
            $("#slFilterButton").css('background', MENU_BACKGROUND_COLOR).css('background-position', '8% 50%').css('background-repeat', 'no-repeat').css('background-image', 'url(\"/rest/api/1.0/dropdowns?color=%23ffffff&bgcolor=%23114070\")');
            $("div#ghx-controls-work ul:first-child").slideUp('slow');
        })
	
    });

    
    
    
    $("div#ghx-controls-work ul:first-child").onAvailable(function () {
        $("li.ghx-quickfilter:not(:contains('Project Management'))li.ghx-quickfilter:not(:contains('SL '))li.ghx-quickfilter:not(:contains('DEP '))li.ghx-quickfilter:not(:contains('Supporting Teams'))li.ghx-quickfilter:not(:contains('PMI'))li.ghx-quickfilter:not(:contains('External'))").detach().appendTo(NODE_TO_ADD_CUSTOM_BUTTONS);
        $("div#ghx-controls-work ul:first-child li:last-child").detach().appendTo(NODE_TO_ADD_CUSTOM_BUTTONS);
        $("div#ghx-controls-work ul:first-child").css('list-style', 'none').css('position', 'absolute').css('left', '15px').css('top', '25px').css('float', 'left').css('display', 'none').css('z-index', '99').css('width', '150px').css('margin', '0').css('padding', '0').css('background', MENU_BACKGROUND_COLOR);
		$("div#ghx-controls-work ul:first-child > li").css('width', '150px').css('margin', '0').css('padding', '0').css('border', 'none').css('clear', 'both');
    });
}

function addZoomButtonToButtonBar() {
    $(NODE_TO_ADD_CUSTOM_BUTTONS).onAvailable(function () {
            $("<li id='zoomButton' style='padding-top:6px;background:" + MENU_BACKGROUND_COLOR + ";color:white;font-size:10pt;cursor: pointer;padding-left:5px;padding-top:4px;padding-bottom:5px;padding-right:5px'><span id='zoomText'>Zoom out</span></li>").appendTo(NODE_TO_ADD_CUSTOM_BUTTONS);

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
            $("<li id='showAsigneeButton' style='padding-top:6px;background:" + MENU_BACKGROUND_COLOR + ";color:white;font-size:10pt;cursor: pointer;padding-left:5px;padding-top:4px;padding-bottom:5px;padding-right:5px'><span id='showAsigneesText'>Show asignees</span></li>").appendTo(NODE_TO_ADD_CUSTOM_BUTTONS);

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
    console.log("Show asignees...");
    console.log($(".ghx-issue .ghx-avatar img").css("display"));
    if($(".ghx-issue .ghx-avatar img").css("display") == "block") {
        $("#showAsigneesText").text("Show asignees");
        $(".ghx-issue .ghx-avatar img").css("display","none");
    } else {
        $("#showAsigneesText").text("Hide asignees");
        $(".ghx-issue .ghx-avatar img").css("display","block");
    }
}

function countStoriesInColumnAndUpdateHeader() {
	console.log("recounting issues...");
    
    for(var columnId = 0;columnId <= 4;columnId++) {
		var issuesInColumn = 0;
		$("li.ghx-column[data-column-id=" + columnId + "] div.ghx-issue").each(function () {
			issuesInColumn++;
		});
        if(issuesInColumn != $("#ghx-column-headers > li.ghx-column:eq(" + columnId + ") > div.ghx-col-qty").text()) {
            $("#ghx-column-headers > li.ghx-column:eq(" + columnId + ") > div.ghx-col-qty").html("<span style='color:white'>" + issuesInColumn + "</span>");
        }
    }
}




function identifyInProgressColumnId() {
    var counter = 0;
    $("#ghx-column-headers li.ghx-column h2").onAvailable(function() {
    	$("#ghx-column-headers li.ghx-column h2").each(function() {
        	var columnName = $(this).text().trim();
        	if (columnName == "In Progress") {
            	columnId = counter;
        	}
            counter++;
    	})
    });
}

function beautifyBoard() {
    console.log("Beautify board...");
    overwriteStaticCss();

    $(".ghx-issue").onAvailable(function () {
        overwriteCssAfterRefresh();
    });

    addZoomButtonToButtonBar();
    addShowAssigneeButtonToButtonBar();
}

$(document).ready(function () {
    beautifyBoard();
    
    $("#ghx-pool").on("DOMNodeInserted", function (event) {
    	console.log("DOMNodeInserted caught at " + event.currentTarget + " " + event.target.nodeName + " " + event.type);
    
    	if("UL" != event.target.nodeName) {
        	return;
    	}
    
    	overwriteCssAfterRefresh();
    	convertFilterButtonsIntoPullDown();
    	countStoriesInColumnAndUpdateHeader();
	});
    
});


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