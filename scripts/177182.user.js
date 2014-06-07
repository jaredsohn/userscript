// ==UserScript==
// @name       Google Calendar Sidebarizer
// @namespace  http://www.arthaey.com
// @version    1.0
// @description  Hides everything but the calendar portion of the UI.
// @match      http://www.google.com/calendar/*
// @match      https://www.google.com/calendar/*
// @match      http://calendar.google.com/*
// @match      https://calendar.google.com/*
// ==/UserScript==

// Google-controlled element IDs and CSS classes, subject to change without notice. :(
var ELEMENTS = {
    calendarContainer: { id: "mainbody" },
    calendar: { id: "scrolltimedeventswk" },
    extra: { id: "bdata" },
    oneBar: { id: "onegoogbar" },
    sideNav: { id: "nav" },
    topNav: { id: "vr-nav" },
    viewMenuContainer: { id: "topRightNavigation" } /* IE ಠ_ಠ */
};
var VIEW_OPTION_CLASS_NAME = "goog-imageless-button-collapse-right";

/******************************************************************************
 * SIDEBARIZE FUNCTIONS
 ******************************************************************************/

function sidebarize() {
    // Hide everything but the calendar itself.
    hideElement(ELEMENTS.oneBar);
    hideElement(ELEMENTS.extra);
    hideElement(ELEMENTS.sideNav);
    hideElement(ELEMENTS.topNav);
    
    // Show sidebarize links.
    showElement(ELEMENTS.actionsContainer);
    
    // Remove unwanted styles.
    var calendarContainer = ELEMENTS.calendarContainer;
    calendarContainer.originalMarginLeft = calendarContainer.node.style.marginLeft;
    calendarContainer.node.style.marginLeft = "0";
}

function unsidebarize() {
    // Hide sidebarize links
    hideElement(ELEMENTS.actionsContainer);
    
    // Show hidden elements.
    showElement(ELEMENTS.oneBar);
    showElement(ELEMENTS.extra);
    showElement(ELEMENTS.sideNav);
    showElement(ELEMENTS.topNav);
    
    // Restore original styles.
    var calendarContainer = ELEMENTS.calendarContainer;
    calendarContainer.node.style.marginLeft = calendarContainer.originalMarginLeft;
    ELEMENTS.calendar.node.style.overflowY = "scroll";
}

function addSidebarizeOption() {
    // Find the "Agenda" option, to copy.
    var viewMenu = ELEMENTS.viewMenuContainer.node.childNodes[0];
    if (!viewMenu) return;    
    var agendaOption = viewMenu.childNodes[5];
    if (!agendaOption) return;
    
    // Create "Sidebarize" option, copied from "Agenda".
    var sidebarizeOption = agendaOption.cloneNode(true);
    var optionText = sidebarizeOption.childNodes[0].childNodes[0].childNodes[0].childNodes[1]; // So ugly...
    if (!optionText) return;
    optionText.innerHTML = "Sidebarize";
    sidebarizeOption.onclick = sidebarize;
    
    // Update styles and add options to UI.
    agendaOption.className += " " + VIEW_OPTION_CLASS_NAME;
    viewMenu.appendChild(sidebarizeOption);
    addLinkBelowCalendar("Unsidebarize", unsidebarize);
    addLinkBelowCalendar("Toggle scrollbar", toggleScrollbar);
    addLinkBelowCalendar("Remove these links", hideActions);
}

function toggleScrollbar() {
    var cal = ELEMENTS.calendar.node;
    cal.style.overflowY = (cal.style.overflowY == "hidden") ? "scroll" : "hidden";
}

function hideActions() {
    if (confirm("If you remove these links, you will have to refresh the page to see them again.")) {
        hideElement(ELEMENTS.actionsContainer);
    }
}

/******************************************************************************
 * HELPER FUNCTIONS
 ******************************************************************************/

function hideElement(elementObj) {
    elementObj.node.style.display = "none";
}

function showElement(elementObj) {
    elementObj.node.style.display = "block";
}

function addLinkBelowCalendar(text, func) {
    var link = document.createElement("a");
    link.href = "#";
    link.innerHTML = text;
    link.onclick = func;
    link.style.paddingRight = "1em";
    
    if (!ELEMENTS.actionsContainer) {
        var div = document.createElement("div");        
        ELEMENTS.actionsContainer = {
            id: "sidebarizer-actions-container",
            node: div /* IE ಠ_ಠ */
        };
    	ELEMENTS.calendarContainer.node.appendChild(div);
        hideElement(ELEMENTS.actionsContainer);
    }
    ELEMENTS.actionsContainer.node.appendChild(link);
}

function findElements() {
    var foundAllElements = true;
    for (var elementKey in ELEMENTS) {
        var element = ELEMENTS[elementKey];
        element.node = document.getElementById(element.id);
        if (!element.node) {
            foundAllElements = false;
        }
    }
    return foundAllElements;
}

/******************************************************************************
 * ENTRY POINT
 ******************************************************************************/

// Wait 1 second; things in the One Bar have to load before the script will work.
setTimeout(function() {
    if (findElements()) {
    	addSidebarizeOption();
    }
}, 1000);