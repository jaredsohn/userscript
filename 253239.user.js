// ==UserScript==
// @name        Atlassian JIRA Agile Tools
// @namespace   nl.patrickkik
// @description Some mods for JIRA Agile.
// @downloadURL https://userscripts.org/scripts/source/253239.user.js
// @updateURL   https://userscripts.org/scripts/source/253239.user.js
// @include     https://*.atlassian.net/secure/RapidBoard.jspa*
// @version     2.6
// @grant       none
// ==/UserScript==

/*
==== DESCRIPTION ====

Work in progress!

I'm using Atlassian JIRA Agile in a project. I'd like to have some mods.

-- Smart Collapse --

In this version Smart Collapse will collapse the swimlane of resolved user stories to make the board more readable.
In future versions Smart Collapse will be even smarter.

==== RELEASE NOTES ====

1  : First version on userscripts.org.
     Ugly link for smart collapse but it works.
1.1: Added release notes.
     Added download and update urls.
2  : Smart Collapse will collapse the swimlanes of user stories that have all their tasks in To Do.
2.1: Version number visible when hovering over the link.
2.2: ...
2.3: Even better version of smart collapsing. Open de closed swimlanes that should be opened and close the open swimlanes that should be closed.
2.4: The browser is a bit more responsive while smart collapsing.
2.5: Small fix.
2.6: A user story beginning with "[ON HOLD]" will be expanded.
*/
console.debug("Atlassian JIRA Agile Tools started.");

var TITLE = "Atlassian JIRA Agile Tools 2.6, Patrick Kik, 2014";

jQuery(document).ready(init);

function init() {
    console.debug("--> .init()");
    
    setTimeout(addMenu, 500);

    console.debug("<-- .init()");
}

function addMenu() {
    console.debug("--> .addMenu()");
    
    var menuEl = jQuery("div#ghx-modes-tools");
    
    if (menuEl.find("div").length > 0) {
        console.info("Adding menu items...");
        menuEl.prepend(createMenu("Smart Collapse", smartCollapse));
        console.info("Menu items added.");
    }
    else {
        console.info("Could not find menu to add menu item to. Trying again...");
        setTimeout(addMenu, 500);
    }

    console.debug("<-- .addMenu()");
}

function createMenu(name, actionMethod) {
    console.debug("--> .createMenu(" + name + ")");
    
    var aEl = document.createElement("a");
    aEl.textContent = name;
    aEl.title = TITLE;
    
    var divEl = document.createElement("div");
    divEl.style.display = "inline";
    divEl.style.paddingLeft = "1em";
    divEl.addEventListener("click", actionMethod, false);
    divEl.appendChild(aEl);
    
    console.debug("<-- .createMenu(" + name + ")");
    return divEl;
}

function smartCollapse() {
    console.debug("--> .smartCollapse()");

    var delayTime = 200;
    
    jQuery("div.ghx-swimlane").each(function() {
        var swimlane = jQuery(this);

        var onHold = swimlane.find("div.ghx-heading")[0].title.contains("[ON HOLD]");
        var isToDoColEmpty = swimlane.find("li:nth-child(1)").find("div").length == 0;
        var isInProgressColEmpty = swimlane.find("li:nth-child(2)").find("div").length == 0;
        var isDoneColEmpty = swimlane.find("li:nth-child(3)").find("div").length == 0;
        var isSwimlaneClosed = swimlane.hasClass("ghx-closed");

        var shouldBeClosed = false;
        if (isToDoColEmpty && isInProgressColEmpty) {
            // When all tasks are done or there are no tasks at all.
            shouldBeClosed = true;
        } else if (!isToDoColEmpty && isInProgressColEmpty && isDoneColEmpty) {
            // When all tasks are open.
            shouldBeClosed = true;
        }
        
        // When a user story is on hold, it should always be open.
        if (onHold) {
            shouldBeClosed = false;
        }

        // Open de closed swimlanes that should be opened and close the open swimlanes that should be closed.
        if (shouldBeClosed && !isSwimlaneClosed || !shouldBeClosed && isSwimlaneClosed) {
            setTimeout(function() {
                console.log(swimlane);
                swimlane.first().children().first().children().first().click()
            }, delayTime += 200);
        }
    });
    
    console.debug("<-- .smartCollapse()");
}