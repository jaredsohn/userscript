// ==UserScript==
// @name        C€ Portfolio Overview - Jira 5 Rapid Board - Dev
// @namespace   de.controlexpert.jira.rapidboard
// @description Customization for cards displayed on the Jira RapidBoard forked from "IS24 Portfolio Overview - Jira 5 Rapid Board" http://userscripts.org/scripts/show/172077
// @include     https://jira.controlexpert.com/secure/RapidBoard.jspa?rapidView=77*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     v2 _ce
// @grant       none
// ==/UserScript==

/* ===============
 * Version History
 * ===============
 * v2 _ce 2014-03-28 - Start in BirdView with colourized cards
 * v1.01 _ce 2014-03-28 - Description of the card contain now key and summary in title attribute (tooltip)
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

const ISSUE_GRABBER_HEIGHT = 77;

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

var inProgressBarMode = true;
var inColorizeServiceLineMode = true;

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
    addCss("#ghx-modes { display:none }");
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

function markLateTickets() {
    log("markLateTickets...");
    if(inColorizeServiceLineMode) {
        log("markinColorizeServiceLineMode aborting...");
        return;
    }
      
    
    $(".ghx-grabber").css("display","none");
    
    
    $("li.ghx-column[data-column-id=" + columnId + "] div.ghx-issue").each(function () {
	
        var days = $(this).find(".ghx-days").attr("title");
        days = Number(days.substring(0, days.indexOf(" ")));

        if (days > DAYS_RED) {
            $(this).find(".ghx-grabber").css("background", RED_MARKER_COLOR).css("display", "block");
        } else if (days > DAYS_YELLOW) {
            $(this).find(".ghx-grabber").css("background", YELLOW_MARKER_COLOR).css("display", "block");
        } 
    });
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
    
    $("div.ghx-issue").css("padding-left","0").css("padding-top","0").css("margin","1px").width(ISSUE_WIDTH / 2.8).height(ISSUE_HEIGHT / 5.0);
    
    $("div.ghx-issue:first-child").css("padding-left","0").css("padding-top","0").css("margin","1px").width(ISSUE_WIDTH / 2.8).height(ISSUE_HEIGHT / 5.0);
    
    
	$(".ghx-issue .ghx-grabber").height(ISSUE_GRABBER_HEIGHT / 3.3);
    $(".ghx-issue:first-child .ghx-grabber").height(ISSUE_GRABBER_HEIGHT / 3.4);
    
    $(".ghx-swimlane-header .ghx-heading").css("margin","0px");
    
    $(".ghx-column-headers .ghx-column h2").css("font-size", "8pt");
    $(".ghx-swimlane-header").css("font-size", "8pt");
    $(".ghx-qty").css("font-size", "8pt");
    $(".ghx-columns .ghx-column").css("padding-bottom", 0);
    $(".ghx-issue .ghx-avatar img").height("10px").width("10px");
    $(".ghx-description").css("display","none");
    log("progress bar view entered");
}

function leaveProgressBarView() {
    log("leaving progress bar view");
    $(".ghx-summary").css("display", "inline");
    $(".ghx-issue-fields .ghx-key").css("font-size", "10pt");
    
    log("1");
    
    $("div.ghx-issue").css("padding-left","12px").css("padding-top","8px").css("margin","2px");
    $("div.ghx-issue").width(ISSUE_WIDTH);
    $("div.ghx-issue").height(ISSUE_HEIGHT);
    log("2");
    
    $("div.ghx-issue:first-child").css("padding-left","12px").css("padding-top","8px").css("margin","2px").width(ISSUE_WIDTH).height(ISSUE_HEIGHT);   
    
    log("3");
	$(".ghx-issue .ghx-grabber").height(ISSUE_GRABBER_HEIGHT);    
    $(".ghx-issue:first-child .ghx-grabber").height(ISSUE_GRABBER_HEIGHT);
    $(".ghx-swimlane-header .ghx-heading").css("margin-top","10px");
    
    log("4");
    $(".ghx-column-headers .ghx-column h2").css("font-size", SWIMLANE_HEADER_SIZE);
    $(".ghx-swimlane-header").css("font-size", COLUMN_HEADER_SIZE);
    $(".ghx-qty").css("font-size", COLUMN_HEADER_SIZE);
    $(".ghx-columns .ghx-column").css("padding-bottom", 32);
    $(".ghx-issue .ghx-avatar img").height("35px").width("35px");
    $(".ghx-description").css("display","inline-block");
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


function identifyInProgressColumnId() {
    $("#ghx-column-headers li.ghx-column h2").onAvailable(function() {
    	$("#ghx-column-headers li.ghx-column h2").each(function() {
        	var columnName = $(this).text().trim();
        	if (columnName == "In Progress") {
            	columnId = $(this).parent().attr("data-id");
        	}
    	})
    });
}

function joinTitlesOfKeyAndSummery(){
    log("joinTitlesOfKeyAndSummery...");
    var res = $(".ghx-issue-fields").not(" .ghx-key-link [title*='\n']").each(function() {
			var keyEl = $(this).children(".ghx-key").children(".ghx-key-link").not("[title*='\n']");
            if (keyEl.length>0){
                var summaryEl = $(this).children(".ghx-summary");
                
                var newTitleText = keyEl.attr("title").trim() + "\n" + summaryEl.attr("title").trim()
                
                var newline = "&#xD;";
                
                keyEl.attr("title", newTitleText);
                summaryEl.attr("title", newTitleText);
            }
    	});
    log(res.length + " elements affected");
    log("joinTitlesOfKeyAndSummery done");
}

function beautifyBoard() {
    log("beautifyBoard...");
    overwriteStaticCss();
    overwriteCssAfterRefresh();
    
    addZoomButtonToButtonBar();
    addShowAssigneeButtonToButtonBar();
    addColorizeButtonToButtonBar();
    convertFilterButtonsIntoPullDown(); 
	log("beautifyBoard done");
}

function overwriteCssAfterRefresh() {
   	log("overwriteCssAfterRefresh...");
    $(".ghx-issue").onAvailable(function () {
    	log("available");    
        identifyInProgressColumnId();
        adjustColumnSizes();
        markLateTickets();
        refreshProgressBarView();
    	joinTitlesOfKeyAndSummery();  
    });
    log("overwriteCssAfterRefresh done");
}


var DOMTimeout = null;


$(document).ready(function () {
    console.log(new Date().toLocaleTimeString() + " document is ready");
    
    beautifyBoard();
 
    $("#ghx-work").on("DOMNodeInserted", function (event) {
        
        if('A' != event.target.nodeName) {
            return;
        }
        
        if(DOMTimeout) {
            clearTimeout(DOMTimeout);
        }
        //DOMTimeout = setTimeout(function() {
        //    
        //    overwriteCssAfterRefresh();
        //    
        //}, 150);
        
	});
    
});

function log(text) {
    console.log(new Date().toLocaleTimeString() + " " + text);
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