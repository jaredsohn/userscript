// ==UserScript==
// @author      Michael Mangino
// @name        Feedly - Mark Previous As Read
// @namespace   http://mangino.net/greasemonkey
// @description Adds a button to Feedly that marks items above the current item "as read".
// @include     http://feedly.com/*
// @include     https://feedly.com/*
// @grant       GM_info
// @downloadURL https://userscripts.org/scripts/source/164556.user.js
// @updateURL   https://userscripts.org/scripts/source/164556.meta.js
// @icon        https://imageshack.us/a/img59/2623/feedlymarkpreviousasrea.png
// @version     1.17
// ==/UserScript==

//###########################################################################
// C O N F I G U R A T I O N
//###########################################################################

var COLLAPSE_SELECTED_ITEM = false;

var IS_DEBUG_ON = false;

//###########################################################################
// C O N S T A N T S
//###########################################################################

var FEEDLY_APP_VER_MIN = "16.0.530";
var FEEDLY_APP_VER_MAX = "9999.9999.9999";

var EXCLUDED_PAGES = [ " Today \n ",  "Weekend Edition \n ", "\nIndex \n", " Organize \n", " Saved \n",
        " History \n \n", "Preferences", " \nThemes \n" ];

var COLOR_FEEDLY_GREEN = "#6CC655";

var BUTTON_MPAR_BG_COLOR_ENABLED = COLOR_FEEDLY_GREEN;
var BUTTON_MPAR_BG_COLOR_DISABLED = "darkred";
var BUTTON_MPAR_FG_COLOR_ENABLED = "white";
var BUTTON_MPAR_FG_COLOR_DISABLED = "silver";

var BUTTON_MPAR_ID_MAIN = "buttonMparMain";
var BUTTON_MPAR_ID_FLOAT = "buttonMparFloat";

var BUTTON_MPAR_TEXT = "mark previous read";

var WAIT_MESSAGE_ID = "mprWaitMessage";

var VIEW_CLASS_TITLES = "u0Entry";
var VIEW_CLASS_MAGAZINE = "u4Entry";
var VIEW_CLASS_CARDS = "u5Entry";
var VIEW_CLASS_FULL = "u100Frame";

var FEEDLY_APP_VER = unsafeWindow.feedlyApplicationVersion;

var BROWSER_NAME_CHROME = "Chrome";
var BROWSER_NAME_FIREFOX = "Firefox";

var MSG_NOT_IMPL_FOR_VIEW = "Not implemented for this View.";
var MSG_NOT_IMPL_FOR_VIEW_MAG = "Not implemented for the Magazine or Timeline Views.";
var MSG_NOT_IMPL_FOR_VIEW_CARDS = "Not implemented for the Cards View.";
var MSG_NOT_IMPL_FOR_VIEW_FULL = "Not implemented for the Full Article View.";
        
var MSG_NO_ITEM_SELECTED = "You must first select an item in order to mark previous items as read.";
var MSG_ALL_READ = "All items are already marked as read.";

var MSG_ERROR_INVALID_VIEW_CLASS = "Error: Invalid view class.";
var MSG_ERROR_EXHAUSTED_DOM = "Error: End of DOM reached without finding selcted item.";
var MSG_ERROR_INVALID_ITEM = "Error: Invalid item being processed: ";
var MSG_ERROR_NULL_ITEM = "Error: Null item being processed.";

var MSG_PLEASE_WAIT = "Please wait...";

var DELAY_ITEM_CHECK = 1; // 1/1000th of a second
var DELAY_SCROLL_BACK = 1; // 1/1000th of a second

var LIST_CONTAINER_ID = "feedlyFrame";

//###########################################################################
// G L O B A L S
//###########################################################################

var isFeedlyTooOld = null;
var isFeedlyTooNew = null;

var isBrowserInvalid = null;

var browserName = null;

var buttonBackgroundColor = null;
var buttonForegroundColor = null;

var titleElementMutationObserver = null;
var titleElementMutationObserverInit = null;

var scriptName = null;
var scriptVersion = null;

//###########################################################################
// F U N C T I O N S
//###########################################################################

function markPreviousItemsAsRead() {

    // If this script isn't compatible with the browser or the installed version of Feedly, don't do anything
    if (!isCompatible(true)) {
        return;
    }

    // Save the position of the scrolled item list
    var userScrollPosition = window.pageYOffset;
    debug("markPreviousItemsAsRead: userScrollPosition: [" + userScrollPosition + "]");

    // If the selected item isn't expanded inline AND the selected item isn't selected via keyboard shortcuts...
    var itemList;
    var selectedItem;
    if (!(selectedItem = document.querySelector(".inlineFrame"))
            && !(selectedItem = document.querySelector(".selectedEntry"))) {
        // ...Set the selected item to the last read item in the visible item list
        if ((itemList = getItemList()) !== null) {
            Array.prototype.slice.call(itemList).forEach(function(item) {
                if (item.querySelector(".read")) {
                    selectedItem = item;
                }
            });
            if (!selectedItem) {
                return;
            }
        } else {
            return;
        }
    }
    debug("markPreviousItemsAsRead: selectedItem: [" + selectedItem.id + "]");
    if (!selectedItem) {
        alert(MSG_NO_ITEM_SELECTED);
        return;
    }
    var selectedItemMasterId = selectedItem.id.split("_")[0] + "_" + selectedItem.id.split("_")[1];

    // Get a list of items in the visible item list
    if ((itemList = getItemList()) === null) {
        return;
    }

    // Declare a hash to keep track of which list items we've already processed as we go through and mark them as read
    var itemsProcessed = {};

    // Hide the item list while we're marking previous items as read
    hideList(document.getElementById(LIST_CONTAINER_ID));
    
    // This self-executing function kicks off the processing of the items to be marked as read
    (function markItemAsRead(currentItem) {
    
        if (currentItem === null) {
            showList(document.getElementById(LIST_CONTAINER_ID));
            alert(MSG_ERROR_NULL_ITEM);
            return;
        }

        debug("markItemAsRead: ######## currentItem: [" + currentItem.nodeName + " | " + currentItem.id + "]");

        // If current item is not a DIV, or doesn't end in "_main", "_main_abstract" or "_inlineframe", try next sibling
        if (currentItem.nodeName != "DIV" || (!currentItem.id.match(".+_main$")
                && !currentItem.id.match(".+_main_abstract$") && !currentItem.id.match(".+_inlineframe$"))) {
            if (currentItem.nextSibling) {
                debug("markItemAsRead: -------- currentItem not a DIV, or doesn't end in _main, _main_abstract or "
                        + "_inlineframe. Try next sibling: ["
                        + currentItem.nextSibling.nodeName + " | " + currentItem.nextSibling.id + "]");
                markItemAsRead(currentItem.nextSibling);
            } else {
                showList(document.getElementById(LIST_CONTAINER_ID));
                alert(MSG_ERROR_EXHAUSTED_DOM);
            }
            return;
        }

        // Determine "master" item ID for tracking (e.g., ID "2a2a7bf95c78ac9c_main" has master ID "2a2a7bf95c78ac9c")
        var currentItemMasterId = null;
        if (currentItem.id.match(".+_inlineframe$") || currentItem.id.match(".+_main$")
                || currentItem.id.match(".+_main_abstract$")) {
            currentItemMasterId = currentItem.id.split("_")[0] + "_" + currentItem.id.split("_")[1];
            debug("markItemAsRead: -------- currentItemMasterId: [" + currentItemMasterId + "]");
        } else {
            showList(document.getElementById(LIST_CONTAINER_ID));
            alert(MSG_ERROR_INVALID_ITEM + "[" + currentItem.nodeName + " | " + currentItem.id + "]");
            return;
        }

        // If we've reached the selected item, we're done, so scroll back to the original position and un-hide the list
        if (currentItemMasterId == selectedItemMasterId) {
            debug("markItemAsRead: -------- Reached selected item: [" + selectedItem.id + "]");
            setTimeout(function() {
                click(document.getElementById(selectedItemMasterId + "_main"));
                if (COLLAPSE_SELECTED_ITEM) {
                    setTimeout(function() {
                        click(document.querySelector(".frameActionsTop"));
                        showListAndScroll(LIST_CONTAINER_ID, userScrollPosition);
                    }, DELAY_SCROLL_BACK);
                    return;
                }
                showListAndScroll(LIST_CONTAINER_ID, userScrollPosition);
            }, DELAY_SCROLL_BACK);
            return;
        }

        // If the current item hasn't been read yet and hasn't been processed yet, click it's "main" entry
        if (!currentItem.querySelector(".read") && !itemsProcessed[currentItemMasterId]) {
            itemsProcessed[currentItemMasterId] = true;
            var elementToClick;
            if ((elementToClick = getElementToClick(currentItem)) !== null) {
                click(elementToClick);
                debug("markItemAsRead: -------- START processing currentItemMasterId [" + currentItemMasterId + "]");
                setTimeout(function() {
                    markItemAsRead(currentItem);
                }, DELAY_ITEM_CHECK);
            } else {
                showList(document.getElementById(LIST_CONTAINER_ID));
                alert(MSG_ERROR_INVALID_VIEW_CLASS + ": [" + className + "]");
                removeMparButtons();
            }
            return;
        }
        
        // Else if the current item is being processed but hasn't been marked read yet, wait a bit and check it again
        else if (!currentItem.querySelector(".read") && itemsProcessed[currentItemMasterId]) {
            debug("markItemAsRead: -------- CONTINUE processing currentItemMasterId [" + currentItemMasterId + "]");
            setTimeout(function() {
                markItemAsRead(currentItem);
            }, DELAY_ITEM_CHECK);
            return;
        }
        
        // Else we're done with the current item, so go on to the next one
        else {
            debug("markItemAsRead: -------- FINISHED processing currentItemMasterId [" + currentItemMasterId + "]");
            if (currentItem.nextSibling) {
                setTimeout(function() {
                    markItemAsRead(currentItem.nextSibling);
                }, DELAY_ITEM_CHECK);
            } else {
                showList(document.getElementById(LIST_CONTAINER_ID));
                alert(MSG_ERROR_EXHAUSTED_DOM);
                return;
            }
            return;
        }
        
    })(itemList[0]);
}

function hideList(listContainer) {

    // Hide the list
    listContainer.style.display = "none";
    
    // Create the "Please wait..." message
    var waitMessage = document.createElement("div");
    waitMessage.id = WAIT_MESSAGE_ID;
    waitMessage.style.backgroundColor = COLOR_FEEDLY_GREEN;
    waitMessage.style.color = "white";
    waitMessage.style.whiteSpace="nowrap"
    waitMessage.style.fontSize = "3em";
    waitMessage.innerHTML = MSG_PLEASE_WAIT;
    waitMessage.style.width = "7em";
    waitMessage.style.height = "1.5em";
    waitMessage.style.lineHeight = "1.5em";
    waitMessage.style.marginLeft = "auto";
    waitMessage.style.marginRight = "auto";
    waitMessage.style.position = "relative";
    waitMessage.style.textAlign = "center";
    waitMessage.style.verticalAlign = "middle";
    waitMessage.style.borderRadius = "0.25em";

    // Insert the (hidden) message element so that the "used values" will be available for getting the computed style,
    // then determine the 'top' style value and un-hide the message element
    waitMessage.style.display = "none";
    document.body.insertBefore(waitMessage, document.body.childNodes[0]);
    waitMessage.style.top = (document.body.clientHeight / 2)
            - (parseInt(window.getComputedStyle(waitMessage).height.split("px")) / 2);
    waitMessage.style.display = "block";
}

function showList(listContainer) {
    var waitMessage = document.getElementById(WAIT_MESSAGE_ID);
    waitMessage.parentNode.removeChild(waitMessage);
    listContainer.style.display = "block";
}

function showListAndScroll(listContainerId, scrollPosition) {
    showList(document.getElementById(listContainerId));
    window.scrollTo(0, scrollPosition);
}

function getItemList() {
    var sectionColumn = document.getElementById("section0_column0");
    if (sectionColumn !== null) {
        if (sectionColumn.children.length == 0) {
            return null;
        } else {
            switch (sectionColumn.children[0].className.split(" ")[0].trim()) {
                case VIEW_CLASS_MAGAZINE:
                    alert(MSG_NOT_IMPL_FOR_VIEW_MAG);
                    removeMparButtons();
                    return null;
                case VIEW_CLASS_CARDS:
                    alert(MSG_NOT_IMPL_FOR_VIEW_CARDS);
                    removeMparButtons();
                    return null;
                case VIEW_CLASS_FULL:
                    alert(MSG_NOT_IMPL_FOR_VIEW_FULL);
                    removeMparButtons();
                    return null;
            }
        }
        return sectionColumn.children;
    } else {
        alert(MSG_NOT_IMPL_FOR_VIEW);
        removeMparButtons();
        return null;
    }
}

function getElementToClick(item) {
    var className = item.className.split(" ")[0].trim();
    debug("getElementToClick: className: [" + className + "]");
    switch (className) {
        case VIEW_CLASS_TITLES:
            return item;
        case VIEW_CLASS_MAGAZINE:
        case VIEW_CLASS_CARDS:
        case VIEW_CLASS_FULL:
        default:
            return null;
    }
}

function click(element) {
    if (element != null) {
        debug("click: element [" + element.id + "]");
        var mouseEvent = document.createEvent("MouseEvents");
        mouseEvent.initMouseEvent("click", true, false, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        element.dispatchEvent(mouseEvent);
    }
}

function createMparButton(titleBarId, buttonMparId) {

    // Create the MPAR button
    var buttonMpar = document.createElement("span");
    buttonMpar.id = buttonMparId;
    buttonMpar.style.marginLeft = "10px";
    buttonMpar.style.backgroundColor = buttonBackgroundColor;
    buttonMpar.style.color = buttonForegroundColor;
    buttonMpar.style.whiteSpace="nowrap"
    buttonMpar.className = "hAction secondary";
    buttonMpar.innerHTML = BUTTON_MPAR_TEXT;
    buttonMpar.addEventListener("click", markPreviousItemsAsRead, true);

    // Add the MPAR button to the specified title bar, before the span that displays the unread count
    var feedlyTitleBar = document.getElementById(titleBarId);
    var buttonInserted = false;
    Array.prototype.slice.call(feedlyTitleBar.getElementsByTagName("span")).some(function(spanElement) {
        if (spanElement.className == "hhint") {
            feedlyTitleBar.insertBefore(buttonMpar, spanElement);
            buttonInserted = true;
            return true;
        }
    });
    
    // If there is no hint bar when loading a category (which I suspect is a Feedly bug), add the button anyway
    if (buttonInserted == false) {
        feedlyTitleBar.appendChild(buttonMpar);
    }
}

function removeMparButtons() {
    document.getElementById(BUTTON_MPAR_ID_MAIN).parentNode.removeChild(document.getElementById(BUTTON_MPAR_ID_MAIN));
    document.getElementById(BUTTON_MPAR_ID_FLOAT).parentNode.removeChild(document.getElementById(BUTTON_MPAR_ID_FLOAT));
}

function checkCompatibility() {

    // Check browser validity
    switch (browserName) {
        case BROWSER_NAME_CHROME:
        case BROWSER_NAME_FIREFOX:
            isBrowserInvalid = false;
            break;
        default:
            isBrowserInvalid = true;
            break;
    }

    isFeedlyTooOld = false;
    isFeedlyTooNew = false;

    var feedlyAppVerComponents = FEEDLY_APP_VER.split("\.");

    // Check if Feedly version is too old
    var feedlyAppVerMinComponents = FEEDLY_APP_VER_MIN.split("\.");
    var componentCount = feedlyAppVerComponents.length > feedlyAppVerMinComponents.length
            ? feedlyAppVerComponents.length : feedlyAppVerMinComponents.length
    var i = 0;
    for (i = 0; i < componentCount; i++) {
        var feedly = feedlyAppVerComponents[i] ? feedlyAppVerComponents[i] : 0;
        var min = feedlyAppVerMinComponents[i] ? feedlyAppVerMinComponents[i] : 0;
        if (feedly == min) {
            continue;
        } else if (feedly < min) {
            isFeedlyTooOld = true;
            return;
        } else if (feedly > min) {
            break;
        }
    }

    // Check if Feedly version is too new
    var feedlyAppVerMaxComponents = FEEDLY_APP_VER_MAX.split("\.");
    var componentCount = feedlyAppVerComponents.length > feedlyAppVerMaxComponents.length
            ? feedlyAppVerComponents.length : feedlyAppVerMaxComponents.length
    var i = 0;
    for (i = 0; i < componentCount; i++) {
        var feedly = feedlyAppVerComponents[i] ? feedlyAppVerComponents[i] : 0;
        var max = feedlyAppVerMaxComponents[i] ? feedlyAppVerMaxComponents[i] : 0;
        if (feedly == max) {
            continue;
        } else if (feedly > max) {
            isFeedlyTooNew = true;
            return;
        } else if (feedly < max) {
            break;
        }
    }
}

function isCompatible(isWarningDisplayed) {

    if (isFeedlyTooOld === null || isFeedlyTooNew === null || isBrowserInvalid === null) {
        checkCompatibility();
    }

    if (isFeedlyTooOld && isWarningDisplayed) {
        alert("Script '" + scriptName + "' is incompatible with outdated Feedly version " + FEEDLY_APP_VER + ".");
    } else if (isFeedlyTooNew && isWarningDisplayed) {
        alert("Script '" + scriptName + "' is incompatible with updated Feedly version "  + FEEDLY_APP_VER
            + ". Check the script's homepage to determine if a newer version is available.");
    } else if (isBrowserInvalid && isWarningDisplayed) {
        alert("Script '" + scriptName + "' only runs on " + BROWSER_NAME_CHROME + " and " + BROWSER_NAME_FIREFOX + ".");
    }

    if (isFeedlyTooOld || isFeedlyTooNew || isBrowserInvalid) {
        return false;
    } else {
        return true;
    }
}

function initialize() {

    // Get script info when using Greasemonkey or Tampermonkey
    if (typeof GM_info != 'undefined') {
        scriptName = GM_info.script.name;
        scriptVersion = GM_info.script.version;
    }
    // Else get script info when using Scriptish or ???
    else {
        scriptName = GM_getMetadata("name");;
        scriptVersion = GM_getMetadata("version");;
    }

    console.log("Loading userscript \"" + scriptName + "\" v" + scriptVersion);

    if (navigator.userAgent.match(new RegExp(BROWSER_NAME_CHROME))) {
        browserName = BROWSER_NAME_CHROME;
    } else if (navigator.userAgent.match(new RegExp(BROWSER_NAME_FIREFOX))) {
        browserName = BROWSER_NAME_FIREFOX;
    }
        
    if (isCompatible(true)) {
        buttonBackgroundColor = BUTTON_MPAR_BG_COLOR_ENABLED;
        buttonForegroundColor = BUTTON_MPAR_FG_COLOR_ENABLED;
    } else {
        buttonBackgroundColor = BUTTON_MPAR_BG_COLOR_DISABLED;
        buttonForegroundColor = BUTTON_MPAR_FG_COLOR_DISABLED;
    }

    titleElementMutationObserver = new MutationObserver(function(mutationRecordArray) {

        // Get the text of the mutated title element
        titleText = document.querySelector("title").innerHTML;
        debug("titleElementMutationObserver: titleText: [" + titleText + "]");

        // Don't put the MPAR buttons on certain pages
        if (EXCLUDED_PAGES.some(function(excludedPage) {
            if (titleText.match(excludedPage)) {
                return true;
            }
        })) {
            return;
        }

        // Create MPAR buttons and add them to the title bars
        createMparButton("feedlyTitleBar", BUTTON_MPAR_ID_MAIN);
        createMparButton("floatingTitleBar", BUTTON_MPAR_ID_FLOAT);
    });

    titleElementMutationObserverInit = {
        childList : true,
        attributes : true,
        characterData : true,
        subtree : true
    };
}

function debug(message) {
    if (IS_DEBUG_ON) {
        console.debug(scriptName + ": " + message);
    }
}

//###########################################################################
// M A I N
//###########################################################################

// Perform some start-up tasks
initialize();

// Observe changes to the title element, informing us that Feedly has started populating the page
titleElementMutationObserver.observe(document.querySelector("title"), titleElementMutationObserverInit);
